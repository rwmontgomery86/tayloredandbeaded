/**
 * One-off: rename "Confetti Bag Charm" to "Bag Charm" (name only — the
 * confetti-bag-charm slug and URL stay, so nothing breaks).
 *
 * Run with: npx sanity exec scripts/rename-bag-charm.ts --with-user-token
 */
import { getCliClient } from "sanity/cli";

const OLD_NAME = "Confetti Bag Charm";
const NEW_NAME = "Bag Charm";

const client = getCliClient({ apiVersion: "2026-07-01" });

async function run() {
  // "raw" perspective so an open Studio draft is renamed too — otherwise the
  // next publish would restore the old name over the patched published doc.
  const docs = await client.fetch<{ _id: string; name?: string }[]>(
    `*[_type == "product" && slug.current == "confetti-bag-charm"]{ _id, name }`,
    {},
    { perspective: "raw" },
  );

  if (docs.length === 0) {
    console.log("No confetti-bag-charm product found.");
    return;
  }

  for (const doc of docs) {
    if (doc.name !== OLD_NAME) {
      console.log(`  skipped ${doc._id} — name is already "${doc.name}"`);
      continue;
    }
    await client
      .patch(doc._id)
      .set({ name: NEW_NAME })
      .commit({ tag: "migration.rename-bag-charm" });
    console.log(`  renamed ${doc._id} → "${NEW_NAME}"`);
  }

  console.log("Done.");
}

run().catch((error: unknown) => {
  console.error(error);
  process.exit(1);
});
