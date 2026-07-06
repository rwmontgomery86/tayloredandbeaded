# DESIGN.md — Taylored & Beaded

Derived from the client-approved homepage mockup (`assets/mockup.png`) and brand collateral (`assets/image0.png` price menu, circular logo).

## Color

Strategy: **Committed porcelain** (adopted July 2026, replacing the original warm cream after a palette lab — client wanted less brown). Cool off-white ground carries the entire surface; a dusty rose is the single accent for actions, blush/sage for decorative tints only. Colorfulness comes from the jewelry photography, never from the UI.

- `--color-cream: #f7f8f8` — page ground (cool porcelain off-white)
- `--color-cream-dark: #eceef0` — alternate section bands, image placeholders
- `--color-ink: #33363a` — text; cool near-black, never #000
- `--color-ink-soft: #6e7378` — secondary text, eyebrows
- `--color-mauve: #c39aa5` — buttons, key accents (dusty cool rose)
- `--color-mauve-deep: #a67a87` — hover/emphasis
- `--color-blush: #e8dee3` — tints, badges, decorative fills
- `--color-sage: #aeb9b5` — secondary decorative (florals, eucalyptus-leaning)

Light theme only. Scene: a shopper browsing on her phone in daylight; jewelry colors must read true against a clean gallery-like ground. Token names (cream/mauve/…) kept for stability even though values cooled.

## Typography

- Display serif: **Bodoni Moda** (variable, + true italics) via next/font — matches the fashion-didone lettering of Taylor's printed price menu. Headlines ≥ ~1.4rem only; italics carry accent words ("your story.").
- Sans: **Jost** for nav, labels, body, UI. Eyebrow style: 0.75rem, tracking 0.2em, uppercase, ink-soft.
- Fluid headline scale with clamp(); hero ~clamp(2.5rem, 6vw, 4.5rem), section headings ~clamp(1.9rem, 3.5vw, 2.9rem).
- Body max width 65–75ch.

## Shape language

- Organic and soft: blob-masked photos (CSS border-radius `40% 60% 55% 45% / 50% 45% 60% 50%` or SVG clipPath), `rounded-full` buttons and pills, `rounded-[2rem]` cards/images.
- Delicate line-art florals (1–1.25px stroke) as absolutely-positioned background decor, `aria-hidden`.
- Thin-stroke icons only; heart ♥ and sparkle ✦ motifs used sparingly as punctuation.
- Hairline rules (1px, ink at 10–15% opacity) to separate menu-style rows, echoing the price menu.

## Motion

- Framer Motion; opacity + ≤24px translate only; duration 0.5–0.8s; ease `[0.22, 1, 0.36, 1]`; `once: true` viewport reveals with -80px margin.
- Hero animates on mount with 0.08s stagger. Decorative florals drift ±8px over 6–8s.
- Hover states are CSS-only: image scale 1.03, underline-grow, button color shifts.
- Full `prefers-reduced-motion` support; content never hidden without JS.

## Components

- `Section` (py-20 md:py-28; cream/cream-dark/blush bands) + `Container` (max-w-6xl, px-5 md:px-8)
- `Button` (primary mauve pill / outline / ghost; uppercase tracked 0.18em text)
- `SectionHeading` (eyebrow + serif headline with em italics)
- `eyebrow` and `link-underline` utility classes in globals.css
