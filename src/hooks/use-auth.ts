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
          if (session) {
            setUser(session.user);
            setIsMock(false);
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
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) throw error;
    } else if (provider === "google") {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: {
          redirectTo: getRedirectUrl('/dashboard')
        }
      });
      if (error) throw error;
    }
  };

  const signUp = async (formData: FormData) => {
    if (!isSupabaseConfigured) {
      throw new Error("Supabase is not configured.");
    }
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    const { error } = await supabase.auth.signUp({ email, password });
    if (error) throw error;
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
