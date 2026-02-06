import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { PageTransitionProvider } from "./context/PageTransitionContext";
import PageLoader from "./components/ui/PageLoader";
import { BrowserRouter, Routes, Route, useLocation, useNavigate } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import ScrollToTop from "@/components/ScrollToTop";
import Index from "./pages/Index";
import CapabilitySystem from "./pages/CapabilitySystem";
import PredictiveMaintenance from "./pages/PredictiveMaintenance";
import VendorVerse from "./pages/VendorVerse";
import EvalSphere from "./pages/EvalSphere";
import ProposalManagementAI from "./pages/ProposalManagement/ProposalManagementAI";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

function AnimatedRoutes() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Index />} />
        <Route path="/capability-system" element={<CapabilitySystem />} />
        <Route path="/predictive-maintenance" element={<PredictiveMaintenance />} />
        <Route path="/vendor-verse" element={<VendorVerse />} />
        <Route path="/eval-sphere" element={<EvalSphere />} />
        <Route path="/proposal-management-ai" element={<ProposalManagementAI />} />
        {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </AnimatePresence>
  );
}

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AppContent />
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

// Extract AppContent to use useNavigate hook inside provider
function AppContent() {
  const navigate = useNavigate(); // Now valid here
  return (
    <PageTransitionProvider navigate={navigate}>
      <ScrollToTop />
      <PageLoader />
      <AnimatedRoutes />
    </PageTransitionProvider>
  )
}

export default App;
