import { Button } from "@/components/ui/button";
import { ArrowRight, Play, Star } from "lucide-react";
import heroImage from "@/assets/hero-bg.jpg";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";

const HeroSection = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src={heroImage}
          alt="AI Career Services"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-hero opacity-90"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 pt-20">
        <div className="text-center max-w-4xl mx-auto">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-background/10 backdrop-blur-sm border border-white/20 rounded-full px-4 py-2 mb-8 animate-fade-in">
            <Star className="h-4 w-4 text-yellow-400 fill-current" />
            <span className="text-white text-sm font-medium">
              Trusted by 50,000+ job seekers
            </span>
          </div>

          {/* Main Headline */}
          <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold text-white mb-6 animate-fade-in">
            Land Your Dream Job with{" "}
            <span className="bg-gradient-to-r from-blue-200 to-cyan-200 bg-clip-text text-transparent">
              AI-Powered
            </span>{" "}
            Career Tools
          </h1>

          {/* Subheadline */}
          <p className="text-xl sm:text-2xl text-blue-100 mb-8 max-w-3xl mx-auto leading-relaxed animate-fade-in">
            Transform your career with our suite of AI-driven tools. Create ATS-optimized resumes, 
            personalized cover letters, and practice with realistic interview questions.
          </p>

          {/* Stats */}
          <div className="flex flex-wrap justify-center gap-8 mb-10 animate-fade-in">
            <div className="text-center">
              <div className="text-3xl font-bold text-white">95%</div>
              <div className="text-blue-200 text-sm">Interview Rate</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-white">30 Days</div>
              <div className="text-blue-200 text-sm">Average Job Landing</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-white">50K+</div>
              <div className="text-blue-200 text-sm">Success Stories</div>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12 animate-fade-in">
            <Button 
              variant="hero" 
              size="xl" 
              className="group"
              onClick={() => user ? navigate('/dashboard') : document.dispatchEvent(new Event('open-login-modal'))}
            >
              Start Building Your Career
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button 
              variant="outline" 
              size="xl" 
              className="bg-white/10 border-white/30 text-white hover:bg-white/20 backdrop-blur-sm"
              onClick={() => document.dispatchEvent(new Event('open-login-modal'))}
            >
              <Play className="mr-2 h-5 w-5" />
              Watch Demo
            </Button>
          </div>

          {/* Trust Indicators */}
          <div className="animate-fade-in">
            <p className="text-blue-200 text-sm mb-4">Trusted by professionals at</p>
            <div className="flex flex-wrap justify-center items-center gap-8 opacity-70">
              <div className="text-white font-semibold text-lg">Google</div>
              <div className="text-white font-semibold text-lg">Microsoft</div>
              <div className="text-white font-semibold text-lg">Amazon</div>
              <div className="text-white font-semibold text-lg">Meta</div>
              <div className="text-white font-semibold text-lg">Apple</div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-white/50 rounded-full mt-2 animate-pulse"></div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;