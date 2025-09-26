import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Users, 
  FileText, 
  Mail, 
  MessageSquare, 
  TrendingUp, 
  Calendar,
  Activity,
  Settings,
  BarChart3,
  UserCheck,
  Clock,
  Target,
  CreditCard,
  DollarSign
} from 'lucide-react';
import AdminHeader from '@/components/admin/AdminHeader';

const AdminDashboard = () => {
  // Mock data - in real app, this would come from API
  const [stats] = useState({
    totalUsers: 1247,
    activeUsers: 892,
    resumesCreated: 3456,
    coverLettersGenerated: 2134,
    mockInterviewsCompleted: 1876,
    monthlyGrowth: 23.5,
    conversionRate: 12.8
  });

  const [users] = useState([
    {
      id: '1',
      name: 'John Doe',
      email: 'john@example.com',
      joinDate: '2024-01-15',
      plan: 'Pro',
      status: 'active',
      resumesCreated: 3,
      coverLetters: 8,
      interviews: 12,
      purchaseDate: '2024-01-15',
      amount: 29.99,
      paymentMethod: 'Credit Card',
      subscriptionStatus: 'active'
    },
    {
      id: '2',
      name: 'Sarah Chen',
      email: 'sarah@example.com',
      joinDate: '2024-02-20',
      plan: 'Free',
      status: 'active',
      resumesCreated: 1,
      coverLetters: 2,
      interviews: 5,
      purchaseDate: '2024-02-20',
      amount: 0,
      paymentMethod: 'N/A',
      subscriptionStatus: 'free'
    },
    {
      id: '3',
      name: 'Marcus Johnson',
      email: 'marcus@example.com',
      joinDate: '2024-01-08',
      plan: 'Pro',
      status: 'inactive',
      resumesCreated: 5,
      coverLetters: 15,
      interviews: 8,
      purchaseDate: '2024-01-08',
      amount: 29.99,
      paymentMethod: 'PayPal',
      subscriptionStatus: 'cancelled'
    },
    {
      id: '4',
      name: 'Priya Patel',
      email: 'priya@example.com',
      joinDate: '2024-03-01',
      plan: 'Premium',
      status: 'active',
      resumesCreated: 2,
      coverLetters: 6,
      interviews: 18,
      purchaseDate: '2024-03-01',
      amount: 59.99,
      paymentMethod: 'Credit Card',
      subscriptionStatus: 'active'
    }
  ]);

  // Package/Subscription data
  const [packages] = useState([
    {
      id: '1',
      name: 'Free',
      price: 0,
      features: ['1 Resume', '2 Cover Letters', '5 Mock Interviews'],
      users: 312,
      revenue: 0
    },
    {
      id: '2',
      name: 'Pro',
      price: 29.99,
      features: ['Unlimited Resumes', 'Unlimited Cover Letters', 'Unlimited Mock Interviews', 'ATS Optimization'],
      users: 567,
      revenue: 16998.33
    },
    {
      id: '3',
      name: 'Premium',
      price: 59.99,
      features: ['Everything in Pro', 'Priority Support', 'Advanced Analytics', 'Custom Templates'],
      users: 368,
      revenue: 22076.32
    }
  ]);

  const [services] = useState([
    {
      id: '1',
      name: 'AI Resume Builder',
      description: 'Create ATS-optimized resumes with industry-specific templates',
      status: 'active',
      usage: 3456,
      successRate: 95,
      avgRating: 4.8
    },
    {
      id: '2',
      name: 'AI Cover Letter Generator',
      description: 'Generate personalized cover letters for any job application',
      status: 'active',
      usage: 2134,
      successRate: 87,
      avgRating: 4.6
    },
    {
      id: '3',
      name: 'AI Mock Interview Questions',
      description: 'Practice with realistic interview scenarios from top companies',
      status: 'active',
      usage: 1876,
      successRate: 92,
      avgRating: 4.9
    }
  ]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-success text-success-foreground';
      case 'inactive': return 'bg-muted text-muted-foreground';
      default: return 'bg-secondary text-secondary-foreground';
    }
  };

  const getPlanColor = (plan: string) => {
    switch (plan) {
      case 'Premium': return 'bg-gradient-primary text-white';
      case 'Pro': return 'bg-primary/10 text-primary';
      case 'Free': return 'bg-muted text-muted-foreground';
      default: return 'bg-secondary text-secondary-foreground';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-subtle">
      <AdminHeader />
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-foreground mb-2">
            Admin Dashboard
          </h2>
          <p className="text-muted-foreground text-lg">
            Monitor platform performance and manage users and services
          </p>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="bg-gradient-card border-0 shadow-card">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-muted-foreground text-sm font-medium">Total Users</p>
                  <p className="text-3xl font-bold text-foreground">{stats.totalUsers.toLocaleString()}</p>
                </div>
                <div className="p-3 rounded-full bg-gradient-primary">
                  <Users className="h-6 w-6 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-card border-0 shadow-card">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-muted-foreground text-sm font-medium">Active Users</p>
                  <p className="text-3xl font-bold text-foreground">{stats.activeUsers.toLocaleString()}</p>
                </div>
                <div className="p-3 rounded-full bg-gradient-primary">
                  <UserCheck className="h-6 w-6 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-card border-0 shadow-card">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-muted-foreground text-sm font-medium">Monthly Growth</p>
                  <p className="text-3xl font-bold text-success">+{stats.monthlyGrowth}%</p>
                </div>
                <div className="p-3 rounded-full bg-gradient-primary">
                  <TrendingUp className="h-6 w-6 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-card border-0 shadow-card">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-muted-foreground text-sm font-medium">Conversion Rate</p>
                  <p className="text-3xl font-bold text-primary">{stats.conversionRate}%</p>
                </div>
                <div className="p-3 rounded-full bg-gradient-primary">
                  <Target className="h-6 w-6 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Tabs */}
        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="users">Users</TabsTrigger>
            <TabsTrigger value="packages">Packages</TabsTrigger>
            <TabsTrigger value="services">Services</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Service Usage */}
              <Card className="bg-gradient-card border-0 shadow-card">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Activity className="h-5 w-5 text-primary" />
                    Service Usage
                  </CardTitle>
                  <CardDescription>
                    Total usage across all AI services
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <FileText className="h-4 w-4 text-blue-600" />
                        <span className="text-sm font-medium">Resume Builder</span>
                      </div>
                      <span className="text-sm font-bold">{stats.resumesCreated.toLocaleString()}</span>
                    </div>
                    <Progress value={75} className="h-2" />
                  </div>
                  
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Mail className="h-4 w-4 text-purple-600" />
                        <span className="text-sm font-medium">Cover Letter Generator</span>
                      </div>
                      <span className="text-sm font-bold">{stats.coverLettersGenerated.toLocaleString()}</span>
                    </div>
                    <Progress value={60} className="h-2" />
                  </div>
                  
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <MessageSquare className="h-4 w-4 text-green-600" />
                        <span className="text-sm font-medium">Mock Interviews</span>
                      </div>
                      <span className="text-sm font-bold">{stats.mockInterviewsCompleted.toLocaleString()}</span>
                    </div>
                    <Progress value={50} className="h-2" />
                  </div>
                </CardContent>
              </Card>

              {/* Recent Activity */}
              <Card className="bg-gradient-card border-0 shadow-card">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Clock className="h-5 w-5 text-primary" />
                    Recent Activity
                  </CardTitle>
                  <CardDescription>
                    Latest platform activities
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-success rounded-full mt-2"></div>
                      <div className="flex-1">
                        <p className="text-sm text-foreground">New user registration: john@example.com</p>
                        <p className="text-xs text-muted-foreground">2 minutes ago</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-primary rounded-full mt-2"></div>
                      <div className="flex-1">
                        <p className="text-sm text-foreground">Resume created by Sarah Chen</p>
                        <p className="text-xs text-muted-foreground">15 minutes ago</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-yellow-500 rounded-full mt-2"></div>
                      <div className="flex-1">
                        <p className="text-sm text-foreground">Cover letter generated by Marcus Johnson</p>
                        <p className="text-xs text-muted-foreground">1 hour ago</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-purple-500 rounded-full mt-2"></div>
                      <div className="flex-1">
                        <p className="text-sm text-foreground">Mock interview completed by Priya Patel</p>
                        <p className="text-xs text-muted-foreground">3 hours ago</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Users Tab */}
          <TabsContent value="users" className="space-y-6">
            <Card className="bg-gradient-card border-0 shadow-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="h-5 w-5 text-primary" />
                  User Management
                </CardTitle>
                <CardDescription>
                  View and manage all registered users
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {users.map((user) => (
                    <div key={user.id} className="p-4 border border-border rounded-lg">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-gradient-primary rounded-full flex items-center justify-center text-white font-semibold">
                            {user.name.charAt(0)}
                          </div>
                          <div>
                            <h4 className="font-semibold text-foreground">{user.name}</h4>
                            <p className="text-sm text-muted-foreground">{user.email}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge className={getPlanColor(user.plan)}>
                            {user.plan}
                          </Badge>
                          <Badge className={getStatusColor(user.status)}>
                            {user.status}
                          </Badge>
                        </div>
                      </div>
                      <div className="mt-3 pt-3 border-t border-border">
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm">
                          <div>
                            <span className="text-muted-foreground">Joined:</span>
                            <p className="font-medium">{new Date(user.joinDate).toLocaleDateString()}</p>
                          </div>
                          <div>
                            <span className="text-muted-foreground">Resumes:</span>
                            <p className="font-medium">{user.resumesCreated}</p>
                          </div>
                          <div>
                            <span className="text-muted-foreground">Cover Letters:</span>
                            <p className="font-medium">{user.coverLetters}</p>
                          </div>
                          <div>
                            <span className="text-muted-foreground">Interviews:</span>
                            <p className="font-medium">{user.interviews}</p>
                          </div>
                        </div>
                        <div className="mt-3 pt-3 border-t border-border">
                          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm">
                            <div>
                              <span className="text-muted-foreground">Package:</span>
                              <p className="font-medium">{user.plan}</p>
                            </div>
                            <div>
                              <span className="text-muted-foreground">Amount Paid:</span>
                              <p className="font-medium">${user.amount}</p>
                            </div>
                            <div>
                              <span className="text-muted-foreground">Payment Method:</span>
                              <p className="font-medium">{user.paymentMethod}</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Packages Tab */}
          <TabsContent value="packages" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Package Overview */}
              <Card className="bg-gradient-card border-0 shadow-card">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <CreditCard className="h-5 w-5 text-primary" />
                    Package Overview
                  </CardTitle>
                  <CardDescription>
                    Revenue and user distribution by package
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  {packages.map((pkg) => (
                    <div key={pkg.id} className="p-4 border border-border rounded-lg">
                      <div className="flex items-center justify-between mb-3">
                        <div>
                          <h4 className="font-semibold text-foreground">{pkg.name}</h4>
                          <p className="text-2xl font-bold text-primary">${pkg.price}/month</p>
                        </div>
                        <div className="text-right">
                          <div className="text-lg font-bold text-foreground">{pkg.users} users</div>
                          <div className="text-sm text-muted-foreground">
                            ${pkg.revenue.toLocaleString()} revenue
                          </div>
                        </div>
                      </div>
                      <div className="space-y-1">
                        {pkg.features.map((feature, index) => (
                          <div key={index} className="text-sm text-muted-foreground flex items-center gap-2">
                            <span className="text-primary">•</span>
                            {feature}
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* User Subscriptions */}
              <Card className="bg-gradient-card border-0 shadow-card">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <DollarSign className="h-5 w-5 text-primary" />
                    User Subscriptions
                  </CardTitle>
                  <CardDescription>
                    Detailed view of user purchases and subscriptions
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {users.filter(user => user.plan !== 'Free').map((user) => (
                      <div key={user.id} className="p-4 border border-border rounded-lg">
                        <div className="flex items-center justify-between mb-3">
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 bg-gradient-primary rounded-full flex items-center justify-center text-white text-sm font-semibold">
                              {user.name.charAt(0)}
                            </div>
                            <div>
                              <h4 className="font-medium text-foreground">{user.name}</h4>
                              <p className="text-sm text-muted-foreground">{user.email}</p>
                            </div>
                          </div>
                          <Badge className={getPlanColor(user.plan)}>
                            {user.plan}
                          </Badge>
                        </div>
                        <div className="grid grid-cols-2 gap-4 text-sm">
                          <div>
                            <span className="text-muted-foreground">Purchase Date:</span>
                            <p className="font-medium">{new Date(user.purchaseDate).toLocaleDateString()}</p>
                          </div>
                          <div>
                            <span className="text-muted-foreground">Amount:</span>
                            <p className="font-medium text-success">${user.amount}</p>
                          </div>
                          <div>
                            <span className="text-muted-foreground">Payment Method:</span>
                            <p className="font-medium">{user.paymentMethod}</p>
                          </div>
                          <div>
                            <span className="text-muted-foreground">Status:</span>
                            <Badge 
                              variant={user.subscriptionStatus === 'active' ? 'default' : 'secondary'}
                              className={user.subscriptionStatus === 'active' ? 'bg-success text-success-foreground' : ''}
                            >
                              {user.subscriptionStatus}
                            </Badge>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Revenue Summary */}
            <Card className="bg-gradient-card border-0 shadow-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="h-5 w-5 text-primary" />
                  Revenue Summary
                </CardTitle>
                <CardDescription>
                  Total revenue breakdown by package type
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {packages.filter(pkg => pkg.name !== 'Free').map((pkg) => (
                    <div key={pkg.id} className="text-center p-6 bg-background rounded-lg">
                      <h4 className="font-semibold text-foreground mb-2">{pkg.name} Package</h4>
                      <div className="text-3xl font-bold text-primary mb-1">
                        ${pkg.revenue.toLocaleString()}
                      </div>
                      <div className="text-sm text-muted-foreground mb-3">
                        {pkg.users} subscribers
                      </div>
                      <div className="text-xs text-muted-foreground">
                        Avg: ${(pkg.revenue / pkg.users).toFixed(2)} per user
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-6 p-4 bg-gradient-primary rounded-lg text-white text-center">
                  <h4 className="font-semibold mb-2">Total Monthly Revenue</h4>
                  <div className="text-2xl font-bold">
                    ${packages.reduce((total, pkg) => total + pkg.revenue, 0).toLocaleString()}
                  </div>
                  <div className="text-sm text-blue-100">
                    From {packages.reduce((total, pkg) => total + pkg.users, 0)} total users
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Services Tab */}
          <TabsContent value="services" className="space-y-6">
            <Card className="bg-gradient-card border-0 shadow-card">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="flex items-center gap-2">
                      <Settings className="h-5 w-5 text-primary" />
                      Service Management
                    </CardTitle>
                    <CardDescription>
                      Monitor and manage AI services
                    </CardDescription>
                  </div>
                  <Button variant="hero" size="sm">
                    Add New Service
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {services.map((service) => (
                    <div key={service.id} className="p-6 border border-border rounded-lg">
                      <div className="flex items-center justify-between mb-4">
                        <div>
                          <h4 className="text-lg font-semibold text-foreground">{service.name}</h4>
                          <p className="text-muted-foreground">{service.description}</p>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge className={getStatusColor(service.status)}>
                            {service.status}
                          </Badge>
                          <Button variant="outline" size="sm">
                            Edit
                          </Button>
                        </div>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="text-center p-4 bg-background rounded-lg">
                          <div className="text-2xl font-bold text-primary">{service.usage.toLocaleString()}</div>
                          <div className="text-sm text-muted-foreground">Total Usage</div>
                        </div>
                        <div className="text-center p-4 bg-background rounded-lg">
                          <div className="text-2xl font-bold text-success">{service.successRate}%</div>
                          <div className="text-sm text-muted-foreground">Success Rate</div>
                        </div>
                        <div className="text-center p-4 bg-background rounded-lg">
                          <div className="text-2xl font-bold text-yellow-600">{service.avgRating}/5</div>
                          <div className="text-sm text-muted-foreground">Avg Rating</div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Analytics Tab */}
          <TabsContent value="analytics" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="bg-gradient-card border-0 shadow-card">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BarChart3 className="h-5 w-5 text-primary" />
                    Platform Analytics
                  </CardTitle>
                  <CardDescription>
                    Key performance metrics
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center p-4 bg-background rounded-lg">
                      <div className="text-xl font-bold text-primary">95%</div>
                      <div className="text-sm text-muted-foreground">User Satisfaction</div>
                    </div>
                    <div className="text-center p-4 bg-background rounded-lg">
                      <div className="text-xl font-bold text-success">78%</div>
                      <div className="text-sm text-muted-foreground">Job Success Rate</div>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>Resume Builder Usage</span>
                        <span>75%</span>
                      </div>
                      <Progress value={75} className="h-2" />
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>Cover Letter Usage</span>
                        <span>60%</span>
                      </div>
                      <Progress value={60} className="h-2" />
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>Mock Interview Usage</span>
                        <span>50%</span>
                      </div>
                      <Progress value={50} className="h-2" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gradient-card border-0 shadow-card">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Calendar className="h-5 w-5 text-primary" />
                    Monthly Trends
                  </CardTitle>
                  <CardDescription>
                    Growth and usage trends
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium">New Users</span>
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-bold">+156</span>
                        <Badge variant="secondary" className="bg-success/10 text-success">
                          +23%
                        </Badge>
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium">Service Usage</span>
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-bold">+2,341</span>
                        <Badge variant="secondary" className="bg-success/10 text-success">
                          +18%
                        </Badge>
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium">Revenue</span>
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-bold">$12,450</span>
                        <Badge variant="secondary" className="bg-success/10 text-success">
                          +31%
                        </Badge>
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium">Conversion Rate</span>
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-bold">12.8%</span>
                        <Badge variant="secondary" className="bg-success/10 text-success">
                          +2.1%
                        </Badge>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default AdminDashboard;