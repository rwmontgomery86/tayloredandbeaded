/**
 * Unpublish retired anklet products while preserving them as drafts.
 *
 * Run with: npx sanity exec scripts/unpublish-anklets.ts --with-user-token
 */
import { getCliClient } from "sanity/cli";

interface ProductToUnpublish {
  _id: string;
  name?: string;
}

const client = getCliClient({ apiVersion: "2026-07-01" });

async function run() {
  const products = await client.fetch<ProductToUnpublish[]>(
    `*[_type == "product" && category == "anklets" && !(_id in path("drafts.**"))]{ _id, name }`,
  );

  if (products.length === 0) {
    console.log("No published anklet products found.");
    return;
  }

  console.log(
    `Unpublishing ${products.length} anklet product${products.length === 1 ? "" : "s"} from ${client.config().projectId} / ${client.config().dataset}`,
  );

  for (const product of products) {
    await client.action(
      {
        actionType: "sanity.action.document.unpublish",
        draftId: `drafts.${product._id}`,
        publishedId: product._id,
      },
      { tag: "migration.unpublish-anklets" },
    );
    console.log(`  unpublished ${product.name ?? product._id}`);
  }

  console.log("Done.");
}

run().catch((error: unknown) => {
  console.error(error);
  process.exit(1);
});
