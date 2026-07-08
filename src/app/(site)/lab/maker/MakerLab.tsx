"use client";

import VariantLab from "@/components/lab/VariantLab";
import MakerStoryBand from "@/components/home/makers/MakerStoryBand";
import MakerPullQuote from "@/components/home/makers/MakerPullQuote";
import MakerFullBleed from "@/components/home/makers/MakerFullBleed";

const VARIANTS = [
  {
    id: "story-band",
    name: "A · Story Band",
    blurb:
      "Safe evolution — today's cream band with a clean rounded photo instead of the blob, story-first copy, an italic pull-line, and a 'Love, Taylor' signature.",
    Comp: MakerStoryBand,
  },
  {
    id: "pull-quote",
    name: "B · Pull-Quote Editorial",
    blurb:
      "Medium departure — typography carries the story: a huge Bodoni quote between hairline rules, then two captioned squares (the maker, the practice) and the read-more link.",
    Comp: MakerPullQuote,
  },
  {
    id: "studio",
    name: "C · Full-Bleed Studio",
    blurb:
      "Bold — edge-to-edge behind-the-scenes photo with the story overlaid on the right, mirroring the hero's composition so the homepage bookends.",
    Comp: MakerFullBleed,
  },
] as const;

export default function MakerLab() {
  return (
    <VariantLab title="Meet the Maker" variants={VARIANTS} previewHeight={640} />
  );
}
