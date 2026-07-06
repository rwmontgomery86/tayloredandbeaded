"use client";

import { useState } from "react";
import { ChevronIcon } from "@/components/ui/icons";
import { cn } from "@/lib/utils";
import { ScaledPreview, type LabVariant } from "./VariantLab";

/** iPhone-ish canvas the mobile variants are designed against. */
const PHONE_WIDTH = 390;
const PHONE_HEIGHT = 760;

/** Simple dark-bezel phone frame around a fixed 390×760 canvas. */
function PhoneFrame({ children }: { children: React.ReactNode }) {
  return (
    <div className="inline-block rounded-[3rem] border-[10px] border-ink bg-ink shadow-[0_30px_70px_-30px_rgba(51,54,58,0.5)]">
      <div
        className="relative overflow-hidden rounded-[2.4rem] bg-cream"
        style={{ width: PHONE_WIDTH, height: PHONE_HEIGHT }}
      >
        {children}
      </div>
    </div>
  );
}

/**
 * Mobile-focused design-lab shell: variants are designed against a fixed
 * phone-width canvas (Tailwind breakpoints track the browser viewport, so
 * responsive components can't be previewed at phone width inside a desktop
 * page — variants here are dedicated mobile compositions instead). Offers a
 * full-size phone viewer with a desktop-reference toggle, plus a scaled
 * side-by-side comparison grid. Used by /lab/* routes.
 */
export default function MobileVariantLab({
  title,
  variants,
  DesktopReference,
  desktopNote,
}: {
  title: string;
  variants: readonly LabVariant[];
  /** The (unchanged) desktop rendering, shown for context. */
  DesktopReference?: React.ComponentType;
  desktopNote?: string;
}) {
  const [active, setActive] = useState(0);
  const [view, setView] = useState<"phone" | "desktop">("phone");
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
      <div className="border-b border-ink/10 bg-cream-dark/30">
        {DesktopReference && (
          <div className="flex justify-center gap-2 pt-8">
            {(["phone", "desktop"] as const).map((mode) => (
              <button
                key={mode}
                onClick={() => setView(mode)}
                aria-current={view === mode}
                className={cn(
                  "rounded-full border px-4 py-2 text-[0.65rem] tracking-[0.14em] uppercase transition-colors",
                  view === mode
                    ? "border-ink bg-ink text-cream"
                    : "border-ink/20 hover:border-ink/60",
                )}
              >
                {mode === "phone" ? "Mobile" : "Desktop reference"}
              </button>
            ))}
          </div>
        )}

        {view === "phone" || !DesktopReference ? (
          <div className="flex justify-center px-5 py-10">
            <PhoneFrame key={variant.id}>
              <ActiveComp />
            </PhoneFrame>
          </div>
        ) : (
          <div className="mx-auto max-w-6xl px-5 py-10 md:px-8">
            <div className="overflow-hidden rounded-2xl border border-ink/10">
              <ScaledPreview height={720}>
                <DesktopReference />
              </ScaledPreview>
            </div>
            <p className="mt-4 text-center text-sm text-ink-soft">
              {desktopNote ??
                "Desktop stays as-is — every variant only changes the layout below the tablet breakpoint."}
            </p>
          </div>
        )}

        <p className="mx-auto max-w-6xl px-5 pb-6 text-center text-sm text-ink-soft md:px-8">
          <strong className="font-medium text-ink">{variant.name}.</strong>{" "}
          {variant.blurb}
        </p>
      </div>

      {/* side-by-side comparison */}
      <div className="mx-auto max-w-6xl px-5 pt-14 md:px-8">
        <p className="eyebrow mb-6 text-center">Side by side</p>
        <div className="grid gap-6 md:grid-cols-3">
          {variants.map((v, i) => (
            <button
              key={v.id}
              onClick={() => {
                setActive(i);
                setView("phone");
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
              className={cn(
                "overflow-hidden rounded-2xl border text-left transition-colors",
                i === active
                  ? "border-ink"
                  : "border-ink/10 hover:border-ink/40",
              )}
            >
              <ScaledPreview height={PHONE_HEIGHT} designWidth={PHONE_WIDTH}>
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
