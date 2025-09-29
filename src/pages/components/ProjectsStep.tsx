import { useState } from "react";
import { Plus, Trash2, Code, Wand2, RefreshCw, Search } from "lucide-react";
import { Project } from "../types/resume";
import { API_ENDPOINTS } from '@/config/apiConfig';

interface ProjectsStepProps {
  data: Project[];
  onUpdate: (data: Project[]) => void;
}

// 200+ Technology Keywords organized by categories
const technologyKeywords = {
  "Frontend Frameworks & Libraries": [
    "React","Vue.js","Angular","Svelte","Next.js","Nuxt.js","Gatsby","Remix","Solid.js","Preact","Alpine.js","Lit","Stencil","Ember.js","Backbone.js","jQuery","D3.js","Three.js","Chart.js","Recharts","Material-UI","Ant Design","Chakra UI","React Bootstrap","Semantic UI","Bulma","Foundation",
  ],
  "Backend Frameworks & Runtime": [
    "Node.js","Express.js","Koa.js","Fastify","NestJS","Django","Flask","FastAPI","Spring Boot","Spring Framework","ASP.NET Core","Laravel","Symfony","CodeIgniter","Ruby on Rails","Sinatra","Phoenix","Gin","Echo","Fiber","Actix","Rocket","Axum","Warp",
  ],
  "Programming Languages": [
    "JavaScript","TypeScript","Python","Java","C#","C++","C","Go","Rust","PHP","Ruby","Swift","Kotlin","Scala","Clojure","Elixir","Erlang","Haskell","F#","OCaml","Dart","R","MATLAB","Perl","Lua","Julia","Assembly","COBOL","Fortran","Ada","Prolog","Lisp","Scheme",
  ],
  "Mobile Development": [
    "React Native","Flutter","Ionic","Xamarin","Cordova","PhoneGap","Swift","SwiftUI","Objective-C","Kotlin","Java Android","Unity","Unreal Engine","Cocos2d","Corona SDK","Titanium","NativeScript","Expo","Capacitor",
  ],
  Databases: [
    "MongoDB","PostgreSQL","MySQL","SQLite","Redis","Elasticsearch","DynamoDB","Cassandra","CouchDB","Neo4j","InfluxDB","TimescaleDB","Oracle","SQL Server","MariaDB","Firebase Firestore","Supabase","PlanetScale","FaunaDB","ArangoDB","RethinkDB","Amazon RDS","Google Cloud SQL","Azure SQL","Snowflake","BigQuery","Redshift",
  ],
  "Cloud Platforms & Services": [
    "AWS","Azure","Google Cloud Platform","Heroku","Vercel","Netlify","DigitalOcean","Linode","Vultr","Railway","Render","Fly.io","PlanetScale","Supabase","Firebase","Cloudflare","Fastly","KeyCDN","Amazon S3","CloudFront","Lambda","EC2","ECS","EKS","RDS","Azure Functions","App Service","Cosmos DB","Google App Engine","Cloud Functions","Cloud Run","Kubernetes Engine",
  ],
  "DevOps & Infrastructure": [
    "Docker","Kubernetes","Jenkins","GitLab CI","GitHub Actions","CircleCI","Travis CI","Azure DevOps","TeamCity","Bamboo","Terraform","Ansible","Puppet","Chef","Vagrant","Packer","Consul","Vault","Nomad","Prometheus","Grafana","ELK Stack","Splunk","New Relic","Datadog","Nginx","Apache","HAProxy","Traefik","Istio","Linkerd",
  ],
  "Testing Frameworks": [
    "Jest","Mocha","Jasmine","Karma","Cypress","Playwright","Selenium","WebDriver","Puppeteer","TestCafe","Protractor","JUnit","TestNG","Mockito","PyTest","unittest","RSpec","Capybara","PHPUnit","XCTest","Espresso","Detox","Appium","Robot Framework",
  ],
  "CSS & Styling": [
    "CSS3","SASS","SCSS","LESS","Stylus","PostCSS","Tailwind CSS","Bootstrap","Foundation","Bulma","Materialize","Semantic UI","Styled Components","Emotion","CSS Modules","CSS-in-JS","Stitches","Vanilla Extract","Linaria","JSS",
  ],
  "Build Tools & Bundlers": [
    "Webpack","Vite","Rollup","Parcel","esbuild","SWC","Babel","Gulp","Grunt","Browserify","Snowpack","Turbopack","Rome","ESLint","Prettier","Husky","lint-staged","Commitizen",
  ],
  "Version Control & Collaboration": [
    "Git","GitHub","GitLab","Bitbucket","Azure Repos","Mercurial","SVN","Perforce","Bazaar","Fossil","Jira","Confluence","Slack","Discord","Microsoft Teams","Notion","Linear","Asana","Trello","Monday.com",
  ],
  "Data Science & ML": [
    "TensorFlow","PyTorch","Keras","Scikit-learn","Pandas","NumPy","Matplotlib","Seaborn","Plotly","Jupyter","Apache Spark","Hadoop","Kafka","Airflow","MLflow","Kubeflow","DVC","Weights & Biases","OpenCV","NLTK","spaCy","Hugging Face","LangChain","OpenAI API",
  ],
  "Game Development": [
    "Unity","Unreal Engine","Godot","GameMaker Studio","Construct","Phaser","PixiJS","Babylon.js","A-Frame","PlayCanvas","Cocos2d","LibGDX","MonoGame","LÖVE","Defold","Solar2D",
  ],
  "Blockchain & Web3": [
    "Ethereum","Solidity","Web3.js","Ethers.js","Hardhat","Truffle","Ganache","MetaMask","IPFS","Bitcoin","Hyperledger","Chainlink","Polygon","Binance Smart Chain","Avalanche","Solana","Cardano",
  ],
  "CMS & E-commerce": [
    "WordPress","Drupal","Joomla","Strapi","Contentful","Sanity","Ghost","Shopify","WooCommerce","Magento","PrestaShop","OpenCart","BigCommerce","Squarespace","Webflow","Wix",
  ],
  "API & Integration": [
    "REST API","GraphQL","gRPC","WebSockets","Socket.io","SignalR","Apollo GraphQL","Relay","Prisma","Hasura","PostgREST","Supabase","Firebase","Auth0","Okta","Stripe","PayPal","Twilio","SendGrid",
  ],
  "Desktop Development": [
    "Electron","Tauri","Qt","GTK","WPF","WinUI","JavaFX","Swing","Tkinter","PyQt","Kivy","Flutter Desktop","React Native Windows",".NET MAUI","Avalonia",
  ],
};

// Flatten all keywords for search
const allTechnologyKeywords = Object.values(technologyKeywords).flat();

export default function ProjectsStep({ data, onUpdate }: ProjectsStepProps) {
  const [expandedId, setExpandedId] = useState<string | null>(data[0]?.id || null);
  const [aiGeneratingFor, setAiGeneratingFor] = useState<string | null>(null);
  const [showTechSuggestions, setShowTechSuggestions] = useState<{ [key: string]: boolean; }>({});
  const [techSearchTerm, setTechSearchTerm] = useState<{ [key: string]: string; }>({});

  const addProject = () => {
    const newProject: Project = { id: Date.now().toString(), name: "", description: "", technologies: [], link: "", highlights: [""] };
    onUpdate([...data, newProject]);
    setExpandedId(newProject.id);
  };

  const updateProject = (id: string, updates: Partial<Project>) => {
    onUpdate(data.map((project) => (project.id === id ? { ...project, ...updates } : project)));
  };

  const removeProject = (id: string) => {
    onUpdate(data.filter((project) => project.id !== id));
    if (expandedId === id) setExpandedId(data.find((project) => project.id !== id)?.id || null);
  };

  const updateTechnologies = (id: string, tech: string) => {
    const techArray = tech.split(",").map((t) => t.trim()).filter((t) => t);
    updateProject(id, { technologies: techArray });
  };

  const addTechnology = (projectId: string, tech: string) => {
    const project = data.find((p) => p.id === projectId);
    if (project && !project.technologies.includes(tech)) {
      updateProject(projectId, { technologies: [...project.technologies, tech] });
    }
  };

  const addHighlight = (projectId: string) => {
    const project = data.find((p) => p.id === projectId);
    if (project) updateProject(projectId, { highlights: [...project.highlights, ""] });
  };

  const updateHighlight = (projectId: string, index: number, value: string) => {
    const project = data.find((p) => p.id === projectId);
    if (project) {
      const newHighlights = [...project.highlights];
      newHighlights[index] = value;
      updateProject(projectId, { highlights: newHighlights });
    }
  };

  const removeHighlight = (projectId: string, index: number) => {
    const project = data.find((p) => p.id === projectId);
    if (project && project.highlights.length > 1) {
      const newHighlights = project.highlights.filter((_, i) => i !== index);
      updateProject(projectId, { highlights: newHighlights });
    }
  };

  const generateAIDescription = async (projectId: string) => {
    const project = data.find((p) => p.id === projectId);
    if (!project || !project.name) { alert("Please fill in the project name first to generate AI description."); return; }
    setAiGeneratingFor(`${projectId}-description`);
    try {
      let technicalSkills: string[] = []; let softSkills: string[] = [];
      try { const savedData = localStorage.getItem("resumeBuilder_data"); if (savedData) { const resumeData = JSON.parse(savedData); technicalSkills = resumeData.skills?.technical || []; softSkills = resumeData.skills?.soft || []; } } catch {}
      const allSkills = [...technicalSkills, ...softSkills];
      const contextText = `${project.name}. Technologies: ${project.technologies.join(", ")}. ${project.description || "New project"}`;
      const requestData = { inputType: "project_description", text: contextText, keywords: [...allSkills, ...project.technologies], experienceLevel: "mid" };
      const response = await fetch(API_ENDPOINTS.REGENERATE, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(requestData) });
      if (!response.ok) { let errorDetails; try { errorDetails = await response.text(); } catch { errorDetails = "Could not read error response"; } throw new Error(`HTTP error! status: ${response.status}, details: ${errorDetails}`); }
      const result = await response.json();
      const description = result.rewrittenText; if (!description) throw new Error("No description received from API");
      updateProject(projectId, { description: description.trim() });
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Unknown error occurred";
      alert(`API Error: ${errorMessage}. Please check your backend server and try again.`);
    }
    setAiGeneratingFor(null);
  };

  const generateAIHighlights = async (projectId: string) => {
    const project = data.find((p) => p.id === projectId);
    if (!project || !project.name) { alert("Please fill in the project name first to generate AI highlights."); return; }
    setAiGeneratingFor(`${projectId}-highlights`);
    try {
      let technicalSkills: string[] = []; let softSkills: string[] = [];
      try { const savedData = localStorage.getItem("resumeBuilder_data"); if (savedData) { const resumeData = JSON.parse(savedData); technicalSkills = resumeData.skills?.technical || []; softSkills = resumeData.skills?.soft || []; } } catch {}
      const allSkills = [...technicalSkills, ...softSkills];
      const contextText = `Project: ${project.name}. Description: ${project.description || "No description provided"}. Technologies used: ${project.technologies.join(", ") || "No technologies specified"}. Current highlights: ${project.highlights.filter((h) => h.trim()).join("; ")}`;
      const requestData = { inputType: "project_highlights", text: contextText, keywords: [...allSkills, ...project.technologies], experienceLevel: "mid" };
      const response = await fetch(API_ENDPOINTS.REGENERATE, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(requestData) });
      if (!response.ok) { let errorDetails; try { errorDetails = await response.text(); } catch { errorDetails = "Could not read error response"; } throw new Error(`HTTP error! status: ${response.status}, details: ${errorDetails}`); }
      const result = await response.json();
      const highlightsText = result.rewrittenText; if (!highlightsText) throw new Error("No highlights received from API");
      const highlights = highlightsText.split(/•|\n/).map((item: string) => item.trim()).filter((item: string) => item.length > 10).slice(0, 4);
      const finalHighlights = highlights.length > 0 ? highlights : [highlightsText.trim()];
      updateProject(projectId, { highlights: finalHighlights });
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Unknown error occurred";
      alert(`API Error: ${errorMessage}. Please check your backend server and try again.`);
    }
    setAiGeneratingFor(null);
  };

  const enhanceExistingHighlight = async (projectId: string, highlightIndex: number) => {
    const project = data.find((p) => p.id === projectId);
    if (!project || !project.highlights[highlightIndex]?.trim()) { alert("Please write something first, then I can help make it more professional."); return; }
    const originalText = project.highlights[highlightIndex];
    setAiGeneratingFor(`${projectId}-highlight-${highlightIndex}`);
    try {
      let technicalSkills: string[] = [];
      try { const savedData = localStorage.getItem("resumeBuilder_data"); if (savedData) { const resumeData = JSON.parse(savedData); technicalSkills = resumeData.skills?.technical || []; } } catch {}
      const allSkills = [...technicalSkills, ...project.technologies];
      const requestData = { inputType: "project_highlights", text: `${originalText} (Project: ${project.name}, Technologies: ${project.technologies.join(", ")})`, keywords: allSkills, experienceLevel: "mid" };
      const response = await fetch(API_ENDPOINTS.REGENERATE, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(requestData) });
      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
      const result = await response.json();
      const enhancedText = result.rewrittenText;
      if (enhancedText) {
        const firstHighlight = enhancedText.split(/•|\n/).map((item: string) => item.trim()).filter((item: string) => item.length > 10)[0];
        updateHighlight(projectId, highlightIndex, (firstHighlight || enhancedText).trim());
      }
    } catch (error) {
      alert("Failed to enhance highlight. Please try again.");
    }
    setAiGeneratingFor(null);
  };

  const getFilteredTechnologies = (projectId: string) => {
    const searchTerm = techSearchTerm[projectId] || "";
    if (!searchTerm) return allTechnologyKeywords.slice(0, 50);
    return allTechnologyKeywords.filter((tech) => tech.toLowerCase().includes(searchTerm.toLowerCase()));
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Projects</h2>
        <p className="text-gray-600">Showcase your key projects with AI-generated descriptions and professional highlights.</p>
      </div>

      <div className="space-y-4">
        {data.map((project) => (
          <div key={project.id} className="border border-gray-200 rounded-lg overflow-hidden">
            <div className="bg-gray-50 px-4 py-3 cursor-pointer hover:bg-gray-100 transition-colors" onClick={() => setExpandedId(expandedId === project.id ? null : project.id)}>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <Code className="w-5 h-5 text-gray-500" />
                  <div>
                    <h3 className="font-medium text-gray-900">{project.name || "New Project"}</h3>
                    <p className="text-sm text-gray-500">{project.technologies.slice(0, 3).join(", ")}{project.technologies.length > 3 && ` +${project.technologies.length - 3} more`}</p>
                  </div>
                </div>
                <button onClick={(e) => { e.stopPropagation(); removeProject(project.id); }} className="text-red-500 hover:text-red-700 p-1">
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>

            {expandedId === project.id && (
              <div className="p-4 space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Project Name *</label>
                    <input type="text" value={project.name} onChange={(e) => updateProject(project.id, { name: e.target.value })} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" placeholder="E-commerce Platform" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Project Link (Optional)</label>
                    <input type="url" value={project.link || ""} onChange={(e) => updateProject(project.id, { link: e.target.value })} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" placeholder="https://github.com/username/project" />
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-2">
                    <label className="block text-sm font-medium text-gray-700">Description *</label>
                    <button onClick={() => generateAIDescription(project.id)} disabled={aiGeneratingFor === `${project.id}-description` || !project.name} className="px-3 py-1 bg-gradient-to-r from-purple-600 to-blue-600 text-white text-sm rounded-lg hover:from-purple-700 hover:to-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 flex items-center space-x-1">
                      {aiGeneratingFor === `${project.id}-description` ? (<><RefreshCw className="w-3 h-3 animate-spin" /><span>Generating...</span></>) : (<><Wand2 className="w-3 h-3" /><span>AI Generate</span></>)}
                    </button>
                  </div>
                  <textarea value={project.description} onChange={(e) => updateProject(project.id, { description: e.target.value })} rows={3} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none" placeholder="A full-stack e-commerce platform built with React and Node.js..." />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Technologies Used *</label>
                  {project.technologies.length > 0 && (
                    <div className="flex flex-wrap gap-2 mb-3">
                      {project.technologies.map((tech, index) => (
                        <span key={index} className="inline-flex items-center px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full">
                          {tech}
                          <button onClick={() => { const newTechs = project.technologies.filter((_, i) => i !== index); updateProject(project.id, { technologies: newTechs }); }} className="ml-2 text-blue-600 hover:text-blue-800">×</button>
                        </span>
                      ))}
                    </div>
                  )}
                  <div className="space-y-2">
                    <input type="text" value={project.technologies.join(", ")} onChange={(e) => updateTechnologies(project.id, e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" placeholder="React, Node.js, MongoDB, Express.js" />
                    <div className="flex items-center justify-between">
                      <div className="text-sm text-gray-500">Separate technologies with commas</div>
                      <button onClick={() => setShowTechSuggestions((prev) => ({ ...prev, [project.id]: !prev[project.id], }))} className="text-sm text-blue-600 hover:text-blue-700 font-medium flex items-center space-x-1">
                        <Search className="w-3 h-3" />
                        <span>{showTechSuggestions[project.id] ? "Hide" : "Browse"} 200+ Technologies</span>
                      </button>
                    </div>
      {showTechSuggestions[project.id] && (
                      <div className="border border-gray-200 rounded-lg p-4 bg-gray-50">
                        <div className="mb-3">
                          <input type="text" value={techSearchTerm[project.id] || ""} onChange={(e) => setTechSearchTerm((prev) => ({ ...prev, [project.id]: e.target.value, }))} placeholder="Search technologies (e.g., React, Python, AWS...)" className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm" />
                        </div>
                        <div className="max-h-64 overflow-y-auto pr-1">
                          {/* In a full copy, iterate categories like the source project */}
                          {getFilteredTechnologies(project.id).map((tech) => (
                            <button key={tech} onClick={() => addTechnology(project.id, tech)} disabled={project.technologies.includes(tech)} className={`px-2 py-1 m-1 text-xs rounded-full transition-colors ${project.technologies.includes(tech) ? "bg-green-100 text-green-700 cursor-not-allowed" : "bg-white hover:bg-blue-50 text-gray-700 hover:text-blue-700 border border-gray-300 hover:border-blue-300"}`}>
                              {project.technologies.includes(tech) ? "✓ " : "+ "}{tech}
                            </button>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-2">
                    <label className="block text-sm font-medium text-gray-700">Key Highlights</label>
                    <div className="flex items-center space-x-2">
                      <button onClick={() => generateAIHighlights(project.id)} disabled={aiGeneratingFor === `${project.id}-highlights` || !project.name} className="px-3 py-1 bg-gradient-to-r from-purple-600 to-blue-600 text-white text-sm rounded-lg hover:from-purple-700 hover:to-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 flex items-center space-x-1">
                        {aiGeneratingFor === `${project.id}-highlights` ? (<><RefreshCw className="w-3 h-3 animate-spin" /><span>Generating...</span></>) : (<><Wand2 className="w-3 h-3" /><span>AI Generate</span></>)}
                      </button>
                      <button onClick={() => addHighlight(project.id)} className="text-sm text-blue-600 hover:text-blue-700 font-medium">Add Highlight</button>
                    </div>
                  </div>
                  <div className="space-y-2">
                    {project.highlights.map((highlight, index) => (
                      <div key={index} className="flex items-start space-x-2 break-words">
                        <span className="text-gray-400 mt-3">•</span>
                        <div className="flex-1">
                          <textarea value={highlight} onChange={(e) => updateHighlight(project.id, index, e.target.value)} rows={2} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none break-words" placeholder="Implemented responsive design that improved mobile user engagement by 35%" />
                          {highlight.trim() && (
                            <button onClick={() => enhanceExistingHighlight(project.id, index)} disabled={aiGeneratingFor === `${project.id}-highlight-${index}`} className="mt-1 text-xs text-purple-600 hover:text-purple-700 font-medium flex items-center space-x-1">
                              {aiGeneratingFor === `${project.id}-highlight-${index}` ? (<><RefreshCw className="w-3 h-3 animate-spin" /><span>Enhancing...</span></>) : (<><Wand2 className="w-3 h-3" /><span>Make Professional</span></>)}
                            </button>
                          )}
                        </div>
                        {project.highlights.length > 1 && (
                          <button onClick={() => removeHighlight(project.id, index)} className="text-red-500 hover:text-red-700 p-1 mt-1">
                            <Trash2 className="w-4 h-4" />
                          </button>
                        )}
                      </div>
                    ))}
                  </div>
                  <div className="mt-2 text-xs text-gray-500">💡 <strong>Pro Tips:</strong> Use quantifiable achievements (e.g., "Improved performance by 40%", "Reduced load time by 2 seconds"), and let AI help make your descriptions more professional!</div>
                </div>
              </div>
            )}
          </div>
        ))}

        <button onClick={addProject} className="w-full py-3 border-2 border-dashed border-gray-300 rounded-lg text-gray-600 hover:border-blue-400 hover:text-blue-600 transition-colors flex items-center justify-center space-x-2">
          <Plus className="w-5 h-5" />
          <span>Add Project</span>
        </button>
      </div>
    </div>
  );
}


