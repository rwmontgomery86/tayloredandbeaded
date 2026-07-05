import Link from "next/link";
import { cn } from "@/lib/utils";

const variants = {
  primary:
    "bg-mauve text-cream hover:bg-mauve-deep border border-transparent",
  outline:
    "border border-ink/25 text-ink hover:border-ink/60 bg-transparent",
  ghost: "text-ink hover:text-mauve-deep bg-transparent",
} as const;

const base =
  "inline-flex items-center justify-center gap-2 rounded-full px-7 py-3 text-xs font-medium tracking-[0.18em] uppercase transition-colors duration-300 disabled:opacity-50 disabled:pointer-events-none";

type Variant = keyof typeof variants;

export default function Button({
  variant = "primary",
  className,
  href,
  children,
  ...props
}: React.ComponentProps<"button"> & { variant?: Variant; href?: string }) {
  if (href) {
    return (
      <Link href={href} className={cn(base, variants[variant], className)}>
        {children}
      </Link>
    );
  }
  return (
    <button className={cn(base, variants[variant], className)} {...props}>
      {children}
    </button>
  );
}
