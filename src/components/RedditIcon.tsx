interface RedditIconProps {
  size?: number;
  className?: string;
}

export default function RedditIcon({ size = 24, className }: RedditIconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      {/* Head */}
      <circle cx="12" cy="13.5" r="7.5" />
      {/* Antenna */}
      <path d="M12 6V4" />
      <circle cx="12" cy="2.8" r="1.1" fill="currentColor" stroke="none" />
      {/* Ears */}
      <circle cx="3.5" cy="12" r="1.6" />
      <circle cx="20.5" cy="12" r="1.6" />
      {/* Eyes */}
      <circle cx="9.2" cy="12.8" r="1" fill="currentColor" stroke="none" />
      <circle cx="14.8" cy="12.8" r="1" fill="currentColor" stroke="none" />
      {/* Smile */}
      <path d="M8.5 15.5c1 1.1 2.2 1.6 3.5 1.6s2.5-.5 3.5-1.6" />
    </svg>
  );
}
