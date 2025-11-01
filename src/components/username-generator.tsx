"use client";

import { useState, useCallback, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { Copy, RefreshCw, UserPlus } from "lucide-react";

const adjectives = ["Agile", "Bright", "Clever", "Dandy", "Eager", "Fancy", "Gentle", "Happy", "Jolly", "Keen", "Lively", "Merry", "Nice", "Omega", "Proud", "Quick", "Royal", "Silly", "Tricky", "Vivid", "Witty", "Zany"];
const nouns = ["Ape", "Bear", "Cat", "Dog", "Elk", "Fox", "Goat", "Hawk", "Imp", "Jay", "Kite", "Lion", "Mink", "Newt", "Owl", "Puma", "Quail", "Rat", "Snake", "Tiger", "Vole", "Wolf", "Yak", "Zebra"];

export function UsernameGenerator() {
  const [username, setUsername] = useState("");
  const { toast } = useToast();

  const generateUsername = useCallback(() => {
    const adj = adjectives[Math.floor(Math.random() * adjectives.length)];
    const noun = nouns[Math.floor(Math.random() * nouns.length)];
    const digits = Math.floor(10 + Math.random() * 90);
    setUsername(`${adj}${noun}${digits}`);
  }, []);

  useEffect(() => {
    generateUsername();
  }, [generateUsername]);

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
            placeholder="Click Generate to create a username"
            className="pr-20 text-lg font-code"
            aria-label="Generated Username"
          />
          <div className="absolute inset-y-0 right-0 flex items-center pr-2">
            <Button variant="ghost" size="icon" onClick={copyToClipboard} aria-label="Copy username">
              <Copy className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon" onClick={generateUsername} aria-label="Generate new username">
              <RefreshCw className="h-5 w-5" />
            </Button>
          </div>
        </div>
        <Button onClick={generateUsername} className="w-full font-headline text-lg">
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
