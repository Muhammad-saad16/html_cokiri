import {defineConfig} from "sanity";
import {structureTool} from "sanity/structure";
import {visionTool} from "@sanity/vision";

import {schemaTypes} from "./sanity-studio/schemaTypes";
import {structure} from "./sanity-studio/sanity/structure";

export default defineConfig({
  name: "default",
  title: "COKIRI",

  projectId: "0mhnrbkc",
  dataset: "production",
  basePath: "/studio",

  plugins: [
    structureTool({structure}),
    visionTool(),
  ],

  schema: {
    types: schemaTypes,
  },
});