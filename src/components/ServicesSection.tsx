import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText, Mail, MessageSquare, CheckCircle, ArrowRight } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";

const ServicesSection = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const services = [
    {
      icon: FileText,
      title: "AI Resume Builder",
      description: "Create ATS-optimized resumes that get noticed by recruiters and hiring managers.",
      features: [
        "Industry-specific templates",
        "ATS optimization scoring",
        "Real-time keyword suggestions",
        "Professional formatting"
      ],
      color: "text-blue-600",
      route: "/resume-templates"
    },
    {
      icon: Mail,
      title: "AI Cover Letter Generator",
      description: "Generate personalized cover letters that perfectly match job requirements.",
      features: [
        "Job-specific customization",
        "Company research integration",
        "Tone and style optimization",
        "Multiple format options"
      ],
      color: "text-purple-600",
      route: "/cover-letter"
    },
    {
      icon: MessageSquare,
      title: "AI Mock Interview Questions",
      description: "Practice with realistic interview scenarios from top tech companies.",
      features: [
        "FAANG/MAANG company focus",
        "Behavioral & technical questions",
        "Real-time feedback",
        "Performance analytics"
      ],
      color: "text-green-600",
      route: "/mock-interview"
    }
  ];

  return (
    <section id="services" className="py-20 bg-gradient-subtle">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-6">
            Powerful AI Tools for Your{" "}
            <span className="bg-gradient-primary bg-clip-text text-transparent">
              Career Success
            </span>
          </h2>
          <p className="text-xl text-muted-foreground leading-relaxed">
            Our comprehensive suite of AI-powered tools helps you stand out in today's competitive job market.
            From resume optimization to interview preparation, we've got you covered.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {services.map((service, index) => {
            const IconComponent = service.icon;
            return (
              <Card 
                key={index} 
                className="group hover:shadow-hover transition-all duration-300 hover:-translate-y-2 bg-gradient-card border-0 shadow-card"
              >
                <CardHeader className="text-center pb-4">
                  <div className={`inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-primary mb-4 mx-auto group-hover:scale-110 transition-transform duration-300`}>
                    <IconComponent className="h-8 w-8 text-white" />
                  </div>
                  <CardTitle className="text-xl font-bold text-foreground group-hover:text-primary transition-colors">
                    {service.title}
                  </CardTitle>
                  <CardDescription className="text-muted-foreground">
                    {service.description}
                  </CardDescription>
                </CardHeader>
                <CardContent className="pt-0">
                  <ul className="space-y-3 mb-6">
                    {service.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center gap-3">
                        <CheckCircle className="h-5 w-5 text-success flex-shrink-0" />
                        <span className="text-sm text-foreground">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Button 
                    variant="outline" 
                    className="w-full group-hover:bg-primary group-hover:text-primary-foreground transition-colors"
                  >
                    Get Started
                    <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <div className="text-center">
          <div className="bg-gradient-primary rounded-2xl p-8 text-white">
            <h3 className="text-2xl font-bold mb-4">Ready to Transform Your Career?</h3>
            <p className="text-blue-100 mb-6 max-w-2xl mx-auto">
              Join thousands of professionals who have successfully landed their dream jobs using our AI-powered platform.
            </p>
            <Button variant="hero" size="xl" className="bg-white text-primary hover:bg-white/90">
              Start Your Free Trial
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;