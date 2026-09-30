export const ABOUT_TEXT =
  "Hello! I'm Akhilesh, a Computer Science & Engineering student based in Punjab, India. I specialize in front-end web engineering, core Object-Oriented Programming (OOP) in Java, and foundational data structures. My GitHub profile serves as a central hub for my academic coursework, exam preparation materials, and modern web application projects.";

export interface DecoImage {
  src: string;
  className: string;
  delay: number;
  x: number;
}

const BASE =
  'https://shrug-person-78902957.figma.site/_components/v2/ebb2b8f25d8e24d5f0a5ca8af4c950de81aa2fd7';

export const ABOUT_DECORATIONS: DecoImage[] = [
  {
    src: `${BASE}/moon_icon.11395d36.png`,
    className:
      'w-[70px] sm:w-[160px] md:w-[210px] top-[3%] left-[1%] sm:left-[2%] md:left-[4%]',
    delay: 0.1,
    x: -80,
  },
  {
    src: `${BASE}/p59_1.4659672e.png`,
    className:
      'w-[70px] sm:w-[140px] md:w-[180px] bottom-[14%] left-[3%] sm:left-[6%] md:left-[10%]',
    delay: 0.25,
    x: -80,
  },
  {
    src: `${BASE}/lego_icon-1.703bb594.png`,
    className:
      'w-[70px] sm:w-[160px] md:w-[210px] top-[3%] right-[1%] sm:right-[2%] md:right-[4%]',
    delay: 0.15,
    x: 80,
  },
  {
    src: `${BASE}/Group_134-1.2e04f3ce.png`,
    className:
      'w-[70px] sm:w-[170px] md:w-[220px] bottom-[4%] right-[3%] sm:right-[6%] md:right-[10%]',
    delay: 0.3,
    x: 80,
  },
];

export interface AboutDetail {
  icon: 'GraduationCap' | 'MapPin' | 'Code2' | 'Wrench' | 'Target';
  label: string;
  value: string;
}

export const ABOUT_DETAILS: AboutDetail[] = [
  {
    icon: 'GraduationCap',
    label: 'Education',
    value: 'B.Tech in Computer Science & Engineering.',
  },
  {
    icon: 'MapPin',
    label: 'Location',
    value: 'Rajpura, Punjab, India.',
  },
  {
    icon: 'Code2',
    label: 'Primary Tech Stack',
    value: 'React.js, JavaScript (ES6+), Java, HTML5, CSS3, Vite, C.',
  },
  {
    icon: 'Wrench',
    label: 'Developer Tooling',
    value: 'Git, GitHub, VS Code, Vercel, Render.',
  },
  {
    icon: 'Target',
    label: 'Goals',
    value:
      'Master modern full-stack architecture and advance core algorithm design.',
  },
];
