"use client";

import { useState, useMemo } from "react";
import { passwordBreachCheck } from "@/ai/flows/password-breach-check";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { useToast } from "@/hooks/use-toast";
import { CheckCircle, Loader2 } from "lucide-react";

type Strength = {
    score: number;
    feedback: string[];
    colorClass: string;
    label: string;
};

export function StrengthChecker() {
    const [password, setPassword] = useState("");
    const [isCheckingBreach, setIsCheckingBreach] = useState(false);
    const { toast } = useToast();

    const checkStrength = (p: string): Strength => {
        let score = 0;
        const feedback: string[] = [];
        
        if (p.length === 0) return { score: 0, feedback: [], colorClass: 'bg-destructive', label: '' };

        if (p.length >= 8) score += 1; else feedback.push("Use at least 8 characters.");
        if (p.length >= 12) score += 1;
        if (/[a-z]/.test(p)) score += 1; else feedback.push("Include a lowercase letter.");
        if (/[A-Z]/.test(p)) score += 1; else feedback.push("Include an uppercase letter.");
        if (/\d/.test(p)) score += 1; else feedback.push("Include a number.");
        if (/[^a-zA-Z0-9]/.test(p)) score += 1; else feedback.push("Include a special character.");
        
        const totalPoints = 6;
        const percentage = (score / totalPoints) * 100;

        let colorClass = "bg-destructive";
        let label = "Very Weak";

        if (percentage >= 100) { colorClass = "bg-green-500"; label = "Very Strong"; } 
        else if (percentage >= 80) { colorClass = "bg-green-500"; label = "Strong"; } 
        else if (percentage >= 60) { colorClass = "bg-yellow-500"; label = "Moderate"; } 
        else if (percentage >= 40) { colorClass = "bg-orange-500"; label = "Weak"; }
        
        return { score: percentage, feedback, colorClass, label };
    };

    const strength = useMemo(() => checkStrength(password), [password]);

    const handleBreachCheck = async () => {
        if (!password) {
            toast({
                title: "No password provided",
                description: "Please enter a password to check for breaches.",
                variant: "destructive"
            });
            return;
        }

        setIsCheckingBreach(true);
        try {
            const result = await passwordBreachCheck({ password });
            if (result.isBreached) {
                toast({
                    title: "Password Breached!",
                    description: `This password has appeared in ${result.breachCount} known data breaches. It is not safe to use.`,
                    variant: "destructive",
                    duration: 9000,
                });
            } else {
                toast({
                    title: "Password Secure",
                    description: "This password was not found in any of the checked data breaches.",
                });
            }
        } catch (error) {
            console.error("Breach check failed:", error);
            toast({
                title: "Error",
                description: "Could not perform the breach check. Please try again later.",
                variant: "destructive",
            });
        } finally {
            setIsCheckingBreach(false);
        }
    };

    return (
        <Card>
            <CardHeader>
                <CardTitle className="font-headline">Password Strength Checker</CardTitle>
                <CardDescription>Analyze your password's strength and check for breaches.</CardDescription>
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
                        <div className="flex items-center justify-between">
                            <span className="text-sm text-muted-foreground">Strength: <span className="font-bold text-foreground">{strength.label}</span></span>
                        </div>
                        <Progress value={strength.score} className="h-2" indicatorClassName={strength.colorClass} />
                        
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
                                <Alert className="border-accent/50">
                                    <CheckCircle className="h-4 w-4 text-accent" />
                                    <AlertTitle className="text-accent">Excellent Password!</AlertTitle>
                                    <AlertDescription className="text-muted-foreground">
                                        This password meets all the recommended criteria.
                                    </AlertDescription>
                                </Alert>
                            )}
                        </div>
                    </div>
                )}

                <Button onClick={handleBreachCheck} className="w-full font-headline text-lg" disabled={isCheckingBreach || !password}>
                    {isCheckingBreach ? (
                        <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Checking...</>
                    ) : "Check for Breaches with AI"}
                </Button>
                 <p className="text-xs text-muted-foreground text-center">
                    The breach check is performed securely using GenAI and your password is not stored.
                </p>
            </CardContent>
        </Card>
    );
}
