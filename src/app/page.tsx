import { Header } from '@/components/header';
import { PasswordGenerator } from '@/components/password-generator';
import { StrengthChecker } from '@/components/strength-checker';
import { UsernameGenerator } from '@/components/username-generator';

export default function Home() {
  return (
    <div className="flex min-h-screen w-full flex-col bg-secondary dark:bg-background">
      <Header />
      <main className="flex flex-1 flex-col items-center gap-8 p-4 md:p-8">
        <div className="w-full max-w-4xl text-center">
            <h1 className="text-3xl font-bold font-headline md:text-4xl">Security Toolkit</h1>
            <p className="text-lg text-muted-foreground">Generate, analyze, and manage your credentials with ease.</p>
        </div>
        <div className="grid w-full max-w-xl gap-8">
          <PasswordGenerator />
          <StrengthChecker />
          <UsernameGenerator />
        </div>
      </main>
    </div>
  );
}
