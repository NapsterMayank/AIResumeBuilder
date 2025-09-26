import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Shield, LogOut, User, Home } from "lucide-react";
import { useAdminAuth } from "@/contexts/AdminAuthContext";
import { useNavigate } from "react-router-dom";

const AdminHeader = () => {
  const { admin, logout } = useAdminAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const handleBackToSite = () => {
    navigate('/');
  };

  return (
    <header className="bg-background border-b border-border shadow-sm">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <Shield className="h-6 w-6 text-primary" />
              <h1 className="text-xl font-bold text-foreground">CareerAI Admin</h1>
            </div>
            <Badge variant="secondary" className="bg-primary/10 text-primary">
              Admin Panel
            </Badge>
          </div>
          
          <div className="flex items-center gap-4">
            <Button 
              variant="ghost" 
              size="sm"
              onClick={handleBackToSite}
            >
              <Home className="h-4 w-4 mr-2" />
              Back to Site
            </Button>
            
            <div className="flex items-center gap-2">
              <User className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm font-medium">{admin?.username}</span>
              <Badge 
                variant={admin?.role === 'super_admin' ? 'default' : 'secondary'}
                className="text-xs"
              >
                {admin?.role === 'super_admin' ? 'Super Admin' : 'Admin'}
              </Badge>
            </div>
            
            <Button 
              variant="outline" 
              size="sm"
              onClick={handleLogout}
            >
              <LogOut className="h-4 w-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default AdminHeader;