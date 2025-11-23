# Environment Variables Setup Guide

This guide will help you configure all the required API keys to enable all features of the VANI application.

## Required Environment Variables

### 1. Gemini API (Required for AI Features)
**Used for:** Mock Interview, Group Discussion, Presentation Practice, AI Speech Practice

**How to get:**
1. Go to [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Sign in with your Google account
3. Click "Create API Key"
4. Copy the API key

**Variables:**
```
VITE_GEMINI_API_KEY=your_gemini_api_key_here
VITE_GEMINI_MODEL=gemini-1.5-flash-latest
VITE_GEMINI_API_BASE=https://generativelanguage.googleapis.com
```

### 2. AssemblyAI API (Required for Audio Transcription)
**Used for:** Transcribing audio in all practice sessions

**How to get:**
1. Go to [AssemblyAI](https://www.assemblyai.com/)
2. Sign up for a free account
3. Navigate to your dashboard
4. Copy your API key from the dashboard

**Variables:**
```
VITE_ASSEMBLY_API_KEY=your_assemblyai_api_key_here
VITE_ASSEMBLY_UPLOAD_URL=https://api.assemblyai.com/v2/upload
VITE_ASSEMBLY_TRANSCRIPT_URL=https://api.assemblyai.com/v2/transcript
```

### 3. Azure Text-to-Speech API (Required for Voice Features)
**Used for:** Voice feedback and AI speech in practice sessions

**How to get:**
1. Go to [Azure Portal](https://portal.azure.com/)
2. Create a new "Speech" resource
3. Go to "Keys and Endpoint" in your resource
4. Copy Key 1 and your region

**Variables:**
```
VITE_AZURE_API_KEY=your_azure_speech_api_key_here
VITE_AZURE_REGION=centralindia
```
**Note:** Change `centralindia` to your Azure region (e.g., `eastus`, `westus2`, `southeastasia`)

### 4. Supabase (Required for Authentication & Database)
**Used for:** User authentication, profiles, progress tracking

**How to get:**
1. Go to [Supabase](https://supabase.com/)
2. Create a new project
3. Go to Project Settings > API
4. Copy your Project URL and anon/public key

**Variables:**
```
VITE_SUPABASE_URL=https://your-project-id.supabase.co
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key_here
```

## Setup Instructions

1. **Copy the example file:**
   ```bash
   cd Vani-new-main
   cp .env.example .env
   ```

2. **Edit the .env file** with your actual API keys

3. **Restart the development server:**
   ```bash
   npm run dev
   ```

## Testing Your Configuration

After setting up your .env file, test each feature:

1. **Mock Interview** - Should generate questions and provide feedback
2. **Group Discussion** - Should allow AI participants to respond
3. **Presentation Practice** - Should transcribe and analyze your presentation
4. **AI Speech Practice** - Should analyze your speech and provide feedback
5. **Authentication** - Should allow sign up/login
6. **Profile** - Should save and load your profile
7. **Progress** - Should track your practice sessions

## Troubleshooting

- **Blank page:** Check browser console for errors
- **API errors:** Verify your API keys are correct and have proper permissions
- **Authentication not working:** Ensure Supabase URL and keys are correct
- **Audio not working:** Check Azure TTS API key and region
- **Transcription failing:** Verify AssemblyAI API key

## Free Tier Limits

- **Gemini API:** Free tier available with usage limits
- **AssemblyAI:** Free tier includes 5 hours of transcription per month
- **Azure TTS:** Free tier includes 5 million characters per month
- **Supabase:** Free tier includes 500MB database and 2GB bandwidth


