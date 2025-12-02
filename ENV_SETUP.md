# Environment Variables Setup Guide

## Required Supabase Environment Variables

To make Salone Makit e-commerce platform work, you need to add these environment variables to your Vercel project:

### Steps:
1. Go to your Vercel Project Dashboard
2. Click on "Settings"
3. Go to "Environment Variables"
4. Add the following variables:

### Required Variables:

**NEXT_PUBLIC_SUPABASE_URL**
- Value: Your Supabase project URL (e.g., `https://xxxxx.supabase.co`)
- How to find: Go to Supabase Dashboard → Settings → API → Project URL

**NEXT_PUBLIC_SUPABASE_ANON_KEY**
- Value: Your Supabase anonymous key (e.g., `eyJhbGc...`)
- How to find: Go to Supabase Dashboard → Settings → API → `anon` key

**NEXT_PUBLIC_DEV_SUPABASE_REDIRECT_URL** (Optional but recommended)
- Value: Your localhost URL for development (e.g., `http://localhost:3000/auth/callback`)
- Used for local development only

**SUPABASE_SERVICE_ROLE_KEY** (for server-side operations)
- Value: Your Supabase service role key
- How to find: Go to Supabase Dashboard → Settings → API → `service_role` key

### After Setting Up:
1. Redeploy your project (Vercel will do this automatically when you add env vars)
2. Try signing up again
3. If you still see errors, check browser console for debug messages

### Troubleshooting:
- **"Failed to fetch" error**: The environment variables are missing or incorrect
- **"Invalid URL" error**: Check that NEXT_PUBLIC_SUPABASE_URL is a valid URL
- **Auth not working**: Ensure all keys are copied correctly without extra spaces
