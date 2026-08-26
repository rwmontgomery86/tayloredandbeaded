# 04 — Customization singleton + quote module (vitest arrives here)

Spec: [spec.md](../spec.md)

**What to build:** The pricing brain of the configure-then-inquire model, and
Taylor's control panel for it. In the Studio, Taylor edits a Customization
document — bead colors with swatches, the charm list, the bag-scarf price, the
initial-charm price — seeded with the brief's values (six colors; MAMA, Heart,
Cross, Smiley Face, Bow; $5 scarf; $3 initial charm). In code, a pure quote
module turns (product, chosen configuration, customization options, pricing)
into line items and a total — the single place money math lives, later shared
by product pages and the order-request route. This ticket introduces the
repo's first test runner.

**Blocked by:** None — can start immediately.

**Status:** done (2026-08-26)

- [x] Customization singleton schema exists, appears in the Studio's singleton
      structure alongside Pricing, and is seeded with the brief's values
- [x] Data layer exposes customization options with a seeded fallback when
      Sanity is unconfigured, consistent with existing fetches
- [x] The revalidation webhook tag map covers the new singleton
- [x] Quote module computes line items and totals as a pure function: category
      base prices, premade price overrides, initial charm, matching bracelet
      (from bracelets base price), bag scarf, and combinations
- [x] Vitest configured with a test script; quote module covered by
      table-driven tests including missing-options fallback behavior
- [x] Lint and typecheck pass; tests green
