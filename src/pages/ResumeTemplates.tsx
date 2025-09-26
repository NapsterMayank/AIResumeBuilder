import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

const templates = [
  { 
    id: "template1", 
    name: "Professional", 
    description: "Clean, modern layout perfect for corporate roles.", 
    image: "/src/assets/template/1.png"
  },
  { 
    id: "template2", 
    name: "Creative", 
    description: "Stand out with a unique, eye-catching design.", 
    image: "/src/assets/template/2.png"
  },
  { 
    id: "template3", 
    name: "Executive", 
    description: "Sophisticated design for senior positions.", 
    image: "/src/assets/template/3.png"
  },
  { 
    id: "template4", 
    name: "Minimal", 
    description: "Clean and simple design that focuses on content.", 
    image: "/src/assets/template/4.png"
  },
  { 
    id: "template5", 
    name: "Tech", 
    description: "Modern template ideal for tech professionals.", 
    image: "/src/assets/template/5.png"
  },
  { 
    id: "template6", 
    name: "Classic", 
    description: "Traditional layout trusted by professionals.", 
    image: "/src/assets/template/6.png"
  }
];

const ResumeTemplates = () => {
  const navigate = useNavigate();

  const chooseTemplate = (id: string) => {
    navigate(`/resume-builder?template=${encodeURIComponent(id)}`);
  };

  return (
    <div className="min-h-screen bg-gradient-subtle">
      {/* Header */}
      <header className="bg-background border-b border-border">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="sm" onClick={() => navigate('/dashboard')}>
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Dashboard
              </Button>
              <h1 className="text-l font-bold text-foreground">Choose a Resume Template</h1>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <p className="text-muted-foreground mb-8">Pick a starting style. You can edit all content and export to PDF.</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {templates.map((tpl) => (
            <Card 
              key={tpl.id} 
              className="group overflow-hidden bg-white border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
            >
              <div className="relative h-[300px] bg-gray-50 p-6">
                <img 
                  src={tpl.image} 
                  alt={tpl.name}
                  className="w-full h-full object-cover rounded-lg shadow-lg transform group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <Button 
                    className="bg-white text-gray-900 hover:bg-white/90"
                    onClick={() => chooseTemplate(tpl.id)}
                  >
                    Use This Template
                  </Button>
                </div>
              </div>
              <CardHeader>
                <CardTitle className="text-xl">{tpl.name}</CardTitle>
                <p className="text-sm text-muted-foreground">{tpl.description}</p>
              </CardHeader>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ResumeTemplates;


