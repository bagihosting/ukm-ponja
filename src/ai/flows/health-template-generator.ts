'use server';
/**
 * @fileOverview A health template generator AI flow.
 *
 * - generateHealthTemplate - A function that handles the health template generation process.
 * - GenerateHealthTemplateInput - The input type for the generateHealthTemplate function.
 * - GenerateHealthTemplateOutput - The return type for the generateHealthTemplate function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateHealthTemplateInputSchema = z.object({
  topic: z.string().describe('The topic for the health template.'),
});
export type GenerateHealthTemplateInput = z.infer<typeof GenerateHealthTemplateInputSchema>;

const GenerateHealthTemplateOutputSchema = z.object({
  template: z.string().describe('The generated health template content.'),
});
export type GenerateHealthTemplateOutput = z.infer<typeof GenerateHealthTemplateOutputSchema>;

export async function generateHealthTemplate(input: GenerateHealthTemplateInput): Promise<GenerateHealthTemplateOutput> {
  return generateHealthTemplateFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateHealthTemplatePrompt',
  input: {schema: GenerateHealthTemplateInputSchema},
  output: {schema: GenerateHealthTemplateOutputSchema},
  prompt: `You are an expert in public health and communication. Generate a concise, informative, and easy-to-understand template about the following health topic: {{{topic}}}. The template should be suitable for public health campaigns or educational materials. Provide a title, key points, and a call to action.`,
});

const generateHealthTemplateFlow = ai.defineFlow(
  {
    name: 'generateHealthTemplateFlow',
    inputSchema: GenerateHealthTemplateInputSchema,
    outputSchema: GenerateHealthTemplateOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
