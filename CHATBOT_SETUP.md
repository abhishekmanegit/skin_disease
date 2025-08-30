# Health Chatbot Setup Guide

This guide will help you set up the AI-powered health chatbot for your Skin Analyzer application.

## ✅ What's Been Added:

1. **Chatbot Service** (`src/services/chatbotService.ts`)
   - Uses Gemini AI for intelligent health responses
   - Medical-focused prompts with safety guidelines
   - Error handling and fallback responses

2. **Chatbot Component** (`src/components/Chatbot.tsx`)
   - Modern, responsive chat interface
   - Real-time messaging with loading states
   - Floating chat button and popup window

3. **App Integration** (`src/App.tsx`)
   - Chatbot integrated into the main application
   - Available on all pages
   - Floating button in bottom-right corner

## 🚀 How to Set Up:

### Step 1: Get Your Gemini API Key
1. Go to [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Sign in with your Google account
3. Click "Create API Key"
4. Copy the generated API key

### Step 2: Configure Environment Variables
1. Create a `.env` file in the project root:
   ```bash
   cp .env.example .env
   ```

2. Add your API key to the `.env` file:
   ```
   VITE_GEMINI_API_KEY=your_actual_api_key_here
   VITE_GEMINI_MODEL=gemini-1.5-flash
   ```

### Step 3: Start the Application
```bash
npm run dev
```

## 🎯 Features:

### Health Assistant Chatbot
- **Medical Information**: Answers questions about diseases, symptoms, and wellness
- **Safety Guidelines**: Always recommends consulting healthcare professionals
- **User-Friendly**: Simple, clear language for easy understanding
- **Responsive Design**: Works on desktop and mobile devices

### Chat Interface
- **Floating Button**: Easy access from any page
- **Real-time Chat**: Instant responses with typing indicators
- **Message History**: View conversation history
- **Professional UI**: Modern design with proper spacing and icons

### Safety Features
- **Medical Disclaimer**: Always advises professional consultation
- **Non-Diagnostic**: Provides information, not medical diagnosis
- **Error Handling**: Graceful fallbacks if API fails
- **Rate Limiting**: Handles API limits appropriately

## 🔧 Usage:

1. **Open Chatbot**: Click the floating message icon in the bottom-right corner
2. **Ask Questions**: Type health-related questions like:
   - "What are the symptoms of diabetes?"
   - "How can I improve my skin health?"
   - "What causes headaches?"
   - "How to maintain a healthy diet?"

3. **Get Responses**: Receive helpful, informative answers with medical guidance

## 🛡️ Safety & Compliance:

- **Not Medical Advice**: The chatbot provides general information only
- **Professional Consultation**: Always recommends seeing healthcare providers
- **Emergency Guidance**: Directs users to seek immediate medical attention for serious symptoms
- **Privacy**: No personal health data is stored or transmitted

## 🎨 Customization:

You can customize the chatbot by modifying:
- **Prompts**: Edit the medical guidelines in `chatbotService.ts`
- **UI**: Modify the design in `Chatbot.tsx`
- **Model**: Change the Gemini model in `.env` file
- **Styling**: Update colors and layout in the component

## 🚨 Important Notes:

- Keep your API key secure and never commit it to version control
- The `.env` file is already in `.gitignore`
- Monitor API usage to stay within Google's limits
- Test thoroughly before deploying to production

## 🆘 Troubleshooting:

### Chatbot Not Responding
- Check if API key is correctly configured
- Verify internet connection
- Check browser console for errors

### API Errors
- Ensure API key is valid and has sufficient quota
- Check if the model name is correct
- Verify the API key has proper permissions

The chatbot is now ready to help users with health-related questions while maintaining appropriate medical safety guidelines!
