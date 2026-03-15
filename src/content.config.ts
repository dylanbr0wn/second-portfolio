// 1. Import utilities from `astro:content`
import { defineCollection } from "astro:content";

// 2. Import loader(s)
import { glob } from "astro/loaders";

// 3. Import Zod
import { z } from "astro/zod";

// 4. Define a `loader` and `schema` for each collection
const photos = defineCollection({
  loader: glob({ base: "./src/content/photos", pattern: "**/*.{md,mdx}" }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      img: image(),
      iso: z.number().optional(),
      shutter: z.string().optional(),
      aperture: z.string().optional(),
      device: z.string().optional(),
    }),
});

// 5. Export a single `collections` object to register your collection(s)
export const collections = { photos };
