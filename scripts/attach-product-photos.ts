/**
 * One-off: attach real product photos to existing product documents.
 *
 * Reads photos from PHOTOS_DIR named `<slug>-<nn>.jpg` (e.g.
 * faith-necklace-01.jpg), uploads each as a Sanity asset (deduped by
 * originalFilename, like seed-sanity.ts), and sets the product's `images`
 * array with the -01 shot first — that one becomes the card image.
 *
 * Run with:
 *   PHOTOS_DIR=/path/to/photos npx sanity exec scripts/attach-product-photos.ts --with-user-token
 */
import { createReadStream, readdirSync } from "node:fs";
import path from "node:path";
import { getCliClient } from "sanity/cli";

const client = getCliClient({ apiVersion: "2026-07-01" });

const photosDir = process.env.PHOTOS_DIR;
if (!photosDir) {
  console.error("Set PHOTOS_DIR to the directory containing the photos.");
  process.exit(1);
}

function imageRef(assetId: string, key: string) {
  return {
    _type: "image",
    _key: key,
    asset: { _type: "reference", _ref: assetId },
  };
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
    `Attaching photos in ${client.config().projectId} / ${client.config().dataset}`,
  );

  // Group files as `<slug>-<nn>.jpg`, sorted so -01 lands first.
  const bySlug = new Map<string, string[]>();
  for (const file of readdirSync(photosDir!).sort()) {
    const match = /^(.+)-\d+\.jpe?g$/i.exec(file);
    if (!match) continue;
    const files = bySlug.get(match[1]) ?? [];
    files.push(file);
    bySlug.set(match[1], files);
  }
  if (bySlug.size === 0) {
    console.error(`No <slug>-<nn>.jpg files found in ${photosDir}`);
    process.exit(1);
  }

  for (const [slug, files] of bySlug) {
    // "raw" perspective so open Studio drafts are patched too — otherwise the
    // next publish would wipe the images off the published doc.
    const docs = await client.fetch<
      { _id: string; filenames?: (string | null)[] }[]
    >(
      `*[_type == "product" && slug.current == $slug]{
        _id, "filenames": images[].asset->originalFilename
      }`,
      { slug },
      { perspective: "raw" },
    );
    if (docs.length === 0) {
      console.warn(`SKIPPED ${slug} — no product with that slug`);
      continue;
    }

    const assetIds: string[] = [];
    for (const file of files) assetIds.push(await uploadImage(file));
    const images = assetIds.map((id, i) => imageRef(id, `${slug}-img${i}`));

    for (const doc of docs) {
      // Generated placeholder-*.png images are fair game to replace; anything
      // else was uploaded by a person, so leave it alone.
      const existing = doc.filenames ?? [];
      const onlyPlaceholders = existing.every((f) =>
        f?.startsWith("placeholder-"),
      );
      if (existing.length > 0 && !onlyPlaceholders) {
        console.log(`  skipped ${doc._id} — has non-placeholder images`);
        continue;
      }
      await client
        .patch(doc._id)
        .set({ images })
        .commit({ tag: "migration.attach-product-photos" });
      console.log(`  attached ${files.length} photo(s) → ${doc._id}`);
    }
  }

  console.log("Done.");
}

run().catch((error: unknown) => {
  console.error(error);
  process.exit(1);
});
