import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/hooks/use-auth";
import { AlertCircle, ArrowLeft, Mail, Lock, Calendar, Loader2, Rocket, UserPlus } from "lucide-react";
import { Suspense, useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router";
import { motion } from "framer-motion";

interface AuthProps {
  redirectAfterAuth?: string;
}

type AuthMode = "choose" | "login" | "signup";

function Auth() {
  const { isLoading: authLoading, isAuthenticated, signIn, signUp } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [authMode, setAuthMode] = useState<AuthMode>("choose");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const from = location.state?.from?.pathname || "/dashboard";

  useEffect(() => {
    if (!authLoading && isAuthenticated) {
      navigate(from, { replace: true });
    }
  }, [authLoading, isAuthenticated, navigate, from]);

  const handleLogin = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      const formData = new FormData(event.currentTarget);
      const email = formData.get("email") as string;
      const password = formData.get("password") as string;

      if (!email || !password) {
        setError("Email and password are required");
        setIsLoading(false);
        return;
      }

      await signIn("email-password", formData);
    } catch (err: any) {
      console.error("[Auth] Login error:", err);

      if (err?.message?.includes("Invalid") || err?.message?.includes("not found")) {
        setError("❌ Invalid email or password. If you just signed up, please check your email for confirmation link.");
      } else if (err?.message?.includes("Email not confirmed")) {
        setError("❌ Please confirm your email first. Check your inbox for confirmation link.");
      } else {
        setError(err?.message || "Login failed. Please try again.");
      }
      setIsLoading(false);
    }
  };

  const handleSignup = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      const formData = new FormData(event.currentTarget);
      const email = formData.get("email") as string;
      const password = formData.get("password") as string;
      const dateOfBirth = formData.get("dateOfBirth") as string;
      const fullName = formData.get("fullName") as string;

      if (!email || !password || !dateOfBirth) {
        setError("All fields are required");
        setIsLoading(false);
        return;
      }

      if (password.length < 8) {
        setError("Password must be at least 8 characters");
        setIsLoading(false);
        return;
      }

      // Create signup form with all data
      const signupFormData = new FormData();
      signupFormData.append("email", email);
      signupFormData.append("password", password);
      signupFormData.append("dateOfBirth", dateOfBirth);
      signupFormData.append("fullName", fullName);

      await signUp(signupFormData);

      // After successful signup, show success message and prepare to login
      setAuthMode("login");
      setError(null);
      // Pre-fill email for login
      setTimeout(() => {
        const emailInput = document.querySelector('input[name="email"]') as HTMLInputElement;
        if (emailInput) emailInput.value = email;
      }, 100);
      alert("✅ Account created successfully! Please login with your credentials. Check your email for confirmation link if email verification is enabled.");
    } catch (err: any) {
      console.error("[Auth] Signup error:", err);

      if (err?.message?.includes("already")) {
        setError("Email already registered. Please login.");
      } else if (err?.message?.includes("400")) {
        setError("Email format is invalid or account creation failed. Please try again.");
      } else {
        setError(err?.message || "Signup failed. Please try again.");
      }
      setIsLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setIsLoading(true);
    setError(null);
    try {
      console.log("[Auth] Starting Google login...");
      await signIn("google");
      // Google will redirect after authentication
    } catch (err: any) {
      console.error("[Auth] Google login error:", err);
      setError(err?.message || "Google login failed. Please try again.");
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen relative overflow-hidden flex flex-col items-center justify-center p-6 bg-black text-white">
      {/* Background */}
      <div className="fixed inset-0 cyber-grid opacity-20 pointer-events-none" />
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[var(--neon-cyan)]/10 blur-[120px] rounded-full" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[var(--neon-purple)]/10 blur-[120px] rounded-full" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-[450px] relative z-10"
      >
        {/* Logo & Header */}
        <div className="text-center mb-10 space-y-4">
          <motion.div
            whileHover={{ scale: 1.1, rotate: 5 }}
            className="w-16 h-16 bg-gradient-to-br from-[var(--neon-cyan)] to-[var(--neon-purple)] rounded-2xl mx-auto flex items-center justify-center shadow-[0_0_30px_rgba(0,243,255,0.3)] cursor-pointer"
            onClick={() => navigate("/")}
          >
            <Rocket className="w-8 h-8 text-black" />
          </motion.div>
          <div>
            <h1 className="text-4xl font-black tracking-tighter text-white uppercase italic">AlgoVerse</h1>
            <p className="text-white/40 text-[10px] font-bold tracking-[0.3em] uppercase">Learning Intelligence Platform</p>
          </div>
        </div>

        {/* Choose Mode Screen */}
        {authMode === "choose" && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
          >
            <Card className="bg-black/40 backdrop-blur-2xl border-white/5 shadow-2xl overflow-hidden text-white">
              <CardHeader className="pb-4">
                <CardTitle className="text-2xl font-black text-white text-center uppercase italic tracking-tighter">
                  Welcome
                </CardTitle>
                <CardDescription className="text-center text-white/30 uppercase text-[10px] font-bold tracking-widest">
                  Choose an option to continue
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <Button
                  onClick={() => setAuthMode("login")}
                  className="w-full h-14 bg-[var(--neon-cyan)] text-black hover:bg-[var(--neon-cyan)]/90 font-black uppercase italic tracking-[0.1em] rounded-xl transition-all shadow-lg"
                >
                  <Rocket className="w-4 h-4 mr-2" />
                  Login
                </Button>
                <Button
                  onClick={() => setAuthMode("signup")}
                  variant="outline"
                  className="w-full h-14 border-white/10 text-white bg-white/5 hover:bg-white/10 font-black uppercase italic tracking-[0.1em] rounded-xl transition-all"
                >
                  <UserPlus className="w-4 h-4 mr-2" />
                  Create Account
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        )}

        {/* Login Screen */}
        {authMode === "login" && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
          >
            <Card className="bg-black/40 backdrop-blur-2xl border-white/5 shadow-2xl overflow-hidden text-white">
              <CardHeader className="pb-4 relative">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setAuthMode("choose")}
                  className="absolute left-4 top-4 text-white/50 hover:text-white hover:bg-white/10"
                >
                  <ArrowLeft className="w-4 h-4" />
                </Button>
                <CardTitle className="text-2xl font-black text-white text-center uppercase italic tracking-tighter">
                  Login
                </CardTitle>
                <CardDescription className="text-center text-white/30 uppercase text-[10px] font-bold tracking-widest">
                  Enter your credentials
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleLogin} className="space-y-4">
                  <div className="relative group">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-white/20 group-focus-within:text-[var(--neon-cyan)] transition-colors" />
                    <Input
                      name="email"
                      type="email"
                      placeholder="Email"
                      className="pl-10 h-14 bg-white/5 border-white/10 focus:border-[var(--neon-cyan)]/50 focus:ring-0 transition-all text-white placeholder:text-white/20 rounded-xl"
                      required
                      disabled={isLoading}
                    />
                  </div>
                  <div className="relative group">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-white/20 group-focus-within:text-[var(--neon-cyan)] transition-colors" />
                    <Input
                      name="password"
                      type="password"
                      placeholder="Password"
                      className="pl-10 h-14 bg-white/5 border-white/10 focus:border-[var(--neon-cyan)]/50 focus:ring-0 transition-all text-white placeholder:text-white/20 rounded-xl"
                      required
                      disabled={isLoading}
                    />
                  </div>

                  {error && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="text-[10px] text-red-400 bg-red-400/5 p-4 rounded-xl border border-red-400/20 flex items-start gap-3"
                    >
                      <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                      <span>{error}</span>
                    </motion.div>
                  )}

                  <Button
                    type="submit"
                    disabled={isLoading}
                    className="w-full h-14 bg-[var(--neon-cyan)] text-black hover:bg-[var(--neon-cyan)]/90 font-black uppercase italic tracking-[0.1em] rounded-xl transition-all shadow-lg"
                  >
                    {isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : "Login"}
                  </Button>

                  <div className="relative">
                    <div className="absolute inset-0 flex items-center">
                      <div className="w-full border-t border-gray-600"></div>
                    </div>
                    <div className="relative flex justify-center text-sm">
                      <span className="px-2 bg-black text-gray-400">or continue with</span>
                    </div>
                  </div>

                  <Button
                    type="button"
                    onClick={handleGoogleLogin}
                    disabled={isLoading}
                    className="w-full h-14 bg-white text-black hover:bg-gray-100 font-black uppercase italic tracking-[0.1em] rounded-xl transition-all shadow-lg flex items-center justify-center gap-3"
                  >
                    {isLoading ? (
                      <Loader2 className="w-5 h-5 animate-spin" />
                    ) : (
                      <>
                        <img src="https://www.gstatic.com/firebaseapp/v8_0_0/images/firebase-logo.png" alt="Google" className="w-5 h-5" />
                        Sign in with Google
                      </>
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </motion.div>
        )}

        {/* Signup Screen */}
        {authMode === "signup" && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
          >
            <Card className="bg-black/40 backdrop-blur-2xl border-white/5 shadow-2xl overflow-hidden text-white">
              <CardHeader className="pb-4 relative">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setAuthMode("choose")}
                  className="absolute left-4 top-4 text-white/50 hover:text-white hover:bg-white/10"
                >
                  <ArrowLeft className="w-4 h-4" />
                </Button>
                <CardTitle className="text-2xl font-black text-white text-center uppercase italic tracking-tighter">
                  Create Account
                </CardTitle>
                <CardDescription className="text-center text-white/30 uppercase text-[10px] font-bold tracking-widest">
                  Join AlgoVerse
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSignup} className="space-y-4">
                  <div className="relative group">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-white/20 group-focus-within:text-[var(--neon-cyan)] transition-colors" />
                    <Input
                      name="email"
                      type="email"
                      placeholder="Email"
                      className="pl-10 h-14 bg-white/5 border-white/10 focus:border-[var(--neon-cyan)]/50 focus:ring-0 transition-all text-white placeholder:text-white/20 rounded-xl"
                      required
                      disabled={isLoading}
                    />
                  </div>
                  <div className="relative group">
                    <Input
                      name="fullName"
                      type="text"
                      placeholder="Full Name"
                      className="pl-10 h-14 bg-white/5 border-white/10 focus:border-[var(--neon-cyan)]/50 focus:ring-0 transition-all text-white placeholder:text-white/20 rounded-xl"
                      required
                      disabled={isLoading}
                    />
                  </div>
                  <div className="relative group">
                    <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-white/20 group-focus-within:text-[var(--neon-cyan)] transition-colors" />
                    <Input
                      name="dateOfBirth"
                      type="date"
                      className="pl-10 h-14 bg-white/5 border-white/10 focus:border-[var(--neon-cyan)]/50 focus:ring-0 transition-all text-white placeholder:text-white/20 rounded-xl"
                      required
                      disabled={isLoading}
                    />
                  </div>
                  <div className="relative group">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-white/20 group-focus-within:text-[var(--neon-cyan)] transition-colors" />
                    <Input
                      name="password"
                      type="password"
                      placeholder="Password (min 8 characters)"
                      className="pl-10 h-14 bg-white/5 border-white/10 focus:border-[var(--neon-cyan)]/50 focus:ring-0 transition-all text-white placeholder:text-white/20 rounded-xl"
                      required
                      disabled={isLoading}
                    />
                  </div>

                  {error && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="text-[10px] text-red-400 bg-red-400/5 p-4 rounded-xl border border-red-400/20 flex items-start gap-3"
                    >
                      <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                      <span>{error}</span>
                    </motion.div>
                  )}

                  <Button
                    type="submit"
                    disabled={isLoading}
                    className="w-full h-14 bg-[var(--neon-purple)] text-white hover:bg-[var(--neon-purple)]/90 font-black uppercase italic tracking-[0.1em] rounded-xl transition-all shadow-lg"
                  >
                    {isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : "Create Account"}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
}

export default function AuthPage({ redirectAfterAuth }: AuthProps) {
  return (
    <Suspense fallback={<div className="min-h-screen bg-black flex items-center justify-center font-mono text-[var(--neon-cyan)] uppercase tracking-widest animate-pulse">Initializing Security Layers...</div>}>
      <Auth />
    </Suspense>
  );
}
