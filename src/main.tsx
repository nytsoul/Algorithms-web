import { Toaster } from "@/components/ui/sonner";
import { InstrumentationProvider } from "@/instrumentation.tsx";
import { StrictMode, useEffect, lazy, Suspense } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Routes, useLocation, Link, useNavigate } from "react-router";
import { ThemeProvider } from "@/components/ThemeProvider";
import "./index.css";
import "./types/global.d.ts";
import "./i18n";

// Lazy load route components for better code splitting
const Landing = lazy(() => import("./pages/Landing"));
const AuthPage = lazy(() => import("./pages/Auth"));
const NotFound = lazy(() => import("./pages/NotFound"));
const Dashboard = lazy(() => import("./pages/Dashboard"));
const Visualize = lazy(() => import("./pages/Visualize"));
const Benchmark = lazy(() => import("./pages/Benchmark"));
const Recommend = lazy(() => import("./pages/Recommend"));
const Learn = lazy(() => import("./pages/Learn"));
const AlgorithmDetail = lazy(() => import("./pages/AlgorithmDetail"));
const AlgorithmLab = lazy(() => import("./pages/AlgorithmLab"));
const Domains = lazy(() => import("./pages/Domains"));
const DomainDetail = lazy(() => import("./pages/DomainDetail"));
const Compare = lazy(() => import("./pages/Compare"));
const AdaptiveLearning = lazy(() => import("./pages/AdaptiveLearning"));
const Playground = lazy(() => import("./pages/Playground"));
const Profile = lazy(() => import("./pages/Profile"));
const Settings = lazy(() => import("./pages/Settings"));
const DecisionEngine = lazy(() => import("./pages/DecisionEngine"));
const AlgorithmVisualizationsDemo = lazy(() => import("./pages/AlgorithmVisualizationsDemo"));

// Simple loading fallback for route transitions
function RouteLoading() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center">
      <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-[var(--neon-cyan)] border-t-transparent" />
    </div>
  );
}





function RouteSyncer() {
  const location = useLocation();
  useEffect(() => {
    window.parent.postMessage(
      { type: "iframe-route-change", path: location.pathname },
      "*",
    );
  }, [location.pathname]);

  useEffect(() => {
    function handleMessage(event: MessageEvent) {
      if (event.data?.type === "navigate") {
        if (event.data.direction === "back") window.history.back();
        if (event.data.direction === "forward") window.history.forward();
      }
    }
    window.addEventListener("message", handleMessage);
    return () => window.removeEventListener("message", handleMessage);
  }, []);

  return null;
}


createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <InstrumentationProvider>
      <BrowserRouter>
        <ThemeProvider>

          <RouteSyncer />
          <Suspense fallback={<RouteLoading />}>
            <Routes>
              <Route path="/" element={<Landing />} />
              <Route path="/auth" element={<AuthPage redirectAfterAuth="/dashboard" />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/settings" element={<Settings />} />
              <Route path="/algorithm/:slug" element={<AlgorithmDetail />} />
              <Route path="/domains" element={<Domains />} />
              <Route path="/domains/:slug" element={<DomainDetail />} />
              <Route path="/domain/:id" element={<DomainDetail />} />
              <Route path="/visualize" element={<Visualize />} />
              <Route path="/playground" element={<Playground />} />
              <Route path="/lab" element={<AlgorithmLab />} />
              <Route path="/benchmark" element={<Benchmark />} />
              <Route path="/compare" element={<Compare />} />
              <Route path="/recommend" element={<Recommend />} />
              <Route path="/learn" element={<Learn />} />
              <Route path="/adaptive" element={<AdaptiveLearning />} />
              <Route path="/decision-engine" element={<DecisionEngine />} />
              <Route path="/visualizations" element={<AlgorithmVisualizationsDemo />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
          <Toaster />
        </ThemeProvider>
      </BrowserRouter>
    </InstrumentationProvider>
  </StrictMode>,
);
