"use client";

import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  CreditCard, Check, X, ArrowRight, AlertCircle, Building2, Crown, Zap,
  ExternalLink, Loader2
} from "lucide-react";
import { createClient } from "@/lib/supabase";

type PlanType = "free" | "pro" | "premium";

const plans = {
  free: {
    name: "Free",
    price: 0,
    priceAnnual: 0,
    description: "Preview documents only",
    icon: Zap,
    iconBg: "bg-slate-100",
    iconColor: "text-slate-600",
    features: [
      { name: "Access all 6 generators", included: true },
      { name: "Preview document output", included: true },
      { name: "Full document access", included: false },
      { name: "Word & PDF export", included: false },
      { name: "Save documents", included: false },
    ],
  },
  pro: {
    name: "Pro",
    price: 9,
    priceAnnual: 79,
    description: "For businesses & creators",
    icon: Building2,
    iconBg: "bg-teal-100",
    iconColor: "text-teal-600",
    popular: true,
    features: [
      { name: "All 6 generators", included: true },
      { name: "Full document access", included: true },
      { name: "Word, PDF & Markdown export", included: true },
      { name: "25 documents per month", included: true },
      { name: "Save up to 50 documents", included: true },
      { name: "No TermsZipp branding", included: true },
      { name: "Bulk generate all 6", included: false },
    ],
  },
  premium: {
    name: "Premium",
    price: 19,
    priceAnnual: 149,
    description: "For power users & agencies",
    icon: Crown,
    iconBg: "bg-amber-100",
    iconColor: "text-amber-600",
    features: [
      { name: "Everything in Pro", included: true },
      { name: "Unlimited documents", included: true },
      { name: "Unlimited saved documents", included: true },
      { name: "Bulk generate all 6 at once", included: true },
      { name: "Priority support", included: true },
      { name: "Early access to new features", included: true },
    ],
  },
};

interface Profile {
  id: string;
  plan: string;
  subscription_status: string;
  stripe_customer_id: string | null;
  documents_generated_this_month: number;
  documents_limit: number;
}

export default function BillingPage() {
  const [billingCycle, setBillingCycle] = useState<"monthly" | "annual">("monthly");
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);
  const [portalLoading, setPortalLoading] = useState(false);
  const [checkoutLoading, setCheckoutLoading] = useState<string | null>(null);

  useEffect(() => {
    async function loadProfile() {
      const supabase = createClient();
      const { data: { user } } = await supabase.auth.getUser();
      
      if (user) {
        const { data } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', user.id)
          .single();
        
        if (data) {
          setProfile(data);
        } else {
          // Fallback
          setProfile({
            id: user.id,
            plan: user.user_metadata?.plan || 'free',
            subscription_status: 'inactive',
            stripe_customer_id: null,
            documents_generated_this_month: 0,
            documents_limit: 3,
          });
        }
      }
      setLoading(false);
    }
    loadProfile();
  }, []);

  const currentPlan = (profile?.plan || 'free') as PlanType;

  const handleManageBilling = async () => {
    if (!profile?.id) return;
    
    setPortalLoading(true);
    try {
      const response = await fetch('/api/billing-portal', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId: profile.id }),
      });
      
      const { url, error } = await response.json();
      
      if (error) {
        alert(error);
        setPortalLoading(false);
        return;
      }
      
      window.location.href = url;
    } catch (err) {
      alert('Failed to open billing portal. Please try again.');
      setPortalLoading(false);
    }
  };

  const handleUpgrade = async (plan: PlanType) => {
    if (!profile?.id) return;
    
    setCheckoutLoading(plan);
    try {
      const supabase = createClient();
      const { data: { user } } = await supabase.auth.getUser();
      
      const response = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          plan,
          userId: profile.id,
          email: user?.email,
          billingCycle,
        }),
      });
      
      const { url, error } = await response.json();
      
      if (error) {
        alert(error);
        setCheckoutLoading(null);
        return;
      }
      
      window.location.href = url;
    } catch (err) {
      alert('Failed to start checkout. Please try again.');
      setCheckoutLoading(null);
    }
  };

  const savings = {
    pro: Math.round((1 - (plans.pro.priceAnnual / (plans.pro.price * 12))) * 100),
    premium: Math.round((1 - (plans.premium.priceAnnual / (plans.premium.price * 12))) * 100),
  };

  if (loading) {
    return (
      <div className="space-y-8">
        <div className="animate-pulse">
          <div className="h-8 bg-slate-200 rounded w-32 mb-2"></div>
          <div className="h-4 bg-slate-200 rounded w-64"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold">Billing</h1>
        <p className="text-muted-foreground">Manage your subscription and billing information</p>
      </div>

      {/* Current Plan */}
      <Card className="p-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h2 className="text-lg font-semibold mb-1">Current Plan</h2>
            <div className="flex items-center gap-2">
              <span className="text-2xl font-bold capitalize">{currentPlan}</span>
              {profile?.subscription_status === "active" && (
                <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full">Active</span>
              )}
              {profile?.subscription_status === "canceled" && (
                <span className="text-xs bg-amber-100 text-amber-700 px-2 py-0.5 rounded-full">Canceled</span>
              )}
            </div>
          </div>
          {currentPlan !== "free" && (
            <Button variant="outline" onClick={handleManageBilling} disabled={portalLoading}>
              {portalLoading ? (
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
              ) : (
                <CreditCard className="h-4 w-4 mr-2" />
              )}
              Manage Billing
              <ExternalLink className="h-3 w-3 ml-2" />
            </Button>
          )}
        </div>
      </Card>

      {/* Usage */}
      {currentPlan !== "free" && (
        <Card className="p-6">
          <h2 className="text-lg font-semibold mb-4">Usage This Month</h2>
          <div className="grid sm:grid-cols-2 gap-6">
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span className="text-muted-foreground">Documents Generated</span>
                <span className="font-medium">
                  {profile?.documents_generated_this_month || 0}
                  {currentPlan === "pro" && ` / ${profile?.documents_limit || 25}`}
                  {currentPlan === "premium" && " (Unlimited)"}
                </span>
              </div>
              {currentPlan === "pro" && (
                <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-teal-500 rounded-full" 
                    style={{ width: `${Math.min(((profile?.documents_generated_this_month || 0) / (profile?.documents_limit || 25)) * 100, 100)}%` }} 
                  />
                </div>
              )}
            </div>
          </div>
        </Card>
      )}

      {/* Billing Cycle Toggle */}
      <div className="flex justify-center">
        <div className="inline-flex items-center gap-3 bg-slate-100 p-1 rounded-full">
          <button
            onClick={() => setBillingCycle("monthly")}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
              billingCycle === "monthly" 
                ? "bg-white shadow text-foreground" 
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            Monthly
          </button>
          <button
            onClick={() => setBillingCycle("annual")}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
              billingCycle === "annual" 
                ? "bg-white shadow text-foreground" 
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            Annual
            <span className="ml-1.5 text-xs text-teal-600 font-semibold">Save up to {savings.premium}%</span>
          </button>
        </div>
      </div>

      {/* Plans */}
      <div className="grid md:grid-cols-3 gap-6">
        {(Object.entries(plans) as [PlanType, typeof plans.free & { popular?: boolean }][]).map(([key, plan]) => {
          const Icon = plan.icon;
          const isCurrent = key === currentPlan;
          const isUpgrade = 
            (currentPlan === "free" && (key === "pro" || key === "premium")) ||
            (currentPlan === "pro" && key === "premium");

          const price = billingCycle === "annual" && key !== "free"
            ? Math.round(plan.priceAnnual / 12)
            : plan.price;

          return (
            <Card 
              key={key} 
              className={`p-6 relative ${
                plan.popular ? "border-teal-500 border-2" : ""
              } ${isCurrent ? "bg-slate-50" : ""}`}
            >
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <span className="bg-teal-500 text-white text-xs font-semibold px-3 py-1 rounded-full">
                    Most Popular
                  </span>
                </div>
              )}

              <div className="flex items-center gap-3 mb-4">
                <div className={`w-10 h-10 rounded-lg ${plan.iconBg} flex items-center justify-center`}>
                  <Icon className={`h-5 w-5 ${plan.iconColor}`} />
                </div>
                <div>
                  <h3 className="font-semibold">{plan.name}</h3>
                  <p className="text-xs text-muted-foreground">{plan.description}</p>
                </div>
              </div>

              <div className="mb-4">
                <span className="text-3xl font-bold">${price}</span>
                <span className="text-muted-foreground">/month</span>
                {billingCycle === "annual" && key !== "free" && (
                  <p className="text-sm text-teal-600">
                    ${plan.priceAnnual}/year — Save {savings[key as "pro" | "premium"]}%
                  </p>
                )}
              </div>

              {isCurrent ? (
                <Button variant="outline" className="w-full" disabled>
                  Current Plan
                </Button>
              ) : isUpgrade ? (
                <Button 
                  className="w-full btn-gradient" 
                  onClick={() => handleUpgrade(key)}
                  disabled={checkoutLoading === key}
                >
                  {checkoutLoading === key ? (
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  ) : null}
                  Upgrade <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              ) : currentPlan !== "free" ? (
                <Button 
                  variant="outline" 
                  className="w-full" 
                  onClick={handleManageBilling}
                  disabled={portalLoading}
                >
                  {portalLoading ? (
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  ) : null}
                  {key === "free" ? "Cancel Subscription" : "Switch to " + plan.name}
                </Button>
              ) : null}

              <ul className="mt-6 space-y-3">
                {plan.features.map((feature, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-sm">
                    {feature.included ? (
                      <Check className="h-4 w-4 text-teal-500 mt-0.5 shrink-0" />
                    ) : (
                      <X className="h-4 w-4 text-slate-300 mt-0.5 shrink-0" />
                    )}
                    <span className={feature.included ? "" : "text-muted-foreground"}>
                      {feature.name}
                    </span>
                  </li>
                ))}
              </ul>
            </Card>
          );
        })}
      </div>

      {/* Info about plan changes */}
      <Card className="p-4 bg-blue-50 border-blue-200">
        <div className="flex gap-3">
          <AlertCircle className="h-5 w-5 text-blue-600 shrink-0" />
          <div className="text-sm text-blue-800">
            <strong>Managing your subscription:</strong> Click "Manage Billing" to update your payment method, 
            view invoices, change your plan, or cancel your subscription through the secure Stripe portal.
          </div>
        </div>
      </Card>
    </div>
  );
}
