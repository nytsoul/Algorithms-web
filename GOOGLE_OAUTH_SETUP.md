# Google OAuth Setup Checklist for Supabase

## ❌ Issues Found in Current Implementation

### 1. **Redirect URL Configuration**
- **Problem**: Supabase OAuth redirect URL not configured in your Google Cloud Console
- **Fix Required**: Add your app's redirect URL to Google Cloud Console OAuth credentials

### 2. **Missing Callback Handling**
- **Problem**: Auth page doesn't have logic to handle OAuth callback
- **Current Behavior**: When Google redirects back, the page doesn't process the session

### 3. **Environment Variables**
- **Current**: Using `sb_publishable_*` key format
- **Note**: This is the new format, ensure your Supabase project supports it

---

## ✅ Steps to Enable Google OAuth

### Step 1: Configure Supabase Project
1. Go to: https://app.supabase.com
2. Navigate to: **Authentication** → **Providers**
3. Click on **Google**
4. Enable the provider
5. Note the **Callback URL** (usually: `https://tuhjfziufhfcjdvthaaj.supabase.co/auth/v1/callback`)

### Step 2: Set Up Google Cloud Console
1. Go to: https://console.cloud.google.com
2. Create or select your project
3. Go to: **APIs & Services** → **Credentials**
4. Click **Create Credentials** → **OAuth 2.0 Client ID**
5. Select **Web application**
6. Add **Authorized Redirect URIs**:
   - `http://localhost:5173/dashboard` (local development)
   - `http://localhost:5173/auth` (backup)
   - `https://your-domain.com/dashboard` (production)
   - `https://tuhjfziufhfcjdvthaaj.supabase.co/auth/v1/callback` (Supabase callback)

7. Copy your **Client ID** and **Client Secret**

### Step 3: Add Credentials to Supabase
1. In Supabase, go to: **Authentication** → **Providers** → **Google**
2. Paste your **Client ID** and **Client Secret**
3. Click **Save**

### Step 4: Verify Implementation
1. Check your `.env` file has:
   ```
   VITE_SUPABASE_URL=https://tuhjfziufhfcjdvthaaj.supabase.co
   VITE_SUPABASE_ANON_KEY=sb_publishable_8qF1NDDhRrPz8EPbxHAJLA_nyaNURH6
   ```

2. Your `getRedirectUrl()` function is correct:
   ```typescript
   export const getRedirectUrl = (path: string = '/dashboard') => {
     const origin = window.location.origin;
     return `${origin}${path}`;
   };
   ```

---

## 🧪 Testing Google OAuth

### Local Testing
```bash
# 1. Start dev server
pnpm run dev

# 2. Go to http://localhost:5173
# 3. Click "Get Started" → Auth page
# 4. Click "Sign in with Google"
# 5. Should redirect to Google login
# 6. After login, should redirect back to dashboard with session
```

### Debugging
Check browser console for these logs:
```
[Auth] Initiating Google OAuth with redirect: http://localhost:5173/dashboard
[Auth] Google OAuth initiated, awaiting redirect...
[Auth] Session found: your-google-email@gmail.com
[Auth] Auth state changed: SIGNED_IN your-google-email@gmail.com
```

---

## ❌ Common Issues & Solutions

| Issue | Cause | Solution |
|-------|-------|----------|
| Google button does nothing | OAuth not configured in Supabase | Configure Google provider in Supabase dashboard |
| Redirects to error page | Redirect URL not in Google Cloud Console | Add `http://localhost:5173/dashboard` to authorized URIs |
| "Invalid Client" error | Wrong Client ID/Secret | Verify credentials in Supabase → Google provider |
| Session not persisting | onAuthStateChange not triggered | Check browser console for auth state logs |
| Blank page after Google login | Auth page doesn't wait for session | Ensure useEffect hook listens for auth changes |

---

## 📋 Current Configuration Status

### ✅ Already Done
- [x] use-auth.ts has Google OAuth provider
- [x] Auth.tsx has Google login button
- [x] getRedirectUrl() helper is implemented
- [x] Supabase URL and Anon Key configured

### ⏳ To Be Verified
- [ ] Google OAuth provider enabled in Supabase dashboard
- [ ] Client ID and Secret added to Supabase
- [ ] Redirect URLs configured in Google Cloud Console
- [ ] Local testing works (localhost:5173)

---

## 🔗 Useful Links

- Supabase Google OAuth: https://supabase.com/docs/guides/auth/social-login/auth-google
- Google Cloud Console: https://console.cloud.google.com
- Your Supabase Project: https://app.supabase.com/project/tuhjfziufhfcjdvthaaj

