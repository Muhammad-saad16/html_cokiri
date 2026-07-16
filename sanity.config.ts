import {defineConfig} from "sanity";
import {structureTool} from "sanity/structure";
import {visionTool} from "@sanity/vision";

import {projectId, dataset} from "./sanity/env";
import {schemaTypes} from "./sanity/schemaTypes";
import {structure, SINGLETON_TYPES} from "./sanity/structure";

export default defineConfig({
  name: "default",
  title: "COKIRI",

  projectId,
  dataset,
  basePath: "/studio",

  plugins: [
    structureTool({structure}),
    visionTool(),
  ],

  schema: {
    types: schemaTypes,
  },

  document: {
    newDocumentOptions: (prev, {creationContext}) => {
      if (creationContext.type === "global") {
        return prev.filter((template) => !SINGLETON_TYPES.has(template.templateId));
      }
      return prev;
    },
    actions: (prev, {schemaType}) =>
      SINGLETON_TYPES.has(schemaType)
        ? prev.filter(({action}) => !["unpublish", "delete", "duplicate"].includes(action as string))
        : prev,
  },
});