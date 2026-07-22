"use client";

import { useEffect, useRef, useState } from "react";
import { ChevronIcon } from "@/components/ui/icons";
import { cn } from "@/lib/utils";

export interface LabVariant {
  id: string;
  name: string;
  blurb: string;
  Comp: React.ComponentType;
}

const PREVIEW_WIDTH = 1280;

/** Renders a full section scaled down to fit its container width. */
export function ScaledPreview({
  height,
  designWidth = PREVIEW_WIDTH,
  children,
}: {
  height: number;
  designWidth?: number;
  children: React.ReactNode;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(0.25);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const measure = () => {
      if (el.clientWidth > 0) setScale(el.clientWidth / designWidth);
    };
    // Measure synchronously — ResizeObserver callbacks are frame-deferred
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, [designWidth]);

  return (
    <div
      ref={ref}
      className="relative w-full overflow-hidden bg-cream"
      style={{ height: height * scale }}
    >
      <div
        className="pointer-events-none absolute top-0 left-0 select-none"
        style={{
          width: designWidth,
          height,
          transform: `scale(${scale})`,
          transformOrigin: "top left",
        }}
        aria-hidden
        // Previews are illustrative duplicates; keep them out of the a11y tree
        inert
      >
        {children}
      </div>
    </div>
  );
}

/**
 * Design-lab shell: full-size click-through viewer (pills + arrows) with
 * a scaled side-by-side comparison grid beneath. Used by /lab/* routes.
 */
export default function VariantLab({
  title,
  variants,
  previewHeight = 720,
}: {
  title: string;
  variants: readonly LabVariant[];
  previewHeight?: number;
}) {
  const [active, setActive] = useState(0);
  const variant = variants[active];
  const ActiveComp = variant.Comp;

  return (
    <div className="pb-24">
      {/* lab header */}
      <div className="border-b border-ink/10 bg-cream-dark/60">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4 px-5 py-4 md:px-8">
          <div>
            <p className="eyebrow">Design lab</p>
            <h1 className="font-serif text-2xl">
              {title} <em className="italic">variants</em>
            </h1>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() =>
                setActive((active + variants.length - 1) % variants.length)
              }
              aria-label="Previous variant"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-ink/20 transition-colors hover:border-ink/60"
            >
              <ChevronIcon size={15} className="-scale-x-100" />
            </button>
            {variants.map((v, i) => (
              <button
                key={v.id}
                onClick={() => setActive(i)}
                aria-current={i === active}
                className={cn(
                  "rounded-full border px-4 py-2 text-[0.65rem] tracking-[0.14em] uppercase transition-colors",
                  i === active
                    ? "border-ink bg-ink text-cream"
                    : "border-ink/20 hover:border-ink/60",
                )}
              >
                {v.name}
              </button>
            ))}
            <button
              onClick={() => setActive((active + 1) % variants.length)}
              aria-label="Next variant"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-ink/20 transition-colors hover:border-ink/60"
            >
              <ChevronIcon size={15} />
            </button>
          </div>
        </div>
      </div>

      {/* full-size viewer — key remounts so the entrance motion replays */}
      <div className="border-b border-ink/10">
        <div key={variant.id}>
          <ActiveComp />
        </div>
        <p className="mx-auto max-w-6xl px-5 py-6 text-sm text-ink-soft md:px-8">
          <strong className="font-medium text-ink">{variant.name}.</strong>{" "}
          {variant.blurb}
        </p>
      </div>

      {/* side-by-side comparison */}
      <div className="mx-auto max-w-7xl px-5 pt-14 md:px-8">
        <p className="eyebrow mb-6 text-center">Side by side</p>
        <div className="grid gap-6 md:grid-cols-3">
          {variants.map((v, i) => (
            // div+role, not <button>: previews may contain real buttons
            // (accordions, CTAs) and nested buttons are invalid HTML
            <div
              key={v.id}
              role="button"
              tabIndex={0}
              onClick={() => {
                setActive(i);
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  setActive(i);
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }
              }}
              className={cn(
                "cursor-pointer overflow-hidden rounded-2xl border text-left transition-colors",
                i === active
                  ? "border-ink"
                  : "border-ink/10 hover:border-ink/40",
              )}
            >
              <ScaledPreview height={previewHeight}>
                <v.Comp />
              </ScaledPreview>
              <div className="border-t border-ink/10 px-4 py-3">
                <p className="text-[0.68rem] tracking-[0.16em] uppercase">
                  {v.name}
                </p>
                <p className="mt-1 text-xs leading-relaxed text-ink-soft">
                  {v.blurb}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
