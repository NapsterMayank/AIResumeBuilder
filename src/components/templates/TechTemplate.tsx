import { ResumeData } from "../../types/resume";

interface TemplateProps {
  data: ResumeData;
}

export default function TechTemplate({ data }: TemplateProps) {
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
    <div className="bg-white shadow-lg rounded-lg overflow-hidden print:shadow-none print:rounded-none resume-preview-content font-mono">
      <div className="h-full p-8 space-y-5 text-sm print:p-6 print:space-y-4">
        {/* Header - Name and Contact */}
        <div className="text-center border-b-2 border-green-500 pb-4 print:pb-3 bg-gray-50">
          <h1 className="text-4xl font-bold text-gray-900 mb-3 print:text-3xl print:mb-2 tracking-wide">
            {data.personalInfo.fullName || "Your Name"}
          </h1>

          {/* Contact Information in a single line */}
          <div className="flex flex-wrap justify-center items-center gap-3 text-gray-700 text-sm print:text-xs print:gap-2">
            {data.personalInfo.phone && (
              <span className="flex items-center gap-1">
                <span className="text-green-600">📱</span> {data.personalInfo.phone}
              </span>
            )}
            {data.personalInfo.phone && data.personalInfo.email && (
              <span className="text-gray-400">•</span>
            )}
            {data.personalInfo.email && (
              <span className="flex items-center gap-1">
                <span className="text-green-600">✉️</span> {data.personalInfo.email}
              </span>
            )}
            {data.personalInfo.email &&
              (data.personalInfo.linkedIn ||
                data.personalInfo.github ||
                data.personalInfo.portfolio) && (
                <span className="text-gray-400">•</span>
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
                className="flex items-center gap-1 text-blue-600 hover:text-blue-800 hover:underline"
              >
                <span className="text-green-600">💼</span> LinkedIn
              </a>
            )}
            {data.personalInfo.linkedIn &&
              (data.personalInfo.github || data.personalInfo.portfolio) && (
                <span className="text-gray-400">•</span>
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
                className="flex items-center gap-1 text-blue-600 hover:text-blue-800 hover:underline"
              >
                <span className="text-green-600">🐙</span> GitHub
              </a>
            )}
            {(data.personalInfo.linkedIn || data.personalInfo.github) &&
              data.personalInfo.portfolio && (
                <span className="text-gray-400">•</span>
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
                className="flex items-center gap-1 text-blue-600 hover:text-blue-800 hover:underline"
              >
                <span className="text-green-600">🌐</span> Portfolio
              </a>
            )}
          </div>

          {/* Location on separate line if provided */}
          {data.personalInfo.location && (
            <div className="mt-1 text-gray-600 text-sm print:text-xs">
              📍 {data.personalInfo.location}
            </div>
          )}
        </div>

        {/* Objective */}
        {data.objective && (
          <div className="print:break-inside-avoid bg-green-50 p-4 rounded-lg border-l-4 border-green-500">
            <h2 className="text-lg font-bold text-gray-900 mb-2 print:text-base print:mb-1 uppercase tracking-wide">
              <span className="text-green-600">▶</span> Objective
            </h2>
            <p className="text-gray-700 leading-relaxed text-justify print:text-xs print:leading-relaxed">
              {data.objective}
            </p>
          </div>
        )}

        {/* Experience */}
        {data.experience.length > 0 && (
          <div className="print:break-inside-avoid">
            <h2 className="text-lg font-bold text-gray-900 mb-3 print:text-base print:mb-2 uppercase tracking-wide">
              <span className="text-green-600">💻</span> Experience
            </h2>
            <div className="space-y-4 print:space-y-3">
              {data.experience.map((exp) => (
                <div key={exp.id} className="print:break-inside-avoid bg-gray-50 p-4 rounded-lg">
                  <div className="flex justify-between items-start mb-1 print:mb-0">
                    <div className="flex-1">
                      <h3 className="font-bold text-gray-900 print:text-sm">
                        {exp.jobTitle}
                      </h3>
                      <p className="text-gray-700 italic print:text-xs">
                        {exp.company}
                        {exp.location && `, ${exp.location}`}
                      </p>
                    </div>
                    <div className="text-gray-600 text-right print:text-xs font-medium">
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

        {/* Education */}
        {data.education.length > 0 && (
          <div className="print:break-inside-avoid">
            <h2 className="text-lg font-bold text-gray-900 mb-3 print:text-base print:mb-2 uppercase tracking-wide">
              <span className="text-green-600">🎓</span> Education
            </h2>
            <div className="space-y-3 print:space-y-2">
              {data.education.map((edu) => (
                <div key={edu.id} className="print:break-inside-avoid bg-gray-50 p-3 rounded">
                  <div className="flex justify-between items-start mb-1 print:mb-0">
                    <div className="flex-1">
                      <h3 className="font-bold text-gray-900 print:text-sm">
                        {edu.degree}
                      </h3>
                      <p className="text-gray-700 italic print:text-xs">
                        {edu.institution}
                      </p>
                      {edu.gpa && (
                        <p className="text-gray-600 print:text-xs">
                          CGPA: {edu.gpa}
                        </p>
                      )}
                    </div>
                    <div className="text-gray-600 text-right print:text-xs font-medium">
                      {formatDate(edu.graduationDate)}
                    </div>
                  </div>
                  {edu.relevantCourses &&
                    edu.relevantCourses.filter((c) => c.trim()).length > 0 && (
                      <p className="text-gray-700 mt-1 print:text-xs print:mt-0">
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

        {/* Projects */}
        {data.projects.length > 0 && (
          <div className="print:break-inside-avoid">
            <h2 className="text-lg font-bold text-gray-900 mb-3 print:text-base print:mb-2 uppercase tracking-wide">
              <span className="text-green-600">🚀</span> Projects
            </h2>
            <div className="space-y-4 print:space-y-3">
              {data.projects.map((project) => (
                <div key={project.id} className="print:break-inside-avoid bg-gray-50 p-4 rounded-lg">
                  <div className="flex justify-between items-start mb-1 print:mb-0">
                    <div className="flex-1">
                      <h3 className="font-bold text-gray-900 print:text-sm">
                        {project.name}
                      </h3>
                      <p className="text-gray-700 italic print:text-xs">
                        {project.description}
                      </p>
                    </div>
                    {project.link && (
                      <div className="text-right">
                        <a
                          href={project.link}
                          className="text-blue-600 text-xs hover:underline print:text-xs"
                        >
                          🔗 View Project
                        </a>
                      </div>
                    )}
                  </div>

                  {project.technologies.length > 0 && (
                    <p className="text-gray-600 text-xs mb-1 print:mb-0 mt-1">
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

        {/* Skills */}
        {(data.skills.technical.length > 0 || data.skills.soft.length > 0) && (
          <div className="print:break-inside-avoid bg-green-50 p-4 rounded-lg">
            <h2 className="text-lg font-bold text-gray-900 mb-3 print:text-base print:mb-2 uppercase tracking-wide">
              <span className="text-green-600">⚡</span> Skills
            </h2>
            <div className="space-y-2 print:space-y-1">
              {data.skills.technical.length > 0 && (
                <div>
                  <span className="font-bold text-gray-900 print:text-sm">
                    Languages:
                  </span>{" "}
                  <span className="text-gray-700 print:text-xs">
                    {data.skills.technical.join(", ")}
                  </span>
                </div>
              )}
              {data.skills.soft.length > 0 && (
                <div>
                  <span className="font-bold text-gray-900 print:text-sm">
                    Other Technologies:
                  </span>{" "}
                  <span className="text-gray-700 print:text-xs">
                    {data.skills.soft.join(", ")}
                  </span>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Certifications */}
        {data.certifications.length > 0 && (
          <div className="print:break-inside-avoid">
            <h2 className="text-lg font-bold text-gray-900 mb-3 print:text-base print:mb-2 uppercase tracking-wide">
              <span className="text-green-600">🏆</span> Certifications
            </h2>
            <div className="space-y-2 print:space-y-1">
              {data.certifications.map((cert) => (
                <div
                  key={cert.id}
                  className="flex justify-between items-start print:break-inside-avoid bg-gray-50 p-3 rounded"
                >
                  <div className="flex-1">
                    <h3 className="font-bold text-gray-900 print:text-sm">
                      {cert.name}
                    </h3>
                    <p className="text-gray-700 italic print:text-xs">
                      {cert.issuer}
                    </p>
                  </div>
                  <div className="text-gray-600 text-right print:text-xs">
                    <p className="font-medium">{formatDate(cert.date)}</p>
                    {cert.link && (
                      <a
                        href={cert.link}
                        className="text-blue-600 text-xs hover:underline"
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
  );
}