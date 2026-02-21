"use client";

import { useState, useEffect, Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Mail, Lock, User, ArrowRight, Check, Building2, Crown, Zap } from "lucide-react";
import Image from "next/image";

type PlanType = "free" | "pro" | "premium";

const plans = {
  free: {
    name: "Free",
    price: "$0",
    description: "Try before you buy",
    icon: Zap,
    iconBg: "bg-slate-100",
    iconColor: "text-slate-600",
  },
  pro: {
    name: "Pro",
    price: "$9/mo",
    description: "For businesses & creators",
    icon: Building2,
    iconBg: "bg-teal-100",
    iconColor: "text-teal-600",
    popular: true,
  },
  premium: {
    name: "Premium",
    price: "$29/mo",
    description: "For agencies & teams",
    icon: Crown,
    iconBg: "bg-amber-100",
    iconColor: "text-amber-600",
  },
};

function SignupContent() {
  const searchParams = useSearchParams();
  const [selectedPlan, setSelectedPlan] = useState<PlanType>("pro");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const planParam = searchParams.get("plan");
    if (planParam && (planParam === "free" || planParam === "pro" || planParam === "premium")) {
      setSelectedPlan(planParam);
    }
  }, [searchParams]);

  const handleEmailSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    
    // TODO: Implement Supabase auth
    console.log("Signup with:", { name, email, password, plan: selectedPlan });
    
    // Simulate signup
    setTimeout(() => {
      setLoading(false);
      if (selectedPlan === "free") {
        window.location.href = "/dashboard";
      } else {
        // Redirect to Stripe checkout
        window.location.href = "/dashboard?setup=billing";
      }
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4 py-12">
      <div className="w-full max-w-lg">
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
          <p className="text-muted-foreground mt-2">Create your account</p>
        </div>

        <Card className="p-6">
          {/* Plan Selection */}
          <div className="mb-6">
            <Label className="text-base font-medium mb-3 block">Select your plan</Label>
            <div className="grid grid-cols-3 gap-3">
              {(Object.entries(plans) as [PlanType, typeof plans.free & { popular?: boolean }][]).map(([key, plan]) => {
                const Icon = plan.icon;
                const isSelected = selectedPlan === key;
                return (
                  <button
                    key={key}
                    type="button"
                    onClick={() => setSelectedPlan(key)}
                    className={`relative p-4 rounded-lg border-2 transition-all text-left ${
                      isSelected 
                        ? "border-teal-500 bg-teal-50" 
                        : "border-slate-200 hover:border-slate-300"
                    }`}
                  >
                    {plan.popular && (
                      <span className="absolute -top-2 left-1/2 -translate-x-1/2 text-[10px] font-semibold bg-teal-500 text-white px-2 py-0.5 rounded-full">
                        Popular
                      </span>
                    )}
                    <div className={`w-8 h-8 rounded-lg ${plan.iconBg} flex items-center justify-center mb-2`}>
                      <Icon className={`h-4 w-4 ${plan.iconColor}`} />
                    </div>
                    <div className="font-medium text-sm">{plan.name}</div>
                    <div className="text-xs text-muted-foreground">{plan.price}</div>
                    {isSelected && (
                      <div className="absolute top-2 right-2">
                        <Check className="h-4 w-4 text-teal-500" />
                      </div>
                    )}
                  </button>
                );
              })}
            </div>
            <p className="text-xs text-muted-foreground mt-2 text-center">
              {selectedPlan === "free" 
                ? "Preview documents only. Upgrade anytime."
                : selectedPlan === "pro"
                ? "Full documents, exports, 25/month"
                : "Unlimited documents, bulk generate, team features"
              }
            </p>
          </div>

          {/* Email Signup Form */}
          <form onSubmit={handleEmailSignup} className="space-y-4">
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
                {error}
              </div>
            )}

            <div>
              <Label htmlFor="name">Full Name</Label>
              <div className="relative mt-1">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  id="name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="John Doe"
                  className="pl-10"
                  required
                />
              </div>
            </div>

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

            <div>
              <Label htmlFor="password">Password</Label>
              <div className="relative mt-1">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="pl-10"
                  minLength={8}
                  required
                />
              </div>
              <p className="text-xs text-muted-foreground mt-1">Minimum 8 characters</p>
            </div>

            <Button type="submit" className="w-full btn-gradient" disabled={loading}>
              {loading ? "Creating account..." : (
                selectedPlan === "free" ? "Create Free Account" : `Continue to Payment`
              )}
              {!loading && <ArrowRight className="ml-2 h-4 w-4" />}
            </Button>
          </form>

          <p className="text-center text-sm text-muted-foreground mt-6">
            Already have an account?{" "}
            <Link href="/login" className="text-teal-600 hover:text-teal-700 font-medium">
              Sign in
            </Link>
          </p>
        </Card>

        <p className="text-center text-xs text-muted-foreground mt-6">
          By signing up, you agree to our{" "}
          <Link href="/our-terms" className="underline hover:text-foreground">Terms of Service</Link>
          {" "}and{" "}
          <Link href="/our-privacy" className="underline hover:text-foreground">Privacy Policy</Link>
        </p>
      </div>
    </div>
  );
}

export default function SignupPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="animate-pulse text-muted-foreground">Loading...</div>
      </div>
    }>
      <SignupContent />
    </Suspense>
  );
}
