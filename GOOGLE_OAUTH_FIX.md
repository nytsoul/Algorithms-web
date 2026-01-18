# Fix Google OAuth - Error 400: redirect_uri_mismatch

## Problem
Google OAuth is rejecting the request because the redirect URI doesn't match.

## Solution

### Your Redirect URIs (Add BOTH to Google Cloud Console):

**For Development:**
```
http://localhost:5173/dashboard
```

**For Production:**
```
https://yourdomain.com/dashboard
```

---

## Step-by-Step Fix

### 1. Go to Google Cloud Console
- Open: https://console.cloud.google.com/apis/credentials

### 2. Select Your Project
- Find "Algorithms" project (or your project)
- Select it

### 3. Find Your OAuth 2.0 Credentials
- Click on your OAuth 2.0 Client ID (usually shows as "Web application")

### 4. Update Authorized Redirect URIs
- Scroll down to "Authorized redirect URIs"
- **Remove** any incorrect URIs
- **Add** these URIs:
  ```
  http://localhost:5173/dashboard
  https://tuhjfziufhfcjdvthaaj.supabase.co/auth/v1/callback
  ```

### 5. Click Save

### 6. Copy Your Credentials
- Copy **Client ID**
- Copy **Client Secret**

### 7. Go to Supabase
- Open: https://app.supabase.com/project/tuhjfziufhfcjdvthaaj/auth/providers
- Click **Google**
- Paste **Client ID** and **Client Secret**
- Click **Save**

### 8. Test Again
- Go back to: http://localhost:5173
- Click "Get Started" → "Create Account"
- Click "Sign up with Google"
- You should now see Google login (NOT the mismatch error)

---

## If Still Getting Error

**Check your URL in browser:**
- Should be: `http://localhost:5173` (not `http://127.0.0.1:5173`)
- If using 127.0.0.1, add it to Google URIs:
  ```
  http://127.0.0.1:5173/dashboard
  ```

**Clear Cache:**
- Clear browser cache
- Restart dev server: `npm run dev`

---

## Quick Reference
- **Supabase Project**: tuhjfziufhfcjdvthaaj
- **Your Dev URL**: http://localhost:5173
- **Correct Redirect**: http://localhost:5173/dashboard
