import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAuth } from "@/hooks/use-auth";
import { isSupabaseConfigured, supabaseConfigReason } from "@/lib/supabase";
import { ArrowRight, Loader2, Mail, Lock, UserX, Rocket, LogIn, UserPlus, AlertCircle } from "lucide-react";
import { Suspense, useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router";
import { motion, AnimatePresence } from "framer-motion";

interface AuthProps {
  redirectAfterAuth?: string;
}

function Auth() {
  const { isLoading: authLoading, isAuthenticated, signIn, signUp, isMock } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [mode, setMode] = useState<"login" | "signup">("login");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const from = location.state?.from?.pathname || "/dashboard";

  useEffect(() => {
    if (!authLoading && isAuthenticated) {
      navigate(from, { replace: true });
    }
  }, [authLoading, isAuthenticated, navigate, from]);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);
    setError(null);
    try {
      const formData = new FormData(event.currentTarget);
      if (mode === "login") {
        await signIn("email-password", formData);
      } else {
        await signUp(formData);
      }
      setIsLoading(false);
    } catch (err) {
      console.error("Auth error:", err);
      setError(err instanceof Error ? err.message : "Authentication failed. Please check your credentials.");
      setIsLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setIsLoading(true);
    setError(null);
    try {
      await signIn("google");
    } catch (err: any) {
      console.error("[Auth] Google Login Exception:", err);
      setError("Sign in failed. Please try again.");
      setIsLoading(false);
    }
  };

  const handleDemoLogin = async () => {
    setIsLoading(true);
    setError(null);
    try {
      await signIn("demo");
      navigate(from, { replace: true });
    } catch (err) {
      setError("Demo access failed.");
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen relative overflow-hidden flex flex-col items-center justify-center p-6 bg-black text-white">
      {/* Background Decor */}
      <div className="fixed inset-0 cyber-grid opacity-20 pointer-events-none" />
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[var(--neon-cyan)]/10 blur-[120px] rounded-full" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[var(--neon-purple)]/10 blur-[120px] rounded-full" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-[450px] relative z-10"
      >
        {/* Header */}
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
            <p className="text-white/40 text-[10px] font-bold tracking-[0.3em] uppercase">Unified Intelligence Access</p>
          </div>
        </div>

        <Card className="bg-black/40 backdrop-blur-2xl border-white/5 shadow-2xl overflow-hidden text-white border-t border-white/10 shadow-cyan-500/5">
          <CardHeader className="pb-2">
            <div className="flex justify-between items-start mb-2">
              <div className="flex-1" />
              <span className="text-[8px] font-mono text-white/20 tracking-widest">ALGO.VERSION.2.4.0</span>
            </div>
            <CardTitle className="text-2xl font-black text-white text-center uppercase italic tracking-tighter flex items-center justify-center gap-3">
              Welcome Operator
            </CardTitle>
            <CardDescription className="text-center text-white/30 uppercase text-[10px] font-bold tracking-widest">Secure access to the global algorithm repository</CardDescription>
            <div className="mt-4 flex justify-center gap-2">
              {!isSupabaseConfigured ? (
                <Badge className="bg-yellow-500/20 text-yellow-500 border-yellow-500/50 text-[10px] uppercase font-bold tracking-tighter px-3 py-1">
                  Demo Mode Active
                </Badge>
              ) : (
                <Badge className="bg-green-500/20 text-green-500 border-green-500/50 text-[10px] uppercase font-bold tracking-tighter px-3 py-1 flex items-center gap-1.5">
                  <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                  Supabase Live Connection
                </Badge>
              )}
            </div>
          </CardHeader>

          <CardContent className="space-y-6 pt-4">
            <Tabs value={mode} onValueChange={(v) => setMode(v as any)} className="w-full">
              <TabsList className="grid w-full grid-cols-2 bg-white/5 border border-white/5 p-1 rounded-xl">
                <TabsTrigger value="login" className="data-[state=active]:bg-white/10 data-[state=active]:text-[var(--neon-cyan)] text-[10px] font-black uppercase tracking-widest transition-all py-3">
                  <LogIn className="w-3 h-3 mr-2 text-[var(--neon-cyan)]" /> Login
                </TabsTrigger>
                <TabsTrigger value="signup" className="data-[state=active]:bg-white/10 data-[state=active]:text-[var(--neon-purple)] text-[10px] font-black uppercase tracking-widest transition-all py-3">
                  <UserPlus className="w-3 h-3 mr-2 text-[var(--neon-purple)]" /> Sign Up
                </TabsTrigger>
              </TabsList>

              <form onSubmit={handleSubmit} className="mt-8 space-y-4">
                <div className="space-y-4">
                  <div className="relative group">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-white/20 group-focus-within:text-[var(--neon-cyan)] transition-colors" />
                    <Input
                      name="email"
                      type="email"
                      placeholder="Access Terminal ID (Email)"
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
                      placeholder="Security Signature (Password)"
                      className="pl-10 h-14 bg-white/5 border-white/10 focus:border-[var(--neon-cyan)]/50 focus:ring-0 transition-all text-white placeholder:text-white/20 rounded-xl"
                      required
                      disabled={isLoading}
                    />
                  </div>
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
                  className={`w-full h-14 font-black uppercase italic tracking-[0.1em] text-sm rounded-xl transition-all shadow-lg ${mode === "login" ? 'bg-[var(--neon-cyan)] text-black hover:bg-[var(--neon-cyan)]/90 shadow-cyan-500/20' : 'bg-[var(--neon-purple)] text-white hover:bg-[var(--neon-purple)]/90 shadow-purple-500/20'}`}
                >
                  {isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : mode === "login" ? "Initialize Session" : "Create Operator Profile"}
                </Button>
              </form>
            </Tabs>

            <div className="relative py-2">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t border-white/5" />
              </div>
              <div className="relative flex justify-center text-[8px] uppercase font-black tracking-[0.3em]">
                <span className="bg-[#0a0a0a] px-4 text-white/20 italic">Alternative Protocols</span>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-3">
              <Button
                variant="outline"
                type="button"
                className="h-14 border-white/10 text-white bg-white/5 font-black text-[10px] uppercase tracking-[0.2em] italic transition-all hover:bg-white/10 hover:border-white/20 rounded-xl"
                onClick={handleGoogleLogin}
                disabled={isLoading}
              >
                <svg className="w-4 h-4 mr-3" viewBox="0 0 24 24">
                  <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                  <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                  <path fill="currentColor" d="M5.84 14.1c-.22-.66-.35-1.36-.35-2.1s.13-1.44.35-2.1V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l3.66-2.84z" />
                  <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                </svg>
                Sign link with Google
              </Button>
              <Button
                variant="outline"
                type="button"
                className="h-14 border-[var(--neon-cyan)]/20 text-[var(--neon-cyan)] bg-[var(--neon-cyan)]/5 font-black text-[10px] uppercase tracking-[0.2em] italic transition-all hover:bg-[var(--neon-cyan)]/10 hover:border-[var(--neon-cyan)] shadow-[0_0_15px_rgba(0,243,255,0.05)] rounded-xl"
                onClick={handleDemoLogin}
                disabled={isLoading}
              >
                <Rocket className="w-3 h-3 mr-3 shadow-[0_0_10px_rgba(0,243,255,0.5)]" />
                Launch Demo Override
              </Button>
            </div>
          </CardContent>

          <CardFooter className="bg-white/5 border-t border-white/5 flex flex-col items-center py-4 space-y-1">
            <p className="text-[8px] text-white/20 font-mono tracking-widest uppercase">ENCRYPTED // SUPABASE.CORE_V2.9</p>
            <p className="text-[7px] text-white/10 font-mono uppercase">Unauthorized access is logged and prosecuted</p>
          </CardFooter>
        </Card>
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
