import { useState, useEffect } from "react";
import { Lightbulb, Wand2, RefreshCw, Copy, Check, Plus } from "lucide-react";
import { API_ENDPOINTS } from '../utils/api';

interface ObjectiveStepProps {
  data: string;
  onUpdate: (data: string) => void;
}

const expandedKeywordSuggestions = [
  "Full-stack development","Frontend development","Backend development","Mobile development","Web development","Software engineering","DevOps engineering","Cloud architecture",
  "JavaScript","TypeScript","Python","Java","C++","C#","Go","Rust","PHP","Ruby",
  "React","Vue.js","Angular","Next.js","Svelte","HTML5","CSS3","SASS","Tailwind CSS","Bootstrap","Material-UI","Responsive design","Progressive Web Apps","Single Page Applications",
  "Node.js","Express.js","Django","Flask","Spring Boot","ASP.NET","Laravel","Ruby on Rails","FastAPI","GraphQL","RESTful APIs","Microservices architecture","Serverless computing",
  "MongoDB","PostgreSQL","MySQL","Redis","Elasticsearch","DynamoDB","Cassandra","Database optimization","Data modeling","SQL optimization","NoSQL databases",
  "AWS","Azure","Google Cloud Platform","Docker","Kubernetes","Jenkins","GitLab CI","Terraform","Ansible","CI/CD pipelines","Infrastructure as Code","Container orchestration","Cloud migration","Scalable infrastructure","Load balancing","Auto-scaling",
  "Agile methodologies","Scrum","Kanban","Test-driven development","Behavior-driven development","Code review","Pair programming","Clean code","SOLID principles","Design patterns","Software architecture","System design","Performance optimization","Security best practices",
  "Unit testing","Integration testing","End-to-end testing","Jest","Cypress","Selenium","Test automation","Quality assurance","Bug tracking","Performance testing",
  "Machine Learning","Artificial Intelligence","Data Science","Big Data","Data Analytics","TensorFlow","PyTorch","Pandas","NumPy","Apache Spark","Hadoop","ETL processes",
  "React Native","Flutter","iOS development","Android development","Swift","Kotlin","Cross-platform development","Mobile UI/UX","App Store optimization",
  "Cross-functional collaboration","Team leadership","Project management","Mentoring","Technical documentation","Stakeholder communication","Problem-solving","Critical thinking","Innovation","Adaptability","Time management","Strategic planning",
  "E-commerce solutions","Fintech applications","Healthcare systems","EdTech platforms","SaaS applications","Enterprise software","Startup environment","Digital transformation",
  "Cybersecurity","Application security","OAuth","JWT","Encryption","HTTPS","OWASP","Penetration testing","Security auditing","Compliance standards",
  "Git","GitHub","GitLab","Bitbucket","Version control","Code collaboration","Open source contribution","Technical leadership",
];

export default function ObjectiveStep({ data, onUpdate }: ObjectiveStepProps) {
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedObjectives, setGeneratedObjectives] = useState<string[]>([]);
  const [showGeneratedOptions, setShowGeneratedOptions] = useState(false);
  const [experienceLevel, setExperienceLevel] = useState<
    "entry" | "mid" | "senior" | "executive"
  >("mid");
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
  const [currentSkills, setCurrentSkills] = useState<{
    technical: string[];
    soft: string[];
  }>({ technical: [], soft: [] });
  const [searchKeyword, setSearchKeyword] = useState("");
  const [filteredKeywords, setFilteredKeywords] = useState(
    expandedKeywordSuggestions
  );

  useEffect(() => {
    const loadSkills = () => {
      const savedData = localStorage.getItem("resumeBuilder_data");
      if (savedData) {
        try {
          const resumeData = JSON.parse(savedData);
          setCurrentSkills({
            technical: resumeData.skills?.technical || [],
            soft: resumeData.skills?.soft || [],
          });
        } catch (error) {
          console.error("Failed to parse saved data:", error);
        }
      }
    };

    loadSkills();
    window.addEventListener("storage", loadSkills);
    return () => window.removeEventListener("storage", loadSkills);
  }, []);

  useEffect(() => {
    if (searchKeyword.trim() === "") {
      setFilteredKeywords(expandedKeywordSuggestions);
    } else {
      const filtered = expandedKeywordSuggestions.filter((keyword) =>
        keyword.toLowerCase().includes(searchKeyword.toLowerCase())
      );
      setFilteredKeywords(filtered);
    }
  }, [searchKeyword]);

  const insertKeyword = (keyword: string) => {
    const textarea = document.getElementById(
      "objective"
    ) as HTMLTextAreaElement;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const currentText = data;

    let newText;
    if (start === 0) {
      newText = keyword + (currentText ? " " + currentText : "");
    } else if (start === currentText.length) {
      newText = currentText + (currentText.endsWith(" ") ? "" : " ") + keyword;
    } else {
      const beforeCursor = currentText.substring(0, start);
      const afterCursor = currentText.substring(end);
      const needsSpaceBefore = beforeCursor && !beforeCursor.endsWith(" ");
      const needsSpaceAfter = afterCursor && !afterCursor.startsWith(" ");

      newText =
        beforeCursor +
        (needsSpaceBefore ? " " : "") +
        keyword +
        (needsSpaceAfter ? " " : "") +
        afterCursor;
    }

    onUpdate(newText);

    setTimeout(() => {
      textarea.focus();
      const newPosition = start + keyword.length + (start === 0 ? 0 : 1);
      textarea.setSelectionRange(newPosition, newPosition);
    }, 0);
  };

  const generateAIObjective = async () => {
    setIsGenerating(true);

    const savedData = localStorage.getItem("resumeBuilder_data");
    let technicalSkills: string[] = [];
    let softSkills: string[] = [];

    if (savedData) {
      try {
        const resumeData = JSON.parse(savedData);
        technicalSkills = resumeData.skills?.technical || [];
        softSkills = resumeData.skills?.soft || [];
      } catch (error) {
        console.error("Failed to parse saved data:", error);
      }
    }

    const objectiveSkills = extractSkillsFromText(data);
    technicalSkills = [...new Set([...technicalSkills, ...objectiveSkills])];

    try {
      const allSkills = [...technicalSkills, ...softSkills];
      const requestData = {
        inputType: "objective",
        text: data || "Generate a professional objective for me",
        keywords: allSkills,
        experienceLevel: experienceLevel,
      };

      const response = await fetch(API_ENDPOINTS.REGENERATE, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(requestData),
      });

      if (!response.ok) {
        let errorDetails;
        try { errorDetails = await response.text(); } catch { errorDetails = "Could not read error response"; }
        throw new Error(`HTTP error! status: ${response.status}, details: ${errorDetails}`);
      }

      const result = await response.json();
      const rewrittenText = result.rewrittenText;
      if (!rewrittenText) throw new Error("No rewritten text received from API");

      setGeneratedObjectives([rewrittenText]);
      setShowGeneratedOptions(true);
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Unknown error occurred";
      const errorObjective = `API Error: ${errorMessage}. Please check your backend server and try again.`;
      setGeneratedObjectives([errorObjective]);
      setShowGeneratedOptions(true);
    }

    setIsGenerating(false);
  };

  const extractSkillsFromText = (text: string): string[] => {
    const skills: string[] = [];
    const lowerText = text.toLowerCase();
    expandedKeywordSuggestions.forEach((keyword) => {
      if (lowerText.includes(keyword.toLowerCase())) skills.push(keyword);
    });
    return skills;
  };

  const selectObjective = (objective: string) => {
    onUpdate(objective);
    setShowGeneratedOptions(false);
  };

  const copyToClipboard = async (text: string, index: number) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedIndex(index);
      setTimeout(() => setCopiedIndex(null), 2000);
    } catch (error) {
      console.error("Failed to copy text:", error);
    }
  };

  const regenerateObjectives = () => {
    generateAIObjective();
  };

  const totalSkills = currentSkills.technical.length + currentSkills.soft.length;

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Career Objective</h2>
        <p className="text-gray-600">Write a compelling objective that highlights your career goals and key strengths, or let AI generate one for you.</p>
      </div>

      {totalSkills > 0 && (
        <div className="bg-green-50 border border-green-200 rounded-lg p-4">
          <h3 className="text-sm font-medium text-green-900 mb-2">Skills Available for AI Generation ({totalSkills} total)</h3>
          <div className="flex flex-wrap gap-1">
            {[...currentSkills.technical.slice(0, 8), ...currentSkills.soft.slice(0, 4)].map((skill, index) => (
              <span key={index} className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">{skill}</span>
            ))}
            {totalSkills > 12 && (
              <span className="px-2 py-1 bg-green-200 text-green-700 text-xs rounded-full">+{totalSkills - 12} more</span>
            )}
          </div>
        </div>
      )}

      <div className="bg-gradient-to-r from-purple-50 to-blue-50 border border-purple-200 rounded-lg p-6">
        <div className="flex items-center mb-4">
          <Wand2 className="w-6 h-6 text-purple-600 mr-3" />
          <h3 className="text-lg font-semibold text-purple-900">AI-Powered Objective Generator</h3>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Experience Level</label>
            <select
              value={experienceLevel}
              onChange={(e) => setExperienceLevel(e.target.value as "entry" | "mid" | "senior" | "executive")}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            >
              <option value="entry">Entry Level (0-3 years)</option>
              <option value="mid">Mid Level (3-6 years)</option>
              <option value="senior">Senior Level (6-10 years)</option>
              <option value="executive">Executive Level (10+ years)</option>
            </select>
          </div>

          <button
            onClick={generateAIObjective}
            disabled={isGenerating}
            className="w-full py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white font-medium rounded-lg hover:from-purple-700 hover:to-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 flex items-center justify-center space-x-2"
          >
            {isGenerating ? (
              <>
                <RefreshCw className="w-5 h-5 animate-spin" />
                <span>Generating AI Objective...</span>
              </>
            ) : (
              <>
                <Wand2 className="w-5 h-5" />
                <span>Generate AI Objective</span>
              </>
            )}
          </button>

          <p className="text-xs text-gray-600 text-center">
            {totalSkills > 0
              ? `AI will use your ${totalSkills} skills to create personalized objectives`
              : "Add skills in the Skills step or type keywords below for better AI generation"}
          </p>
        </div>
      </div>

      {showGeneratedOptions && generatedObjectives.length > 0 && (
        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Generated Objectives</h3>
            <button onClick={regenerateObjectives} className="text-purple-600 hover:text-purple-700 text-sm font-medium flex items-center space-x-1">
              <RefreshCw className="w-4 h-4" />
              <span>Regenerate</span>
            </button>
          </div>

          <div className="space-y-4 max-h-64 overflow-y-auto pr-1">
            {generatedObjectives.map((objective, index) => (
              <div key={index} className="border border-gray-200 rounded-lg p-4 hover:border-purple-300 transition-colors break-words">
                <p className="text-gray-700 leading-relaxed mb-3 break-words">{objective}</p>
                <div className="flex items-center space-x-2">
                  <button onClick={() => selectObjective(objective)} className="px-4 py-2 bg-purple-600 text-white text-sm rounded-lg hover:bg-purple-700 transition-colors">
                    Use This Objective
                  </button>
                  <button onClick={() => copyToClipboard(objective, index)} className="px-3 py-2 text-gray-600 hover:text-gray-800 text-sm border border-gray-300 rounded-lg hover:border-gray-400 transition-colors flex items-center space-x-1">
                    {copiedIndex === index ? (
                      <>
                        <Check className="w-4 h-4 text-green-600" />
                        <span className="text-green-600">Copied!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-4 h-4" />
                        <span>Copy</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Professional Objective *</label>
          <textarea
            id="objective"
            value={data}
            onChange={(e) => onUpdate(e.target.value)}
            rows={6}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors resize-none"
            placeholder="Experienced software developer with 5+ years in full-stack development, seeking to leverage expertise in React, Node.js, and cloud technologies to contribute to innovative projects at a forward-thinking tech company..."
          />
          <div className="flex items-center justify-between mt-1">
            <div className="text-sm text-gray-500">{data.length}/500 characters</div>
            <div className="text-xs text-gray-400">Minimum 50 characters recommended</div>
          </div>
        </div>

        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <div className="flex items-center mb-3">
            <Lightbulb className="w-5 h-5 text-blue-600 mr-2" />
            <h3 className="text-sm font-medium text-blue-900">ATS Optimization Tips</h3>
          </div>
          <ul className="text-sm text-blue-800 space-y-1">
            <li>• Include 3-5 relevant technical keywords</li>
            <li>• Quantify your experience (years, projects, team size)</li>
            <li>• Mention specific technologies you'll use</li>
            <li>• Keep it concise (2-3 sentences)</li>
            <li>• Use action words and industry terminology</li>
          </ul>
        </div>

        <div>
          <button
            type="button"
            onClick={() => setShowSuggestions(!showSuggestions)}
            className="flex items-center text-sm text-blue-600 hover:text-blue-700 font-medium"
          >
            <Lightbulb className="w-4 h-4 mr-1" />
            {showSuggestions ? "Hide" : "Show"} Keyword Library ({expandedKeywordSuggestions.length} keywords)
          </button>

          {showSuggestions && (
            <div className="mt-4 space-y-3">
              <div className="flex items-center space-x-2">
                <input
                  type="text"
                  value={searchKeyword}
                  onChange={(e) => setSearchKeyword(e.target.value)}
                  placeholder="Search keywords (e.g., React, Python, AWS...)"
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                />
                <span className="text-sm text-gray-500">{filteredKeywords.length} found</span>
              </div>

              <div className="max-h-64 overflow-y-auto border border-gray-200 rounded-lg p-3">
                <div className="flex flex-wrap gap-2">
                  {filteredKeywords.map((keyword) => (
                    <button
                      key={keyword}
                      onClick={() => insertKeyword(keyword)}
                      className="px-3 py-1 bg-gray-100 hover:bg-blue-100 text-gray-700 hover:text-blue-700 text-sm rounded-full transition-colors border border-transparent hover:border-blue-300"
                    >
                      <Plus className="w-3 h-3 inline mr-1" />
                      {keyword}
                    </button>
                  ))}
                </div>

                {filteredKeywords.length === 0 && (
                  <p className="text-gray-500 text-sm text-center py-4">No keywords found matching "{searchKeyword}"</p>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}


