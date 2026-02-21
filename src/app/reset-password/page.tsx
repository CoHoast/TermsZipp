"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Lock, CheckCircle, AlertCircle } from "lucide-react";
import { createClient } from "@/lib/supabase";

export default function ResetPasswordPage() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [validSession, setValidSession] = useState<boolean | null>(null);

  useEffect(() => {
    // Check if user has a valid session (came from email link)
    const checkSession = async () => {
      const supabase = createClient();
      const { data: { session } } = await supabase.auth.getSession();
      setValidSession(!!session);
    };
    checkSession();
  }, []);

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }

    setLoading(true);
    setError("");
    
    const supabase = createClient();
    
    const { error: updateError } = await supabase.auth.updateUser({
      password: password,
    });

    if (updateError) {
      setError(updateError.message);
      setLoading(false);
      return;
    }

    setSuccess(true);
    setLoading(false);

    // Redirect to dashboard after a short delay
    setTimeout(() => {
      router.push("/dashboard");
    }, 2000);
  };

  // Still checking session
  if (validSession === null) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-teal-500 mx-auto"></div>
          <p className="text-muted-foreground mt-4">Loading...</p>
        </div>
      </div>
    );
  }

  // Invalid or expired link
  if (!validSession) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
        <div className="w-full max-w-md">
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
          </div>

          <Card className="p-6 text-center">
            <AlertCircle className="h-12 w-12 text-red-500 mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">Invalid or Expired Link</h3>
            <p className="text-muted-foreground text-sm mb-6">
              This password reset link is invalid or has expired. Please request a new one.
            </p>
            <Link href="/forgot-password">
              <Button className="w-full btn-gradient">
                Request New Link
              </Button>
            </Link>
          </Card>
        </div>
      </div>
    );
  }

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
          <p className="text-muted-foreground mt-2">Set your new password</p>
        </div>

        <Card className="p-6">
          {success ? (
            <div className="text-center py-4">
              <CheckCircle className="h-12 w-12 text-teal-500 mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">Password Updated!</h3>
              <p className="text-muted-foreground text-sm">
                Your password has been successfully reset. Redirecting to dashboard...
              </p>
            </div>
          ) : (
            <form onSubmit={handleResetPassword} className="space-y-4">
              {error && (
                <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
                  {error}
                </div>
              )}

              <div>
                <Label htmlFor="password">New Password</Label>
                <div className="relative mt-1">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="pl-10"
                    required
                    minLength={6}
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="confirmPassword">Confirm New Password</Label>
                <div className="relative mt-1">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="confirmPassword"
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="••••••••"
                    className="pl-10"
                    required
                    minLength={6}
                  />
                </div>
              </div>

              <Button type="submit" className="w-full btn-gradient" disabled={loading}>
                {loading ? "Updating..." : "Update Password"}
              </Button>
            </form>
          )}
        </Card>
      </div>
    </div>
  );
}
