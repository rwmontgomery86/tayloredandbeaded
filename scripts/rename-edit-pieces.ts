/**
 * One-off: give five of The Edit's curated pieces Taylor's real names
 * (display name only — slugs stay put, like the Bag Charm rename).
 * Raw perspective so open Studio drafts are renamed too.
 *
 * Run with: npx sanity exec scripts/rename-edit-pieces.ts --with-user-token
 */
import { getCliClient } from "sanity/cli";

const RENAMES: Record<string, string> = {
  "bold-multicolor-stone-necklace": "Good Mood",
  "peach-and-cream-stone-necklace": "Pretty in Peach",
  "pastel-multicolor-stone-necklace": "Coastal Cutie",
  "brown-and-cream-stone-necklace": "Espresso",
  "blue-and-green-stone-necklace": "Lucky",
};

const client = getCliClient({ apiVersion: "2026-07-01" });
const rawClient = client.withConfig({ perspective: "raw" });

async function run() {
  for (const [slug, name] of Object.entries(RENAMES)) {
    const docs = await rawClient.fetch<{ _id: string; name?: string }[]>(
      `*[_type == "product" && slug.current == $slug]{ _id, name }`,
      { slug },
    );
    if (docs.length === 0) {
      console.warn(`SKIPPED ${slug} — no product with that slug`);
      continue;
    }
    for (const doc of docs) {
      await rawClient
        .patch(doc._id)
        .set({ name })
        .commit({ tag: "migration.rename-edit-pieces" });
      console.log(`  ${doc._id}: "${doc.name}" → "${name}"`);
    }
  }
  console.log("Done.");
}

run().catch((error: unknown) => {
  console.error(error);
  process.exit(1);
});
