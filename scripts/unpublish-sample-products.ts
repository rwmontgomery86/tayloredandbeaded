/**
 * One-off: unpublish the invented sample products left over from the original
 * July showcase build (Golden Hour, Tidepool, Sorbet Skies necklaces and the
 * Cotton Candy Stack) — they never existed as real inventory. Documents are
 * preserved as drafts. Because they made up most of the featured carousel,
 * four real year-round styles are marked featured in their place.
 *
 * Run with: npx sanity exec scripts/unpublish-sample-products.ts --with-user-token
 */
import { getCliClient } from "sanity/cli";

const SAMPLE_SLUGS = [
  "golden-hour-necklace",
  "tidepool-necklace",
  "sorbet-skies-necklace",
  "cotton-candy-stack",
];

const REPLACEMENT_FEATURED_SLUGS = [
  "parker-necklace",
  "ansley-necklace",
  "lynsey-necklace",
  "faith-necklace",
];

const client = getCliClient({ apiVersion: "2026-07-01" });
const rawClient = client.withConfig({ perspective: "raw" });

async function run() {
  const products = await client.fetch<{ _id: string; name?: string }[]>(
    `*[_type == "product" && slug.current in $slugs && !(_id in path("drafts.**"))]{ _id, name }`,
    { slugs: SAMPLE_SLUGS },
  );

  // Sanity refuses to unpublish while strong references exist — including from
  // drafts (the retired mood-collection drafts still list these products), so
  // look with the raw perspective and strip the references first.
  for (const product of products) {
    const referrers = await rawClient.fetch<string[]>(
      `*[references($id)]._id`,
      { id: product._id },
    );
    for (const referrer of referrers) {
      await rawClient
        .patch(referrer)
        .unset([`products[_ref == "${product._id}"]`])
        .commit();
      console.log(`  removed ${product._id} reference from ${referrer}`);
    }
  }

  if (products.length === 0) {
    console.log("No published sample products found.");
  }

  for (const product of products) {
    await client.action(
      {
        actionType: "sanity.action.document.unpublish",
        draftId: `drafts.${product._id}`,
        publishedId: product._id,
      },
      { tag: "migration.unpublish-sample-products" },
    );
    console.log(`  unpublished ${product.name ?? product._id}`);
  }

  const replacements = await client.fetch<{ _id: string; name?: string }[]>(
    `*[_type == "product" && slug.current in $slugs && !(_id in path("drafts.**")) && featured != true]{ _id, name }`,
    { slugs: REPLACEMENT_FEATURED_SLUGS },
  );

  for (const product of replacements) {
    await client.patch(product._id).set({ featured: true }).commit();
    console.log(`  featured ${product.name ?? product._id}`);
  }

  console.log("Done.");
}

run().catch((error: unknown) => {
  console.error(error);
  process.exit(1);
});
