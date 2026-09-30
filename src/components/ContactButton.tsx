interface ContactButtonProps {
  href?: string;
  label?: string;
  className?: string;
}

export default function ContactButton({
  href = 'mailto:hello@akhilesh.dev',
  label = 'Contact Me',
  className = '',
}: ContactButtonProps) {
  return (
    <a
      href={href}
      className={`inline-block rounded-full px-6 min-[380px]:px-8 sm:px-10 md:px-12 text-white font-medium uppercase tracking-widest whitespace-nowrap transition-opacity duration-200 hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white ${className}`}
      style={{
        background:
          'linear-gradient(123deg, #18011F 7%, #B600A8 37%, #7621B0 72%, #BE4C00 100%)',
        boxShadow:
          '0px 4px 4px rgba(181,1,167,0.25), inset 4px 4px 12px #7721B1',
        outline: '2px solid #FFFFFF',
        outlineOffset: '-3px',
      }}
    >
      {label}
    </a>
  );
}
