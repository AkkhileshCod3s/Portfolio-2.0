import type { LucideIcon } from 'lucide-react';
import { Github, Linkedin, Instagram } from 'lucide-react';
import RedditIcon from '../components/RedditIcon';

export const GITHUB_USERNAME = 'AkkhileshCod3s';
export const GITHUB_URL = 'https://github.com/AkkhileshCod3s';
export const EMAIL = 'akhileshcode.tech@gmail.com';
export const LOCATION = 'Rajpura, Punjab, India';
export const CAMPUS = 'Chitkara University CSE';

export interface Social {
  label: string;
  url: string;
  // LucideIcon for lucide icons; RedditIcon accepts the same (size, className) props.
  icon: LucideIcon | ((props: { size?: number; className?: string }) => JSX.Element);
}

export const SOCIALS: Social[] = [
  { label: 'GitHub', url: 'https://github.com/AkkhileshCod3s', icon: Github },
  { label: 'LinkedIn', url: 'https://www.linkedin.com/in/akhilesh-73b067368/', icon: Linkedin },
  { label: 'Instagram', url: 'https://www.instagram.com/akhileshhhh_27', icon: Instagram },
  { label: 'Reddit', url: 'https://reddit.com/user/Resident_Credit5952', icon: RedditIcon },
];

export const RESUME_URL = '/resume.pdf';

export const EXCLUDE_PROFILE_REPO = true;

export const LIVE_URL_OVERRIDES: Record<string, string> = {
  dropportal: 'https://dropportal.onrender.com',
  'ai-text-summarizer': 'https://ai-text-summarizer-1.onrender.com',
};

export const CATEGORY_OVERRIDES: Record<string, string> = {};
