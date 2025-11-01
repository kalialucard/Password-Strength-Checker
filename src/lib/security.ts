import { randomBytes, randomInt } from 'crypto';

const lowercaseChars = "abcdefghijklmnopqrstuvwxyz";
const uppercaseChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const numberChars = "0123456789";
const symbolChars = "!@#$%^&*()_+-=[]{}|;:,.<>?";
const ambiguousChars = "[]{}()/\\'\"~,;.<>";

const adjectives = ["Agile", "Bright", "Clever", "Dandy", "Eager", "Fancy", "Gentle", "Happy", "Jolly", "Keen", "Lively", "Merry", "Nice", "Omega", "Proud", "Quick", "Royal", "Silly", "Tricky", "Vivid", "Witty", "Zany"];
const nouns = ["Ape", "Bear", "Cat", "Dog", "Elk", "Fox", "Goat", "Hawk", "Imp", "Jay", "Kite", "Lion", "Mink", "Newt", "Owl", "Puma", "Quail", "Rat", "Snake", "Tiger", "Vole", "Wolf", "Yak", "Zebra"];


export type GeneratePasswordOptions = {
    length: number;
    includeUppercase: boolean;
    includeNumbers: boolean;
    includeSymbols: boolean;
    excludeAmbiguous: boolean;
};

export function generatePassword(options: GeneratePasswordOptions): string {
    const { length, includeUppercase, includeNumbers, includeSymbols, excludeAmbiguous } = options;
    let charset = lowercaseChars;
    if (includeUppercase) charset += uppercaseChars;
    if (includeNumbers) charset += numberChars;
    if (includeSymbols) {
        let effectiveSymbols = symbolChars;
        if (excludeAmbiguous) {
            effectiveSymbols = symbolChars.split('').filter(char => !ambiguousChars.includes(char)).join('');
        }
        charset += effectiveSymbols;
    }

    let newPassword = "";
    // Use Node.js crypto for server-side generation
    if (typeof window === 'undefined') {
        const randomValues = randomBytes(length);
        for (let i = 0; i < length; i++) {
            newPassword += charset[randomValues[i] % charset.length];
        }
    } else { // Use browser crypto for client-side generation
        const crypto = window.crypto;
        const randomValues = new Uint32Array(length);
        crypto.getRandomValues(randomValues);
        for (let i = 0; i < length; i++) {
            newPassword += charset[randomValues[i] % charset.length];
        }
    }
    
    return newPassword;
}

export function generateUsername(): string {
    const randomAdjectiveIndex = typeof window === 'undefined' ? randomInt(adjectives.length) : Math.floor(Math.random() * adjectives.length);
    const randomNounIndex = typeof window === 'undefined' ? randomInt(nouns.length) : Math.floor(Math.random() * nouns.length);
    const randomDigits = typeof window === 'undefined' ? randomInt(10, 100) : Math.floor(10 + Math.random() * 90);

    const adj = adjectives[randomAdjectiveIndex];
    const noun = nouns[randomNounIndex];
    
    return `${adj}${noun}${randomDigits}`;
}

export type Strength = {
    score: number;
    feedback: string[];
    colorClass: string;
    label: string;
};

export const checkStrength = (p: string): Strength => {
    let score = 0;
    const feedback: string[] = [];
    
    if (p.length === 0) return { score: 0, feedback: [], colorClass: 'bg-destructive', label: '' };

    if (p.length >= 8) score += 1; else feedback.push("Use at least 8 characters.");
    if (p.length >= 12) score += 1;
    if (/[a-z]/.test(p)) score += 1; else feedback.push("Include a lowercase letter.");
    if (/[A-Z]/.test(p)) score += 1; else feedback.push("Include an uppercase letter.");
    if (/\d/.test(p)) score += 1; else feedback.push("Include a number.");
    if (/[^a-zA-Z0-9]/.test(p)) score += 1; else feedback.push("Include a special character.");
    
    const totalPoints = 6;
    const percentage = (score / totalPoints) * 100;

    let colorClass = "bg-destructive";
    let label = "Very Weak";

    if (percentage >= 100) { colorClass = "bg-green-500"; label = "Very Strong"; } 
    else if (percentage >= 80) { colorClass = "bg-green-500"; label = "Strong"; } 
    else if (percentage >= 60) { colorClass = "bg-yellow-500"; label = "Moderate"; } 
    else if (percentage >= 40) { colorClass = "bg-orange-500"; label = "Weak"; }
    
    return { score: percentage, feedback, colorClass, label };
};
