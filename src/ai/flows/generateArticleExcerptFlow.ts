
'use server';
/**
 * @fileOverview A flow for generating a concise and engaging article excerpt using AI.
 *
 * - generateArticleExcerpt - A function that handles the excerpt generation process.
 * - GenerateArticleExcerptInput - The input type for the generateArticleExcerpt function.
 * - GenerateArticleExcerptOutput - The return type for the generateArticleExcerpt function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const GenerateArticleExcerptInputSchema = z.object({
  title: z.string().describe('The title of the article.'),
  content: z.string().describe('The full content of the article.'),
});
export type GenerateArticleExcerptInput = z.infer<typeof GenerateArticleExcerptInputSchema>;

const GenerateArticleExcerptOutputSchema = z.object({
  excerpt: z.string().describe('A concise and engaging summary of the article, around 200-250 characters long.'),
});
export type GenerateArticleExcerptOutput = z.infer<typeof GenerateArticleExcerptOutputSchema>;

export async function generateArticleExcerpt(input: GenerateArticleExcerptInput): Promise<GenerateArticleExcerptOutput> {
  return generateArticleExcerptFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateArticleExcerptPrompt',
  input: { schema: GenerateArticleExcerptInputSchema },
  output: { schema: GenerateArticleExcerptOutputSchema },
  prompt: `You are an expert copywriter specializing in creating compelling article summaries. Your task is to write a short, engaging excerpt for a health article based on its title and full content.

The excerpt must be:
- Written in **Bahasa Indonesia**.
- A concise summary of the main points of the article.
- Engaging and make the reader want to click to read more.
- Approximately 200-250 characters long.
- Do not just use the first sentence of the article. Summarize the whole content.

**Article Title:** {{{title}}}

**Full Article Content:**
---
{{{content}}}
---

Please generate only the excerpt based on these instructions.`,
});

const generateArticleExcerptFlow = ai.defineFlow(
  {
    name: 'generateArticleExcerptFlow',
    inputSchema: GenerateArticleExcerptInputSchema,
    outputSchema: GenerateArticleExcerptOutputSchema,
  },
  async (input) => {
    const { output } = await prompt(input);
    return output!;
  }
);
