import { GoogleGenerativeAI } from '@google/generative-ai';
import { GEMINI_API_KEY } from '@env';
import { GeminiResponse } from '../types';
import { validation } from '../utils/validation';
import { API_CONFIG, MEDICAL_DISCLAIMER } from '../constants';

// Initialize Gemini AI
let genAI: GoogleGenerativeAI | null = null;

const initializeGemini = (): GoogleGenerativeAI => {
  if (!genAI) {
    if (!GEMINI_API_KEY || GEMINI_API_KEY === 'your_gemini_api_key_here') {
      throw new Error('Gemini API key not configured. Please set GEMINI_API_KEY in .env file');
    }
    genAI = new GoogleGenerativeAI(GEMINI_API_KEY);
  }
  return genAI;
};

/**
 * Sends a message to Gemini AI and returns the response
 */
export const sendMessageToGemini = async (
  userMessage: string
): Promise<GeminiResponse> => {
  try {
    // Validate and sanitize input
    if (!validation.isNotEmpty(userMessage)) {
      return {
        text: '',
        error: 'Please enter a message',
      };
    }

    if (validation.containsHarmfulContent(userMessage)) {
      return {
        text: '',
        error: 'Invalid input detected',
      };
    }

    const sanitizedMessage = validation.sanitizeInput(userMessage);

    // Initialize Gemini
    const ai = initializeGemini();
    const model = ai.getGenerativeModel({ model: API_CONFIG.GEMINI_MODEL });

    // Create a medical context prompt
    const medicalContext = `You are a helpful medical assistant AI. Your role is to:
1. Listen to user symptoms and provide general health information
2. Suggest possible causes (always mention these are possibilities, not diagnoses)
3. Recommend when to see a doctor
4. Provide general wellness advice
5. Always emphasize that you're not replacing professional medical advice

IMPORTANT: Always remind users that:
- This is not a professional medical diagnosis
- They should consult a healthcare provider for serious concerns
- In emergencies, call emergency services immediately

User message: ${sanitizedMessage}

Provide a helpful, empathetic, and informative response:`;

    // Generate response
    const result = await model.generateContent(medicalContext);
    const response = await result.response;
    const text = response.text();

    if (!text) {
      return {
        text: '',
        error: 'No response from AI',
      };
    }

    return {
      text: text.trim(),
    };
  } catch (error) {
    console.error('Gemini API Error:', error);
    
    if (error instanceof Error) {
      if (error.message.includes('API key')) {
        return {
          text: '',
          error: 'API key error. Please check your configuration.',
        };
      }
      return {
        text: '',
        error: `Error: ${error.message}`,
      };
    }

    return {
      text: '',
      error: 'Failed to get response from AI. Please try again.',
    };
  }
};

/**
 * Generates a medical summary from conversation history
 */
export const generateMedicalSummary = async (
  conversationHistory: string
): Promise<GeminiResponse> => {
  try {
    const ai = initializeGemini();
    const model = ai.getGenerativeModel({ model: API_CONFIG.GEMINI_MODEL });

    const summaryPrompt = `Based on the following conversation about symptoms, create a concise medical summary:

${conversationHistory}

Provide a structured summary including:
1. Main symptoms reported
2. Key concerns discussed
3. Recommendations given
4. Follow-up suggestions

Keep it brief and professional:`;

    const result = await model.generateContent(summaryPrompt);
    const response = await result.response;
    const text = response.text();

    return {
      text: text.trim(),
    };
  } catch (error) {
    console.error('Summary Generation Error:', error);
    return {
      text: '',
      error: 'Failed to generate summary',
    };
  }
};

