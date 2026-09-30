import { CATEGORY_OVERRIDES } from '../data/site';

export const CATEGORIES = ['Full Stack', 'AI & Tools', 'Core Engineering', 'Frontend'] as const;
export type Category = (typeof CATEGORIES)[number];

interface RepoLike {
  name: string;
  description: string | null;
  language: string | null;
  homepage: string | null;
  topics?: string[];
}

const FRONTEND_LANGS = ['JavaScript', 'TypeScript', 'HTML', 'CSS'];
const CORE_LANGS = ['Java', 'C', 'C++'];
const AI_HINTS = ['ai', 'ml', 'summariz', 'tool'];
const CORE_HINTS = ['sql', 'dsa', 'oop'];

const matches = (haystack: string, needles: string[]) =>
  needles.some((n) => haystack.includes(n));

export function classifyRepo(repo: RepoLike): Category {
  const override = CATEGORY_OVERRIDES[repo.name.toLowerCase()];
  if (override) return override as Category;

  const topics = (repo.topics ?? []).map((t) => t.toLowerCase());
  if (topics.includes('full-stack') || topics.includes('fullstack')) return 'Full Stack';
  if (topics.includes('ai') || topics.includes('ai-tools') || topics.includes('machine-learning'))
    return 'AI & Tools';
  if (topics.includes('core-engineering')) return 'Core Engineering';
  if (topics.includes('frontend')) return 'Frontend';

  const text = `${repo.name} ${repo.description ?? ''}`.toLowerCase();
  const lang = repo.language ?? '';

  if (matches(text, AI_HINTS) || lang === 'Python') return 'AI & Tools';
  if (matches(text, CORE_HINTS) || CORE_LANGS.includes(lang)) return 'Core Engineering';

  if (repo.homepage) {
    const hasFrontend = FRONTEND_LANGS.includes(lang) || topics.includes('react');
    const backendHint = /api|server|fastapi|node|express|backend|render\.com|onrender\.com/.test(
      `${repo.description ?? ''} ${repo.homepage}`.toLowerCase()
    );
    if (hasFrontend && backendHint) return 'Full Stack';
  }
  if (FRONTEND_LANGS.includes(lang)) return 'Frontend';

  return 'Core Engineering';
}
