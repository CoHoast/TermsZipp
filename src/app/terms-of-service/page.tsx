"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Textarea } from "@/components/ui/textarea";
import { 
  FileText, ArrowLeft, ArrowRight,
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
  companyAddress: string;
  country: string;
  stateProvince: string;
  
  // Business Model
  businessType: string;
  sellsPhysicalProducts: boolean;
  sellsDigitalProducts: boolean;
  sellsServices: boolean;
  hasSubscriptions: boolean;
  hasFreeTrials: boolean;
  hasFreeTier: boolean;
  
  // User Features
  hasUserAccounts: boolean;
  requiresAgeVerification: boolean;
  minimumAge: string;
  allowsUserContent: boolean;
  allowsComments: boolean;
  allowsFileUploads: boolean;
  hasForums: boolean;
  hasMessaging: boolean;
  
  // Payments & Billing
  acceptsPayments: boolean;
  paymentMethods: string;
  hasCancellationPolicy: boolean;
  hasRefundPolicy: boolean;
  refundPeriodDays: string;
  autoRenewal: boolean;
  
  // Technical Features
  hasAPI: boolean;
  hasAffiliateProgram: boolean;
  allowsThirdPartyIntegrations: boolean;
  hasMobileApp: boolean;
  
  // Legal & Compliance
  limitLiability: boolean;
  liabilityCapType: string;
  requireArbitration: boolean;
  arbitrationProvider: string;
  classActionWaiver: boolean;
  governingLaw: string;
  disputeLocation: string;
  
  // IP & Content
  ownsUserContent: boolean;
  grantsLicenseToContent: boolean;
  hasContentModeration: boolean;
  
  // Prohibited Activities (custom)
  prohibitedActivities: string;
}

const defaultFormData: FormData = {
  companyName: "",
  websiteUrl: "",
  contactEmail: "",
  companyAddress: "",
  country: "United States",
  stateProvince: "",
  
  businessType: "saas",
  sellsPhysicalProducts: false,
  sellsDigitalProducts: false,
  sellsServices: true,
  hasSubscriptions: true,
  hasFreeTrials: false,
  hasFreeTier: true,
  
  hasUserAccounts: true,
  requiresAgeVerification: false,
  minimumAge: "18",
  allowsUserContent: false,
  allowsComments: false,
  allowsFileUploads: false,
  hasForums: false,
  hasMessaging: false,
  
  acceptsPayments: true,
  paymentMethods: "Credit cards, debit cards",
  hasCancellationPolicy: true,
  hasRefundPolicy: true,
  refundPeriodDays: "7",
  autoRenewal: true,
  
  hasAPI: false,
  hasAffiliateProgram: false,
  allowsThirdPartyIntegrations: false,
  hasMobileApp: false,
  
  limitLiability: true,
  liabilityCapType: "fees-paid",
  requireArbitration: false,
  arbitrationProvider: "AAA",
  classActionWaiver: true,
  governingLaw: "",
  disputeLocation: "",
  
  ownsUserContent: false,
  grantsLicenseToContent: true,
  hasContentModeration: false,
  
  prohibitedActivities: "",
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
    const disputeVenue = formData.disputeLocation || formData.stateProvince || jurisdiction;

    let terms = `# Terms of Service

**Effective Date: ${today}**
**Last Updated: ${today}**

---

## 1. Agreement to Terms

These Terms of Service ("Terms," "Terms of Service," or "Agreement") constitute a legally binding agreement between you ("you," "your," or "User") and ${formData.companyName || "[Company Name]"} ("Company," "we," "us," or "our") concerning your access to and use of the ${formData.websiteUrl || "[Website URL]"} website${formData.hasMobileApp ? " and mobile application" : ""} (collectively, the "Services").

**BY ACCESSING OR USING OUR SERVICES, YOU AGREE TO BE BOUND BY THESE TERMS. IF YOU DO NOT AGREE TO ALL OF THESE TERMS, DO NOT ACCESS OR USE OUR SERVICES.**

We reserve the right to change or modify these Terms at any time and in our sole discretion. If we make material changes to these Terms, we will provide notice through the Services or by other means. Your continued use of the Services after the effective date of the revised Terms constitutes your acceptance of the changes.

---

## 2. Eligibility

### 2.1 Age Requirements

${formData.requiresAgeVerification ? `You must be at least ${formData.minimumAge || "18"} years old to use our Services. By using our Services, you represent and warrant that you meet this age requirement.` : "You must be at least 18 years old to enter into these Terms. By using our Services, you represent and warrant that you are at least 18 years old."}

If you are under the age of 18 (or the age of legal majority in your jurisdiction), you may only use our Services under the supervision of a parent or legal guardian who agrees to be bound by these Terms.

### 2.2 Legal Capacity

By using our Services, you represent and warrant that:

- You have the legal capacity and authority to enter into these Terms
- You are not located in a country that is subject to a U.S. government embargo, or that has been designated by the U.S. government as a "terrorist supporting" country
- You are not listed on any U.S. government list of prohibited or restricted parties
- Your use of the Services will not violate any applicable law or regulation

---

`;

    // User Accounts Section
    if (formData.hasUserAccounts) {
      terms += `## 3. User Accounts

### 3.1 Account Registration

To access certain features of our Services, you may be required to register for an account. When you register, you agree to:

- Provide accurate, current, and complete information
- Maintain and promptly update your account information
- Maintain the security and confidentiality of your login credentials
- Accept responsibility for all activities that occur under your account
- Notify us immediately of any unauthorized use of your account

### 3.2 Account Security

You are solely responsible for maintaining the confidentiality of your account credentials and for all activities that occur under your account. We recommend that you:

- Use a strong, unique password for your account
- Enable two-factor authentication if available
- Never share your login credentials with others
- Log out of your account when using shared devices

### 3.3 Account Termination

We reserve the right to suspend or terminate your account at any time, with or without cause, and with or without notice. Reasons for termination may include:

- Violation of these Terms or our policies
- Fraudulent, abusive, or illegal activity
- Conduct that may harm other users or our business
- Extended periods of inactivity
- Requests from law enforcement or government agencies

Upon termination, your right to use the Services will immediately cease. We may delete your account data in accordance with our data retention policies.

---

`;
    }

    // Services Description
    const serviceSection = formData.hasUserAccounts ? "4" : "3";
    terms += `## ${serviceSection}. Description of Services

### ${serviceSection}.1 Service Overview

${formData.companyName || "[Company Name]"} provides ${
      formData.businessType === "saas" ? "software-as-a-service solutions" :
      formData.businessType === "ecommerce" ? "e-commerce and online shopping services" :
      formData.businessType === "marketplace" ? "an online marketplace platform" :
      formData.businessType === "content" ? "content and information services" :
      "online services"
    } through our website${formData.hasMobileApp ? " and mobile application" : ""}. The specific features and functionality available to you may depend on your subscription plan or account type.

### ${serviceSection}.2 Service Availability

We strive to provide reliable access to our Services, but we do not guarantee that our Services will be available at all times. Our Services may be subject to:

- Scheduled maintenance and updates
- Unscheduled downtime due to technical issues
- Modifications, suspensions, or discontinuation at our discretion

We will make reasonable efforts to notify you in advance of any planned maintenance that may affect your use of the Services.

### ${serviceSection}.3 Service Modifications

We reserve the right to modify, update, or discontinue any aspect of our Services at any time, with or without notice. This includes adding or removing features, changing pricing, or discontinuing the Services entirely. We will not be liable to you or any third party for any modification, suspension, or discontinuation of our Services.

---

`;

    // User Content Section
    if (formData.allowsUserContent || formData.allowsComments || formData.allowsFileUploads) {
      const ucSection = parseInt(serviceSection) + 1;
      terms += `## ${ucSection}. User Content

### ${ucSection}.1 Definition

"User Content" means any content, materials, information, or data that you submit, upload, post, or otherwise make available through our Services, including but not limited to text, images, videos, audio, files, comments, feedback, and any other materials.

### ${ucSection}.2 Ownership and License

${formData.ownsUserContent ? 
  "By submitting User Content, you transfer and assign all rights, title, and interest in such content to us." :
  "You retain ownership of your User Content. However, by submitting User Content, you grant us a worldwide, non-exclusive, royalty-free, sublicensable, and transferable license to use, reproduce, distribute, prepare derivative works of, display, and perform your User Content in connection with the Services and our business operations."
}

This license includes the right to:
- Display your User Content on our Services
- Distribute your User Content through various channels
- Modify or adapt your User Content for technical purposes
- Use your User Content for promotional purposes

### ${ucSection}.3 User Content Representations

By submitting User Content, you represent and warrant that:

- You own or have the necessary rights to submit the content
- The content does not infringe any third party's intellectual property or other rights
- The content is not defamatory, obscene, or otherwise unlawful
- The content does not contain viruses or other harmful code
- You have obtained all necessary consents and releases

### ${ucSection}.4 Content Moderation

${formData.hasContentModeration ? 
  "We reserve the right, but are not obligated, to monitor, review, edit, or remove any User Content at our sole discretion. We may remove content that we determine violates these Terms, our policies, or applicable law." :
  "We do not actively monitor User Content but reserve the right to remove any content that violates these Terms or applicable law."
}

We are not responsible for any User Content submitted by users of our Services.

---

`;
    }

    // Prohibited Activities
    const prohibSection = parseInt(serviceSection) + (formData.allowsUserContent ? 2 : 1);
    terms += `## ${prohibSection}. Prohibited Activities

You agree not to engage in any of the following prohibited activities:

### ${prohibSection}.1 General Prohibitions

- **Illegal Activities**: Use the Services for any unlawful purpose or in violation of any laws or regulations
- **Fraud**: Engage in fraudulent, deceptive, or misleading conduct
- **Harassment**: Harass, abuse, threaten, or intimidate other users
- **Impersonation**: Impersonate any person or entity or falsely claim affiliation with any person or entity
- **Interference**: Interfere with or disrupt the Services, servers, or networks
- **Unauthorized Access**: Attempt to gain unauthorized access to any part of the Services, other accounts, or computer systems
- **Data Mining**: Use any automated means to collect information from the Services without our consent
- **Reverse Engineering**: Reverse engineer, decompile, or disassemble any aspect of the Services

### ${prohibSection}.2 Technical Prohibitions

- Upload or transmit viruses, malware, or other harmful code
- Attempt to bypass any security measures or access controls
- Use the Services to send spam, phishing messages, or unsolicited communications
- Overload, flood, or overwhelm our infrastructure
- Use bots, scripts, or automated tools except as permitted by our API terms
- Scrape, crawl, or index our Services without permission
- Create multiple accounts for abusive purposes

### ${prohibSection}.3 Content Prohibitions

- Post content that is illegal, harmful, threatening, abusive, harassing, defamatory, vulgar, obscene, or otherwise objectionable
- Post content that infringes any patent, trademark, copyright, trade secret, or other intellectual property rights
- Post content that violates the privacy or publicity rights of any third party
- Post content that promotes illegal activities or harmful conduct
- Post adult content or content inappropriate for minors
- Post false, misleading, or inaccurate information

${formData.prohibitedActivities ? `### ${prohibSection}.4 Additional Prohibitions\n\n${formData.prohibitedActivities}\n\n` : ""}

We reserve the right to investigate and take appropriate action against anyone who violates these prohibitions, including terminating their account and reporting them to law enforcement.

---

`;

    // Payment Terms
    if (formData.acceptsPayments || formData.hasSubscriptions) {
      const paySection = prohibSection + 1;
      terms += `## ${paySection}. Payments and Billing

### ${paySection}.1 Fees and Payment

${formData.hasSubscriptions ? 
  `Our Services are offered on a subscription basis. By subscribing to our Services, you agree to pay the applicable fees as described at the time of purchase. ${formData.hasFreeTier ? "Some features may be available for free, while premium features require a paid subscription." : ""}` :
  "Certain features or products may require payment. By making a purchase, you agree to pay the applicable fees as described at the time of purchase."
}

### ${paySection}.2 Payment Methods

We accept the following payment methods: ${formData.paymentMethods || "credit cards and debit cards"}. By providing a payment method, you represent that you are authorized to use that payment method and authorize us to charge your payment method for all fees incurred.

### ${paySection}.3 Pricing

All prices are listed in U.S. dollars unless otherwise specified. We reserve the right to change our prices at any time. ${formData.hasSubscriptions ? "Price changes for existing subscriptions will take effect at the start of the next billing cycle following notice of the change." : ""}

### ${paySection}.4 Taxes

Unless otherwise stated, all fees are exclusive of applicable taxes. You are responsible for paying all applicable taxes, and we will charge tax when required by law.

${formData.hasSubscriptions ? `
### ${paySection}.5 Subscription Terms

${formData.autoRenewal ? 
  "**Automatic Renewal**: Your subscription will automatically renew at the end of each billing period unless you cancel before the renewal date. You authorize us to charge your payment method on file for the renewal fee." :
  "Your subscription will expire at the end of each billing period. To continue using the Services, you will need to manually renew your subscription."
}

${formData.hasFreeTrials ? "**Free Trials**: We may offer free trials of our premium features. At the end of the free trial period, your account will be charged unless you cancel before the trial ends." : ""}

### ${paySection}.6 Cancellation

${formData.hasCancellationPolicy ? 
  "You may cancel your subscription at any time through your account settings or by contacting us. Cancellation will take effect at the end of your current billing period, and you will continue to have access to the Services until that time." :
  "Subscription cancellation is subject to our cancellation policy."
}

No refunds will be provided for partial billing periods unless required by law or specified in our refund policy.
` : ""}

${formData.hasRefundPolicy ? `
### ${paySection}.${formData.hasSubscriptions ? "7" : "5"} Refund Policy

We offer refunds within ${formData.refundPeriodDays || "7"} days of purchase for qualifying purchases. To request a refund, please contact us at ${formData.contactEmail || "[Contact Email]"}. Refunds are processed using your original payment method and may take 5-10 business days to appear on your statement.

Refunds may not be available for:
- Digital products that have been downloaded or accessed
- Services that have been substantially used
- Promotional or discounted purchases
- Purchases made more than ${formData.refundPeriodDays || "7"} days ago
` : ""}

---

`;
    }

    // Intellectual Property
    const ipSection = prohibSection + (formData.acceptsPayments ? 2 : 1);
    terms += `## ${ipSection}. Intellectual Property

### ${ipSection}.1 Our Intellectual Property

The Services and their entire contents, features, and functionality (including but not limited to all information, software, code, text, displays, images, video, and audio, and the design, selection, and arrangement thereof) are owned by ${formData.companyName || "[Company Name]"}, its licensors, or other providers of such material and are protected by United States and international copyright, trademark, patent, trade secret, and other intellectual property or proprietary rights laws.

### ${ipSection}.2 License to Use Services

Subject to your compliance with these Terms, we grant you a limited, non-exclusive, non-transferable, non-sublicensable license to access and use our Services for your personal or internal business purposes.

This license does not include the right to:
- Modify, copy, or create derivative works of the Services
- Sell, resell, license, or commercially exploit the Services
- Use the Services to provide services to third parties
- Reverse engineer or attempt to extract the source code of the Services
- Remove any copyright, trademark, or other proprietary notices

### ${ipSection}.3 Trademarks

${formData.companyName || "[Company Name]"} and our logos, product names, and service names are trademarks of ${formData.companyName || "[Company Name]"}. You may not use these trademarks without our prior written permission.

### ${ipSection}.4 Feedback

If you provide us with any feedback, suggestions, or ideas about our Services ("Feedback"), you grant us a perpetual, irrevocable, worldwide, royalty-free license to use, modify, and incorporate such Feedback into our Services without any obligation to compensate you.

---

`;

    // API Terms (if applicable)
    if (formData.hasAPI) {
      const apiSection = ipSection + 1;
      terms += `## ${apiSection}. API Terms

### ${apiSection}.1 API Access

We may provide application programming interfaces ("APIs") that allow you to integrate with or access certain features of our Services. Your use of our APIs is subject to these Terms and any additional API documentation or guidelines we provide.

### ${apiSection}.2 API License

We grant you a limited, non-exclusive, non-transferable, revocable license to use our APIs solely for the purpose of integrating with our Services in accordance with our documentation.

### ${apiSection}.3 API Restrictions

When using our APIs, you agree to:
- Comply with all rate limits and usage guidelines
- Not use the APIs in a way that could harm our Services or other users
- Not attempt to circumvent any API limitations
- Keep your API credentials confidential
- Attribute your use of our Services where required

### ${apiSection}.4 API Termination

We may suspend or terminate your API access at any time, with or without cause. We may also modify, deprecate, or discontinue any APIs at our discretion.

---

`;
    }

    // Disclaimers
    const disclaimerSection = ipSection + (formData.hasAPI ? 2 : 1);
    terms += `## ${disclaimerSection}. Disclaimers

### ${disclaimerSection}.1 "AS IS" and "AS AVAILABLE"

**THE SERVICES ARE PROVIDED ON AN "AS IS" AND "AS AVAILABLE" BASIS, WITHOUT ANY WARRANTIES OF ANY KIND, EITHER EXPRESS OR IMPLIED.**

To the fullest extent permitted by applicable law, we disclaim all warranties, express or implied, including but not limited to:
- Implied warranties of merchantability
- Fitness for a particular purpose
- Non-infringement
- Accuracy, reliability, or completeness of content
- Uninterrupted or error-free operation
- Freedom from viruses or harmful components

### ${disclaimerSection}.2 No Professional Advice

The information provided through our Services is for general informational purposes only and does not constitute professional advice (legal, financial, medical, or otherwise). You should consult with qualified professionals for advice specific to your situation.

### ${disclaimerSection}.3 Third-Party Content

Our Services may contain links to third-party websites or services that are not owned or controlled by us. We are not responsible for the content, privacy policies, or practices of any third-party websites or services.

### ${disclaimerSection}.4 User Content Disclaimer

We are not responsible for any User Content posted on our Services. Views expressed by users are their own and do not represent our views.

---

`;

    // Limitation of Liability
    if (formData.limitLiability) {
      const liabilitySection = disclaimerSection + 1;
      const liabilityCapText = formData.liabilityCapType === "fees-paid" ? 
        "the total amount of fees you have paid to us in the twelve (12) months preceding the claim" :
        formData.liabilityCapType === "100-dollars" ? 
        "one hundred U.S. dollars ($100)" :
        "the maximum extent permitted by law";

      terms += `## ${liabilitySection}. Limitation of Liability

### ${liabilitySection}.1 Exclusion of Certain Damages

**TO THE MAXIMUM EXTENT PERMITTED BY APPLICABLE LAW, IN NO EVENT SHALL ${(formData.companyName || "[Company Name]").toUpperCase()}, ITS AFFILIATES, OFFICERS, DIRECTORS, EMPLOYEES, AGENTS, SUPPLIERS, OR LICENSORS BE LIABLE FOR ANY:**

- Indirect, incidental, special, consequential, or punitive damages
- Loss of profits, revenue, data, or business opportunities
- Cost of procurement of substitute goods or services
- Personal injury or property damage
- Any damages arising from your use or inability to use the Services
- Any unauthorized access to or alteration of your transmissions or data

**THESE LIMITATIONS APPLY REGARDLESS OF THE LEGAL THEORY (WHETHER BASED ON WARRANTY, CONTRACT, TORT, NEGLIGENCE, STRICT LIABILITY, OR OTHERWISE), EVEN IF WE HAVE BEEN ADVISED OF THE POSSIBILITY OF SUCH DAMAGES.**

### ${liabilitySection}.2 Cap on Liability

**TO THE MAXIMUM EXTENT PERMITTED BY APPLICABLE LAW, OUR TOTAL LIABILITY TO YOU FOR ALL CLAIMS ARISING FROM OR RELATED TO THESE TERMS OR YOUR USE OF THE SERVICES SHALL NOT EXCEED ${liabilityCapText.toUpperCase()}.**

### ${liabilitySection}.3 Essential Purpose

The limitations of damages set forth above are fundamental elements of the basis of the bargain between you and us. Some jurisdictions do not allow the exclusion or limitation of liability for consequential or incidental damages, so the above limitation may not apply to you.

---

`;
    }

    // Indemnification
    const indemnSection = disclaimerSection + (formData.limitLiability ? 2 : 1);
    terms += `## ${indemnSection}. Indemnification

You agree to defend, indemnify, and hold harmless ${formData.companyName || "[Company Name]"}, its affiliates, officers, directors, employees, agents, suppliers, and licensors from and against any and all claims, damages, obligations, losses, liabilities, costs, and expenses (including attorney's fees) arising from:

- Your use of the Services
- Your violation of these Terms
- Your violation of any third-party right, including intellectual property, privacy, or other proprietary rights
- Any User Content you submit or transmit through the Services
- Your violation of any applicable law or regulation

We reserve the right to assume exclusive defense and control of any matter subject to indemnification by you, in which case you will cooperate with us in asserting any available defenses.

---

`;

    // Dispute Resolution
    const disputeSection = indemnSection + 1;
    if (formData.requireArbitration) {
      terms += `## ${disputeSection}. Dispute Resolution

### ${disputeSection}.1 Informal Resolution

Before initiating any formal dispute resolution, you agree to first contact us at ${formData.contactEmail || "[Contact Email]"} to attempt to resolve the dispute informally. We will attempt to resolve the dispute through good-faith negotiations for at least 30 days.

### ${disputeSection}.2 Binding Arbitration

**PLEASE READ THIS SECTION CAREFULLY. IT AFFECTS YOUR LEGAL RIGHTS, INCLUDING YOUR RIGHT TO FILE A LAWSUIT IN COURT.**

If we cannot resolve a dispute informally, you and we agree to resolve any disputes through binding arbitration, rather than in court. Arbitration is less formal than a lawsuit in court and uses a neutral arbitrator instead of a judge or jury.

**Arbitration Rules**: The arbitration will be administered by ${formData.arbitrationProvider === "AAA" ? "the American Arbitration Association (AAA)" : formData.arbitrationProvider === "JAMS" ? "JAMS" : "a mutually agreed arbitration provider"} under its applicable rules. The arbitration will be conducted in the English language.

**Arbitration Location**: The arbitration will take place in ${disputeVenue}, or at another mutually agreed location.

**Arbitration Fees**: Each party will be responsible for paying their own arbitration fees as set by the arbitration provider, except as required by law.

${formData.classActionWaiver ? `
### ${disputeSection}.3 Class Action Waiver

**YOU AND WE AGREE THAT EACH OF US MAY BRING CLAIMS AGAINST THE OTHER ONLY IN YOUR OR OUR INDIVIDUAL CAPACITY, AND NOT AS A PLAINTIFF OR CLASS MEMBER IN ANY PURPORTED CLASS OR REPRESENTATIVE PROCEEDING.**

The arbitrator may not consolidate more than one person's claims and may not preside over any form of a representative or class proceeding.
` : ""}

### ${disputeSection}.${formData.classActionWaiver ? "4" : "3"} Exceptions

Notwithstanding the above, either party may seek injunctive or other equitable relief in any court of competent jurisdiction to prevent the actual or threatened infringement of intellectual property rights.

---

`;
    } else {
      terms += `## ${disputeSection}. Dispute Resolution

### ${disputeSection}.1 Informal Resolution

Before initiating any formal dispute resolution, you agree to first contact us at ${formData.contactEmail || "[Contact Email]"} to attempt to resolve the dispute informally. We will attempt to resolve the dispute through good-faith negotiations for at least 30 days.

### ${disputeSection}.2 Jurisdiction and Venue

If a dispute cannot be resolved informally, you agree that any legal action or proceeding arising out of or relating to these Terms or your use of the Services shall be brought exclusively in the courts located in ${disputeVenue}, and you consent to the personal jurisdiction of such courts.

${formData.classActionWaiver ? `
### ${disputeSection}.3 Class Action Waiver

**TO THE EXTENT PERMITTED BY LAW, YOU AGREE TO WAIVE ANY RIGHT TO PARTICIPATE IN A CLASS ACTION LAWSUIT OR CLASS-WIDE ARBITRATION.**
` : ""}

---

`;
    }

    // Governing Law
    const govSection = disputeSection + 1;
    terms += `## ${govSection}. Governing Law

These Terms and your use of the Services shall be governed by and construed in accordance with the laws of ${jurisdiction}, without regard to its conflict of law principles.

---

`;

    // Termination
    const termSection = govSection + 1;
    terms += `## ${termSection}. Termination

### ${termSection}.1 Termination by You

You may terminate your account and stop using our Services at any time by contacting us or using the account settings in our Services.

### ${termSection}.2 Termination by Us

We may terminate or suspend your access to the Services immediately, without prior notice or liability, for any reason, including if you breach these Terms.

### ${termSection}.3 Effect of Termination

Upon termination:
- Your right to use the Services will immediately cease
- You must cease all use of the Services
- We may delete your account and associated data in accordance with our data retention policies
- Any provisions of these Terms that by their nature should survive termination will survive (including, without limitation, ownership provisions, warranty disclaimers, indemnification, and limitations of liability)

---

`;

    // General Provisions
    const generalSection = termSection + 1;
    terms += `## ${generalSection}. General Provisions

### ${generalSection}.1 Entire Agreement

These Terms, together with our Privacy Policy and any other agreements expressly incorporated by reference, constitute the entire agreement between you and us regarding your use of the Services.

### ${generalSection}.2 Severability

If any provision of these Terms is held to be invalid, illegal, or unenforceable, the remaining provisions will continue in full force and effect.

### ${generalSection}.3 Waiver

Our failure to enforce any right or provision of these Terms will not be considered a waiver of such right or provision. Any waiver must be in writing and signed by us.

### ${generalSection}.4 Assignment

You may not assign or transfer these Terms or your rights hereunder without our prior written consent. We may assign these Terms without restriction.

### ${generalSection}.5 Notices

We may provide notices to you via email, posting on the Services, or other reasonable means. You must provide notices to us in writing to ${formData.contactEmail || "[Contact Email]"} or at our mailing address.

### ${generalSection}.6 Force Majeure

We will not be liable for any failure or delay in performance resulting from causes beyond our reasonable control, including acts of God, natural disasters, war, terrorism, riots, embargoes, acts of civil or military authorities, fire, floods, accidents, strikes, or shortages of transportation, facilities, fuel, energy, labor, or materials.

### ${generalSection}.7 Independent Contractors

Nothing in these Terms creates a partnership, joint venture, agency, or employment relationship between you and us.

### ${generalSection}.8 Third-Party Beneficiaries

These Terms do not confer any third-party beneficiary rights.

---

## ${generalSection + 1}. Contact Information

If you have any questions about these Terms, please contact us at:

**${formData.companyName || "[Company Name]"}**
${formData.companyAddress ? `Address: ${formData.companyAddress}\n` : ""}Email: ${formData.contactEmail || "[Contact Email]"}
Website: ${formData.websiteUrl || "[Website URL]"}

---

*These Terms of Service were generated using TermsZipp. While this document covers common legal requirements, we strongly recommend having it reviewed by a qualified legal professional to ensure it meets all applicable laws and regulations for your specific business and jurisdiction.*
`;

    setGeneratedTerms(terms);
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
              <FileText className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold">Terms of Service Generator</h1>
              <p className="text-muted-foreground">Create comprehensive terms for your website or app</p>
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
                  {s === 1 ? 'Business' : s === 2 ? 'Features' : s === 3 ? 'Payments' : s === 4 ? 'Legal' : 'Generate'}
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

                <div>
                  <Label htmlFor="companyAddress">Business Address</Label>
                  <Input
                    id="companyAddress"
                    value={formData.companyAddress}
                    onChange={(e) => updateForm('companyAddress', e.target.value)}
                    placeholder="123 Main St, City, State, ZIP"
                    className="mt-1"
                  />
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

                <div>
                  <Label>Business Type</Label>
                  <Select value={formData.businessType} onValueChange={(v) => updateForm('businessType', v)}>
                    <SelectTrigger className="mt-1">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="saas">SaaS / Software</SelectItem>
                      <SelectItem value="ecommerce">E-commerce</SelectItem>
                      <SelectItem value="marketplace">Marketplace</SelectItem>
                      <SelectItem value="content">Blog / Content</SelectItem>
                      <SelectItem value="agency">Agency / Services</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="flex justify-end mt-6">
                <Button onClick={() => setStep(2)} className="btn-gradient">
                  Next Step <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </Card>
          )}

          {/* Step 2: Features */}
          {step === 2 && (
            <Card className="p-6">
              <h2 className="text-lg font-semibold mb-6">Website/App Features</h2>
              
              <h3 className="text-md font-medium mb-3">What do you offer?</h3>
              <div className="grid grid-cols-2 gap-3 mb-6">
                {[
                  { key: 'sellsPhysicalProducts', label: 'Physical products' },
                  { key: 'sellsDigitalProducts', label: 'Digital products' },
                  { key: 'sellsServices', label: 'Services' },
                  { key: 'hasSubscriptions', label: 'Subscription plans' },
                  { key: 'hasFreeTrials', label: 'Free trials' },
                  { key: 'hasFreeTier', label: 'Free tier available' },
                  { key: 'hasMobileApp', label: 'Mobile app' },
                  { key: 'hasAPI', label: 'API for developers' },
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

              <h3 className="text-md font-medium mb-3">User Features</h3>
              <div className="grid grid-cols-2 gap-3 mb-6">
                {[
                  { key: 'hasUserAccounts', label: 'User accounts / login' },
                  { key: 'allowsUserContent', label: 'User-generated content' },
                  { key: 'allowsComments', label: 'Comments' },
                  { key: 'allowsFileUploads', label: 'File uploads' },
                  { key: 'hasForums', label: 'Forums / community' },
                  { key: 'hasMessaging', label: 'User messaging' },
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

              <h3 className="text-md font-medium mb-3">Age Verification</h3>
              <div className="space-y-3">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="requiresAgeVerification"
                    checked={formData.requiresAgeVerification}
                    onCheckedChange={(checked) => updateForm('requiresAgeVerification', checked as boolean)}
                  />
                  <Label htmlFor="requiresAgeVerification" className="text-sm font-normal">Require age verification</Label>
                </div>
                {formData.requiresAgeVerification && (
                  <div>
                    <Label>Minimum Age</Label>
                    <Select value={formData.minimumAge} onValueChange={(v) => updateForm('minimumAge', v)}>
                      <SelectTrigger className="mt-1 w-32">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="13">13+</SelectItem>
                        <SelectItem value="16">16+</SelectItem>
                        <SelectItem value="18">18+</SelectItem>
                        <SelectItem value="21">21+</SelectItem>
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

          {/* Step 3: Payments */}
          {step === 3 && (
            <Card className="p-6">
              <h2 className="text-lg font-semibold mb-6">Payments & Billing</h2>
              
              <div className="space-y-4">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="acceptsPayments"
                    checked={formData.acceptsPayments}
                    onCheckedChange={(checked) => updateForm('acceptsPayments', checked as boolean)}
                  />
                  <Label htmlFor="acceptsPayments" className="text-sm font-normal">I accept payments</Label>
                </div>

                {formData.acceptsPayments && (
                  <>
                    <div>
                      <Label>Payment Methods</Label>
                      <Input
                        value={formData.paymentMethods}
                        onChange={(e) => updateForm('paymentMethods', e.target.value)}
                        placeholder="Credit cards, debit cards, PayPal..."
                        className="mt-1"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="autoRenewal"
                          checked={formData.autoRenewal}
                          onCheckedChange={(checked) => updateForm('autoRenewal', checked as boolean)}
                        />
                        <Label htmlFor="autoRenewal" className="text-sm font-normal">Auto-renewal for subscriptions</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="hasCancellationPolicy"
                          checked={formData.hasCancellationPolicy}
                          onCheckedChange={(checked) => updateForm('hasCancellationPolicy', checked as boolean)}
                        />
                        <Label htmlFor="hasCancellationPolicy" className="text-sm font-normal">Cancellation policy</Label>
                      </div>
                    </div>

                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="hasRefundPolicy"
                        checked={formData.hasRefundPolicy}
                        onCheckedChange={(checked) => updateForm('hasRefundPolicy', checked as boolean)}
                      />
                      <Label htmlFor="hasRefundPolicy" className="text-sm font-normal">Offer refunds</Label>
                    </div>

                    {formData.hasRefundPolicy && (
                      <div>
                        <Label>Refund Period (Days)</Label>
                        <Select value={formData.refundPeriodDays} onValueChange={(v) => updateForm('refundPeriodDays', v)}>
                          <SelectTrigger className="mt-1 w-40">
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
                  </>
                )}

                {(formData.allowsUserContent || formData.allowsComments) && (
                  <>
                    <h3 className="text-md font-medium mt-6 mb-3">User Content Rights</h3>
                    <div className="space-y-3">
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="ownsUserContent"
                          checked={formData.ownsUserContent}
                          onCheckedChange={(checked) => updateForm('ownsUserContent', checked as boolean)}
                        />
                        <Label htmlFor="ownsUserContent" className="text-sm font-normal">
                          We own all user-submitted content
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="grantsLicenseToContent"
                          checked={formData.grantsLicenseToContent}
                          onCheckedChange={(checked) => updateForm('grantsLicenseToContent', checked as boolean)}
                        />
                        <Label htmlFor="grantsLicenseToContent" className="text-sm font-normal">
                          Users grant us a license to use their content
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="hasContentModeration"
                          checked={formData.hasContentModeration}
                          onCheckedChange={(checked) => updateForm('hasContentModeration', checked as boolean)}
                        />
                        <Label htmlFor="hasContentModeration" className="text-sm font-normal">
                          We actively moderate content
                        </Label>
                      </div>
                    </div>
                  </>
                )}
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

          {/* Step 4: Legal */}
          {step === 4 && (
            <Card className="p-6">
              <h2 className="text-lg font-semibold mb-6">Legal & Compliance</h2>
              
              <div className="space-y-4">
                <h3 className="text-md font-medium mb-3">Liability</h3>
                <div className="space-y-3">
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="limitLiability"
                      checked={formData.limitLiability}
                      onCheckedChange={(checked) => updateForm('limitLiability', checked as boolean)}
                    />
                    <Label htmlFor="limitLiability" className="text-sm font-normal">
                      Include limitation of liability clause
                    </Label>
                  </div>

                  {formData.limitLiability && (
                    <div>
                      <Label>Liability Cap</Label>
                      <Select value={formData.liabilityCapType} onValueChange={(v) => updateForm('liabilityCapType', v)}>
                        <SelectTrigger className="mt-1">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="fees-paid">Total fees paid in last 12 months</SelectItem>
                          <SelectItem value="100-dollars">$100</SelectItem>
                          <SelectItem value="max-permitted">Maximum permitted by law</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  )}
                </div>

                <h3 className="text-md font-medium mt-6 mb-3">Dispute Resolution</h3>
                <div className="space-y-3">
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="requireArbitration"
                      checked={formData.requireArbitration}
                      onCheckedChange={(checked) => updateForm('requireArbitration', checked as boolean)}
                    />
                    <Label htmlFor="requireArbitration" className="text-sm font-normal">
                      Require binding arbitration (instead of court)
                    </Label>
                  </div>

                  {formData.requireArbitration && (
                    <div>
                      <Label>Arbitration Provider</Label>
                      <Select value={formData.arbitrationProvider} onValueChange={(v) => updateForm('arbitrationProvider', v)}>
                        <SelectTrigger className="mt-1">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="AAA">American Arbitration Association (AAA)</SelectItem>
                          <SelectItem value="JAMS">JAMS</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  )}

                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="classActionWaiver"
                      checked={formData.classActionWaiver}
                      onCheckedChange={(checked) => updateForm('classActionWaiver', checked as boolean)}
                    />
                    <Label htmlFor="classActionWaiver" className="text-sm font-normal">
                      Include class action waiver
                    </Label>
                  </div>
                </div>

                <h3 className="text-md font-medium mt-6 mb-3">Governing Law</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label>Governing Law (State/Country)</Label>
                    <Input
                      value={formData.governingLaw}
                      onChange={(e) => updateForm('governingLaw', e.target.value)}
                      placeholder="e.g., State of Delaware"
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label>Dispute Location</Label>
                    <Input
                      value={formData.disputeLocation}
                      onChange={(e) => updateForm('disputeLocation', e.target.value)}
                      placeholder="e.g., Wilmington, Delaware"
                      className="mt-1"
                    />
                  </div>
                </div>

                <h3 className="text-md font-medium mt-6 mb-3">Additional Prohibited Activities (Optional)</h3>
                <Textarea
                  value={formData.prohibitedActivities}
                  onChange={(e) => updateForm('prohibitedActivities', e.target.value)}
                  placeholder="Add any additional prohibited activities specific to your business..."
                  className="min-h-[80px]"
                />
              </div>

              <div className="flex justify-between mt-6">
                <Button variant="outline" onClick={() => setStep(3)}>
                  <ArrowLeft className="mr-2 h-4 w-4" /> Back
                </Button>
                <Button onClick={generateTerms} className="btn-gradient">
                  Generate Terms <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </Card>
          )}

          {/* Step 5: Generated Terms */}
          {step === 5 && (
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
                    <strong>Legal Disclaimer:</strong> These Terms of Service cover common legal requirements but may not address all legal requirements for your specific business, industry, or jurisdiction. We strongly recommend having this document reviewed by a qualified attorney.
                  </div>
                </div>
              </Card>

              <div className="flex justify-between">
                <Button variant="outline" onClick={() => setStep(4)}>
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
