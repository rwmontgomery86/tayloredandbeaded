/**
 * One-off: replace The Edit's three invented placeholder pieces with the
 * seven real curated stone necklaces, photos included.
 *
 * Creates the products (deterministic ids, createIfNotExists like
 * seed-sanity.ts), uploads their photos (deduped by originalFilename),
 * points collection-the-edit at them in order, then unpublishes the three
 * placeholders (ref-strip + unpublish, like unpublish-sample-products.ts).
 *
 * Run with:
 *   PHOTOS_DIR=/path/to/photos npx sanity exec scripts/setup-the-edit.ts --with-user-token
 */
import { createReadStream } from "node:fs";
import path from "node:path";
import { getCliClient } from "sanity/cli";

const PIECES = [
  {
    name: "Sage Marble Stone Necklace",
    slug: "sage-marble-stone-necklace",
    description:
      "Softly marbled sage-green stones in a chunky, squared silhouette.",
    colors: [
      { label: "Sage", hex: "#8CA183" },
      { label: "Mist", hex: "#AEBFA0" },
    ],
    photos: ["_DSC0581.jpeg", "_DSC0585.jpeg"],
  },
  {
    name: "Bold Multicolor Stone Necklace",
    slug: "bold-multicolor-stone-necklace",
    description:
      "Vivid stone nuggets in turquoise, amber, fuchsia, black, and cream strung into one bold statement.",
    colors: [
      { label: "Turquoise", hex: "#4FB6B2" },
      { label: "Amber", hex: "#E89B3C" },
      { label: "Fuchsia", hex: "#C2367E" },
    ],
    photos: ["_DSC0666.jpeg", "_DSC0667.jpeg"],
  },
  {
    name: "Peach and Cream Stone Necklace",
    slug: "peach-and-cream-stone-necklace",
    description:
      "Warm peach, blush, and cream stones with soft olive undertones.",
    colors: [
      { label: "Peach", hex: "#F0A47C" },
      { label: "Blush", hex: "#F3C1B6" },
      { label: "Cream", hex: "#F5E9D6" },
    ],
    photos: ["_DSC0672_Original.JPG", "_DSC0673_Original.JPG"],
  },
  {
    name: "Pastel Multicolor Stone Necklace",
    slug: "pastel-multicolor-stone-necklace",
    description:
      "Powdery pastels—periwinkle, mint, peach, and butter—in smooth oversized stones.",
    colors: [
      { label: "Periwinkle", hex: "#A9B8DC" },
      { label: "Mint", hex: "#A8D8B4" },
      { label: "Peach", hex: "#F6C6A8" },
    ],
    photos: [
      "_DSC0676_Original.JPG",
      "_DSC0677_Original.JPG",
      "_DSC0678_Original.JPG",
    ],
  },
  {
    name: "Brown and Cream Stone Necklace",
    slug: "brown-and-cream-stone-necklace",
    description:
      "Rich caramel and cream stones with warm, honeyed marbling.",
    colors: [
      { label: "Caramel", hex: "#8B5A2B" },
      { label: "Cream", hex: "#EFE3CC" },
    ],
    photos: [
      "_DSC0680_Original.JPG",
      "_DSC0681_Original.JPG",
      "_DSC0683_Original.JPG",
    ],
  },
  {
    name: "Blue and Green Stone Necklace",
    slug: "blue-and-green-stone-necklace",
    description:
      "Cool blues and greens—sky, cobalt, jade, and mint—in one easy statement strand.",
    colors: [
      { label: "Sky", hex: "#7FA9D8" },
      { label: "Cobalt", hex: "#2F4B9E" },
      { label: "Jade", hex: "#3E8E5A" },
    ],
    photos: ["_DSC0687.jpeg", "_DSC0688.jpeg", "_DSC0692.jpeg"],
  },
  {
    name: "Multicolor Cross Necklace",
    slug: "multicolor-cross-necklace",
    description:
      "Bold marbled rounds in jewel tones finished with a carved cross pendant.",
    colors: [
      { label: "Emerald", hex: "#2E6B4F" },
      { label: "Fuchsia", hex: "#C2367E" },
      { label: "Orange", hex: "#E8952F" },
    ],
    photos: ["_DSC0699.jpeg", "_DSC0701_Original.JPG"],
  },
];

const PLACEHOLDER_SLUGS = [
  "coastal-pearl-pendant",
  "tortoise-link-necklace",
  "sculpted-heart-necklace",
];

const client = getCliClient({ apiVersion: "2026-07-01" });
const rawClient = client.withConfig({ perspective: "raw" });

const photosDir = process.env.PHOTOS_DIR;
if (!photosDir) {
  console.error("Set PHOTOS_DIR to the directory containing the photos.");
  process.exit(1);
}

async function uploadImage(filename: string): Promise<string> {
  const existing = await client.fetch<string | null>(
    `*[_type == "sanity.imageAsset" && originalFilename == $filename][0]._id`,
    { filename },
  );
  if (existing) {
    console.log(`  reusing  ${filename}`);
    return existing;
  }
  const asset = await client.assets.upload(
    "image",
    createReadStream(path.join(photosDir!, filename)),
    { filename },
  );
  console.log(`  uploaded ${filename}`);
  return asset._id;
}

async function run() {
  console.log(
    `Setting up The Edit in ${client.config().projectId} / ${client.config().dataset}`,
  );

  console.log("Creating products and attaching photos…");
  for (const piece of PIECES) {
    await client.createIfNotExists({
      _id: `product-${piece.slug}`,
      _type: "product",
      name: piece.name,
      slug: { _type: "slug", current: piece.slug },
      category: "necklaces",
      origin: "curated",
      availability: "premade",
      // No price: curated necklaces follow the category pricing singleton.
      description: piece.description,
      materials: [],
      colors: piece.colors.map((c, i) => ({
        _type: "object",
        _key: `${piece.slug}-color${i}`,
        ...c,
      })),
      featured: false,
      newArrival: false,
      status: "available",
    });

    const assetIds: string[] = [];
    for (const file of piece.photos) assetIds.push(await uploadImage(file));
    const images = assetIds.map((id, i) => ({
      _type: "image",
      _key: `${piece.slug}-img${i}`,
      asset: { _type: "reference", _ref: id },
    }));

    // Raw perspective so open Studio drafts get the photos too. Anything a
    // person already uploaded is left alone (same guard as attach-product-photos).
    const docs = await rawClient.fetch<
      { _id: string; filenames?: (string | null)[] }[]
    >(
      `*[_type == "product" && slug.current == $slug]{
        _id, "filenames": images[].asset->originalFilename
      }`,
      { slug: piece.slug },
    );
    for (const doc of docs) {
      const existing = (doc.filenames ?? []).filter(Boolean) as string[];
      const ours = existing.every(
        (f) => f.startsWith("placeholder-") || piece.photos.includes(f),
      );
      if (existing.length > 0 && !ours) {
        console.log(`  skipped ${doc._id} — has other images`);
        continue;
      }
      await client
        .patch(doc._id)
        .set({ images })
        .commit({ tag: "migration.setup-the-edit" });
      console.log(`  attached ${images.length} photo(s) → ${doc._id}`);
    }
  }

  console.log("Pointing The Edit at the new pieces…");
  await client
    .patch("collection-the-edit")
    .set({
      products: PIECES.map((piece) => ({
        _type: "reference",
        _key: `the-edit-${piece.slug}`,
        _ref: `product-${piece.slug}`,
      })),
    })
    .commit({ tag: "migration.setup-the-edit" });
  console.log("  collection-the-edit updated");

  console.log("Removing the placeholder pieces…");
  const placeholders = await client.fetch<{ _id: string; name?: string }[]>(
    `*[_type == "product" && slug.current in $slugs && !(_id in path("drafts.**"))]{ _id, name }`,
    { slugs: PLACEHOLDER_SLUGS },
  );

  // Sanity refuses to unpublish while strong references exist — including
  // from drafts — so strip references first (raw perspective).
  for (const product of placeholders) {
    const referrers = await rawClient.fetch<string[]>(`*[references($id)]._id`, {
      id: product._id,
    });
    for (const referrer of referrers) {
      await rawClient
        .patch(referrer)
        .unset([`products[_ref == "${product._id}"]`])
        .commit();
      console.log(`  removed ${product._id} reference from ${referrer}`);
    }
  }

  for (const product of placeholders) {
    await client.action(
      {
        actionType: "sanity.action.document.unpublish",
        draftId: `drafts.${product._id}`,
        publishedId: product._id,
      },
      { tag: "migration.setup-the-edit" },
    );
    console.log(`  unpublished ${product.name ?? product._id}`);
  }
  if (placeholders.length === 0) {
    console.log("  no published placeholder pieces found");
  }

  console.log("Done.");
}

run().catch((error: unknown) => {
  console.error(error);
  process.exit(1);
});
