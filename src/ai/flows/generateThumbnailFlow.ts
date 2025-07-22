
'use server';
/**
 * @fileOverview A flow for generating health-themed thumbnails using AI.
 *
 * - generateThumbnail - A function that handles the thumbnail generation process.
 * - GenerateThumbnailInput - The input type for the generateThumbnail function.
 * - GenerateThumbnailOutput - The return type for the generateThumbnail function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

export const GenerateThumbnailInputSchema = z.object({
  prompt: z.string().describe('The informational text to be included in the thumbnail.'),
  character: z.string().describe("The character to feature in the thumbnail (e.g., 'doctor', 'nurse', 'midwife')."),
});
export type GenerateThumbnailInput = z.infer<typeof GenerateThumbnailInputSchema>;

export const GenerateThumbnailOutputSchema = z.object({
  imageUrl: z.string().describe('The data URI of the generated thumbnail image.'),
});
export type GenerateThumbnailOutput = z.infer<typeof GenerateThumbnailOutputSchema>;

export async function generateThumbnail(input: GenerateThumbnailInput): Promise<GenerateThumbnailOutput> {
  return generateThumbnailFlow(input);
}

const generateThumbnailFlow = ai.defineFlow(
  {
    name: 'generateThumbnailFlow',
    inputSchema: GenerateThumbnailInputSchema,
    outputSchema: GenerateThumbnailOutputSchema,
  },
  async (input) => {
    const { media } = await ai.generate({
      model: 'googleai/gemini-2.0-flash-preview-image-generation',
      prompt: `Generate a thumbnail image with a 3D animated cartoon style. The scene should be health-themed.
      Feature a ${input.character} character wearing their respective uniform and using health-related accessories.
      The image must prominently display the following text in an attractive, modern, and easy-to-read font: "${input.prompt}".
      The overall tone should be friendly and informative. The aspect ratio should be 16:9.`,
      config: {
        responseModalities: ['IMAGE'],
      },
    });

    const imageUrl = media?.url || '';
    if (!imageUrl) {
      throw new Error('Image generation failed, no media URL returned.');
    }
    
    return { imageUrl };
  }
);
