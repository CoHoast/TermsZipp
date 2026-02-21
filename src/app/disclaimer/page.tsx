"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { 
  AlertTriangle, ArrowLeft, ArrowRight,
  Globe, Mail, Building
} from "lucide-react";
import Link from "next/link";
import { ExportButtons } from "@/components/export-buttons";
import { DocumentPreviewGate } from "@/components/document-preview-gate";

interface FormData {
  companyName: string;
  websiteUrl: string;
  contactEmail: string;
  // Disclaimer types
  generalDisclaimer: boolean;
  professionalDisclaimer: boolean;
  affiliateDisclaimer: boolean;
  testimonialDisclaimer: boolean;
  errorDisclaimer: boolean;
  externalLinksDisclaimer: boolean;
  // Industry specific
  isHealthSite: boolean;
  isFinanceSite: boolean;
  isLegalSite: boolean;
  isFitnessSite: boolean;
}

const defaultFormData: FormData = {
  companyName: "",
  websiteUrl: "",
  contactEmail: "",
  generalDisclaimer: true,
  professionalDisclaimer: true,
  affiliateDisclaimer: false,
  testimonialDisclaimer: false,
  errorDisclaimer: true,
  externalLinksDisclaimer: true,
  isHealthSite: false,
  isFinanceSite: false,
  isLegalSite: false,
  isFitnessSite: false,
};

export default function DisclaimerGenerator() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<FormData>(defaultFormData);
  const [generatedDisclaimer, setGeneratedDisclaimer] = useState<string>("");

  const updateForm = (field: keyof FormData, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const generateDisclaimer = () => {
    const today = new Date().toLocaleDateString('en-US', { 
      year: 'numeric', month: 'long', day: 'numeric' 
    });

    let disclaimer = `# Disclaimer

**Last Updated: ${today}**

The information provided on ${formData.websiteUrl || "[Website URL]"} (the "Website") by ${formData.companyName || "[Company Name]"} ("we," "us," or "our") is for general informational purposes only.

`;

    if (formData.generalDisclaimer) {
      disclaimer += `## General Disclaimer

All information on this Website is provided in good faith. However, we make no representation or warranty of any kind, express or implied, regarding the accuracy, adequacy, validity, reliability, availability, or completeness of any information on the Website.

UNDER NO CIRCUMSTANCE SHALL WE HAVE ANY LIABILITY TO YOU FOR ANY LOSS OR DAMAGE OF ANY KIND INCURRED AS A RESULT OF THE USE OF THE WEBSITE OR RELIANCE ON ANY INFORMATION PROVIDED ON THE WEBSITE. YOUR USE OF THE WEBSITE AND YOUR RELIANCE ON ANY INFORMATION ON THE WEBSITE IS SOLELY AT YOUR OWN RISK.

`;
    }

    if (formData.professionalDisclaimer) {
      disclaimer += `## No Professional Advice

The Website cannot and does not contain professional advice. The information is provided for general informational and educational purposes only and is not a substitute for professional advice.

`;

      if (formData.isHealthSite) {
        disclaimer += `### Health & Medical Disclaimer

The health information on this Website is provided for general informational purposes only and is not intended as, and shall not be construed as, professional medical advice, diagnosis, or treatment. Always seek the advice of your physician or other qualified health provider with any questions you may have regarding a medical condition.

Never disregard professional medical advice or delay in seeking it because of something you have read on this Website. If you think you may have a medical emergency, call your doctor or emergency services immediately.

`;
      }

      if (formData.isFinanceSite) {
        disclaimer += `### Financial Disclaimer

The financial information on this Website is provided for general informational purposes only and should not be considered as financial advice. We are not licensed financial advisors or brokers.

Before making any financial decisions, you should consult with a qualified financial professional. Past performance is not indicative of future results. All investments involve risk, including the potential loss of principal.

`;
      }

      if (formData.isLegalSite) {
        disclaimer += `### Legal Disclaimer

The legal information on this Website is provided for general informational purposes only and does not constitute legal advice. We are not a law firm and do not provide legal services.

For legal advice specific to your situation, please consult with a licensed attorney in your jurisdiction. The information provided may not reflect the most current legal developments.

`;
      }

      if (formData.isFitnessSite) {
        disclaimer += `### Fitness & Exercise Disclaimer

The fitness and exercise information on this Website is provided for general informational purposes only. Always consult your physician or a qualified healthcare professional before beginning any exercise program.

You should understand that when participating in any exercise or training program, there is the possibility of physical injury. If you engage in any exercise or training program, you agree that you do so at your own risk.

`;
      }
    }

    if (formData.affiliateDisclaimer) {
      disclaimer += `## Affiliate Disclosure

This Website may contain affiliate links. This means that if you click on certain links and make a purchase, we may receive a commission at no additional cost to you.

We only recommend products and services that we believe will add value to our readers. Our opinions and recommendations are our own and are not influenced by any affiliate partnerships.

Please note that we have not been given any free products, services, or anything else by these companies in exchange for mentioning them on the site. The only consideration is in the form of affiliate commissions.

`;
    }

    if (formData.testimonialDisclaimer) {
      disclaimer += `## Testimonials Disclaimer

The Website may contain testimonials by users of our products and/or services. These testimonials reflect the real-life experiences and opinions of such users. However, the experiences are personal to those particular users, and may not necessarily be representative of all users of our products and/or services.

We do not claim, and you should not assume, that all users will have the same experiences. Your individual results may vary.

The testimonials on the Website are submitted in various forms and are reviewed by us before posting. They appear on the Website verbatim as given by the users, except for grammatical or typing error corrections.

`;
    }

    if (formData.errorDisclaimer) {
      disclaimer += `## Errors and Omissions

While we have made every attempt to ensure that the information contained on this Website is accurate, we are not responsible for any errors or omissions, or for the results obtained from the use of this information.

All information on this Website is provided "as is," with no guarantee of completeness, accuracy, timeliness, or of the results obtained from the use of this information. We reserve the right to make changes to this Website at any time without notice.

`;
    }

    if (formData.externalLinksDisclaimer) {
      disclaimer += `## External Links Disclaimer

This Website may contain links to external websites that are not provided or maintained by or in any way affiliated with ${formData.companyName || "[Company Name]"}.

Please note that we do not guarantee the accuracy, relevance, timeliness, or completeness of any information on these external websites. We have no control over the nature, content, and availability of those sites.

The inclusion of any links does not necessarily imply a recommendation or endorse the views expressed within them. We encourage you to read the privacy policies and terms of service of any external site you visit.

`;
    }

    disclaimer += `## Fair Use Disclaimer

This Website may contain copyrighted material, the use of which has not always been specifically authorized by the copyright owner. We make such material available in our efforts to advance understanding of various topics.

We believe this constitutes a "fair use" of any such copyrighted material as provided for in section 107 of the US Copyright Law. If you wish to use copyrighted material from this Website for purposes of your own that go beyond "fair use," you must obtain permission from the copyright owner.

## Changes to This Disclaimer

We reserve the right to modify this Disclaimer at any time. Changes and clarifications will take effect immediately upon posting on the Website. We encourage you to review this Disclaimer periodically.

## Contact Us

If you have any questions about this Disclaimer, please contact us:

**${formData.companyName || "[Company Name]"}**
Email: ${formData.contactEmail || "[Contact Email]"}
Website: ${formData.websiteUrl || "[Website URL]"}

---

*This disclaimer was generated using TermsZipp. We recommend having this document reviewed by a qualified attorney to ensure it meets your specific legal requirements.*
`;

    setGeneratedDisclaimer(disclaimer);
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
              <AlertTriangle className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold">Disclaimer Generator</h1>
              <p className="text-muted-foreground">Create a comprehensive liability disclaimer</p>
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
                  {s === 1 ? 'Business Info' : s === 2 ? 'Disclaimer Types' : 'Generate'}
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
                    <Input id="contactEmail" type="email" value={formData.contactEmail} onChange={(e) => updateForm('contactEmail', e.target.value)} placeholder="legal@example.com" className="pl-10" />
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
              <h2 className="text-lg font-semibold mb-6">Disclaimer Types</h2>
              
              <div className="mb-6">
                <h3 className="text-sm font-medium mb-3">Select disclaimer sections to include:</h3>
                <div className="space-y-3">
                  {[
                    { key: 'generalDisclaimer', label: 'General disclaimer (recommended)' },
                    { key: 'professionalDisclaimer', label: 'No professional advice disclaimer' },
                    { key: 'affiliateDisclaimer', label: 'Affiliate disclosure' },
                    { key: 'testimonialDisclaimer', label: 'Testimonials disclaimer' },
                    { key: 'errorDisclaimer', label: 'Errors & omissions disclaimer' },
                    { key: 'externalLinksDisclaimer', label: 'External links disclaimer' },
                  ].map(({ key, label }) => (
                    <div key={key} className="flex items-center space-x-2">
                      <Checkbox id={key} checked={formData[key as keyof FormData] as boolean} onCheckedChange={(checked) => updateForm(key as keyof FormData, checked as boolean)} />
                      <Label htmlFor={key} className="text-sm font-normal">{label}</Label>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mb-6">
                <h3 className="text-sm font-medium mb-3">Industry-specific disclaimers:</h3>
                <div className="space-y-3">
                  {[
                    { key: 'isHealthSite', label: 'Health & medical content' },
                    { key: 'isFinanceSite', label: 'Financial content' },
                    { key: 'isLegalSite', label: 'Legal content' },
                    { key: 'isFitnessSite', label: 'Fitness & exercise content' },
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
                <Button onClick={generateDisclaimer} className="btn-gradient">Generate Disclaimer <ArrowRight className="ml-2 h-4 w-4" /></Button>
              </div>
            </Card>
          )}

          {step === 3 && (
            <div className="space-y-4">
              <DocumentPreviewGate 
                content={generatedDisclaimer} 
                documentType="Disclaimer"
                documentTypeSlug="disclaimer"
                formData={formData as Record<string, unknown>}
              />
              <Card className="p-4 bg-amber-50 border-amber-200">
                <div className="flex gap-3">
                  <AlertTriangle className="h-5 w-5 text-amber-600 shrink-0" />
                  <div className="text-sm text-amber-800"><strong>Remember:</strong> This is a template. We recommend having it reviewed by a qualified attorney.</div>
                </div>
              </Card>
              <div className="flex justify-between">
                <Button variant="outline" onClick={() => setStep(2)}><ArrowLeft className="mr-2 h-4 w-4" /> Edit Options</Button>
                <Button className="btn-gradient" asChild><Link href="/refund-policy">Generate Refund Policy <ArrowRight className="ml-2 h-4 w-4" /></Link></Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
