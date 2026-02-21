"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Mail, ArrowLeft, CheckCircle } from "lucide-react";
import { createClient } from "@/lib/supabase";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [sent, setSent] = useState(false);

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    
    const supabase = createClient();
    
    const { error: resetError } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/reset-password`,
    });

    if (resetError) {
      setError(resetError.message);
      setLoading(false);
      return;
    }

    setSent(true);
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center gap-0.5 justify-center">
            <Image 
              src="/logo.svg" 
              alt="TermsZipp" 
              width={28} 
              height={36}
              className="w-7 h-9"
            />
            <span className="text-2xl font-bold">
              Terms<span className="brand-gradient-text font-extrabold">Zipp</span>
            </span>
          </Link>
          <p className="text-muted-foreground mt-2">Reset your password</p>
        </div>

        <Card className="p-6">
          {sent ? (
            <div className="text-center py-4">
              <CheckCircle className="h-12 w-12 text-teal-500 mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">Check your email</h3>
              <p className="text-muted-foreground text-sm mb-6">
                We've sent a password reset link to <strong>{email}</strong>
              </p>
              <p className="text-muted-foreground text-xs mb-6">
                Didn't receive the email? Check your spam folder or{" "}
                <button 
                  onClick={() => setSent(false)} 
                  className="text-teal-600 hover:text-teal-700 underline"
                >
                  try again
                </button>
              </p>
              <Link href="/login">
                <Button variant="outline" className="w-full">
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Back to login
                </Button>
              </Link>
            </div>
          ) : (
            <>
              <p className="text-sm text-muted-foreground mb-6">
                Enter your email address and we'll send you a link to reset your password.
              </p>

              <form onSubmit={handleResetPassword} className="space-y-4">
                {error && (
                  <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
                    {error}
                  </div>
                )}

                <div>
                  <Label htmlFor="email">Email</Label>
                  <div className="relative mt-1">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="you@example.com"
                      className="pl-10"
                      required
                    />
                  </div>
                </div>

                <Button type="submit" className="w-full btn-gradient" disabled={loading}>
                  {loading ? "Sending..." : "Send Reset Link"}
                </Button>
              </form>

              <div className="mt-6 text-center">
                <Link href="/login" className="text-sm text-muted-foreground hover:text-foreground inline-flex items-center">
                  <ArrowLeft className="mr-1 h-4 w-4" />
                  Back to login
                </Link>
              </div>
            </>
          )}
        </Card>
      </div>
    </div>
  );
}
