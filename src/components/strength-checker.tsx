"use client";

import { useState, useMemo, useEffect, useCallback } from "react";
import { passwordBreachCheck } from "@/ai/flows/password-breach-check";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { useToast } from "@/hooks/use-toast";
import { CheckCircle, Shield, Loader2, AlertTriangle } from "lucide-react";
import { checkStrength, Strength } from "@/lib/security";

// Debounce function
const debounce = <F extends (...args: any[]) => any>(func: F, waitFor: number) => {
  let timeout: NodeJS.Timeout;
  return (...args: Parameters<F>): Promise<ReturnType<F>> =>
    new Promise(resolve => {
      clearTimeout(timeout);
      timeout = setTimeout(() => resolve(func(...args)), waitFor);
    });
};

export function StrengthChecker() {
    const [password, setPassword] = useState("");
    const [isCheckingBreach, setIsCheckingBreach] = useState(false);
    const [breachResult, setBreachResult] = useState<{ isBreached: boolean; breachCount: number } | null>(null);
    const { toast } = useToast();

    const strength: Strength = useMemo(() => checkStrength(password), [password]);

    const debouncedBreachCheck = useCallback(
        debounce(async (pass: string) => {
            if (!pass) {
                setBreachResult(null);
                setIsCheckingBreach(false);
                return;
            }
            setIsCheckingBreach(true);
            try {
                const result = await passwordBreachCheck({ password: pass });
                setBreachResult(result);
            } catch (error) {
                console.error("Breach check failed:", error);
                toast({
                    title: "Error",
                    description: "Could not perform the breach check. Please try again later.",
                    variant: "destructive",
                });
                setBreachResult(null);
            } finally {
                setIsCheckingBreach(false);
            }
        }, 500),
        [toast]
    );

    useEffect(() => {
        setIsCheckingBreach(true);
        debouncedBreachCheck(password);
    }, [password, debouncedBreachCheck]);

    return (
        <Card>
            <CardHeader>
                <CardTitle className="font-headline flex items-center">
                    <Shield className="mr-2 h-6 w-6" />
                    Password Strength & Breach Check
                </CardTitle>
                <CardDescription>Analyze your password's strength and check for data breaches.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
                <Input
                    type="text"
                    placeholder="Enter a password to analyze"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="text-lg font-code"
                />

                {password.length > 0 && (
                    <div className="space-y-4">
                        <div className="space-y-2">
                            <div className="flex items-center justify-between">
                                <span className="text-sm text-muted-foreground">Strength: <span className="font-bold text-foreground">{strength.label}</span></span>
                            </div>
                            <Progress value={strength.score} className="h-2" indicatorClassName={strength.colorClass} />
                        </div>
                        
                        <div>
                            {strength.feedback.length > 0 ? (
                                <div className="text-sm text-muted-foreground space-y-2 rounded-lg border bg-card p-4">
                                  <h4 className="font-medium text-foreground">Suggestions:</h4>
                                  <ul className="list-disc pl-5 space-y-1">
                                      {strength.feedback.map((item, index) => (
                                          <li key={index}>{item}</li>
                                      ))}
                                  </ul>
                                </div>
                            ) : (
                                <Alert className="border-green-500/50 text-green-500">
                                    <CheckCircle className="h-4 w-4 text-green-500" />
                                    <AlertTitle className="text-green-600 dark:text-green-500">Excellent Password!</AlertTitle>
                                    <AlertDescription className="text-muted-foreground">
                                        This password meets all the recommended criteria for strength.
                                    </AlertDescription>
                                </Alert>
                            )}
                        </div>

                         <div className="space-y-2">
                             <h4 className="text-sm font-medium text-foreground">AI Data Breach Check</h4>
                            {isCheckingBreach && (
                                <div className="flex items-center text-sm text-muted-foreground">
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                    Checking for breaches...
                                </div>
                            )}
                            {!isCheckingBreach && breachResult && breachResult.isBreached && (
                                 <Alert variant="destructive">
                                    <AlertTriangle className="h-4 w-4" />
                                    <AlertTitle>Breach Alert!</AlertTitle>
                                    <AlertDescription>
                                        This password was found in {breachResult.breachCount} known data breaches. Do not use it.
                                    </AlertDescription>
                                </Alert>
                            )}
                             {!isCheckingBreach && breachResult && !breachResult.isBreached && (
                                <Alert className="border-green-500/50 text-green-500">
                                    <CheckCircle className="h-4 w-4 text-green-500" />
                                    <AlertTitle className="text-green-600 dark:text-green-500">Looks Good!</AlertTitle>
                                    <AlertDescription className="text-muted-foreground">
                                        This password was not found in any of the checked data breaches.
                                    </AlertDescription>
                                </Alert>
                            )}
                             <p className="text-xs text-muted-foreground text-center pt-2">
                                The breach check is performed securely using GenAI and your password is not stored.
                            </p>
                        </div>
                    </div>
                )}
            </CardContent>
        </Card>
    );
}
