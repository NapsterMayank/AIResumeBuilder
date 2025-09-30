import { ResumeData } from "@/types/resume";
import ProfessionalTemplate from "./ProfessionalTemplate";
import CreativeTemplate from "./CreativeTemplate";
import ExecutiveTemplate from "./ExecutiveTemplate";
import MinimalTemplate from "./MinimalTemplate";
import TechTemplate from "./TechTemplate";
import ClassicTemplate from "./ClassicTemplate";
import ModernTemplate from "./ModernTemplate";

export type TemplateType =
  | "professional"
  | "creative"
  | "executive"
  | "minimal"
  | "tech"
  | "classic"
  | "modern";

interface TemplateRendererProps {
  template: TemplateType;
  data: ResumeData;
}

export const templateConfigs = {
  professional: {
    id: "professional",
    name: "Professional",
    description: "Clean, modern layout perfect for corporate roles.",
    component: ProfessionalTemplate,
  },
  creative: {
    id: "creative",
    name: "Creative",
    description: "Stand out with a unique, eye-catching design.",
    component: CreativeTemplate,
  },
  executive: {
    id: "executive",
    name: "Executive",
    description: "Sophisticated design for senior positions.",
    component: ExecutiveTemplate,
  },
  minimal: {
    id: "minimal",
    name: "Minimal",
    description: "Clean and simple design that focuses on content.",
    component: MinimalTemplate,
  },
  tech: {
    id: "tech",
    name: "Tech",
    description: "Modern template ideal for tech professionals.",
    component: TechTemplate,
  },
  classic: {
    id: "classic",
    name: "Classic",
    description: "Traditional layout trusted by professionals.",
    component: ClassicTemplate,
  },
  modern: {
    id: "modern",
    name: "Modern",
    description: "Contemporary design with clean aesthetics.",
    component: ModernTemplate,
  },
};

export default function TemplateRenderer({
  template,
  data,
}: TemplateRendererProps) {
  const TemplateComponent =
    templateConfigs[template]?.component || ProfessionalTemplate;

  return <TemplateComponent data={data} />;
}
