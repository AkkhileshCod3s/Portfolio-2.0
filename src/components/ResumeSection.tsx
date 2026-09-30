import { useRef, useState } from 'react';
import { Download, Eye } from 'lucide-react';
import FadeIn from './FadeIn';
import ResumeModal from './ResumeModal';
import { downloadResume } from '../lib/downloadResume';

export default function ResumeSection() {
  const [modalOpen, setModalOpen] = useState(false);
  const viewButtonRef = useRef<HTMLButtonElement>(null);
  const [downloadError, setDownloadError] = useState<string | null>(null);

  const handleDownload = () => {
    setDownloadError(null);
    downloadResume((message) => setDownloadError(message));
  };

  return (
    <section
      id="resume"
      className="relative z-50 -mt-10 scroll-mt-20 rounded-t-[40px] bg-white px-5 pb-28 pt-24 sm:-mt-12 sm:rounded-t-[50px] sm:px-8 sm:pb-32 sm:pt-28 md:-mt-14 md:rounded-t-[60px] md:px-10 md:pb-40 md:pt-32"
    >
      <div className="mx-auto max-w-6xl">
        <FadeIn y={40}>
          <h2
            className="mb-6 text-center font-black uppercase leading-none tracking-tight text-[#0C0C0C] sm:mb-8"
            style={{ fontSize: 'clamp(2.75rem, 12vw, 160px)' }}
          >
            Resume
          </h2>
          <p className="mx-auto mb-12 max-w-2xl text-center font-light text-[#0C0C0C] opacity-60">
            Education, experience, and technical skills.
          </p>
        </FadeIn>

        <FadeIn delay={0.1} y={20}>
          <div className="flex flex-wrap justify-center gap-3">
            <button
              ref={viewButtonRef}
              onClick={() => setModalOpen(true)}
              className="inline-flex items-center gap-2 rounded-full bg-[#0C0C0C] px-6 py-3 text-xs font-medium uppercase tracking-widest text-white transition-opacity hover:opacity-85 sm:text-sm"
            >
              <Eye size={16} /> View Resume
            </button>
            <button
              onClick={handleDownload}
              className="inline-flex items-center gap-2 rounded-full border-2 border-[#0C0C0C] px-6 py-3 text-xs font-medium uppercase tracking-widest text-[#0C0C0C] transition-colors hover:bg-[#0C0C0C]/5 sm:text-sm"
            >
              <Download size={16} /> Download Resume
            </button>
          </div>
        </FadeIn>

        {downloadError && (
          <p className="mt-4 text-center text-sm text-red-600">{downloadError}</p>
        )}
      </div>

      <ResumeModal open={modalOpen} onClose={() => setModalOpen(false)} />
    </section>
  );
}
