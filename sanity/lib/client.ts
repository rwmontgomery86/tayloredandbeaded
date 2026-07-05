import { createClient } from "next-sanity";
import { projectId, dataset, apiVersion, sanityConfigured } from "../env";

export const client = sanityConfigured
  ? createClient({ projectId, dataset, apiVersion, useCdn: true })
  : null;
