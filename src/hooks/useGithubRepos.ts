import { useCallback, useEffect, useState } from 'react';
import { EXCLUDE_PROFILE_REPO, GITHUB_USERNAME } from '../data/site';

export interface GithubRepo {
  id: number;
  name: string;
  full_name: string;
  description: string | null;
  html_url: string;
  homepage: string | null;
  language: string | null;
  topics?: string[];
  fork: boolean;
  archived: boolean;
  pushed_at: string;
}

const CACHE_KEY = `gh-repos-${GITHUB_USERNAME}`;
const CACHE_TTL = 10 * 60 * 1000;

function readCache(): GithubRepo[] | null {
  try {
    const raw = sessionStorage.getItem(CACHE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as { t: number; repos: GithubRepo[] };
    if (Date.now() - parsed.t > CACHE_TTL) return null;
    return parsed.repos;
  } catch {
    return null;
  }
}

function writeCache(repos: GithubRepo[]) {
  try {
    sessionStorage.setItem(CACHE_KEY, JSON.stringify({ t: Date.now(), repos }));
  } catch {
    /* ignore */
  }
}

export function useGithubRepos() {
  const [repos, setRepos] = useState<GithubRepo[]>(() => readCache() ?? []);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [attempt, setAttempt] = useState(0);

  const retry = useCallback(() => setAttempt((a) => a + 1), []);

  useEffect(() => {
    let cancelled = false;
    const run = async () => {
      setLoading(true);
      setError(false);
      try {
        // GitHub paginates at 100 per page — fetch ALL pages.
        const all: GithubRepo[] = [];
        let page = 1;
        for (;;) {
          const res = await fetch(
            `https://api.github.com/users/${GITHUB_USERNAME}/repos?per_page=100&page=${page}&sort=pushed&type=owner`
          );
          if (!res.ok) throw new Error(`GitHub API ${res.status}`);
          const batch = (await res.json()) as GithubRepo[];
          all.push(...batch);
          if (batch.length < 100) break;
          page += 1;
          if (page > 10) break; // hard cap for safety
        }
        const filtered = all.filter((r) => {
          if (r.fork || r.archived) return false;
          if (EXCLUDE_PROFILE_REPO && r.name.toLowerCase() === GITHUB_USERNAME.toLowerCase())
            return false;
          if (r.topics?.includes('hide-portfolio')) return false;
          return true;
        });
        filtered.sort((a, b) => {
          const fa = a.topics?.includes('portfolio-featured') ? 1 : 0;
          const fb = b.topics?.includes('portfolio-featured') ? 1 : 0;
          if (fa !== fb) return fb - fa;
          return new Date(b.pushed_at).getTime() - new Date(a.pushed_at).getTime();
        });
        if (cancelled) return;
        setRepos(filtered);
        writeCache(filtered);
      } catch {
        if (cancelled) return;
        const cached = readCache();
        if (cached && cached.length > 0) {
          setRepos(cached);
        } else {
          setError(true);
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    };
    run();
    return () => {
      cancelled = true;
    };
  }, [attempt]);

  return { repos, loading, error, retry };
}
