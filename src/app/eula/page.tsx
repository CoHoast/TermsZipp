"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { 
  ScrollText, ArrowLeft, ArrowRight,
  Globe, Mail, Building, AlertTriangle
} from "lucide-react";
import Link from "next/link";
import { ExportButtons } from "@/components/export-buttons";
import { DocumentPreviewGate } from "@/components/document-preview-gate";

interface FormData {
  companyName: string;
  appName: string;
  websiteUrl: string;
  contactEmail: string;
  // App type
  isMobileApp: boolean;
  isDesktopApp: boolean;
  isWebApp: boolean;
  isSaaS: boolean;
  // Features
  hasUserAccounts: boolean;
  collectsData: boolean;
  hasInAppPurchases: boolean;
  hasSubscription: boolean;
  allowsUserContent: boolean;
  hasAPI: boolean;
  // License terms
  isFreeApp: boolean;
  allowsCommercialUse: boolean;
  allowsModification: boolean;
  transferable: boolean;
  // Restrictions
  restrictReverseEngineering: boolean;
  restrictRedistribution: boolean;
  restrictCompetitiveUse: boolean;
  governingLaw: string;
}

const defaultFormData: FormData = {
  companyName: "",
  appName: "",
  websiteUrl: "",
  contactEmail: "",
  isMobileApp: false,
  isDesktopApp: false,
  isWebApp: true,
  isSaaS: true,
  hasUserAccounts: true,
  collectsData: true,
  hasInAppPurchases: false,
  hasSubscription: true,
  allowsUserContent: false,
  hasAPI: false,
  isFreeApp: false,
  allowsCommercialUse: true,
  allowsModification: false,
  transferable: false,
  restrictReverseEngineering: true,
  restrictRedistribution: true,
  restrictCompetitiveUse: true,
  governingLaw: "United States",
};

export default function EULAGenerator() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<FormData>(defaultFormData);
  const [generatedEULA, setGeneratedEULA] = useState<string>("");

  const updateForm = (field: keyof FormData, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const generateEULA = () => {
    const today = new Date().toLocaleDateString('en-US', { 
      year: 'numeric', month: 'long', day: 'numeric' 
    });

    const appType = [
      formData.isMobileApp && "mobile application",
      formData.isDesktopApp && "desktop software",
      formData.isWebApp && "web application",
      formData.isSaaS && "software as a service (SaaS)",
    ].filter(Boolean).join(", ") || "software";

    let eula = `# End User License Agreement (EULA)

**Last Updated: ${today}**

**IMPORTANT: PLEASE READ THIS END USER LICENSE AGREEMENT CAREFULLY BEFORE USING ${(formData.appName || "[APP NAME]").toUpperCase()}.**

This End User License Agreement ("Agreement" or "EULA") is a legal agreement between you ("User," "you," or "your") and ${formData.companyName || "[Company Name]"} ("Company," "we," "us," or "our") for the use of ${formData.appName || "[App Name]"} (the "Software"), including any associated documentation, updates, and support services.

By installing, copying, or otherwise using the Software, you agree to be bound by the terms of this Agreement. If you do not agree to these terms, do not install or use the Software.

## 1. License Grant

Subject to the terms of this Agreement, ${formData.companyName || "[Company Name]"} grants you a **limited, non-exclusive, ${formData.transferable ? "" : "non-transferable, "}revocable license** to:

- Download, install, and use the Software on devices you own or control
- Use the Software for ${formData.allowsCommercialUse ? "personal and commercial" : "personal, non-commercial"} purposes
${formData.isSaaS ? "- Access and use the Software via the internet as a hosted service\n" : ""}
This license is conditional on your compliance with all terms in this Agreement.

## 2. License Restrictions

You agree NOT to:

${formData.restrictReverseEngineering ? `- Reverse engineer, decompile, disassemble, or attempt to derive the source code of the Software
` : ""}${formData.restrictRedistribution ? `- Copy, distribute, sublicense, lease, rent, or sell the Software to any third party
` : ""}- Remove, alter, or obscure any proprietary notices, labels, or marks on the Software
- Use the Software to develop a competing product or service
${formData.restrictCompetitiveUse ? `- Use the Software for competitive analysis or benchmarking
` : ""}- Use the Software in any way that violates applicable laws or regulations
- Attempt to gain unauthorized access to any systems or networks connected to the Software
- Use the Software to transmit malware, spam, or other harmful content
${!formData.allowsModification ? `- Modify, adapt, translate, or create derivative works based on the Software
` : ""}
## 3. Intellectual Property Rights

The Software and all copies thereof are proprietary to ${formData.companyName || "[Company Name]"} and title thereto remains in ${formData.companyName || "[Company Name]"}. The Software is protected by copyright laws and international treaty provisions.

All rights in the Software not specifically granted in this Agreement are reserved to ${formData.companyName || "[Company Name]"}. You acknowledge that the Software contains valuable trade secrets and proprietary information.

**Trademarks:** ${formData.appName || "[App Name]"} and all related names, logos, product and service names, designs, and slogans are trademarks of ${formData.companyName || "[Company Name]"}. You may not use such marks without our prior written permission.

`;

    if (formData.hasUserAccounts) {
      eula += `## 4. User Accounts

To access certain features of the Software, you may be required to create an account. You agree to:

- Provide accurate and complete information when creating your account
- Maintain the security and confidentiality of your login credentials
- Notify us immediately of any unauthorized use of your account
- Accept responsibility for all activities that occur under your account

We reserve the right to suspend or terminate accounts that violate this Agreement or that we believe pose a security risk.

`;
    }

    if (formData.collectsData) {
      eula += `## ${formData.hasUserAccounts ? "5" : "4"}. Privacy and Data Collection

The Software may collect certain information about you and your use of the Software. Our collection and use of this information is governed by our Privacy Policy, available at ${formData.websiteUrl || "[Website URL]"}/privacy.

By using the Software, you consent to the collection and use of your information as described in our Privacy Policy.

`;
    }

    if (formData.hasSubscription || formData.hasInAppPurchases) {
      eula += `## ${formData.hasUserAccounts ? (formData.collectsData ? "6" : "5") : (formData.collectsData ? "5" : "4")}. Payments and Subscriptions

${formData.hasSubscription ? `### Subscription Terms

If you purchase a subscription to the Software:

- Subscriptions automatically renew unless cancelled before the renewal date
- You may cancel your subscription at any time through your account settings
- Refunds are subject to our Refund Policy
- We reserve the right to change subscription prices with notice

` : ""}${formData.hasInAppPurchases ? `### In-App Purchases

The Software may offer in-app purchases. All in-app purchases are:

- Final and non-refundable (except as required by law)
- Subject to the terms presented at the time of purchase
- Your responsibility to review before completing

` : ""}`;
    }

    if (formData.allowsUserContent) {
      eula += `## User-Generated Content

The Software may allow you to submit, post, or share content ("User Content"). By submitting User Content, you:

- Retain ownership of your User Content
- Grant us a worldwide, non-exclusive, royalty-free license to use, display, and distribute your User Content in connection with the Software
- Represent that you have all rights necessary to grant this license
- Agree not to submit content that is illegal, harmful, or violates third-party rights

We reserve the right to remove any User Content that violates this Agreement.

`;
    }

    if (formData.hasAPI) {
      eula += `## API Terms

If you access the Software through our API:

- You must comply with our API documentation and rate limits
- Your API credentials are confidential and must not be shared
- We may modify or discontinue API access at any time
- Automated access must identify itself with a proper User-Agent string
- Excessive use may result in throttling or suspension

`;
    }

    eula += `## Disclaimer of Warranties

THE SOFTWARE IS PROVIDED "AS IS" AND "AS AVAILABLE" WITHOUT WARRANTIES OF ANY KIND, EITHER EXPRESS OR IMPLIED, INCLUDING, BUT NOT LIMITED TO, IMPLIED WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, TITLE, AND NON-INFRINGEMENT.

${formData.companyName || "[Company Name]".toUpperCase()} DOES NOT WARRANT THAT:

- The Software will meet your requirements
- The Software will be uninterrupted, timely, secure, or error-free
- The results obtained from the Software will be accurate or reliable
- Any errors in the Software will be corrected

## Limitation of Liability

TO THE MAXIMUM EXTENT PERMITTED BY APPLICABLE LAW, IN NO EVENT SHALL ${(formData.companyName || "[Company Name]").toUpperCase()} BE LIABLE FOR ANY:

- INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES
- LOSS OF PROFITS, DATA, USE, GOODWILL, OR OTHER INTANGIBLE LOSSES
- DAMAGES RESULTING FROM UNAUTHORIZED ACCESS TO OR USE OF OUR SERVERS
- DAMAGES RESULTING FROM ANY INTERRUPTION OR CESSATION OF THE SOFTWARE

OUR TOTAL LIABILITY FOR ALL CLAIMS ARISING FROM THIS AGREEMENT SHALL NOT EXCEED THE AMOUNT YOU PAID FOR THE SOFTWARE IN THE TWELVE (12) MONTHS PRECEDING THE CLAIM, OR $100, WHICHEVER IS GREATER.

## Indemnification

You agree to indemnify, defend, and hold harmless ${formData.companyName || "[Company Name]"}, its officers, directors, employees, and agents from and against any claims, damages, losses, liabilities, costs, and expenses (including reasonable attorneys' fees) arising from:

- Your use of the Software
- Your violation of this Agreement
- Your violation of any third-party rights
${formData.allowsUserContent ? "- Any User Content you submit through the Software\n" : ""}
## Termination

### By You
You may terminate this Agreement at any time by uninstalling the Software and destroying all copies in your possession.

### By Us
We may terminate or suspend your license immediately, without prior notice or liability, if you breach any term of this Agreement.

### Effect of Termination
Upon termination:
- All rights granted to you under this Agreement will immediately cease
- You must uninstall the Software and destroy all copies
- Sections that by their nature should survive will remain in effect

## Updates and Modifications

We may update, modify, or discontinue the Software at any time without notice. Updates may be automatically downloaded and installed. By continuing to use the Software after updates, you agree to the updated terms.

## Export Compliance

You agree to comply with all applicable export and re-export control laws and regulations in your use of the Software.

## Governing Law

This Agreement shall be governed by and construed in accordance with the laws of ${formData.governingLaw || "the United States"}, without regard to its conflict of law provisions.

## Dispute Resolution

Any dispute arising from this Agreement shall be resolved through binding arbitration in accordance with the rules of the American Arbitration Association, except that either party may seek injunctive relief in any court of competent jurisdiction.

## Severability

If any provision of this Agreement is found to be unenforceable, the remaining provisions will continue in full force and effect.

## Entire Agreement

This Agreement constitutes the entire agreement between you and ${formData.companyName || "[Company Name]"} regarding the Software and supersedes all prior agreements and understandings.

## Contact Information

If you have questions about this Agreement, please contact us:

**${formData.companyName || "[Company Name]"}**
Email: ${formData.contactEmail || "[Contact Email]"}
Website: ${formData.websiteUrl || "[Website URL]"}

---

*This EULA was generated using TermsZipp. We strongly recommend having this document reviewed by a qualified attorney to ensure it meets your specific legal requirements.*
`;

    setGeneratedEULA(eula);
    setStep(3);
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="bg-white border-b">
        <div className="container mx-auto px-4 py-8">
          <Link href="/" className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground mb-4">
            <ArrowLeft className="h-4 w-4 mr-1" /> Back to Generators
          </Link>
          <div className="flex items-center gap-3">
            <div className="brand-gradient rounded-lg p-2">
              <ScrollText className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold">EULA Generator</h1>
              <p className="text-muted-foreground">Create an End User License Agreement for your software</p>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-center gap-4">
            {[1, 2, 3].map((s) => (
              <div key={s} className="flex items-center">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${step >= s ? 'brand-gradient text-white' : 'bg-slate-200 text-slate-500'}`}>{s}</div>
                <span className={`ml-2 text-sm ${step >= s ? 'text-foreground' : 'text-muted-foreground'}`}>
                  {s === 1 ? 'App Info' : s === 2 ? 'License Terms' : 'Generate'}
                </span>
                {s < 3 && <div className="w-12 h-0.5 bg-slate-200 mx-4" />}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          
          {step === 1 && (
            <Card className="p-6">
              <h2 className="text-lg font-semibold mb-6">Application Information</h2>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="companyName">Company Name *</Label>
                  <div className="relative mt-1">
                    <Building className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input id="companyName" value={formData.companyName} onChange={(e) => updateForm('companyName', e.target.value)} placeholder="Acme Inc." className="pl-10" />
                  </div>
                </div>
                <div>
                  <Label htmlFor="appName">Application / Software Name *</Label>
                  <Input id="appName" value={formData.appName} onChange={(e) => updateForm('appName', e.target.value)} placeholder="My Awesome App" className="mt-1" />
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
                    <Input id="contactEmail" type="email" value={formData.contactEmail} onChange={(e) => updateForm('contactEmail', e.target.value)} placeholder="legal@example.com" className="pl-10" />
                  </div>
                </div>
                <div>
                  <Label>Application Type</Label>
                  <div className="grid grid-cols-2 gap-3 mt-2">
                    {[
                      { key: 'isMobileApp', label: 'Mobile App' },
                      { key: 'isDesktopApp', label: 'Desktop Software' },
                      { key: 'isWebApp', label: 'Web Application' },
                      { key: 'isSaaS', label: 'SaaS' },
                    ].map(({ key, label }) => (
                      <div key={key} className="flex items-center space-x-2">
                        <Checkbox id={key} checked={formData[key as keyof FormData] as boolean} onCheckedChange={(checked) => updateForm(key as keyof FormData, checked as boolean)} />
                        <Label htmlFor={key} className="text-sm font-normal">{label}</Label>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <div className="flex justify-end mt-6">
                <Button onClick={() => setStep(2)} className="btn-gradient">Next Step <ArrowRight className="ml-2 h-4 w-4" /></Button>
              </div>
            </Card>
          )}

          {step === 2 && (
            <Card className="p-6">
              <h2 className="text-lg font-semibold mb-6">License Terms & Features</h2>
              
              <div className="mb-6">
                <h3 className="text-sm font-medium mb-3">App features</h3>
                <div className="grid grid-cols-2 gap-3">
                  {[
                    { key: 'hasUserAccounts', label: 'User accounts' },
                    { key: 'collectsData', label: 'Collects user data' },
                    { key: 'hasSubscription', label: 'Has subscriptions' },
                    { key: 'hasInAppPurchases', label: 'In-app purchases' },
                    { key: 'allowsUserContent', label: 'User-generated content' },
                    { key: 'hasAPI', label: 'Provides API access' },
                  ].map(({ key, label }) => (
                    <div key={key} className="flex items-center space-x-2">
                      <Checkbox id={key} checked={formData[key as keyof FormData] as boolean} onCheckedChange={(checked) => updateForm(key as keyof FormData, checked as boolean)} />
                      <Label htmlFor={key} className="text-sm font-normal">{label}</Label>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mb-6">
                <h3 className="text-sm font-medium mb-3">License permissions</h3>
                <div className="space-y-3">
                  {[
                    { key: 'allowsCommercialUse', label: 'Allow commercial use' },
                    { key: 'allowsModification', label: 'Allow modifications' },
                    { key: 'transferable', label: 'License is transferable' },
                  ].map(({ key, label }) => (
                    <div key={key} className="flex items-center space-x-2">
                      <Checkbox id={key} checked={formData[key as keyof FormData] as boolean} onCheckedChange={(checked) => updateForm(key as keyof FormData, checked as boolean)} />
                      <Label htmlFor={key} className="text-sm font-normal">{label}</Label>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mb-6">
                <h3 className="text-sm font-medium mb-3">Restrictions</h3>
                <div className="space-y-3">
                  {[
                    { key: 'restrictReverseEngineering', label: 'Prohibit reverse engineering' },
                    { key: 'restrictRedistribution', label: 'Prohibit redistribution' },
                    { key: 'restrictCompetitiveUse', label: 'Prohibit competitive use' },
                  ].map(({ key, label }) => (
                    <div key={key} className="flex items-center space-x-2">
                      <Checkbox id={key} checked={formData[key as keyof FormData] as boolean} onCheckedChange={(checked) => updateForm(key as keyof FormData, checked as boolean)} />
                      <Label htmlFor={key} className="text-sm font-normal">{label}</Label>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <Label htmlFor="governingLaw">Governing Law</Label>
                <Input id="governingLaw" value={formData.governingLaw} onChange={(e) => updateForm('governingLaw', e.target.value)} placeholder="United States" className="mt-1" />
              </div>

              <div className="flex justify-between mt-6">
                <Button variant="outline" onClick={() => setStep(1)}><ArrowLeft className="mr-2 h-4 w-4" /> Back</Button>
                <Button onClick={generateEULA} className="btn-gradient">Generate EULA <ArrowRight className="ml-2 h-4 w-4" /></Button>
              </div>
            </Card>
          )}

          {step === 3 && (
            <div className="space-y-4">
              <DocumentPreviewGate 
                content={generatedEULA} 
                documentType="EULA"
                documentTypeSlug="eula"
                formData={formData as Record<string, unknown>}
              />
              <Card className="p-4 bg-amber-50 border-amber-200">
                <div className="flex gap-3">
                  <AlertTriangle className="h-5 w-5 text-amber-600 shrink-0" />
                  <div className="text-sm text-amber-800"><strong>Remember:</strong> This is a template. We strongly recommend having it reviewed by a qualified attorney.</div>
                </div>
              </Card>
              <div className="flex justify-between">
                <Button variant="outline" onClick={() => setStep(2)}><ArrowLeft className="mr-2 h-4 w-4" /> Edit Options</Button>
                <Button className="btn-gradient" asChild><Link href="/">Back to All Generators <ArrowRight className="ml-2 h-4 w-4" /></Link></Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
