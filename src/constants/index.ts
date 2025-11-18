import { StorageKeys, OnboardingSlide } from '../types';

export const STORAGE_KEYS: StorageKeys = {
  USER: '@symptom_buddy_user',
  SESSIONS: '@symptom_buddy_sessions',
  THEME: '@symptom_buddy_theme',
  ONBOARDING_COMPLETED: '@symptom_buddy_onboarding_completed',
};

export const ONBOARDING_SLIDES: OnboardingSlide[] = [
  {
    id: '1',
    title: 'Welcome to Symptom Buddy',
    description: 'Your personal AI-powered medical assistant for understanding symptoms and health concerns.',
    image: '🏥',
  },
  {
    id: '2',
    title: 'Describe Your Symptoms',
    description: 'Share your symptoms in natural language, and get instant AI-powered medical insights.',
    image: '💬',
  },
  {
    id: '3',
    title: 'Track Your History',
    description: 'Keep a record of all your symptom inquiries and medical advice for future reference.',
    image: '📊',
  },
  {
    id: '4',
    title: 'Safe & Private',
    description: 'Your health data is stored securely on your device. We prioritize your privacy.',
    image: '🔒',
  },
];

export const API_CONFIG = {
  GEMINI_MODEL: 'gemini-2.5-flash',
  MAX_TOKENS: 1024,
  TEMPERATURE: 0.7,
};

export const MEDICAL_DISCLAIMER = `
⚠️ IMPORTANT MEDICAL DISCLAIMER:

This app provides general health information using AI and should NOT be used as a substitute for professional medical advice, diagnosis, or treatment.

- Always seek the advice of your physician or qualified health provider with questions regarding a medical condition.
- Never disregard professional medical advice or delay seeking it because of something you have read in this app.
- In case of a medical emergency, call emergency services immediately.

The information provided by Symptom Buddy is for educational purposes only.
`;

