import { useState, useEffect } from "react";
import { supabase, isSupabaseConfigured, getRedirectUrl, isSupabaseAvailable } from "@/lib/supabase";
import { User } from "@supabase/supabase-js";

export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isMock, setIsMock] = useState(false);

  useEffect(() => {
    // Check active session or mock session
    const checkSession = async () => {
      if (isSupabaseConfigured) {
        try {
          const { data: { session }, error } = await supabase.auth.getSession();
          if (error) throw error;
          if (session) {
            console.log("[Auth] Session found:", session.user.email);
            setUser(session.user);
            setIsMock(false);
            setIsLoading(false);
            return;
          }
        } catch (err) {
          console.error("[Auth] Session check failed:", err);
        }
      }

      // Check for mock user in local storage
      const mockUserStr = localStorage.getItem("algoverse_mock_user");
      if (mockUserStr) {
        try {
          setUser(JSON.parse(mockUserStr));
          setIsMock(true);
        } catch (e) {
          localStorage.removeItem("algoverse_mock_user");
        }
      }
      setIsLoading(false);
    };

    checkSession();

    // Listen for real supabase changes
    let subscription: any = null;
    if (isSupabaseConfigured) {
      try {
        const res = supabase.auth.onAuthStateChange((_event, session) => {
          console.log("[Auth] Auth state changed:", _event, session?.user?.email);
          if (session) {
            setUser(session.user);
            setIsMock(false);

            // Handle Google OAuth signup - save user profile
            if (_event === "SIGNED_IN" && session.user.user_metadata?.provider === "google") {
              saveGoogleUserProfile(session.user);
            }
          } else if (!isMock) {
            setUser(null);
          }
          setIsLoading(false);
        });
        if (res.data) {
          subscription = res.data.subscription;
        }
      } catch (err) {
        console.error("[Auth] Auth state change listener failed:", err);
      }
    }

    return () => {
      if (subscription) subscription.unsubscribe();
    };
  }, [isMock]);

  // Save Google user profile to database
  const saveGoogleUserProfile = async (user: User) => {
    try {
      if (!user.email || !user.id) return;

      console.log("[Auth] Saving Google user profile:", user.email);

      const fullName = user.user_metadata?.full_name || user.email.split("@")[0];
      const avatar = user.user_metadata?.avatar_url;

      // Check if user already exists
      const { data: existing } = await supabase
        .from("user_profiles")
        .select("id")
        .eq("email", user.email)
        .single();

      if (existing) {
        console.log("[Auth] User profile already exists");
        return;
      }

      // Create new profile with Google data
      const { error } = await supabase
        .from("user_profiles")
        .insert([
          {
            id: user.id,
            email: user.email,
            password_hash: "google-oauth", // Mark as OAuth user
            full_name: fullName,
            date_of_birth: null, // Google doesn't provide DOB
            avatar_url: avatar
          }
        ]);

      if (error) {
        console.error("[Auth] Failed to save Google profile:", error);
      } else {
        console.log("[Auth] ✅ Google user profile saved!");
      }
    } catch (err) {
      console.error("[Auth] Error saving Google profile:", err);
    }
  };

  const signIn = async (provider: string, formData?: FormData) => {
    if (provider === "anonymous" || provider === "demo") {
      const createMockUser = () => {
        const mockUser = {
          id: `demo-${Date.now()}`,
          email: "demo@algoverse.local",
          user_metadata: {
            full_name: "Demo User",
            avatar_url: null
          },
          created_at: new Date().toISOString()
        };
        localStorage.setItem("algoverse_mock_user", JSON.stringify(mockUser));
        setUser(mockUser as any);
        setIsMock(true);
        console.log("[Auth] ✅ Demo user created successfully");
      };

      // Try real supabase anonymous auth with fallback
      if (isSupabaseConfigured && isSupabaseAvailable()) {
        try {
          const { error } = await supabase.auth.signInAnonymously();
          if (error) {
            console.warn("[Auth] Real anonymous login failed, switching to mock:", error.message);
            createMockUser();
          }
          return;
        } catch (err) {
          console.warn("[Auth] Real anonymous login exception, switching to mock:", err);
          createMockUser();
          return;
        }
      }

      // Default to mock if not configured or not available
      createMockUser();
      return;
    }

    if (!isSupabaseConfigured) {
      throw new Error("Supabase is not configured. Please use Demo Login.");
    }

    if (provider === "email-password" && formData) {
      const email = formData.get("email") as string;
      const password = formData.get("password") as string;
      
      console.log("[Auth] Attempting login for:", email);

      // Try Supabase Auth first
      try {
        const { data, error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) {
          console.error("[Auth] Supabase Auth error:", error.message);
          throw error;
        }
        console.log("[Auth] ✅ Login successful:", email);
        return;
      } catch (err: any) {
        console.error("[Auth] Login failed:", err.message);
        throw err;
      }
    } else if (provider === "google") {
      const redirectUrl = getRedirectUrl('/dashboard');
      console.log("[Auth] Window origin:", window.location.origin);
      console.log("[Auth] Redirect URL being sent to Google:", redirectUrl);
      console.log("[Auth] ⚠️ Make sure this exact URL is added to Google Cloud Console OAuth credentials!");
      
      const { error } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: {
          redirectTo: redirectUrl
        }
      });
      if (error) {
        console.error("[Auth] Google OAuth error:", error);
        throw error;
      }
      console.log("[Auth] Google OAuth initiated, awaiting redirect...");
    }
  };

  const signUp = async (formData: FormData) => {
    if (!isSupabaseConfigured) {
      throw new Error("Supabase is not configured.");
    }
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    const dateOfBirth = formData.get("dateOfBirth") as string;
    const fullName = formData.get("fullName") as string;

    console.log("[Auth] Signing up user:", email);

    // Step 1: Create user in Supabase Auth
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: `${window.location.origin}/dashboard`,
        data: {
          full_name: fullName,
          date_of_birth: dateOfBirth
        }
      }
    });

    if (error) {
      console.error("[Auth] Signup error:", error);
      throw error;
    }

    console.log("[Auth] User created in Auth:", data);

    // Step 2: Save user profile to user_profiles table
    if (data.user) {
      try {
        console.log("[Auth] Saving user profile to database...");
        
        // Hash the password (simple approach - should use bcrypt in production)
        const passwordHash = btoa(password); // Base64 encoding for now
        
        const { error: profileError } = await supabase
          .from("user_profiles")
          .insert([
            {
              id: data.user.id,
              email: email,
              password_hash: passwordHash,
              date_of_birth: dateOfBirth,
              full_name: fullName
            }
          ]);

        if (profileError) {
          console.error("[Auth] Profile save error:", profileError);
          throw profileError;
        }

        console.log("[Auth] ✅ User profile saved successfully!");
      } catch (err) {
        console.error("[Auth] Failed to save user profile:", err);
        // Don't throw here - user is created in auth, but profile save failed
        // They can still login with email/password
      }
    }
  };

  const signOut = async () => {
    try {
      if (isSupabaseConfigured) {
        await supabase.auth.signOut();
      }
    } catch (error) {
      console.error("Error during sign out:", error);
    } finally {
      setUser(null);
      setIsMock(false);
      localStorage.removeItem("algoverse_mock_user");
      window.location.href = "/";
    }
  };

  return {
    isLoading,
    isAuthenticated: !!user,
    user,
    isMock,
    signIn,
    signUp,
    signOut,
  };
}
