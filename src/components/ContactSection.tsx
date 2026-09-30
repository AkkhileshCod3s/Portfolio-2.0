import { useState } from 'react';
import {
  Check,
  Copy,
  GraduationCap,
  Mail,
  MapPin,
  Send,
} from 'lucide-react';
import FadeIn from './FadeIn';
import { CAMPUS, EMAIL, GITHUB_URL, GITHUB_USERNAME, LOCATION, SOCIALS } from '../data/site';

export default function ContactSection() {
  return (
    <section
      id="contact"
      className="relative z-[60] -mt-10 scroll-mt-20 rounded-t-[40px] bg-[#0C0C0C] px-5 pb-16 pt-20 sm:-mt-12 sm:rounded-t-[50px] sm:px-8 sm:pb-20 sm:pt-24 md:-mt-14 md:rounded-t-[60px] md:px-10 md:pb-24 md:pt-28"
    >
      <div className="mx-auto max-w-6xl">
        <FadeIn y={40}>
          <h2
            className="hero-heading mb-6 break-words text-center font-black uppercase leading-none tracking-tight sm:mb-8"
            style={{ fontSize: 'clamp(2.75rem, 12vw, 160px)' }}
          >
            Let&apos;s Connect &amp; Collaborate
          </h2>
          <p className="mx-auto mb-12 max-w-2xl text-center font-light leading-relaxed text-[#D7E2EA] opacity-70 sm:mb-16">
            Open to software engineering opportunities, developer hackathons, and open-source ideas.
          </p>
        </FadeIn>

        <div className="grid grid-cols-1 gap-5 lg:grid-cols-[2fr_3fr] sm:gap-6">
          {/* LEFT COLUMN */}
          <div className="flex min-w-0 flex-col gap-5 sm:gap-6">
            <FadeIn delay={0} y={20}>
              <EmailCard />
            </FadeIn>
            <FadeIn delay={0.1} y={20}>
              <div className="rounded-[28px] border border-[#D7E2EA]/12 bg-[#141414] p-5">
                <div className="flex items-start gap-3">
                  <div className="shrink-0 rounded-xl border border-[#D7E2EA]/12 bg-[#1C1C1C] p-2.5">
                    <MapPin size={20} color="#D7E2EA" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-[0.7rem] uppercase tracking-wider text-[#D7E2EA] opacity-60">
                      Location &amp; Campus
                    </p>
                    <p className="mt-1 break-words text-lg font-medium text-[#D7E2EA]">{LOCATION}</p>
                    <p className="mt-2 flex items-center gap-1.5 break-words text-sm italic text-[#D7E2EA] opacity-70">
                      <GraduationCap size={14} className="shrink-0" /> {CAMPUS}
                    </p>
                  </div>
                </div>
              </div>
            </FadeIn>
            <FadeIn delay={0.2} y={20}>
              <div className="rounded-[28px] border border-[#D7E2EA]/12 bg-[#141414] p-5">
                <p className="mb-3 text-[0.7rem] uppercase tracking-wider text-[#D7E2EA] opacity-60">
                  Direct Social Profiles
                </p>
                <div className="flex flex-wrap gap-3">
                  {SOCIALS.filter((s) => s.url && s.url !== 'TODO').map((social) => (
                    <a
                      key={social.label}
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={social.label}
                      className="rounded-xl border border-[#D7E2EA]/15 p-3 text-[#D7E2EA] transition-colors hover:border-[#D7E2EA]/40"
                    >
                      <social.icon size={18} />
                    </a>
                  ))}
                </div>
              </div>
            </FadeIn>
          </div>

          {/* RIGHT COLUMN — FORM */}
          <FadeIn delay={0.15} y={20} className="min-w-0">
            <ContactForm />
          </FadeIn>
        </div>

        <p
          className="mt-12 pb-2 text-center text-xs text-[#D7E2EA] opacity-50"
          style={{ paddingBottom: 'max(0.5rem, env(safe-area-inset-bottom))' }}
        >
          © {new Date().getFullYear()} Akhilesh.
        </p>
      </div>
    </section>
  );
}

function EmailCard() {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(EMAIL);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      /* clipboard unavailable */
    }
  };

  return (
    <div className="rounded-[28px] border border-[#D7E2EA]/12 bg-[#141414] p-5">
      <div className="flex items-start gap-3">
        <div className="shrink-0 rounded-xl border border-[#D7E2EA]/12 bg-[#1C1C1C] p-2.5">
          <Mail size={20} color="#D7E2EA" />
        </div>
        <div className="min-w-0 flex-1">
          <p className="text-[0.7rem] uppercase tracking-wider text-[#D7E2EA] opacity-60">
            Direct Email
          </p>
          <p className="mt-1 break-all font-medium text-[#D7E2EA]">{EMAIL}</p>
          <button
            onClick={copy}
            className="mt-3 inline-flex items-center gap-1.5 rounded-full border border-[#D7E2EA]/15 px-3 py-1.5 text-[0.7rem] font-medium uppercase tracking-wider text-[#D7E2EA] transition-colors hover:bg-[#D7E2EA]/10"
          >
            {copied ? <Check size={12} /> : <Copy size={12} />}
            {copied ? 'Copied' : 'Copy'}
          </button>
        </div>
      </div>
    </div>
  );
}

function ContactForm() {
  const [name, setName] = useState('');
  const [fromEmail, setFromEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !fromEmail.trim() || !message.trim()) return;
    const mailSubject = subject.trim() || `Portfolio contact from ${name.trim()}`;
    const body = `Name: ${name.trim()}\nEmail: ${fromEmail.trim()}\n\n${message.trim()}`;
    window.location.href = `mailto:${EMAIL}?subject=${encodeURIComponent(
      mailSubject
    )}&body=${encodeURIComponent(body)}`;
  };

  const inputClass =
    'w-full rounded-2xl border border-[#D7E2EA]/12 bg-[#1C1C1C] px-4 py-3 text-[#D7E2EA] outline-none transition-shadow focus-visible:ring-2 focus-visible:ring-[#D7E2EA]/60';
  const labelClass = 'mb-1.5 block text-[0.7rem] uppercase tracking-wider text-[#D7E2EA] opacity-60';

  return (
    <form
      onSubmit={handleSubmit}
      className="flex h-full flex-col gap-4 rounded-[28px] border border-[#D7E2EA]/12 bg-[#141414] p-5 sm:gap-5 sm:rounded-[36px] sm:p-8"
    >
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5">
        <div className="min-w-0">
          <label htmlFor="c-name" className={labelClass}>
            Your Name *
          </label>
          <input
            id="c-name"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            className={inputClass}
            placeholder="Jane Doe"
          />
        </div>
        <div className="min-w-0">
          <label htmlFor="c-email" className={labelClass}>
            Your Email *
          </label>
          <input
            id="c-email"
            type="email"
            required
            value={fromEmail}
            onChange={(e) => setFromEmail(e.target.value)}
            className={inputClass}
            placeholder="jane@example.com"
          />
        </div>
      </div>

      <div className="min-w-0">
        <label htmlFor="c-subject" className={labelClass}>
          Subject
        </label>
        <input
          id="c-subject"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
          className={inputClass}
          placeholder="Project Collab / Opportunity"
        />
      </div>

      <div className="min-w-0">
        <label htmlFor="c-message" className={labelClass}>
          Message *
        </label>
        <textarea
          id="c-message"
          required
          rows={5}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className={`${inputClass} resize-none`}
          placeholder="Hi Akhilesh, I saw your GitHub projects and wanted to connect..."
        />
      </div>

      <button
        type="submit"
        className="mt-auto inline-flex w-full items-center justify-center gap-2 rounded-full px-6 py-3.5 text-xs font-medium uppercase tracking-widest text-white transition-opacity hover:opacity-90 sm:text-sm"
        style={{
          background:
            'linear-gradient(123deg, #18011F 7%, #B600A8 37%, #7621B0 72%, #BE4C00 100%)',
          boxShadow: '0px 4px 4px rgba(181,1,167,0.25), inset 4px 4px 12px #7721B1',
        }}
      >
        <Send size={16} /> Send Message to Akhilesh
      </button>
    </form>
  );
}
