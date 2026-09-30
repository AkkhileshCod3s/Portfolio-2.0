import { useMemo, useState } from 'react';
import { ExternalLink, Github, Info, RotateCw } from 'lucide-react';
import FadeIn from './FadeIn';
import { useGithubRepos, type GithubRepo } from '../hooks/useGithubRepos';
import { CATEGORIES, classifyRepo, type Category } from '../lib/classify';
import { GITHUB_URL, GITHUB_USERNAME, LIVE_URL_OVERRIDES } from '../data/site';

export default function ProjectsSection() {
  const { repos, loading, error, retry } = useGithubRepos();
  const [active, setActive] = useState<'All' | Category>('All');
  const [showAll, setShowAll] = useState(false);

  const counts = useMemo(() => {
    const map = new Map<string, number>();
    repos.forEach((r) => {
      const c = classifyRepo(r);
      map.set(c, (map.get(c) ?? 0) + 1);
    });
    return map;
  }, [repos]);

  const chips = useMemo(
    () =>
      (['All', ...CATEGORIES] as ('All' | Category)[])
        .map((c) => ({ label: c, count: c === 'All' ? repos.length : counts.get(c) ?? 0 }))
        .filter((c) => c.count > 0),
    [repos.length, counts]
  );

  const filtered = useMemo(
    () => (active === 'All' ? repos : repos.filter((r) => classifyRepo(r) === active)),
    [repos, active]
  );
  const visible = showAll ? filtered : filtered.slice(0, 6);

  return (
    <section
      id="projects"
      className="relative z-30 -mt-10 scroll-mt-20 rounded-t-[40px] bg-white px-5 pb-16 pt-20 sm:-mt-12 sm:rounded-t-[50px] sm:px-8 sm:pb-20 sm:pt-24 md:-mt-14 md:rounded-t-[60px] md:px-10 md:pb-24 md:pt-28"
    >
      <div className="mx-auto max-w-6xl">
        <FadeIn y={40}>
          <h2
            className="mb-6 break-words text-center font-black uppercase leading-none tracking-tight text-[#0C0C0C] sm:mb-8"
            style={{ fontSize: 'clamp(2.75rem, 12vw, 160px)' }}
          >
            Public Repositories &amp; Projects
          </h2>
          <p className="mx-auto mb-12 max-w-2xl text-center font-light text-[#0C0C0C] opacity-60 sm:mb-16">
            All open-source repositories from{' '}
            <a
              href={GITHUB_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 font-medium underline decoration-1 underline-offset-2 transition-opacity hover:opacity-70"
            >
              github.com/{GITHUB_USERNAME}
              <ExternalLink size={14} className="inline" />
            </a>
          </p>
        </FadeIn>

        {loading && (
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3">
            {Array.from({ length: 6 }).map((_, i) => (
              <div
                key={i}
                className="h-[260px] animate-pulse rounded-[28px] border border-[#0C0C0C]/12 bg-[#F4F6F8] sm:rounded-[36px]"
              />
            ))}
          </div>
        )}

        {!loading && error && (
          <div className="flex flex-col items-center gap-4 py-10 text-center">
            <p className="font-light text-[#0C0C0C] opacity-60">
              Couldn&apos;t load repositories from GitHub right now.
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              <button
                onClick={retry}
                className="inline-flex items-center gap-2 rounded-full bg-[#0C0C0C] px-5 py-2.5 text-xs font-medium uppercase tracking-widest text-white transition-opacity hover:opacity-85"
              >
                <RotateCw size={14} /> Retry
              </button>
              <a
                href={GITHUB_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-[#0C0C0C]/30 px-5 py-2.5 text-xs font-medium uppercase tracking-widest text-[#0C0C0C] transition-colors hover:bg-[#0C0C0C]/5"
              >
                <Github size={14} /> View all on GitHub
              </a>
            </div>
          </div>
        )}

        {!loading && !error && repos.length === 0 && (
          <p className="py-10 text-center font-light text-[#0C0C0C] opacity-60">
            No public repositories yet. Check back soon!
          </p>
        )}

        {!loading && !error && repos.length > 0 && (
          <>
            <div className="mb-8 flex flex-wrap justify-center gap-2">
              {chips.map((chip) => (
                <button
                  key={chip.label}
                  onClick={() => setActive(chip.label)}
                  className={`rounded-full border px-4 py-2 text-xs uppercase tracking-wide transition-colors sm:text-sm ${
                    active === chip.label
                      ? 'border-[#0C0C0C] bg-[#0C0C0C] text-white'
                      : 'border-[#0C0C0C]/20 text-[#0C0C0C] hover:bg-[#0C0C0C]/5'
                  }`}
                >
                  {chip.label === 'All' ? `All (${chip.count})` : chip.label}
                </button>
              ))}
            </div>

            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3">
              {visible.map((repo, i) => (
                <FadeIn key={repo.id} delay={i * 0.1} y={20} className="h-full">
                  <RepoCard repo={repo} />
                </FadeIn>
              ))}
            </div>

            {filtered.length > 6 && (
              <div className="mt-8 flex justify-center">
                <button
                  onClick={() => setShowAll((s) => !s)}
                  className="rounded-full border border-[#0C0C0C]/20 px-6 py-2.5 text-xs font-medium uppercase tracking-widest text-[#0C0C0C] transition-colors hover:bg-[#0C0C0C]/5 sm:text-sm"
                >
                  {showAll ? 'Show less' : `Show all projects (${filtered.length})`}
                </button>
              </div>
            )}

            <div className="mt-10 flex justify-center">
              <a
                href={GITHUB_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-[#0C0C0C]/20 px-6 py-3 text-xs font-medium uppercase tracking-widest text-[#0C0C0C] transition-colors hover:bg-[#0C0C0C]/5 sm:text-sm"
              >
                <Github size={16} /> See all repositories on GitHub
              </a>
            </div>
          </>
        )}
      </div>
    </section>
  );
}

function RepoCard({ repo }: { repo: GithubRepo }) {
  const category = classifyRepo(repo);
  const liveOverride = LIVE_URL_OVERRIDES[repo.name.toLowerCase()];
  const liveUrl = repo.homepage?.trim() ? repo.homepage : liveOverride;

  return (
    <article className="flex h-full flex-col rounded-[28px] border border-[#0C0C0C]/12 bg-[#F4F6F8] p-4 transition-transform duration-200 hover:-translate-y-1 sm:rounded-[36px] sm:p-5">
      <div className="mb-3 flex min-w-0 items-center justify-between gap-2">
        <span className="shrink-0 rounded-full border border-[#0C0C0C]/15 bg-white px-3 py-1 text-[0.65rem] font-medium uppercase tracking-wider text-[#0C0C0C]">
          {category}
        </span>
        <a
          href={repo.html_url}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex min-w-0 items-center gap-1 text-[0.7rem] uppercase tracking-wider text-[#0C0C0C] opacity-60 transition-opacity hover:opacity-100"
        >
          repo <ExternalLink size={12} className="shrink-0" />
        </a>
      </div>

      <h3 className="mb-2 break-words font-medium tracking-wide text-[#0C0C0C]">{repo.name}</h3>
      <p className="mb-4 line-clamp-3 break-words font-light leading-relaxed text-[#0C0C0C] opacity-60">
        {repo.description?.trim() || `Public repository on GitHub by @${GITHUB_USERNAME}`}
      </p>

      <div className="mb-4 flex flex-wrap gap-2">
        {[repo.language, 'Open Source', 'GitHub']
          .filter(Boolean)
          .map((tag) => (
            <span
              key={tag}
              className="rounded-full border border-[#0C0C0C]/15 px-3 py-1 text-[0.7rem] text-[#0C0C0C] opacity-80"
            >
              {tag}
            </span>
          ))}
      </div>

      <div className="mt-auto flex flex-wrap gap-2 border-t border-[#0C0C0C]/10 pt-4">
        <a
          href={`${repo.html_url}#readme`}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 rounded-full border border-[#0C0C0C]/15 px-3 py-1.5 text-[0.7rem] font-medium uppercase tracking-wider text-[#0C0C0C] transition-colors hover:bg-[#0C0C0C]/5"
        >
          <Info size={12} /> Notes
        </a>
        <a
          href={repo.html_url}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 rounded-full border border-[#0C0C0C]/15 px-3 py-1.5 text-[0.7rem] font-medium uppercase tracking-wider text-[#0C0C0C] transition-colors hover:bg-[#0C0C0C]/5"
        >
          <Github size={12} /> Code
        </a>
        {liveUrl && (
          <a
            href={liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 rounded-full border border-[#0C0C0C]/15 px-3 py-1.5 text-[0.7rem] font-medium uppercase tracking-wider text-[#0C0C0C] transition-colors hover:bg-[#0C0C0C]/5"
          >
            <ExternalLink size={12} /> Live
          </a>
        )}
      </div>
    </article>
  );
}
