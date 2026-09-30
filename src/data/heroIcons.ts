export const HERO_ICONS_SRC = {
  person: '/icons/person.png',
  github: '/icons/github.png',
  mail: '/icons/mail.png',
  code: '/icons/code.png',
  linkedin: '/icons/linkedin.png',
  vscode: '/icons/vscode.png',
};

export const HERO_ICONS_ALT = {
  person: '3D person icon',
  github: '3D GitHub icon',
  mail: '3D mail icon',
  code: '3D code brackets icon',
  linkedin: '3D LinkedIn icon',
  vscode: '3D VS Code icon',
};

// Positions use mobile-first classes: base = mobile arc, sm+ = desktop arc.
export const HERO_ICONS = [
  {
    id: 'person',
    src: HERO_ICONS_SRC.person,
    alt: HERO_ICONS_ALT.person,
    // Mobile: top-[34%] left-[4%] | Desktop: below the heading on the left.
    className: 'top-[34%] left-[4%] sm:top-[40%] sm:left-[10%] md:left-[15%]',
    floatY: [0, -8, 0] as number[],
    duration: 3.6,
    delay: 0.2,
  },
  {
    id: 'mail',
    src: HERO_ICONS_SRC.mail,
    alt: HERO_ICONS_ALT.mail,
    // Mobile: top-[54%] left-[6%] | Desktop: lower left flank above the description.
    className: 'top-[54%] left-[6%] sm:top-[56%] sm:left-[12%] md:left-[22%]',
    floatY: [0, -10, 0] as number[],
    duration: 4.2,
    delay: 0.4,
  },
  {
    id: 'linkedin',
    src: HERO_ICONS_SRC.linkedin,
    alt: HERO_ICONS_ALT.linkedin,
    // Mobile: bottom-[22%] left-[18%] | Desktop: bottom core close to the avatar's left.
    className: 'bottom-[22%] left-[18%] sm:bottom-[12%] sm:left-[30%] md:left-[33%]',
    floatY: [0, -12, 0] as number[],
    duration: 4.8,
    delay: 0.6,
  },
  {
    id: 'code',
    src: HERO_ICONS_SRC.code,
    alt: HERO_ICONS_ALT.code,
    // Mobile: top-[60%] right-[6%] | Desktop: mirrors mail on the right.
    className: 'top-[60%] right-[6%] sm:top-[56%] sm:right-[20%] md:right-[24%]',
    floatY: [0, -13, 0] as number[],
    duration: 4.0,
    delay: 0.5,
  },
  {
    id: 'github',
    src: HERO_ICONS_SRC.github,
    alt: HERO_ICONS_ALT.github,
    // Mobile: top-[38%] right-[4%] | Desktop: mirrors person on the right.
    className: 'top-[38%] right-[4%] sm:top-[40%] sm:right-[10%] md:right-[15%]',
    floatY: [0, -14, 0] as number[],
    duration: 4.6,
    delay: 0.3,
  },
  {
    id: 'vscode',
    src: HERO_ICONS_SRC.vscode,
    alt: HERO_ICONS_ALT.vscode,
    // Bottom right, mirroring the LinkedIn icon's core position.
    className: 'bottom-[12%] right-[30%] md:right-[33%]',
    floatY: [0, -9, 0] as number[],
    duration: 4.4,
    delay: 0.7,
  },
] as const;
