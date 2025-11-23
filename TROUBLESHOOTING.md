# Troubleshooting Guide

## Gemini API Errors

### Error: "models/gemini-1.5-flash-latest is not found"

**Solution:** The app now automatically tries multiple model names and API versions. If you still get this error:

1. **Check your API key:**
   - Verify it's correct in your `.env` file
   - Make sure there are no extra spaces or quotes
   - Get a new key from [Google AI Studio](https://makersuite.google.com/app/apikey) if needed

2. **Try a specific model:**
   - In your `.env` file, set: `VITE_GEMINI_MODEL=gemini-pro`
   - This is the most stable model name
   - Restart your dev server

3. **Check API quota:**
   - Visit [Google AI Studio](https://makersuite.google.com/app/apikey)
   - Check if you've exceeded your quota
   - Free tier has rate limits

### Error: "404 - model not found"

The app will automatically try these models in order:
- `gemini-1.5-flash-latest` (v1)
- `gemini-1.5-pro-latest` (v1)
- `gemini-pro` (v1)
- `gemini-1.5-flash` (v1beta)
- `gemini-1.5-pro` (v1beta)
- `gemini-pro` (v1beta)

If all fail, check:
- Your API key is valid
- You have access to Gemini API
- Your account is not restricted

### Error: "401 - Unauthorized" or "403 - Forbidden"

- Your API key is invalid or expired
- Get a new key from [Google AI Studio](https://makersuite.google.com/app/apikey)
- Make sure the key has proper permissions

## AssemblyAI Errors

### Error: "Assembly upload failed"

1. Check your `VITE_ASSEMBLY_API_KEY` in `.env`
2. Verify the key is active in [AssemblyAI Dashboard](https://www.assemblyai.com/dashboard)
3. Check your free tier quota (5 hours/month)

## Azure TTS Errors

### Error: "Azure TTS failed"

1. Verify `VITE_AZURE_API_KEY` and `VITE_AZURE_REGION` in `.env`
2. Check your Azure Speech resource is active
3. Verify the region matches your resource region
4. Check your free tier quota (5M characters/month)

## Supabase Errors

### Error: "Missing VITE_SUPABASE_URL"

1. Create a project at [Supabase](https://supabase.com/dashboard)
2. Copy Project URL and anon key from Settings > API
3. Run the database migrations in SQL Editor
4. Restart your dev server

## General Troubleshooting

### App won't load (blank page)

1. Check browser console (F12) for errors
2. Verify all required `.env` variables are set
3. Restart dev server: `npm run dev`
4. Clear browser cache

### Features not working

1. **Check browser console** (F12) for specific errors
2. **Verify API keys** are correct in `.env`
3. **Test API keys** directly in their dashboards
4. **Check quotas** - free tiers have limits
5. **Restart dev server** after changing `.env`

### Still having issues?

1. Check the browser console (F12) for detailed error messages
2. Verify each API key works in its respective dashboard
3. Check the network tab to see API request/response details
4. Review the error messages - they usually indicate the specific problem

