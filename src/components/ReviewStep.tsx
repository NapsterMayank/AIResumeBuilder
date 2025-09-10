import { ResumeData } from "../types/resume";
import { Download, Edit3, FileText } from "lucide-react";

interface ReviewStepProps {
  data: ResumeData;
  onEdit: (step: string) => void;
}

export default function ReviewStep({ data, onEdit }: ReviewStepProps) {
  const handleDownload = () => {
    // Use the browser's built-in print functionality
    // This will open the print dialog where users can save as PDF
    window.print();
  };

  // const generateProfessionalResumeHTML = (data: ResumeData): string => {
  //   const formatDate = (dateStr: string, current?: boolean) => {
  //     if (current) return 'Present';
  //     if (!dateStr) return '';
  //     const date = new Date(dateStr + '-01');
  //     return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short' });
  //   };

  //   let html = `
  //     <div class="header">
  //       <h1>${data.personalInfo.fullName || 'Your Name'}</h1>
  //       <div class="contact-info">
  //   `;

  //   // Contact information in a single line
  //   const contactItems = [];
  //   if (data.personalInfo.phone) contactItems.push(data.personalInfo.phone);
  //   if (data.personalInfo.email) contactItems.push(data.personalInfo.email);
  //   if (data.personalInfo.linkedIn) {
  //     const linkedInClean = data.personalInfo.linkedIn.replace('https://', '').replace('http://', '');
  //     contactItems.push(linkedInClean);
  //   }
  //   if (data.personalInfo.github) {
  //     const githubClean = data.personalInfo.github.replace('https://', '').replace('http://', '');
  //     contactItems.push(githubClean);
  //   }

  //   html += contactItems.join(' <span class="contact-separator">•</span> ');
  //   html += `</div>`;

  //   if (data.personalInfo.location) {
  //     html += `<div class="contact-info" style="margin-top: 2pt;">${data.personalInfo.location}</div>`;
  //   }

  //   html += `</div>`;

  //   // Objective
  //   if (data.objective) {
  //     html += `
  //       <div class="section">
  //         <h2>Objective</h2>
  //         <div class="objective">${data.objective}</div>
  //       </div>
  //     `;
  //   }

  //   // Education
  //   if (data.education.length > 0) {
  //     html += `
  //       <div class="section">
  //         <h2>Education</h2>
  //     `;

  //     data.education.forEach(edu => {
  //       html += `
  //         <div class="item">
  //           <div class="item-header">
  //             <div>
  //               <div class="item-title">${edu.degree}</div>
  //               <div class="item-subtitle">${edu.institution}</div>
  //               ${edu.gpa ? `<div style="font-size: 10pt; margin-top: 1pt;">CGPA: ${edu.gpa}</div>` : ''}
  //             </div>
  //             <div class="item-date">${formatDate(edu.graduationDate)}</div>
  //           </div>
  //       `;

  //       if (edu.relevantCourses && edu.relevantCourses.filter(c => c.trim()).length > 0) {
  //         html += `<div style="font-size: 10pt; margin-top: 3pt;"><span class="skill-category">Relevant Coursework:</span> ${edu.relevantCourses.filter(c => c.trim()).join(', ')}</div>`;
  //       }

  //       html += `</div>`;
  //     });

  //     html += `</div>`;
  //   }

  //   // Experience
  //   if (data.experience.length > 0) {
  //     html += `
  //       <div class="section">
  //         <h2>Experience</h2>
  //     `;

  //     data.experience.forEach(exp => {
  //       html += `
  //         <div class="item">
  //           <div class="item-header">
  //             <div>
  //               <div class="item-title">${exp.jobTitle}</div>
  //               <div class="item-subtitle">${exp.company}${exp.location ? `, ${exp.location}` : ''}</div>
  //             </div>
  //             <div class="item-date">${formatDate(exp.startDate)} - ${formatDate(exp.endDate, exp.current)}</div>
  //           </div>
  //       `;

  //       if (exp.responsibilities.filter(r => r.trim()).length > 0) {
  //         html += `<ul>`;
  //         exp.responsibilities.filter(r => r.trim()).forEach(responsibility => {
  //           html += `<li>${responsibility}</li>`;
  //         });
  //         html += `</ul>`;
  //       }

  //       html += `</div>`;
  //     });

  //     html += `</div>`;
  //   }

  //   // Projects
  //   if (data.projects.length > 0) {
  //     html += `
  //       <div class="section">
  //         <h2>Projects</h2>
  //     `;

  //     data.projects.forEach(project => {
  //       html += `
  //         <div class="item">
  //           <div class="item-header">
  //             <div>
  //               <div class="item-title">${project.name}</div>
  //               <div class="item-subtitle">${project.description}</div>
  //             </div>
  //             ${project.link ? `<div><a href="${project.link}">View Project</a></div>` : ''}
  //           </div>
  //       `;

  //       if (project.technologies.length > 0) {
  //         html += `<div class="tech-list"><span class="tech-label">Technologies:</span> ${project.technologies.join(', ')}</div>`;
  //       }

  //       if (project.highlights.filter(h => h.trim()).length > 0) {
  //         html += `<ul>`;
  //         project.highlights.filter(h => h.trim()).forEach(highlight => {
  //           html += `<li>${highlight}</li>`;
  //         });
  //         html += `</ul>`;
  //       }

  //       html += `</div>`;
  //     });

  //     html += `</div>`;
  //   }

  //   // Skills
  //   if (data.skills.technical.length > 0 || data.skills.soft.length > 0) {
  //     html += `
  //       <div class="section">
  //         <h2>Skills</h2>
  //     `;

  //     if (data.skills.technical.length > 0) {
  //       html += `
  //         <div class="skills-item">
  //           <span class="skill-category">Languages:</span>
  //           <span class="skill-list"> ${data.skills.technical.join(', ')}</span>
  //         </div>
  //       `;
  //     }

  //     if (data.skills.soft.length > 0) {
  //       html += `
  //         <div class="skills-item">
  //           <span class="skill-category">Other Technologies:</span>
  //           <span class="skill-list"> ${data.skills.soft.join(', ')}</span>
  //         </div>
  //       `;
  //     }

  //     html += `</div>`;
  //   }

  //   // Certifications
  //   if (data.certifications.length > 0) {
  //     html += `
  //       <div class="section">
  //         <h2>Certifications</h2>
  //     `;

  //     data.certifications.forEach(cert => {
  //       html += `
  //         <div class="item">
  //           <div class="item-header">
  //             <div>
  //               <div class="item-title">${cert.name}</div>
  //               <div class="item-subtitle">${cert.issuer}</div>
  //             </div>
  //             <div class="item-date">
  //               ${formatDate(cert.date)}
  //               ${cert.link ? `<br><a href="${cert.link}">Verify</a>` : ''}
  //             </div>
  //           </div>
  //         </div>
  //       `;
  //     });

  //     html += `</div>`;
  //   }

  //   return html;
  // };

  const completionChecks = [
    {
      label: "Personal Information",
      complete:
        data.personalInfo.fullName &&
        data.personalInfo.email &&
        data.personalInfo.phone,
      step: "personal",
    },
    {
      label: "Professional Objective",
      complete: data.objective && data.objective.length > 50,
      step: "objective",
    },
    {
      label: "Work Experience",
      complete:
        data.experience.length > 0 &&
        data.experience.some((exp) => exp.jobTitle && exp.company),
      step: "experience",
    },
    {
      label: "Education",
      complete:
        data.education.length > 0 &&
        data.education.some((edu) => edu.degree && edu.institution),
      step: "education",
    },
    {
      label: "Skills",
      complete: data.skills.technical.length > 0 || data.skills.soft.length > 0,
      step: "skills",
    },
  ];

  const completedSections = completionChecks.filter(
    (check) => check.complete
  ).length;
  const totalSections = completionChecks.length;
  const completionPercentage = (completedSections / totalSections) * 100;

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          Review Your Resume
        </h2>
        <p className="text-gray-600">
          Review all sections and make any final adjustments before downloading
          your professional resume.
        </p>
      </div>

      {/* Professional Format Notice */}
      <div className="bg-green-50 border border-green-200 rounded-lg p-6">
        <div className="flex items-center mb-3">
          <FileText className="w-6 h-6 text-green-600 mr-3" />
          <h3 className="text-lg font-semibold text-green-900">
            Professional Format Applied
          </h3>
        </div>
        <p className="text-green-800 text-sm mb-3">
          Your resume now follows the industry-standard professional format
          preferred by top companies and ATS systems.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
          <div className="space-y-2">
            <div className="flex items-center text-green-700">
              <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
              Clean, professional typography
            </div>
            <div className="flex items-center text-green-700">
              <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
              Industry-standard section order
            </div>
            <div className="flex items-center text-green-700">
              <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
              ATS-optimized formatting
            </div>
          </div>
          <div className="space-y-2">
            <div className="flex items-center text-green-700">
              <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
              Professional contact layout
            </div>
            <div className="flex items-center text-green-700">
              <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
              Consistent date formatting
            </div>
            <div className="flex items-center text-green-700">
              <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
              Corporate-ready design
            </div>
          </div>
        </div>
      </div>

      {/* Completion Status */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-blue-900">
            Resume Completion
          </h3>
          <span className="text-blue-700 font-medium">
            {completedSections}/{totalSections} sections
          </span>
        </div>

        <div className="w-full bg-blue-200 rounded-full h-2 mb-4">
          <div
            className="bg-blue-600 h-2 rounded-full transition-all duration-300"
            style={{ width: `${completionPercentage}%` }}
          ></div>
        </div>

        <div className="space-y-2">
          {completionChecks.map((check) => (
            <div key={check.step} className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <div
                  className={`w-4 h-4 rounded-full ${
                    check.complete ? "bg-green-500" : "bg-gray-300"
                  }`}
                ></div>
                <span
                  className={`text-sm ${
                    check.complete ? "text-gray-900" : "text-gray-500"
                  }`}
                >
                  {check.label}
                </span>
              </div>
              {!check.complete && (
                <button
                  onClick={() => onEdit(check.step)}
                  className="text-blue-600 hover:text-blue-700 text-sm font-medium flex items-center space-x-1"
                >
                  <Edit3 className="w-3 h-3" />
                  <span>Complete</span>
                </button>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white border border-gray-200 rounded-lg p-4 text-center">
          <div className="text-2xl font-bold text-blue-600">
            {data.experience.length}
          </div>
          <div className="text-sm text-gray-600">Work Experience</div>
        </div>
        <div className="bg-white border border-gray-200 rounded-lg p-4 text-center">
          <div className="text-2xl font-bold text-green-600">
            {data.skills.technical.length}
          </div>
          <div className="text-sm text-gray-600">Technical Skills</div>
        </div>
        <div className="bg-white border border-gray-200 rounded-lg p-4 text-center">
          <div className="text-2xl font-bold text-purple-600">
            {data.projects.length}
          </div>
          <div className="text-sm text-gray-600">Projects</div>
        </div>
        <div className="bg-white border border-gray-200 rounded-lg p-4 text-center">
          <div className="text-2xl font-bold text-orange-600">
            {data.certifications.length}
          </div>
          <div className="text-sm text-gray-600">Certifications</div>
        </div>
      </div>

      {/* Download Section */}
      <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 text-center">
        <div className="flex items-center justify-center mb-3">
          <FileText className="w-8 h-8 text-blue-600 mr-2" />
          <h3 className="text-lg font-semibold text-gray-900">
            Download Professional Resume
          </h3>
        </div>
        <p className="text-gray-600 mb-4">
          Your resume is {completionPercentage.toFixed(0)}% complete and
          formatted to industry standards.
        </p>

        <div className="space-y-3">
          <button
            onClick={handleDownload}
            className="inline-flex items-center px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors space-x-2"
          >
            <Download className="w-5 h-5" />
            <span>Download Resume (PDF)</span>
          </button>

          <div className="text-xs text-gray-500">
            <p className="mb-1">
              ✅ Professional format optimized for ATS systems and corporate
              recruiters
            </p>
            <p className="mb-1">
              📄 Click the button above to open your browser's print dialog
            </p>
            <p className="mb-1">
              💾 In the print dialog, choose "Save as PDF" as your destination
            </p>
            <p className="mb-1 text-orange-600 font-medium">
              🎯 <strong>Important:</strong> In print settings, click "More
              settings" and UNCHECK "Headers and footers"
            </p>
            <p className="text-orange-600">
              This removes browser info (like localhost:5173) from your final
              PDF
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
