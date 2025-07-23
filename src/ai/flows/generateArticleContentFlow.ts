
'use server';
/**
 * @fileOverview A flow for generating professional health articles using AI.
 *
 * - generateArticleContent - A function that handles the article content generation process.
 * - GenerateArticleContentInput - The input type for the generateArticleContent function.
 * - GenerateArticleContentOutput - The return type for the generateArticleContent function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const GenerateArticleContentInputSchema = z.object({
  title: z.string().describe('The title of the article.'),
  category: z.string().describe('The category of the article for context.'),
});
export type GenerateArticleContentInput = z.infer<typeof GenerateArticleContentInputSchema>;

const GenerateArticleContentOutputSchema = z.object({
  content: z.string().describe('The full, well-structured, and informative article content in Markdown format.'),
});
export type GenerateArticleContentOutput = z.infer<typeof GenerateArticleContentOutputSchema>;

export async function generateArticleContent(input: GenerateArticleContentInput): Promise<GenerateArticleContentOutput> {
  return generateArticleContentFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateArticleContentPrompt',
  input: { schema: GenerateArticleContentInputSchema },
  output: { schema: GenerateArticleContentOutputSchema },
  prompt: `You are a professional health writer and medical expert. Your task is to write a high-quality, comprehensive, and informative article based on the provided title and category.

The article must be:
- **Minimum 1000 words.**
- Written in **Bahasa Indonesia**.
- Professional, credible, and easy to understand for a general audience.
- Well-structured with a clear introduction, a detailed main body, and a concise conclusion.
- The main body must be divided into several sections with clear headings.
- Use Markdown for formatting (e.g., '# ' for titles, '## ' for headings, '**' for bold text, and '-' for list items).
- The tone should be authoritative yet empathetic.

**Article Title:** {{{title}}}
**Article Category:** {{{category}}}

Please generate the full article content now based on these instructions.`,
});

const generateArticleContentFlow = ai.defineFlow(
  {
    name: 'generateArticleContentFlow',
    inputSchema: GenerateArticleContentInputSchema,
    outputSchema: GenerateArticleContentOutputSchema,
  },
  async (input) => {
    const { output } = await prompt(input);
    return output!;
  }
);
