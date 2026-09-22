import { PortfolioProfile, SkillCategory, ProjectItem } from '../types';

export const initialProfile: PortfolioProfile = {
  name: 'Jeshwanth Sinha',
  role: 'Aspiring AI Engineer',
  degree: 'B.Tech in Computer Science and Engineering',
  department: 'Department of Computer Science & Engineering',
  year: '1st Year Undergraduate',
  status: 'Actively exploring Python, Full-Stack Basics & Generative AI',
  bio: 'Driven first-year Computer Science Engineering student passionate about Artificial Intelligence and software craft. Currently building foundational engineering depth across algorithmic problem solving in Python, modern web development, and foundational Generative AI applications.',
  githubUrl: 'https://github.com/Jeshwanth-cyber',
  linkedinUrl: 'https://www.linkedin.com/in/jeshwanth-sinha-undefined-1ba9a1420/?isSelfProfile=true',
  email: 'jeshwanth.sinha@example.edu',
};

export const skillCategories: SkillCategory[] = [
  {
    title: 'Programming Foundations',
    description: 'Core logic, data structures, and algorithmic development',
    skills: [
      {
        name: 'Python (Basic)',
        level: 'Intermediate',
        description: 'Syntax, data structures (lists, dicts, tuples), loops, functions, file handling, and OOP basics.',
        iconName: 'Terminal',
      },
      {
        name: 'Problem Solving',
        level: 'Beginner',
        description: 'Mathematical reasoning, conditional logic algorithms, and control flow optimization.',
        iconName: 'Cpu',
      },
      {
        name: 'Object-Oriented Basics',
        level: 'Beginner',
        description: 'Class architecture, methods, modularization, and clean code principles.',
        iconName: 'Boxes',
      },
    ],
  },
  {
    title: 'Web Development Basics',
    description: 'Crafting responsive user interfaces and interactive web experiences',
    skills: [
      {
        name: 'HTML5 & Semantic Markup',
        level: 'Intermediate',
        description: 'Modern document structuring, accessibility standards, and semantic layout tags.',
        iconName: 'Layout',
      },
      {
        name: 'CSS3 & Tailwind CSS',
        level: 'Intermediate',
        description: 'Flexbox, Grid systems, responsive breakpoints, animations, and clean styling.',
        iconName: 'Palette',
      },
      {
        name: 'JavaScript (ES6+)',
        level: 'Beginner',
        description: 'DOM manipulation, event listeners, async basics, array methods, and dynamic state.',
        iconName: 'Code2',
      },
    ],
  },
  {
    title: 'Generative AI & Modern Tools',
    description: 'Harnessing frontier LLMs and developer workflow tooling',
    skills: [
      {
        name: 'Basic Generative AI',
        level: 'Learning',
        description: 'Understanding LLM architectures, prompt engineering patterns, tokens, and multimodal concepts.',
        iconName: 'Sparkles',
      },
      {
        name: 'Google AI Studio & APIs',
        level: 'Learning',
        description: 'Experimenting with Gemini models, system instructions, temperature settings, and API calls.',
        iconName: 'Bot',
      },
      {
        name: 'Git & GitHub',
        level: 'Beginner',
        description: 'Version control, repositories, committing, branching, and open-source collaboration.',
        iconName: 'GitBranch',
      },
    ],
  },
];

export const projectsList: ProjectItem[] = [
  {
    id: 'grade-calculator',
    title: 'Student Grade & CGPA Calculator',
    subtitle: 'Academic Performance Analytics & Credit-Weighted Grading Engine',
    category: 'Python & Logic',
    description: 'An interactive evaluation system designed for college students to calculate subject-wise percentage, semester SGPA/CGPA, letter grades, and performance feedback based on credit weights.',
    problemSolved: 'Eliminates manual calculation errors in college credit weighting and helps students quickly understand their academic standing.',
    features: [
      'Multi-subject dynamic row addition with credit weighting',
      'Real-time cumulative GPA and percentage computation',
      'Instant Letter Grade classification (A+, A, B+, B, C, F)',
      'Academic status breakdown with performance advice',
    ],
    techStack: ['Python Core Logic', 'JavaScript', 'Tailwind CSS', 'Responsive UI'],
    githubUrl: 'https://github.com/jeshwanth-sinha/student-grade-calculator',
    isInteractive: true,
  },
  {
    id: 'voting-calculator',
    title: 'Eligibility Calculator for Voting Systems',
    subtitle: 'Civic Duty Verification & Age Milestone Assessment Platform',
    category: 'Python & Logic',
    description: 'A rule-based legal eligibility verification engine checking citizenship, age threshold (18+), residency requirements, and election milestone countdown for first-time student voters.',
    problemSolved: 'Clarifies voter eligibility rules for first-time college voters, preventing disqualification and fostering civic engagement.',
    features: [
      'Exact age calculation down to years, months, and days',
      'Threshold validator for constitutional 18+ eligibility rule',
      'Step-by-step checklist of required identification documents',
      'Next election countdown and voter awareness guidance',
    ],
    techStack: ['Python Logic Architecture', 'Modern Web DOM', 'Tailwind CSS'],
    githubUrl: 'https://github.com/jeshwanth-sinha/voting-eligibility-calculator',
    isInteractive: true,
  },
];

export function generateStructuredPrompt(profile: PortfolioProfile = initialProfile): string {
  return `Act as a senior frontend engineer and UI/UX designer. Build a modern, high-performance, responsive personal portfolio web application for me using React, TypeScript, Tailwind CSS, and Lucide icons.

Here are my exact details:
1. PERSONAL PROFILE:
- Name: ${profile.name}
- Current Academic Standing: ${profile.year} in ${profile.degree} (${profile.department})
- Target Career Focus: ${profile.role}
- About Me: Enthusiastic first-year engineering student building deep technical foundations in programming, modern web technologies, and generative artificial intelligence. Eager to solve real-world problems through clean code and intelligent systems.

2. TECHNICAL SKILLS:
- Programming Languages: Basic Python (Core Syntax, Loops, Data Structures: Lists/Dictionaries, Basic OOP, Problem Solving)
- Web Development: Basic Web Development (HTML5 semantic markup, CSS3 styling, Responsive Design with Tailwind CSS, Basic JavaScript DOM manipulation)
- Emerging Tech & AI: Basic Generative AI (Prompt Engineering concepts, Exploring Google AI Studio & Gemini API basics, LLM fundamentals)
- Developer Tools: Git, GitHub, VS Code, Google Colab

3. FEATURED PROJECTS (Include live interactive demos for both):
A) "Student Grade Calculator":
   - An academic grading engine where students enter subjects, marks, and credit units.
   - Calculates weighted GPA/SGPA, percentage, letter grades, and actionable academic insights.
   - Includes quick preset loading and dynamic subject addition.
B) "Eligibility Calculator for Voting Systems":
   - A civic validation tool checking age eligibility (18+ threshold), citizenship confirmation, and voter registration readiness.
   - Computes exact days until eligible if under 18, and lists required ID verification documents.

4. SOCIAL & PROFESSIONAL LINKS:
- GitHub: ${profile.githubUrl || '[YOUR_GITHUB_LINK_HERE]'}
- LinkedIn: ${profile.linkedinUrl || '[YOUR_LINKEDIN_LINK_HERE]'}
- Email: ${profile.email || '[YOUR_EMAIL_HERE]'}

5. DESIGN & ARCHITECTURE REQUIREMENTS:
- Sophisticated tech-focused color palette (slate/indigo/cyan accents) with high contrast and dark/light balance.
- Hero section highlighting first-year momentum, clean badge indicators, and quick action buttons.
- Fully interactive in-browser calculators for both projects so visitors can test the code immediately.
- Comprehensive skills matrix with learning progression indicators.
- Clear contact section with social links and an interactive message box.
- Mobile-responsive, accessible, and fast-loading single-page application.`;
}
