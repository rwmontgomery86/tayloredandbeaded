import { client } from "./client";

/**
 * Tagged, cached Sanity fetch. Tags let /api/revalidate invalidate
 * exactly what changed; the hourly revalidate covers missed webhooks.
 * Returns null when Sanity isn't configured (callers fall back to seed data).
 */
export async function sanityFetch<T>(
  query: string,
  params: Record<string, unknown>,
  tags: string[],
): Promise<T | null> {
  if (!client) return null;
  try {
    return await client.fetch<T>(query, params, {
      next: { tags, revalidate: 3600 },
    });
  } catch (err) {
    console.error("Sanity fetch failed:", err);
    return null;
  }
}
