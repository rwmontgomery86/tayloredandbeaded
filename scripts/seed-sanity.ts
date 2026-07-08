/**
 * One-time migration of the built-in seed content into Sanity, so the CMS
 * starts populated instead of empty. Idempotent: deterministic _ids, so
 * re-running updates rather than duplicates.
 *
 * Run with:  npx sanity exec scripts/seed-sanity.ts --with-user-token
 */
import { createReadStream } from "node:fs";
import path from "node:path";
import { getCliClient } from "sanity/cli";
import {
  SEED_PRODUCTS,
  SEED_COLLECTIONS,
  SEED_FAQ,
  SEED_CARE_GUIDE,
  SEED_SETTINGS,
} from "../src/lib/seed";

const client = getCliClient({ apiVersion: "2026-07-01" });

/** Plain string → minimal Portable Text, with stable keys for idempotency. */
function toBlocks(text: string, keyPrefix: string) {
  return [
    {
      _type: "block",
      _key: `${keyPrefix}-b0`,
      style: "normal",
      markDefs: [],
      children: [
        { _type: "span", _key: `${keyPrefix}-s0`, text, marks: [] },
      ],
    },
  ];
}

/** Upload each unique product photo once; returns public-path → asset _id. */
async function uploadImages(): Promise<Map<string, string>> {
  const paths = new Set<string>();
  for (const p of SEED_PRODUCTS) p.images.forEach((i) => paths.add(i));
  for (const c of SEED_COLLECTIONS) if (c.image) paths.add(c.image);

  const assetIds = new Map<string, string>();
  for (const publicPath of paths) {
    const filename = path.basename(publicPath);
    const filePath = path.join(process.cwd(), "public", publicPath);
    const existing = await client.fetch<string | null>(
      `*[_type == "sanity.imageAsset" && originalFilename == $filename][0]._id`,
      { filename },
    );
    if (existing) {
      assetIds.set(publicPath, existing);
      console.log(`  reusing  ${filename}`);
      continue;
    }
    const asset = await client.assets.upload(
      "image",
      createReadStream(filePath),
      { filename },
    );
    assetIds.set(publicPath, asset._id);
    console.log(`  uploaded ${filename}`);
  }
  return assetIds;
}

function imageRef(assetId: string, key?: string) {
  return {
    _type: "image",
    ...(key ? { _key: key } : {}),
    asset: { _type: "reference", _ref: assetId },
  };
}

async function run() {
  console.log(
    `Seeding project ${client.config().projectId} / ${client.config().dataset}`,
  );

  console.log("Uploading product photos…");
  const assets = await uploadImages();

  const tx = client.transaction();

  for (const p of SEED_PRODUCTS) {
    tx.createOrReplace({
      _id: `product-${p.slug}`,
      _type: "product",
      name: p.name,
      slug: { _type: "slug", current: p.slug },
      category: p.category,
      // No price override: seed prices all match the category pricing below.
      images: p.images.map((img, i) =>
        imageRef(assets.get(img)!, `${p.slug}-img${i}`),
      ),
      description: p.description,
      materials: p.materials,
      colors: p.colors?.map((c, i) => ({
        _type: "object",
        _key: `${p.slug}-color${i}`,
        ...(("label" in c && c.label) ? { label: c.label } : {}),
        hex: c.hex,
      })),
      featured: true,
      newArrival: Boolean(p.newArrival),
      status: "available",
    });
  }

  SEED_COLLECTIONS.forEach((c, order) => {
    tx.createOrReplace({
      _id: `collection-${c.slug}`,
      _type: "collection",
      title: c.title,
      slug: { _type: "slug", current: c.slug },
      ...(c.image ? { coverImage: imageRef(assets.get(c.image)!) } : {}),
      description: c.description,
      ...(c.intro ? { intro: toBlocks(c.intro, c.slug) } : {}),
      products: c.products.map((p) => ({
        _type: "reference",
        _key: `${c.slug}-${p.slug}`,
        _ref: `product-${p.slug}`,
      })),
      order,
    });
  });

  SEED_FAQ.forEach((f, order) => {
    const key = f.id.replace(/^seed-/, "");
    tx.createOrReplace({
      _id: key,
      _type: "faqItem",
      question: f.question,
      answer: toBlocks(f.answer, key),
      category: f.category,
      order,
    });
  });

  // Singleton _ids must match the documentIds pinned in sanity.config.ts.
  tx.createOrReplace({
    _id: "careGuide",
    _type: "careGuide",
    title: SEED_CARE_GUIDE.title,
    intro: SEED_CARE_GUIDE.intro,
    sections: SEED_CARE_GUIDE.sections.map((s, i) => ({
      _type: "object",
      _key: `care${i}`,
      heading: s.heading,
      body: toBlocks(s.body, `care${i}`),
    })),
  });

  tx.createOrReplace({
    _id: "pricing",
    _type: "pricing",
    necklaces: 25,
    bracelets: 15,
    anklets: 15,
    bagCharms: 15,
  });

  tx.createOrReplace({
    _id: "siteSettings",
    _type: "siteSettings",
    announcementMessages: SEED_SETTINGS.announcementMessages,
    instagramUrl: SEED_SETTINGS.instagramUrl,
    aboutTeaser: SEED_SETTINGS.aboutTeaser,
  });

  const result = await tx.commit();
  console.log(`Done: ${result.results.length} documents written.`);
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
