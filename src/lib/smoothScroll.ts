// Slow, smooth scrolling for in-page anchor links.
// Native CSS scroll-behavior has a fixed (fast) duration, so we animate manually.

const EASE = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);

export function smoothScrollTo(targetY: number, duration = 1200) {
  const startY = window.scrollY;
  const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
  const clampedTarget = Math.max(0, Math.min(targetY, maxScroll));
  const distance = clampedTarget - startY;
  if (distance === 0) return;

  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reduceMotion) {
    window.scrollTo(0, clampedTarget);
    return;
  }

  const startTime = performance.now();

  const step = (now: number) => {
    const elapsed = now - startTime;
    const progress = Math.min(elapsed / duration, 1);
    window.scrollTo(0, startY + distance * EASE(progress));
    if (progress < 1) requestAnimationFrame(step);
  };
  requestAnimationFrame(step);
}

export function scrollToHash(hash: string, duration = 1200) {
  const id = hash.replace(/^#/, '');
  if (!id) return;
  const el = document.getElementById(id);
  if (!el) return;
  const y = el.getBoundingClientRect().top + window.scrollY - 80; // account for scroll-margin
  smoothScrollTo(y, duration);
}
