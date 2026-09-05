/**
 * Creates (or updates) the Sanity → Next.js revalidation webhook described in
 * the README, using the CLI user token via `sanity exec --with-user-token`.
 *
 * Reads SANITY_REVALIDATE_SECRET and NEXT_PUBLIC_SITE_URL from the
 * environment (.env.local), so it stays in sync with the deployed app.
 *
 * Run with:  npx sanity exec scripts/create-revalidate-webhook.ts --with-user-token
 *
 * Talks to the global management API (api.sanity.io) directly with fetch:
 * the project-scoped client host (<projectId>.api.sanity.io) does not serve
 * /hooks, and the hooks API updates with PATCH, not PUT.
 */
import { getCliClient } from "sanity/cli";

const API_VERSION = "2026-07-01";
const NAME = "next-revalidate";

const { projectId, dataset, token } = getCliClient({
  apiVersion: API_VERSION,
}).config();

const secret = process.env.SANITY_REVALIDATE_SECRET;
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL;
if (!secret || !siteUrl || siteUrl.includes("localhost")) {
  throw new Error(
    "SANITY_REVALIDATE_SECRET and a non-localhost NEXT_PUBLIC_SITE_URL are required",
  );
}
if (!token) {
  throw new Error("No user token — run with `sanity exec ... --with-user-token`");
}

const hooksUrl = `https://api.sanity.io/v${API_VERSION}/hooks/projects/${projectId}`;

interface Hook {
  id: string;
  name: string;
  url: string;
}

async function api<T>(url: string, init: RequestInit = {}): Promise<T> {
  const res = await fetch(url, {
    ...init,
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
      ...init.headers,
    },
  });
  if (!res.ok) {
    throw new Error(`${init.method ?? "GET"} ${url} → HTTP ${res.status}`);
  }
  return (await res.json()) as T;
}

async function run() {
  const hooks = await api<Hook[]>(hooksUrl);
  const existing = hooks.find((h) => h.name === NAME);

  const body = {
    name: NAME,
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

  const result = existing
    ? await api<Hook>(`${hooksUrl}/${existing.id}`, {
        method: "PATCH",
        body: JSON.stringify(body),
      })
    : await api<Hook>(hooksUrl, {
        method: "POST",
        body: JSON.stringify({ ...body, dataset, type: "document" }),
      });

  console.log(
    `${existing ? "Updated" : "Created"} webhook "${NAME}" → ${result.url}`,
  );
  console.log(`id: ${result.id}`);
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
