"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { 
  FileText, ArrowLeft, ArrowRight,
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
  stateProvince: string;
  // Business type
  sellsProducts: boolean;
  sellsServices: boolean;
  hasSubscription: boolean;
  hasUserAccounts: boolean;
  hasUserContent: boolean;
  // Features
  allowsComments: boolean;
  hasAffiliate: boolean;
  hasAPI: boolean;
  // Policies
  hasRefundPolicy: boolean;
  limitLiability: boolean;
  requireArbitration: boolean;
  governingLaw: string;
}

const defaultFormData: FormData = {
  companyName: "",
  websiteUrl: "",
  contactEmail: "",
  country: "United States",
  stateProvince: "",
  sellsProducts: false,
  sellsServices: false,
  hasSubscription: false,
  hasUserAccounts: true,
  hasUserContent: false,
  allowsComments: false,
  hasAffiliate: false,
  hasAPI: false,
  hasRefundPolicy: true,
  limitLiability: true,
  requireArbitration: false,
  governingLaw: "",
};

export default function TermsOfServiceGenerator() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<FormData>(defaultFormData);
  const [generatedTerms, setGeneratedTerms] = useState<string>("");

  const updateForm = (field: keyof FormData, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const generateTerms = () => {
    const today = new Date().toLocaleDateString('en-US', { 
      year: 'numeric', month: 'long', day: 'numeric' 
    });

    const jurisdiction = formData.governingLaw || formData.stateProvince || formData.country || "United States";

    let terms = `# Terms of Service

**Last Updated: ${today}**

## 1. Agreement to Terms

By accessing or using ${formData.websiteUrl || "[Website URL]"} (the "Website"), operated by ${formData.companyName || "[Company Name]"} ("Company," "we," "us," or "our"), you agree to be bound by these Terms of Service ("Terms"). If you do not agree to these Terms, please do not use our Website.

## 2. Changes to Terms

We reserve the right to modify these Terms at any time. We will notify users of any material changes by posting the updated Terms on this page and updating the "Last Updated" date. Your continued use of the Website after any changes constitutes acceptance of the new Terms.

## 3. Use of the Website

### 3.1 Eligibility
You must be at least 18 years old to use this Website. By using the Website, you represent and warrant that you meet this age requirement.

### 3.2 Account Registration
${formData.hasUserAccounts ? `When you create an account with us, you must provide accurate and complete information. You are responsible for:
- Maintaining the confidentiality of your account credentials
- All activities that occur under your account
- Notifying us immediately of any unauthorized use

We reserve the right to suspend or terminate accounts that violate these Terms.` : "Account registration may not be required to use our Website."}

### 3.3 Prohibited Conduct
You agree not to:
- Use the Website for any unlawful purpose
- Violate any applicable laws or regulations
- Infringe on the rights of others
- Transmit any harmful code or malware
- Attempt to gain unauthorized access to our systems
- Interfere with the proper functioning of the Website
- Harass, abuse, or harm other users
- Use automated systems to access the Website without permission

`;

    if (formData.hasUserContent) {
      terms += `## 4. User Content

### 4.1 Your Content
${formData.allowsComments ? "Our Website may allow you to post, submit, or share content (\"User Content\")." : "You may be able to submit content through our Website."} By submitting User Content, you:
- Retain ownership of your content
- Grant us a non-exclusive, worldwide, royalty-free license to use, display, and distribute your content in connection with our services
- Represent that you have the right to submit such content
- Agree that your content does not violate any third-party rights

### 4.2 Content Moderation
We reserve the right to remove or modify any User Content that violates these Terms or that we find objectionable, without prior notice.

`;
    }

    if (formData.sellsProducts || formData.sellsServices) {
      terms += `## ${formData.hasUserContent ? "5" : "4"}. Products and Services

### ${formData.hasUserContent ? "5" : "4"}.1 Pricing and Payment
${formData.sellsProducts ? "All prices for products are displayed in the applicable currency and are subject to change without notice." : ""}
${formData.sellsServices ? "Service fees are as described on our Website and may vary based on the services selected." : ""}
${formData.hasSubscription ? "\nSubscription services will be billed on a recurring basis until cancelled." : ""}

### ${formData.hasUserContent ? "5" : "4"}.2 Orders and Fulfillment
We reserve the right to refuse or cancel any order for any reason, including but not limited to product availability, errors in pricing or product information, or suspected fraud.

${formData.hasRefundPolicy ? `### ${formData.hasUserContent ? "5" : "4"}.3 Refunds
Please refer to our Refund Policy for information about returns and refunds. Refund requests must be submitted within the timeframe specified in our Refund Policy.` : ""}

`;
    }

    terms += `## ${formData.sellsProducts || formData.sellsServices ? (formData.hasUserContent ? "6" : "5") : (formData.hasUserContent ? "5" : "4")}. Intellectual Property

### ${formData.sellsProducts || formData.sellsServices ? (formData.hasUserContent ? "6" : "5") : (formData.hasUserContent ? "5" : "4")}.1 Our Content
All content on this Website, including but not limited to text, graphics, logos, images, and software, is the property of ${formData.companyName || "[Company Name]"} or its licensors and is protected by copyright, trademark, and other intellectual property laws.

### ${formData.sellsProducts || formData.sellsServices ? (formData.hasUserContent ? "6" : "5") : (formData.hasUserContent ? "5" : "4")}.2 Limited License
We grant you a limited, non-exclusive, non-transferable license to access and use the Website for personal, non-commercial purposes. This license does not include:
- Modifying or copying our content
- Using the content for commercial purposes
- Attempting to reverse engineer any software
- Removing any copyright or proprietary notices

`;

    if (formData.hasAPI) {
      terms += `## API Usage

If you access our services through an API:
- You must comply with our API documentation and usage guidelines
- We may set limits on API calls and may modify or discontinue API access at any time
- You are responsible for maintaining the security of your API credentials
- Excessive use may result in throttling or suspension of access

`;
    }

    if (formData.limitLiability) {
      terms += `## Disclaimers and Limitation of Liability

### Disclaimer of Warranties
THE WEBSITE AND ALL CONTENT ARE PROVIDED "AS IS" AND "AS AVAILABLE" WITHOUT WARRANTIES OF ANY KIND, EITHER EXPRESS OR IMPLIED. WE DISCLAIM ALL WARRANTIES, INCLUDING BUT NOT LIMITED TO MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, AND NON-INFRINGEMENT.

### Limitation of Liability
TO THE MAXIMUM EXTENT PERMITTED BY LAW, ${(formData.companyName || "[COMPANY NAME]").toUpperCase()} SHALL NOT BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES, OR ANY LOSS OF PROFITS OR REVENUES, WHETHER INCURRED DIRECTLY OR INDIRECTLY, OR ANY LOSS OF DATA, USE, GOODWILL, OR OTHER INTANGIBLE LOSSES.

OUR TOTAL LIABILITY FOR ANY CLAIMS ARISING FROM YOUR USE OF THE WEBSITE SHALL NOT EXCEED THE AMOUNT YOU PAID TO US, IF ANY, IN THE TWELVE (12) MONTHS PRECEDING THE CLAIM.

`;
    }

    terms += `## Indemnification

You agree to indemnify, defend, and hold harmless ${formData.companyName || "[Company Name]"}, its officers, directors, employees, agents, and affiliates from and against any claims, damages, losses, liabilities, costs, and expenses (including reasonable attorneys' fees) arising from:
- Your use of the Website
- Your violation of these Terms
- Your violation of any rights of another party
- Any content you submit to the Website

## Third-Party Links

Our Website may contain links to third-party websites or services. We are not responsible for the content, privacy policies, or practices of any third-party sites. Your use of third-party websites is at your own risk.

`;

    if (formData.requireArbitration) {
      terms += `## Dispute Resolution

### Arbitration Agreement
Any dispute arising from these Terms or your use of the Website shall be resolved through binding arbitration in accordance with the rules of the American Arbitration Association. The arbitration shall take place in ${jurisdiction}.

### Class Action Waiver
You agree to resolve any disputes on an individual basis and waive any right to participate in a class action lawsuit or class-wide arbitration.

`;
    }

    terms += `## Governing Law

These Terms shall be governed by and construed in accordance with the laws of ${jurisdiction}, without regard to its conflict of law provisions.

## Termination

We may terminate or suspend your access to the Website immediately, without prior notice or liability, for any reason, including if you breach these Terms. Upon termination, your right to use the Website will cease immediately.

## Severability

If any provision of these Terms is found to be unenforceable or invalid, that provision shall be limited or eliminated to the minimum extent necessary, and the remaining provisions shall remain in full force and effect.

## Entire Agreement

These Terms constitute the entire agreement between you and ${formData.companyName || "[Company Name]"} regarding the use of the Website, superseding any prior agreements.

## Contact Us

If you have any questions about these Terms, please contact us at:

**${formData.companyName || "[Company Name]"}**
Email: ${formData.contactEmail || "[Contact Email]"}
Website: ${formData.websiteUrl || "[Website URL]"}

---

*These Terms of Service were generated using TermsZipp. We recommend having this document reviewed by a qualified attorney to ensure it meets your specific legal requirements.*
`;

    setGeneratedTerms(terms);
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
              <FileText className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold">Terms of Service Generator</h1>
              <p className="text-muted-foreground">Create comprehensive terms and conditions</p>
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
                  {s === 1 ? 'Business Info' : s === 2 ? 'Features & Policies' : 'Generate'}
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
                      placeholder="legal@example.com"
                      className="pl-10"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
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
                  <div>
                    <Label htmlFor="stateProvince">State / Province</Label>
                    <Input
                      id="stateProvince"
                      value={formData.stateProvince}
                      onChange={(e) => updateForm('stateProvince', e.target.value)}
                      placeholder="California"
                      className="mt-1"
                    />
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

          {/* Step 2: Features & Policies */}
          {step === 2 && (
            <Card className="p-6">
              <h2 className="text-lg font-semibold mb-6">Features & Policies</h2>
              
              {/* Business Type */}
              <div className="mb-6">
                <h3 className="text-sm font-medium mb-3">What does your business offer?</h3>
                <div className="grid grid-cols-2 gap-3">
                  {[
                    { key: 'sellsProducts', label: 'Sells physical products' },
                    { key: 'sellsServices', label: 'Sells services' },
                    { key: 'hasSubscription', label: 'Has subscription plans' },
                    { key: 'hasUserAccounts', label: 'User accounts' },
                    { key: 'hasUserContent', label: 'Users can post content' },
                    { key: 'allowsComments', label: 'Comments / reviews' },
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

              {/* Additional Features */}
              <div className="mb-6">
                <h3 className="text-sm font-medium mb-3">Additional features</h3>
                <div className="grid grid-cols-2 gap-3">
                  {[
                    { key: 'hasAffiliate', label: 'Affiliate program' },
                    { key: 'hasAPI', label: 'Provides API access' },
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

              {/* Legal Policies */}
              <div className="mb-6">
                <h3 className="text-sm font-medium mb-3">Legal policies to include</h3>
                <div className="grid grid-cols-1 gap-3">
                  {[
                    { key: 'hasRefundPolicy', label: 'Reference refund policy' },
                    { key: 'limitLiability', label: 'Limitation of liability clause' },
                    { key: 'requireArbitration', label: 'Require arbitration for disputes' },
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

              {/* Governing Law */}
              <div className="mb-6">
                <Label htmlFor="governingLaw">Governing Law Jurisdiction (optional)</Label>
                <Input
                  id="governingLaw"
                  value={formData.governingLaw}
                  onChange={(e) => updateForm('governingLaw', e.target.value)}
                  placeholder="State of California, United States"
                  className="mt-1"
                />
                <p className="text-xs text-muted-foreground mt-1">
                  Leave blank to use your country/state from Step 1
                </p>
              </div>

              <div className="flex justify-between mt-6">
                <Button variant="outline" onClick={() => setStep(1)}>
                  <ArrowLeft className="mr-2 h-4 w-4" /> Back
                </Button>
                <Button onClick={generateTerms} className="btn-gradient">
                  Generate Terms <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </Card>
          )}

          {/* Step 3: Generated Terms */}
          {step === 3 && (
            <div className="space-y-4">
              <DocumentPreviewGate 
                content={generatedTerms} 
                documentType="Terms of Service"
                documentTypeSlug="terms-of-service"
                formData={{ ...formData }}
              />

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
                  <Link href="/cookie-policy">
                    Generate Cookie Policy <ArrowRight className="ml-2 h-4 w-4" />
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
