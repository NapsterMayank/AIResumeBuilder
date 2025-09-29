// Application constants and keyword suggestions

export const KEYWORD_SUGGESTIONS = {
  technical: [
    // Programming Languages
    "JavaScript",
    "TypeScript",
    "Python",
    "Java",
    "C++",
    "C#",
    "Go",
    "Rust",
    "PHP",
    "Ruby",

    // Frontend Technologies
    "React",
    "Vue.js",
    "Angular",
    "Next.js",
    "Svelte",
    "HTML5",
    "CSS3",
    "SASS",
    "Tailwind CSS",
    "Bootstrap",
    "Material-UI",
    "Responsive design",
    "Progressive Web Apps",
    "Single Page Applications",

    // Backend Technologies
    "Node.js",
    "Express.js",
    "FastAPI",
    "Django",
    "Flask",
    "Spring Boot",
    "ASP.NET",
    "GraphQL",
    "RESTful APIs",
    "Microservices architecture",

    // Databases
    "MySQL",
    "PostgreSQL",
    "MongoDB",
    "Redis",
    "SQLite",
    "Oracle",
    "SQL Server",
    "DynamoDB",
    "Elasticsearch",
    "Database design",
    "Data modeling",
    "Query optimization",

    // Cloud & DevOps
    "AWS",
    "Azure",
    "Google Cloud",
    "Docker",
    "Kubernetes",
    "Jenkins",
    "CI/CD",
    "GitLab CI",
    "GitHub Actions",
    "Terraform",
    "Ansible",
    "Linux",
    "Shell scripting",

    // Tools & Technologies
    "Git",
    "GitHub",
    "GitLab",
    "Jira",
    "Confluence",
    "Postman",
    "VS Code",
    "IntelliJ",
    "Webpack",
    "Vite",
    "ESLint",
    "Jest",
    "Cypress",
    "Selenium",
  ],

  soft: [
    // Leadership & Management
    "Leadership",
    "Team management",
    "Project management",
    "Cross-functional collaboration",
    "Mentoring",
    "Strategic planning",
    "Decision making",
    "Stakeholder management",

    // Communication
    "Communication",
    "Public speaking",
    "Technical writing",
    "Documentation",
    "Presentation skills",
    "Client relations",
    "Negotiation",
    "Conflict resolution",

    // Problem Solving
    "Problem-solving",
    "Critical thinking",
    "Analytical thinking",
    "Innovation",
    "Creativity",
    "Troubleshooting",
    "Debugging",
    "Root cause analysis",

    // Work Style
    "Self-motivated",
    "Detail-oriented",
    "Time management",
    "Multitasking",
    "Adaptability",
    "Fast learner",
    "Independent worker",
    "Team player",
    "Results-driven",
    "Customer-focused",
  ],

  get all() {
    return [...this.technical, ...this.soft];
  },
};

export const EXPERIENCE_LEVELS = [
  { value: "entry-level", label: "Entry Level (0-2 years)" },
  { value: "mid-level", label: "Mid Level (3-5 years)" },
  { value: "senior-level", label: "Senior Level (6-10 years)" },
  { value: "executive", label: "Executive (10+ years)" },
];

export const RESUME_SECTIONS = [
  "personalInfo",
  "objective",
  "experience",
  "education",
  "skills",
  "projects",
  "certifications",
] as const;

export const LOCAL_STORAGE_KEYS = {
  RESUME_DATA: "resumeData",
  RESUME_SKILLS: "resumeSkills",
  AUTH_TOKEN: "authToken",
  USER_PREFERENCES: "userPreferences",
} as const;
