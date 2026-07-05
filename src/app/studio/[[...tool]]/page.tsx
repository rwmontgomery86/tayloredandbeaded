import { NextStudio } from "next-sanity/studio";
import config from "../../../../sanity.config";
import { sanityConfigured } from "../../../../sanity/env";

export const dynamic = "force-static";

export { metadata, viewport } from "next-sanity/studio";

export default function StudioPage() {
  if (!sanityConfigured) {
    return (
      <div className="mx-auto max-w-lg px-5 py-24 text-center">
        <h1 className="font-serif text-3xl">Studio not configured</h1>
        <p className="mt-4 text-sm leading-relaxed text-ink-soft">
          Create a project at sanity.io, then set{" "}
          <code>NEXT_PUBLIC_SANITY_PROJECT_ID</code> in <code>.env.local</code>{" "}
          (see <code>.env.example</code>) and restart the server.
        </p>
      </div>
    );
  }
  return <NextStudio config={config} />;
}
