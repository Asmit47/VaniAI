# Welcome to your Lovable project

## Project info

**URL**: https://lovable.dev/projects/5816906f-8d4b-42ef-9cc1-8a0e9f6f52cd

## How can I edit this code?

There are several ways of editing your application.

**Use Lovable**

Simply visit the [Lovable Project](https://lovable.dev/projects/5816906f-8d4b-42ef-9cc1-8a0e9f6f52cd) and start prompting.

Changes made via Lovable will be committed automatically to this repo.

**Use your preferred IDE**

If you want to work locally using your own IDE, you can clone this repo and push changes. Pushed changes will also be reflected in Lovable.

The only requirement is having Node.js & npm installed - [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)

Follow these steps:

```sh
# Step 1: Clone the repository using the project's Git URL.
git clone <YOUR_GIT_URL>

# Step 2: Navigate to the project directory.
cd <YOUR_PROJECT_NAME>

# Step 3: Install the necessary dependencies.
npm i

# Step 4: Set up environment variables
# Copy the example environment file and fill in your API keys
cp .env.example .env
# Edit .env with your actual API keys

# Step 5: Start the development server with auto-reloading and an instant preview.
npm run dev
```

## Environment Variables Setup

Before running the application locally, you need to configure the following environment variables in a `.env` file:

1. **Copy the example file:**
   ```sh
   cp .env.example .env
   ```

2. **Edit `.env` and add your API keys:**
   - `VITE_GEMINI_API_KEY`: Your Google Gemini API key (required for Mock Interview, Group Discussion, Presentation Practice, and Speech Practice)
   - `VITE_GEMINI_MODEL`: Gemini model name (default: `gemini-1.5-flash-latest`)
   - `VITE_ASSEMBLY_API_KEY`: Your AssemblyAI API key (required for audio transcription)
   - `VITE_AZURE_API_KEY`: Your Azure Text-to-Speech API key (required for voice features)
   - `VITE_AZURE_REGION`: Azure region (default: `centralindia`)
   - `VITE_SUPABASE_URL`: Your Supabase project URL
   - `VITE_SUPABASE_ANON_KEY`: Your Supabase anonymous key

**Note:** The application will automatically try both `v1` and `v1beta` API versions for Gemini to ensure compatibility.

**Edit a file directly in GitHub**

- Navigate to the desired file(s).
- Click the "Edit" button (pencil icon) at the top right of the file view.
- Make your changes and commit the changes.

**Use GitHub Codespaces**

- Navigate to the main page of your repository.
- Click on the "Code" button (green button) near the top right.
- Select the "Codespaces" tab.
- Click on "New codespace" to launch a new Codespace environment.
- Edit files directly within the Codespace and commit and push your changes once you're done.

## What technologies are used for this project?

This project is built with:

- Vite
- TypeScript
- React
- shadcn-ui
- Tailwind CSS

## How can I deploy this project?

Simply open [Lovable](https://lovable.dev/projects/5816906f-8d4b-42ef-9cc1-8a0e9f6f52cd) and click on Share -> Publish.

## Can I connect a custom domain to my Lovable project?

Yes, you can!

To connect a domain, navigate to Project > Settings > Domains and click Connect Domain.

Read more here: [Setting up a custom domain](https://docs.lovable.dev/features/custom-domain#custom-domain)
