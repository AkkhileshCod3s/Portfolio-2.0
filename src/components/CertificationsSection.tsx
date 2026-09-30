import { Award, Calendar, ExternalLink } from 'lucide-react';
import FadeIn from './FadeIn';
import { CERTIFICATIONS, type Certification } from '../data/certifications';

export default function CertificationsSection() {
  return (
    <section
      id="certifications"
      className="relative z-40 -mt-10 scroll-mt-20 rounded-t-[40px] bg-[#0C0C0C] px-5 pb-16 pt-20 sm:-mt-12 sm:rounded-t-[50px] sm:px-8 sm:pb-20 sm:pt-24 md:-mt-14 md:rounded-t-[60px] md:px-10 md:pb-24 md:pt-28"
    >
      <div className="mx-auto max-w-6xl">
        <FadeIn y={40}>
          <h2
            className="hero-heading mb-6 text-center font-black uppercase leading-none tracking-tight sm:mb-8"
            style={{ fontSize: 'clamp(2.75rem, 12vw, 160px)' }}
          >
            Certifications
          </h2>
          <p className="mx-auto mb-12 max-w-2xl text-center font-light leading-relaxed text-[#D7E2EA] opacity-70 sm:mb-16">
            Specializations and courses in disaster risk, AI, and cybersecurity.
          </p>
        </FadeIn>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 sm:gap-6">
          {CERTIFICATIONS.map((cert, i) => (
            <FadeIn key={cert.title} delay={i * 0.1} y={20} className="h-full">
              <CertCard cert={cert} />
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}

function CertCard({ cert }: { cert: Certification }) {
  return (
    <article className="flex h-full flex-col gap-4 rounded-[28px] border border-[#D7E2EA]/12 bg-[#141414] p-5 transition-colors duration-200 hover:border-[#D7E2EA]/35 sm:rounded-[36px] sm:p-6">
      <div className="flex min-w-0 items-start justify-between gap-3">
        <div className="flex min-w-0 items-center gap-3">
          <div className="shrink-0 rounded-xl border border-[#D7E2EA]/12 bg-[#1C1C1C] p-2.5">
            <Award size={20} color="#D7E2EA" />
          </div>
          <div className="flex min-w-0 flex-wrap items-center gap-2">
            <span className="text-xs uppercase tracking-wider text-[#D7E2EA] opacity-60">
              {cert.badge}
            </span>
            {cert.type === 'Specialization' && (
              <span
                className="rounded-full px-3 py-0.5 text-[0.65rem] font-medium uppercase tracking-wider text-white"
                style={{
                  background:
                    'linear-gradient(123deg, #18011F 7%, #B600A8 37%, #7621B0 72%, #BE4C00 100%)',
                }}
              >
                Specialization
              </span>
            )}
          </div>
        </div>
        <span className="inline-flex shrink-0 items-center gap-1.5 text-xs text-[#D7E2EA] opacity-60">
          <Calendar size={12} className="shrink-0" />
          {cert.date}
        </span>
      </div>

      <div className="min-w-0">
        <h3 className="mb-1 break-words text-lg font-medium text-[#D7E2EA] sm:text-xl">
          {cert.title}
        </h3>
        <p className="break-words font-light text-sm text-[#D7E2EA] opacity-60">{cert.provider}</p>
      </div>

      <p className="break-words font-light leading-relaxed text-sm text-[#D7E2EA] opacity-80 sm:text-base">
        {cert.description}
      </p>

      <div className="flex flex-wrap gap-2">
        {cert.tags.map((tag) => (
          <span
            key={tag}
            className="rounded-full border border-[#D7E2EA]/15 px-3 py-1 text-[0.7rem] text-[#D7E2EA] sm:text-xs"
          >
            {tag}
          </span>
        ))}
      </div>

      {cert.credentialUrl && (
        <div className="mt-auto pt-2">
          <a
            href={cert.credentialUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full border-2 border-[#D7E2EA] px-5 py-2 text-xs font-medium uppercase tracking-widest text-[#D7E2EA] transition-colors hover:bg-[#D7E2EA]/10"
          >
            <ExternalLink size={14} /> View Credential
          </a>
        </div>
      )}
    </article>
  );
}
