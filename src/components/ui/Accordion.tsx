"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";

/**
 * Native details/summary accordion with a grid-rows height transition
 * (animating grid-template-rows, not height, per motion guidance).
 */
export default function Accordion({
  items,
}: {
  items: { id: string; question: string; answer: string }[];
}) {
  const [open, setOpen] = useState<string | null>(null);

  return (
    <ul className="divide-y divide-ink/10 border-y border-ink/10">
      {items.map((item) => {
        const isOpen = open === item.id;
        return (
          <li key={item.id}>
            <button
              onClick={() => setOpen(isOpen ? null : item.id)}
              aria-expanded={isOpen}
              className="flex w-full items-baseline justify-between gap-6 py-5 text-left"
            >
              <span className="font-serif text-lg leading-snug">
                {item.question}
              </span>
              <span
                aria-hidden
                className={cn(
                  "shrink-0 font-serif text-xl text-mauve-deep transition-transform duration-300",
                  isOpen && "rotate-45",
                )}
              >
                +
              </span>
            </button>
            <div
              className={cn(
                "grid transition-[grid-template-rows] duration-400 ease-out",
                isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]",
              )}
            >
              <div className="overflow-hidden">
                <p className="max-w-prose pb-6 text-sm leading-relaxed text-ink-soft">
                  {item.answer}
                </p>
              </div>
            </div>
          </li>
        );
      })}
    </ul>
  );
}
