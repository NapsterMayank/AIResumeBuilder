import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Users, Award, Globe, ArrowRight } from "lucide-react";

const AboutSection = () => {
  const teamStats = [
    {
      icon: Users,
      title: "Expert Team",
      description: "Former recruiters and engineers from FAANG companies",
      stat: "50+ Experts"
    },
    {
      icon: Award,
      title: "Industry Recognition",
      description: "Winner of Best Career Tech Platform 2024",
      stat: "Award Winner"
    },
    {
      icon: Globe,
      title: "Global Reach",
      description: "Helping professionals in 50+ countries worldwide",
      stat: "50+ Countries"
    }
  ];

  return (
    <section id="about" className="py-20 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Content */}
          <div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-6">
              About{" "}
              <span className="bg-gradient-primary bg-clip-text text-transparent">
                CareerAI
              </span>
            </h2>
            
            <div className="space-y-6 text-lg text-muted-foreground leading-relaxed mb-8">
              <p>
                CareerAI was founded by a team of former FAANG recruiters and AI engineers who 
                experienced firsthand the challenges of modern job searching. We recognized that 
                talented professionals were being overlooked due to poorly optimized applications.
              </p>
              
              <p>
                Our mission is to democratize access to career success by providing AI-powered 
                tools that level the playing field. We believe everyone deserves the opportunity 
                to showcase their potential and land their dream job.
              </p>
              
              <p>
                Today, we're proud to have helped over 50,000 professionals transform their 
                careers and secure positions at top companies worldwide.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button variant="hero" size="lg">
                Start Your Journey
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button variant="outline" size="lg">
                Learn More About Us
              </Button>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="space-y-6">
            {teamStats.map((stat, index) => {
              const IconComponent = stat.icon;
              return (
                <Card 
                  key={index} 
                  className="group hover:shadow-hover transition-all duration-300 hover:-translate-y-1 bg-gradient-card border-0 shadow-card"
                >
                  <CardContent className="p-6 flex items-center gap-6">
                    <div className="flex-shrink-0">
                      <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-gradient-primary group-hover:scale-110 transition-transform duration-300">
                        <IconComponent className="h-7 w-7 text-white" />
                      </div>
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-foreground mb-2 group-hover:text-primary transition-colors">
                        {stat.title}
                      </h3>
                      <p className="text-muted-foreground mb-2">
                        {stat.description}
                      </p>
                      <div className="inline-flex items-center justify-center bg-primary/10 text-primary font-semibold px-3 py-1 rounded-full text-sm">
                        {stat.stat}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>

        {/* Mission Statement */}
        <div className="mt-20 text-center">
          <div className="bg-gradient-primary rounded-2xl p-12 text-white">
            <h3 className="text-3xl font-bold mb-6">Our Mission</h3>
            <p className="text-xl text-blue-100 max-w-4xl mx-auto leading-relaxed">
              To empower every professional with AI-driven career tools that unlock their potential 
              and accelerate their path to success. We're not just building software – we're 
              building futures.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;