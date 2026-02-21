"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Textarea } from "@/components/ui/textarea";
import { 
  RefreshCw, ArrowLeft, ArrowRight,
  Globe, Mail, Building, AlertTriangle
} from "lucide-react";
import Link from "next/link";
import { DocumentPreviewGate } from "@/components/document-preview-gate";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface FormData {
  // Business Info
  companyName: string;
  websiteUrl: string;
  contactEmail: string;
  supportPhone: string;
  companyAddress: string;
  country: string;
  
  // Product Types
  sellsPhysicalProducts: boolean;
  sellsDigitalProducts: boolean;
  sellsServices: boolean;
  sellsSubscriptions: boolean;
  sellsCourses: boolean;
  sellsSoftware: boolean;
  sellsGiftCards: boolean;
  
  // Refund Periods
  physicalRefundDays: string;
  digitalRefundDays: string;
  serviceRefundDays: string;
  subscriptionRefundDays: string;
  
  // Physical Product Returns
  requiresReceipt: boolean;
  requiresOriginalPackaging: boolean;
  requiresUnusedCondition: boolean;
  requiresAllAccessories: boolean;
  requiresTags: boolean;
  
  // Return Shipping
  coversReturnShipping: boolean;
  providesReturnLabel: boolean;
  returnShippingDeduction: boolean;
  returnShippingAmount: string;
  
  // Restocking
  chargesRestockingFee: boolean;
  restockingFeePercent: string;
  restockingFeeConditions: string;
  
  // Refund Options
  offerFullRefund: boolean;
  offerPartialRefund: boolean;
  offerExchanges: boolean;
  offerStoreCredit: boolean;
  storeCreditExpires: boolean;
  storeCreditExpiryMonths: string;
  
  // Refund Methods
  refundOriginalMethod: boolean;
  refundCheckOption: boolean;
  refundProcessingDays: string;
  
  // Non-Refundable Items
  hasNonRefundableItems: boolean;
  nonRefundableSaleItems: boolean;
  nonRefundablePersonalized: boolean;
  nonRefundablePerishable: boolean;
  nonRefundableHygiene: boolean;
  nonRefundableDownloaded: boolean;
  nonRefundableGiftCards: boolean;
  nonRefundableHazardous: boolean;
  otherNonRefundable: string;
  
  // Subscriptions
  allowSubscriptionCancel: boolean;
  subscriptionCancelNotice: string;
  proratedRefunds: boolean;
  annualRefundWindow: string;
  
  // Digital Products
  digitalRefundBeforeDownload: boolean;
  digitalRefundTechnicalIssues: boolean;
  digitalRefundMisrepresentation: boolean;
  
  // Services
  serviceCancellationPolicy: string;
  servicePartialRefund: boolean;
  serviceReschedule: boolean;
  
  // Exceptions
  defectiveItemsFullRefund: boolean;
  wrongItemShipped: boolean;
  damagedInShipping: boolean;
  latestyleRefund: boolean;
  
  // Dispute Resolution
  hasDisputeProcess: boolean;
  offerMediation: boolean;
  
  // Legal
  euConsumerRights: boolean;
  australianConsumerLaw: boolean;
  canadianRights: boolean;
  
  // Additional
  customPolicies: string;
}

const defaultFormData: FormData = {
  companyName: "",
  websiteUrl: "",
  contactEmail: "",
  supportPhone: "",
  companyAddress: "",
  country: "United States",
  
  sellsPhysicalProducts: true,
  sellsDigitalProducts: false,
  sellsServices: false,
  sellsSubscriptions: false,
  sellsCourses: false,
  sellsSoftware: false,
  sellsGiftCards: false,
  
  physicalRefundDays: "30",
  digitalRefundDays: "14",
  serviceRefundDays: "7",
  subscriptionRefundDays: "14",
  
  requiresReceipt: true,
  requiresOriginalPackaging: true,
  requiresUnusedCondition: true,
  requiresAllAccessories: true,
  requiresTags: false,
  
  coversReturnShipping: false,
  providesReturnLabel: false,
  returnShippingDeduction: true,
  returnShippingAmount: "7.99",
  
  chargesRestockingFee: false,
  restockingFeePercent: "15",
  restockingFeeConditions: "opened electronics",
  
  offerFullRefund: true,
  offerPartialRefund: true,
  offerExchanges: true,
  offerStoreCredit: true,
  storeCreditExpires: false,
  storeCreditExpiryMonths: "12",
  
  refundOriginalMethod: true,
  refundCheckOption: false,
  refundProcessingDays: "5-10",
  
  hasNonRefundableItems: true,
  nonRefundableSaleItems: true,
  nonRefundablePersonalized: true,
  nonRefundablePerishable: true,
  nonRefundableHygiene: true,
  nonRefundableDownloaded: true,
  nonRefundableGiftCards: true,
  nonRefundableHazardous: false,
  otherNonRefundable: "",
  
  allowSubscriptionCancel: true,
  subscriptionCancelNotice: "anytime",
  proratedRefunds: false,
  annualRefundWindow: "30",
  
  digitalRefundBeforeDownload: true,
  digitalRefundTechnicalIssues: true,
  digitalRefundMisrepresentation: true,
  
  serviceCancellationPolicy: "48hours",
  servicePartialRefund: true,
  serviceReschedule: true,
  
  defectiveItemsFullRefund: true,
  wrongItemShipped: true,
  damagedInShipping: true,
  latestyleRefund: true,
  
  hasDisputeProcess: true,
  offerMediation: false,
  
  euConsumerRights: true,
  australianConsumerLaw: false,
  canadianRights: false,
  
  customPolicies: "",
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

    let policy = `# Refund, Return & Cancellation Policy

**Effective Date: ${today}**
**Last Updated: ${today}**

---

## 1. Introduction

Thank you for shopping at ${formData.companyName || "[Company Name]"} ("Company," "we," "us," or "our"). We value your business and want you to be completely satisfied with your purchase.

This Refund, Return & Cancellation Policy ("Policy") describes our guidelines and procedures for returns, refunds, exchanges, and cancellations. By making a purchase from ${formData.websiteUrl || "[Website URL]"}, you agree to be bound by this Policy.

Please read this Policy carefully before making a purchase. If you have any questions, please contact us at ${formData.contactEmail || "[Contact Email]"}.

---

## 2. Definitions

For the purposes of this Policy:

- **"Products"** refers to physical goods, digital products, services, subscriptions, or any other items offered for sale on our Website.
- **"Order"** refers to a request to purchase Products from us.
- **"Return"** refers to the process of sending back a Product for a refund, exchange, or store credit.
- **"Refund"** refers to the reimbursement of the purchase price paid by you.
- **"Exchange"** refers to replacing a returned Product with a different Product.
- **"Store Credit"** refers to credit applied to your account for future purchases.

---

## 3. General Return Policy Overview

### 3.1 Our Commitment

We want you to be happy with your purchase. If for any reason you are not completely satisfied, we are here to help.

### 3.2 Return Windows

`;

    if (formData.sellsPhysicalProducts) {
      policy += `- **Physical Products:** ${formData.physicalRefundDays} days from the date of delivery\n`;
    }
    if (formData.sellsDigitalProducts || formData.sellsSoftware || formData.sellsCourses) {
      policy += `- **Digital Products:** ${formData.digitalRefundDays} days from the date of purchase\n`;
    }
    if (formData.sellsServices) {
      policy += `- **Services:** ${formData.serviceRefundDays} days from the date of service\n`;
    }
    if (formData.sellsSubscriptions) {
      policy += `- **Subscriptions:** ${formData.subscriptionRefundDays} days from the start of the billing period\n`;
    }

    policy += `
### 3.3 How to Initiate a Return or Refund

To start a return or request a refund:

1. **Contact Us:** Email us at ${formData.contactEmail || "[Contact Email]"}${formData.supportPhone ? ` or call ${formData.supportPhone}` : ""}.
2. **Provide Order Information:** Include your order number, date of purchase, and the reason for your return/refund request.
3. **Await Confirmation:** Our customer service team will review your request and respond within 2-3 business days with instructions.
4. **Follow Instructions:** If approved, follow the provided instructions for returning items or completing the refund process.

---

`;

    // Physical Products Section
    if (formData.sellsPhysicalProducts) {
      policy += `## 4. Physical Product Returns

### 4.1 Return Eligibility

To be eligible for a return, physical products must meet the following conditions:

`;
      if (formData.requiresUnusedCondition) {
        policy += `- **Unused and Undamaged:** The item must be unused, unworn, unwashed, and in the same condition as when you received it.\n`;
      }
      if (formData.requiresOriginalPackaging) {
        policy += `- **Original Packaging:** The item must be returned in its original packaging, including all protective materials.\n`;
      }
      if (formData.requiresAllAccessories) {
        policy += `- **All Accessories Included:** All accessories, manuals, documentation, and bonus items must be included.\n`;
      }
      if (formData.requiresTags) {
        policy += `- **Tags Attached:** All original tags and labels must still be attached.\n`;
      }
      if (formData.requiresReceipt) {
        policy += `- **Proof of Purchase:** You must provide proof of purchase (order confirmation email, receipt, or order number).\n`;
      }
      policy += `- **Within Return Window:** The return must be initiated within ${formData.physicalRefundDays} days of delivery.\n`;

      policy += `
### 4.2 Return Process

1. **Request Authorization:** Contact us to request a Return Merchandise Authorization (RMA) number.
2. **Pack Securely:** Pack the item securely in its original packaging (if available) or in a sturdy box with adequate padding.
3. **Include Documentation:** Include a copy of your receipt or order confirmation and the RMA number inside the package.
4. **Ship the Return:** Ship the package to the return address provided in your authorization email.
5. **Tracking:** We recommend using a trackable shipping method and purchasing shipping insurance for returns over $75.

### 4.3 Return Shipping

`;

      if (formData.coversReturnShipping) {
        policy += `We cover return shipping costs for:
- Defective or damaged items
- Items shipped in error (wrong item sent)
- Items that do not match the description

${formData.providesReturnLabel ? "We will provide a prepaid return shipping label for qualifying returns." : "Submit your shipping receipt for reimbursement for qualifying returns."}

For returns that do not qualify for free return shipping (such as change of mind, sizing issues, or preference), you are responsible for return shipping costs.

`;
      } else {
        policy += `Return shipping costs are the responsibility of the customer, except in cases where:
- We shipped a defective or damaged item
- We shipped the wrong item
- The item does not match its description

${formData.returnShippingDeduction ? `If we provide a prepaid return label, the cost of return shipping ($${formData.returnShippingAmount}) will be deducted from your refund.` : ""}

`;
      }

      if (formData.chargesRestockingFee) {
        policy += `### 4.4 Restocking Fees

A restocking fee of ${formData.restockingFeePercent}% may be applied to certain returned items, including:
${formData.restockingFeeConditions ? formData.restockingFeeConditions.split(',').map(item => `- ${item.trim()}`).join('\n') : "- Opened electronics or software\n- Items returned without original packaging\n- Items showing signs of use"}

The restocking fee covers the cost of inspecting, cleaning, repackaging, and restocking merchandise. This fee will be deducted from your refund amount.

The restocking fee does not apply to:
- Defective or damaged items
- Items shipped in error
- Items covered under warranty

`;
      }

      policy += `### 4.${formData.chargesRestockingFee ? "5" : "4"} Condition Upon Return

We inspect all returned items upon receipt. Items that do not meet our return conditions may be:
- Returned to you at your expense
- Subject to a reduced refund based on condition
- Subject to additional fees for cleaning, repair, or repackaging

We reserve the right to refuse a return or issue a partial refund if the item shows signs of use, damage, missing parts, or does not meet our return conditions.

`;
    }

    // Digital Products Section
    if (formData.sellsDigitalProducts || formData.sellsSoftware || formData.sellsCourses) {
      const digitalSectionNum = formData.sellsPhysicalProducts ? 5 : 4;
      policy += `## ${digitalSectionNum}. Digital Products, Software & Downloads

### ${digitalSectionNum}.1 General Digital Product Policy

Due to the nature of digital products, returns and refunds are handled differently than physical products. Once a digital product has been delivered, accessed, or downloaded, it generally cannot be "returned" in the traditional sense.

### ${digitalSectionNum}.2 Refund Eligibility for Digital Products

We may issue a refund for digital products in the following circumstances:

`;
      if (formData.digitalRefundBeforeDownload) {
        policy += `- **Before Download/Access:** If you request a refund before downloading or accessing the product.\n`;
      }
      if (formData.digitalRefundTechnicalIssues) {
        policy += `- **Technical Issues:** If you experience technical issues that prevent you from using the product, and we are unable to resolve them.\n`;
      }
      if (formData.digitalRefundMisrepresentation) {
        policy += `- **Significant Misrepresentation:** If the product is significantly different from its description or does not function as advertised.\n`;
      }

      policy += `
### ${digitalSectionNum}.3 Non-Refundable Digital Products

The following digital products are generally non-refundable once accessed:
- Downloaded software, games, or applications
- Streaming content that has been played
- E-books or digital publications that have been opened
- Online courses where modules have been accessed
- Digital gift cards or codes that have been revealed or redeemed

### ${digitalSectionNum}.4 Software Licenses

For software products:
- License keys cannot be returned once revealed or activated
- If you experience technical difficulties, contact our support team for assistance before requesting a refund
- Refunds for software are at our discretion and will only be granted in exceptional circumstances

### ${digitalSectionNum}.5 How to Request a Digital Product Refund

To request a refund for a digital product:
1. Contact us at ${formData.contactEmail || "[Contact Email]"} within ${formData.digitalRefundDays} days of purchase
2. Include your order number and a detailed explanation of the issue
3. Our team will review your request and respond within 3-5 business days

`;
    }

    // Services Section
    if (formData.sellsServices) {
      const serviceSectionNum = (formData.sellsPhysicalProducts ? 1 : 0) + (formData.sellsDigitalProducts || formData.sellsSoftware || formData.sellsCourses ? 1 : 0) + 4;
      policy += `## ${serviceSectionNum}. Services

### ${serviceSectionNum}.1 Service Cancellation Policy

`;

      if (formData.serviceCancellationPolicy === "48hours") {
        policy += `You may cancel a scheduled service with the following terms:

| Cancellation Timeframe | Refund/Credit |
|------------------------|---------------|
| **More than 48 hours before** | Full refund |
| **24-48 hours before** | 50% refund or full credit for rescheduling |
| **Less than 24 hours before** | No refund (credit for rescheduling may be offered) |
| **No-show** | No refund or credit |

`;
      } else if (formData.serviceCancellationPolicy === "24hours") {
        policy += `You may cancel a scheduled service with the following terms:

| Cancellation Timeframe | Refund/Credit |
|------------------------|---------------|
| **More than 24 hours before** | Full refund |
| **12-24 hours before** | 50% refund |
| **Less than 12 hours before** | No refund |
| **No-show** | No refund |

`;
      } else {
        policy += `Services may be cancelled at any time before the service begins. Cancellation fees may apply based on how close to the service date you cancel. Please contact us for specific terms.

`;
      }

      if (formData.serviceReschedule) {
        policy += `### ${serviceSectionNum}.2 Rescheduling

We understand that plans change. You may reschedule a service appointment:
- At no charge if done more than 24 hours in advance
- Subject to availability
- A maximum of two reschedules per booking may be permitted

`;
      }

      if (formData.servicePartialRefund) {
        policy += `### ${serviceSectionNum}.${formData.serviceReschedule ? "3" : "2"} Unsatisfactory Service

If you are not satisfied with a service we provided:
1. Contact us within ${formData.serviceRefundDays} days of the service date
2. Describe the issue and how we can make it right
3. We will work with you to resolve the issue, which may include:
   - Re-performing the service at no additional cost
   - Providing a partial refund
   - Providing a full refund in exceptional circumstances

We reserve the right to determine the appropriate remedy based on the specific circumstances.

`;
      }
    }

    // Subscriptions Section
    if (formData.sellsSubscriptions) {
      const subSectionNum = (formData.sellsPhysicalProducts ? 1 : 0) + 
                            (formData.sellsDigitalProducts || formData.sellsSoftware || formData.sellsCourses ? 1 : 0) + 
                            (formData.sellsServices ? 1 : 0) + 4;
      policy += `## ${subSectionNum}. Subscriptions

### ${subSectionNum}.1 Subscription Cancellation

`;

      if (formData.allowSubscriptionCancel) {
        if (formData.subscriptionCancelNotice === "anytime") {
          policy += `You may cancel your subscription at any time. To cancel:
- Log into your account and go to Subscription Settings, or
- Contact us at ${formData.contactEmail || "[Contact Email]"}

Your cancellation will take effect at the end of your current billing period. You will continue to have access to the service until your billing period ends.

`;
        } else {
          policy += `Subscriptions may be cancelled with ${formData.subscriptionCancelNotice} notice before your next billing date. Cancellations received after this window will take effect in the following billing period.

`;
        }
      }

      policy += `### ${subSectionNum}.2 Subscription Refunds

**Monthly Subscriptions:**
`;
      if (formData.proratedRefunds) {
        policy += `- You may be eligible for a prorated refund for the unused portion of your subscription
- Refunds are calculated based on the number of days remaining in your billing period
`;
      } else {
        policy += `- Monthly subscriptions are non-refundable
- Cancellations take effect at the end of the current billing period
- You will retain access until your subscription period ends
`;
      }

      policy += `
**Annual Subscriptions:**
- You may request a refund within ${formData.annualRefundWindow} days of your annual renewal
- After ${formData.annualRefundWindow} days, annual subscriptions are non-refundable
${formData.proratedRefunds ? "- If eligible, a prorated refund may be issued minus any discounts received for choosing annual billing" : "- No prorated refunds are available after the refund window"}

**Free Trials:**
- If you cancel before your free trial ends, you will not be charged
- If you cancel after your trial converts to a paid subscription, standard refund policies apply

### ${subSectionNum}.3 Automatic Renewal

Subscriptions automatically renew at the end of each billing period unless cancelled. You will receive a reminder email before each renewal. It is your responsibility to cancel before the renewal date if you do not wish to continue.

`;
    }

    // Non-Refundable Items Section
    if (formData.hasNonRefundableItems) {
      const nonRefundSectionNum = (formData.sellsPhysicalProducts ? 1 : 0) + 
                                   (formData.sellsDigitalProducts || formData.sellsSoftware || formData.sellsCourses ? 1 : 0) + 
                                   (formData.sellsServices ? 1 : 0) + 
                                   (formData.sellsSubscriptions ? 1 : 0) + 4;
      
      policy += `## ${nonRefundSectionNum}. Non-Refundable Items

The following items are not eligible for return or refund:

`;
      if (formData.nonRefundableSaleItems) {
        policy += `- **Sale/Clearance Items:** Items purchased at a discounted or clearance price (unless defective)\n`;
      }
      if (formData.nonRefundablePersonalized) {
        policy += `- **Personalized/Custom Items:** Items that have been personalized, customized, or made to order\n`;
      }
      if (formData.nonRefundablePerishable) {
        policy += `- **Perishable Goods:** Food, flowers, plants, and other perishable items\n`;
      }
      if (formData.nonRefundableHygiene) {
        policy += `- **Hygiene Products:** Intimate apparel, swimwear, cosmetics, and personal care items (for health and hygiene reasons)\n`;
      }
      if (formData.nonRefundableDownloaded) {
        policy += `- **Downloaded Digital Products:** Digital content that has been downloaded or accessed\n`;
      }
      if (formData.nonRefundableGiftCards || formData.sellsGiftCards) {
        policy += `- **Gift Cards:** Gift cards and store credit vouchers\n`;
      }
      if (formData.nonRefundableHazardous) {
        policy += `- **Hazardous Materials:** Items that are flammable or contain hazardous materials\n`;
      }
      if (formData.otherNonRefundable) {
        policy += formData.otherNonRefundable.split(',').map(item => `- ${item.trim()}`).join('\n') + '\n';
      }

      policy += `
We reserve the right to refuse returns on items that do not meet our return criteria or are deemed non-returnable.

`;
    }

    // Exchanges Section
    if (formData.offerExchanges) {
      const exchangeSectionNum = (formData.sellsPhysicalProducts ? 1 : 0) + 
                                  (formData.sellsDigitalProducts || formData.sellsSoftware || formData.sellsCourses ? 1 : 0) + 
                                  (formData.sellsServices ? 1 : 0) + 
                                  (formData.sellsSubscriptions ? 1 : 0) + 
                                  (formData.hasNonRefundableItems ? 1 : 0) + 4;
      
      policy += `## ${exchangeSectionNum}. Exchanges

### ${exchangeSectionNum}.1 Exchange Policy

We are happy to exchange eligible items for a different size, color, or style, subject to availability.

### ${exchangeSectionNum}.2 How to Request an Exchange

1. Contact us at ${formData.contactEmail || "[Contact Email]"} with your order number
2. Specify the item you wish to exchange and your preferred replacement
3. Wait for exchange authorization and instructions
4. Ship the original item following return procedures
5. We will ship your replacement item upon receiving and inspecting the returned item

### ${exchangeSectionNum}.3 Exchange Terms

- **Same Value:** If the replacement item is the same price, no additional payment is required
- **Higher Value:** If the replacement costs more, you will be charged the difference
- **Lower Value:** If the replacement costs less, we will refund the difference
- **Availability:** Exchanges are subject to product availability. If the requested item is unavailable, we will offer alternatives or a refund
- **Shipping:** ${formData.coversReturnShipping ? "We cover exchange shipping both ways for eligible items" : "You are responsible for return shipping; we cover shipping for the replacement item"}

`;
    }

    // Store Credit Section
    if (formData.offerStoreCredit) {
      const creditSectionNum = (formData.sellsPhysicalProducts ? 1 : 0) + 
                                (formData.sellsDigitalProducts || formData.sellsSoftware || formData.sellsCourses ? 1 : 0) + 
                                (formData.sellsServices ? 1 : 0) + 
                                (formData.sellsSubscriptions ? 1 : 0) + 
                                (formData.hasNonRefundableItems ? 1 : 0) + 
                                (formData.offerExchanges ? 1 : 0) + 4;
      
      policy += `## ${creditSectionNum}. Store Credit

### ${creditSectionNum}.1 Store Credit Option

In lieu of a refund to your original payment method, you may choose to receive store credit. Store credit may also be issued for items that do not qualify for a full refund.

### ${creditSectionNum}.2 Store Credit Terms

- Store credit is applied to your account and can be used for future purchases
- Store credit can be combined with other payment methods
- Store credit is non-transferable and cannot be exchanged for cash
${formData.storeCreditExpires ? `- Store credit expires ${formData.storeCreditExpiryMonths} months from the date of issue` : "- Store credit does not expire"}
- Store credit cannot be applied retroactively to previous orders

`;
    }

    // Refund Processing Section
    const refundSectionNum = (formData.sellsPhysicalProducts ? 1 : 0) + 
                              (formData.sellsDigitalProducts || formData.sellsSoftware || formData.sellsCourses ? 1 : 0) + 
                              (formData.sellsServices ? 1 : 0) + 
                              (formData.sellsSubscriptions ? 1 : 0) + 
                              (formData.hasNonRefundableItems ? 1 : 0) + 
                              (formData.offerExchanges ? 1 : 0) + 
                              (formData.offerStoreCredit ? 1 : 0) + 4;

    policy += `## ${refundSectionNum}. Refund Processing

### ${refundSectionNum}.1 Inspection and Approval

Once we receive your returned item, we will inspect it and process your return within 3-5 business days. You will receive an email notification once your return has been processed.

If approved, your refund will be processed according to your chosen refund method.

If your return is denied, we will contact you with the reason and your options.

### ${refundSectionNum}.2 Refund Methods

`;

    if (formData.refundOriginalMethod) {
      policy += `**Original Payment Method:**
Your refund will be credited to the original payment method used for the purchase:
- **Credit/Debit Card:** ${formData.refundProcessingDays} business days (may take additional time to appear on your statement)
- **PayPal:** 3-5 business days
- **Bank Transfer:** 5-7 business days
- **Other Payment Methods:** Processing times vary

`;
    }

    if (formData.refundCheckOption) {
      policy += `**Check:**
In some cases, refunds may be issued by check. Checks are mailed within 7-10 business days after approval.

`;
    }

    if (formData.offerStoreCredit) {
      policy += `**Store Credit:**
If you choose store credit, it will be applied to your account immediately after approval.

`;
    }

    policy += `### ${refundSectionNum}.3 Partial Refunds

`;

    if (formData.offerPartialRefund) {
      policy += `We may issue partial refunds in the following situations:
- Items returned outside the standard return window (at our discretion)
- Items that are not in their original condition, damaged, or missing parts not due to our error
- Items that show signs of use beyond what is necessary to evaluate the product
- Items returned without original packaging
${formData.chargesRestockingFee ? `- Items subject to restocking fees` : ""}

The partial refund amount will be determined based on the condition of the returned item.

`;
    } else {
      policy += `We generally do not issue partial refunds. Items must be returned in accordance with our return conditions to receive a full refund.

`;
    }

    policy += `### ${refundSectionNum}.4 Late or Missing Refunds

If you have not received your refund within the expected timeframe:

1. **Check Your Account:** First, re-check your bank account or credit card statement.
2. **Contact Your Bank:** It may take some time before your refund is officially posted. Contact your bank or credit card company, as they may have processing delays.
3. **Contact Us:** If you have done both of these and still have not received your refund, please contact us at ${formData.contactEmail || "[Contact Email]"} with your order number and refund details.

`;

    // Defective/Damaged Items Section
    if (formData.defectiveItemsFullRefund || formData.wrongItemShipped || formData.damagedInShipping) {
      const defectSectionNum = refundSectionNum + 1;
      policy += `## ${defectSectionNum}. Defective, Damaged, or Incorrect Items

### ${defectSectionNum}.1 Defective or Faulty Products

`;
      if (formData.defectiveItemsFullRefund) {
        policy += `If you receive a defective or faulty product, we will:
- Provide a full refund, or
- Send a replacement at no additional cost
- Cover all return shipping costs

To report a defective item:
1. Contact us within 14 days of receiving the item
2. Provide photos of the defect if possible
3. Include your order number and a description of the issue

`;
      }

      if (formData.damagedInShipping) {
        policy += `### ${defectSectionNum}.2 Items Damaged in Shipping

If your item arrives damaged due to shipping:
1. Document the damage with photos before discarding any packaging
2. Contact us within 48 hours of delivery
3. We will file a claim with the carrier and provide you with a full refund or replacement

Please retain all original packaging until the claim is resolved.

`;
      }

      if (formData.wrongItemShipped) {
        policy += `### ${defectSectionNum}.${formData.damagedInShipping ? "3" : "2"} Wrong Item Shipped

If you receive the wrong item:
1. Contact us immediately
2. Do not open or use the incorrect item if possible
3. We will send you a prepaid return label and ship the correct item as quickly as possible

`;
      }
    }

    // Dispute Resolution
    if (formData.hasDisputeProcess) {
      const disputeSectionNum = refundSectionNum + (formData.defectiveItemsFullRefund || formData.wrongItemShipped || formData.damagedInShipping ? 2 : 1);
      policy += `## ${disputeSectionNum}. Dispute Resolution

### ${disputeSectionNum}.1 Addressing Concerns

If you are unsatisfied with our handling of your return or refund request, please contact our customer service team. We are committed to resolving issues fairly and promptly.

### ${disputeSectionNum}.2 Escalation Process

If our customer service team cannot resolve your concern:
1. Request to speak with a supervisor or manager
2. Provide all relevant order details and documentation
3. We will review your case and respond within 5 business days

${formData.offerMediation ? `### ${disputeSectionNum}.3 Mediation

If we are unable to resolve the dispute internally, we may agree to participate in mediation or alternative dispute resolution. Any costs associated with mediation will be shared equally between you and ${formData.companyName || "[Company Name]"}.

` : ""}`;
    }

    // Consumer Rights Section
    if (formData.euConsumerRights || formData.australianConsumerLaw || formData.canadianRights) {
      const consumerSectionNum = refundSectionNum + 
                                  (formData.defectiveItemsFullRefund || formData.wrongItemShipped || formData.damagedInShipping ? 1 : 0) + 
                                  (formData.hasDisputeProcess ? 1 : 0) + 1;
      
      policy += `## ${consumerSectionNum}. Consumer Rights

This Policy does not affect your statutory rights under applicable consumer protection laws.

`;
      if (formData.euConsumerRights) {
        policy += `### ${consumerSectionNum}.1 EU Consumer Rights (14-Day Withdrawal)

If you are a consumer located in the European Union or United Kingdom, you have the right to withdraw from a purchase within 14 days without giving any reason, in accordance with the EU Consumer Rights Directive.

**Right of Withdrawal:**
- The withdrawal period expires 14 days after the day on which you acquire, or a third party other than the carrier and indicated by you acquires, physical possession of the goods.
- To exercise the right of withdrawal, you must inform us of your decision by a clear statement (e.g., email, letter).
- You may use the model withdrawal form, but it is not obligatory.

**Effects of Withdrawal:**
- If you withdraw from the contract, we shall reimburse all payments received from you, including the costs of delivery (with the exception of supplementary costs resulting from your choice of a type of delivery other than the least expensive type of standard delivery offered by us), without undue delay and in any event not later than 14 days from the day on which we are informed about your decision to withdraw.
- We will carry out the reimbursement using the same means of payment as you used for the initial transaction.
- We may withhold reimbursement until we have received the goods back or you have supplied evidence of having sent back the goods, whichever is the earliest.

**Exceptions:**
The right of withdrawal does not apply to:
- Goods made to your specifications or clearly personalized
- Sealed goods which were unsealed after delivery and are not suitable for return due to health protection or hygiene reasons
- Sealed audio, video recordings or computer software which were unsealed after delivery
- Goods which are, after delivery, inseparably mixed with other items
- Digital content not supplied on a tangible medium if performance has begun with your prior express consent and acknowledgement that you thereby lose your right of withdrawal

`;
      }

      if (formData.australianConsumerLaw) {
        policy += `### ${consumerSectionNum}.${formData.euConsumerRights ? "2" : "1"} Australian Consumer Law

If you are a consumer located in Australia, our goods and services come with guarantees that cannot be excluded under the Australian Consumer Law. For major failures with the service, you are entitled:
- To cancel your service contract with us; and
- To a refund for the unused portion, or to compensation for its reduced value.

You are also entitled to choose a refund or replacement for major failures with goods. If a failure with the goods or a service does not amount to a major failure, you are entitled to have the failure rectified in a reasonable time. If this is not done, you are entitled to a refund for the goods and to cancel the contract for the service and obtain a refund of any unused portion.

`;
      }

      if (formData.canadianRights) {
        policy += `### ${consumerSectionNum}.${(formData.euConsumerRights ? 1 : 0) + (formData.australianConsumerLaw ? 1 : 0) + 1} Canadian Consumer Rights

Consumers in Canada may have additional rights under provincial consumer protection legislation. This Policy does not limit or exclude any rights you may have under applicable law.

`;
      }
    }

    // Contact Section
    const contactSectionNum = refundSectionNum + 
                               (formData.defectiveItemsFullRefund || formData.wrongItemShipped || formData.damagedInShipping ? 1 : 0) + 
                               (formData.hasDisputeProcess ? 1 : 0) + 
                               (formData.euConsumerRights || formData.australianConsumerLaw || formData.canadianRights ? 1 : 0) + 1;

    // Custom Policies
    if (formData.customPolicies && formData.customPolicies.trim()) {
      policy += `## ${contactSectionNum}. Additional Policies

${formData.customPolicies}

`;
    }

    const finalContactNum = formData.customPolicies && formData.customPolicies.trim() ? contactSectionNum + 1 : contactSectionNum;

    policy += `## ${finalContactNum}. Contact Us

If you have any questions about this Refund, Return & Cancellation Policy, please contact us:

**${formData.companyName || "[Company Name]"}**
${formData.companyAddress ? `Address: ${formData.companyAddress}\n` : ""}Email: ${formData.contactEmail || "[Contact Email]"}
${formData.supportPhone ? `Phone: ${formData.supportPhone}\n` : ""}Website: ${formData.websiteUrl || "[Website URL]"}

**Customer Service Hours:**
Monday - Friday: 9:00 AM - 5:00 PM ${formData.country === "United States" ? "EST" : "local time"}

We aim to respond to all inquiries within 24-48 business hours.

---

## ${finalContactNum + 1}. Changes to This Policy

We reserve the right to update or modify this Refund, Return & Cancellation Policy at any time. Changes will be effective immediately upon posting to our Website. We will update the "Last Updated" date at the top of this Policy.

We encourage you to review this Policy periodically for any changes. Your continued use of our Website and purchase of our products after any changes constitutes your acceptance of the updated Policy.

---

*This Refund Policy was generated using TermsZipp. While this document covers common refund policy requirements, we strongly recommend having it reviewed by a qualified legal professional to ensure compliance with all applicable laws and regulations for your specific business and jurisdiction.*
`;

    setGeneratedPolicy(policy);
    setStep(5);
  };

  const totalSteps = 5;

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
              <RefreshCw className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold">Refund Policy Generator</h1>
              <p className="text-muted-foreground">Create a comprehensive return, refund & cancellation policy</p>
            </div>
          </div>
        </div>
      </div>

      {/* Progress Steps */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-center gap-2 overflow-x-auto">
            {[1, 2, 3, 4, 5].map((s) => (
              <div key={s} className="flex items-center">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium shrink-0 ${
                  step >= s ? 'brand-gradient text-white' : 'bg-slate-200 text-slate-500'
                }`}>
                  {s}
                </div>
                <span className={`ml-2 text-sm whitespace-nowrap ${step >= s ? 'text-foreground' : 'text-muted-foreground'}`}>
                  {s === 1 ? 'Business' : s === 2 ? 'Products' : s === 3 ? 'Returns' : s === 4 ? 'Exceptions' : 'Generate'}
                </span>
                {s < totalSteps && <div className="w-8 h-0.5 bg-slate-200 mx-2" />}
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
                  <Label htmlFor="companyName">Company / Store Name *</Label>
                  <div className="relative mt-1">
                    <Building className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="companyName"
                      value={formData.companyName}
                      onChange={(e) => updateForm('companyName', e.target.value)}
                      placeholder="Acme Store"
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
                  <Label htmlFor="contactEmail">Support Email *</Label>
                  <div className="relative mt-1">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="contactEmail"
                      type="email"
                      value={formData.contactEmail}
                      onChange={(e) => updateForm('contactEmail', e.target.value)}
                      placeholder="support@example.com"
                      className="pl-10"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="supportPhone">Support Phone (optional)</Label>
                    <Input
                      id="supportPhone"
                      value={formData.supportPhone}
                      onChange={(e) => updateForm('supportPhone', e.target.value)}
                      placeholder="+1 (555) 123-4567"
                      className="mt-1"
                    />
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

                <div>
                  <Label htmlFor="companyAddress">Business Address (optional)</Label>
                  <Input
                    id="companyAddress"
                    value={formData.companyAddress}
                    onChange={(e) => updateForm('companyAddress', e.target.value)}
                    placeholder="123 Main St, City, State, ZIP"
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

          {/* Step 2: Product Types */}
          {step === 2 && (
            <Card className="p-6">
              <h2 className="text-lg font-semibold mb-6">What Do You Sell?</h2>
              
              <div className="space-y-3 mb-6">
                {[
                  { key: 'sellsPhysicalProducts', label: 'Physical Products', desc: 'Tangible goods that are shipped' },
                  { key: 'sellsDigitalProducts', label: 'Digital Products', desc: 'Downloads, e-books, digital art' },
                  { key: 'sellsSoftware', label: 'Software / Apps', desc: 'Software licenses, SaaS products' },
                  { key: 'sellsCourses', label: 'Online Courses', desc: 'Educational content, video courses' },
                  { key: 'sellsServices', label: 'Services', desc: 'Consulting, appointments, freelance work' },
                  { key: 'sellsSubscriptions', label: 'Subscriptions', desc: 'Recurring billing products/services' },
                  { key: 'sellsGiftCards', label: 'Gift Cards', desc: 'Gift certificates or store credit cards' },
                ].map(({ key, label, desc }) => (
                  <div key={key} className="flex items-start space-x-2">
                    <Checkbox
                      id={key}
                      checked={formData[key as keyof FormData] as boolean}
                      onCheckedChange={(checked) => updateForm(key as keyof FormData, checked as boolean)}
                      className="mt-0.5"
                    />
                    <div>
                      <Label htmlFor={key} className="text-sm font-medium">{label}</Label>
                      <p className="text-xs text-muted-foreground">{desc}</p>
                    </div>
                  </div>
                ))}
              </div>

              <h3 className="text-md font-medium mb-4">Refund Periods</h3>
              <div className="grid grid-cols-2 gap-4">
                {formData.sellsPhysicalProducts && (
                  <div>
                    <Label>Physical Products (days)</Label>
                    <Select value={formData.physicalRefundDays} onValueChange={(v) => updateForm('physicalRefundDays', v)}>
                      <SelectTrigger className="mt-1">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="7">7 days</SelectItem>
                        <SelectItem value="14">14 days</SelectItem>
                        <SelectItem value="30">30 days</SelectItem>
                        <SelectItem value="60">60 days</SelectItem>
                        <SelectItem value="90">90 days</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                )}
                {(formData.sellsDigitalProducts || formData.sellsSoftware || formData.sellsCourses) && (
                  <div>
                    <Label>Digital Products (days)</Label>
                    <Select value={formData.digitalRefundDays} onValueChange={(v) => updateForm('digitalRefundDays', v)}>
                      <SelectTrigger className="mt-1">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="0">No refunds</SelectItem>
                        <SelectItem value="7">7 days</SelectItem>
                        <SelectItem value="14">14 days</SelectItem>
                        <SelectItem value="30">30 days</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                )}
                {formData.sellsServices && (
                  <div>
                    <Label>Services (days after service)</Label>
                    <Select value={formData.serviceRefundDays} onValueChange={(v) => updateForm('serviceRefundDays', v)}>
                      <SelectTrigger className="mt-1">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="0">No refunds</SelectItem>
                        <SelectItem value="7">7 days</SelectItem>
                        <SelectItem value="14">14 days</SelectItem>
                        <SelectItem value="30">30 days</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                )}
                {formData.sellsSubscriptions && (
                  <div>
                    <Label>Subscriptions (days)</Label>
                    <Select value={formData.subscriptionRefundDays} onValueChange={(v) => updateForm('subscriptionRefundDays', v)}>
                      <SelectTrigger className="mt-1">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="0">No refunds</SelectItem>
                        <SelectItem value="7">7 days</SelectItem>
                        <SelectItem value="14">14 days</SelectItem>
                        <SelectItem value="30">30 days</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                )}
              </div>

              <div className="flex justify-between mt-6">
                <Button variant="outline" onClick={() => setStep(1)}>
                  <ArrowLeft className="mr-2 h-4 w-4" /> Back
                </Button>
                <Button onClick={() => setStep(3)} className="btn-gradient">
                  Next Step <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </Card>
          )}

          {/* Step 3: Return Policies */}
          {step === 3 && (
            <Card className="p-6">
              <h2 className="text-lg font-semibold mb-6">Return & Refund Options</h2>
              
              {formData.sellsPhysicalProducts && (
                <>
                  <h3 className="text-md font-medium mb-3">Physical Product Requirements</h3>
                  <div className="grid grid-cols-2 gap-3 mb-6">
                    {[
                      { key: 'requiresReceipt', label: 'Require proof of purchase' },
                      { key: 'requiresOriginalPackaging', label: 'Require original packaging' },
                      { key: 'requiresUnusedCondition', label: 'Must be unused/unworn' },
                      { key: 'requiresAllAccessories', label: 'All accessories included' },
                      { key: 'requiresTags', label: 'Tags must be attached' },
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

                  <h3 className="text-md font-medium mb-3">Return Shipping</h3>
                  <div className="space-y-3 mb-6">
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="coversReturnShipping"
                        checked={formData.coversReturnShipping}
                        onCheckedChange={(checked) => updateForm('coversReturnShipping', checked as boolean)}
                      />
                      <Label htmlFor="coversReturnShipping" className="text-sm font-normal">We cover return shipping costs</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="providesReturnLabel"
                        checked={formData.providesReturnLabel}
                        onCheckedChange={(checked) => updateForm('providesReturnLabel', checked as boolean)}
                      />
                      <Label htmlFor="providesReturnLabel" className="text-sm font-normal">We provide prepaid return labels</Label>
                    </div>
                    {!formData.coversReturnShipping && (
                      <div className="flex items-start space-x-2">
                        <Checkbox
                          id="returnShippingDeduction"
                          checked={formData.returnShippingDeduction}
                          onCheckedChange={(checked) => updateForm('returnShippingDeduction', checked as boolean)}
                          className="mt-0.5"
                        />
                        <div className="flex-1">
                          <Label htmlFor="returnShippingDeduction" className="text-sm font-normal">Deduct return shipping from refund</Label>
                          {formData.returnShippingDeduction && (
                            <div className="flex items-center gap-2 mt-2">
                              <span className="text-sm">$</span>
                              <Input
                                type="number"
                                value={formData.returnShippingAmount}
                                onChange={(e) => updateForm('returnShippingAmount', e.target.value)}
                                className="w-24"
                              />
                            </div>
                          )}
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="mb-6">
                    <div className="flex items-start space-x-2">
                      <Checkbox
                        id="chargesRestockingFee"
                        checked={formData.chargesRestockingFee}
                        onCheckedChange={(checked) => updateForm('chargesRestockingFee', checked as boolean)}
                        className="mt-0.5"
                      />
                      <div className="flex-1">
                        <Label htmlFor="chargesRestockingFee" className="text-sm font-medium">Charge restocking fee</Label>
                        {formData.chargesRestockingFee && (
                          <div className="flex items-center gap-2 mt-2">
                            <Input
                              type="number"
                              value={formData.restockingFeePercent}
                              onChange={(e) => updateForm('restockingFeePercent', e.target.value)}
                              className="w-20"
                            />
                            <span className="text-sm">%</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </>
              )}

              <h3 className="text-md font-medium mb-3">Refund Options Offered</h3>
              <div className="space-y-3 mb-6">
                {[
                  { key: 'offerFullRefund', label: 'Full refunds' },
                  { key: 'offerPartialRefund', label: 'Partial refunds (for items not meeting conditions)' },
                  { key: 'offerExchanges', label: 'Exchanges' },
                  { key: 'offerStoreCredit', label: 'Store credit' },
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
                {formData.offerStoreCredit && (
                  <div className="ml-6 flex items-center space-x-2">
                    <Checkbox
                      id="storeCreditExpires"
                      checked={formData.storeCreditExpires}
                      onCheckedChange={(checked) => updateForm('storeCreditExpires', checked as boolean)}
                    />
                    <Label htmlFor="storeCreditExpires" className="text-sm font-normal">Store credit expires after</Label>
                    <Input
                      type="number"
                      value={formData.storeCreditExpiryMonths}
                      onChange={(e) => updateForm('storeCreditExpiryMonths', e.target.value)}
                      className="w-16"
                      disabled={!formData.storeCreditExpires}
                    />
                    <span className="text-sm">months</span>
                  </div>
                )}
              </div>

              <h3 className="text-md font-medium mb-3">Refund Processing</h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Processing Time</Label>
                  <Select value={formData.refundProcessingDays} onValueChange={(v) => updateForm('refundProcessingDays', v)}>
                    <SelectTrigger className="mt-1">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="3-5">3-5 business days</SelectItem>
                      <SelectItem value="5-7">5-7 business days</SelectItem>
                      <SelectItem value="5-10">5-10 business days</SelectItem>
                      <SelectItem value="7-14">7-14 business days</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="flex justify-between mt-6">
                <Button variant="outline" onClick={() => setStep(2)}>
                  <ArrowLeft className="mr-2 h-4 w-4" /> Back
                </Button>
                <Button onClick={() => setStep(4)} className="btn-gradient">
                  Next Step <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </Card>
          )}

          {/* Step 4: Exceptions & Legal */}
          {step === 4 && (
            <Card className="p-6">
              <h2 className="text-lg font-semibold mb-6">Exceptions & Legal</h2>
              
              <h3 className="text-md font-medium mb-3">Non-Refundable Items</h3>
              <div className="flex items-center space-x-2 mb-3">
                <Checkbox
                  id="hasNonRefundableItems"
                  checked={formData.hasNonRefundableItems}
                  onCheckedChange={(checked) => updateForm('hasNonRefundableItems', checked as boolean)}
                />
                <Label htmlFor="hasNonRefundableItems" className="text-sm font-medium">Some items are non-refundable</Label>
              </div>
              
              {formData.hasNonRefundableItems && (
                <div className="grid grid-cols-2 gap-3 ml-6 mb-4">
                  {[
                    { key: 'nonRefundableSaleItems', label: 'Sale/clearance items' },
                    { key: 'nonRefundablePersonalized', label: 'Personalized/custom items' },
                    { key: 'nonRefundablePerishable', label: 'Perishable goods' },
                    { key: 'nonRefundableHygiene', label: 'Hygiene products' },
                    { key: 'nonRefundableDownloaded', label: 'Downloaded digital content' },
                    { key: 'nonRefundableGiftCards', label: 'Gift cards' },
                    { key: 'nonRefundableHazardous', label: 'Hazardous materials' },
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
              )}

              <h3 className="text-md font-medium mb-3 mt-6">We'll Always Refund</h3>
              <div className="space-y-3 mb-6">
                {[
                  { key: 'defectiveItemsFullRefund', label: 'Defective or faulty items' },
                  { key: 'wrongItemShipped', label: 'Wrong item shipped' },
                  { key: 'damagedInShipping', label: 'Items damaged in shipping' },
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

              <h3 className="text-md font-medium mb-3">Consumer Rights Compliance</h3>
              <div className="space-y-3 mb-6">
                {[
                  { key: 'euConsumerRights', label: 'EU Consumer Rights (14-day withdrawal)' },
                  { key: 'australianConsumerLaw', label: 'Australian Consumer Law' },
                  { key: 'canadianRights', label: 'Canadian Consumer Rights' },
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

              <div className="flex items-center space-x-2 mb-4">
                <Checkbox
                  id="hasDisputeProcess"
                  checked={formData.hasDisputeProcess}
                  onCheckedChange={(checked) => updateForm('hasDisputeProcess', checked as boolean)}
                />
                <Label htmlFor="hasDisputeProcess" className="text-sm font-normal">Include dispute resolution process</Label>
              </div>

              <div>
                <Label htmlFor="customPolicies">Additional Policies (optional)</Label>
                <Textarea
                  id="customPolicies"
                  value={formData.customPolicies}
                  onChange={(e) => updateForm('customPolicies', e.target.value)}
                  placeholder="Any additional refund policies specific to your business..."
                  className="mt-1"
                  rows={3}
                />
              </div>

              <div className="flex justify-between mt-6">
                <Button variant="outline" onClick={() => setStep(3)}>
                  <ArrowLeft className="mr-2 h-4 w-4" /> Back
                </Button>
                <Button onClick={generatePolicy} className="btn-gradient">
                  Generate Policy <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </Card>
          )}

          {/* Step 5: Generated Policy */}
          {step === 5 && (
            <div className="space-y-4">
              <DocumentPreviewGate 
                content={generatedPolicy} 
                documentType="Refund Policy"
                documentTypeSlug="refund-policy"
                formData={{ ...formData }}
              />

              {/* Disclaimer */}
              <Card className="p-4 bg-amber-50 border-amber-200">
                <div className="flex gap-3">
                  <AlertTriangle className="h-5 w-5 text-amber-600 shrink-0" />
                  <div className="text-sm text-amber-800">
                    <strong>Legal Disclaimer:</strong> This refund policy template covers common requirements but may not address all legal requirements for your specific business, industry, or jurisdiction. We strongly recommend having this document reviewed by a qualified attorney.
                  </div>
                </div>
              </Card>

              <div className="flex justify-between">
                <Button variant="outline" onClick={() => setStep(4)}>
                  <ArrowLeft className="mr-2 h-4 w-4" /> Edit Options
                </Button>
                <Button className="btn-gradient" asChild>
                  <Link href="/eula">
                    Generate EULA <ArrowRight className="ml-2 h-4 w-4" />
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
