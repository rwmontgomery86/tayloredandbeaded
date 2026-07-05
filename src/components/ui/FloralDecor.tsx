import { cn } from "@/lib/utils";

/**
 * Delicate line-art floral, absolutely positioned behind content.
 * Color via currentColor; place with text-sage/40 etc.
 */
export default function FloralDecor({
  className,
  flip = false,
}: {
  className?: string;
  flip?: boolean;
}) {
  return (
    <svg
      viewBox="0 0 200 320"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.1"
      strokeLinecap="round"
      aria-hidden
      className={cn(
        "pointer-events-none absolute select-none",
        flip && "-scale-x-100",
        className,
      )}
    >
      {/* main stem */}
      <path d="M100 315C92 250 88 190 102 138 114 94 138 62 168 46" />
      {/* open bloom */}
      <path d="M168 46c-14-2-22-10-24-24 12-4 24 2 28 12M168 46c2-14 10-22 24-24 4 12-2 24-12 28M168 46c14 2 22 10 24 24-12 4-24-2-28-12M168 46c-2 14-10 22-24 24-4-12 2-24 12-28" />
      <circle cx="168" cy="46" r="4.5" />
      {/* leaves along the stem */}
      <path d="M96 260c-22-4-34-16-36-38 22 4 34 16 36 38Z" />
      <path d="M98 208c20-8 26-22 22-44-20 8-27 22-22 44Z" />
      <path d="M108 120c-20-2-31-12-34-32 20 2 31 12 34 32Z" />
      {/* small bud */}
      <path d="M132 84c-2-12 2-20 12-26 6 10 4 20-4 28" />
    </svg>
  );
}
