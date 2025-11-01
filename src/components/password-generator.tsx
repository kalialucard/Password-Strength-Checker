"use client";

import { useState, useCallback, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/hooks/use-toast";
import { Copy, RefreshCw } from "lucide-react";
import { Checkbox } from "./ui/checkbox";
import { generatePassword as generate } from "@/lib/security";

export function PasswordGenerator() {
  const [password, setPassword] = useState("");
  const [length, setLength] = useState(16);
  const [includeUppercase, setIncludeUppercase] = useState(true);
  const [includeNumbers, setIncludeNumbers] = useState(true);
  const [includeSymbols, setIncludeSymbols] = useState(true);
  const [excludeAmbiguous, setExcludeAmbiguous] = useState(false);
  const { toast } = useToast();

  const generateNewPassword = useCallback(() => {
    const newPassword = generate({
      length,
      includeUppercase,
      includeNumbers,
      includeSymbols,
      excludeAmbiguous,
    });
    setPassword(newPassword);
  }, [length, includeUppercase, includeNumbers, includeSymbols, excludeAmbiguous]);
  
  useEffect(() => {
    // Generate password only on the client-side after initial render
    generateNewPassword();
  }, []);

  const copyToClipboard = () => {
    if (password) {
      navigator.clipboard.writeText(password);
      toast({
        title: "Copied to clipboard!",
        description: "Your new password has been copied.",
      });
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-headline">Password Generator</CardTitle>
        <CardDescription>Create a strong and secure password.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="relative">
          <Input
            type="text"
            value={password}
            readOnly
            placeholder="Generating password..."
            aria-label="Generated Password"
            className="pr-20 text-lg font-code"
          />
          <div className="absolute inset-y-0 right-0 flex items-center pr-2">
            <Button variant="ghost" size="icon" onClick={copyToClipboard} aria-label="Copy password">
              <Copy className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon" onClick={generateNewPassword} aria-label="Generate new password">
              <RefreshCw className="h-5 w-5" />
            </Button>
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <Label htmlFor="length" className="text-base">Password Length</Label>
            <span className="font-bold text-primary">{length}</span>
          </div>
          <Slider
            id="length"
            min={8}
            max={64}
            step={1}
            value={[length]}
            onValueChange={(value) => setLength(value[0])}
          />
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div className="flex items-center space-x-3">
            <Switch id="uppercase" checked={includeUppercase} onCheckedChange={setIncludeUppercase} />
            <Label htmlFor="uppercase">Uppercase (A-Z)</Label>
          </div>
          <div className="flex items-center space-x-3">
            <Switch id="numbers" checked={includeNumbers} onCheckedChange={setIncludeNumbers} />
            <Label htmlFor="numbers">Numbers (0-9)</Label>
          </div>
          <div className="flex items-center space-x-3">
            <Switch id="symbols" checked={includeSymbols} onCheckedChange={setIncludeSymbols} />
            <Label htmlFor="symbols">Symbols (!@#...)</Label>
          </div>
          <div className="flex items-center space-x-3">
             <Checkbox id="ambiguous" checked={excludeAmbiguous} onCheckedChange={(checked) => setExcludeAmbiguous(Boolean(checked))} disabled={!includeSymbols} />
            <Label htmlFor="ambiguous" className={!includeSymbols ? 'text-muted-foreground' : ''}>Exclude Ambiguous</Label>
          </div>
        </div>

        <Button onClick={generateNewPassword} className="w-full font-headline text-lg">
          <RefreshCw className="mr-2 h-4 w-4"/>
          Generate Password
        </Button>
      </CardContent>
    </Card>
  );
}
