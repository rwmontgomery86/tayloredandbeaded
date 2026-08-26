# 01 — Remove anklets

Spec: [spec.md](../spec.md)

**What to build:** Anklets disappear from the storefront entirely. A shopper
browsing the site sees only necklaces, bracelets, and bag charms; a visitor
following an old anklets link lands on the shop page instead of a 404. In the
Studio, Taylor's existing anklet products are unpublished — invisible on the
site but recoverable if she ever brings them back.

**Blocked by:** None — can start immediately.

**Status:** ready-for-agent

- [ ] Anklets removed from the category constants, navigation, and every
      category-driven surface (shop pages, homepage tiles, footers, filters)
- [ ] Anklets removed from the pricing schema/singleton UI and from seed data
- [ ] The old anklets category URL issues a permanent redirect to the shop
- [ ] Existing anklet product documents in Sanity are unpublished, not deleted
      (via script or documented manual step)
- [ ] Lint and typecheck (build) pass; no dangling anklet references remain
