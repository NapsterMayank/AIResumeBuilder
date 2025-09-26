import { useAuth } from '@/contexts/AuthContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, User } from 'lucide-react';

const Profile = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const name = user?.name || 'Guest User';
  const email = user?.email || 'guest@example.com';
  const plan = (user as any)?.plan || 'Free';

  return (
    <div className="min-h-screen bg-gradient-subtle">
      <header className="bg-background border-b border-border">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="sm" onClick={() => navigate('/dashboard')}>
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Dashboard
              </Button>
              <h1 className="text-xl font-bold text-foreground">Your Profile</h1>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="space-y-6">
            <Card className="bg-gradient-primary text-white border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-white">
                  <User className="h-5 w-5" />
                  {plan} Plan
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-sm space-y-1">
                  <div className="flex justify-between items-center">
                    <span>Resume Credits</span>
                    <span className="font-medium">12/15 remaining</span>
                  </div>
                  <div className="w-full bg-white/20 rounded-full h-2">
                    <div className="bg-white rounded-full h-2" style={{ width: '80%' }} />
                  </div>
                </div>
                <div className="text-sm space-y-1">
                  <div className="flex justify-between items-center">
                    <span>Cover Letters</span>
                    <span className="font-medium">8/10 remaining</span>
                  </div>
                  <div className="w-full bg-white/20 rounded-full h-2">
                    <div className="bg-white rounded-full h-2" style={{ width: '80%' }} />
                  </div>
                </div>
                <div className="text-sm space-y-1">
                  <div className="flex justify-between items-center">
                    <span>Mock Interviews</span>
                    <span className="font-medium">5/5 remaining</span>
                  </div>
                  <div className="w-full bg-white/20 rounded-full h-2">
                    <div className="bg-white rounded-full h-2" style={{ width: '100%' }} />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-card border-0 shadow-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <User className="h-5 w-5 text-primary" />
                  Account Details
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="text-sm"><span className="text-muted-foreground">Member:</span> <span className="font-medium">{name}</span></div>
                <div className="text-sm"><span className="text-muted-foreground">Email:</span> <span className="font-medium">{email}</span></div>
                <div className="text-sm"><span className="text-muted-foreground">Member since:</span> <span className="font-medium">March 2024</span></div>
              </CardContent>
            </Card>
          </div>

          <Card className="md:col-span-2 bg-white border border-gray-200 shadow-card">
            <CardHeader>
              <CardTitle>Account Information</CardTitle>
              <CardDescription>Basic details associated with your account.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label className="text-sm">Full Name</Label>
                <Input value={name} readOnly className="mt-1" />
              </div>
              <div>
                <Label className="text-sm">Email</Label>
                <Input value={email} readOnly className="mt-1" />
              </div>
              <div>
                <Label className="text-sm">Subscription Plan</Label>
                <Input value={plan} readOnly className="mt-1" />
              </div>
              <div className="pt-2">
                <Button variant="outline" onClick={() => navigate('/pricing')}>Upgrade Plan</Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Profile;


