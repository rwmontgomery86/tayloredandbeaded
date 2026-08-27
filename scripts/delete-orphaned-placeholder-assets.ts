/**
 * One-off: delete generated placeholder-*.png image assets that no document
 * references any more (they were replaced by real photos via
 * attach-product-photos.ts). Referenced placeholders are kept.
 *
 * Run with: npx sanity exec scripts/delete-orphaned-placeholder-assets.ts --with-user-token
 */
import { getCliClient } from "sanity/cli";

const client = getCliClient({ apiVersion: "2026-07-01" });

async function run() {
  const assets = await client.fetch<
    { _id: string; originalFilename: string; refs: number }[]
  >(
    `*[_type == "sanity.imageAsset" && originalFilename match "placeholder-*"]{
      _id, originalFilename, "refs": count(*[references(^._id)])
    } | order(originalFilename)`,
    {},
    { perspective: "raw" },
  );
  for (const a of assets) {
    if (a.refs > 0) {
      console.log(`kept    ${a.originalFilename} — still referenced (${a.refs})`);
      continue;
    }
    await client.delete(a._id);
    console.log(`deleted ${a.originalFilename}`);
  }
  console.log(`Done. ${assets.length} placeholder assets checked.`);
}

run().catch((error: unknown) => {
  console.error(error);
  process.exit(1);
});
