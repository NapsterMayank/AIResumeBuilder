import { ResumeData } from "../../types/resume";

interface TemplateProps {
  data: ResumeData;
}

export default function ModernTemplate({ data }: TemplateProps) {
  const formatDate = (dateStr: string, current?: boolean) => {
    if (current) return "Present";
    if (!dateStr) return "";
    const date = new Date(dateStr + "-01");
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
    });
  };

  return (
    <div className="bg-white shadow-lg rounded-lg overflow-hidden print:shadow-none print:rounded-none resume-preview-content">
      <div className="h-full p-8 space-y-6 text-sm print:p-6 print:space-y-4">
        {/* Modern Header */}
        <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white p-6 rounded-lg mb-6 print:p-4 print:mb-4">
          <h1 className="text-4xl font-bold mb-3 print:text-3xl print:mb-2 tracking-wide">
            {data.personalInfo.fullName || "Your Name"}
          </h1>

          {/* Contact Information */}
          <div className="flex flex-wrap justify-center items-center gap-3 text-white/90 text-sm print:text-xs print:gap-2">
            {data.personalInfo.phone && (
              <span className="flex items-center gap-1">
                📞 {data.personalInfo.phone}
              </span>
            )}
            {data.personalInfo.phone && data.personalInfo.email && (
              <span className="text-white/70">|</span>
            )}
            {data.personalInfo.email && (
              <span className="flex items-center gap-1">
                ✉️ {data.personalInfo.email}
              </span>
            )}
            {data.personalInfo.email &&
              (data.personalInfo.linkedIn ||
                data.personalInfo.github ||
                data.personalInfo.portfolio) && (
                <span className="text-white/70">|</span>
              )}
            {data.personalInfo.linkedIn && (
              <a
                href={
                  data.personalInfo.linkedIn.startsWith("http")
                    ? data.personalInfo.linkedIn
                    : `https://${data.personalInfo.linkedIn}`
                }
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1 text-white hover:text-white/80 hover:underline"
              >
                💼 LinkedIn
              </a>
            )}
            {data.personalInfo.linkedIn &&
              (data.personalInfo.github || data.personalInfo.portfolio) && (
                <span className="text-white/70">|</span>
              )}
            {data.personalInfo.github && (
              <a
                href={
                  data.personalInfo.github.startsWith("http")
                    ? data.personalInfo.github
                    : `https://${data.personalInfo.github}`
                }
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1 text-white hover:text-white/80 hover:underline"
              >
                🐙 GitHub
              </a>
            )}
            {(data.personalInfo.linkedIn || data.personalInfo.github) &&
              data.personalInfo.portfolio && (
                <span className="text-white/70">|</span>
              )}
            {data.personalInfo.portfolio && (
              <a
                href={
                  data.personalInfo.portfolio.startsWith("http")
                    ? data.personalInfo.portfolio
                    : `https://${data.personalInfo.portfolio}`
                }
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1 text-white hover:text-white/80 hover:underline"
              >
                🌐 Portfolio
              </a>
            )}
          </div>

          {/* Location */}
          {data.personalInfo.location && (
            <div className="mt-2 text-white/90 text-sm print:text-xs text-center">
              📍 {data.personalInfo.location}
            </div>
          )}
        </div>

        {/* Content in clean sections */}
        <div className="space-y-6">
          {/* Objective */}
          {data.objective && (
            <div className="print:break-inside-avoid">
              <h2 className="text-xl font-bold text-indigo-900 mb-3 print:text-lg print:mb-2 uppercase tracking-wide border-b-2 border-indigo-200 pb-1">
                Objective
              </h2>
              <p className="text-gray-700 leading-relaxed text-justify print:text-xs print:leading-relaxed">
                {data.objective}
              </p>
            </div>
          )}

          {/* Experience */}
          {data.experience.length > 0 && (
            <div className="print:break-inside-avoid">
              <h2 className="text-xl font-bold text-indigo-900 mb-3 print:text-lg print:mb-2 uppercase tracking-wide border-b-2 border-indigo-200 pb-1">
                Experience
              </h2>
              <div className="space-y-4 print:space-y-3">
                {data.experience.map((exp) => (
                  <div key={exp.id} className="print:break-inside-avoid bg-gray-50 p-4 rounded-lg">
                    <div className="flex justify-between items-start mb-2 print:mb-1">
                      <div className="flex-1">
                        <h3 className="font-bold text-indigo-900 print:text-sm text-lg">
                          {exp.jobTitle}
                        </h3>
                        <p className="text-indigo-700 italic print:text-xs font-medium">
                          {exp.company}
                          {exp.location && `, ${exp.location}`}
                        </p>
                      </div>
                      <div className="text-indigo-600 text-right print:text-xs font-medium bg-indigo-100 px-2 py-1 rounded">
                        {formatDate(exp.startDate)} -{" "}
                        {formatDate(exp.endDate, exp.current)}
                      </div>
                    </div>
                    {exp.responsibilities.filter((r) => r.trim()).length > 0 && (
                      <ul className="list-disc list-inside ml-0 space-y-1 text-gray-700 print:ml-0 print:space-y-0 print:text-xs mt-2 print:mt-1">
                        {exp.responsibilities
                          .filter((r) => r.trim())
                          .map((responsibility, index) => (
                            <li
                              key={index}
                              className="print:leading-tight leading-relaxed"
                            >
                              {responsibility}
                            </li>
                          ))}
                      </ul>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Education and Skills side by side */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 print:grid-cols-1 print:gap-4">
            {/* Education */}
            {data.education.length > 0 && (
              <div className="print:break-inside-avoid">
                <h2 className="text-xl font-bold text-indigo-900 mb-3 print:text-lg print:mb-2 uppercase tracking-wide border-b-2 border-indigo-200 pb-1">
                  Education
                </h2>
                <div className="space-y-3 print:space-y-2">
                  {data.education.map((edu) => (
                    <div key={edu.id} className="print:break-inside-avoid bg-gray-50 p-3 rounded">
                      <div className="flex justify-between items-start mb-1 print:mb-0">
                        <div className="flex-1">
                          <h3 className="font-bold text-indigo-900 print:text-sm">
                            {edu.degree}
                          </h3>
                          <p className="text-indigo-700 italic print:text-xs">
                            {edu.institution}
                          </p>
                          {edu.gpa && (
                            <p className="text-indigo-600 print:text-xs">
                              CGPA: {edu.gpa}
                            </p>
                          )}
                        </div>
                        <div className="text-indigo-600 text-right print:text-xs font-medium">
                          {formatDate(edu.graduationDate)}
                        </div>
                      </div>
                      {edu.relevantCourses &&
                        edu.relevantCourses.filter((c) => c.trim()).length > 0 && (
                          <p className="text-indigo-700 mt-1 print:text-xs print:mt-0">
                            <span className="font-medium">
                              Relevant Coursework:
                            </span>{" "}
                            {edu.relevantCourses.filter((c) => c.trim()).join(", ")}
                          </p>
                        )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Skills */}
            {(data.skills.technical.length > 0 || data.skills.soft.length > 0) && (
              <div className="print:break-inside-avoid">
                <h2 className="text-xl font-bold text-indigo-900 mb-3 print:text-lg print:mb-2 uppercase tracking-wide border-b-2 border-indigo-200 pb-1">
                  Skills
                </h2>
                <div className="space-y-3 print:space-y-2">
                  {data.skills.technical.length > 0 && (
                    <div className="bg-gray-50 p-3 rounded">
                      <span className="font-bold text-indigo-900 print:text-sm">
                        Technical Skills:
                      </span>{" "}
                      <span className="text-gray-700 print:text-xs">
                        {data.skills.technical.join(", ")}
                      </span>
                    </div>
                  )}
                  {data.skills.soft.length > 0 && (
                    <div className="bg-gray-50 p-3 rounded">
                      <span className="font-bold text-indigo-900 print:text-sm">
                        Additional Skills:
                      </span>{" "}
                      <span className="text-gray-700 print:text-xs">
                        {data.skills.soft.join(", ")}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Projects */}
          {data.projects.length > 0 && (
            <div className="print:break-inside-avoid">
              <h2 className="text-xl font-bold text-indigo-900 mb-3 print:text-lg print:mb-2 uppercase tracking-wide border-b-2 border-indigo-200 pb-1">
                Projects
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 print:grid-cols-1 print:gap-3">
                {data.projects.map((project) => (
                  <div key={project.id} className="print:break-inside-avoid bg-gray-50 p-4 rounded-lg">
                    <div className="flex justify-between items-start mb-1 print:mb-0">
                      <div className="flex-1">
                        <h3 className="font-bold text-indigo-900 print:text-sm">
                          {project.name}
                        </h3>
                        <p className="text-indigo-700 italic print:text-xs">
                          {project.description}
                        </p>
                      </div>
                      {project.link && (
                        <div className="text-right">
                          <a
                            href={project.link}
                            className="text-indigo-600 text-xs hover:underline print:text-xs"
                          >
                            🔗 View Project
                          </a>
                        </div>
                      )}
                    </div>

                    {project.technologies.length > 0 && (
                      <p className="text-indigo-600 text-xs mb-1 print:mb-0 mt-1">
                        <span className="font-medium">🛠️ Technologies:</span>{" "}
                        {project.technologies.join(", ")}
                      </p>
                    )}

                    {project.highlights.filter((h) => h.trim()).length > 0 && (
                      <ul className="list-disc list-inside ml-0 space-y-1 text-gray-700 print:ml-0 print:space-y-0 print:text-xs mt-2 print:mt-1">
                        {project.highlights
                          .filter((h) => h.trim())
                          .map((highlight, index) => (
                            <li
                              key={index}
                              className="print:leading-tight leading-relaxed"
                            >
                              {highlight}
                            </li>
                          ))}
                      </ul>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Certifications */}
          {data.certifications.length > 0 && (
            <div className="print:break-inside-avoid">
              <h2 className="text-xl font-bold text-indigo-900 mb-3 print:text-lg print:mb-2 uppercase tracking-wide border-b-2 border-indigo-200 pb-1">
                Certifications
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 print:grid-cols-1 print:gap-3">
                {data.certifications.map((cert) => (
                  <div
                    key={cert.id}
                    className="flex justify-between items-start print:break-inside-avoid bg-gray-50 p-3 rounded"
                  >
                    <div className="flex-1">
                      <h3 className="font-bold text-indigo-900 print:text-sm">
                        {cert.name}
                      </h3>
                      <p className="text-indigo-700 italic print:text-xs">
                        {cert.issuer}
                      </p>
                    </div>
                    <div className="text-indigo-600 text-right print:text-xs">
                      <p className="font-medium">{formatDate(cert.date)}</p>
                      {cert.link && (
                        <a
                          href={cert.link}
                          className="text-indigo-600 text-xs hover:underline"
                        >
                          🔗 Verify
                        </a>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}