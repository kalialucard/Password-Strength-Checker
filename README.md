# Passlock 🔐

> Password strength checker, secure password generator, and AI-powered breach detector — with both a web UI and a CLI.

[![Next.js](https://img.shields.io/badge/Next.js-15-black?logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?logo=typescript)](https://www.typescriptlang.org/)
[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)

## What It Does

Passlock is a credential security toolkit. Enter or generate a password and get instant feedback on its strength, an AI-powered check against known breach databases, and a memorable username suggestion — all without sending your password to a third-party service.

## Screenshot

<!-- TODO: add a screenshot of the main UI here -->
![Passlock UI](docs/screenshot.png)

## Features

| Feature | Description |
|---|---|
| **Strength Checker** | Scores passwords on length, character diversity, entropy, and common-pattern detection |
| **Password Generator** | Customisable length, uppercase, numbers, symbols — cryptographically random |
| **AI Breach Check** | Genkit AI flow checks if a password appears in known breach datasets as you type |
| **Username Generator** | Creates unique, memorable usernames on demand |
| **CLI** | Full feature parity with the web UI — pipe-friendly and scriptable |
| **Dark / Light Mode** | Automatic system-preference detection |

## Installation

**Prerequisites:** Node.js 20+, npm.

```bash
git clone https://github.com/kalialucard/Password-Strength-Checker.git
cd Password-Strength-Checker
npm install
```

Add your Google AI key for the breach-check AI flow:

```bash
echo "GOOGLE_API_KEY=your_key_here" >> .env.local
```

## Usage

### Web UI

```bash
npm run dev
# → http://localhost:9002

# In a second terminal (AI flows)
npm run genkit:dev
```

### CLI

```bash
# Check password strength
npx ts-node src/cli/index.ts check "MyP@ssw0rd!"

# Generate a strong password (20 chars, all char classes)
npx ts-node src/cli/index.ts generate --length 20

# Generate a username
npx ts-node src/cli/index.ts username
```

## Project Structure

```
Password-Strength-Checker/
├── src/
│   ├── app/            # Next.js App Router pages
│   ├── components/     # ShadCN UI components
│   ├── ai/             # Genkit AI breach-check flow
│   └── cli/            # Commander.js CLI
├── docs/
└── package.json
```

## Contributing

PRs welcome. Open an issue first for large changes.

## License

[MIT](LICENSE) © kalialucard
