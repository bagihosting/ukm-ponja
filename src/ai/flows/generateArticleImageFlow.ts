
'use server';
/**
 * @fileOverview A flow for generating health-themed article images using AI.
 *
 * - generateArticleImage - A function that handles the article image generation process.
 * - GenerateArticleImageInput - The input type for the generateArticleImage function.
 * - GenerateArticleImageOutput - The return type for the generateArticleImage function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const GenerateArticleImageInputSchema = z.object({
  title: z.string().describe('The title of the article to generate an image for.'),
});
export type GenerateArticleImageInput = z.infer<typeof GenerateArticleImageInputSchema>;

const GenerateArticleImageOutputSchema = z.object({
  imageUrl: z.string().describe('The data URI of the generated article image.'),
});
export type GenerateArticleImageOutput = z.infer<typeof GenerateArticleImageOutputSchema>;

export async function generateArticleImage(input: GenerateArticleImageInput): Promise<GenerateArticleImageOutput> {
  return generateArticleImageFlow(input);
}

const generateArticleImageFlow = ai.defineFlow(
  {
    name: 'generateArticleImageFlow',
    inputSchema: GenerateArticleImageInputSchema,
    outputSchema: GenerateArticleImageOutputSchema,
  },
  async (input) => {
    
    const { media } = await ai.generate({
      model: 'googleai/gemini-2.0-flash-preview-image-generation',
      prompt: `Generate a high-quality, visually appealing image for a health article titled "${input.title}". 
      The style should be a modern, flat vector illustration with a clean and minimalist aesthetic. 
      The image should be symbolic and directly related to the article's theme. 
      Use a bright and inviting color palette. Avoid any text in the image. The aspect ratio must be 16:9.`,
      config: {
        responseModalities: ['TEXT', 'IMAGE'],
      },
    });

    const imageUrl = media?.url || '';
    if (!imageUrl) {
      throw new Error('Image generation failed, no media URL returned.');
    }
    
    return { imageUrl };
  }
);
