# Google OAuth Configuration Checker

## ⚠️ IMPORTANT: Check Your Console Logs

When you click "Sign up with Google", open your **Browser Developer Console** (Press `F12`):

1. Look for this message:
   ```
   [Auth] Window origin: http://localhost:5173
   [Auth] Redirect URL being sent to Google: http://localhost:5173/dashboard
   ```

2. **Copy the exact redirect URL** that appears in the logs

3. Go to https://console.cloud.google.com/apis/credentials

4. Click your OAuth 2.0 Client ID

5. Under "Authorized redirect URIs", add **EXACTLY** what your console shows:
   ```
   http://localhost:5173/dashboard
   ```

---

## Common Issues

### Issue 1: URL Protocol Mismatch
- ❌ Wrong: `http://` in code but `https://` in Google
- ✅ Correct: Both must match exactly

### Issue 2: Port Number
- ❌ Wrong: `http://localhost:3000` but running on port 5173
- ✅ Correct: `http://localhost:5173`

### Issue 3: Path Mismatch
- ❌ Wrong: Code sends `http://localhost:5173/auth` but Google has `http://localhost:5173/dashboard`
- ✅ Correct: Paths must match exactly

### Issue 4: localhost vs 127.0.0.1
- ❌ Wrong: Code sends `http://127.0.0.1:5173/dashboard` but Google has `http://localhost:5173/dashboard`
- ✅ Correct: Must be exactly the same

---

## Steps to Debug

1. **Open Browser Console** (F12)
2. **Click "Sign up with Google"**
3. **Find the log messages** showing the exact redirect URL
4. **Copy-paste that URL** into Google Cloud Console
5. **Ensure it matches EXACTLY** (case-sensitive, including port number)
6. **Save and test again**

---

## Your Project Details
- Supabase URL: https://tuhjfziufhfcjdvthaaj.supabase.co
- Dev Server: http://localhost:5173
- Expected Redirect: http://localhost:5173/dashboard
