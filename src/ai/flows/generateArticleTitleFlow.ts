
'use server';
/**
 * @fileOverview A flow for generating intelligent article titles from keywords.
 *
 * - generateArticleTitle - A function that handles the title generation process.
 * - GenerateArticleTitleInput - The input type for the generateArticleTitle function.
 * - GenerateArticleTitleOutput - The return type for the generateArticleTitle function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const GenerateArticleTitleInputSchema = z.object({
  keyword: z.string().describe('The main keyword or topic for the article.'),
  category: z.string().describe('The category of the article for context.'),
});
export type GenerateArticleTitleInput = z.infer<typeof GenerateArticleTitleInputSchema>;

const GenerateArticleTitleOutputSchema = z.object({
  title: z.string().describe('A creative, engaging, and SEO-friendly article title.'),
});
export type GenerateArticleTitleOutput = z.infer<typeof GenerateArticleTitleOutputSchema>;

export async function generateArticleTitle(input: GenerateArticleTitleInput): Promise<GenerateArticleTitleOutput> {
  return generateArticleTitleFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateArticleTitlePrompt',
  input: { schema: GenerateArticleTitleInputSchema },
  output: { schema: GenerateArticleTitleOutputSchema },
  prompt: `You are an expert health content strategist and SEO specialist. Your task is to generate a compelling, engaging, and SEO-friendly article title in **Bahasa Indonesia** based on a given keyword and category.

The title should be:
- Creative and attention-grabbing.
- Informative and accurately reflect the potential content.
- Optimized for search engines (include keywords naturally).
- Not just a simple rephrase of the keyword. Think about listicles (e.g., "5 Cara..."), questions (e.g., "Mengapa..."), or benefit-driven titles.

**Keyword:** {{{keyword}}}
**Category:** {{{category}}}

Please generate one high-quality article title based on these instructions.`,
});

const generateArticleTitleFlow = ai.defineFlow(
  {
    name: 'generateArticleTitleFlow',
    inputSchema: GenerateArticleTitleInputSchema,
    outputSchema: GenerateArticleTitleOutputSchema,
  },
  async (input) => {
    const { output } = await prompt(input);
    return output!;
  }
);
