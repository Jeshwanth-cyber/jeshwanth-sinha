export interface PortfolioProfile {
  name: string;
  role: string;
  degree: string;
  department: string;
  year: string;
  status: string;
  bio: string;
  githubUrl: string;
  linkedinUrl: string;
  email: string;
}

export interface SkillItem {
  name: string;
  level: 'Beginner' | 'Intermediate' | 'Learning';
  description: string;
  iconName: string;
}

export interface SkillCategory {
  title: string;
  description: string;
  skills: SkillItem[];
}

export interface ProjectItem {
  id: string;
  title: string;
  subtitle: string;
  category: 'Python & Logic' | 'Web Development' | 'Generative AI';
  description: string;
  problemSolved: string;
  features: string[];
  techStack: string[];
  githubUrl: string;
  isInteractive: boolean;
}

export interface SubjectGrade {
  id: string;
  name: string;
  marks: number;
  credits: number;
}
