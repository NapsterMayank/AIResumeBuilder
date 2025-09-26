import { Button } from "@/components/ui/button";
import { User, LogOut } from "lucide-react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import LoginModal from "./LoginModal";
import SideNavigation from "./ui/side-navigation";

const Header = () => {
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const handleOpenLoginModal = () => setIsLoginModalOpen(true);
    document.addEventListener('open-login-modal', handleOpenLoginModal);
    return () => document.removeEventListener('open-login-modal', handleOpenLoginModal);
  }, []);

  const handleLoginSuccess = () => {
    navigate('/dashboard');
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo and Desktop Navigation */}
          <div className="flex items-center gap-4">
            <div className="flex-shrink-0">
              <h1 className="text-2xl font-bold bg-gradient-primary bg-clip-text text-transparent">
                CareerAI
              </h1>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:block">
              <div className="flex items-baseline space-x-8">
                <a href="#services" className="text-foreground hover:text-primary transition-smooth">
                  Services
                </a>
                <a href="/pricing" className="text-foreground hover:text-primary transition-smooth">
                  Pricing
                </a>
                <a href="#about" className="text-foreground hover:text-primary transition-smooth">
                  About
                </a>
                <a href="#testimonials" className="text-foreground hover:text-primary transition-smooth">
                  Testimonials
                </a>
                <a href="#contact" className="text-foreground hover:text-primary transition-smooth">
                  Contact
                </a>
              </div>
            </nav>
          </div>

          {/* Desktop CTA */}
          <div className="hidden md:flex items-center gap-4">
            {user ? (
              <>
                <Button 
                  variant="ghost" 
                  size="sm"
                  onClick={() => navigate('/dashboard')}
                  className="hover:bg-primary/10"
                >
                  <User className="h-4 w-4 mr-2" />
                  Dashboard
                </Button>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={handleLogout}
                  className="text-red-500 hover:bg-red-50 hover:text-red-600"
                >
                  <LogOut className="h-4 w-4 mr-2" />
                  Logout
                </Button>
              </>
            ) : (
              <>
                <Button 
                  variant="ghost" 
                  size="sm"
                  onClick={() => setIsLoginModalOpen(true)}
                  className="hover:bg-primary/10"
                >
                  Sign In
                </Button>
                <Button 
                  variant="hero" 
                  size="sm"
                  onClick={() => setIsLoginModalOpen(true)}
                  className="bg-gradient-primary hover:opacity-90"
                >
                  Get Started
                </Button>
              </>
            )}
          </div>

          {/* Mobile Navigation */}
          <div className="md:hidden">
            <SideNavigation />
          </div>
        </div>
      </div>

      {/* Login Modal */}
      <LoginModal 
        isOpen={isLoginModalOpen}
        onClose={() => setIsLoginModalOpen(false)}
        onSuccess={handleLoginSuccess}
      />
    </header>
  );
};

export default Header;