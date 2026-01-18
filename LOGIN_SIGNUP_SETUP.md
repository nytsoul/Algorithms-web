# Original Login & Signup System - Setup Guide

## ✅ What We Just Implemented

You now have a **proper login and signup system** with:

1. **Separate Login and Signup Pages** (not combined tabs)
2. **Signup collects**: Email, Full Name, Date of Birth, Password
3. **Data stored in Supabase** with all user information
4. **Login verification** - email and password validation
5. **Error messages** - shows "Invalid email or password" if credentials don't match
6. **Smooth navigation** - After signup → Login, After login → Dashboard

---

## 📋 Setup Steps

### Step 1: Create User Profiles Table (REQUIRED)

Go to Supabase and create the table:

**Option A: Manual SQL** (Recommended)
1. Go to: https://app.supabase.com/project/tuhjfziufhfcjdvthaaj/sql
2. Click: **New Query**
3. Paste this SQL:

```sql
-- Create user_profiles table
CREATE TABLE IF NOT EXISTS public.user_profiles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT UNIQUE NOT NULL,
  password_hash TEXT NOT NULL,
  date_of_birth DATE,
  full_name TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security (RLS)
ALTER TABLE public.user_profiles ENABLE ROW LEVEL SECURITY;

-- Create index on email for faster lookups
CREATE INDEX IF NOT EXISTS idx_user_profiles_email ON public.user_profiles(email);
```

4. Click: **Run**
5. Done!

**Option B: Automatic Script**
```bash
node setup-user-profiles.js
```

### Step 2: Test the System

1. **Start dev server**:
   ```bash
   pnpm run dev
   ```

2. **Go to Auth Page**:
   - http://localhost:5173
   - Click "Get Started"

3. **Create Account**:
   - Click "Create Account"
   - Fill in:
     - Email: `myemail@example.com`
     - Full Name: `John Doe`
     - Date of Birth: `01/15/1990`
     - Password: `MyPassword123!` (min 8 chars)
   - Click "Create Account"
   - See success: "Account created successfully! Please login."

4. **Login with New Account**:
   - Page auto-switches to Login
   - Enter:
     - Email: `myemail@example.com`
     - Password: `MyPassword123!`
   - Click "Login"
   - ✅ Should redirect to Dashboard

5. **Test Invalid Credentials**:
   - Try wrong password
   - See error: "❌ Invalid email or password"

---

## 🎯 User Flow

```
┌─────────────────────────────┐
│  Landing Page               │
│  Click "Get Started"        │
└──────────────┬──────────────┘
               │
        ┌──────▼──────┐
        │ Auth Choice │
        └─┬────────┬──┘
          │        │
    LOGIN │        │ CREATE ACCOUNT
          │        │
    ┌─────▼──┐  ┌──▼──────────┐
    │ LOGIN  │  │  SIGNUP     │
    │ Form   │  │  Form       │
    └─────┬──┘  └──┬──────────┘
          │        │
    Email │        │ Email
    Pass. │        │ Name
          │        │ DOB
          │        │ Password
    ┌─────▼──────┐ │
    │  VERIFY    │ │
    │  Credentials│ │
    │  from DB   │ │
    └─────┬──────┘ │
          │        │
    ┌─────▼────────▼──┐
    │  DASHBOARD      │
    │  (Authenticated)│
    └─────────────────┘
```

---

## 🗄️ Database Schema

### `user_profiles` Table

| Column | Type | Purpose |
|--------|------|---------|
| `id` | UUID | Unique identifier (primary key) |
| `email` | TEXT | User email (unique, used for login) |
| `password_hash` | TEXT | Hashed password (from Supabase Auth) |
| `date_of_birth` | DATE | User's date of birth |
| `full_name` | TEXT | User's full name |
| `created_at` | TIMESTAMP | Account creation time |
| `updated_at` | TIMESTAMP | Last update time |

---

## 📝 API Endpoints (Internal)

### Sign Up
```typescript
// Sent to: supabase.auth.signUp()
{
  email: "user@example.com",
  password: "securePassword123",
  options: {
    data: {
      full_name: "John Doe",
      date_of_birth: "1990-01-15"
    }
  }
}
```

### Login
```typescript
// Sent to: supabase.auth.signInWithPassword()
{
  email: "user@example.com",
  password: "securePassword123"
}
```

---

## ✅ Testing Checklist

- [ ] Table created in Supabase
- [ ] Can see "Welcome" screen (Choose between Login/Create Account)
- [ ] Can click "Create Account" tab
- [ ] Signup form shows: Email, Full Name, Date of Birth, Password fields
- [ ] Can fill form and click "Create Account"
- [ ] See success message and auto-switch to Login tab
- [ ] Can login with new credentials
- [ ] Redirects to Dashboard after successful login
- [ ] Shows "Invalid email or password" on wrong credentials
- [ ] Invalid password shows error message
- [ ] Invalid email shows error message

---

## 🐛 Troubleshooting

### "Signup failed" Error
**Cause**: Table not created  
**Fix**: Run the SQL schema in Supabase

### "Invalid email or password" Always Shows
**Cause**: Credentials were entered incorrectly  
**Fix**: 
1. Make sure email is exactly right
2. Make sure password is exactly right (case-sensitive)
3. Try creating a new account and testing immediately

### "Email already registered"
**Cause**: Account with that email exists  
**Fix**: Try login instead of signup

### Can't Login After Signup
**Cause**: Session not persisting  
**Fix**: 
1. Check browser console for errors
2. Verify Supabase credentials in .env
3. Try refreshing page and logging in again

---

## 🎨 UI Features

### Choose Screen
- Shows "Welcome" header
- Two buttons: "Login" and "Create Account"

### Login Screen
- Back arrow to go back to Choose screen
- Email input field
- Password input field
- Error message display (red box with alert icon)
- Login button

### Signup Screen
- Back arrow to go back to Choose screen
- Email input field
- Full Name input field
- Date of Birth picker
- Password input field (with min 8 chars note)
- Error message display (red box with alert icon)
- Create Account button

---

## 📚 Files Modified

| File | Changes |
|------|---------|
| `src/pages/Auth.tsx` | Complete redesign - separate login/signup screens |
| `src/hooks/use-auth.ts` | Added support for date_of_birth in signup |
| `schema-user-profiles.sql` | New SQL schema for user profiles table |
| `setup-user-profiles.js` | Script to auto-setup the table |

---

## 🔐 Security Notes

- ✅ Passwords are hashed by Supabase Auth (not stored plain text)
- ✅ Using Supabase Auth for authentication (industry standard)
- ✅ Date of birth stored securely in Supabase
- ✅ Row-level security (RLS) enabled on table
- ✅ Email must be unique (prevents duplicate accounts)

---

## 🚀 Next Steps

1. **Setup the table** (Step 1 above)
2. **Test signup/login flow**
3. **Create test accounts**
4. **Verify all error messages work**
5. **Check Dashboard works after login**

**Questions or issues?** Check the troubleshooting section above!

