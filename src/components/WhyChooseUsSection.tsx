import { Card, CardContent } from "@/components/ui/card";
import { Brain, Target, Zap, TrendingUp, Shield } from "lucide-react";

const WhyChooseUsSection = () => {
  const features = [
    {
      icon: Brain,
      title: "AI Technology Trained on Success",
      description: "Our AI models are trained on thousands of successful job applications from top companies, ensuring you get proven strategies.",
      stat: "99.2% Accuracy"
    },
    {
      icon: Target,
      title: "Industry-Specific Optimization",
      description: "Tailored content and strategies for your specific industry, from tech and finance to healthcare and consulting.",
      stat: "50+ Industries"
    },
    {
      icon: Zap,
      title: "Real-Time Feedback & Suggestions",
      description: "Get instant feedback on your resume, cover letter, and interview responses with actionable improvement suggestions.",
      stat: "< 2 Seconds"
    },
    {
      icon: TrendingUp,
      title: "Proven Success Rate",
      description: "95% of our users receive interview invitations within 30 days, with 78% landing job offers within 60 days.",
      stat: "95% Success Rate"
    },
    {
      icon: Shield,
      title: "Enterprise-Grade Security",
      description: "Your personal information and career documents are protected with bank-level encryption and security protocols.",
      stat: "SOC 2 Certified"
    }
  ];

  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-6">
            Why Choose{" "}
            <span className="bg-gradient-primary bg-clip-text text-transparent">
              CareerAI
            </span>
          </h2>
          <p className="text-xl text-muted-foreground leading-relaxed">
            We combine cutting-edge AI technology with proven career strategies to give you the competitive edge you need in today's job market.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {features.map((feature, index) => {
            const IconComponent = feature.icon;
            return (
              <Card 
                key={index} 
                className="group hover:shadow-hover transition-all duration-300 hover:-translate-y-1 bg-gradient-card border-0 shadow-card"
              >
                <CardContent className="p-8 text-center">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-primary mb-6 group-hover:scale-110 transition-transform duration-300">
                    <IconComponent className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-foreground mb-4 group-hover:text-primary transition-colors">
                    {feature.title}
                  </h3>
                  <p className="text-muted-foreground mb-4 leading-relaxed">
                    {feature.description}
                  </p>
                  <div className="inline-flex items-center justify-center bg-primary/10 text-primary font-semibold px-4 py-2 rounded-full text-sm">
                    {feature.stat}
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Stats Section */}
        <div className="bg-gradient-primary rounded-2xl p-8 text-white">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold mb-2">50,000+</div>
              <div className="text-blue-100">Active Users</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">1M+</div>
              <div className="text-blue-100">Resumes Created</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">95%</div>
              <div className="text-blue-100">Interview Rate</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">4.9/5</div>
              <div className="text-blue-100">User Rating</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUsSection;