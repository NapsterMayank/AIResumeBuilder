import { useState, useEffect } from "react";
import { 
  ResumeData,
  ResumeStep,
  PersonalInfo,
  Experience,
  Education,
  Project,
  Certification,
} from "./types/resume";
import StepIndicator from "./components/StepIndicator";
import PersonalInfoStep from "./components/PersonalInfoStep";
import ObjectiveStep from "./components/ObjectiveStep";
import ExperienceStep from "./components/ExperienceStep";
import EducationStep from "./components/EducationStep";
import SkillsStep from "./components/SkillsStep";
import ProjectsStep from "./components/ProjectsStep";
import CertificationsStep from "./components/CertificationsStep";
import ReviewStep from "./components/ReviewStep";
import ResumePreview from "./components/ResumePreview";
import { ChevronLeft, ChevronRight, FileText } from "lucide-react";
import { useLocation } from "react-router-dom";

const initialData: ResumeData = {
  personalInfo: {
    fullName: "",
    email: "",
    phone: "",
    location: "",
  },
  objective: "",
  experience: [],
  education: [],
  skills: {
    technical: [],
    soft: [],
  },
  projects: [],
  certifications: [],
};

const steps: ResumeStep[] = [
  "personal",
  "objective",
  "experience",
  "education",
  "skills",
  "projects",
  "certifications",
  "review",
];

function ResumeBuilder() {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const selectedTemplate = params.get("template") || localStorage.getItem('resume_template') || "classic";
  useEffect(() => {
    localStorage.setItem('resume_template', selectedTemplate);
  }, [selectedTemplate]);
  const [currentStep, setCurrentStep] = useState<ResumeStep>("personal");
  const [resumeData, setResumeData] = useState<ResumeData>(initialData);
  const [completedSteps, setCompletedSteps] = useState<Set<ResumeStep>>(new Set());

  useEffect(() => {
    localStorage.setItem("resumeBuilder_data", JSON.stringify(resumeData));
  }, [resumeData]);

  useEffect(() => {
    const saved = localStorage.getItem("resumeBuilder_data");
    if (saved) {
      try {
        setResumeData(JSON.parse(saved));
      } catch (error) {
        console.error("Failed to load saved data:", error);
      }
    }
  }, []);

  const currentStepIndex = steps.indexOf(currentStep);
  const isLastStep = currentStepIndex === steps.length - 1;
  const isFirstStep = currentStepIndex === 0;
  const progressPercent = Math.max(
    0,
    Math.min(100, Math.round((currentStepIndex / (steps.length - 1)) * 100))
  );

  const canProceed = () => {
    switch (currentStep) {
      case "personal":
        return (
          resumeData.personalInfo.fullName &&
          resumeData.personalInfo.email &&
          resumeData.personalInfo.phone &&
          resumeData.personalInfo.location
        );
      case "objective":
        return resumeData.objective.length >= 50;
      case "experience":
        return true;
      case "education":
        return true;
      case "skills":
        return (
          resumeData.skills.technical.length > 0 ||
          resumeData.skills.soft.length > 0
        );
      case "projects":
        return true;
      case "certifications":
        return true;
      default:
        return true;
    }
  };

  const handleNext = () => {
    if (canProceed() && !isLastStep) {
      const newCompleted = new Set(completedSteps);
      newCompleted.add(currentStep);
      setCompletedSteps(newCompleted);
      setCurrentStep(steps[currentStepIndex + 1]);
    }
  };

  const handlePrevious = () => {
    if (!isFirstStep) {
      setCurrentStep(steps[currentStepIndex - 1]);
    }
  };

  const handleStepEdit = (step: string) => {
    setCurrentStep(step as ResumeStep);
  };

  const updatePersonalInfo = (data: PersonalInfo) => {
    setResumeData((prev) => ({ ...prev, personalInfo: data }));
  };
  const updateObjective = (data: string) => {
    setResumeData((prev) => ({ ...prev, objective: data }));
  };
  const updateExperience = (data: Experience[]) => {
    setResumeData((prev) => ({ ...prev, experience: data }));
  };
  const updateEducation = (data: Education[]) => {
    setResumeData((prev) => ({ ...prev, education: data }));
  };
  const updateSkills = (data: { technical: string[]; soft: string[] }) => {
    setResumeData((prev) => ({ ...prev, skills: data }));
  };
  const updateProjects = (data: Project[]) => {
    setResumeData((prev) => ({ ...prev, projects: data }));
  };
  const updateCertifications = (data: Certification[]) => {
    setResumeData((prev) => ({ ...prev, certifications: data }));
  };

  const renderCurrentStep = () => {
    switch (currentStep) {
      case "personal":
        return (
          <PersonalInfoStep
            data={resumeData.personalInfo}
            onUpdate={updatePersonalInfo}
          />
        );
      case "objective":
        return (
          <ObjectiveStep
            data={resumeData.objective}
            onUpdate={updateObjective}
          />
        );
      case "experience":
        return (
          <ExperienceStep
            data={resumeData.experience}
            onUpdate={updateExperience}
          />
        );
      case "education":
        return (
          <EducationStep
            data={resumeData.education}
            onUpdate={updateEducation}
          />
        );
      case "skills":
        return <SkillsStep data={resumeData.skills} onUpdate={updateSkills} />;
      case "projects":
        return (
          <ProjectsStep data={resumeData.projects} onUpdate={updateProjects} />
        );
      case "certifications":
        return (
          <CertificationsStep
            data={resumeData.certifications}
            onUpdate={updateCertifications}
          />
        );
      case "review":
        return <ReviewStep data={resumeData} onEdit={handleStepEdit} />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-subtle">
      <div className="bg-white/80 backdrop-blur supports-[backdrop-filter]:bg-white/60 shadow-sm border-b border-gray-200 print:hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-3">
              <div className="p-2 rounded-xl bg-gradient-primary shadow-glow">
                <FileText className="w-6 h-6 text-white" />
              </div>
              <div>
              <h1 className="text-xl font-bold text-gray-900">AI Resume Builder</h1>
              <p className="text-xs text-gray-500">Template: {selectedTemplate.charAt(0).toUpperCase() + selectedTemplate.slice(1)}</p>
                <p className="text-xs text-gray-500">Craft a professional, ATS-friendly resume</p>
              </div>
            </div>
            <div className="text-sm text-gray-500">
              Step {currentStepIndex + 1} of {steps.length}
            </div>
          </div>
        </div>
        {/* Top progress bar */}
        <div className="w-full h-1 bg-gray-200">
          <div
            className="h-1 bg-blue-600 transition-all duration-300"
            style={{ width: `${progressPercent}%` }}
                    />
                  </div>
                </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 print:p-0 print:max-w-none">
        <div className="print:hidden">
          <StepIndicator currentStep={currentStep} completedSteps={completedSteps} />
                </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 print:grid-cols-1 print:gap-0">
          <div className="bg-white rounded-lg shadow-card border border-gray-200 p-6 print:hidden">
            {renderCurrentStep()}
            <div className="flex items-center justify-between mt-8 pt-6 border-t border-gray-200">
              <button
                onClick={handlePrevious}
                disabled={isFirstStep}
                className="flex items-center space-x-2 px-4 py-2 text-gray-700 hover:text-gray-900 disabled:opacity-50 disabled:cursor-not-allowed transition-colors rounded-md border border-gray-200 bg-white hover:bg-gray-50"
              >
                <ChevronLeft className="w-4 h-4" />
                <span>Previous</span>
              </button>
              {!isLastStep && (
                <button
                  onClick={handleNext}
                  disabled={!canProceed()}
                  className="flex items-center space-x-2 px-6 py-2 rounded-lg text-white shadow-glow hover:shadow-hover disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  style={{ backgroundImage: 'var(--gradient-primary)' }}
                >
                  <span>Next</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
                      )}
                    </div>
                      </div>

          <div className="lg:sticky lg:top-8 lg:self-start print:static print:w-full">
            <div className="mb-4 print:hidden">
              <div className="flex justify-between items-center mb-2">
                      <div>
                  <h2 className="text-lg font-semibold text-gray-900">Live Preview</h2>
                  <p className="text-sm text-gray-600">See how your resume will look</p>
                </div>
                <button
                  onClick={() => {
                    alert(
                      'To download a clean PDF:\n\n1. Press Ctrl+P (or Cmd+P on Mac)\n2. Choose "Save as PDF"\n3. Click "More settings"\n4. UNCHECK "Headers and footers"\n5. Set margins to "Minimum"\n6. Click "Save"\n\nThis will remove the "localhost:5173" from top and bottom!'
                    );
                  }}
                  className="px-4 py-2 rounded-lg text-white transition-colors text-sm font-medium shadow-glow hover:shadow-hover"
                  style={{ backgroundImage: 'var(--gradient-primary)' }}
                >
                  Download PDF
                </button>
              </div>
                  </div>

            <div className="max-h-[800px] overflow-y-auto print:max-h-none print:overflow-visible">
              <div className="bg-white rounded-lg border border-gray-200 shadow-card p-1">
                <ResumePreview data={resumeData} />
                  </div>
                </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ResumeBuilder;