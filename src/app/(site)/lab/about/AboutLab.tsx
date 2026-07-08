"use client";

import VariantLab from "@/components/lab/VariantLab";
import AboutQuietLetter from "@/components/about/AboutQuietLetter";
import AboutTypesetNote from "@/components/about/AboutTypesetNote";
import AboutStudioEditorial from "@/components/about/AboutStudioEditorial";

const VARIANTS = [
  {
    id: "quiet-letter",
    name: "A · Quiet Letter",
    blurb:
      "Safe — a calm interior page: modest heading, one strong sticky portrait, the full letter typeset beside it. Contrast with the homepage as a feature.",
    Comp: AboutQuietLetter,
  },
  {
    id: "typeset-note",
    name: "B · Typeset Note",
    blurb:
      "Medium — the letter as stationery: one centered column, an oversized italic 'Hi everyone!', a small round portrait like a seal, and one snapshot tucked mid-letter.",
    Comp: AboutTypesetNote,
  },
  {
    id: "studio-editorial",
    name: "C · Studio Editorial",
    blurb:
      "Bold — magazine profile: full-bleed studio opener echoing the hero, the letter interleaved with photography, and the toast as a full-width pull-quote band.",
    Comp: AboutStudioEditorial,
  },
] as const;

export default function AboutLab() {
  return (
    <VariantLab title="About page" variants={VARIANTS} previewHeight={1100} />
  );
}
