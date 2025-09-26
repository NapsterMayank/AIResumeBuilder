import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Check, 
  Star, 
  Zap, 
  Crown, 
  ArrowRight,
  Users,
  FileText,
  Mail,
  MessageSquare,
  BarChart3,
  Shield,
  Headphones
} from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import LoginModal from "@/components/LoginModal";

const Pricing = () => {
  const [isAnnual, setIsAnnual] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleGetStarted = (planName: string) => {
    if (user) {
      // If user is logged in, redirect to dashboard
      navigate('/dashboard');
    } else {
      // If not logged in, show login modal
      setIsLoginModalOpen(true);
    }
  };

  const handleLoginSuccess = () => {
    navigate('/dashboard');
  };

  const plans = [
    {
      name: "Free",
      description: "Perfect for getting started with AI career tools",
      monthlyPrice: 0,
      annualPrice: 0,
      popular: false,
      icon: Users,
      color: "text-gray-600",
      bgColor: "bg-gray-50",
      features: [
        "1 AI-optimized resume",
        "2 cover letters per month",
        "5 mock interview questions",
        "Basic ATS scoring",
        "Standard templates",
        "Email support"
      ],
      limitations: [
        "Limited customization",
        "Basic feedback only",
        "No priority support"
      ]
    },
    {
      name: "Pro",
      description: "Most popular choice for serious job seekers",
      monthlyPrice: 29.99,
      annualPrice: 299.99,
      popular: true,
      icon: Zap,
      color: "text-primary",
      bgColor: "bg-primary/5",
      features: [
        "Unlimited AI-optimized resumes",
        "Unlimited cover letters",
        "Unlimited mock interviews",
        "Advanced ATS optimization",
        "50+ premium templates",
        "Industry-specific customization",
        "Real-time feedback",
        "Interview question database",
        "Priority email support",
        "Export to multiple formats"
      ],
      limitations: []
    },
    {
      name: "Premium",
      description: "For professionals who want the ultimate career advantage",
      monthlyPrice: 59.99,
      annualPrice: 599.99,
      popular: false,
      icon: Crown,
      color: "text-yellow-600",
      bgColor: "bg-yellow-50",
      features: [
        "Everything in Pro",
        "Personal career coach AI",
        "Custom template creation",
        "Advanced analytics dashboard",
        "LinkedIn profile optimization",
        "Salary negotiation guidance",
        "1-on-1 career consultation",
        "Priority phone support",
        "White-label resumes",
        "API access for integrations"
      ],
      limitations: []
    }
  ];

  const getPrice = (plan: typeof plans[0]) => {
    if (plan.monthlyPrice === 0) return "Free";
    const price = isAnnual ? plan.annualPrice : plan.monthlyPrice;
    const period = isAnnual ? "/year" : "/month";
    return `$${price}${period}`;
  };

  const getSavings = (plan: typeof plans[0]) => {
    if (plan.monthlyPrice === 0) return null;
    const annualTotal = plan.monthlyPrice * 12;
    const savings = annualTotal - plan.annualPrice;
    const percentage = Math.round((savings / annualTotal) * 100);
    return { amount: savings, percentage };
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section */}
      <section className="pt-24 pb-16 bg-gradient-subtle">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground mb-6">
              Choose Your{" "}
              <span className="bg-gradient-primary bg-clip-text text-transparent">
                Career Success
              </span>{" "}
              Plan
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed mb-8">
              Unlock the power of AI to accelerate your career. Choose the plan that fits your goals 
              and start landing interviews faster than ever before.
            </p>
            
            {/* Billing Toggle */}
            <div className="flex items-center justify-center gap-4 mb-8">
              <span className={`text-sm font-medium ${!isAnnual ? 'text-foreground' : 'text-muted-foreground'}`}>
                Monthly
              </span>
              <button
                onClick={() => setIsAnnual(!isAnnual)}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  isAnnual ? 'bg-primary' : 'bg-muted'
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    isAnnual ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
              <span className={`text-sm font-medium ${isAnnual ? 'text-foreground' : 'text-muted-foreground'}`}>
                Annual
              </span>
              {isAnnual && (
                <Badge variant="secondary" className="bg-success/10 text-success">
                  Save up to 17%
                </Badge>
              )}
            </div>
          </div>

          {/* Pricing Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {plans.map((plan, index) => {
              const IconComponent = plan.icon;
              const savings = getSavings(plan);
              
              return (
                <Card 
                  key={plan.name}
                  className={`relative overflow-hidden transition-all duration-300 hover:shadow-hover hover:-translate-y-2 ${
                    plan.popular 
                      ? 'border-primary shadow-glow bg-gradient-card' 
                      : 'bg-gradient-card border-0 shadow-card'
                  }`}
                >
                  {plan.popular && (
                    <div className="absolute top-0 left-0 right-0 bg-gradient-primary text-white text-center py-2 text-sm font-semibold">
                      <Star className="inline h-4 w-4 mr-1" />
                      Most Popular
                    </div>
                  )}
                  
                  <CardHeader className={`text-center ${plan.popular ? 'pt-12' : 'pt-8'} pb-4`}>
                    <div className={`inline-flex items-center justify-center w-16 h-16 rounded-full ${plan.bgColor} mb-4 mx-auto`}>
                      <IconComponent className={`h-8 w-8 ${plan.color}`} />
                    </div>
                    <CardTitle className="text-2xl font-bold text-foreground">
                      {plan.name}
                    </CardTitle>
                    <CardDescription className="text-muted-foreground">
                      {plan.description}
                    </CardDescription>
                    
                    <div className="mt-6">
                      <div className="text-4xl font-bold text-foreground">
                        {getPrice(plan)}
                      </div>
                      {isAnnual && savings && (
                        <div className="text-sm text-success font-medium mt-1">
                          Save ${savings.amount} ({savings.percentage}% off)
                        </div>
                      )}
                      {!isAnnual && plan.monthlyPrice > 0 && (
                        <div className="text-sm text-muted-foreground mt-1">
                          Billed monthly
                        </div>
                      )}
                    </div>
                  </CardHeader>
                  
                  <CardContent className="pt-0">
                    <Button 
                      variant={plan.popular ? "hero" : "outline"}
                      size="lg"
                      className="w-full mb-6"
                      onClick={() => handleGetStarted(plan.name)}
                    >
                      {plan.name === "Free" ? "Get Started Free" : "Start Free Trial"}
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                    
                    <div className="space-y-4">
                      <h4 className="font-semibold text-foreground">What's included:</h4>
                      <ul className="space-y-3">
                        {plan.features.map((feature, featureIndex) => (
                          <li key={featureIndex} className="flex items-start gap-3">
                            <Check className="h-5 w-5 text-success flex-shrink-0 mt-0.5" />
                            <span className="text-sm text-foreground">{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Feature Comparison */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-6">
              Compare All Features
            </h2>
            <p className="text-xl text-muted-foreground">
              See exactly what's included in each plan to make the best choice for your career goals.
            </p>
          </div>

          <div className="max-w-5xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
              {/* Feature Categories */}
              <div className="space-y-8">
                <div>
                  <h3 className="font-semibold text-foreground mb-4 flex items-center gap-2">
                    <FileText className="h-5 w-5 text-primary" />
                    Resume Builder
                  </h3>
                  <ul className="space-y-3 text-sm text-muted-foreground">
                    <li>AI-optimized resumes</li>
                    <li>ATS scoring</li>
                    <li>Template library</li>
                    <li>Custom templates</li>
                    <li>Export formats</li>
                  </ul>
                </div>
                
                <div>
                  <h3 className="font-semibold text-foreground mb-4 flex items-center gap-2">
                    <Mail className="h-5 w-5 text-primary" />
                    Cover Letters
                  </h3>
                  <ul className="space-y-3 text-sm text-muted-foreground">
                    <li>AI-generated letters</li>
                    <li>Job-specific customization</li>
                    <li>Tone optimization</li>
                    <li>Company research</li>
                  </ul>
                </div>
                
                <div>
                  <h3 className="font-semibold text-foreground mb-4 flex items-center gap-2">
                    <MessageSquare className="h-5 w-5 text-primary" />
                    Mock Interviews
                  </h3>
                  <ul className="space-y-3 text-sm text-muted-foreground">
                    <li>FAANG questions</li>
                    <li>Real-time feedback</li>
                    <li>Performance analytics</li>
                    <li>Custom scenarios</li>
                  </ul>
                </div>
                
                <div>
                  <h3 className="font-semibold text-foreground mb-4 flex items-center gap-2">
                    <Headphones className="h-5 w-5 text-primary" />
                    Support
                  </h3>
                  <ul className="space-y-3 text-sm text-muted-foreground">
                    <li>Email support</li>
                    <li>Priority support</li>
                    <li>Phone support</li>
                    <li>Career consultation</li>
                  </ul>
                </div>
              </div>

              {/* Plan Comparison */}
              <div className="lg:col-span-3 grid grid-cols-3 gap-4">
                {plans.map((plan) => (
                  <Card key={plan.name} className="bg-gradient-card border-0 shadow-card">
                    <CardHeader className="text-center pb-4">
                      <CardTitle className="text-lg">{plan.name}</CardTitle>
                      <div className="text-2xl font-bold text-primary">
                        {getPrice(plan)}
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      {/* Resume Builder Features */}
                      <div className="space-y-2">
                        <div className="flex justify-center">
                          {plan.name === "Free" ? (
                            <Badge variant="secondary">1 Resume</Badge>
                          ) : (
                            <Badge variant="default" className="bg-success text-success-foreground">
                              Unlimited
                            </Badge>
                          )}
                        </div>
                        <div className="text-center">
                          {plan.name === "Free" ? (
                            <span className="text-muted-foreground">Basic</span>
                          ) : (
                            <Check className="h-5 w-5 text-success mx-auto" />
                          )}
                        </div>
                      </div>
                      
                      {/* Cover Letters */}
                      <div className="space-y-2">
                        <div className="flex justify-center">
                          {plan.name === "Free" ? (
                            <Badge variant="secondary">2/month</Badge>
                          ) : (
                            <Badge variant="default" className="bg-success text-success-foreground">
                              Unlimited
                            </Badge>
                          )}
                        </div>
                      </div>
                      
                      {/* Mock Interviews */}
                      <div className="space-y-2">
                        <div className="flex justify-center">
                          {plan.name === "Free" ? (
                            <Badge variant="secondary">5 Questions</Badge>
                          ) : (
                            <Badge variant="default" className="bg-success text-success-foreground">
                              Unlimited
                            </Badge>
                          )}
                        </div>
                      </div>
                      
                      {/* Support */}
                      <div className="text-center">
                        {plan.name === "Free" && <span className="text-sm text-muted-foreground">Email</span>}
                        {plan.name === "Pro" && <span className="text-sm text-success">Priority Email</span>}
                        {plan.name === "Premium" && <span className="text-sm text-success">Phone + Email</span>}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-gradient-subtle">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-6">
              Frequently Asked Questions
            </h2>
            <p className="text-xl text-muted-foreground">
              Got questions? We've got answers. Here are the most common questions about our pricing.
            </p>
          </div>

          <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card className="bg-gradient-card border-0 shadow-card">
              <CardContent className="p-6">
                <h3 className="font-semibold text-foreground mb-3">Can I change plans anytime?</h3>
                <p className="text-muted-foreground">
                  Yes! You can upgrade or downgrade your plan at any time. Changes take effect immediately, 
                  and we'll prorate any billing differences.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-gradient-card border-0 shadow-card">
              <CardContent className="p-6">
                <h3 className="font-semibold text-foreground mb-3">Is there a free trial?</h3>
                <p className="text-muted-foreground">
                  All paid plans come with a 7-day free trial. No credit card required to start. 
                  You can cancel anytime during the trial period.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-gradient-card border-0 shadow-card">
              <CardContent className="p-6">
                <h3 className="font-semibold text-foreground mb-3">What payment methods do you accept?</h3>
                <p className="text-muted-foreground">
                  We accept all major credit cards (Visa, MasterCard, American Express), 
                  PayPal, and bank transfers for annual plans.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-gradient-card border-0 shadow-card">
              <CardContent className="p-6">
                <h3 className="font-semibold text-foreground mb-3">Can I cancel my subscription?</h3>
                <p className="text-muted-foreground">
                  Absolutely. You can cancel your subscription at any time from your account settings. 
                  You'll continue to have access until the end of your billing period.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <div className="bg-gradient-primary rounded-2xl p-12 text-white">
              <h2 className="text-3xl font-bold mb-4">Ready to Transform Your Career?</h2>
              <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
                Join thousands of professionals who have successfully landed their dream jobs 
                using our AI-powered platform. Start your free trial today.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button 
                  variant="hero" 
                  size="xl" 
                  className="bg-white text-primary hover:bg-white/90"
                  onClick={() => handleGetStarted("Pro")}
                >
                  Start Free Trial
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
                <Button 
                  variant="outline" 
                  size="xl" 
                  className="border-white/30 text-white hover:bg-white/10"
                  onClick={() => handleGetStarted("Free")}
                >
                  Try Free Plan
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
      
      <LoginModal 
        isOpen={isLoginModalOpen}
        onClose={() => setIsLoginModalOpen(false)}
        onSuccess={handleLoginSuccess}
      />
    </div>
  );
};

export default Pricing;