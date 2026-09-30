export interface EducationItem {
  degree: string;
  period: string;
  school: string;
  coursework: string;
}

export interface ExperienceItem {
  role: string;
  org: string;
  period: string;
  points: string[];
}

export interface SkillGroup {
  group: string;
  items: string[];
}

export interface ResumeData {
  name: string;
  headline: string;
  org: string;
  quote: string;
  education: EducationItem[];
  experience: ExperienceItem[];
  skills: SkillGroup[];
  highlights: string[];
}

export const RESUME: ResumeData = {
  name: 'Akhilesh',
  headline: 'Computer Science Student & Software Developer',
  org: 'Chitkara University',
  quote:
    'Obsessed with the process. Focused on execution. Turning ideas into clean code & continuous progress.',
  education: [
    {
      degree: 'Bachelor of Engineering in Computer Science & Engineering',
      period: '2023 - 2027',
      school: 'Chitkara University, Punjab, India',
      coursework:
        'Data Structures & Algorithms, Object-Oriented Programming (Java), Database Management Systems (MySQL), Operating Systems, Web Technologies.',
    },
  ],
  experience: [
    {
      role: 'Software & Web Developer (Projects & Open Source)',
      org: 'Independent Developer',
      period: '2024 - Present',
      points: [
        'Engineered DropPortal (dropportal.onrender.com), a web-based file sharing service hosted on Render with dynamic upload processing.',
        'Built Ai-Text-Summarizer (ai-text-summarizer-1.onrender.com) using Python and FastAPI, enabling fast asynchronous text summarization.',
        'Curated Object-Oriented Programming in Java codebase demonstrating SOLID principles, polymorphism, and design patterns.',
        'Maintained public GitHub repositories with version control, clear README documentation, and automated deployment pipelines.',
      ],
    },
    {
      role: 'Undergraduate CS Student & Peer Mentor',
      org: 'Chitkara University',
      period: '2023 - Present',
      points: [
        'Mastered core Computer Science disciplines: Data Structures, Algorithms, Object-Oriented Programming (Java), and MySQL databases.',
        'Collaborated in engineering teams on university project hackathons and development sprints.',
        'Actively practicing problem solving in Java, C, and Python.',
      ],
    },
  ],
  skills: [
    {
      group: 'Programming Languages',
      items: ['Python', 'Java', 'JavaScript (ES6+)', 'C', 'HTML5 & CSS3', 'SQL'],
    },
    {
      group: 'Frameworks & Web',
      items: ['FastAPI', 'React', 'Tailwind CSS', 'Node.js Basics'],
    },
    {
      group: 'Databases & Storage',
      items: ['MySQL', 'MongoDB', 'Firebase'],
    },
    {
      group: 'DevOps & Developer Tooling',
      items: ['Git & GitHub', 'Render', 'Vercel', 'VS Code', 'Postman'],
    },
  ],
  highlights: [
    'Successfully built and deployed live apps (dropportal.onrender.com, ai-text-summarizer-1.onrender.com)',
    'Authored public open-source repositories on GitHub (@AkkhileshCod3s)',
    'Active peer engagement and open-source contributions for Java Object-Oriented Programming and AI Summarizer repositories',
  ],
};
