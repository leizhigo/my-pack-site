import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const products = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/products" }),
  schema: z.object({
    title: z.string(),
    seo_title: z.string().optional(),
    seo_description: z.string().optional(),
  }),
});

export const collections = { products };
