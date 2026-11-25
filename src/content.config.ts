import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

/**
 * Security research writeups.
 * Add a Markdown file to src/content/research/ to publish one.
 * Files starting with "_" are ignored (see _template.md).
 */
const research = defineCollection({
  loader: glob({ base: './src/content/research', pattern: '**/[^_]*.{md,mdx}' }),
  schema: z.object({
    title: z.string(),
    summary: z.string(),
    date: z.coerce.date(),
    kind: z.enum(['Writeup', 'Vulnerability Research', 'Contest Report', 'Tooling']).default('Writeup'),
    tags: z.array(z.string()).default([]),
    draft: z.boolean().default(false),
  }),
});

export const collections = { research };
