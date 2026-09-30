import { useEffect, useState } from 'react';
import { scrollToHash } from '../lib/smoothScroll';

interface MobileMenuProps {
  links: readonly { label: string; href: string }[];
}

export default function MobileMenu({ links }: MobileMenuProps) {
  const [open, setOpen] = useState(false);

  // Close on Escape and lock body scroll while the panel is open.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
    };
    document.addEventListener('keydown', onKey);
    const { overflow } = document.body.style;
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = overflow;
    };
  }, [open]);

  return (
    <div className="relative md:hidden">
      {/* Hamburger toggle */}
      <button
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        aria-label={open ? 'Close menu' : 'Open menu'}
        className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-[#D7E2EA]/25 text-[#D7E2EA] transition-colors hover:bg-white/10"
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
          {open ? (
            <>
              <line x1="5" y1="5" x2="19" y2="19" />
              <line x1="19" y1="5" x2="5" y2="19" />
            </>
          ) : (
            <>
              <line x1="4" y1="7" x2="20" y2="7" />
              <line x1="4" y1="12" x2="20" y2="12" />
              <line x1="4" y1="17" x2="20" y2="17" />
            </>
          )}
        </svg>
      </button>

      {/* Slide-out panel */}
      {open && (
        <>
          <button
            aria-label="Close menu"
            className="fixed inset-0 z-40 cursor-default bg-black/60 backdrop-blur-sm"
            onClick={() => setOpen(false)}
          />
          <div className="fixed right-0 top-0 z-50 flex h-full w-[72%] max-w-[300px] flex-col gap-1 border-l border-[#D7E2EA]/15 bg-[#111111] px-6 py-6 shadow-2xl">
            <div className="mb-4 flex items-center justify-between">
              <span className="text-xs font-medium uppercase tracking-widest text-[#D7E2EA] opacity-60">
                Menu
              </span>
              <button
                onClick={() => setOpen(false)}
                aria-label="Close menu"
                className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-[#D7E2EA]/25 text-[#D7E2EA] transition-colors hover:bg-white/10"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
                  <line x1="5" y1="5" x2="19" y2="19" />
                  <line x1="19" y1="5" x2="5" y2="19" />
                </svg>
              </button>
            </div>
            {links.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={(e) => {
                  e.preventDefault();
                  setOpen(false);
                  // Let the panel close before starting the slow scroll.
                  setTimeout(() => scrollToHash(link.href), 150);
                }}
                className="rounded-xl px-3 py-3 text-sm font-medium uppercase tracking-wider text-[#D7E2EA] transition-colors hover:bg-white/10"
              >
                {link.label}
              </a>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
