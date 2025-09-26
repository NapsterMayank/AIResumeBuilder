import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Mail, Phone, MapPin, ArrowRight } from "lucide-react";

const Footer = () => {
  const footerLinks = {
    product: [
      { name: "AI Resume Builder", href: "#" },
      { name: "Cover Letter Generator", href: "#" },
      { name: "Mock Interviews", href: "#" },
      { name: "Career Analytics", href: "#" },
      { name: "Pricing", href: "/pricing" }
    ],
    company: [
      { name: "About Us", href: "#about" },
      { name: "Careers", href: "#" },
      { name: "Press", href: "#" },
      { name: "Blog", href: "#" },
      { name: "Contact", href: "#contact" }
    ],
    resources: [
      { name: "Help Center", href: "#" },
      { name: "Career Tips", href: "#" },
      { name: "Success Stories", href: "#testimonials" },
      { name: "Templates", href: "#" },
      { name: "API Documentation", href: "#" }
    ],
    legal: [
      { name: "Privacy Policy", href: "#" },
      { name: "Terms of Service", href: "#" },
      { name: "Cookie Policy", href: "#" },
      { name: "GDPR", href: "#" },
      { name: "Security", href: "#" }
    ]
  };

  return (
    <footer className="bg-foreground text-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer Content */}
        <div className="py-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-12">
            {/* Company Info & Newsletter */}
            <div>
              <div className="mb-8">
                <h3 className="text-3xl font-bold bg-gradient-primary bg-clip-text text-transparent mb-4">
                  CareerAI
                </h3>
                <p className="text-background/80 text-lg leading-relaxed max-w-md">
                  Empowering professionals worldwide with AI-driven career tools. 
                  Transform your job search and land your dream role with confidence.
                </p>
              </div>

              {/* Newsletter Signup */}
              <div className="bg-background/5 rounded-lg p-6 border border-background/10">
                <h4 className="text-xl font-semibold mb-3">Stay Updated</h4>
                <p className="text-background/70 mb-4">
                  Get career tips, industry insights, and platform updates delivered to your inbox.
                </p>
                <div className="flex gap-3">
                  <Input 
                    placeholder="Enter your email" 
                    className="bg-background/10 border-background/20 text-background placeholder:text-background/50"
                  />
                  <Button variant="hero" size="default">
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>

            {/* Contact Info */}
            <div>
              <h4 className="text-xl font-semibold mb-6">Get in Touch</h4>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <Mail className="h-5 w-5 text-primary" />
                  <span className="text-background/80">support@careerai.com</span>
                </div>
                <div className="flex items-center gap-3">
                  <Phone className="h-5 w-5 text-primary" />
                  <span className="text-background/80">+1 (555) 123-4567</span>
                </div>
                <div className="flex items-center gap-3">
                  <MapPin className="h-5 w-5 text-primary" />
                  <span className="text-background/80">San Francisco, CA</span>
                </div>
              </div>

              {/* Social Links */}
              <div className="mt-8">
                <h5 className="font-semibold mb-4">Follow Us</h5>
                <div className="flex gap-4">
                  {["LinkedIn", "Twitter", "Facebook", "Instagram"].map((social, index) => (
                    <a
                      key={index}
                      href="#"
                      className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-background/10 hover:bg-primary transition-colors duration-300"
                    >
                      <span className="text-sm font-medium">{social.charAt(0)}</span>
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Links Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div>
              <h5 className="font-semibold mb-4">Product</h5>
              <ul className="space-y-3">
                {footerLinks.product.map((link, index) => (
                  <li key={index}>
                    <a 
                      href={link.href} 
                      className="text-background/70 hover:text-primary transition-colors duration-300"
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h5 className="font-semibold mb-4">Company</h5>
              <ul className="space-y-3">
                {footerLinks.company.map((link, index) => (
                  <li key={index}>
                    <a 
                      href={link.href} 
                      className="text-background/70 hover:text-primary transition-colors duration-300"
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h5 className="font-semibold mb-4">Resources</h5>
              <ul className="space-y-3">
                {footerLinks.resources.map((link, index) => (
                  <li key={index}>
                    <a 
                      href={link.href} 
                      className="text-background/70 hover:text-primary transition-colors duration-300"
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h5 className="font-semibold mb-4">Legal</h5>
              <ul className="space-y-3">
                {footerLinks.legal.map((link, index) => (
                  <li key={index}>
                    <a 
                      href={link.href} 
                      className="text-background/70 hover:text-primary transition-colors duration-300"
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-background/20 py-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-background/70 text-sm">
              © 2024 CareerAI. All rights reserved.
            </div>
            <div className="flex items-center gap-6 text-sm">
              <span className="text-background/70">🔒 SOC 2 Certified</span>
              <span className="text-background/70">🛡️ GDPR Compliant</span>
              <span className="text-background/70">⭐ 4.9/5 Rating</span>
              <a href="/admin" className="text-background/50 hover:text-background/70 transition-colors">
                Admin
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;