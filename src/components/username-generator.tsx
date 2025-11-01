"use client";

import { useState, useCallback, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { Copy, RefreshCw, UserPlus } from "lucide-react";
import { generateUsername as generate } from "@/lib/security";

export function UsernameGenerator() {
  const [username, setUsername] = useState("");
  const { toast } = useToast();

  const generateNewUsername = useCallback(() => {
    setUsername(generate());
  }, []);

  useEffect(() => {
    // Generate username only on the client-side after initial render to avoid hydration mismatch
    generateNewUsername();
  }, [generateNewUsername]);

  const copyToClipboard = () => {
    if (username) {
      navigator.clipboard.writeText(username);
      toast({
        title: "Copied to clipboard!",
        description: "Your new username has been copied.",
      });
    }
  };
  
  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-headline flex items-center">
          <UserPlus className="mr-2 h-6 w-6"/>
          Username Generator
        </CardTitle>
        <CardDescription>Create a unique and memorable username.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="relative">
          <Input
            type="text"
            value={username}
            readOnly
            placeholder="Generating username..."
            className="pr-20 text-lg font-code"
            aria-label="Generated Username"
          />
          <div className="absolute inset-y-0 right-0 flex items-center pr-2">
            <Button variant="ghost" size="icon" onClick={copyToClipboard} aria-label="Copy username">
              <Copy className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon" onClick={generateNewUsername} aria-label="Generate new username">
              <RefreshCw className="h-5 w-5" />
            </Button>
          </div>
        </div>
        <Button onClick={generateNewUsername} className="w-full font-headline text-lg">
          <RefreshCw className="mr-2 h-4 w-4"/>
          Generate Username
        </Button>
        <p className="text-xs text-muted-foreground text-center">
            Uniqueness check is planned for authenticated users.
        </p>
      </CardContent>
    </Card>
  );
}
