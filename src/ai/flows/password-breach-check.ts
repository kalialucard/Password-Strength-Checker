'use server';

/**
 * @fileOverview Checks if a password has been breached using the HaveIBeenPwned API.
 *
 * - passwordBreachCheck - A function that checks if a password has been breached.
 * - PasswordBreachCheckInput - The input type for the passwordBreachCheck function.
 * - PasswordBreachCheckOutput - The return type for the passwordBreachCheck function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const PasswordBreachCheckInputSchema = z.object({
  password: z.string().describe('The password to check for breaches.'),
});
export type PasswordBreachCheckInput = z.infer<typeof PasswordBreachCheckInputSchema>;

const PasswordBreachCheckOutputSchema = z.object({
  isBreached: z.boolean().describe('Whether the password has been breached.'),
  breachCount: z.number().describe('The number of times the password has been breached.'),
});
export type PasswordBreachCheckOutput = z.infer<typeof PasswordBreachCheckOutputSchema>;

export async function passwordBreachCheck(input: PasswordBreachCheckInput): Promise<PasswordBreachCheckOutput> {
  return passwordBreachCheckFlow(input);
}

const passwordBreachCheckPrompt = ai.definePrompt({
  name: 'passwordBreachCheckPrompt',
  input: {schema: PasswordBreachCheckInputSchema},
  output: {schema: PasswordBreachCheckOutputSchema},
  prompt: `You are a security expert. Check if the provided password has been part of any known data breaches.

Password: {{{password}}}

Respond with a JSON object indicating whether the password has been breached and the number of breaches.`,
});

const passwordBreachCheckFlow = ai.defineFlow(
  {
    name: 'passwordBreachCheckFlow',
    inputSchema: PasswordBreachCheckInputSchema,
    outputSchema: PasswordBreachCheckOutputSchema,
  },
  async input => {
    try {
      const {output} = await passwordBreachCheckPrompt(input);
      return output!;
    } catch (error: any) {
      console.error('Error during password breach check:', error);
      return {
        isBreached: false,
        breachCount: 0,
      };
    }
  }
);
