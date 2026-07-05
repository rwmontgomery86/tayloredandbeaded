export const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
export const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET ?? "production";
export const apiVersion =
  process.env.NEXT_PUBLIC_SANITY_API_VERSION ?? "2026-07-01";

/**
 * The site renders from seed data until a Sanity project is configured,
 * so a missing project id is a soft state, not a build error.
 */
export const sanityConfigured = Boolean(projectId);
