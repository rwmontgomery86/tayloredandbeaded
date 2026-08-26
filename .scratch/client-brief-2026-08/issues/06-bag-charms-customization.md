# 06 — Bag Charms customization

Spec: [spec.md](../spec.md)

**What to build:** The full configurator the brief centers on. In a dedicated
Bag Charms section, a shopper picks one bead color from Taylor's palette
(rendered as swatches), types an initial or short name (capped ~12
characters), selects any combination of charms (MAMA, Heart, Cross, Smiley
Face, Bow), optionally adds the matching bag scarf (+$5), watches the total
update, and submits the same order request flow — Taylor's email spelling out
the complete configuration.

**Blocked by:** 05 — Necklace order request (reuses its request form, API
route, and email composition).

**Status:** done (2026-08-26)

- [x] Bag Charms is a clearly presented dedicated section
- [x] Configurator offers one bead-color choice (swatches from the
      Customization singleton), one initial-or-name text field with the
      character cap, multi-select charms, and the bag-scarf add-on
- [x] Live total reflects every choice via the quote module; new quote cases
      (scarf, charm combinations, personalization) covered by tests
- [x] Submitted requests carry color, personalization text, charm selection,
      and scarf choice into both emails
- [x] Configurator is keyboard- and screen-reader-operable
- [x] Option values (colors, charms, prices) render from the Studio-editable
      Customization document, not hardcoded values
