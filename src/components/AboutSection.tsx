import { GraduationCap, MapPin, Code2, Wrench, Target } from 'lucide-react';
import FadeIn from './FadeIn';
import AnimatedText from './AnimatedText';
import { ABOUT_TEXT, ABOUT_DECORATIONS, ABOUT_DETAILS, type AboutDetail } from '../data/about';

const ICONS = {
  GraduationCap,
  MapPin,
  Code2,
  Wrench,
  Target,
} as const;

export default function AboutSection() {
  return (
    <section
      id="about"
      className="relative z-10 -mt-10 flex min-h-[100svh] flex-col items-center justify-center overflow-hidden rounded-t-[40px] bg-white px-5 pb-24 pt-20 sm:-mt-12 sm:rounded-t-[50px] sm:px-8 sm:pb-28 sm:pt-24 md:-mt-14 md:rounded-t-[60px] md:px-10 md:pb-32 md:pt-28"
    >
      {ABOUT_DECORATIONS.map((d, i) => (
        <div
          key={i}
          className={`pointer-events-none absolute z-0 select-none ${d.className}`}
        >
          <FadeIn delay={d.delay} x={d.x} y={0} duration={0.9}>
            <img
              src={d.src}
              alt=""
              loading="lazy"
              draggable={false}
              className="h-auto max-w-full opacity-90"
            />
          </FadeIn>
        </div>
      ))}

      <div className="relative z-10 flex flex-col items-center gap-10 sm:gap-14">
        <FadeIn delay={0} y={40}>
          <h2
            className="text-center font-black uppercase leading-none tracking-tight text-[#0C0C0C]"
            style={{ fontSize: 'clamp(2.75rem, 12vw, 160px)' }}
          >
            About me
          </h2>
        </FadeIn>

        <AnimatedText
          text={ABOUT_TEXT}
          className="max-w-[640px] text-center font-medium leading-relaxed text-[#0C0C0C]"
          style={{ fontSize: 'clamp(1rem, 2vw, 1.35rem)' }}
        />

        <div className="mx-auto flex w-full max-w-[640px] flex-col gap-3 text-left sm:gap-4">
          {ABOUT_DETAILS.map((detail, i) => (
            <FadeIn key={detail.label} delay={i * 0.1} y={20}>
              <DetailRow detail={detail} />
            </FadeIn>
          ))}
        </div>

      </div>
    </section>
  );
}

function DetailRow({ detail }: { detail: AboutDetail }) {
  const Icon = ICONS[detail.icon];
  return (
    <div className="flex items-start gap-3 rounded-2xl border border-[#0C0C0C]/10 bg-[#F4F6F8] px-4 py-3 sm:gap-4 sm:px-5 sm:py-4">
      <div className="shrink-0 rounded-xl border border-[#0C0C0C]/10 bg-white p-2.5">
        <Icon size={20} color="#0C0C0C" />
      </div>
      <div className="min-w-0">
        <p className="text-[0.7rem] font-medium uppercase tracking-wider text-[#0C0C0C] opacity-60 sm:text-xs">
          {detail.label}
        </p>
        <p className="break-words text-sm font-light leading-snug text-[#0C0C0C] sm:text-base">
          {detail.value}
        </p>
      </div>
    </div>
  );
}
