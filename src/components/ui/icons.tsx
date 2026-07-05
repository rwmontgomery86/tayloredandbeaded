/**
 * Hand-drawn thin-stroke icon set. Stroke 1.1 keeps the delicate,
 * illustrated feel of the brand collateral; icon libraries read too
 * mechanical against the didone serif.
 */

function Svg({
  children,
  className,
  size = 24,
}: {
  children: React.ReactNode;
  className?: string;
  size?: number;
}) {
  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.1"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
      className={className}
    >
      {children}
    </svg>
  );
}

export function HeartIcon(props: { className?: string; size?: number; filled?: boolean }) {
  return (
    <Svg {...props}>
      <path
        d="M12 20c-5.2-3.6-8-6.6-8-10a4.4 4.4 0 0 1 8-2.6A4.4 4.4 0 0 1 20 10c0 3.4-2.8 6.4-8 10Z"
        fill={props.filled ? "currentColor" : "none"}
      />
    </Svg>
  );
}

export function SparkleIcon(props: { className?: string; size?: number }) {
  return (
    <Svg {...props}>
      <path d="M12 4c.7 3.9 2.1 5.3 6 6-3.9.7-5.3 2.1-6 6-.7-3.9-2.1-5.3-6-6 3.9-.7 5.3-2.1 6-6Z" />
      <path d="M18.5 15.5c.3 1.6.9 2.2 2.5 2.5-1.6.3-2.2.9-2.5 2.5-.3-1.6-.9-2.2-2.5-2.5 1.6-.3 2.2-.9 2.5-2.5Z" />
    </Svg>
  );
}

export function GemIcon(props: { className?: string; size?: number }) {
  return (
    <Svg {...props}>
      <path d="M7 4h10l4 5-9 11L3 9l4-5Z" />
      <path d="M3 9h18M9.5 9 12 20 14.5 9M7 4l2.5 5M17 4l-2.5 5" />
    </Svg>
  );
}

export function GiftIcon(props: { className?: string; size?: number }) {
  return (
    <Svg {...props}>
      <rect x="4" y="9" width="16" height="11" rx="1" />
      <path d="M4 13h16M12 9v11M12 9c-1.8 0-4.5-.6-4.5-2.7C7.5 4.6 9 4 10 4.5c1.3.6 2 2.6 2 4.5Zm0 0c1.8 0 4.5-.6 4.5-2.7C16.5 4.6 15 4 14 4.5c-1.3.6-2 2.6-2 4.5Z" />
    </Svg>
  );
}

export function BeadsIcon(props: { className?: string; size?: number }) {
  return (
    <Svg {...props}>
      <path d="M4 14c2.5-4.5 13.5-4.5 16 0" />
      <circle cx="5" cy="13.2" r="1.7" />
      <circle cx="9.2" cy="11.2" r="1.7" />
      <circle cx="14.8" cy="11.2" r="1.7" />
      <circle cx="19" cy="13.2" r="1.7" />
    </Svg>
  );
}

export function InstagramIcon(props: { className?: string; size?: number }) {
  return (
    <Svg {...props}>
      <rect x="4" y="4" width="16" height="16" rx="4.5" />
      <circle cx="12" cy="12" r="3.6" />
      <circle cx="16.8" cy="7.2" r="0.4" fill="currentColor" />
    </Svg>
  );
}

export function MenuIcon(props: { className?: string; size?: number }) {
  return (
    <Svg {...props}>
      <path d="M4 8h16M4 16h16" />
    </Svg>
  );
}

export function CloseIcon(props: { className?: string; size?: number }) {
  return (
    <Svg {...props}>
      <path d="M6 6l12 12M18 6 6 18" />
    </Svg>
  );
}

export function ArrowRightIcon(props: { className?: string; size?: number }) {
  return (
    <Svg {...props}>
      <path d="M4 12h16m0 0-5-5m5 5-5 5" />
    </Svg>
  );
}

export function ChevronIcon(props: { className?: string; size?: number }) {
  return (
    <Svg {...props}>
      <path d="m9 5 7 7-7 7" />
    </Svg>
  );
}
