# Fix Login Error - Email Confirmation Required

## Problem
Users getting "Invalid login credentials" error after signup because Supabase requires email confirmation by default.

## Solution - Disable Email Confirmation (Development)

### **Steps:**

1. **Go to Supabase Dashboard**
   - Open: https://app.supabase.com/project/tuhjfziufhfcjdvthaaj/auth/providers

2. **Click "Email" Provider**
   - Find "Email" in the providers list
   - Click to open settings

3. **Disable "Confirm email"**
   - Find the toggle for "Confirm email"
   - Turn it **OFF** (disabled)
   - This allows users to login immediately after signup without email confirmation

4. **Save Changes**
   - Click **Save** button

5. **Test Again**
   - Try signing up with a new email
   - You should be able to login immediately without confirming email

---

## Alternative - Confirm Existing Users Manually

If you want to keep email confirmation enabled but need to login with existing accounts:

### **Option 1: Via Supabase Dashboard**
1. Go to: https://app.supabase.com/project/tuhjfziufhfcjdvthaaj/auth/users
2. Find your user (neshun7413@gmail.com)
3. Click on the user
4. Look for "Email Confirmed" status
5. If not confirmed, click to manually confirm

### **Option 2: Via SQL**
Run this in Supabase SQL Editor:
```sql
UPDATE auth.users 
SET email_confirmed_at = NOW() 
WHERE email = 'neshun7413@gmail.com';
```

---

## For Production

In production, you should:
1. **Keep email confirmation enabled** for security
2. **Set up email templates** in Supabase
3. **Configure SMTP settings** for email delivery
4. **Add password reset flow**

But for development, disabling email confirmation makes testing easier.

---

## Current Status

Your signup flow is working correctly:
- ✅ Creates user in Supabase Auth
- ✅ Saves profile to user_profiles table
- ✅ Handles errors properly

The only issue is the email confirmation requirement blocking immediate login.

---

## Quick Fix Summary

**Fastest solution:** Disable email confirmation in Supabase Auth settings

**Go to:** https://app.supabase.com/project/tuhjfziufhfcjdvthaaj/auth/providers → Email → Turn OFF "Confirm email" → Save
