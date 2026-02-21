"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { 
  RefreshCw, Copy, Check, Download, ArrowLeft, ArrowRight,
  Globe, Mail, Building, AlertTriangle
} from "lucide-react";
import Link from "next/link";
import { ExportButtons } from "@/components/export-buttons";
import { DocumentPreviewGate } from "@/components/document-preview-gate";

interface FormData {
  companyName: string;
  websiteUrl: string;
  contactEmail: string;
  // Business type
  sellsPhysicalProducts: boolean;
  sellsDigitalProducts: boolean;
  sellsServices: boolean;
  sellsSubscriptions: boolean;
  // Refund settings
  refundPeriodDays: string;
  requiresReceipt: boolean;
  requiresOriginalPackaging: boolean;
  offerExchanges: boolean;
  offerStoreCredit: boolean;
  // Conditions
  allowsPartialRefunds: boolean;
  chargesRestockingFee: boolean;
  restockingFeePercent: string;
  coversReturnShipping: boolean;
  // Exceptions
  hasNonRefundableItems: boolean;
  nonRefundableItems: string;
}

const defaultFormData: FormData = {
  companyName: "",
  websiteUrl: "",
  contactEmail: "",
  sellsPhysicalProducts: true,
  sellsDigitalProducts: false,
  sellsServices: false,
  sellsSubscriptions: false,
  refundPeriodDays: "30",
  requiresReceipt: true,
  requiresOriginalPackaging: true,
  offerExchanges: true,
  offerStoreCredit: true,
  allowsPartialRefunds: false,
  chargesRestockingFee: false,
  restockingFeePercent: "15",
  coversReturnShipping: false,
  hasNonRefundableItems: true,
  nonRefundableItems: "Gift cards, downloadable software, personalized items",
};

export default function RefundPolicyGenerator() {
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

    let policy = `# Refund & Return Policy

**Last Updated: ${today}**

Thank you for shopping at ${formData.companyName || "[Company Name]"}. We want you to be completely satisfied with your purchase. This Refund & Return Policy outlines our guidelines for returns, refunds, and exchanges.

## Overview

We offer a **${formData.refundPeriodDays || "30"}-day return policy** from the date of purchase. If ${formData.refundPeriodDays || "30"} days have passed since your purchase, we unfortunately cannot offer you a refund or exchange.

`;

    if (formData.sellsPhysicalProducts) {
      policy += `## Returns for Physical Products

### Eligibility

To be eligible for a return, your item must be:
- Unused and in the same condition that you received it
${formData.requiresOriginalPackaging ? "- In the original packaging\n" : ""}- Returned within ${formData.refundPeriodDays || "30"} days of purchase
${formData.requiresReceipt ? "- Accompanied by the receipt or proof of purchase\n" : ""}
### How to Initiate a Return

1. Contact us at ${formData.contactEmail || "[Contact Email]"} with your order number and reason for return
2. Wait for return authorization and instructions
3. Pack the item securely in its original packaging (if possible)
4. Ship the item to the address provided

### Return Shipping

${formData.coversReturnShipping ? 
"We will provide a prepaid shipping label for returns. The cost of return shipping will be deducted from your refund unless the return is due to our error." : 
"You will be responsible for paying your own shipping costs for returning your item. Shipping costs are non-refundable."}

${formData.chargesRestockingFee ? `### Restocking Fee

A ${formData.restockingFeePercent || "15"}% restocking fee may be applied to returned items. This fee covers the cost of inspecting, repackaging, and restocking the merchandise.

` : ""}`;
    }

    if (formData.sellsDigitalProducts) {
      policy += `## Digital Products

Due to the nature of digital products, all sales of digital downloads, software licenses, and other digital goods are **final** once the product has been delivered or accessed.

### Exceptions

We may consider refund requests for digital products if:
- You have not downloaded or accessed the product
- There is a technical issue that prevents you from using the product
- The product was significantly misrepresented

To request a refund for a digital product, please contact us within 7 days of purchase.

`;
    }

    if (formData.sellsServices) {
      policy += `## Services

### Cancellation

You may cancel a service booking at any time before the service is rendered. Cancellation fees may apply depending on how close to the scheduled service date you cancel:

- **More than 48 hours before:** Full refund
- **24-48 hours before:** 50% refund
- **Less than 24 hours before:** No refund

### Unsatisfactory Service

If you are not satisfied with a service we provided, please contact us within 7 days. We will work with you to resolve the issue, which may include re-performing the service or providing a partial or full refund.

`;
    }

    if (formData.sellsSubscriptions) {
      policy += `## Subscriptions

### Cancellation

You may cancel your subscription at any time through your account settings or by contacting us. Cancellation will take effect at the end of your current billing period.

### Refunds for Subscriptions

- **Monthly subscriptions:** We do not provide prorated refunds for monthly subscriptions
- **Annual subscriptions:** You may request a prorated refund within the first 30 days of your annual subscription
- **Free trials:** If you cancel before the trial ends, you will not be charged

`;
    }

    policy += `## Refund Process

### Processing Time

Once we receive your returned item (for physical products) or process your refund request, we will inspect it and notify you of the approval or rejection of your refund.

If approved, your refund will be processed, and a credit will automatically be applied to your original method of payment within **5-10 business days**.

### Refund Methods

${formData.offerStoreCredit ? "- **Store Credit:** Refunds can be issued as store credit, which never expires\n" : ""}- **Original Payment Method:** Refunds will be credited to the original payment method used for the purchase

`;

    if (formData.offerExchanges) {
      policy += `## Exchanges

We are happy to exchange items for a different size, color, or product of equal value. To request an exchange:

1. Contact us at ${formData.contactEmail || "[Contact Email]"}
2. Specify the item you wish to exchange and what you would like instead
3. We will provide instructions for the exchange process

If the new item costs more than the original, you will be responsible for the difference. If it costs less, we will refund the difference.

`;
    }

    if (formData.hasNonRefundableItems) {
      policy += `## Non-Refundable Items

The following items cannot be returned or refunded:

${formData.nonRefundableItems.split(',').map(item => `- ${item.trim()}`).join('\n')}

`;
    }

    policy += `## Damaged or Defective Items

If you receive a damaged or defective item, please contact us immediately at ${formData.contactEmail || "[Contact Email]"} with:

- Your order number
- Photos of the damaged/defective item
- A description of the issue

We will arrange for a replacement or full refund at no additional cost to you.

## Late or Missing Refunds

If you haven't received a refund yet:

1. First, check your bank account again
2. Contact your credit card company – it may take some time before your refund is officially posted
3. Contact your bank – there is often some processing time before a refund is posted
4. If you've done all of this and still have not received your refund, please contact us at ${formData.contactEmail || "[Contact Email]"}

## Contact Us

If you have any questions about our Refund & Return Policy, please contact us:

**${formData.companyName || "[Company Name]"}**
Email: ${formData.contactEmail || "[Contact Email]"}
Website: ${formData.websiteUrl || "[Website URL]"}

---

*This refund policy was generated using TermsZipp. We recommend having this document reviewed by a qualified attorney to ensure it meets your specific legal requirements.*
`;

    setGeneratedPolicy(policy);
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
              <RefreshCw className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold">Refund Policy Generator</h1>
              <p className="text-muted-foreground">Create a clear return and refund policy</p>
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
                  {s === 1 ? 'Business Info' : s === 2 ? 'Policy Details' : 'Generate'}
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
                  <Label htmlFor="companyName">Company / Store Name *</Label>
                  <div className="relative mt-1">
                    <Building className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input id="companyName" value={formData.companyName} onChange={(e) => updateForm('companyName', e.target.value)} placeholder="Acme Store" className="pl-10" />
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
                    <Input id="contactEmail" type="email" value={formData.contactEmail} onChange={(e) => updateForm('contactEmail', e.target.value)} placeholder="support@example.com" className="pl-10" />
                  </div>
                </div>
                <div>
                  <Label htmlFor="refundPeriodDays">Refund Period (days)</Label>
                  <Input id="refundPeriodDays" type="number" value={formData.refundPeriodDays} onChange={(e) => updateForm('refundPeriodDays', e.target.value)} placeholder="30" className="mt-1" />
                </div>
              </div>
              <div className="flex justify-end mt-6">
                <Button onClick={() => setStep(2)} className="btn-gradient">Next Step <ArrowRight className="ml-2 h-4 w-4" /></Button>
              </div>
            </Card>
          )}

          {step === 2 && (
            <Card className="p-6">
              <h2 className="text-lg font-semibold mb-6">Policy Details</h2>
              
              <div className="mb-6">
                <h3 className="text-sm font-medium mb-3">What do you sell?</h3>
                <div className="grid grid-cols-2 gap-3">
                  {[
                    { key: 'sellsPhysicalProducts', label: 'Physical products' },
                    { key: 'sellsDigitalProducts', label: 'Digital products' },
                    { key: 'sellsServices', label: 'Services' },
                    { key: 'sellsSubscriptions', label: 'Subscriptions' },
                  ].map(({ key, label }) => (
                    <div key={key} className="flex items-center space-x-2">
                      <Checkbox id={key} checked={formData[key as keyof FormData] as boolean} onCheckedChange={(checked) => updateForm(key as keyof FormData, checked as boolean)} />
                      <Label htmlFor={key} className="text-sm font-normal">{label}</Label>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mb-6">
                <h3 className="text-sm font-medium mb-3">Return requirements</h3>
                <div className="space-y-3">
                  {[
                    { key: 'requiresReceipt', label: 'Require receipt or proof of purchase' },
                    { key: 'requiresOriginalPackaging', label: 'Require original packaging' },
                    { key: 'offerExchanges', label: 'Offer exchanges' },
                    { key: 'offerStoreCredit', label: 'Offer store credit as refund option' },
                    { key: 'coversReturnShipping', label: 'Cover return shipping costs' },
                  ].map(({ key, label }) => (
                    <div key={key} className="flex items-center space-x-2">
                      <Checkbox id={key} checked={formData[key as keyof FormData] as boolean} onCheckedChange={(checked) => updateForm(key as keyof FormData, checked as boolean)} />
                      <Label htmlFor={key} className="text-sm font-normal">{label}</Label>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mb-6">
                <div className="flex items-center space-x-2 mb-2">
                  <Checkbox id="chargesRestockingFee" checked={formData.chargesRestockingFee} onCheckedChange={(checked) => updateForm('chargesRestockingFee', checked as boolean)} />
                  <Label htmlFor="chargesRestockingFee" className="text-sm font-normal">Charge restocking fee</Label>
                </div>
                {formData.chargesRestockingFee && (
                  <Input type="number" value={formData.restockingFeePercent} onChange={(e) => updateForm('restockingFeePercent', e.target.value)} placeholder="15" className="w-32" />
                )}
              </div>

              <div className="mb-6">
                <div className="flex items-center space-x-2 mb-2">
                  <Checkbox id="hasNonRefundableItems" checked={formData.hasNonRefundableItems} onCheckedChange={(checked) => updateForm('hasNonRefundableItems', checked as boolean)} />
                  <Label htmlFor="hasNonRefundableItems" className="text-sm font-normal">Has non-refundable items</Label>
                </div>
                {formData.hasNonRefundableItems && (
                  <Input value={formData.nonRefundableItems} onChange={(e) => updateForm('nonRefundableItems', e.target.value)} placeholder="Gift cards, sale items, etc." className="mt-2" />
                )}
              </div>

              <div className="flex justify-between mt-6">
                <Button variant="outline" onClick={() => setStep(1)}><ArrowLeft className="mr-2 h-4 w-4" /> Back</Button>
                <Button onClick={generatePolicy} className="btn-gradient">Generate Policy <ArrowRight className="ml-2 h-4 w-4" /></Button>
              </div>
            </Card>
          )}

          {step === 3 && (
            <div className="space-y-4">
              <DocumentPreviewGate 
                content={generatedPolicy} 
                documentType="Refund Policy"
                documentTypeSlug="refund-policy"
                formData={{ ...formData }}
              />
              <Card className="p-4 bg-amber-50 border-amber-200">
                <div className="flex gap-3">
                  <AlertTriangle className="h-5 w-5 text-amber-600 shrink-0" />
                  <div className="text-sm text-amber-800"><strong>Remember:</strong> This is a template. We recommend having it reviewed by a qualified attorney.</div>
                </div>
              </Card>
              <div className="flex justify-between">
                <Button variant="outline" onClick={() => setStep(2)}><ArrowLeft className="mr-2 h-4 w-4" /> Edit Options</Button>
                <Button className="btn-gradient" asChild><Link href="/eula">Generate EULA <ArrowRight className="ml-2 h-4 w-4" /></Link></Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
