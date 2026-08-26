/**
 * One-off: unpublish the placeholder mood collections (Summer Brights,
 * Golden Hour) now that the collections index folded into the shop and
 * The Edit is a standalone page. Documents are preserved as drafts.
 *
 * Run with: npx sanity exec scripts/unpublish-mood-collections.ts --with-user-token
 */
import { getCliClient } from "sanity/cli";

const SLUGS = ["summer-brights", "golden-hour"];

const client = getCliClient({ apiVersion: "2026-07-01" });

async function run() {
  const collections = await client.fetch<{ _id: string; title?: string }[]>(
    `*[_type == "collection" && slug.current in $slugs && !(_id in path("drafts.**"))]{ _id, title }`,
    { slugs: SLUGS },
  );

  if (collections.length === 0) {
    console.log("No published mood collections found.");
    return;
  }

  for (const collection of collections) {
    await client.action(
      {
        actionType: "sanity.action.document.unpublish",
        draftId: `drafts.${collection._id}`,
        publishedId: collection._id,
      },
      { tag: "migration.unpublish-mood-collections" },
    );
    console.log(`  unpublished ${collection.title ?? collection._id}`);
  }

  console.log("Done.");
}

run().catch((error: unknown) => {
  console.error(error);
  process.exit(1);
});
