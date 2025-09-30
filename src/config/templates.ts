export interface TemplateConfig {
  id: string;
  name: string;
  description: string;
  thumbnail: string;
  component: string;
}

export const templates: TemplateConfig[] = [
  {
    id: "template1",
    name: "Professional",
    description: "Clean, modern layout perfect for corporate roles.",
    thumbnail: "/src/assets/template/1.png",
    component: "ProfessionalTemplate"
  },
  {
    id: "template2",
    name: "Creative",
    description: "Stand out with a unique, eye-catching design.",
    thumbnail: "/src/assets/template/2.png",
    component: "CreativeTemplate"
  },
  {
    id: "template3",
    name: "Executive",
    description: "Sophisticated design for senior positions.",
    thumbnail: "/src/assets/template/3.png",
    component: "ExecutiveTemplate"
  },
  {
    id: "template4",
    name: "Minimal",
    description: "Clean and simple design that focuses on content.",
    thumbnail: "/src/assets/template/4.png",
    component: "MinimalTemplate"
  },
  {
    id: "template5",
    name: "Tech",
    description: "Modern template ideal for tech professionals.",
    thumbnail: "/src/assets/template/5.png",
    component: "TechTemplate"
  },
  {
    id: "template6",
    name: "Classic",
    description: "Traditional layout trusted by professionals.",
    thumbnail: "/src/assets/template/6.png",
    component: "ClassicTemplate"
  },
  {
    id: "template7",
    name: "Modern",
    description: "Contemporary design with gradient accents.",
    thumbnail: "/src/assets/template/1.png",
    component: "ModernTemplate"
  }
];

export const getTemplateById = (id: string): TemplateConfig | undefined => {
  return templates.find(template => template.id === id);
};

export const getDefaultTemplate = (): TemplateConfig => {
  return templates.find(t => t.id === "template6") || templates[0];
};