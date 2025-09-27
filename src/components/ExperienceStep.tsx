import { useState } from "react";
import {
  Plus,
  Trash2,
  Building,
  Wand2,
  RefreshCw,
  Copy,
  Check,
} from "lucide-react";
import { Experience } from "../types/resume";
import { API_ENDPOINTS } from "../utils/api";

interface ExperienceStepProps {
  data: Experience[];
  onUpdate: (data: Experience[]) => void;
}

export default function ExperienceStep({
  data,
  onUpdate,
}: ExperienceStepProps) {
  const [expandedId, setExpandedId] = useState<string | null>(
    data[0]?.id || null
  );
  const [aiGeneratingFor, setAiGeneratingFor] = useState<string | null>(null);
  const [generatedResponsibilities, setGeneratedResponsibilities] = useState<{
    [key: string]: string[];
  }>({});
  const [showGeneratedFor, setShowGeneratedFor] = useState<string | null>(null);
  const [copiedResponsibility, setCopiedResponsibility] = useState<
    string | null
  >(null);

  const addExperience = () => {
    const newExperience: Experience = {
      id: Date.now().toString(),
      jobTitle: "",
      company: "",
      location: "",
      startDate: "",
      endDate: "",
      current: false,
      responsibilities: [""],
    };
    onUpdate([...data, newExperience]);
    setExpandedId(newExperience.id);
  };

  const updateExperience = (id: string, updates: Partial<Experience>) => {
    onUpdate(data.map((exp) => (exp.id === id ? { ...exp, ...updates } : exp)));
  };

  const removeExperience = (id: string) => {
    onUpdate(data.filter((exp) => exp.id !== id));
    if (expandedId === id) {
      setExpandedId(data.find((exp) => exp.id !== id)?.id || null);
    }
  };

  const addResponsibility = (experienceId: string) => {
    const experience = data.find((exp) => exp.id === experienceId);
    if (experience) {
      updateExperience(experienceId, {
        responsibilities: [...experience.responsibilities, ""],
      });
    }
  };

  const updateResponsibility = (
    experienceId: string,
    index: number,
    value: string
  ) => {
    const experience = data.find((exp) => exp.id === experienceId);
    if (experience) {
      const newResponsibilities = [...experience.responsibilities];
      newResponsibilities[index] = value;
      updateExperience(experienceId, { responsibilities: newResponsibilities });
    }
  };

  const removeResponsibility = (experienceId: string, index: number) => {
    const experience = data.find((exp) => exp.id === experienceId);
    if (experience && experience.responsibilities.length > 1) {
      const newResponsibilities = experience.responsibilities.filter(
        (_, i) => i !== index
      );
      updateExperience(experienceId, { responsibilities: newResponsibilities });
    }
  };

  const generateAIResponsibilities = async (experienceId: string) => {
    const experience = data.find((exp) => exp.id === experienceId);
    if (!experience || !experience.jobTitle) {
      alert(
        "Please fill in the job title first to generate AI responsibilities."
      );
      return;
    }

    setAiGeneratingFor(experienceId);

    try {
      // Get current skills from localStorage for context
      let technicalSkills: string[] = [];
      let softSkills: string[] = [];
      try {
        const savedData = localStorage.getItem("resumeBuilder_data");
        if (savedData) {
          const resumeData = JSON.parse(savedData);
          technicalSkills = resumeData.skills?.technical || [];
          softSkills = resumeData.skills?.soft || [];
        }
      } catch (error) {
        console.error("Failed to load skills:", error);
      }

      // Combine all skills for keywords
      const allSkills = [...technicalSkills, ...softSkills];

      // Create context text from current job info
      const contextText = `${experience.jobTitle} at ${
        experience.company || "Technology Company"
      }. ${
        experience.location ? `Located in ${experience.location}.` : ""
      } ${experience.responsibilities.filter((r) => r.trim()).join(" ")}`;

      // Prepare data for API to match backend expectations
      const requestData = {
        inputType: "experience",
        text: contextText,
        keywords: allSkills,
        experienceLevel: "mid", // You can make this dynamic if needed
      };

      // Call your backend API
      const response = await fetch(API_ENDPOINTS.REGENERATE, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestData),
      });

      if (!response.ok) {
        // Try to get error details from response
        let errorDetails;
        try {
          errorDetails = await response.text();
        } catch {
          errorDetails = "Could not read error response";
        }
        throw new Error(
          `HTTP error! status: ${response.status}, details: ${errorDetails}`
        );
      }

      const result = await response.json();

      // Your backend returns { rewrittenText: "..." }
      const rewrittenText = result.rewrittenText;

      if (!rewrittenText) {
        throw new Error("No rewritten text received from API");
      }

      // Split the response into multiple responsibilities with better parsing
      let responsibilities: string[] = [];

      // First try to split by common bullet point patterns
      if (
        rewrittenText.includes("•") ||
        rewrittenText.includes("*") ||
        rewrittenText.includes("-")
      ) {
        responsibilities = rewrittenText
          .split(/[•*-]\s*/)
          .map((item: string) => item.trim())
          .filter((item: string) => item.length > 15);
      }
      // Try numbered lists
      else if (rewrittenText.match(/\d+\./)) {
        responsibilities = rewrittenText
          .split(/\d+\.\s*/)
          .map((item: string) => item.trim())
          .filter((item: string) => item.length > 15);
      }
      // Try splitting by double line breaks (paragraphs)
      else if (rewrittenText.includes("\n\n")) {
        responsibilities = rewrittenText
          .split(/\n\n+/)
          .map((item: string) => item.trim())
          .filter((item: string) => item.length > 15);
      }
      // Try splitting by single line breaks
      else if (rewrittenText.includes("\n")) {
        responsibilities = rewrittenText
          .split(/\n/)
          .map((item: string) => item.trim())
          .filter((item: string) => item.length > 15);
      }
      // If it's one long paragraph, try to split by sentences and group them
      else if (rewrittenText.length > 200) {
        const sentences = rewrittenText
          .split(/\.\s+/)
          .map((sentence: string) => sentence.trim())
          .filter((sentence: string) => sentence.length > 20);

        // Group sentences into 2-sentence bullet points
        responsibilities = [];
        for (let i = 0; i < sentences.length; i += 2) {
          const combined = sentences.slice(i, i + 2).join(". ");
          if (combined.trim()) {
            responsibilities.push(
              combined.endsWith(".") ? combined : combined + "."
            );
          }
        }
      }

      // Remove empty items and limit to 5 responsibilities
      responsibilities = responsibilities
        .filter((item: string) => item.length > 15)
        .slice(0, 5);

      // Use the parsed responsibilities, or split the original text as fallback
      const finalResponsibilities =
        responsibilities.length > 1
          ? responsibilities
          : [
              rewrittenText.slice(0, 150) +
                (rewrittenText.length > 150 ? "..." : ""),
            ];

      setGeneratedResponsibilities((prev) => ({
        ...prev,
        [experienceId]: finalResponsibilities,
      }));
      setShowGeneratedFor(experienceId);
    } catch (error) {
      console.error("Failed to generate responsibilities from API:", error);
      const errorMessage =
        error instanceof Error ? error.message : "Unknown error occurred";
      alert(
        `API Error: ${errorMessage}. Please check your backend server and try again.`
      );
    }

    setAiGeneratingFor(null);
  };

  const selectGeneratedResponsibility = (
    experienceId: string,
    responsibility: string,
    index?: number
  ) => {
    const experience = data.find((exp) => exp.id === experienceId);
    if (!experience) return;

    if (typeof index === "number") {
      // Replace specific responsibility
      const newResponsibilities = [...experience.responsibilities];
      newResponsibilities[index] = responsibility;
      updateExperience(experienceId, { responsibilities: newResponsibilities });
    } else {
      // Add as new responsibility
      updateExperience(experienceId, {
        responsibilities: [...experience.responsibilities, responsibility],
      });
    }
  };

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedResponsibility(text);
      setTimeout(() => setCopiedResponsibility(null), 2000);
    } catch (error) {
      console.error("Failed to copy text:", error);
    }
  };

  const enhanceExistingResponsibility = async (
    experienceId: string,
    responsibilityIndex: number
  ) => {
    const experience = data.find((exp) => exp.id === experienceId);
    if (
      !experience ||
      !experience.responsibilities[responsibilityIndex]?.trim()
    ) {
      alert(
        "Please write something first, then I can help make it more professional."
      );
      return;
    }

    const originalText = experience.responsibilities[responsibilityIndex];
    setAiGeneratingFor(`${experienceId}-${responsibilityIndex}`);

    try {
      // Get current skills from localStorage for context
      let technicalSkills: string[] = [];
      let softSkills: string[] = [];
      try {
        const savedData = localStorage.getItem("resumeBuilder_data");
        if (savedData) {
          const resumeData = JSON.parse(savedData);
          technicalSkills = resumeData.skills?.technical || [];
          softSkills = resumeData.skills?.soft || [];
        }
      } catch (error) {
        console.error("Failed to load skills:", error);
      }

      // Combine all skills for keywords
      const allSkills = [...technicalSkills, ...softSkills];

      // Prepare data for API to enhance the existing responsibility
      const requestData = {
        inputType: "experience",
        text: `${originalText} (Job: ${experience.jobTitle} at ${experience.company})`,
        keywords: allSkills,
        experienceLevel: "mid",
      };

      // Call your backend API
      const response = await fetch(API_ENDPOINTS.REGENERATE, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestData),
      });

      if (!response.ok) {
        let errorDetails;
        try {
          errorDetails = await response.text();
        } catch {
          errorDetails = "Could not read error response";
        }
        throw new Error(
          `HTTP error! status: ${response.status}, details: ${errorDetails}`
        );
      }

      const result = await response.json();

      const enhancedText = result.rewrittenText;

      if (!enhancedText) {
        throw new Error("No enhanced text received from API");
      }

      // Ensure the enhanced text is concise and professional (limit to ~150 chars)
      let finalText = enhancedText.trim();
      if (finalText.length > 180) {
        // Find a good breaking point near 150 characters
        const sentences = finalText.split(/[.!?]\s+/);
        let combined = "";
        for (const sentence of sentences) {
          if ((combined + sentence).length > 150) break;
          combined += (combined ? ". " : "") + sentence;
        }
        finalText = combined.endsWith(".") ? combined : combined + ".";
      }

      // Update the responsibility with enhanced version
      updateResponsibility(experienceId, responsibilityIndex, finalText);
    } catch (error) {
      console.error("Failed to enhance responsibility:", error);
      const errorMessage =
        error instanceof Error ? error.message : "Unknown error occurred";
      alert(
        `API Error: ${errorMessage}. Please check your backend server and try again.`
      );
    }

    setAiGeneratingFor(null);
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          Work Experience
        </h2>
        <p className="text-gray-600">
          Add your professional experience with quantifiable achievements. Use
          AI to make your descriptions more professional.
        </p>
      </div>

      <div className="space-y-4">
        {data.map((experience) => (
          <div
            key={experience.id}
            className="border border-gray-200 rounded-lg overflow-hidden"
          >
            <div
              className="bg-gray-50 px-4 py-3 cursor-pointer hover:bg-gray-100 transition-colors"
              onClick={() =>
                setExpandedId(
                  expandedId === experience.id ? null : experience.id
                )
              }
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <Building className="w-5 h-5 text-gray-500" />
                  <div>
                    <h3 className="font-medium text-gray-900">
                      {experience.jobTitle || "New Position"}
                    </h3>
                    <p className="text-sm text-gray-500">
                      {experience.company}{" "}
                      {experience.location && `• ${experience.location}`}
                    </p>
                  </div>
                </div>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    removeExperience(experience.id);
                  }}
                  className="text-red-500 hover:text-red-700 p-1"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>

            {expandedId === experience.id && (
              <div className="p-4 space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Job Title *
                    </label>
                    <input
                      type="text"
                      value={experience.jobTitle}
                      onChange={(e) =>
                        updateExperience(experience.id, {
                          jobTitle: e.target.value,
                        })
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Senior Software Developer"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Company *
                    </label>
                    <input
                      type="text"
                      value={experience.company}
                      onChange={(e) =>
                        updateExperience(experience.id, {
                          company: e.target.value,
                        })
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Tech Company Inc."
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Location
                    </label>
                    <input
                      type="text"
                      value={experience.location}
                      onChange={(e) =>
                        updateExperience(experience.id, {
                          location: e.target.value,
                        })
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="San Francisco, CA"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Start Date *
                      </label>
                      <input
                        type="month"
                        value={experience.startDate}
                        onChange={(e) =>
                          updateExperience(experience.id, {
                            startDate: e.target.value,
                          })
                        }
                        min="2000-01"
                        max="2030-12"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        End Date
                      </label>
                      <input
                        type="month"
                        value={experience.endDate}
                        onChange={(e) =>
                          updateExperience(experience.id, {
                            endDate: e.target.value,
                          })
                        }
                        disabled={experience.current}
                        min="2000-01"
                        max="2030-12"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100"
                        placeholder={experience.current ? "Present" : ""}
                      />
                    </div>

                    <div className="flex items-center pb-2">
                      <input
                        type="checkbox"
                        id={`current-${experience.id}`}
                        checked={experience.current}
                        onChange={(e) =>
                          updateExperience(experience.id, {
                            current: e.target.checked,
                            endDate: e.target.checked ? "" : experience.endDate,
                          })
                        }
                        className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                      />
                      <label
                        htmlFor={`current-${experience.id}`}
                        className="ml-2 text-sm text-gray-700"
                      >
                        Current Position
                      </label>
                    </div>
                  </div>
                </div>

                {/* AI-Enhanced Responsibilities Section */}
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <label className="block text-sm font-medium text-gray-700">
                      Key Responsibilities & Achievements *
                    </label>
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() =>
                          generateAIResponsibilities(experience.id)
                        }
                        disabled={
                          aiGeneratingFor === experience.id ||
                          !experience.jobTitle
                        }
                        className="px-3 py-1 bg-gradient-to-r from-purple-600 to-blue-600 text-white text-sm rounded-lg hover:from-purple-700 hover:to-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 flex items-center space-x-1"
                      >
                        {aiGeneratingFor === experience.id ? (
                          <>
                            <RefreshCw className="w-3 h-3 animate-spin" />
                            <span>Generating...</span>
                          </>
                        ) : (
                          <>
                            <Wand2 className="w-3 h-3" />
                            <span>AI Generate</span>
                          </>
                        )}
                      </button>
                      <button
                        onClick={() => addResponsibility(experience.id)}
                        className="text-sm text-blue-600 hover:text-blue-700 font-medium"
                      >
                        Add Item
                      </button>
                    </div>
                  </div>

                  {/* Generated Responsibilities */}
                  {showGeneratedFor === experience.id &&
                    generatedResponsibilities[experience.id] && (
                      <div className="mb-4 bg-gradient-to-r from-purple-50 to-blue-50 border border-purple-200 rounded-lg p-4">
                        <h4 className="text-sm font-semibold text-purple-900 mb-3">
                          AI-Generated Professional Responsibilities
                        </h4>
                        <div className="space-y-3">
                          {generatedResponsibilities[experience.id].map(
                            (responsibility, index) => (
                              <div
                                key={index}
                                className="bg-white border border-purple-200 rounded-lg p-3"
                              >
                                <p className="text-gray-700 text-sm leading-relaxed mb-2">
                                  {responsibility}
                                </p>
                                <div className="flex items-center space-x-2">
                                  <button
                                    onClick={() =>
                                      selectGeneratedResponsibility(
                                        experience.id,
                                        responsibility
                                      )
                                    }
                                    className="px-3 py-1 bg-purple-600 text-white text-xs rounded hover:bg-purple-700 transition-colors"
                                  >
                                    Add This
                                  </button>
                                  <button
                                    onClick={() =>
                                      copyToClipboard(responsibility)
                                    }
                                    className="px-3 py-1 text-gray-600 hover:text-gray-800 text-xs border border-gray-300 rounded hover:border-gray-400 transition-colors flex items-center space-x-1"
                                  >
                                    {copiedResponsibility === responsibility ? (
                                      <>
                                        <Check className="w-3 h-3 text-green-600" />
                                        <span className="text-green-600">
                                          Copied!
                                        </span>
                                      </>
                                    ) : (
                                      <>
                                        <Copy className="w-3 h-3" />
                                        <span>Copy</span>
                                      </>
                                    )}
                                  </button>
                                </div>
                              </div>
                            )
                          )}
                        </div>
                        <button
                          onClick={() => setShowGeneratedFor(null)}
                          className="mt-3 text-sm text-gray-600 hover:text-gray-800"
                        >
                          Hide Generated Options
                        </button>
                      </div>
                    )}

                  <div className="space-y-2">
                    {experience.responsibilities.map(
                      (responsibility, index) => (
                        <div key={index} className="flex items-start space-x-2">
                          <span className="text-gray-400 mt-3">•</span>
                          <div className="flex-1">
                            <textarea
                              value={responsibility}
                              onChange={(e) =>
                                updateResponsibility(
                                  experience.id,
                                  index,
                                  e.target.value
                                )
                              }
                              rows={2}
                              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                              placeholder="Led development of microservices architecture that improved system performance by 40%"
                            />
                            {responsibility.trim() && (
                              <button
                                onClick={() =>
                                  enhanceExistingResponsibility(
                                    experience.id,
                                    index
                                  )
                                }
                                disabled={
                                  aiGeneratingFor ===
                                  `${experience.id}-${index}`
                                }
                                className="mt-1 text-xs text-purple-600 hover:text-purple-700 font-medium flex items-center space-x-1"
                              >
                                {aiGeneratingFor ===
                                `${experience.id}-${index}` ? (
                                  <>
                                    <RefreshCw className="w-3 h-3 animate-spin" />
                                    <span>Enhancing...</span>
                                  </>
                                ) : (
                                  <>
                                    <Wand2 className="w-3 h-3" />
                                    <span>Make Professional</span>
                                  </>
                                )}
                              </button>
                            )}
                          </div>
                          {experience.responsibilities.length > 1 && (
                            <button
                              onClick={() =>
                                removeResponsibility(experience.id, index)
                              }
                              className="text-red-500 hover:text-red-700 p-1 mt-1"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          )}
                        </div>
                      )
                    )}
                  </div>
                  <div className="mt-2 text-xs text-gray-500">
                    💡 <strong>Pro Tips:</strong> Use action verbs, quantify
                    achievements (e.g., "Increased performance by 40%", "Led
                    team of 5 developers"), and let AI help make your
                    descriptions more professional!
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}

        <button
          onClick={addExperience}
          className="w-full py-3 border-2 border-dashed border-gray-300 rounded-lg text-gray-600 hover:border-blue-400 hover:text-blue-600 transition-colors flex items-center justify-center space-x-2"
        >
          <Plus className="w-5 h-5" />
          <span>Add Work Experience</span>
        </button>
      </div>
    </div>
  );
}
