import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  FileText,
  Mail,
  MessageSquare,
  User,
  TrendingUp,
  ArrowRight,
  Star,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";

const Dashboard = () => {
  const navigate = useNavigate();
  const { user: authUser, logout } = useAuth();

  const user = authUser || {
    name: "John Doe",
    email: "john.doe@email.com",
    joinDate: "March 2024",
    plan: "Pro",
  };

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  // const stats = [
  //   {
  //     title: "Resumes Created",
  //     value: "3",
  //     icon: FileText,
  //     color: "text-blue-600"
  //   },
  //   {
  //     title: "Cover Letters",
  //     value: "8",
  //     icon: Mail,
  //     color: "text-purple-600"
  //   },
  //   {
  //     title: "Mock Interviews",
  //     value: "12",
  //     icon: MessageSquare,
  //     color: "text-green-600"
  //   },
  //   {
  //     title: "Job Applications",
  //     value: "15",
  //     icon: Target,
  //     color: "text-orange-600"
  //   }
  // ];

  // simplified dashboard - no recent activity list

  const services = [
    {
      icon: FileText,
      title: "AI Resume Builder",
      description: "Create ATS-optimized resumes using professional templates.",
      color: "bg-blue-500",
      route: "/resume-builder",
    },
    {
      icon: Mail,
      title: "Cover Letter Generator",
      description:
        "Upload a resume, add basics, and generate a tailored cover letter.",
      color: "bg-purple-500",
      route: "/cover-letter",
    },
    {
      icon: MessageSquare,
      title: "Mock Interview Practice",
      description:
        "Choose role and skills; practice with AI-generated questions.",
      color: "bg-green-500",
      route: "/mock-interview",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-subtle">
      {/* Header */}
      <header className="bg-background border-b border-border">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <h1 className="text-xl font-bold bg-gradient-primary bg-clip-text text-transparent">
                CareerAI
              </h1>
            </div>
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center rounded-full bg-gradient-primary text-white text-sm px-4 py-1.5 leading-none font-medium">
                {user.plan} Plan
              </span>
              <Button
                variant="outline"
                size="sm"
                onClick={() => navigate("/profile")}
                className="bg-gradient-subtle hover:bg-primary hover:text-white transition-all duration-300"
              >
                <User className="h-4 w-4 mr-2" />
                Profile
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={handleLogout}
                className="text-red-500 hover:bg-red-50 hover:text-red-600 transition-all duration-300"
              >
                Logout
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-foreground mb-2">
            Welcome back, {user.name}! 👋
          </h2>
          <p className="text-muted-foreground text-lg">
            Continue building your career with our AI-powered tools. You're
            making great progress!
          </p>
        </div>

        {/* Stats Grid */}
        {/* <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => {
            const IconComponent = stat.icon;
            return (
              <Card key={index} className="bg-gradient-card border-0 shadow-card hover:shadow-hover transition-all duration-300">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-muted-foreground text-sm font-medium">{stat.title}</p>
                      <p className="text-3xl font-bold text-foreground">{stat.value}</p>
                    </div>
                    <div className={`p-3 rounded-full bg-gradient-primary`}>
                      <IconComponent className="h-6 w-6 text-white" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div> */}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Services */}
          <div className="lg:col-span-2">
            <h3 className="text-2xl font-bold text-foreground mb-6">
              Your Career Tools
            </h3>
            <div className="space-y-6">
              {services.map((service, index) => {
                const IconComponent = service.icon;
                return (
                  <Card
                    key={index}
                    className="group hover:shadow-hover transition-all duration-300 hover:-translate-y-1 bg-gradient-card border-0 shadow-card cursor-pointer"
                    onClick={() => navigate(service.route)}
                  >
                    <CardHeader className="pb-4">
                      <div className="flex items-center gap-4">
                        <div
                          className={`p-3 rounded-full bg-gradient-primary group-hover:scale-110 transition-transform duration-300`}
                        >
                          <IconComponent className="h-6 w-6 text-white" />
                        </div>
                        <div>
                          <CardTitle className="text-xl group-hover:text-primary transition-colors">
                            {service.title}
                          </CardTitle>
                          <CardDescription className="text-muted-foreground">
                            {service.description}
                          </CardDescription>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="pt-0">
                      <Button
                        variant="outline"
                        className={`
                          w-full mt-4
                          ${
                            service.icon === FileText ? "hover:bg-blue-500" : ""
                          }
                          ${service.icon === Mail ? "hover:bg-purple-500" : ""}
                          ${
                            service.icon === MessageSquare
                              ? "hover:bg-green-500"
                              : ""
                          }
                          hover:text-white transition-all duration-300
                        `}
                        onClick={(e) => {
                          e.stopPropagation();
                          navigate(service.route);
                        }}
                      >
                        {service.icon === FileText && "Create Resume"}
                        {service.icon === Mail && "Generate Cover Letter"}
                        {service.icon === MessageSquare &&
                          "Start Mock Interview"}
                        <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                      </Button>
                    </CardContent>
                    <CardContent className="pt-0" />
                  </Card>
                );
              })}
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Actions */}
            <Card className="bg-gradient-card border-0 shadow-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Star className="h-5 w-5 text-primary" />
                  Quick Actions
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full justify-start"
                  onClick={() => navigate("/resume-builder")}
                >
                  <FileText className="h-4 w-4 mr-2" />
                  Create New Resume
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full justify-start"
                  onClick={() => navigate("/cover-letter")}
                >
                  <Mail className="h-4 w-4 mr-2" />
                  Generate Cover Letter
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full justify-start"
                  onClick={() => navigate("/mock-interview")}
                >
                  <MessageSquare className="h-4 w-4 mr-2" />
                  Start Mock Interview
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full justify-start"
                >
                  <TrendingUp className="h-4 w-4 mr-2" />
                  View Analytics
                </Button>
              </CardContent>
            </Card>

            {/* Upgrade Prompt */}
            <Card className="bg-gradient-primary text-white border-0">
              <CardContent className="p-6 text-center">
                <h4 className="font-bold mb-2">Unlock Premium Features</h4>
                <p className="text-blue-100 text-sm mb-4">
                  Get unlimited access to all tools and advanced analytics.
                </p>
                <Button
                  variant="hero"
                  size="sm"
                  className="bg-white text-primary hover:bg-white/90"
                >
                  Upgrade Now
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
