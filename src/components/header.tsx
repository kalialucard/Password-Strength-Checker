import Link from 'next/link';
import { Lock } from 'lucide-react';
import { ThemeToggle } from './theme-toggle';

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 max-w-screen-2xl items-center">
        <Link href="/" className="mr-6 flex items-center space-x-2">
          <Lock className="h-6 w-6 text-primary" />
          <span className="font-headline text-xl font-bold">Passlock</span>
        </Link>
        <div className="flex flex-1 items-center justify-end space-x-2">
            <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
