"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { 
  Cookie, ArrowLeft, ArrowRight,
  Globe, Mail, Building, AlertTriangle
} from "lucide-react";
import Link from "next/link";
import { ExportButtons } from "@/components/export-buttons";
import { DocumentPreviewGate } from "@/components/document-preview-gate";

interface FormData {
  companyName: string;
  websiteUrl: string;
  contactEmail: string;
  // Cookie types
  essentialCookies: boolean;
  performanceCookies: boolean;
  functionalCookies: boolean;
  targetingCookies: boolean;
  // Third parties
  usesGoogleAnalytics: boolean;
  usesFacebookPixel: boolean;
  usesHotjar: boolean;
  usesIntercom: boolean;
  usesStripe: boolean;
  otherThirdParties: string;
  // Settings
  cookieBanner: boolean;
  allowOptOut: boolean;
}

const defaultFormData: FormData = {
  companyName: "",
  websiteUrl: "",
  contactEmail: "",
  essentialCookies: true,
  performanceCookies: true,
  functionalCookies: true,
  targetingCookies: false,
  usesGoogleAnalytics: true,
  usesFacebookPixel: false,
  usesHotjar: false,
  usesIntercom: false,
  usesStripe: false,
  otherThirdParties: "",
  cookieBanner: true,
  allowOptOut: true,
};

export default function CookiePolicyGenerator() {
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

    let policy = `# Cookie Policy

**Last Updated: ${today}**

## Introduction

This Cookie Policy explains how ${formData.companyName || "[Company Name]"} ("we," "us," or "our") uses cookies and similar tracking technologies when you visit ${formData.websiteUrl || "[Website URL]"}. By using our website, you consent to the use of cookies as described in this policy.

## What Are Cookies?

Cookies are small text files that are stored on your device (computer, tablet, or mobile) when you visit a website. They help websites remember your preferences, understand how you use the site, and improve your browsing experience.

## Types of Cookies We Use

`;

    if (formData.essentialCookies) {
      policy += `### Essential Cookies
These cookies are necessary for the website to function properly. They enable basic features like page navigation, secure access, and shopping cart functionality. The website cannot function properly without these cookies.

**Examples:**
- Session cookies to keep you logged in
- Security cookies to prevent fraud
- Load balancing cookies for site performance

`;
    }

    if (formData.performanceCookies) {
      policy += `### Performance & Analytics Cookies
These cookies collect information about how visitors use our website, such as which pages are visited most often and if users receive error messages. This data helps us improve our website's performance and user experience.

**Examples:**
- Page view statistics
- Traffic source tracking
- Error logging
${formData.usesGoogleAnalytics ? "- Google Analytics cookies\n" : ""}
`;
    }

    if (formData.functionalCookies) {
      policy += `### Functional Cookies
These cookies allow the website to remember choices you make (such as your language preference or region) and provide enhanced, personalized features.

**Examples:**
- Language preferences
- Region/location settings
- Customized content preferences
- Chat widget preferences

`;
    }

    if (formData.targetingCookies) {
      policy += `### Targeting & Advertising Cookies
These cookies are used to deliver advertisements that are relevant to you and your interests. They also help limit the number of times you see an ad and measure the effectiveness of advertising campaigns.

**Examples:**
- Ad tracking cookies
- Retargeting cookies
${formData.usesFacebookPixel ? "- Facebook Pixel\n" : ""}- Social media sharing buttons

`;
    }

    policy += `## Third-Party Cookies

We use services from third parties that may also set cookies on your device:

`;

    if (formData.usesGoogleAnalytics) {
      policy += `### Google Analytics
We use Google Analytics to understand how visitors interact with our website. Google Analytics uses cookies to collect information about your use of the website, which is transmitted to and stored by Google.
- **Purpose:** Website analytics and performance measurement
- **Privacy Policy:** https://policies.google.com/privacy

`;
    }

    if (formData.usesFacebookPixel) {
      policy += `### Facebook Pixel
We use Facebook Pixel to measure the effectiveness of our advertising and to deliver relevant ads to you on Facebook.
- **Purpose:** Advertising and conversion tracking
- **Privacy Policy:** https://www.facebook.com/policy.php

`;
    }

    if (formData.usesHotjar) {
      policy += `### Hotjar
We use Hotjar to understand how users interact with our website through heatmaps and session recordings.
- **Purpose:** User experience analysis
- **Privacy Policy:** https://www.hotjar.com/privacy

`;
    }

    if (formData.usesIntercom) {
      policy += `### Intercom
We use Intercom for customer messaging and support.
- **Purpose:** Customer support and communication
- **Privacy Policy:** https://www.intercom.com/legal/privacy

`;
    }

    if (formData.usesStripe) {
      policy += `### Stripe
We use Stripe for payment processing, which may set cookies for fraud prevention.
- **Purpose:** Payment processing and fraud prevention
- **Privacy Policy:** https://stripe.com/privacy

`;
    }

    if (formData.otherThirdParties) {
      policy += `### Other Third-Party Services
${formData.otherThirdParties}

`;
    }

    if (formData.allowOptOut) {
      policy += `## Managing Your Cookie Preferences

You have several options for managing cookies:

### Browser Settings
Most web browsers allow you to control cookies through their settings. You can:
- Block all cookies
- Block third-party cookies only
- Delete cookies when you close your browser
- Browse in "private" or "incognito" mode

**How to manage cookies in popular browsers:**
- **Chrome:** Settings > Privacy and Security > Cookies
- **Firefox:** Options > Privacy & Security > Cookies
- **Safari:** Preferences > Privacy > Cookies
- **Edge:** Settings > Privacy & Services > Cookies

${formData.cookieBanner ? `### Cookie Consent Banner
When you first visit our website, you will see a cookie consent banner that allows you to accept or customize your cookie preferences.

` : ""}### Opt-Out Links
You can opt out of specific third-party cookies:
${formData.usesGoogleAnalytics ? "- Google Analytics: https://tools.google.com/dlpage/gaoptout\n" : ""}${formData.usesFacebookPixel ? "- Facebook: https://www.facebook.com/settings/?tab=ads\n" : ""}- Network Advertising Initiative: https://optout.networkadvertising.org/
- Digital Advertising Alliance: https://optout.aboutads.info/

**Note:** Disabling certain cookies may affect the functionality of our website.

`;
    }

    policy += `## Cookie Retention

Different cookies are retained for different periods:
- **Session cookies:** Deleted when you close your browser
- **Persistent cookies:** Remain on your device for a set period (typically 30 days to 2 years)
- **Third-party cookies:** Retention periods vary by provider

## Updates to This Policy

We may update this Cookie Policy from time to time to reflect changes in our practices or for legal, operational, or regulatory reasons. We will post the updated policy on this page with a new "Last Updated" date.

## Contact Us

If you have questions about our use of cookies, please contact us:

**${formData.companyName || "[Company Name]"}**
Email: ${formData.contactEmail || "[Contact Email]"}
Website: ${formData.websiteUrl || "[Website URL]"}

---

*This cookie policy was generated using TermsZipp. We recommend having this document reviewed by a qualified attorney to ensure it meets your specific legal requirements.*
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
              <Cookie className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold">Cookie Policy Generator</h1>
              <p className="text-muted-foreground">Create a GDPR-compliant cookie policy</p>
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
                  {s === 1 ? 'Business Info' : s === 2 ? 'Cookie Types' : 'Generate'}
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
          
          {/* Step 1 */}
          {step === 1 && (
            <Card className="p-6">
              <h2 className="text-lg font-semibold mb-6">Business Information</h2>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="companyName">Company / Website Name *</Label>
                  <div className="relative mt-1">
                    <Building className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input id="companyName" value={formData.companyName} onChange={(e) => updateForm('companyName', e.target.value)} placeholder="Acme Inc." className="pl-10" />
                  </div>
                </div>
                <div>
                  <Label htmlFor="websiteUrl">Website URL *</Label>
                  <div className="relative mt-1">
                    <Globe className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input id="websiteUrl" value={formData.websiteUrl} onChange={(e) => updateForm('websiteUrl', e.target.value)} placeholder="https://example.com" className="pl-10" />
                  </div>
                </div>
                <div>
                  <Label htmlFor="contactEmail">Contact Email *</Label>
                  <div className="relative mt-1">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input id="contactEmail" type="email" value={formData.contactEmail} onChange={(e) => updateForm('contactEmail', e.target.value)} placeholder="privacy@example.com" className="pl-10" />
                  </div>
                </div>
              </div>
              <div className="flex justify-end mt-6">
                <Button onClick={() => setStep(2)} className="btn-gradient">
                  Next Step <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </Card>
          )}

          {/* Step 2 */}
          {step === 2 && (
            <Card className="p-6">
              <h2 className="text-lg font-semibold mb-6">Cookie Types & Third Parties</h2>
              
              <div className="mb-6">
                <h3 className="text-sm font-medium mb-3">What types of cookies do you use?</h3>
                <div className="space-y-3">
                  {[
                    { key: 'essentialCookies', label: 'Essential cookies (required for site to work)' },
                    { key: 'performanceCookies', label: 'Performance & analytics cookies' },
                    { key: 'functionalCookies', label: 'Functional cookies (preferences, language)' },
                    { key: 'targetingCookies', label: 'Targeting & advertising cookies' },
                  ].map(({ key, label }) => (
                    <div key={key} className="flex items-center space-x-2">
                      <Checkbox id={key} checked={formData[key as keyof FormData] as boolean} onCheckedChange={(checked) => updateForm(key as keyof FormData, checked as boolean)} />
                      <Label htmlFor={key} className="text-sm font-normal">{label}</Label>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mb-6">
                <h3 className="text-sm font-medium mb-3">Third-party services you use</h3>
                <div className="grid grid-cols-2 gap-3">
                  {[
                    { key: 'usesGoogleAnalytics', label: 'Google Analytics' },
                    { key: 'usesFacebookPixel', label: 'Facebook Pixel' },
                    { key: 'usesHotjar', label: 'Hotjar' },
                    { key: 'usesIntercom', label: 'Intercom' },
                    { key: 'usesStripe', label: 'Stripe Payments' },
                  ].map(({ key, label }) => (
                    <div key={key} className="flex items-center space-x-2">
                      <Checkbox id={key} checked={formData[key as keyof FormData] as boolean} onCheckedChange={(checked) => updateForm(key as keyof FormData, checked as boolean)} />
                      <Label htmlFor={key} className="text-sm font-normal">{label}</Label>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mb-6">
                <h3 className="text-sm font-medium mb-3">Cookie consent settings</h3>
                <div className="space-y-3">
                  {[
                    { key: 'cookieBanner', label: 'Show cookie consent banner' },
                    { key: 'allowOptOut', label: 'Allow users to opt out of non-essential cookies' },
                  ].map(({ key, label }) => (
                    <div key={key} className="flex items-center space-x-2">
                      <Checkbox id={key} checked={formData[key as keyof FormData] as boolean} onCheckedChange={(checked) => updateForm(key as keyof FormData, checked as boolean)} />
                      <Label htmlFor={key} className="text-sm font-normal">{label}</Label>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex justify-between mt-6">
                <Button variant="outline" onClick={() => setStep(1)}><ArrowLeft className="mr-2 h-4 w-4" /> Back</Button>
                <Button onClick={generatePolicy} className="btn-gradient">Generate Policy <ArrowRight className="ml-2 h-4 w-4" /></Button>
              </div>
            </Card>
          )}

          {/* Step 3 */}
          {step === 3 && (
            <div className="space-y-4">
              {/* FREE TIER: Preview Gate */}
              <DocumentPreviewGate 
                content={generatedPolicy} 
                documentType="Cookie Policy" 
              />
              <Card className="p-4 bg-amber-50 border-amber-200">
                <div className="flex gap-3">
                  <AlertTriangle className="h-5 w-5 text-amber-600 shrink-0" />
                  <div className="text-sm text-amber-800">
                    <strong>Remember:</strong> This is a template. We recommend having it reviewed by a qualified attorney.
                  </div>
                </div>
              </Card>
              <div className="flex justify-between">
                <Button variant="outline" onClick={() => setStep(2)}><ArrowLeft className="mr-2 h-4 w-4" /> Edit Options</Button>
                <Button className="btn-gradient" asChild>
                  <Link href="/disclaimer">Generate Disclaimer <ArrowRight className="ml-2 h-4 w-4" /></Link>
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
