"use client";

import { useEffect, useRef, useState } from "react";
import HeroArch from "@/components/home/heroes/HeroArch";
import HeroEditorial from "@/components/home/heroes/HeroEditorial";
import HeroFullBleed from "@/components/home/heroes/HeroFullBleed";
import { ChevronIcon } from "@/components/ui/icons";
import { cn } from "@/lib/utils";

const VARIANTS = [
  {
    id: "arch",
    name: "A · Boutique Arch",
    blurb:
      "Safe evolution — the current split layout, with Taylor in a boutique-window arch instead of the oval.",
    Comp: HeroArch,
  },
  {
    id: "editorial",
    name: "B · Editorial Split",
    blurb:
      "Medium departure — left-aligned magazine grid, hairline rules, and two clean rectangles hung like a gallery wall.",
    Comp: HeroEditorial,
  },
  {
    id: "fullbleed",
    name: "C · Full-Bleed",
    blurb:
      "Bold — edge-to-edge campaign photo of the jewelry with the headline set on the image. The product is the hero.",
    Comp: HeroFullBleed,
  },
] as const;

const PREVIEW_WIDTH = 1280;
const PREVIEW_HEIGHT = 720;

/** Renders a full hero scaled down to fit its container width. */
function ScaledPreview({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(0.25);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const ro = new ResizeObserver(() =>
      setScale(el.clientWidth / PREVIEW_WIDTH),
    );
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className="relative w-full overflow-hidden bg-cream"
      style={{ height: PREVIEW_HEIGHT * scale }}
    >
      <div
        className="pointer-events-none absolute top-0 left-0 select-none"
        style={{
          width: PREVIEW_WIDTH,
          height: PREVIEW_HEIGHT,
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

export default function HeroLab() {
  const [active, setActive] = useState(0);
  const variant = VARIANTS[active];
  const ActiveComp = variant.Comp;

  return (
    <div className="pb-24">
      {/* lab header */}
      <div className="border-b border-ink/10 bg-cream-dark/60">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4 px-5 py-4 md:px-8">
          <div>
            <p className="eyebrow">Design lab</p>
            <h1 className="font-serif text-2xl">
              Hero <em className="italic">variants</em>
            </h1>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setActive((active + VARIANTS.length - 1) % VARIANTS.length)}
              aria-label="Previous variant"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-ink/20 transition-colors hover:border-ink/60"
            >
              <ChevronIcon size={15} className="-scale-x-100" />
            </button>
            {VARIANTS.map((v, i) => (
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
              onClick={() => setActive((active + 1) % VARIANTS.length)}
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
        <p className="mx-auto max-w-6xl px-5 pb-6 text-sm text-ink-soft md:px-8">
          <strong className="font-medium text-ink">{variant.name}.</strong>{" "}
          {variant.blurb}
        </p>
      </div>

      {/* side-by-side comparison */}
      <div className="mx-auto max-w-7xl px-5 pt-14 md:px-8">
        <p className="eyebrow mb-6 text-center">Side by side</p>
        <div className="grid gap-6 md:grid-cols-3">
          {VARIANTS.map((v, i) => (
            <button
              key={v.id}
              onClick={() => {
                setActive(i);
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
              className={cn(
                "overflow-hidden rounded-2xl border text-left transition-colors",
                i === active
                  ? "border-ink"
                  : "border-ink/10 hover:border-ink/40",
              )}
            >
              <ScaledPreview>
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
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
