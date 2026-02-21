"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { 
  Shield, ArrowLeft, ArrowRight,
  Globe, Mail, Building, AlertTriangle
} from "lucide-react";
import Link from "next/link";
import { ExportButtons } from "@/components/export-buttons";
import { DocumentPreviewGate } from "@/components/document-preview-gate";

interface FormData {
  companyName: string;
  websiteUrl: string;
  contactEmail: string;
  country: string;
  // Data collection
  collectsPersonalInfo: boolean;
  collectsEmail: boolean;
  collectsName: boolean;
  collectsPayment: boolean;
  collectsLocation: boolean;
  collectsDeviceInfo: boolean;
  // Features
  usesCookies: boolean;
  usesAnalytics: boolean;
  usesAdvertising: boolean;
  hasUserAccounts: boolean;
  hasNewsletter: boolean;
  sellsProducts: boolean;
  // Compliance
  gdprCompliant: boolean;
  ccpaCompliant: boolean;
  childrenUnder13: boolean;
}

const defaultFormData: FormData = {
  companyName: "",
  websiteUrl: "",
  contactEmail: "",
  country: "United States",
  collectsPersonalInfo: true,
  collectsEmail: true,
  collectsName: true,
  collectsPayment: false,
  collectsLocation: false,
  collectsDeviceInfo: true,
  usesCookies: true,
  usesAnalytics: true,
  usesAdvertising: false,
  hasUserAccounts: false,
  hasNewsletter: false,
  sellsProducts: false,
  gdprCompliant: true,
  ccpaCompliant: true,
  childrenUnder13: false,
};

export default function PrivacyPolicyGenerator() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<FormData>(defaultFormData);
  const [generatedPolicy, setGeneratedPolicy] = useState<string>("");

  const updateForm = (field: keyof FormData, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const generatePolicy = () => {
    const today = new Date().toLocaleDateString('en-US', { 
      year: 'numeric', month: 'long', day: 'numeric' 
    });

    let policy = `# Privacy Policy

**Last Updated: ${today}**

## Introduction

Welcome to ${formData.companyName || "[Company Name]"}. We respect your privacy and are committed to protecting your personal data. This privacy policy explains how we collect, use, and safeguard your information when you visit ${formData.websiteUrl || "[Website URL]"}.

## Information We Collect

`;

    if (formData.collectsPersonalInfo) {
      policy += `### Personal Information\n\nWe may collect the following types of personal information:\n\n`;
      if (formData.collectsName) policy += `- **Name**: To personalize your experience and communications\n`;
      if (formData.collectsEmail) policy += `- **Email Address**: To send you updates, respond to inquiries, and provide services\n`;
      if (formData.collectsPayment) policy += `- **Payment Information**: To process transactions (handled securely by our payment processors)\n`;
      if (formData.collectsLocation) policy += `- **Location Data**: To provide location-based services and comply with local regulations\n`;
      policy += `\n`;
    }

    if (formData.collectsDeviceInfo) {
      policy += `### Device & Usage Information\n\nWe automatically collect certain information when you visit our website:\n\n- IP address\n- Browser type and version\n- Operating system\n- Pages visited and time spent\n- Referring website\n- Device identifiers\n\n`;
    }

    if (formData.usesCookies) {
      policy += `## Cookies and Tracking Technologies

We use cookies and similar tracking technologies to enhance your experience on our website. Cookies are small text files stored on your device that help us:

- Remember your preferences
- Understand how you use our website
- Improve our services
${formData.usesAnalytics ? "- Analyze website traffic and performance\n" : ""}${formData.usesAdvertising ? "- Deliver relevant advertisements\n" : ""}
You can control cookies through your browser settings. However, disabling cookies may limit some features of our website.

`;
    }

    policy += `## How We Use Your Information

We use the information we collect to:

- Provide and maintain our services
- Respond to your inquiries and requests
- Send you important updates and notifications
${formData.hasNewsletter ? "- Send marketing communications (with your consent)\n" : ""}${formData.sellsProducts ? "- Process orders and transactions\n" : ""}${formData.hasUserAccounts ? "- Manage your account and provide customer support\n" : ""}- Improve our website and services
- Comply with legal obligations

## Data Sharing and Disclosure

We do not sell your personal information. We may share your data with:

- **Service Providers**: Third parties who help us operate our website and services
- **Legal Requirements**: When required by law or to protect our rights
- **Business Transfers**: In connection with a merger, acquisition, or sale of assets
${formData.usesAnalytics ? "- **Analytics Partners**: To help us understand website usage\n" : ""}${formData.usesAdvertising ? "- **Advertising Partners**: To deliver relevant advertisements\n" : ""}
`;

    if (formData.gdprCompliant) {
      policy += `## Your Rights (GDPR)

If you are located in the European Economic Area (EEA), you have certain data protection rights:

- **Right to Access**: Request a copy of your personal data
- **Right to Rectification**: Request correction of inaccurate data
- **Right to Erasure**: Request deletion of your personal data
- **Right to Restrict Processing**: Request limitation of data processing
- **Right to Data Portability**: Receive your data in a structured format
- **Right to Object**: Object to processing of your personal data
- **Right to Withdraw Consent**: Withdraw consent at any time

To exercise these rights, contact us at ${formData.contactEmail || "[Contact Email]"}.

`;
    }

    if (formData.ccpaCompliant) {
      policy += `## California Privacy Rights (CCPA)

If you are a California resident, you have the following rights:

- **Right to Know**: Request information about the personal data we collect
- **Right to Delete**: Request deletion of your personal data
- **Right to Opt-Out**: Opt out of the sale of personal data (we do not sell your data)
- **Right to Non-Discrimination**: We will not discriminate against you for exercising your rights

To exercise these rights, contact us at ${formData.contactEmail || "[Contact Email]"}.

`;
    }

    if (formData.childrenUnder13) {
      policy += `## Children's Privacy

Our website is not intended for children under 13 years of age. We do not knowingly collect personal information from children under 13. If you believe we have collected information from a child under 13, please contact us immediately.

`;
    }

    policy += `## Data Security

We implement appropriate technical and organizational measures to protect your personal data against unauthorized access, alteration, disclosure, or destruction. However, no method of transmission over the Internet is 100% secure.

## Data Retention

We retain your personal data only for as long as necessary to fulfill the purposes outlined in this policy, unless a longer retention period is required by law.

## Changes to This Policy

We may update this privacy policy from time to time. We will notify you of any changes by posting the new policy on this page and updating the "Last Updated" date.

## Contact Us

If you have any questions about this privacy policy or our data practices, please contact us at:

**${formData.companyName || "[Company Name]"}**
Email: ${formData.contactEmail || "[Contact Email]"}
Website: ${formData.websiteUrl || "[Website URL]"}

---

*This privacy policy was generated using TermsZipp. We recommend having this document reviewed by a qualified attorney to ensure it meets your specific legal requirements.*
`;

    setGeneratedPolicy(policy);
    setStep(3);
  };

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-4 py-8">
          <Link href="/" className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground mb-4">
            <ArrowLeft className="h-4 w-4 mr-1" /> Back to Generators
          </Link>
          <div className="flex items-center gap-3">
            <div className="brand-gradient rounded-lg p-2">
              <Shield className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold">Privacy Policy Generator</h1>
              <p className="text-muted-foreground">Create a GDPR & CCPA compliant privacy policy</p>
            </div>
          </div>
        </div>
      </div>

      {/* Progress Steps */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-center gap-4">
            {[1, 2, 3].map((s) => (
              <div key={s} className="flex items-center">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                  step >= s ? 'brand-gradient text-white' : 'bg-slate-200 text-slate-500'
                }`}>
                  {s}
                </div>
                <span className={`ml-2 text-sm ${step >= s ? 'text-foreground' : 'text-muted-foreground'}`}>
                  {s === 1 ? 'Business Info' : s === 2 ? 'Data & Features' : 'Generate'}
                </span>
                {s < 3 && <div className="w-12 h-0.5 bg-slate-200 mx-4" />}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Form Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          
          {/* Step 1: Business Info */}
          {step === 1 && (
            <Card className="p-6">
              <h2 className="text-lg font-semibold mb-6">Business Information</h2>
              
              <div className="space-y-4">
                <div>
                  <Label htmlFor="companyName">Company / Website Name *</Label>
                  <div className="relative mt-1">
                    <Building className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="companyName"
                      value={formData.companyName}
                      onChange={(e) => updateForm('companyName', e.target.value)}
                      placeholder="Acme Inc."
                      className="pl-10"
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="websiteUrl">Website URL *</Label>
                  <div className="relative mt-1">
                    <Globe className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="websiteUrl"
                      value={formData.websiteUrl}
                      onChange={(e) => updateForm('websiteUrl', e.target.value)}
                      placeholder="https://example.com"
                      className="pl-10"
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="contactEmail">Contact Email *</Label>
                  <div className="relative mt-1">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="contactEmail"
                      type="email"
                      value={formData.contactEmail}
                      onChange={(e) => updateForm('contactEmail', e.target.value)}
                      placeholder="privacy@example.com"
                      className="pl-10"
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="country">Country</Label>
                  <Input
                    id="country"
                    value={formData.country}
                    onChange={(e) => updateForm('country', e.target.value)}
                    placeholder="United States"
                    className="mt-1"
                  />
                </div>
              </div>

              <div className="flex justify-end mt-6">
                <Button onClick={() => setStep(2)} className="btn-gradient">
                  Next Step <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </Card>
          )}

          {/* Step 2: Data Collection & Features */}
          {step === 2 && (
            <Card className="p-6">
              <h2 className="text-lg font-semibold mb-6">Data Collection & Features</h2>
              
              {/* Data Collection */}
              <div className="mb-6">
                <h3 className="text-sm font-medium mb-3">What data do you collect?</h3>
                <div className="grid grid-cols-2 gap-3">
                  {[
                    { key: 'collectsEmail', label: 'Email addresses' },
                    { key: 'collectsName', label: 'Names' },
                    { key: 'collectsPayment', label: 'Payment information' },
                    { key: 'collectsLocation', label: 'Location data' },
                    { key: 'collectsDeviceInfo', label: 'Device information' },
                  ].map(({ key, label }) => (
                    <div key={key} className="flex items-center space-x-2">
                      <Checkbox
                        id={key}
                        checked={formData[key as keyof FormData] as boolean}
                        onCheckedChange={(checked) => updateForm(key as keyof FormData, checked as boolean)}
                      />
                      <Label htmlFor={key} className="text-sm font-normal">{label}</Label>
                    </div>
                  ))}
                </div>
              </div>

              {/* Features */}
              <div className="mb-6">
                <h3 className="text-sm font-medium mb-3">What features does your site have?</h3>
                <div className="grid grid-cols-2 gap-3">
                  {[
                    { key: 'usesCookies', label: 'Uses cookies' },
                    { key: 'usesAnalytics', label: 'Analytics (Google, etc.)' },
                    { key: 'usesAdvertising', label: 'Advertising' },
                    { key: 'hasUserAccounts', label: 'User accounts' },
                    { key: 'hasNewsletter', label: 'Email newsletter' },
                    { key: 'sellsProducts', label: 'E-commerce / sells products' },
                  ].map(({ key, label }) => (
                    <div key={key} className="flex items-center space-x-2">
                      <Checkbox
                        id={key}
                        checked={formData[key as keyof FormData] as boolean}
                        onCheckedChange={(checked) => updateForm(key as keyof FormData, checked as boolean)}
                      />
                      <Label htmlFor={key} className="text-sm font-normal">{label}</Label>
                    </div>
                  ))}
                </div>
              </div>

              {/* Compliance */}
              <div className="mb-6">
                <h3 className="text-sm font-medium mb-3">Compliance requirements</h3>
                <div className="grid grid-cols-2 gap-3">
                  {[
                    { key: 'gdprCompliant', label: 'GDPR (EU users)' },
                    { key: 'ccpaCompliant', label: 'CCPA (California users)' },
                    { key: 'childrenUnder13', label: 'May have users under 13' },
                  ].map(({ key, label }) => (
                    <div key={key} className="flex items-center space-x-2">
                      <Checkbox
                        id={key}
                        checked={formData[key as keyof FormData] as boolean}
                        onCheckedChange={(checked) => updateForm(key as keyof FormData, checked as boolean)}
                      />
                      <Label htmlFor={key} className="text-sm font-normal">{label}</Label>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex justify-between mt-6">
                <Button variant="outline" onClick={() => setStep(1)}>
                  <ArrowLeft className="mr-2 h-4 w-4" /> Back
                </Button>
                <Button onClick={generatePolicy} className="btn-gradient">
                  Generate Policy <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </Card>
          )}

          {/* Step 3: Generated Policy */}
          {step === 3 && (
            <div className="space-y-4">
              {/* TODO: Check user subscription status. For now, show preview gate (free tier) */}
              {/* When auth is added, this will conditionally render based on user.subscription */}
              
              <DocumentPreviewGate 
                content={generatedPolicy} 
                documentType="Privacy Policy"
                documentTypeSlug="privacy-policy"
                formData={{ ...formData }}
              />

              {/* PRO/PREMIUM TIER: Full Document (hidden for now, will show when authenticated as paid user)
              <Card className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-lg font-semibold">Your Privacy Policy</h2>
                  <ExportButtons content={generatedPolicy} filename="privacy-policy" />
                </div>
                
                <div className="bg-slate-50 rounded-lg p-6 max-h-[500px] overflow-y-auto">
                  <div className="legal-document whitespace-pre-wrap font-mono text-sm">
                    {generatedPolicy}
                  </div>
                </div>
              </Card>
              */}

              {/* Disclaimer */}
              <Card className="p-4 bg-amber-50 border-amber-200">
                <div className="flex gap-3">
                  <AlertTriangle className="h-5 w-5 text-amber-600 shrink-0" />
                  <div className="text-sm text-amber-800">
                    <strong>Remember:</strong> This is a template. We strongly recommend having this document 
                    reviewed by a qualified attorney before publishing it on your website.
                  </div>
                </div>
              </Card>

              <div className="flex justify-between">
                <Button variant="outline" onClick={() => setStep(2)}>
                  <ArrowLeft className="mr-2 h-4 w-4" /> Edit Options
                </Button>
                <Button className="btn-gradient" asChild>
                  <Link href="/terms-of-service">
                    Generate Terms of Service <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
