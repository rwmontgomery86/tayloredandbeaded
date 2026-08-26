# 03 — The Edit

Spec: [spec.md](../spec.md)

**What to build:** Taylor can offer necklaces she didn't make, clearly
separated from her handmade work. A shopper visiting The Edit sees Taylor's
intro copy ("pieces I personally love… curated rather than handmade by me")
and the curated pieces, each badged as curated; a shopper browsing the
handmade necklace pages never encounters a curated piece mixed in.

**Blocked by:** 02 — Year-round vs premade (serializes product-card badge
changes so the two tickets don't collide on the same components).

**Status:** ready-for-agent

- [ ] Product schema gains an origin field (handmade | curated) defaulting to
      handmade for existing documents
- [ ] Handmade category listings and year-round queries exclude curated
      products
- [ ] Curated products carry a visible "Curated" badge on cards and detail
      pages
- [ ] The Edit exists as a collection document with the brief's intro copy,
      rendered by the existing collection page machinery, and is seeded
- [ ] The Edit is reachable from site navigation
- [ ] Seed fallback data covers the curated path
