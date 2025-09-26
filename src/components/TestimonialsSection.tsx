import { Card, CardContent } from "@/components/ui/card";
import { Star, Quote } from "lucide-react";
import testimonial1 from "@/assets/testimonial-1.jpg";
import testimonial2 from "@/assets/testimonial-2.jpg";
import testimonial3 from "@/assets/testimonial-3.jpg";

const TestimonialsSection = () => {
  const testimonials = [
    {
      name: "Sarah Chen",
      role: "Software Engineer at Google",
      company: "Google",
      image: testimonial1,
      content: "CareerAI helped me land my dream job at Google! The AI resume builder optimized my resume perfectly, and I got 5 interview calls within 2 weeks. The mock interview feature was incredibly realistic and prepared me for the actual interviews.",
      rating: 5
    },
    {
      name: "Marcus Johnson",
      role: "Product Manager at Microsoft",
      company: "Microsoft",
      image: testimonial2,
      content: "The cover letter generator is phenomenal. It created personalized letters that perfectly matched each job description. I went from getting no responses to having multiple offers. The AI really understands what recruiters are looking for.",
      rating: 5
    },
    {
      name: "Priya Patel",
      role: "Data Scientist at Meta",
      company: "Meta",
      image: testimonial3,
      content: "As someone transitioning into tech, CareerAI was a game-changer. The industry-specific templates and real-time feedback helped me highlight my transferable skills effectively. I landed my role at Meta within 6 weeks!",
      rating: 5
    }
  ];

  const companyLogos = [
    "Google", "Microsoft", "Amazon", "Meta", "Apple", "Netflix", "Tesla", "Spotify"
  ];

  return (
    <section id="testimonials" className="py-20 bg-gradient-subtle">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-6">
            Success Stories from{" "}
            <span className="bg-gradient-primary bg-clip-text text-transparent">
              Real Users
            </span>
          </h2>
          <p className="text-xl text-muted-foreground leading-relaxed">
            Join thousands of professionals who have transformed their careers with CareerAI. 
            Here's what they have to say about their journey to success.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {testimonials.map((testimonial, index) => (
            <Card 
              key={index} 
              className="group hover:shadow-hover transition-all duration-300 hover:-translate-y-2 bg-gradient-card border-0 shadow-card relative overflow-hidden"
            >
              <CardContent className="p-8">
                {/* Quote Icon */}
                <div className="absolute top-4 right-4 opacity-10">
                  <Quote className="h-12 w-12 text-primary" />
                </div>

                {/* Rating */}
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                  ))}
                </div>

                {/* Content */}
                <p className="text-foreground mb-6 leading-relaxed italic">
                  "{testimonial.content}"
                </p>

                {/* User Info */}
                <div className="flex items-center gap-4">
                  <img
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full object-cover border-2 border-primary/20"
                  />
                  <div>
                    <div className="font-semibold text-foreground">{testimonial.name}</div>
                    <div className="text-sm text-muted-foreground">{testimonial.role}</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Success Metrics */}
        <div className="text-center mb-16">
          <div className="bg-gradient-primary rounded-2xl p-8 text-white">
            <h3 className="text-2xl font-bold mb-6">Our Impact in Numbers</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div>
                <div className="text-4xl font-bold mb-2">95%</div>
                <div className="text-blue-100">of users get interviews within 30 days</div>
              </div>
              <div>
                <div className="text-4xl font-bold mb-2">78%</div>
                <div className="text-blue-100">land job offers within 60 days</div>
              </div>
              <div>
                <div className="text-4xl font-bold mb-2">3.2x</div>
                <div className="text-blue-100">increase in interview callbacks</div>
              </div>
            </div>
          </div>
        </div>

        {/* Company Logos */}
        <div className="text-center">
          <h3 className="text-xl font-semibold text-foreground mb-8">
            Our users have been hired at top companies including:
          </h3>
          <div className="flex flex-wrap justify-center items-center gap-8 opacity-60">
            {companyLogos.map((company, index) => (
              <div 
                key={index} 
                className="text-foreground font-semibold text-lg hover:opacity-100 transition-opacity cursor-default"
              >
                {company}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;