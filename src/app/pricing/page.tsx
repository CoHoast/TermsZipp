"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  Check, X, Zap, Building2, Crown,
  Download, Users, Infinity,
  ArrowRight
} from "lucide-react";
import Link from "next/link";

export default function PricingPage() {
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'annual'>('monthly');

  const prices = {
    pro: { monthly: 9, annual: 79 },
    premium: { monthly: 29, annual: 249 },
  };

  const savings = {
    pro: Math.round((1 - (prices.pro.annual / (prices.pro.monthly * 12))) * 100),
    premium: Math.round((1 - (prices.premium.annual / (prices.premium.monthly * 12))) * 100),
  };

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center gap-2">
              <div className="brand-gradient rounded-lg p-1.5">
                <Zap className="h-5 w-5 text-white" />
              </div>
              <span className="font-bold text-xl">
                Terms<span className="text-teal-600">Zipp</span>
              </span>
            </Link>
            <div className="flex items-center gap-4">
              <Link href="/" className="text-sm text-muted-foreground hover:text-foreground">
                Generators
              </Link>
              <Button asChild className="btn-gradient">
                <Link href="/login">Sign In</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Hero */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-4 py-16 text-center">
          <h1 className="text-4xl font-bold mb-4">
            Simple, Transparent Pricing
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
            Generate professional legal documents for your website. Start free, upgrade when you need full access.
          </p>

          {/* Billing Toggle */}
          <div className="inline-flex items-center gap-3 bg-slate-100 p-1 rounded-full">
            <button
              onClick={() => setBillingCycle('monthly')}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                billingCycle === 'monthly' 
                  ? 'bg-white shadow text-foreground' 
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              Monthly
            </button>
            <button
              onClick={() => setBillingCycle('annual')}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                billingCycle === 'annual' 
                  ? 'bg-white shadow text-foreground' 
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              Annual
              <span className="ml-1.5 text-xs text-teal-600 font-semibold">Save up to {savings.premium}%</span>
            </button>
          </div>
        </div>
      </div>

      {/* Pricing Cards */}
      <div className="container mx-auto px-4 py-16">
        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          
          {/* Free Tier */}
          <Card className="p-6 relative">
            <div className="mb-6">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-10 h-10 rounded-lg bg-slate-100 flex items-center justify-center">
                  <Zap className="h-5 w-5 text-slate-600" />
                </div>
                <h3 className="text-xl font-bold">Free</h3>
              </div>
              <p className="text-muted-foreground text-sm">Try before you buy</p>
            </div>

            <div className="mb-6">
              <div className="flex items-baseline gap-1">
                <span className="text-4xl font-bold">$0</span>
                <span className="text-muted-foreground">/forever</span>
              </div>
            </div>

            <Button variant="outline" className="w-full mb-6" asChild>
              <Link href="/">Try Free</Link>
            </Button>

            <ul className="space-y-3">
              <FeatureItem included>Access all 6 generators</FeatureItem>
              <FeatureItem included>Preview document output</FeatureItem>
              <FeatureItem included>See first 25% of document</FeatureItem>
              <FeatureItem>Full document access</FeatureItem>
              <FeatureItem>Word & PDF export</FeatureItem>
              <FeatureItem>Save documents</FeatureItem>
              <FeatureItem>No branding in docs</FeatureItem>
            </ul>
          </Card>

          {/* Pro Tier */}
          <Card className="p-6 relative border-teal-500 border-2 shadow-lg">
            <div className="absolute -top-3 left-1/2 -translate-x-1/2">
              <span className="bg-teal-500 text-white text-xs font-semibold px-3 py-1 rounded-full">
                Most Popular
              </span>
            </div>

            <div className="mb-6">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-10 h-10 rounded-lg bg-teal-100 flex items-center justify-center">
                  <Building2 className="h-5 w-5 text-teal-600" />
                </div>
                <h3 className="text-xl font-bold">Pro</h3>
              </div>
              <p className="text-muted-foreground text-sm">For businesses & creators</p>
            </div>

            <div className="mb-6">
              <div className="flex items-baseline gap-1">
                <span className="text-4xl font-bold">
                  ${billingCycle === 'monthly' ? prices.pro.monthly : Math.round(prices.pro.annual / 12)}
                </span>
                <span className="text-muted-foreground">/month</span>
              </div>
              {billingCycle === 'annual' && (
                <p className="text-sm text-teal-600 mt-1">
                  ${prices.pro.annual}/year — Save {savings.pro}%
                </p>
              )}
            </div>

            <Button className="w-full mb-6 btn-gradient" asChild>
              <Link href="/signup?plan=pro">
                Get Started <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>

            <ul className="space-y-3">
              <FeatureItem included>All 6 generators</FeatureItem>
              <FeatureItem included><strong>Full document access</strong></FeatureItem>
              <FeatureItem included>Word, PDF & Markdown export</FeatureItem>
              <FeatureItem included>25 documents per month</FeatureItem>
              <FeatureItem included>Save up to 50 documents</FeatureItem>
              <FeatureItem included>Dashboard to manage docs</FeatureItem>
              <FeatureItem included>No TermsZipp branding</FeatureItem>
              <FeatureItem>Bulk generate all 6 at once</FeatureItem>
              <FeatureItem>Team members</FeatureItem>
            </ul>
          </Card>

          {/* Premium Tier */}
          <Card className="p-6 relative">
            <div className="mb-6">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-10 h-10 rounded-lg bg-amber-100 flex items-center justify-center">
                  <Crown className="h-5 w-5 text-amber-600" />
                </div>
                <h3 className="text-xl font-bold">Premium</h3>
              </div>
              <p className="text-muted-foreground text-sm">For agencies & teams</p>
            </div>

            <div className="mb-6">
              <div className="flex items-baseline gap-1">
                <span className="text-4xl font-bold">
                  ${billingCycle === 'monthly' ? prices.premium.monthly : Math.round(prices.premium.annual / 12)}
                </span>
                <span className="text-muted-foreground">/month</span>
              </div>
              {billingCycle === 'annual' && (
                <p className="text-sm text-teal-600 mt-1">
                  ${prices.premium.annual}/year — Save {savings.premium}%
                </p>
              )}
            </div>

            <Button variant="outline" className="w-full mb-6" asChild>
              <Link href="/signup?plan=premium">
                Get Started <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>

            <ul className="space-y-3">
              <FeatureItem included>Everything in Pro</FeatureItem>
              <FeatureItem included><strong>Unlimited documents</strong></FeatureItem>
              <FeatureItem included>Unlimited saved documents</FeatureItem>
              <FeatureItem included><strong>Bulk generate all 6 at once</strong></FeatureItem>
              <FeatureItem included>Invite up to 5 team members</FeatureItem>
              <FeatureItem included>Priority support</FeatureItem>
            </ul>
          </Card>
        </div>

        {/* Feature Comparison */}
        <div className="mt-20 max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold text-center mb-8">Compare Plans</h2>
          
          <div className="bg-white rounded-xl border overflow-hidden">
            <table className="w-full">
              <thead>
                <tr className="border-b bg-slate-50">
                  <th className="text-left p-4 font-medium">Feature</th>
                  <th className="text-center p-4 font-medium">Free</th>
                  <th className="text-center p-4 font-medium text-teal-600">Pro</th>
                  <th className="text-center p-4 font-medium">Premium</th>
                </tr>
              </thead>
              <tbody>
                <ComparisonRow 
                  feature="Access generators" 
                  free="All 6" 
                  pro="All 6" 
                  premium="All 6" 
                />
                <ComparisonRow 
                  feature="Document output" 
                  free="Preview only (25%)" 
                  pro="Full document" 
                  premium="Full document" 
                />
                <ComparisonRow 
                  feature="Export formats" 
                  free={false} 
                  pro="Word, PDF, MD" 
                  premium="Word, PDF, MD" 
                />
                <ComparisonRow 
                  feature="Documents per month" 
                  free="0 full" 
                  pro="25" 
                  premium="Unlimited" 
                />
                <ComparisonRow 
                  feature="Save documents" 
                  free={false} 
                  pro="50" 
                  premium="Unlimited" 
                />
                <ComparisonRow 
                  feature="Dashboard access" 
                  free={false} 
                  pro={true} 
                  premium={true} 
                />
                <ComparisonRow 
                  feature="No branding in docs" 
                  free={false} 
                  pro={true} 
                  premium={true} 
                />
                <ComparisonRow 
                  feature="Bulk generate all 6" 
                  free={false} 
                  pro={false} 
                  premium={true} 
                />
                <ComparisonRow 
                  feature="Team members" 
                  free={false} 
                  pro={false} 
                  premium="Up to 5" 
                />
                <ComparisonRow 
                  feature="Priority support" 
                  free={false} 
                  pro={false} 
                  premium={true} 
                />
              </tbody>
            </table>
          </div>
        </div>

        {/* FAQ */}
        <div className="mt-20 max-w-3xl mx-auto">
          <h2 className="text-2xl font-bold text-center mb-8">Frequently Asked Questions</h2>
          
          <div className="space-y-4">
            <FAQItem 
              question="What do I get with the free tier?"
              answer="You can try all 6 document generators and see a preview of the output (first 25% of the document). This lets you verify the quality before upgrading. To get the full document, export options, and save functionality, you'll need to upgrade to Pro or Premium."
            />
            <FAQItem 
              question="Can I upgrade or downgrade at any time?"
              answer="Yes! You can upgrade or downgrade your plan at any time. When upgrading, you'll get immediate access to new features. When downgrading, you'll keep your current features until the end of your billing cycle."
            />
            <FAQItem 
              question="What payment methods do you accept?"
              answer="We accept all major credit cards (Visa, Mastercard, American Express) through our secure payment processor, Stripe. Annual plans can also be paid via invoice for Premium tier."
            />
            <FAQItem 
              question="Do I need a lawyer to review these documents?"
              answer="We strongly recommend having all legal documents reviewed by a qualified attorney before publishing them on your website. Our templates are comprehensive starting points, but legal requirements vary by jurisdiction and business type."
            />
            <FAQItem 
              question="What's included in 'Bulk Generate'?"
              answer="Premium users can enter their company information once and generate all 6 legal documents (Privacy Policy, Terms of Service, Cookie Policy, Disclaimer, Refund Policy, and EULA) at the same time. Perfect for new websites or agencies setting up clients."
            />
            <FAQItem 
              question="Can I cancel my subscription?"
              answer="Yes, you can cancel anytime from your dashboard. You'll continue to have access to your plan's features until the end of your current billing period. Your saved documents remain accessible even after cancellation."
            />
          </div>
        </div>

        {/* CTA */}
        <div className="mt-20 text-center">
          <div className="brand-gradient rounded-2xl p-12 max-w-3xl mx-auto">
            <h2 className="text-2xl font-bold text-white mb-4">
              Ready to get your legal documents sorted?
            </h2>
            <p className="text-white/80 mb-6">
              Start with a free preview, upgrade when you're ready.
            </p>
            <div className="flex gap-4 justify-center">
              <Button variant="secondary" size="lg" asChild>
                <Link href="/">Try Free Preview</Link>
              </Button>
              <Button variant="outline" size="lg" className="bg-white/10 border-white/20 text-white hover:bg-white/20" asChild>
                <Link href="/signup?plan=pro">Start Pro Trial</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t bg-white mt-16">
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-2">
              <div className="brand-gradient rounded-lg p-1.5">
                <Zap className="h-4 w-4 text-white" />
              </div>
              <span className="font-semibold">TermsZipp</span>
            </div>
            <div className="flex gap-6 text-sm text-muted-foreground">
              <Link href="/privacy" className="hover:text-foreground">Privacy</Link>
              <Link href="/terms" className="hover:text-foreground">Terms</Link>
              <Link href="/contact" className="hover:text-foreground">Contact</Link>
            </div>
            <p className="text-sm text-muted-foreground">
              © 2026 TermsZipp. Part of the Zipp family.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

function FeatureItem({ children, included = false }: { children: React.ReactNode; included?: boolean }) {
  return (
    <li className="flex items-start gap-2">
      {included ? (
        <Check className="h-5 w-5 text-teal-500 shrink-0 mt-0.5" />
      ) : (
        <X className="h-5 w-5 text-slate-300 shrink-0 mt-0.5" />
      )}
      <span className={included ? 'text-foreground' : 'text-muted-foreground'}>{children}</span>
    </li>
  );
}

function ComparisonRow({ 
  feature, 
  free, 
  pro, 
  premium 
}: { 
  feature: string; 
  free: boolean | string; 
  pro: boolean | string; 
  premium: boolean | string; 
}) {
  const renderValue = (value: boolean | string) => {
    if (value === true) return <Check className="h-5 w-5 text-teal-500 mx-auto" />;
    if (value === false) return <X className="h-5 w-5 text-slate-300 mx-auto" />;
    return <span className="text-sm">{value}</span>;
  };

  return (
    <tr className="border-b last:border-0">
      <td className="p-4 text-sm">{feature}</td>
      <td className="p-4 text-center">{renderValue(free)}</td>
      <td className="p-4 text-center bg-teal-50/50">{renderValue(pro)}</td>
      <td className="p-4 text-center">{renderValue(premium)}</td>
    </tr>
  );
}

function FAQItem({ question, answer }: { question: string; answer: string }) {
  return (
    <Card className="p-4">
      <h3 className="font-medium mb-2">{question}</h3>
      <p className="text-sm text-muted-foreground">{answer}</p>
    </Card>
  );
}
