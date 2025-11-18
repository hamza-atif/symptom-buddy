import { useState, useCallback } from 'react';
import { sendMessageToGemini } from '../api/gemini';
import { Message } from '../types';
import { generateId } from '../utils/helpers';

interface UseGeminiReturn {
  sendMessage: (text: string) => Promise<Message | null>;
  loading: boolean;
  error: string | null;
}

export const useGemini = (): UseGeminiReturn => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const sendMessage = useCallback(async (text: string): Promise<Message | null> => {
    setLoading(true);
    setError(null);

    try {
      const response = await sendMessageToGemini(text);
      
      if (response.error) {
        setError(response.error);
        return null;
      }

      const aiMessage: Message = {
        id: generateId(),
        text: response.text,
        sender: 'ai',
        timestamp: new Date(),
      };

      return aiMessage;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'An unknown error occurred';
      setError(errorMessage);
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  return { sendMessage, loading, error };
};

