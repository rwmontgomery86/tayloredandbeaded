"use client";

import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { visionTool } from "@sanity/vision";
import { schemaTypes, singletonTypes } from "./sanity/schemas";
import { projectId, dataset, apiVersion } from "./sanity/env";

export default defineConfig({
  name: "taylored-and-beaded",
  title: "Taylored & Beaded",
  basePath: "/studio",
  projectId: projectId ?? "missing-project-id",
  dataset,
  schema: {
    types: schemaTypes,
    // Singletons can't be created as new documents
    templates: (templates) =>
      templates.filter(({ schemaType }) => !singletonTypes.includes(schemaType)),
  },
  document: {
    actions: (actions, context) =>
      singletonTypes.includes(context.schemaType)
        ? actions.filter(
            ({ action }) =>
              action && ["publish", "discardChanges", "restore"].includes(action),
          )
        : actions,
  },
  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title("Content")
          .items([
            S.documentTypeListItem("product").title("Products"),
            S.documentTypeListItem("collection").title("Collections"),
            S.documentTypeListItem("faqItem").title("FAQ"),
            S.divider(),
            S.listItem()
              .title("Pricing")
              .id("pricing")
              .child(S.document().schemaType("pricing").documentId("pricing")),
            S.listItem()
              .title("Care Guide")
              .id("careGuide")
              .child(S.document().schemaType("careGuide").documentId("careGuide")),
            S.listItem()
              .title("Site Settings")
              .id("siteSettings")
              .child(
                S.document().schemaType("siteSettings").documentId("siteSettings"),
              ),
          ]),
    }),
    visionTool({ defaultApiVersion: apiVersion }),
  ],
});
