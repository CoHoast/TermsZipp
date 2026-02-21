"use client";

import Link from "next/link";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  FileText, Shield, Cookie, AlertTriangle, RefreshCw, ScrollText,
  ArrowRight, Check, Sparkles, Clock, Download, Globe
} from "lucide-react";

const generators = [
  {
    id: "privacy-policy",
    name: "Privacy Policy",
    description: "GDPR & CCPA compliant privacy policy for your website or app",
    icon: Shield,
    href: "/privacy-policy",
    popular: true,
  },
  {
    id: "terms-of-service",
    name: "Terms of Service",
    description: "Comprehensive terms and conditions for your business",
    icon: FileText,
    href: "/terms-of-service",
    popular: true,
  },
  {
    id: "cookie-policy",
    name: "Cookie Policy",
    description: "Cookie consent and tracking disclosure policy",
    icon: Cookie,
    href: "/cookie-policy",
    popular: false,
  },
  {
    id: "disclaimer",
    name: "Disclaimer",
    description: "Liability disclaimer for your content and services",
    icon: AlertTriangle,
    href: "/disclaimer",
    popular: false,
  },
  {
    id: "refund-policy",
    name: "Refund Policy",
    description: "Clear refund and return policy for e-commerce",
    icon: RefreshCw,
    href: "/refund-policy",
    popular: false,
  },
  {
    id: "eula",
    name: "EULA",
    description: "End User License Agreement for software and apps",
    icon: ScrollText,
    href: "/eula",
    popular: true,
  },
];

const features = [
  {
    icon: Sparkles,
    title: "AI-Powered",
    description: "Smart templates that adapt to your business type",
  },
  {
    icon: Clock,
    title: "Ready in Seconds",
    description: "Generate complete documents in under a minute",
  },
  {
    icon: Download,
    title: "Multiple Formats",
    description: "Export as HTML, Markdown, or plain text",
  },
  {
    icon: Globe,
    title: "GDPR & CCPA Ready",
    description: "Compliant with major privacy regulations",
  },
];

export default function Home() {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 brand-gradient-subtle" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-cyan-100/50 via-transparent to-transparent" />
        
        <div className="container mx-auto px-4 py-16 md:py-24 relative">
          <div className="text-center max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/80 border shadow-sm mb-6">
              <Shield className="h-4 w-4 text-cyan-600" />
              <span className="text-sm font-medium">Free Legal Document Generator</span>
            </div>
            
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6">
              Legal Documents{" "}
              <span className="brand-gradient-text">Made Simple</span>
            </h1>
            
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
              Generate professional privacy policies, terms of service, and other legal documents 
              for your website in seconds. Free, customizable, and compliant.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="btn-gradient" asChild>
                <Link href="/privacy-policy">
                  Generate Privacy Policy <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link href="/terms-of-service">
                  Generate Terms of Service
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Generators Grid */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Choose Your Document</h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Select the legal document you need and customize it for your business
            </p>
          </div>
          
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {generators.map((gen) => (
              <Link key={gen.id} href={gen.href}>
                <Card className="p-6 h-full hover:shadow-lg hover:border-cyan-200 transition-all cursor-pointer group relative">
                  {gen.popular && (
                    <span className="absolute top-4 right-4 text-xs font-medium bg-cyan-100 text-cyan-700 px-2 py-1 rounded-full">
                      Popular
                    </span>
                  )}
                  <div className="brand-gradient rounded-lg w-12 h-12 flex items-center justify-center mb-4">
                    <gen.icon className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2 group-hover:text-cyan-600 transition-colors">
                    {gen.name}
                  </h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    {gen.description}
                  </p>
                  <div className="flex items-center text-sm font-medium text-cyan-600">
                    Generate <ArrowRight className="ml-1 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 bg-slate-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Why Use TermsZipp?</h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Professional legal documents without the expensive lawyer fees
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
            {features.map((feature, i) => (
              <Card key={i} className="p-6 text-center">
                <div className="brand-gradient rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-4">
                  <feature.icon className="h-6 w-6 text-white" />
                </div>
                <h3 className="font-semibold mb-2">{feature.title}</h3>
                <p className="text-sm text-muted-foreground">{feature.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">How It Works</h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Generate your legal documents in three simple steps
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {[
              { step: "1", title: "Choose Document", desc: "Select the type of legal document you need" },
              { step: "2", title: "Fill Details", desc: "Enter your business name, website, and preferences" },
              { step: "3", title: "Generate & Export", desc: "Get your customized document instantly" },
            ].map((item, i) => (
              <div key={i} className="text-center">
                <div className="brand-gradient text-white text-2xl font-bold w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-4">
                  {item.step}
                </div>
                <h3 className="font-semibold mb-2">{item.title}</h3>
                <p className="text-sm text-muted-foreground">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What's Included */}
      <section className="py-16 bg-slate-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">What's Included</h2>
              <p className="text-muted-foreground">
                Every document comes with these essential sections
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 gap-4">
              {[
                "Data collection & usage policies",
                "User rights and responsibilities",
                "Third-party service disclosures",
                "Cookie and tracking information",
                "Contact information section",
                "Last updated timestamp",
                "GDPR compliance clauses",
                "CCPA compliance clauses",
                "Children's privacy (COPPA)",
                "Data retention policies",
                "Security measures description",
                "Policy change notifications",
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-3 p-3 bg-white rounded-lg border">
                  <div className="brand-gradient rounded-full p-1">
                    <Check className="h-4 w-4 text-white" />
                  </div>
                  <span className="text-sm">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 brand-gradient">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Ready to Get Started?
          </h2>
          <p className="text-white/80 max-w-xl mx-auto mb-8">
            Generate your first legal document for free. No signup required.
          </p>
          <Button size="lg" className="bg-white text-cyan-600 hover:bg-white/90">
            <Link href="/privacy-policy" className="flex items-center">
              Start Generating <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </section>

      {/* Disclaimer Banner */}
      <section className="py-8 bg-amber-50 border-t border-amber-200">
        <div className="container mx-auto px-4">
          <div className="flex items-start gap-4 max-w-4xl mx-auto">
            <AlertTriangle className="h-6 w-6 text-amber-600 shrink-0 mt-0.5" />
            <div>
              <h3 className="font-semibold text-amber-800 mb-1">Important Disclaimer</h3>
              <p className="text-sm text-amber-700">
                TermsZipp provides legal document templates for informational purposes only. These documents 
                do not constitute legal advice and should not be used as a substitute for professional legal counsel. 
                We strongly recommend having an attorney review any legal documents before implementing them on your 
                website or in your business operations.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
