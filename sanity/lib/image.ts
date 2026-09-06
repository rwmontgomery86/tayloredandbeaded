import { createImageUrlBuilder, type SanityImageSource } from "@sanity/image-url";
import { projectId, dataset } from "../env";

const builder = projectId
  ? createImageUrlBuilder({ projectId, dataset })
  : null;

export function urlFor(source: SanityImageSource, width = 1200) {
  if (!builder) return null;
  return builder.image(source).width(width).fit("max").auto("format").url();
}

/** Square crop centered on the editor's hotspot (for tiles and portraits). */
export function squareUrlFor(source: SanityImageSource, size = 1000) {
  if (!builder) return null;
  return builder
    .image(source)
    .width(size)
    .height(size)
    .fit("crop")
    .auto("format")
    .url();
}
