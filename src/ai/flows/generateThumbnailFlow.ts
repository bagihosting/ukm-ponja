
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

const GenerateThumbnailInputSchema = z.object({
  prompt: z.string().describe('The informational text to be included in the thumbnail.'),
  character: z.string().describe("The character to feature in the thumbnail (e.g., 'doctor', 'nurse', 'midwife')."),
  platform: z.string().describe("The social media platform for which to generate the thumbnail (e.g., 'youtube', 'instagram', 'tiktok')."),
});
export type GenerateThumbnailInput = z.infer<typeof GenerateThumbnailInputSchema>;

const GenerateThumbnailOutputSchema = z.object({
  imageUrl: z.string().describe('The data URI of the generated thumbnail image.'),
});
export type GenerateThumbnailOutput = z.infer<typeof GenerateThumbnailOutputSchema>;

export async function generateThumbnail(input: GenerateThumbnailInput): Promise<GenerateThumbnailOutput> {
  return generateThumbnailFlow(input);
}

const getAspectRatio = (platform: string): string => {
  switch (platform) {
    case 'youtube':
      return '16:9';
    case 'instagram':
      return '1:1';
    case 'tiktok':
      return '9:16';
    default:
      return '16:9';
  }
};


const generateThumbnailFlow = ai.defineFlow(
  {
    name: 'generateThumbnailFlow',
    inputSchema: GenerateThumbnailInputSchema,
    outputSchema: GenerateThumbnailOutputSchema,
  },
  async (input) => {
    const aspectRatio = getAspectRatio(input.platform);
    
    const { media } = await ai.generate({
      model: 'googleai/gemini-2.0-flash-preview-image-generation',
      prompt: `Generate a thumbnail image for ${input.platform} with a 3D animated cartoon style. The scene should be health-themed.
      Feature a ${input.character} character with typical Indonesian facial features, wearing their respective uniform and using health-related accessories.
      The image must prominently display the following text in an attractive, modern, and easy-to-read font: "${input.prompt}".
      The overall tone should be friendly and informative. The aspect ratio must be ${aspectRatio}.`,
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
