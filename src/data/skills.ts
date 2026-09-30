export interface Skill {
  name: string;
  label: string;
  iconSlug: string;
  invert?: boolean;
}

export const SKILLS: Skill[] = [
  { name: 'html', label: 'HTML', iconSlug: 'html5' },
  { name: 'css', label: 'CSS', iconSlug: 'css3' },
  { name: 'javascript', label: 'JavaScript', iconSlug: 'javascript' },
  { name: 'react', label: 'React', iconSlug: 'react' },
  { name: 'c', label: 'C', iconSlug: 'c' },
  { name: 'python', label: 'Python', iconSlug: 'python' },
  { name: 'java', label: 'Java', iconSlug: 'java' },
  { name: 'mysql', label: 'MySQL', iconSlug: 'mysql' },
  { name: 'git', label: 'Git', iconSlug: 'git' },
  { name: 'github', label: 'GitHub', iconSlug: 'github', invert: true },
  { name: 'vercel', label: 'Vercel', iconSlug: 'vercel', invert: true },
  { name: 'vite', label: 'Vite', iconSlug: 'vite' },
  { name: 'vscode', label: 'VS Code', iconSlug: 'vscode' },
];

export const deviconUrl = (slug: string) =>
  `https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/${slug}/${slug}-original.svg`;
