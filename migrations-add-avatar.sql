-- Add avatar_url column to user_profiles table
-- Run this if you have existing table

ALTER TABLE public.user_profiles ADD COLUMN IF NOT EXISTS avatar_url TEXT;

-- Update existing rows to mark them as local/email auth
UPDATE public.user_profiles SET password_hash = 'local-auth' WHERE password_hash IS NULL;
