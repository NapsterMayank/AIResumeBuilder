// Resume-related TypeScript interfaces and types

export interface PersonalInfo {
  fullName: string;
  email: string;
  phone: string;
  location: string;
  linkedin?: string;
  github?: string;
  website?: string;
}

export interface Experience {
  id: string;
  jobTitle: string;
  company: string;
  location: string;
  startDate: string;
  endDate: string;
  isCurrentJob: boolean;
  description: string;
}

export interface Education {
  id: string;
  degree: string;
  institution: string;
  location: string;
  startDate: string;
  endDate: string;
  gpa?: string;
  description?: string;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  technologies: string[];
  startDate: string;
  endDate: string;
  link?: string;
  github?: string;
}

export interface Certification {
  id: string;
  name: string;
  issuer: string;
  date: string;
  expiryDate?: string;
  credentialId?: string;
  link?: string;
}

export interface ResumeData {
  personalInfo: PersonalInfo;
  objective: string;
  experience: Experience[];
  education: Education[];
  skills: string[];
  projects: Project[];
  certifications: Certification[];
}

// API-related interfaces
export interface RegenerateRequest {
  text: string;
  type: "objective" | "experience" | "project" | "education";
  context?: {
    skills?: string[];
    industry?: string;
    jobTitle?: string;
  };
}

export interface RegenerateResponse {
  success: boolean;
  data: {
    rewritten_text: string;
    suggestions?: string[];
  };
  message?: string;
  error?: string;
}

export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
}

// Loading and error states
export interface LoadingState {
  isLoading: boolean;
  error: string | null;
}

export interface FormValidationError {
  field: string;
  message: string;
}
