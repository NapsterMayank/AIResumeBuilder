import { ResumeData } from "../types/resume";
import { Download, Edit3, FileText } from "lucide-react";

interface ReviewStepProps {
  data: ResumeData;
  onEdit: (step: string) => void;
}

export default function ReviewStep({ data, onEdit }: ReviewStepProps) {
  const handleDownload = () => {
    window.print();
  };

  const completionChecks = [
    { label: "Personal Information", complete: data.personalInfo.fullName && data.personalInfo.email && data.personalInfo.phone, step: "personal" },
    { label: "Professional Objective", complete: data.objective && data.objective.length > 50, step: "objective" },
    { label: "Work Experience", complete: data.experience.length > 0 && data.experience.some((exp) => exp.jobTitle && exp.company), step: "experience" },
    { label: "Education", complete: data.education.length > 0 && data.education.some((edu) => edu.degree && edu.institution), step: "education" },
    { label: "Skills", complete: data.skills.technical.length > 0 || data.skills.soft.length > 0, step: "skills" },
  ];

  const completedSections = completionChecks.filter((check) => check.complete).length;
  const totalSections = completionChecks.length;
  const completionPercentage = (completedSections / totalSections) * 100;

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Review Your Resume</h2>
        <p className="text-gray-600">Review all sections and make any final adjustments before downloading your professional resume.</p>
      </div>

      <div className="bg-green-50 border border-green-200 rounded-lg p-6">
        <div className="flex items-center mb-3">
          <FileText className="w-6 h-6 text-green-600 mr-3" />
          <h3 className="text-lg font-semibold text-green-900">Professional Format Applied</h3>
        </div>
        <p className="text-green-800 text-sm mb-3">Your resume now follows the industry-standard professional format preferred by top companies and ATS systems.</p>
      </div>

      <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-blue-900">Resume Completion</h3>
          <span className="text-blue-700 font-medium">{completedSections}/{totalSections} sections</span>
        </div>
        <div className="w-full bg-blue-200 rounded-full h-2 mb-4">
          <div className="bg-blue-600 h-2 rounded-full transition-all duration-300" style={{ width: `${completionPercentage}%` }}></div>
        </div>
        <div className="space-y-2">
          {completionChecks.map((check) => (
            <div key={check.step} className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <div className={`w-4 h-4 rounded-full ${check.complete ? "bg-green-500" : "bg-gray-300"}`}></div>
                <span className={`text-sm ${check.complete ? "text-gray-900" : "text-gray-500"}`}>{check.label}</span>
              </div>
              {!check.complete && (
                <button onClick={() => onEdit(check.step)} className="text-blue-600 hover:text-blue-700 text-sm font-medium flex items-center space-x-1">
                  <Edit3 className="w-3 h-3" />
                  <span>Complete</span>
                </button>
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 text-center">
        <div className="flex items-center justify-center mb-3">
          <FileText className="w-8 h-8 text-blue-600 mr-2" />
          <h3 className="text-lg font-semibold text-gray-900">Download Professional Resume</h3>
        </div>
        <p className="text-gray-600 mb-4">Your resume is {completionPercentage.toFixed(0)}% complete and formatted to industry standards.</p>
        <div className="space-y-3">
          <button onClick={handleDownload} className="inline-flex items-center px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors space-x-2">
            <Download className="w-5 h-5" />
            <span>Download Resume (PDF)</span>
          </button>
          <div className="text-xs text-gray-500">
            <p className="mb-1">✅ Professional format optimized for ATS systems and corporate recruiters</p>
            <p className="mb-1">📄 Click the button above to open your browser's print dialog</p>
            <p className="mb-1">💾 In the print dialog, choose "Save as PDF" as your destination</p>
            <p className="mb-1 text-orange-600 font-medium">🎯 <strong>Important:</strong> In print settings, click "More settings" and UNCHECK "Headers and footers"</p>
            <p className="text-orange-600">This removes browser info (like localhost:5173) from your final PDF</p>
          </div>
        </div>
      </div>
    </div>
  );
}


