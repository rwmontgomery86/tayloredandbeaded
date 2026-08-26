# 02 — Year-round vs premade across the catalog, 14 styles seeded

Spec: [spec.md](../spec.md)

**What to build:** Shoppers can always tell an always-orderable style from a
one-off piece. Every product is either year-round (made to order, never shows
sold out) or premade (one of a kind, can show sold). Badges make the
distinction obvious on cards and detail pages, and the necklaces section
presents the year-round collection — all 14 named styles from the client
brief (Parker, Cameron, Faith, Ryan, Hannah, Lynsey, Mandy, Sara, Carol,
Tanner, Braelyn, Alivia, Ansley, Sierra), pre-created with their bead/color
descriptions and no images, awaiting photos in the Studio.

**Blocked by:** None — can start immediately.

**Status:** ready-for-agent

- [ ] Product schema gains an availability field (year-round | premade) with a
      sensible default for existing documents
- [ ] Data layer exposes availability; year-round products never render a sold
      state, premade products keep the existing sold behavior
- [ ] Cards and detail pages show a clear made-to-order vs one-of-a-kind badge
- [ ] The necklaces browsing experience clearly presents the year-round
      collection, distinguished from premade pieces
- [ ] Seed script (idempotent) creates the 14 named styles as year-round
      handmade necklaces with brief descriptions and no images
- [ ] Cards render acceptably for image-less products
- [ ] Seed fallback data reflects the new field so the unconfigured-Sanity
      path behaves identically
