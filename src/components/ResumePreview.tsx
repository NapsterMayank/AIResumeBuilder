import { ResumeData } from "../types/resume";
import { Suspense, lazy } from "react";

// Lazy load template components
const ClassicTemplate = lazy(() => import("./templates/ClassicTemplate"));
const ProfessionalTemplate = lazy(() => import("./templates/ProfessionalTemplate"));
const CreativeTemplate = lazy(() => import("./templates/CreativeTemplate"));
const ExecutiveTemplate = lazy(() => import("./templates/ExecutiveTemplate"));
const MinimalTemplate = lazy(() => import("./templates/MinimalTemplate"));
const TechTemplate = lazy(() => import("./templates/TechTemplate"));
const ModernTemplate = lazy(() => import("./templates/ModernTemplate"));

interface ResumePreviewProps {
  data: ResumeData;
  template?: string;
}

export default function ResumePreview({ data, template = "template6" }: ResumePreviewProps) {
  const renderTemplate = () => {
    switch (template) {
      case "template1":
        return <ProfessionalTemplate data={data} />;
      case "template2":
        return <CreativeTemplate data={data} />;
      case "template3":
        return <ExecutiveTemplate data={data} />;
      case "template4":
        return <MinimalTemplate data={data} />;
      case "template5":
        return <TechTemplate data={data} />;
      case "template6":
        return <ClassicTemplate data={data} />;
      case "template7":
        return <ModernTemplate data={data} />;
      default:
        return <ClassicTemplate data={data} />;
    }
  };

  return (
    <Suspense fallback={<div className="flex items-center justify-center h-96">Loading template...</div>}>
      {renderTemplate()}
    </Suspense>
  );
}
