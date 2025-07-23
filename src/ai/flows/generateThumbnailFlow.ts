
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
  character: z.string().describe("The character to feature in the thumbnail (e.g., 'doctor', 'nurse', 'midwife', 'adult_man', 'adult_woman', 'boy', 'girl', 'baby', 'elderly_man', 'elderly_woman', 'bakteri', 'virus')."),
  platform: z.string().describe("The social media platform for which to generate the thumbnail (e.g., 'youtube', 'instagram', 'tiktok')."),
  theme: z.string().describe("The clothing theme for the character (e.g., 'default', 'idul_fitri', 'idul_adha', 'imlek', 'ramadhan', 'hari_batik', 'natal')."),
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

const getClothingPrompt = (character: string, theme: string): string => {
  const characterName = character.replace(/_/g, ' ');
  switch (theme) {
    case 'idul_fitri':
      return `a ${characterName} character with typical Indonesian facial features, wearing festive Idul Fitri clothing (baju koko for male, gamis/kaftan for female) while still having some subtle health-related accessories.`;
    case 'idul_adha':
      return `a ${characterName} character with typical Indonesian facial features, wearing modest Idul Adha celebration attire, possibly with patterns related to the event, along with health-related accessories.`;
    case 'imlek':
      return `a ${characterName} character with typical Indonesian facial features, wearing a Cheongsam (for female) or Changshan (for male) in red or gold colors for Chinese New Year (Imlek), combined with health-related accessories.`;
    case 'ramadhan':
        return `a ${characterName} character with typical Indonesian facial features, wearing modest and neat Ramadhan-themed clothing like a gamis or koko, suitable for the holy month, along with health-related accessories.`;
    case 'hari_batik':
      return `a ${characterName} character with typical Indonesian facial features, wearing an elegant modern Batik shirt (for male) or dress (for female) to celebrate Batik Day, complemented by health-related accessories.`;
    case 'natal':
      return `a ${characterName} character with typical Indonesian facial features, wearing Christmas-themed attire (e.g., a Santa hat, red and green colors) along with health-related accessories.`;
    case 'default':
    default:
      if (character === 'bakteri') {
        return 'a cute and friendly 3D cartoon bacteria character, not scary.';
      }
      if (character === 'virus') {
        return 'a cute and friendly 3D cartoon virus character, not scary.';
      }
      return `a ${characterName} character with typical Indonesian facial features, wearing their respective uniform and using health-related accessories.`;
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
    const characterPrompt = getClothingPrompt(input.character, input.theme);
    
    const { media } = await ai.generate({
      model: 'googleai/gemini-2.0-flash-preview-image-generation',
      prompt: `Generate a thumbnail image for ${input.platform} with a 3D animated cartoon style. The scene must be health-themed with a modern, bright, and visually appealing background.
      Feature ${characterPrompt}
      The image must prominently display the following text: "${input.prompt}". The text should be colorful, using a very attractive, modern, and easy-to-read font style that stands out.
      The image MUST include the copyright text "UKM PONJA" in the bottom right corner. Also include a small icon representing the ${input.platform} platform.
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
