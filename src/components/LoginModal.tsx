import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Loader2, Mail, Lock, Eye, EyeOff } from 'lucide-react';

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

const LoginModal = ({ isOpen, onClose, onSuccess }: LoginModalProps) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    if (!email || !password) {
      setError('Please fill in all fields');
      setIsLoading(false);
      return;
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters');
      setIsLoading(false);
      return;
    }

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      onSuccess();
      onClose();
      setEmail('');
      setPassword('');
    }, 1500);
  };

  const handleClose = () => {
    setEmail('');
    setPassword('');
    setError('');
    setShowPassword(false);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-md mx-4 sm:mx-0 mr-6">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 via-white to-purple-50/50 rounded-lg" />
        <div className="relative">
          <DialogHeader className="space-y-4 pb-6">
            <div className="mx-auto w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center mb-2">
              <Lock className="h-8 w-8 text-white" />
            </div>
            <DialogTitle className="text-3xl font-bold text-center bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
              Welcome Back
            </DialogTitle>
            <DialogDescription className="text-center text-lg text-gray-600">
              Sign in to access your AI career tools
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-6" onSubmit={handleSubmit}>
            {error && (
              <Alert variant="destructive" className="border-red-200 bg-red-50">
                <AlertDescription className="text-red-800">{error}</AlertDescription>
              </Alert>
            )}

            <div className="space-y-3">
              <Label htmlFor="email" className="text-sm font-semibold text-gray-700">
                Email Address
              </Label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="pl-12 pr-4 py-3 text-base border-2 border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200 rounded-lg"
                  disabled={isLoading}
                />
              </div>
            </div>

            <div className="space-y-3">
              <Label htmlFor="password" className="text-sm font-semibold text-gray-700">
                Password
              </Label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pl-12 pr-12 py-3 text-base border-2 border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200 rounded-lg"
                  disabled={isLoading}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                  disabled={isLoading}
                >
                  {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>
            </div>

            <Button 
              type="submit" 
              onClick={handleSubmit}
              className="w-full py-3 text-base font-semibold bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white border-0 rounded-lg shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98]"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-3 h-5 w-5 animate-spin" />
                  Signing In...
                </>
              ) : (
                'Sign In'
              )}
            </Button>

            <div className="text-center pt-4 border-t border-gray-100">
              <div className="inline-block bg-blue-50 rounded-lg px-4 py-3 border border-blue-200">
                <p className="text-sm font-medium text-blue-800 mb-1">Demo Mode</p>
                <p className="text-xs text-blue-600">
                  Use any email + password (6+ characters)
                </p>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default LoginModal;