# User Data Not Updating - Debugging Guide

## ✅ What I Fixed

Updated `use-auth.ts` to:
1. ✅ **Save user profile** to `user_profiles` table after signup
2. ✅ **Store all user data**: email, password_hash, date_of_birth, full_name
3. ✅ **Better logging** to debug issues
4. ✅ **Error handling** for table saves

---

## 🔍 Check Your Data

### Option 1: Automatic Verification Script
```bash
node verify-user-data.js
```

This will:
- Check if table exists
- List all users in the table
- Show what data is stored

### Option 2: Manual Check in Supabase
1. Go to: https://app.supabase.com/project/tuhjfziufhfcjdvthaaj
2. Click: **SQL Editor** → **New Query**
3. Paste:
```sql
SELECT * FROM public.user_profiles;
```
4. Click: **Run**
5. See all user data

---

## 🧪 Test the Complete Flow

### Step 1: Verify Table Exists
```bash
node verify-user-data.js
```

If table doesn't exist, run this SQL in Supabase:
```sql
CREATE TABLE IF NOT EXISTS public.user_profiles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT UNIQUE NOT NULL,
  password_hash TEXT NOT NULL,
  date_of_birth DATE,
  full_name TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

ALTER TABLE public.user_profiles ENABLE ROW LEVEL SECURITY;
CREATE INDEX IF NOT EXISTS idx_user_profiles_email ON public.user_profiles(email);
```

### Step 2: Test Signup
1. **Start dev server**:
   ```bash
   pnpm run dev
   ```

2. **Go to**: http://localhost:5173

3. **Click**: "Get Started" → "Create Account"

4. **Fill in**:
   - Email: `newuser@test.com`
   - Full Name: `New User`
   - Date of Birth: `01/15/2000`
   - Password: `TestPass123!`

5. **Click**: "Create Account"

6. **Expected**: Success message → Auto-redirect to Login

### Step 3: Check Console Logs
Open **DevTools** (F12) → **Console** tab

You should see:
```
[Auth] Signing up user: newuser@test.com
[Auth] User created in Auth: {...}
[Auth] Saving user profile to database...
[Auth] ✅ User profile saved successfully!
```

### Step 4: Verify Data in Supabase
```bash
node verify-user-data.js
```

You should see your new user!

### Step 5: Test Login
1. **Go to**: http://localhost:5173
2. **Click**: "Get Started" → "Login"
3. **Enter**:
   - Email: `newuser@test.com`
   - Password: `TestPass123!`
4. **Click**: "Login"
5. **Expected**: Redirects to Dashboard

---

## 🐛 Troubleshooting

### Issue: "No users found in table"
**Causes**:
1. Table doesn't exist
2. RLS policy blocking inserts
3. Signup not calling the save function

**Fix**:
```sql
-- Check if table exists
SELECT EXISTS (
  SELECT 1 FROM information_schema.tables 
  WHERE table_schema = 'public' 
  AND table_name = 'user_profiles'
);

-- Create table if missing
CREATE TABLE IF NOT EXISTS public.user_profiles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT UNIQUE NOT NULL,
  password_hash TEXT NOT NULL,
  date_of_birth DATE,
  full_name TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

### Issue: Console Shows Error "Failed to save user profile"
**Causes**:
1. RLS policy not allowing inserts
2. Database constraint violated (duplicate email)
3. Wrong table name

**Fix**:
Check browser console for exact error. Go to Supabase and run:
```sql
-- Check RLS policies
SELECT * FROM pg_policies WHERE schemaname = 'public' AND tablename = 'user_profiles';

-- Or disable RLS temporarily to test
ALTER TABLE public.user_profiles DISABLE ROW LEVEL SECURITY;

-- Then re-enable with proper policies
ALTER TABLE public.user_profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Enable all" ON public.user_profiles
  FOR ALL USING (true) WITH CHECK (true);
```

### Issue: "Email already exists" when signing up
**Cause**: Account already created  
**Fix**: Try different email or delete user from table

### Issue: Login shows "Invalid email or password"
**Cause**: 
1. User not in table
2. Wrong credentials
3. Supabase Auth user not synced

**Fix**:
1. Check if user exists: `node verify-user-data.js`
2. Verify email/password are correct
3. Try signing up again with new email

---

## 📊 Expected Data Structure

When you sign up with:
- Email: `user@example.com`
- Name: `John Doe`
- DOB: `01/15/2000`
- Password: `SecurePass123`

The `user_profiles` table should have:

| id | email | password_hash | date_of_birth | full_name | created_at |
|---|---|---|---|---|---|
| `550e8400-...` | `user@example.com` | `U2VjdXJlUGFz...` | `2000-01-15` | `John Doe` | `2026-01-16 15:30...` |

---

## 🔐 Password Storage Note

Currently using Base64 encoding for demo purposes:
```typescript
const passwordHash = btoa(password); // Base64 encoding
```

**For production**: Use bcrypt or Argon2 for real hashing:
```bash
npm install bcryptjs
```

Then in signup:
```typescript
import bcrypt from 'bcryptjs';
const passwordHash = await bcrypt.hash(password, 10);
```

---

## ✅ Verification Checklist

- [ ] Table `user_profiles` exists in Supabase
- [ ] Run `node verify-user-data.js` shows no errors
- [ ] Can create new account (form submits without errors)
- [ ] Browser console shows "[Auth] ✅ User profile saved successfully!"
- [ ] `node verify-user-data.js` shows the new user
- [ ] Supabase SQL query shows user data in table
- [ ] Can login with created credentials
- [ ] Dashboard appears after login

---

## 🚀 Quick Start (Summary)

```bash
# 1. Verify table and data
node verify-user-data.js

# 2. Create table if missing (use Supabase SQL Editor)
# Paste schema from above

# 3. Start dev server
pnpm run dev

# 4. Create account at http://localhost:5173
# Go to Get Started → Create Account

# 5. Verify data saved
node verify-user-data.js

# 6. Login at http://localhost:5173
# Go to Get Started → Login
```

**That's it!** ✅

