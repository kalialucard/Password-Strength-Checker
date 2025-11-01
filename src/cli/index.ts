#!/usr/bin/env tsx

import { Command } from 'commander';
import chalk from 'chalk';
import { generatePassword, generateUsername, checkStrength } from '@/lib/security';
import { passwordBreachCheck } from '@/ai/flows/password-breach-check';
import { config } from 'dotenv';

// Initialize dotenv and genkit AI
config();
import '@/ai/genkit';

const program = new Command();

program
    .name('passlock-cli')
    .description('A command-line interface for the Passlock security toolkit.');

program
    .command('generate-password')
    .description('Generate a new secure password.')
    .option('-l, --length <number>', 'Length of the password', '16')
    .option('--no-uppercase', 'Exclude uppercase letters')
    .option('--no-numbers', 'Exclude numbers')
    .option('--no-symbols', 'Exclude symbols')
    .option('--exclude-ambiguous', 'Exclude ambiguous characters like {}[]()', false)
    .action((options) => {
        const length = parseInt(options.length, 10);
        const password = generatePassword({
            length,
            includeUppercase: options.uppercase,
            includeNumbers: options.numbers,
            includeSymbols: options.symbols,
            excludeAmbiguous: options.excludeAmbiguous,
        });
        console.log(chalk.green('Generated Password:'));
        console.log(chalk.bold(password));
    });

program
    .command('generate-username')
    .description('Generate a new unique username.')
    .action(() => {
        const username = generateUsername();
        console.log(chalk.green('Generated Username:'));
        console.log(chalk.bold(username));
    });

program
    .command('check-strength <password>')
    .description('Check the strength of a password and look for breaches.')
    .action(async (password) => {
        console.log(chalk.blue('Analyzing password strength...'));

        const strength = checkStrength(password);
        
        console.log(`\nStrength: ${chalk.bold(strength.label)} (${Math.round(strength.score)}%)`);

        if (strength.feedback.length > 0) {
            console.log(chalk.yellow('\nSuggestions:'));
            strength.feedback.forEach(fb => console.log(`- ${fb}`));
        } else {
            console.log(chalk.green('\nThis is an excellent password!'));
        }

        console.log(chalk.blue('\nChecking for breaches with AI...'));
        try {
            const result = await passwordBreachCheck({ password });
            if (result.isBreached) {
                console.log(chalk.red.bold(`\nBREACH ALERT: This password was found in ${result.breachCount} known data breaches.`));
            } else {
                console.log(chalk.green.bold('\nGOOD NEWS: This password was not found in any of the checked data breaches.'));
            }
        } catch (error) {
            console.error(chalk.red('\nError checking for breaches:'), error);
        }
    });


program.parse(process.argv);
