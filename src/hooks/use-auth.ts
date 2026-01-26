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
          // Don't treat refresh token errors as fatal
          if (error && !error.message?.includes("Refresh Token")) {
            throw error;
          }
          if (session) {
            console.log("[Auth] Session found:", session.user.email);
            setUser(session.user);
            setIsMock(false);
            setIsLoading(false);
            return;
          }
        } catch (err: any) {
          // Log but don't fail on refresh token errors
          if (!err?.message?.includes("Refresh Token")) {
            console.error("[Auth] Session check failed:", err);
          }
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
          // Only set loading to false if we have a definitive state
          if (_event !== "INITIAL_SESSION") {
            setIsLoading(false);
          }
        });
        if (res?.data?.subscription) {
          subscription = res.data.subscription;
        }
      } catch (err) {
        console.error("[Auth] Auth state change listener failed:", err);
        setIsLoading(false);
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

      console.log("[Auth] Syncing Google user profile:", user.email);

      const fullName = user.user_metadata?.full_name || user.email.split("@")[0];
      const avatar = user.user_metadata?.avatar_url;

      // Create or Update profile with Google data
      const { error } = await supabase
        .from("user_profiles")
        .upsert(
          {
            id: user.id,
            email: user.email,
            password_hash: "google-oauth", // Mark as OAuth user
            full_name: fullName,
            avatar_url: avatar,
            updated_at: new Date().toISOString()
          },
          { onConflict: 'id' }
        );

      if (error) {
        console.error("[Auth] Failed to sync Google profile:", error);
      } else {
        console.log("[Auth] ✅ Google user profile synchronized!");
      }
    } catch (err) {
      console.error("[Auth] Error syncing Google profile:", err);
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

        // Use upsert instead of insert to avoid 409 conflict if profile exists
        const { error: profileError } = await supabase
          .from("user_profiles")
          .upsert(
            {
              id: data.user.id,
              email: email,
              password_hash: passwordHash,
              date_of_birth: dateOfBirth,
              full_name: fullName,
              updated_at: new Date().toISOString()
            },
            { onConflict: "id" }
          );

        if (profileError) {
          console.error("[Auth] Profile save error:", profileError);
          // Don't throw - user is still created in auth
        } else {
          console.log("[Auth] ✅ User profile saved successfully!");
        }
      } catch (err) {
        console.error("[Auth] Failed to save user profile:", err);
        // Don't throw here - user is created in auth, but profile save failed
        // They can still login with email/password
      }
    }
  };

  const signOut = async () => {
    console.log("[Auth] 🚪 Logout initiated...");
    try {
      if (isSupabaseConfigured) {
        console.log("[Auth] Signing out from Supabase...");
        await supabase.auth.signOut();
        console.log("[Auth] ✅ Supabase sign out successful");
      } else {
        console.log("[Auth] Supabase not configured, skipping auth sign out");
      }
    } catch (error) {
      console.error("[Auth] ❌ Error during sign out:", error);
    } finally {
      console.log("[Auth] Clearing local state...");
      setUser(null);
      setIsMock(false);
      localStorage.removeItem("algoverse_mock_user");
      console.log("[Auth] 🔄 Redirecting to home page...");
      window.location.href = "/";
    }
  };

  const updateProfile = async (updates: { full_name?: string; bio?: string; avatar_url?: string; social_links?: any }) => {
    if (isMock) {
      const mockUser = JSON.parse(localStorage.getItem("algoverse_mock_user") || "{}");
      const updatedUser = {
        ...mockUser,
        user_metadata: {
          ...mockUser.user_metadata,
          ...updates
        }
      };
      localStorage.setItem("algoverse_mock_user", JSON.stringify(updatedUser));
      setUser(updatedUser as any);
      return { success: true };
    }

    if (!isSupabaseConfigured) throw new Error("Supabase not configured");

    try {
      // Update Auth Metadata
      const { data: authData, error: authError } = await supabase.auth.updateUser({
        data: updates
      });

      if (authError) throw authError;

      // Update user_profiles table
      const { error: profileError } = await supabase
        .from("user_profiles")
        .update({
          full_name: updates.full_name,
          bio: updates.bio,
          avatar_url: updates.avatar_url,
          social_links: updates.social_links,
          updated_at: new Date().toISOString()
        })
        .eq("id", user?.id);

      if (profileError) {
        console.warn("[Auth] Table update failed, but auth metadata updated:", profileError.message);
      }

      setUser(authData.user);
      return { success: true };
    } catch (err: any) {
      console.error("[Auth] Update profile failed:", err.message);
      throw err;
    }
  };

  const updateSettings = async (settings: { theme?: string; language?: string; notifications_enabled?: boolean; email_digest_enabled?: boolean }) => {
    if (isMock) {
      localStorage.setItem("algoverse_settings", JSON.stringify({
        ...(JSON.parse(localStorage.getItem("algoverse_settings") || "{}")),
        ...settings
      }));
      return { success: true };
    }

    if (!isSupabaseConfigured) throw new Error("Supabase not configured");

    try {
      const { error } = await supabase
        .from("user_settings")
        .upsert({
          user_id: user?.id,
          ...settings,
          updated_at: new Date().toISOString()
        });

      if (error) throw error;
      return { success: true };
    } catch (err: any) {
      console.error("[Auth] Update settings failed:", err.message);
      throw err;
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
    updateProfile,
    updateSettings
  };
}
