# 🔑 How to Get Your Supabase Service Role Key

## ❌ Current Issue

You're getting a **401 Unauthorized** error because the API key in your `.env` file belongs to a different Supabase project.

**Current Configuration:**
- Supabase URL: `https://tuhjfziufhfcjdvthaaj.supabase.co` ✅ (New project)
- Service Role Key: `sb_secret_8yRH1xFFKBUk5iRuV4CAmA_kodZdFT5` ❌ (From old project)

## 🔧 How to Fix

### Step 1: Go to Your Supabase Dashboard

1. Open your browser and go to: https://supabase.com/dashboard
2. Sign in to your account
3. Select your project: **tuhjfziufhfcjdvthaaj**

### Step 2: Navigate to API Settings

1. In the left sidebar, click on **⚙️ Settings**
2. Click on **API** (under Project Settings)

### Step 3: Copy Your Keys

You'll see two important keys:

#### 1. **Project URL**
```
https://tuhjfziufhfcjdvthaaj.supabase.co
```
✅ You already have this correct!

#### 2. **Service Role Key** (secret)
- Look for the section labeled **"service_role"** or **"Service Role (secret)"**
- Click the **👁️ Reveal** button to show the key
- It will look something like: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...` (very long)
- Click **📋 Copy** to copy it

⚠️ **IMPORTANT**: This is NOT the "anon" key! Make sure you're copying the **service_role** key.

### Step 4: Update Your Environment Files

Update the following files with your new service role key:

#### File 1: `mcp-server/.env`
```env
# Supabase Configuration for MCP Server
SUPABASE_URL=https://tuhjfziufhfcjdvthaaj.supabase.co
SUPABASE_SERVICE_ROLE_KEY=<PASTE_YOUR_SERVICE_ROLE_KEY_HERE>
```

#### File 2: `server/.env`
```env
VITE_SUPABASE_URL=https://tuhjfziufhfcjdvthaaj.supabase.co
VITE_SUPABASE_ANON_KEY=<YOUR_ANON_KEY>
SUPABASE_SERVICE_ROLE_KEY=<PASTE_YOUR_SERVICE_ROLE_KEY_HERE>
PORT=5000
```

#### File 3: `.env` (root directory)
```env
VITE_SUPABASE_URL=https://tuhjfziufhfcjdvthaaj.supabase.co
VITE_SUPABASE_ANON_KEY=<YOUR_ANON_KEY>
SUPABASE_SERVICE_ROLE_KEY=<PASTE_YOUR_SERVICE_ROLE_KEY_HERE>
```

#### File 4: `mcp-config.json`
```json
{
  "mcpServers": {
    "algoverse-supabase": {
      "command": "node",
      "args": ["d:/Programming/Project/Algorithms/mcp-server/index.js"],
      "env": {
        "SUPABASE_URL": "https://tuhjfziufhfcjdvthaaj.supabase.co",
        "SUPABASE_SERVICE_ROLE_KEY": "<PASTE_YOUR_SERVICE_ROLE_KEY_HERE>"
      }
    }
  }
}
```

### Step 5: Test the Connection

After updating all files, run:

```bash
cd mcp-server
npm run test:connection
```

You should see:
```
✅ REST API is accessible
✅ Supabase is accessible and configured correctly
```

## 🎯 Quick Reference

### What Each Key Does:

| Key Type | Purpose | Where to Use |
|----------|---------|--------------|
| **anon (public)** | Frontend access with RLS | Frontend, public API calls |
| **service_role (secret)** | Backend access, bypasses RLS | Backend, MCP server, admin tools |

### Security Notes:

⚠️ **NEVER** expose the service_role key in:
- Frontend code
- Git repositories (use `.gitignore`)
- Client-side applications
- Public documentation

✅ **ONLY** use service_role key in:
- Backend servers
- MCP servers
- Admin scripts
- Server-side code

## 📸 Visual Guide

If you need help finding the keys in the Supabase dashboard, here's what to look for:

1. **Settings** → **API** in the left sidebar
2. Look for the section with **"Project API keys"**
3. You'll see:
   - `anon` `public` - This is your public key
   - `service_role` `secret` - This is what you need! (click Reveal)

## 🆘 Still Having Issues?

If you're still getting 401 errors after updating:

1. **Double-check** you copied the **service_role** key (not anon)
2. **Verify** the key has no extra spaces or line breaks
3. **Confirm** the Supabase URL matches your project
4. **Restart** your servers after updating .env files

---

Once you have the correct service role key, just let me know and I'll help you update all the configuration files! 🚀
