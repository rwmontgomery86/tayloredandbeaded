import { cn } from "@/lib/utils";

const backgrounds = {
  cream: "bg-cream",
  "cream-dark": "bg-cream-dark",
  blush: "bg-blush/40",
} as const;

export default function Section({
  bg = "cream",
  className,
  children,
  ...props
}: React.ComponentProps<"section"> & { bg?: keyof typeof backgrounds }) {
  return (
    <section
      className={cn("relative py-20 md:py-28", backgrounds[bg], className)}
      {...props}
    >
      {children}
    </section>
  );
}

export function Container({
  className,
  children,
  wide = false,
}: {
  className?: string;
  children: React.ReactNode;
  wide?: boolean;
}) {
  return (
    <div
      className={cn(
        "mx-auto px-5 md:px-8",
        wide ? "max-w-7xl" : "max-w-6xl",
        className,
      )}
    >
      {children}
    </div>
  );
}
