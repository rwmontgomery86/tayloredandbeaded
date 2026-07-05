import createImageUrlBuilder, { type SanityImageSource } from "@sanity/image-url";
import { projectId, dataset } from "../env";

const builder = projectId
  ? createImageUrlBuilder({ projectId, dataset })
  : null;

export function urlFor(source: SanityImageSource, width = 1200) {
  if (!builder) return null;
  return builder.image(source).width(width).fit("max").auto("format").url();
}
