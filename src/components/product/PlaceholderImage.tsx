import { GemIcon } from "@/components/ui/icons";

/** Shown wherever a product has no photo yet. */
export default function PlaceholderImage() {
  return (
    <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-cream-dark to-blush/60">
      <GemIcon size={40} className="text-mauve/50" />
    </div>
  );
}
