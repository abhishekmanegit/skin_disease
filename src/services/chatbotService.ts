import { GoogleGenerativeAI } from '@google/generative-ai';

// Debug environment variables
console.log('Environment check:', {
  VITE_GEMINI_API_KEY: import.meta.env.VITE_GEMINI_API_KEY,
  VITE_GEMINI_MODEL: import.meta.env.VITE_GEMINI_MODEL,
  allEnv: import.meta.env
});

// Initialize Gemini AI
const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY || '');
const model = genAI.getGenerativeModel({ 
  model: import.meta.env.VITE_GEMINI_MODEL || 'gemini-1.5-flash' 
});

export interface ChatMessage {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: Date;
}

export interface ChatResponse {
  message: string;
  error?: string;
}

export const sendMessageToChatbot = async (message: string): Promise<ChatResponse> => {
  try {
    // Check if API key is configured
    const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
    
    console.log('API Key check:', { 
      hasApiKey: !!apiKey, 
      apiKeyLength: apiKey?.length,
      apiKeyStart: apiKey?.substring(0, 10) + '...'
    });
    
    if (!apiKey || apiKey.length < 10) {
      return {
        message: "I'm sorry, but the AI chatbot is not configured yet. Please add your Gemini API key to use this feature.",
        error: "API key not configured"
      };
    }

    // Create a medical-focused prompt
    const prompt = `You are a helpful medical assistant chatbot. You can provide general health information and answer questions about diseases, symptoms, and wellness. 

IMPORTANT GUIDELINES:
- Provide general health information only
- Always recommend consulting healthcare professionals for specific medical advice
- Be informative but not diagnostic
- Use simple, clear language
- If asked about serious symptoms, always suggest seeing a doctor
- Be supportive and empathetic

User question: ${message}

Please provide a helpful, informative response that follows these guidelines.`;

    // Generate response
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    
    return {
      message: text.trim()
    };

  } catch (error) {
    console.error('Chatbot API error:', error);
    return {
      message: "I'm sorry, I'm having trouble connecting right now. Please try again later or consult a healthcare professional for immediate concerns.",
      error: error instanceof Error ? error.message : 'Unknown error'
    };
  }
};
