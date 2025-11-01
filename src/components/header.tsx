import Link from 'next/link';
import { Lock, User } from 'lucide-react';
import { ThemeToggle } from './theme-toggle';
import { Button } from './ui/button';

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 max-w-screen-2xl items-center">
        <Link href="/" className="mr-6 flex items-center space-x-2">
          <Lock className="h-6 w-6 text-primary" />
          <span className="font-headline text-xl font-bold">Passlock</span>
        </Link>
        <div className="flex flex-1 items-center justify-end space-x-2">
            <p className="text-sm text-muted-foreground hidden sm:block">Login feature coming soon</p>
            <Button variant="outline" size="icon" disabled>
                <User className="h-5 w-5" />
                <span className="sr-only">Profile</span>
            </Button>
            <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
