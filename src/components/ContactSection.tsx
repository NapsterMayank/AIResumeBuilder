import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Mail, Phone, MapPin, Send, MessageCircle } from "lucide-react";

const ContactSection = () => {
  const contactInfo = [
    {
      icon: Mail,
      title: "Email Us",
      description: "Get in touch with our support team",
      contact: "support@careerai.com",
      action: "mailto:support@careerai.com"
    },
    {
      icon: Phone,
      title: "Call Us",
      description: "Speak with our career experts",
      contact: "+1 (555) 123-4567",
      action: "tel:+15551234567"
    },
    {
      icon: MapPin,
      title: "Visit Us",
      description: "Our headquarters location",
      contact: "San Francisco, CA",
      action: "#"
    }
  ];

  const socialLinks = [
    { name: "LinkedIn", url: "#" },
    { name: "Twitter", url: "#" },
    { name: "Facebook", url: "#" },
    { name: "Instagram", url: "#" }
  ];

  return (
    <section id="contact" className="py-20 bg-gradient-subtle">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-6">
            Get in{" "}
            <span className="bg-gradient-primary bg-clip-text text-transparent">
              Touch
            </span>
          </h2>
          <p className="text-xl text-muted-foreground leading-relaxed">
            Have questions about our platform? Need help getting started? 
            Our team is here to support your career journey every step of the way.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Contact Form */}
          <div>
            <Card className="bg-gradient-card border-0 shadow-card">
              <CardContent className="p-8">
                <h3 className="text-2xl font-bold text-foreground mb-6">Send us a Message</h3>
                <form className="space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">
                        First Name
                      </label>
                      <Input placeholder="John" className="transition-smooth focus:ring-2 focus:ring-primary" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">
                        Last Name
                      </label>
                      <Input placeholder="Doe" className="transition-smooth focus:ring-2 focus:ring-primary" />
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Email Address
                    </label>
                    <Input 
                      type="email" 
                      placeholder="john@example.com" 
                      className="transition-smooth focus:ring-2 focus:ring-primary" 
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Subject
                    </label>
                    <Input 
                      placeholder="How can we help you?" 
                      className="transition-smooth focus:ring-2 focus:ring-primary" 
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Message
                    </label>
                    <Textarea 
                      placeholder="Tell us about your career goals and how we can assist you..."
                      rows={5}
                      className="transition-smooth focus:ring-2 focus:ring-primary resize-none"
                    />
                  </div>
                  
                  <Button variant="hero" size="lg" className="w-full">
                    Send Message
                    <Send className="ml-2 h-5 w-5" />
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>

          {/* Contact Information */}
          <div className="space-y-8">
            <div>
              <h3 className="text-2xl font-bold text-foreground mb-6">Contact Information</h3>
              <div className="space-y-6">
                {contactInfo.map((info, index) => {
                  const IconComponent = info.icon;
                  return (
                    <Card 
                      key={index} 
                      className="group hover:shadow-hover transition-all duration-300 hover:-translate-y-1 bg-gradient-card border-0 shadow-card cursor-pointer"
                    >
                      <CardContent className="p-6">
                        <div className="flex items-center gap-4">
                          <div className="flex-shrink-0">
                            <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-gradient-primary group-hover:scale-110 transition-transform duration-300">
                              <IconComponent className="h-6 w-6 text-white" />
                            </div>
                          </div>
                          <div className="flex-1">
                            <h4 className="text-lg font-semibold text-foreground mb-1 group-hover:text-primary transition-colors">
                              {info.title}
                            </h4>
                            <p className="text-muted-foreground text-sm mb-1">
                              {info.description}
                            </p>
                            <a 
                              href={info.action}
                              className="text-primary font-medium hover:underline"
                            >
                              {info.contact}
                            </a>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            </div>

            {/* FAQ Section */}
            <div>
              <h3 className="text-2xl font-bold text-foreground mb-6">Quick Help</h3>
              <Card className="bg-gradient-card border-0 shadow-card">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0">
                      <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-gradient-primary">
                        <MessageCircle className="h-6 w-6 text-white" />
                      </div>
                    </div>
                    <div className="flex-1">
                      <h4 className="text-lg font-semibold text-foreground mb-2">
                        Frequently Asked Questions
                      </h4>
                      <p className="text-muted-foreground mb-4">
                        Find answers to common questions about our platform, pricing, and features.
                      </p>
                      <Button variant="outline" size="sm">
                        View FAQ
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Social Links */}
            <div>
              <h3 className="text-2xl font-bold text-foreground mb-6">Follow Us</h3>
              <div className="flex gap-4">
                {socialLinks.map((social, index) => (
                  <a
                    key={index}
                    href={social.url}
                    className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-gradient-primary text-white hover:scale-110 transition-transform duration-300"
                  >
                    {social.name.charAt(0)}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;