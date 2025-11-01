# Passlock: Your Secure Password & Username Utility

This is a Next.js application that serves as a security toolkit for managing your credentials. It's built with React, Tailwind CSS, ShadCN UI components, and uses Genkit for its AI-powered features. It also includes a command-line interface (CLI) for terminal-based usage.

## Features

- **Password Generator**: Create strong, secure, and customizable passwords. You can specify length and include/exclude uppercase letters, numbers, and symbols.
- **Password Strength Checker**: Analyze how strong a password is based on criteria like length, character diversity, and more.
- **AI-Powered Breach Check**: Securely and automatically checks if a password has been part of any known data breaches as you type, using a Genkit AI flow.
- **Username Generator**: Quickly generate unique and memorable usernames.
- **Command-Line Interface (CLI)**: Access core features (password/username generation, strength & breach check) directly from your terminal.
- **Light & Dark Mode**: The UI supports both light and dark themes.

## Tech Stack

- [Next.js](https://nextjs.org/) (App Router)
- [React](https://react.dev/)
- [Tailwind CSS](https://tailwindcss.com/)
- [ShadCN UI](https://ui.shadcn.com/)
- [Genkit](https://firebase.google.com/docs/genkit) for AI flows
- [Commander.js](https://github.com/tj/commander.js) for the CLI

---

## System Requirements

This tool is designed to run on any major operating system (Windows, macOS, Linux). 
- You must have **[Node.js](https://nodejs.org/)** installed (which includes `npm`).

---

## How to Get Started

### 1. Get the Project Files

To run this application on your own computer, you first need to copy all the project files from your current development environment to a folder on your local machine.

### 2. Running the Web Application (GUI)

1.  **Open your terminal**: Navigate to the project folder where you copied the files.

2.  **Install dependencies**: Run the following command to install the necessary packages.
    ```bash
    npm install
    ```

3.  **Run the development server**:
    ```bash
    npm run dev
    ```

4.  **Open the app**: Open your web browser and go to [http://localhost:9002](http://localhost:9002).


### 3. Using the Command-Line Interface (CLI)

You can also use Passlock's features directly from your terminal without needing the web interface. Make sure you have installed dependencies first (`npm install`).

**1. Generate a Password**
```bash
npm run cli generate-password
```
**Options:**
- `-l, --length <number>`: Set password length (default: 16).
- `--no-uppercase`: Exclude uppercase letters.
- `--no-numbers`: Exclude numbers.
- `--no-symbols`: Exclude symbols.
- `--exclude-ambiguous`: Exclude ambiguous characters.

*Example:* `npm run cli generate-password -l 32 --no-symbols`

**2. Generate a Username**
```bash
npm run cli generate-username
```

**3. Check Password Strength & for Breaches**
This command analyzes strength and automatically checks for breaches using AI.
```bash
npm run cli check-strength "your-password-here"
```
*Example:* `npm run cli check-strength "P@ssw0rd123!"`
# Password-Strength-Checker
# Password-Strength-Checker
# Password-Strength-Checker
