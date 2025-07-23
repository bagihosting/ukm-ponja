
'use server';
/**
 * @fileOverview A flow for generating health-themed quotes with images.
 *
 * - generateQuote - A function that handles the quote and image generation process.
 * - GenerateQuoteOutput - The return type for the generateQuote function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const GenerateQuoteOutputSchema = z.object({
  quote: z.string().describe('An inspiring quote about health.'),
  character: z.string().describe("A character that is relevant to the quote (e.g., 'doctor', 'nurse', 'elderly_man', 'adult_woman', 'boy')."),
  imageUrl: z.string().describe('The data URI of the generated image.'),
});
export type GenerateQuoteOutput = z.infer<typeof GenerateQuoteOutputSchema>;

export async function generateQuote(): Promise<GenerateQuoteOutput> {
  return generateQuoteFlow();
}

const characterList = [
    'doctor', 'nurse', 'midwife', 'adult_man', 'adult_woman', 'boy', 'girl', 'baby', 
    'elderly_man', 'elderly_woman', 'bakteri', 'virus'
];

const generateQuoteFlow = ai.defineFlow(
  {
    name: 'generateQuoteFlow',
    outputSchema: GenerateQuoteOutputSchema,
  },
  async () => {
    // Step 1: Generate a health quote and suggest a character
    const { output: quoteAndCharacter } = await ai.generate({
        prompt: `Generate a short, inspiring, and unique health or wellness quote in Indonesian. Also, suggest the most relevant character from the following list to be featured in an image with the quote: ${characterList.join(', ')}.`,
        output: {
            schema: z.object({
                quote: z.string().describe('The generated health quote in Indonesian.'),
                character: z.string().describe('The suggested character from the list.'),
            })
        },
        model: 'googleai/gemini-2.0-flash',
    });

    if (!quoteAndCharacter) {
        throw new Error('Failed to generate quote and character.');
    }
    
    const { quote, character } = quoteAndCharacter;
    const characterPrompt = `a 3D animated cartoon style ${character.replace(/_/g, ' ')} character with typical Indonesian facial features, looking friendly and inspiring.`;

    // Step 2: Generate an image based on the quote and character
    const { media } = await ai.generate({
      model: 'googleai/gemini-2.0-flash-preview-image-generation',
      prompt: `Generate an image with a 3D animated cartoon style. The scene must have a modern, bright, and visually appealing health-themed background.
      Feature ${characterPrompt}.
      The image must prominently display the following text: "${quote}". The text should be colorful, using a very attractive, modern, and easy-to-read font style that stands out.
      The aspect ratio must be 16:9.`,
      config: {
        responseModalities: ['TEXT', 'IMAGE'],
      },
    });

    const imageUrl = media?.url || '';
    if (!imageUrl) {
      throw new Error('Image generation failed, no media URL returned.');
    }
    
    return { quote, character, imageUrl };
  }
);
