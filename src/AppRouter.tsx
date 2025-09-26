import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from '@/contexts/AuthContext';
import { AdminAuthProvider } from '@/contexts/AdminAuthContext';
import ScrollToTop from '@/components/ScrollToTop';

// Import Pages
import LandingPage from '@/pages/LandingPage';
import Dashboard from '@/pages/Dashboard';
import ResumeTemplates from '@/pages/ResumeTemplates';
import ResumeBuilder from '@/pages/ResumeBuilder';
import CoverLetterGenerator from '@/pages/CoverLetterGenerator';
import MockInterview from '@/pages/MockInterview';
import Profile from '@/pages/Profile';
import Pricing from '@/pages/Pricing';
import NotFound from '@/pages/NotFound';
import AdminLogin from '@/pages/AdminLogin';
import AdminDashboard from '@/pages/AdminDashboard';
import ProtectedAdminRoute from '@/components/admin/ProtectedAdminRoute';

function App() {
  return (
    <AuthProvider>
      <AdminAuthProvider>
        <Router>
          <ScrollToTop />
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<LandingPage />} />
            <Route path="/pricing" element={<Pricing />} />
            
            {/* Protected User Routes */}
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/resume-templates" element={<ResumeTemplates />} />
            <Route path="/resume-builder" element={<ResumeBuilder />} />
            <Route path="/cover-letter" element={<CoverLetterGenerator />} />
            <Route path="/mock-interview" element={<MockInterview />} />
            
            {/* Admin Routes */}
            <Route path="/admin" element={<AdminLogin />} />
            <Route 
              path="/admin/dashboard" 
              element={
                <ProtectedAdminRoute>
                  <AdminDashboard />
                </ProtectedAdminRoute>
              } 
            />
            
            {/* Catch-all route */}
            <Route path="/404" element={<NotFound />} />
            <Route path="*" element={<Navigate to="/404" replace />} />
          </Routes>
        </Router>
      </AdminAuthProvider>
    </AuthProvider>
  );
}

export default App;