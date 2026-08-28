/**
 * One-off: fix the Aug 27 photo-attach mix-up on the shop necklaces.
 *
 * The source files on disk were mislabeled, so attach-product-photos.ts put
 * several photos on the wrong products. Verified visually (Aug 28): the
 * "sara-*" files show Sierra's olive cubes, "sierra-*" show Sara's hot pink
 * rounds, "cameron-03/04" show Parker's pale pink rounds, and "ryan-04" shows
 * Cameron's blue-green marbled rounds. This reassigns the already-uploaded
 * assets to the right products, best front-on shot first (the card image).
 *
 * The Desktop source files were renamed to their true products afterwards
 * (Aug 28), so the asset map below is keyed by the OLD mislabeled names the
 * assets still carry as originalFilename in Sanity.
 *
 * Run with:
 *   NEXT_PUBLIC_SANITY_PROJECT_ID=y5mvhma1 npx sanity exec scripts/fix-shop-photo-mixup.ts --with-user-token
 */
import { getCliClient } from "sanity/cli";

const client = getCliClient({ apiVersion: "2026-07-01" });

// Asset ids keyed by the (mislabeled) originalFilename they were uploaded as.
const asset = {
  "sara-necklace-01": "image-e06907bc33899799f2cdc985697d415280b61b6b-1600x2400-jpg",
  "sara-necklace-02": "image-944c55a88f82da41fadf28ce6ebc4aeca49f16f1-1600x2400-jpg",
  "sara-necklace-03": "image-fb77e6d89627d850584dbadd48f30a98ab5dadf5-1600x2400-jpg",
  "sara-necklace-04": "image-b75a757ef5d13c87a6e63f9f74b7fa5bb08fe69f-1600x2400-jpg",
  "sierra-necklace-01": "image-27a6348ce06157eebd02ea33968bfb5e1cb91476-1600x2400-jpg",
  "sierra-necklace-02": "image-1bbac8360986f9393e06d4c016d3ff6260c43b55-1600x2400-jpg",
  "sierra-necklace-03": "image-52d70cf9e20877a701c59b5938bc647be83c4a41-1600x2400-jpg",
  "cameron-necklace-01": "image-ff4d94be59b9354ca9fb7f3226467a781f6a2a63-1600x2400-jpg",
  "cameron-necklace-02": "image-029a88dd563c961c3f61c0156973e4ff8c79d26d-1600x2400-jpg",
  "cameron-necklace-03": "image-26e715db131891a68d33f5a9c509e876e5d49b2a-1600x2400-jpg",
  "cameron-necklace-04": "image-24022f258653f15068e1f9246842d2150374c281-1600x2400-jpg",
  "ryan-necklace-01": "image-6374d06b57cb57e193e2a38275c8bb812783fff8-1600x2400-jpg",
  "ryan-necklace-02": "image-7b7c41f7a8bcda762eb497f9251c289109c7da58-1600x2400-jpg",
  "ryan-necklace-03": "image-4b683b3eb4f52e3c7d7f34228db35e808365cbe7-1600x2400-jpg",
  "ryan-necklace-04": "image-1355754112fec7fb532f9cde52f9b636cdc581ac-1600x2400-jpg",
  "parker-necklace-01": "image-cda10f03c4d08fbb5ba03cc8a7d66a9d7ef77fa5-1600x2400-jpg",
} as const;

// Corrected image order per product, front-on shot first.
const corrections: Record<string, (keyof typeof asset)[]> = {
  "sara-necklace": ["sierra-necklace-02", "sierra-necklace-01", "sierra-necklace-03"],
  "sierra-necklace": ["sara-necklace-01", "sara-necklace-02", "sara-necklace-03", "sara-necklace-04"],
  "cameron-necklace": ["ryan-necklace-04", "cameron-necklace-02", "cameron-necklace-01"],
  "ryan-necklace": ["ryan-necklace-01", "ryan-necklace-02", "ryan-necklace-03"],
  "parker-necklace": ["parker-necklace-01", "cameron-necklace-03", "cameron-necklace-04"],
};

async function run() {
  console.log(
    `Fixing shop photos in ${client.config().projectId} / ${client.config().dataset}`,
  );

  for (const [slug, files] of Object.entries(corrections)) {
    // "raw" perspective so open Studio drafts are patched too — otherwise the
    // next publish would reintroduce the mixed-up images.
    const ids = await client.fetch<string[]>(
      `*[_type == "product" && slug.current == $slug]._id`,
      { slug },
      { perspective: "raw" },
    );
    if (ids.length === 0) {
      console.warn(`SKIPPED ${slug} — no product with that slug`);
      continue;
    }

    const images = files.map((file, i) => ({
      _type: "image",
      _key: `${slug}-fix${i}`,
      asset: { _type: "reference", _ref: asset[file] },
    }));

    for (const id of ids) {
      await client
        .patch(id)
        .set({ images })
        .commit({ tag: "migration.fix-shop-photo-mixup" });
      console.log(`  set ${images.length} photo(s) → ${id}`);
    }
  }

  console.log("Done.");
}

run().catch((error: unknown) => {
  console.error(error);
  process.exit(1);
});
