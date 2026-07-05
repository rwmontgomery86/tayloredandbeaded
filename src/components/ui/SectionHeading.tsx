import { cn } from "@/lib/utils";

/**
 * Eyebrow label + serif headline. Italic accent words are passed as
 * <em> inside `children` and styled here.
 */
export default function SectionHeading({
  eyebrow,
  children,
  align = "center",
  className,
}: {
  eyebrow?: string;
  children: React.ReactNode;
  align?: "center" | "left";
  className?: string;
}) {
  return (
    <div
      className={cn(
        "mb-12 md:mb-16",
        align === "center" && "text-center",
        className,
      )}
    >
      {eyebrow && <p className="eyebrow mb-3">{eyebrow}</p>}
      <h2 className="font-serif text-[clamp(1.9rem,3.5vw,2.9rem)] font-medium leading-[1.15] [&_em]:font-normal [&_em]:italic">
        {children}
      </h2>
    </div>
  );
}
