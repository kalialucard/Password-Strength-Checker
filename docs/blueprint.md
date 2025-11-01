# **App Name**: Passlock

## Core Features:

- Password Strength Checker: Real-time password strength analysis using zxcvbn and custom rules, displaying score, entropy bits, and suggestions.
- Password Generator: Generates passwords based on user-defined criteria (length, characters, diceware) with copy to clipboard and "use once" QR code functionality.
- Username Generator: Creates unique usernames following configurable patterns (adjective+noun+digits) and validates against Firestore.
- Encrypted Vault: Securely stores generated credentials client-side, encrypted using Web Crypto (PBKDF2+AES-GCM) with user-provided master password; only ciphertext is stored in Firestore.
- User Authentication: Implements Firebase Authentication (email/password + Google OAuth) for secure user management. Firebase manages all aspects of secure authorization and authentication.
- Breach Check (Optional): An optional Cloud Function to check for password breaches using the HaveIBeenPwned k-anonymity API; implemented server-side and deployable with API key configuration.

## Style Guidelines:

- Primary color: Deep indigo (#3F51B5) to convey security and trust.
- Background color: Light gray (#F0F2F5) for a clean and modern interface.
- Accent color: Teal (#009688) to highlight interactive elements and provide visual contrast.
- Font pairing: 'Space Grotesk' for headings, and 'Inter' for body text. This will give the site a contemporary, legible style.
- Code font: 'Source Code Pro' for any code snippets displayed (such as the QR code data). 
- Use simple, consistent icons from a library like FontAwesome or Material Icons.
- Responsive layout adapting to different screen sizes, with a clean and intuitive design.
- Subtle transitions and animations to enhance user experience, such as password strength meter filling.