import { Header } from '@/components/header';
import { PasswordGenerator } from '@/components/password-generator';
import { StrengthChecker } from '@/components/strength-checker';
import { UsernameGenerator } from '@/components/username-generator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { KeyRound, Shield, UserPlus } from 'lucide-react';

export default function Home() {
  return (
    <div className="flex min-h-screen w-full flex-col bg-secondary dark:bg-background">
      <Header />
      <main className="flex min-h-[calc(100vh-3.5rem)] flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
        <div className="mx-auto grid w-full max-w-4xl items-start gap-6">
            <div className="text-center">
                <h1 className="text-3xl font-bold font-headline md:text-4xl">Security Toolkit</h1>
                <p className="text-lg text-muted-foreground">Generate, analyze, and manage your credentials with ease.</p>
            </div>
            <Tabs defaultValue="generator" className="w-full">
            <TabsList className="grid w-full grid-cols-3 mx-auto max-w-md">
                <TabsTrigger value="generator">
                    <KeyRound className="mr-2 h-4 w-4" /> Generator
                </TabsTrigger>
                <TabsTrigger value="checker">
                    <Shield className="mr-2 h-4 w-4" /> Strength Check
                </TabsTrigger>
                 <TabsTrigger value="username">
                    <UserPlus className="mr-2 h-4 w-4" /> Username
                </TabsTrigger>
            </TabsList>
            <TabsContent value="generator">
                <PasswordGenerator />
            </TabsContent>
            <TabsContent value="checker">
                <StrengthChecker />
            </TabsContent>
            <TabsContent value="username">
                <UsernameGenerator />
            </TabsContent>
            </Tabs>
        </div>
      </main>
    </div>
  );
}
