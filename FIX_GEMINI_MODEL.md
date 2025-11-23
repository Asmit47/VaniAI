# Quick Fix for Gemini Model Error

## The Problem

The error shows it's only trying `gemini-1.5-flash-latest` which doesn't exist. This usually means you have this in your `.env` file:

```env
VITE_GEMINI_MODEL=gemini-1.5-flash-latest
```

## Solution

**Option 1: Remove the model setting (Recommended)**
```env
# Remove or comment out this line:
# VITE_GEMINI_MODEL=gemini-1.5-flash-latest
```

The app will automatically try multiple models and find one that works.

**Option 2: Use gemini-pro (Most Reliable)**
```env
VITE_GEMINI_MODEL=gemini-pro
```

`gemini-pro` is the most stable and widely available model.

## Steps to Fix

1. **Open your `.env` file** in `Vani-new-main` directory

2. **Find this line:**
   ```env
   VITE_GEMINI_MODEL=gemini-1.5-flash-latest
   ```

3. **Either:**
   - **Delete the line** (recommended), OR
   - **Change it to:** `VITE_GEMINI_MODEL=gemini-pro`

4. **Save the file**

5. **Restart your dev server:**
   ```bash
   # Stop server (Ctrl+C)
   npm run dev
   ```

6. **Try Mock Interview again**

## What Models Will Be Tried

After the fix, the app will automatically try these models in order:

**v1 API:**
1. `gemini-pro` (most reliable)
2. `gemini-1.5-pro-latest`
3. `gemini-1.5-flash-latest`

**v1beta API (if v1 fails):**
1. `gemini-pro`
2. `gemini-1.5-pro`
3. `gemini-1.5-flash`

It will use the first one that works!

## Verify It's Working

After restarting, check the browser console (F12). You should see:
```
[Gemini] Trying v1 with model: gemini-pro
```

If `gemini-pro` works, you'll see:
```
Gemini API Success (v1/gemini-pro): ...
```

If it doesn't work, it will automatically try the next model.

