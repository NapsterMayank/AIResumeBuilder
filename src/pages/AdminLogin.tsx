import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Shield, ArrowLeft } from 'lucide-react';
import { useAdminAuth } from '@/contexts/AdminAuthContext';
import AdminLoginModal from '@/components/admin/AdminLoginModal';

const AdminLogin = () => {
  const navigate = useNavigate();
  const { admin } = useAdminAuth();
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);

  useEffect(() => {
    // If admin is already logged in, redirect to dashboard
    if (admin) {
      navigate('/admin/dashboard');
    }
  }, [admin, navigate]);

  const handleLoginSuccess = () => {
    navigate('/admin/dashboard');
  };

  const handleBackToSite = () => {
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-gradient-hero flex items-center justify-center p-4">
      {/* Background overlay */}
      <div className="absolute inset-0 bg-gradient-hero opacity-95"></div>
      
      <div className="relative z-10 w-full max-w-md">
        {/* Back to site button */}
        <div className="mb-6">
          <Button 
            variant="ghost" 
            onClick={handleBackToSite}
            className="text-white hover:bg-white/10"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Site
          </Button>
        </div>

        {/* Admin login card */}
        <Card className="bg-white/10 backdrop-blur-md border-white/20 shadow-2xl">
          <CardHeader className="text-center pb-6">
            <div className="mx-auto w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mb-4">
              <Shield className="h-8 w-8 text-white" />
            </div>
            <CardTitle className="text-2xl font-bold text-white">
              Admin Access
            </CardTitle>
            <CardDescription className="text-blue-100">
              Secure access to CareerAI administration panel
            </CardDescription>
          </CardHeader>
          
          <CardContent className="space-y-6">
            <div className="text-center">
              <p className="text-blue-100 mb-6">
                This area is restricted to authorized administrators only. 
                Please authenticate to continue.
              </p>
              
              <Button 
                variant="hero" 
                size="lg"
                className="w-full bg-white text-primary hover:bg-white/90"
                onClick={() => setIsLoginModalOpen(true)}
              >
                <Shield className="h-5 w-5 mr-2" />
                Access Admin Panel
              </Button>
            </div>

            {/* Security notice */}
            <div className="bg-white/5 rounded-lg p-4 border border-white/10">
              <h4 className="text-white font-semibold mb-2 flex items-center gap-2">
                <Shield className="h-4 w-4" />
                Security Notice
              </h4>
              <ul className="text-blue-100 text-sm space-y-1">
                <li>• All admin activities are logged and monitored</li>
                <li>• Unauthorized access attempts will be reported</li>
                <li>• Session will timeout after 30 minutes of inactivity</li>
              </ul>
            </div>

            {/* Demo credentials info */}
            <div className="bg-white/5 rounded-lg p-4 border border-white/10">
              <h4 className="text-white font-semibold mb-2">Demo Access</h4>
              <div className="text-blue-100 text-sm space-y-1">
                <p><strong>Admin:</strong> username: <code className="bg-white/10 px-1 rounded">admin</code> / password: <code className="bg-white/10 px-1 rounded">admin123</code></p>
                <p><strong>Super Admin:</strong> username: <code className="bg-white/10 px-1 rounded">superadmin</code> / password: <code className="bg-white/10 px-1 rounded">super123</code></p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Footer */}
        <div className="text-center mt-6">
          <p className="text-blue-200 text-sm">
            © 2024 CareerAI. All rights reserved.
          </p>
        </div>
      </div>

      {/* Login Modal */}
      <AdminLoginModal 
        isOpen={isLoginModalOpen}
        onClose={() => setIsLoginModalOpen(false)}
        onSuccess={handleLoginSuccess}
      />
    </div>
  );
};

export default AdminLogin;