import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ScrollToTop from "@/components/ScrollToTop";
import { AuthProvider } from "@/contexts/AuthContext";
import { AdminAuthProvider } from "@/contexts/AdminAuthContext";
import LandingPage from "./pages/LandingPage";
import Dashboard from "./pages/Dashboard";
import ResumeBuilder from "./pages/ResumeBuilder";
import ResumeTemplates from "./pages/ResumeTemplates";
import Profile from "./pages/Profile";
import CoverLetterGenerator from "./pages/CoverLetterGenerator";
import MockInterview from "./pages/MockInterview";
import Pricing from "./pages/Pricing";
import AdminLogin from "./pages/AdminLogin";
import AdminDashboard from "./pages/AdminDashboard";
import ProtectedAdminRoute from "./components/admin/ProtectedAdminRoute";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <AdminAuthProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <ScrollToTop />
            <Routes>
              <Route path="/" element={<LandingPage />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/resume-templates" element={<ResumeTemplates />} />
              <Route path="/resume-builder" element={<ResumeBuilder />} />
              <Route path="/cover-letter" element={<CoverLetterGenerator />} />
              <Route path="/mock-interview" element={<MockInterview />} />
              
              <Route path="/pricing" element={<Pricing />} />
              
              {/* Admin Routes */}
              <Route path="/admin" element={<AdminLogin />} />
              <Route path="/admin/dashboard" element={
                <ProtectedAdminRoute>
                  <AdminDashboard />
                </ProtectedAdminRoute>
              } />
              
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </AdminAuthProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;