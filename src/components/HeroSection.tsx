import { motion, useReducedMotion } from 'framer-motion';
import FadeIn from './FadeIn';
import Magnet from './Magnet';
import ContactButton from './ContactButton';
import MobileMenu from './MobileMenu';
import { scrollToHash } from '../lib/smoothScroll';
import { NAV_LINKS, HERO_TAGLINE, AVATAR_SRC } from '../data/hero';
import { HERO_ICONS } from '../data/heroIcons';

export default function HeroSection() {
  const reduceMotion = useReducedMotion();

  return (
    <section
      id="hero"
      className="relative flex min-h-[100dvh] flex-col overflow-x-hidden px-4 pb-12 sm:px-6 sm:pb-20 md:px-10 md:pb-24"
    >
      {/* SCATTERED 3D ICONS — background layer */}
      {!reduceMotion ? (
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
          {HERO_ICONS.map((icon) => (
            <motion.img
              key={icon.id}
              src={icon.src}
              alt=""
              loading="lazy"
              draggable={false}
              className={`absolute h-auto w-[50px] select-none xs:w-[55px] sm:w-[70px] md:w-[90px] lg:w-[110px] ${icon.className}`}
              animate={{ y: icon.floatY }}
              transition={{
                duration: icon.duration,
                repeat: Infinity,
                ease: 'easeInOut',
                delay: icon.delay,
              }}
            />
          ))}
        </div>
      ) : null}

      {/* NAVBAR — text links on md+, hamburger menu below md */}
      <FadeIn delay={0} y={-20} as="nav" className="relative z-30 -mx-4 px-4 sm:-mx-6 sm:px-6 md:-mx-10 md:px-10">
        <div className="flex w-full items-center justify-between gap-2 pt-5 sm:gap-4 md:pt-8">
          <div className="hidden min-w-0 flex-1 items-center justify-between gap-2 sm:gap-4 md:flex">
            {NAV_LINKS.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={(e) => {
                  e.preventDefault();
                  scrollToHash(link.href);
                }}
                className="min-w-0 whitespace-nowrap text-[0.68rem] font-medium uppercase tracking-wide text-[#D7E2EA] transition-opacity duration-200 hover:opacity-70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D7E2EA] min-[380px]:text-xs sm:tracking-wider sm:text-base md:text-lg lg:text-[1.4rem]"
              >
                {link.label}
              </a>
            ))}
          </div>
          <MobileMenu links={NAV_LINKS} />
        </div>
      </FadeIn>

      {/* HEADING — fluid type, no wrap breakouts */}
      <FadeIn
        delay={0.15}
        y={40}
        className="relative z-20 mt-8 overflow-hidden py-2 text-center sm:mt-6 md:mt-2"
      >
        <h1 className="hero-heading mx-auto w-full max-w-full text-center text-[12vw] font-black uppercase leading-none tracking-tight sm:text-[10vw] md:text-[8vw] lg:text-[120px]">
          Hi, i&apos;m akhilesh
        </h1>
      </FadeIn>

      {/* CENTER STACK — mobile flow: avatar → description → contact; desktop: avatar centered, text/button absolute */}
      <div className="relative z-20 -mt-3 flex flex-1 flex-col items-center justify-center gap-6 text-center sm:-mt-5 md:-mt-7 md:block">
        <FadeIn delay={0.6} y={30}>
          <Magnet padding={150} strength={3} className="flex justify-center">
            <img
              src={AVATAR_SRC}
              alt="Akhilesh"
              loading="eager"
              draggable={false}
              className="h-auto max-h-[42svh] w-[200px] max-w-full object-contain select-none min-[420px]:w-[240px] sm:max-h-[62svh] sm:w-[340px] md:w-[420px] lg:w-[500px]"
            />
          </Magnet>
        </FadeIn>

        {/* DESCRIPTION — renders above the contact button in the mobile flow */}
        <FadeIn delay={0.35} y={20} className="md:absolute md:bottom-20 md:left-0">
          <p
            className="px-6 text-center leading-snug text-[#D7E2EA] md:px-0 md:max-w-[260px] md:text-left md:font-light md:uppercase md:tracking-wide"
            style={{
              fontSize: 'clamp(0.875rem, 1.4vw, 1.5rem)',
              textShadow: '0 0 12px #0C0C0C',
            }}
          >
            {HERO_TAGLINE}
          </p>
        </FadeIn>

        {/* CONTACT — bottom of the mobile stack, thumb-friendly */}
        <FadeIn
          delay={0.5}
          y={20}
          className="w-full max-w-[240px] md:absolute md:bottom-20 md:right-0 md:w-auto md:max-w-none"
        >
          <ContactButton
            href="#contact"
            className="mx-auto w-full max-w-[240px] py-3 text-center text-xs md:mx-0 md:w-auto md:px-10 md:py-3.5 md:text-sm lg:px-12 lg:py-4 lg:text-base"
          />
        </FadeIn>
      </div>
    </section>
  );
}
