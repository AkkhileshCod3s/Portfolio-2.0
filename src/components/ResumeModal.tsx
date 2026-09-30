import { useCallback, useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { AnimatePresence, motion } from 'framer-motion';
import {
  ChevronRight,
  Download,
  Github,
  GraduationCap,
  Mail,
  MapPin,
  TrendingUp,
  Trophy,
  X,
} from 'lucide-react';
import { RESUME } from '../data/resume';
import { EMAIL, GITHUB_URL, GITHUB_USERNAME, LOCATION } from '../data/site';
import { downloadResume } from '../lib/downloadResume';

interface ResumeModalProps {
  open: boolean;
  onClose: () => void;
}

const FOCUSABLE_SELECTOR =
  'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])';

export default function ResumeModal({ open, onClose }: ResumeModalProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [downloadError, setDownloadError] = useState<string | null>(null);

  // Lock body scroll while open, compensating for scrollbar width to avoid layout shift.
  useEffect(() => {
    if (!open) return;
    const { overflow, paddingRight } = document.body.style;
    const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
    document.body.style.overflow = 'hidden';
    if (scrollbarWidth > 0) {
      document.body.style.paddingRight = `${scrollbarWidth}px`;
    }
    return () => {
      document.body.style.overflow = overflow;
      document.body.style.paddingRight = paddingRight;
    };
  }, [open]);

  // Move focus into the dialog on open.
  useEffect(() => {
    if (!open) return;
    const raf = requestAnimationFrame(() => {
      const first = cardRef.current?.querySelector<HTMLElement>(FOCUSABLE_SELECTOR);
      first?.focus();
    });
    return () => cancelAnimationFrame(raf);
  }, [open]);

  // Escape closes; Tab is trapped inside the dialog.
  const onKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        onClose();
        return;
      }
      if (e.key !== 'Tab' || !cardRef.current) return;
      const focusables = Array.from(
        cardRef.current.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR)
      ).filter((el) => el.offsetParent !== null);
      if (focusables.length === 0) return;
      const first = focusables[0];
      const last = focusables[focusables.length - 1];
      const active = document.activeElement as HTMLElement | null;
      if (e.shiftKey && (active === first || !cardRef.current.contains(active))) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && active === last) {
        e.preventDefault();
        first.focus();
      }
    },
    [onClose]
  );

  useEffect(() => {
    if (!open) return;
    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [open, onKeyDown]);

  const handleDownload = () => {
    setDownloadError(null);
    downloadResume((message) => setDownloadError(message));
  };

  return createPortal(
    <AnimatePresence>
      {open && (
        <motion.div
          key="resume-backdrop"
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 p-3 backdrop-blur-sm sm:p-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          onClick={onClose}
        >
          <motion.div
            ref={cardRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby="resume-modal-title"
            className="flex max-h-[90svh] w-full max-w-4xl flex-col overflow-hidden rounded-[28px] bg-[#F4F6F8] text-[#0C0C0C] sm:rounded-[40px]"
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.96 }}
            transition={{ duration: 0.25 }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* STICKY HEADER */}
            <div className="flex shrink-0 items-center justify-between gap-3 border-b border-[#0C0C0C]/10 bg-[#F4F6F8] px-4 py-3 sm:px-8 sm:py-4">
              <h3
                id="resume-modal-title"
                className="text-sm font-bold uppercase tracking-widest sm:text-base"
              >
                Resume
              </h3>
              <div className="flex items-center gap-2">
                <button
                  onClick={handleDownload}
                  aria-label="Download resume"
                  className="inline-flex items-center gap-2 rounded-full bg-[#0C0C0C] px-4 py-2 text-[0.7rem] font-medium uppercase tracking-widest text-white transition-opacity hover:opacity-85 sm:text-xs"
                >
                  <Download size={14} />
                  <span className="hidden sm:inline">Download</span>
                </button>
                <button
                  onClick={onClose}
                  aria-label="Close resume"
                  className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-[#0C0C0C]/20 text-[#0C0C0C] transition-colors hover:bg-[#0C0C0C]/5"
                >
                  <X size={18} />
                </button>
              </div>
              {downloadError && (
                <p className="absolute right-4 top-full mt-2 rounded-full bg-[#0C0C0C] px-4 py-2 text-xs text-white">
                  {downloadError}
                </p>
              )}
            </div>

            {/* SCROLLABLE BODY — FULL RESUME */}
            <div className="flex flex-1 flex-col gap-8 overflow-y-auto overscroll-contain p-5 sm:gap-10 sm:p-8 md:p-12">
              {/* HEADER */}
              <div className="min-w-0">
                <h4
                  className="break-words font-black uppercase leading-none tracking-tight"
                  style={{ fontSize: 'clamp(2rem, 7vw, 4rem)' }}
                >
                  {RESUME.name}
                </h4>
                <p className="mt-2 font-medium">
                  {RESUME.headline} — {RESUME.org}
                </p>
                <div className="mt-3 flex flex-wrap gap-x-5 gap-y-2 text-sm">
                  <a
                    href={`mailto:${EMAIL}`}
                    className="inline-flex min-w-0 items-center gap-1.5 break-all transition-opacity hover:opacity-70"
                  >
                    <Mail size={14} className="shrink-0" /> <span className="break-all">{EMAIL}</span>
                  </a>
                  <span className="inline-flex items-center gap-1.5">
                    <MapPin size={14} className="shrink-0" /> {LOCATION}
                  </span>
                  <a
                    href={GITHUB_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 break-all transition-opacity hover:opacity-70"
                  >
                    <Github size={14} className="shrink-0" /> github.com/{GITHUB_USERNAME}
                  </a>
                </div>
                <p className="mt-4 flex items-start gap-2 break-words text-sm italic leading-relaxed opacity-80">
                  <TrendingUp size={16} className="mt-0.5 shrink-0" />
                  {RESUME.quote}
                </p>
              </div>

              {/* EDUCATION */}
              <div className="min-w-0">
                <CardTitle>Education</CardTitle>
                {RESUME.education.map((edu) => (
                  <div key={edu.degree} className="min-w-0">
                    <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between">
                      <h5 className="break-words font-medium">{edu.degree}</h5>
                      <span className="shrink-0 text-sm opacity-60">{edu.period}</span>
                    </div>
                    <p className="mt-1 flex items-center gap-1.5 text-sm opacity-80">
                      <GraduationCap size={14} className="shrink-0" /> {edu.school}
                    </p>
                    <p className="mt-2 break-words font-light leading-relaxed opacity-70">
                      {edu.coursework}
                    </p>
                  </div>
                ))}
              </div>

              {/* EXPERIENCE */}
              <div className="min-w-0">
                <CardTitle>Project Experience &amp; Software Development</CardTitle>
                <div className="flex flex-col gap-6">
                  {RESUME.experience.map((exp) => (
                    <div key={exp.role} className="min-w-0">
                      <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between">
                        <h5 className="break-words font-medium">
                          {exp.role} — <span className="font-light">{exp.org}</span>
                        </h5>
                        <span className="shrink-0 text-sm opacity-60">{exp.period}</span>
                      </div>
                      <ul className="mt-2 flex flex-col gap-1.5">
                        {exp.points.map((point) => (
                          <li
                            key={point}
                            className="flex items-start gap-2 font-light leading-relaxed opacity-80"
                          >
                            <ChevronRight size={14} className="mt-1 shrink-0" />
                            <span className="break-words">{point}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>

              {/* SKILLS */}
              <div className="min-w-0">
                <CardTitle>Technical Proficiencies</CardTitle>
                <div className="flex flex-col gap-4">
                  {RESUME.skills.map((group) => (
                    <div key={group.group} className="min-w-0">
                      <p className="mb-2 text-sm font-medium">{group.group}</p>
                      <div className="flex flex-wrap gap-2">
                        {group.items.map((item) => (
                          <span
                            key={item}
                            className="rounded-full border border-[#0C0C0C]/15 bg-white px-3 py-1 text-xs sm:text-sm"
                          >
                            {item}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* HIGHLIGHTS */}
              <div className="min-w-0">
                <CardTitle>Highlights &amp; Achievements</CardTitle>
                <ul className="flex flex-col gap-2">
                  {RESUME.highlights.map((h) => (
                    <li key={h} className="flex items-start gap-2 font-light leading-relaxed opacity-80">
                      <Trophy size={14} className="mt-1 shrink-0" />
                      <span className="break-words">{h}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  );
}

function CardTitle({ children }: { children: React.ReactNode }) {
  return (
    <h5 className="mb-4 border-b border-[#0C0C0C]/15 pb-2 text-xs uppercase tracking-widest opacity-60 sm:text-sm">
      {children}
    </h5>
  );
}
