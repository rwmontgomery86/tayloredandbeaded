/**
 * Creates (or updates) the Sanity → Next.js revalidation webhook described in
 * the README, using the CLI user token via `sanity exec --with-user-token`.
 *
 * Reads SANITY_REVALIDATE_SECRET and NEXT_PUBLIC_SITE_URL from the
 * environment (.env.local), so it stays in sync with the deployed app.
 *
 * Run with:  npx sanity exec scripts/create-revalidate-webhook.ts --with-user-token
 */
import { getCliClient } from "sanity/cli";

const client = getCliClient({ apiVersion: "2026-07-01" });
const { projectId, dataset } = client.config();

const secret = process.env.SANITY_REVALIDATE_SECRET;
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL;
if (!secret || !siteUrl || siteUrl.includes("localhost")) {
  throw new Error(
    "SANITY_REVALIDATE_SECRET and a non-localhost NEXT_PUBLIC_SITE_URL are required",
  );
}

const NAME = "next-revalidate";

async function run() {
  const hooks = await client.request<{ id: string; name: string }[]>({
    uri: `/hooks/projects/${projectId}`,
    useGlobalApi: true,
  });
  const existing = hooks.find((h) => h.name === NAME);

  const body = {
    name: NAME,
    dataset,
    type: "document",
    url: `${siteUrl}/api/revalidate`,
    httpMethod: "POST",
    apiVersion: "v2021-03-25",
    includeDrafts: false,
    rule: {
      on: ["create", "update", "delete"],
      projection: '{ "_type": _type, "slug": slug.current }',
    },
    secret,
  };

  const result = await client.request({
    uri: existing
      ? `/hooks/projects/${projectId}/${existing.id}`
      : `/hooks/projects/${projectId}`,
    method: existing ? "PUT" : "POST",
    useGlobalApi: true,
    body,
  });
  console.log(
    `${existing ? "Updated" : "Created"} webhook "${NAME}" → ${body.url}`,
  );
  console.log(`id: ${(result as { id: string }).id}`);
}

run().catch((err) => {
  console.error(err.message ?? err);
  process.exit(1);
});
