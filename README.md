# Passlock: Your Secure Password & Username Utility

This is a Next.js application that serves as a security toolkit for managing your credentials. It's built with React, Tailwind CSS, ShadCN UI components, and uses Genkit for its AI-powered features.

## Features

- **Password Generator**: Create strong, secure, and customizable passwords. You can specify length and include/exclude uppercase letters, numbers, and symbols.
- **Password Strength Checker**: Analyze how strong a password is based on criteria like length, character diversity, and more.
- **AI-Powered Breach Check**: Securely checks if a password has been part of any known data breaches using the HaveIBeenPwned service via a Genkit AI flow.
- **Username Generator**: Quickly generate unique and memorable usernames.
- **Light & Dark Mode**: The UI supports both light and dark themes.

## Tech Stack

- [Next.js](https://nextjs.org/) (App Router)
- [React](https://react.dev/)
- [Tailwind CSS](https://tailwindcss.com/)
- [ShadCN UI](https://ui.shadcn.com/)
- [Genkit](https://firebase.google.com/docs/genkit) for AI flows
- [Docker](https://www.docker.com/)

## Getting Started

To get this project up and running on your local machine, you'll need to have [Node.js](https://nodejs.org/) installed (which includes `npm`).

### Installation & Setup (Local Development)

1.  **Clone the repository** (if you haven't already).

2.  **Install dependencies**: Open your terminal in the project's root directory and run:
    ```bash
    npm install
    ```

3.  **Set up environment variables**: For AI features to work, you will need to configure your Genkit environment. Typically this involves setting up a `.env` file with your Google AI API key.

4.  **Run the development server**:
    ```bash
    npm run dev
    ```

5.  **Open the app**: Open your web browser and navigate to [http://localhost:9002](http://localhost:9002).

You should now see the Passlock application running! You can start exploring its features and making changes to the code in `src/app/page.tsx`.

### Running with Docker

Alternatively, if you have [Docker](https://www.docker.com/products/docker-desktop/) installed, you can build and run the application using Docker Compose.

1.  **Build the Docker image and run the container**:
    ```bash
    docker-compose up --build
    ```
    This command will build the image defined in the `Dockerfile` and start the service.

2.  **Open the app**: Open your web browser and navigate to [http://localhost:9002](http://localhost:9002).

To stop the application, press `Ctrl+C` in the terminal where Docker Compose is running, and then run:
```bash
docker-compose down
```
