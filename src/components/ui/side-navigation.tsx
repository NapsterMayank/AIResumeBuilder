import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Menu, X, LogIn, User, LogOut, Star, Play, ArrowRight } from "lucide-react";
import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";

const SideNavigation = () => {
  const [open, setOpen] = useState(false);
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    setOpen(false);
    navigate('/');
  };

  const openLoginModal = () => {
    document.dispatchEvent(new Event('open-login-modal'));
    setOpen(false);
  };

  const navLinks = [
    { href: "#services", label: "Services" },
    { href: "#pricing", label: "Pricing" },
    { href: "#about", label: "About" },
    { href: "#testimonials", label: "Testimonials" },
    { href: "#contact", label: "Contact" },
  ];

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="md:hidden">
          <Menu className="h-6 w-6" />
          <span className="sr-only">Toggle navigation menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-[300px] sm:w-[400px] bg-gradient-card border-r border-border">
        <SheetHeader className="border-b border-border pb-4">
          <SheetTitle className="text-2xl font-bold bg-gradient-primary bg-clip-text text-transparent">
            CareerAI
          </SheetTitle>
        </SheetHeader>
        <ScrollArea className="my-4 h-[calc(100vh-8rem)] pb-10">
          <div className="flex flex-col space-y-3">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="flex items-center py-2 text-foreground hover:text-primary transition-smooth"
              >
                {link.label}
              </a>
            ))}
          </div>

          <div className="mt-8 space-y-4">
            {user ? (
              <>
                <Button 
                  variant="outline" 
                  className="w-full justify-start" 
                  onClick={() => {
                    setOpen(false);
                    navigate('/dashboard');
                  }}
                >
                  <User className="mr-2 h-4 w-4" />
                  Dashboard
                </Button>
                <Button 
                  variant="outline" 
                  className="w-full justify-start text-red-500 hover:text-red-600 hover:bg-red-50" 
                  onClick={handleLogout}
                >
                  <LogOut className="mr-2 h-4 w-4" />
                  Logout
                </Button>
              </>
            ) : (
              <>
                {/* <Button 
                  variant="outline" 
                  className="w-full justify-start" 
                  onClick={openLoginModal}
                >
                  <LogIn className="mr-2 h-4 w-4" />
                  Sign In
                </Button> */}
                <Button 
                  variant="default" 
                  className="w-full bg-gradient-primary hover:bg-gradient-primary/90" 
                  onClick={openLoginModal}
                >
                  <ArrowRight className="mr-2 h-4 w-4" />
                  Get Started
                </Button>
              </>
            )}
          </div>

          {!user && (
            <div className="mt-8 pt-8 border-t border-border">
              <div className="flex items-center gap-2 mb-4">
                <Star className="h-4 w-4 text-yellow-400 fill-current" />
                <span className="text-sm font-medium">Trusted by 50,000+ users</span>
              </div>
              <div className="grid grid-cols-2 gap-4 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <svg className="h-4 w-4 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M5 13l4 4L19 7" />
                  </svg>
                  Smart Resume Builder
                </div>
                <div className="flex items-center gap-2">
                  <svg className="h-4 w-4 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M5 13l4 4L19 7" />
                  </svg>
                  AI Cover Letters
                </div>
                <div className="flex items-center gap-2">
                  <svg className="h-4 w-4 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M5 13l4 4L19 7" />
                  </svg>
                  Mock Interviews
                </div>
                <div className="flex items-center gap-2">
                  <svg className="h-4 w-4 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M5 13l4 4L19 7" />
                  </svg>
                  Career Analytics
                </div>
              </div>
            </div>
          )}
        </ScrollArea>
      </SheetContent>
    </Sheet>
  );
};

export default SideNavigation;