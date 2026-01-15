import { createClient } from "@supabase/supabase-js"

export const supabase = createClient(
<<<<<<< HEAD
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
=======
  process.env.SUPABASE_URL || process.env.VITE_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_SECRET_KEY || process.env.VITE_SUPABASE_ANON_KEY!
>>>>>>> 6940946 (initial commit)
)
