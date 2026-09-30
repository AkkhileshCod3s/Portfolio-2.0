import { useRef } from 'react';
import { MotionValue, motion, useScroll, useTransform, useReducedMotion } from 'framer-motion';

interface AnimatedTextProps {
  text: string;
  className?: string;
  style?: React.CSSProperties;
}

export default function AnimatedText({ text, className, style }: AnimatedTextProps) {
  const ref = useRef<HTMLParagraphElement>(null);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start 0.8', 'end 0.2'],
  });

  const words = text.split(' ');
  const totalChars = text.length;
  let charIndex = 0;

  return (
    <p ref={ref} className={className} style={style} aria-label={text}>
      {words.map((word, wi) => {
        const wordStart = charIndex;
        charIndex += word.length + 1; // +1 for space
        return (
          <span
            key={wi}
            className="inline-block whitespace-nowrap"
            aria-hidden="true"
          >
            {word.split('').map((char, ci) => {
              const i = wordStart + ci;
              return (
                <CharSpan
                  key={ci}
                  char={char}
                  progress={scrollYProgress}
                  range={[i / totalChars, (i + 1) / totalChars]}
                  reduceMotion={reduceMotion}
                />
              );
            })}
            {wi < words.length - 1 && <span>&nbsp;</span>}
          </span>
        );
      })}
    </p>
  );
}

function CharSpan({
  char,
  progress,
  range,
  reduceMotion,
}: {
  char: string;
  progress: MotionValue<number>;
  range: [number, number];
  reduceMotion: boolean | null;
}) {
  const opacity = useTransform(progress, range, [0.2, 1]);
  if (reduceMotion) {
    return <span>{char}</span>;
  }
  return (
    <span className="relative inline-block">
      <span className="invisible">{char}</span>
      <motion.span className="absolute inset-0" style={{ opacity }}>
        {char}
      </motion.span>
    </span>
  );
}
