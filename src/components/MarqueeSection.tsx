import { useState } from 'react';
import { Code2 } from 'lucide-react';
import { SKILLS, deviconUrl, type Skill } from '../data/skills';

const ROW1 = SKILLS.slice(0, 7);
const ROW2 = SKILLS.slice(7);
const REPEATS = 3;

export default function MarqueeSection() {
  return (
    <section
      id="tech-stack"
      className="relative z-20 -mt-10 overflow-hidden rounded-t-[40px] bg-[#0C0C0C] pb-24 pt-28 sm:-mt-12 sm:rounded-t-[50px] sm:pb-32 sm:pt-32 md:-mt-14 md:rounded-t-[60px] md:pb-40 md:pt-40"
    >
      <h2
        className="hero-heading mb-24 text-center font-black uppercase leading-none tracking-tight sm:mb-28 md:mb-36"
        style={{ fontSize: 'clamp(2.75rem, 12vw, 160px)' }}
      >
        Tech Stack
      </h2>
      <div className="flex w-full flex-col gap-3 sm:gap-4">
        <div className="w-full overflow-hidden pb-2">
          <MarqueeRow skills={ROW1} reverse={false} />
        </div>
        <div className="w-full overflow-hidden pb-2">
          <MarqueeRow skills={ROW2} reverse />
        </div>
      </div>
    </section>
  );
}

function MarqueeRow({ skills, reverse }: { skills: Skill[]; reverse: boolean }) {
  const half = (keyPrefix: string) => (
    <div
      className={`flex w-max shrink-0 gap-3 pr-3 sm:gap-4 sm:pr-4 ${
        reverse ? 'marquee-row-reverse' : 'marquee-row'
      }`}
      aria-hidden={keyPrefix === 'b'}
    >
      {Array.from({ length: REPEATS }).map((_, rep) =>
        skills.map((skill, i) => <SkillTile key={`${rep}-${i}`} skill={skill} />)
      )}
    </div>
  );

  return <div className="flex w-max items-start">{half('a')}{half('b')}</div>;
}

function SkillTile({ skill }: { skill: Skill }) {
  const [failed, setFailed] = useState(false);
  return (
    <div className="flex h-[96px] w-[96px] shrink-0 flex-col items-center justify-center gap-2 rounded-2xl border border-[#D7E2EA]/12 bg-[#141414] transition-colors duration-200 hover:border-[#D7E2EA]/35 sm:h-[130px] sm:w-[130px] sm:gap-3 md:h-[150px] md:w-[150px]">
      {failed ? (
        <Code2 className="h-9 w-9 text-[#D7E2EA] sm:h-12 sm:w-12 md:h-14 md:w-14" />
      ) : (
        <img
          src={deviconUrl(skill.iconSlug)}
          alt={skill.label}
          loading="lazy"
          draggable={false}
          onError={() => setFailed(true)}
          className={`h-9 w-9 object-contain sm:h-12 sm:w-12 md:h-14 md:w-14 ${skill.invert ? 'invert' : ''}`}
        />
      )}
      <span className="text-[0.65rem] font-medium uppercase tracking-wider text-[#D7E2EA] sm:text-xs md:text-sm">
        {skill.label}
      </span>
    </div>
  );
}
