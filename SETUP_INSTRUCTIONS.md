# Complete Setup Instructions for VANI Application

## Quick Start

1. **Copy the template to create your .env file:**
   ```bash
   cd Vani-new-main
   cp .env.template .env
   # Or on Windows PowerShell:
   Copy-Item .env.template .env
   ```

2. **Edit the .env file** and add your actual API keys (see details below)

3. **Install dependencies (if not already done):**
   ```bash
   npm install
   ```

4. **Start the development server:**
   ```bash
   npm run dev
   ```

5. **Open your browser** to the URL shown (usually http://localhost:8080 or http://localhost:8083)

## Getting API Keys

### 1. Gemini API Key (REQUIRED for AI features)

**Why needed:** Powers Mock Interview, Group Discussion, Presentation Practice, and AI Speech Practice

**Steps:**
1. Visit [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Sign in with your Google account
3. Click "Create API Key"
4. Copy the generated key
5. Paste it in `.env` as `VITE_GEMINI_API_KEY`

**Free tier:** Available with usage limits

---

### 2. AssemblyAI API Key (REQUIRED for audio transcription)

**Why needed:** Transcribes your audio in all practice sessions

**Steps:**
1. Visit [AssemblyAI](https://www.assemblyai.com/)
2. Sign up for a free account
3. Go to your [Dashboard](https://www.assemblyai.com/dashboard)
4. Copy your API key
5. Paste it in `.env` as `VITE_ASSEMBLY_API_KEY`

**Free tier:** 5 hours of transcription per month

---

### 3. Azure Text-to-Speech API Key (REQUIRED for voice features)

**Why needed:** Provides voice feedback and AI speech in practice sessions

**Steps:**
1. Visit [Azure Portal](https://portal.azure.com/)
2. Click "Create a resource"
3. Search for "Speech" and select "Speech Services"
4. Click "Create"
5. Fill in:
   - Subscription: Your Azure subscription
   - Resource group: Create new or use existing
   - Region: Choose closest to you (e.g., East US, West Europe, Central India)
   - Name: Choose a name
   - Pricing tier: Free (F0) is available
6. Click "Review + create" then "Create"
7. Wait for deployment, then click "Go to resource"
8. Go to "Keys and Endpoint" in the left menu
9. Copy "Key 1"
10. Paste it in `.env` as `VITE_AZURE_API_KEY`
11. Copy your region (e.g., "eastus", "westeurope", "centralindia")
12. Paste it in `.env` as `VITE_AZURE_REGION`

**Free tier:** 5 million characters per month

---

### 4. Supabase Configuration (REQUIRED for authentication & database)

**Why needed:** Handles user authentication, profiles, and progress tracking

**Steps:**
1. Visit [Supabase](https://supabase.com/)
2. Sign up or sign in
3. Click "New Project"
4. Fill in:
   - Name: Choose a project name
   - Database Password: Create a strong password (save it!)
   - Region: Choose closest to you
5. Click "Create new project"
6. Wait for project setup (2-3 minutes)
7. Go to Project Settings (gear icon) > API
8. Copy "Project URL" → paste as `VITE_SUPABASE_URL`
9. Copy "anon public" key → paste as `VITE_SUPABASE_ANON_KEY`

**Database Setup:**
1. In Supabase dashboard, go to SQL Editor
2. Copy the contents of `supabase/migrations/20251025160933_a7ed3507-4bb0-48a1-acfe-0ae35fa3e100.sql`
3. Paste and run it in the SQL Editor
4. This creates the necessary tables (profiles, practice_sessions)

**Free tier:** 500MB database, 2GB bandwidth

---

## Verifying Your Setup

After configuring all API keys:

1. **Restart your dev server:**
   ```bash
   # Stop server (Ctrl+C) and restart
   npm run dev
   ```

2. **Check the browser console** for any errors

3. **Test each feature:**
   - ✅ **Homepage loads** - Should see VANI landing page
   - ✅ **Authentication** - Sign up/login should work
   - ✅ **Mock Interview** - Should generate questions
   - ✅ **Group Discussion** - AI participants should respond
   - ✅ **Presentation Practice** - Should transcribe and analyze
   - ✅ **AI Speech Practice** - Should analyze speech
   - ✅ **Profile** - Should save and load profile
   - ✅ **Progress** - Should track sessions

## Troubleshooting

### Blank Page
- Check browser console (F12) for errors
- Verify all API keys are correct
- Ensure `.env` file is in `Vani-new-main` directory
- Restart dev server after changing `.env`

### "API key not configured" errors
- Verify the key is correct in `.env`
- Check for extra spaces or quotes
- Restart dev server after changes

### Authentication not working
- Verify Supabase URL and key are correct
- Check Supabase dashboard for project status
- Ensure database migrations are run

### Audio/Transcription not working
- Verify AssemblyAI API key
- Check Azure TTS key and region
- Test API keys directly in their dashboards

### Gemini API errors
- Verify API key is correct
- Check [Google AI Studio](https://makersuite.google.com/app/apikey) for quota/limits
- Try using `gemini-1.5-flash-latest` model

## Environment Variables Summary

| Variable | Required | Purpose |
|----------|----------|---------|
| `VITE_GEMINI_API_KEY` | ✅ Yes | AI features (interview, discussion, etc.) |
| `VITE_GEMINI_MODEL` | ⚠️ Optional | Model name (default: gemini-1.5-flash-latest) |
| `VITE_ASSEMBLY_API_KEY` | ✅ Yes | Audio transcription |
| `VITE_AZURE_API_KEY` | ✅ Yes | Text-to-speech |
| `VITE_AZURE_REGION` | ⚠️ Optional | Azure region (default: centralindia) |
| `VITE_SUPABASE_URL` | ✅ Yes | Authentication & database |
| `VITE_SUPABASE_ANON_KEY` | ✅ Yes | Authentication & database |

## Next Steps

Once everything is configured:

1. **Test all features** to ensure they work
2. **Create a user account** via the Auth page
3. **Try a Mock Interview** to test the full flow
4. **Check Progress page** to see session tracking
5. **Update your Profile** to customize your experience

## Support

If you encounter issues:
1. Check the browser console (F12) for error messages
2. Verify all API keys are correct
3. Check each service's dashboard for quota/status
4. Review the error messages - they usually indicate what's wrong

Happy practicing! 🎉

