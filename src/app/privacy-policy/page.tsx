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
  businessType: string;
  
  // Data Collection
  collectsName: boolean;
  collectsEmail: boolean;
  collectsPhone: boolean;
  collectsAddress: boolean;
  collectsPayment: boolean;
  collectsLocation: boolean;
  collectsDeviceInfo: boolean;
  collectsBirthdate: boolean;
  collectsSocialProfiles: boolean;
  collectsEmploymentInfo: boolean;
  
  // Third-Party Services
  usesGoogleAnalytics: boolean;
  usesStripe: boolean;
  usesPaypal: boolean;
  usesFacebookPixel: boolean;
  usesMailchimp: boolean;
  usesIntercom: boolean;
  usesHotjar: boolean;
  usesCloudflare: boolean;
  otherServices: string;
  
  // Features & Functionality
  hasUserAccounts: boolean;
  hasUserProfiles: boolean;
  allowsUserContent: boolean;
  hasComments: boolean;
  hasNewsletter: boolean;
  sellsProducts: boolean;
  sellsDigitalProducts: boolean;
  hasSubscriptions: boolean;
  hasMobileApp: boolean;
  
  // Cookies
  usesEssentialCookies: boolean;
  usesFunctionalCookies: boolean;
  usesAnalyticsCookies: boolean;
  usesAdvertisingCookies: boolean;
  
  // Compliance & Legal
  gdprCompliant: boolean;
  ccpaCompliant: boolean;
  coppaCompliant: boolean;
  hipaaCompliant: boolean;
  dataRetentionPeriod: string;
  allowsInternationalTransfers: boolean;
  hasDataProcessingAgreements: boolean;
}

const defaultFormData: FormData = {
  companyName: "",
  websiteUrl: "",
  contactEmail: "",
  companyAddress: "",
  country: "United States",
  businessType: "saas",
  
  collectsName: true,
  collectsEmail: true,
  collectsPhone: false,
  collectsAddress: false,
  collectsPayment: false,
  collectsLocation: false,
  collectsDeviceInfo: true,
  collectsBirthdate: false,
  collectsSocialProfiles: false,
  collectsEmploymentInfo: false,
  
  usesGoogleAnalytics: true,
  usesStripe: false,
  usesPaypal: false,
  usesFacebookPixel: false,
  usesMailchimp: false,
  usesIntercom: false,
  usesHotjar: false,
  usesCloudflare: false,
  otherServices: "",
  
  hasUserAccounts: true,
  hasUserProfiles: false,
  allowsUserContent: false,
  hasComments: false,
  hasNewsletter: false,
  sellsProducts: false,
  sellsDigitalProducts: false,
  hasSubscriptions: false,
  hasMobileApp: false,
  
  usesEssentialCookies: true,
  usesFunctionalCookies: true,
  usesAnalyticsCookies: true,
  usesAdvertisingCookies: false,
  
  gdprCompliant: true,
  ccpaCompliant: true,
  coppaCompliant: false,
  hipaaCompliant: false,
  dataRetentionPeriod: "2-years",
  allowsInternationalTransfers: true,
  hasDataProcessingAgreements: true,
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
    
    const retentionText = {
      "1-year": "one (1) year",
      "2-years": "two (2) years",
      "3-years": "three (3) years",
      "5-years": "five (5) years",
      "7-years": "seven (7) years",
      "indefinite": "as long as necessary for the purposes outlined in this policy"
    }[formData.dataRetentionPeriod] || "two (2) years";

    let policy = `# Privacy Policy

**Effective Date: ${today}**
**Last Updated: ${today}**

---

## 1. Introduction

Welcome to ${formData.companyName || "[Company Name]"} ("Company," "we," "us," or "our"). We are committed to protecting your personal information and your right to privacy. This Privacy Policy describes how we collect, use, disclose, and safeguard your information when you visit our website ${formData.websiteUrl || "[Website URL]"}${formData.hasMobileApp ? " and use our mobile application" : ""} (collectively, the "Services").

Please read this Privacy Policy carefully. By accessing or using our Services, you acknowledge that you have read, understood, and agree to be bound by all the terms of this Privacy Policy. If you do not agree with the terms of this Privacy Policy, please do not access or use our Services.

We reserve the right to make changes to this Privacy Policy at any time and for any reason. We will alert you about any changes by updating the "Last Updated" date of this Privacy Policy. You are encouraged to periodically review this Privacy Policy to stay informed of updates.

---

## 2. Information We Collect

We collect information about you in various ways when you use our Services. The types of information we may collect include:

### 2.1 Personal Information You Provide

When you register for an account, make a purchase, subscribe to our newsletter, fill out a form, or otherwise interact with our Services, we may collect the following personal information:

`;

    // Personal info collected
    const personalInfo = [];
    if (formData.collectsName) personalInfo.push("**Full Name**: We collect your first and last name to personalize your experience and address you in communications.");
    if (formData.collectsEmail) personalInfo.push("**Email Address**: We collect your email address to create and manage your account, send you important updates, respond to inquiries, and deliver our services.");
    if (formData.collectsPhone) personalInfo.push("**Phone Number**: We may collect your phone number to provide customer support, send important notifications, or verify your identity.");
    if (formData.collectsAddress) personalInfo.push("**Mailing Address**: We collect your physical address for shipping purposes, billing verification, and compliance with legal requirements.");
    if (formData.collectsPayment) personalInfo.push("**Payment Information**: When you make a purchase, we collect payment details such as credit card numbers, billing addresses, and transaction information. This data is processed securely through our payment processors and we do not store complete credit card numbers on our servers.");
    if (formData.collectsBirthdate) personalInfo.push("**Date of Birth**: We may collect your date of birth to verify your age, comply with legal requirements, or provide age-appropriate content and services.");
    if (formData.collectsSocialProfiles) personalInfo.push("**Social Media Profiles**: If you choose to connect your social media accounts, we may collect your profile information, friends lists, and other data you make available through those platforms.");
    if (formData.collectsEmploymentInfo) personalInfo.push("**Employment Information**: We may collect information about your employer, job title, and professional background to provide relevant services or verify your eligibility for certain features.");

    if (personalInfo.length > 0) {
      policy += personalInfo.map(item => `- ${item}`).join('\n\n') + '\n\n';
    }

    policy += `### 2.2 Information Collected Automatically

When you access our Services, we automatically collect certain information about your device and usage patterns. This information does not reveal your specific identity but may include:

`;

    if (formData.collectsDeviceInfo) {
      policy += `- **Device Information**: We collect information about the device you use to access our Services, including hardware model, operating system and version, unique device identifiers, browser type and version, and mobile network information.

- **Log Data**: Our servers automatically record information ("Log Data") when you use our Services. This may include your IP address, browser type, the pages you visit, the time and date of your visit, the time spent on each page, and other diagnostic data.

- **Usage Information**: We collect information about how you interact with our Services, including the features you use, the actions you take, the time and frequency of your activities, and other usage statistics.

`;
    }

    if (formData.collectsLocation) {
      policy += `- **Location Information**: We may collect information about your approximate location based on your IP address. ${formData.hasMobileApp ? "If you use our mobile application, we may also collect precise location data from your device with your consent." : ""}

`;
    }

    // Cookies section
    policy += `### 2.3 Cookies and Tracking Technologies

We use cookies, web beacons, pixels, and similar tracking technologies to collect information about your browsing activities and to distinguish you from other users of our Services. This helps us provide you with a better experience and allows us to improve our Services.

**Types of Cookies We Use:**

`;

    if (formData.usesEssentialCookies) {
      policy += `- **Essential Cookies**: These cookies are strictly necessary for the operation of our Services. They enable core functionality such as security, network management, and account access. You cannot opt out of these cookies as they are required for the Services to function properly.

`;
    }

    if (formData.usesFunctionalCookies) {
      policy += `- **Functional Cookies**: These cookies enable enhanced functionality and personalization, such as remembering your preferences, language settings, and login information. If you disable these cookies, some or all of these features may not function properly.

`;
    }

    if (formData.usesAnalyticsCookies) {
      policy += `- **Analytics Cookies**: These cookies help us understand how visitors interact with our Services by collecting and reporting information anonymously. This helps us improve the performance and design of our Services.

`;
    }

    if (formData.usesAdvertisingCookies) {
      policy += `- **Advertising Cookies**: These cookies are used to deliver advertisements that are relevant to you and your interests. They also help limit the number of times you see an advertisement and measure the effectiveness of advertising campaigns.

`;
    }

    policy += `**Managing Cookies**: Most web browsers are set to accept cookies by default. You can usually modify your browser settings to decline cookies if you prefer. However, this may prevent you from taking full advantage of our Services.

---

## 3. How We Use Your Information

We use the information we collect for various purposes, including:

### 3.1 Providing and Maintaining Our Services

- To create and manage your account
- To process transactions and send related information
- To provide customer support and respond to your inquiries
- To deliver the products, services, or information you request
${formData.hasSubscriptions ? "- To manage your subscription and billing\n" : ""}${formData.sellsProducts ? "- To process and fulfill your orders\n" : ""}

### 3.2 Improving Our Services

- To understand how users interact with our Services
- To develop new products, services, features, and functionality
- To conduct research and analysis to improve user experience
- To identify and fix bugs, errors, and technical issues

### 3.3 Communications

- To send you important notices, such as changes to our terms, conditions, and policies
${formData.hasNewsletter ? "- To send you marketing communications, newsletters, and promotional materials (with your consent)\n" : ""}- To respond to your comments, questions, and requests
- To provide you with news and information about our Services

### 3.4 Security and Fraud Prevention

- To protect our Services from unauthorized access, use, or disclosure
- To detect, prevent, and address fraud, security breaches, and other harmful activities
- To enforce our terms of service and other agreements

### 3.5 Legal Compliance

- To comply with applicable laws, regulations, and legal processes
- To respond to lawful requests from public authorities
- To protect our rights, privacy, safety, or property, and/or that of our affiliates, you, or others

---

## 4. Third-Party Services and Data Sharing

We may share your information with third parties in the following circumstances:

### 4.1 Service Providers

We engage third-party companies and individuals to perform services on our behalf. These service providers have access to your personal information only to perform specific tasks and are obligated to protect your information. Our service providers include:

`;

    // Third-party services
    const services = [];
    if (formData.usesGoogleAnalytics) services.push("**Google Analytics**: We use Google Analytics to analyze website traffic and user behavior. Google Analytics collects information such as how often users visit our site, what pages they visit, and what other sites they used prior to coming to our site. Google's ability to use and share information collected by Google Analytics is restricted by the Google Analytics Terms of Service and the Google Privacy Policy.");
    if (formData.usesStripe) services.push("**Stripe**: We use Stripe to process payments. When you make a payment, your payment information is sent directly to Stripe's secure servers. Stripe's use of your personal information is governed by their Privacy Policy.");
    if (formData.usesPaypal) services.push("**PayPal**: We use PayPal as a payment option. When you pay via PayPal, your information is handled according to PayPal's Privacy Policy.");
    if (formData.usesFacebookPixel) services.push("**Facebook Pixel**: We use Facebook Pixel to measure the effectiveness of our advertising and to deliver targeted advertisements. Facebook's use of this information is governed by their Data Policy.");
    if (formData.usesMailchimp) services.push("**Mailchimp**: We use Mailchimp to manage our email marketing campaigns and newsletters. Mailchimp's use of your information is governed by their Privacy Policy.");
    if (formData.usesIntercom) services.push("**Intercom**: We use Intercom to provide customer support and messaging services. Intercom's use of your information is governed by their Privacy Policy.");
    if (formData.usesHotjar) services.push("**Hotjar**: We use Hotjar to understand how users interact with our website through heatmaps and session recordings. Hotjar's use of your information is governed by their Privacy Policy.");
    if (formData.usesCloudflare) services.push("**Cloudflare**: We use Cloudflare for website security, performance optimization, and content delivery. Cloudflare's use of your information is governed by their Privacy Policy.");
    if (formData.otherServices) services.push(`**Other Services**: ${formData.otherServices}`);

    if (services.length > 0) {
      policy += services.map(item => `- ${item}`).join('\n\n') + '\n\n';
    } else {
      policy += "We use various third-party service providers to help us operate our Services, process payments, and analyze usage patterns.\n\n";
    }

    policy += `### 4.2 Business Transfers

If we are involved in a merger, acquisition, financing, reorganization, bankruptcy, or sale of our assets, your information may be transferred as part of that transaction. We will notify you via email and/or a prominent notice on our Services of any change in ownership or uses of your personal information.

### 4.3 Legal Requirements

We may disclose your information if required to do so by law or in response to valid requests by public authorities (e.g., a court or a government agency). We may also disclose your information to:

- Comply with a legal obligation
- Protect and defend our rights or property
- Prevent or investigate possible wrongdoing in connection with the Services
- Protect the personal safety of users of the Services or the public
- Protect against legal liability

### 4.4 With Your Consent

We may share your information with third parties when you give us explicit consent to do so.

**We do not sell your personal information to third parties.**

---

## 5. Data Retention

We retain your personal information only for as long as necessary to fulfill the purposes for which it was collected, including to satisfy any legal, accounting, or reporting requirements.

Our standard retention period is ${retentionText} from the date of collection or your last interaction with our Services, unless a longer retention period is required or permitted by law.

When determining the appropriate retention period, we consider:

- The nature and sensitivity of the personal information
- The potential risk of harm from unauthorized use or disclosure
- The purposes for which we process your personal information
- Whether we can achieve those purposes through other means
- Applicable legal, regulatory, tax, accounting, or other requirements

When we no longer need your personal information, we will securely delete or anonymize it in accordance with applicable laws and our data retention policies.

---

## 6. Data Security

We implement appropriate technical and organizational security measures designed to protect your personal information from unauthorized access, alteration, disclosure, or destruction. These measures include:

- **Encryption**: We use industry-standard encryption (SSL/TLS) to protect data transmitted between your browser and our servers.
- **Access Controls**: We restrict access to personal information to authorized employees, contractors, and agents who need to know that information to process it on our behalf.
- **Security Assessments**: We regularly review and update our security practices to protect against unauthorized access.
- **Secure Infrastructure**: We use secure data centers and cloud infrastructure providers with robust physical and digital security measures.

However, no method of transmission over the Internet or method of electronic storage is 100% secure. While we strive to use commercially acceptable means to protect your personal information, we cannot guarantee its absolute security.

If you have reason to believe that your interaction with us is no longer secure, please immediately notify us at ${formData.contactEmail || "[Contact Email]"}.

---

`;

    // GDPR Section
    if (formData.gdprCompliant) {
      policy += `## 7. Your Rights Under GDPR (European Users)

If you are located in the European Economic Area (EEA), United Kingdom, or Switzerland, you have certain rights under the General Data Protection Regulation (GDPR) and similar data protection laws:

### 7.1 Right to Access

You have the right to request a copy of the personal information we hold about you. We will provide this information free of charge within one month of receiving your request.

### 7.2 Right to Rectification

You have the right to request that we correct any inaccurate or incomplete personal information we hold about you.

### 7.3 Right to Erasure ("Right to be Forgotten")

You have the right to request that we delete your personal information in certain circumstances, such as when the data is no longer necessary for the purposes for which it was collected.

### 7.4 Right to Restrict Processing

You have the right to request that we restrict the processing of your personal information in certain circumstances, such as when you contest the accuracy of the data.

### 7.5 Right to Data Portability

You have the right to receive your personal information in a structured, commonly used, and machine-readable format, and to transmit that data to another controller.

### 7.6 Right to Object

You have the right to object to the processing of your personal information for direct marketing purposes or when processing is based on legitimate interests.

### 7.7 Right to Withdraw Consent

Where we rely on your consent to process your personal information, you have the right to withdraw that consent at any time. This will not affect the lawfulness of processing conducted prior to your withdrawal.

### 7.8 Right to Lodge a Complaint

You have the right to lodge a complaint with a supervisory authority in the EU member state of your habitual residence, place of work, or place of the alleged infringement.

**Legal Basis for Processing**: We process your personal information based on one or more of the following legal bases:
- Your consent
- Performance of a contract with you
- Compliance with a legal obligation
- Protection of vital interests
- Our legitimate interests, provided they are not overridden by your rights

To exercise any of these rights, please contact us at ${formData.contactEmail || "[Contact Email]"}.

---

`;
    }

    // CCPA Section
    if (formData.ccpaCompliant) {
      policy += `## ${formData.gdprCompliant ? "8" : "7"}. Your Rights Under CCPA (California Residents)

If you are a California resident, you have specific rights regarding your personal information under the California Consumer Privacy Act (CCPA) and the California Privacy Rights Act (CPRA):

### Right to Know

You have the right to request that we disclose:
- The categories of personal information we have collected about you
- The categories of sources from which the personal information is collected
- The business or commercial purpose for collecting or selling personal information
- The categories of third parties with whom we share personal information
- The specific pieces of personal information we have collected about you

### Right to Delete

You have the right to request that we delete any personal information we have collected from you, subject to certain exceptions.

### Right to Correct

You have the right to request that we correct inaccurate personal information that we maintain about you.

### Right to Opt-Out

You have the right to opt out of the sale or sharing of your personal information. **We do not sell your personal information.**

### Right to Non-Discrimination

We will not discriminate against you for exercising any of your CCPA rights. We will not:
- Deny you goods or services
- Charge you different prices or rates for goods or services
- Provide you a different level or quality of goods or services
- Suggest that you may receive a different price or rate or different level or quality of goods or services

### Submitting a Request

To exercise your rights, you may:
- Email us at ${formData.contactEmail || "[Contact Email]"}
- Submit a request through our website

We will verify your identity before processing your request. You may designate an authorized agent to make a request on your behalf.

---

`;
    }

    // COPPA Section
    if (formData.coppaCompliant) {
      policy += `## ${formData.gdprCompliant && formData.ccpaCompliant ? "9" : formData.gdprCompliant || formData.ccpaCompliant ? "8" : "7"}. Children's Privacy

Our Services are not intended for children under 13 years of age (or 16 in certain jurisdictions). We do not knowingly collect personal information from children under 13.

If we learn that we have collected personal information from a child under 13 without verification of parental consent, we will take steps to delete that information as quickly as possible.

If you believe that we might have any information from or about a child under 13, please contact us immediately at ${formData.contactEmail || "[Contact Email]"}.

Parents or guardians who believe their child has provided us with personal information may contact us to request deletion of that information.

---

`;
    }

    // International Transfers
    if (formData.allowsInternationalTransfers) {
      const sectionNum = 7 + (formData.gdprCompliant ? 1 : 0) + (formData.ccpaCompliant ? 1 : 0) + (formData.coppaCompliant ? 1 : 0);
      policy += `## ${sectionNum}. International Data Transfers

Your personal information may be transferred to and processed in countries other than your country of residence. These countries may have data protection laws that are different from the laws of your country.

We take appropriate safeguards to ensure that your personal information remains protected in accordance with this Privacy Policy when transferred internationally. These safeguards may include:

- Standard Contractual Clauses approved by the European Commission
- Data Processing Agreements with our service providers
- Ensuring recipients are certified under applicable data protection frameworks

By using our Services, you consent to the transfer of your information to countries outside your country of residence, including the United States, which may have different data protection rules than your country.

---

`;
    }

    // Contact section
    const finalSectionNum = 7 + (formData.gdprCompliant ? 1 : 0) + (formData.ccpaCompliant ? 1 : 0) + (formData.coppaCompliant ? 1 : 0) + (formData.allowsInternationalTransfers ? 1 : 0);
    
    policy += `## ${finalSectionNum}. Contact Us

If you have any questions, concerns, or requests regarding this Privacy Policy or our privacy practices, please contact us:

**${formData.companyName || "[Company Name]"}**
${formData.companyAddress ? `Address: ${formData.companyAddress}\n` : ""}Email: ${formData.contactEmail || "[Contact Email]"}
Website: ${formData.websiteUrl || "[Website URL]"}

We will respond to your inquiry within 30 days.

---

## ${finalSectionNum + 1}. Changes to This Privacy Policy

We may update this Privacy Policy from time to time to reflect changes in our practices, technology, legal requirements, and other factors. When we make material changes to this Privacy Policy, we will:

- Update the "Last Updated" date at the top of this Privacy Policy
- Notify you by email (if we have your email address) or through a notice on our Services
- Where required by law, obtain your consent to the changes

We encourage you to review this Privacy Policy periodically to stay informed about how we are protecting your information.

---

*This Privacy Policy was generated using TermsZipp. While this document covers common privacy requirements, we strongly recommend having it reviewed by a qualified legal professional to ensure it meets all applicable laws and regulations for your specific business and jurisdiction.*
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
              <Shield className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold">Privacy Policy Generator</h1>
              <p className="text-muted-foreground">Create a comprehensive GDPR & CCPA compliant privacy policy</p>
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
                  {s === 1 ? 'Business' : s === 2 ? 'Data' : s === 3 ? 'Services' : s === 4 ? 'Compliance' : 'Generate'}
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
                  <Label htmlFor="contactEmail">Privacy Contact Email *</Label>
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
                    <Label>Business Type</Label>
                    <Select value={formData.businessType} onValueChange={(v) => updateForm('businessType', v)}>
                      <SelectTrigger className="mt-1">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="saas">SaaS / Software</SelectItem>
                        <SelectItem value="ecommerce">E-commerce</SelectItem>
                        <SelectItem value="blog">Blog / Content</SelectItem>
                        <SelectItem value="agency">Agency / Services</SelectItem>
                        <SelectItem value="marketplace">Marketplace</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="flex items-center space-x-2 pt-2">
                  <Checkbox
                    id="hasMobileApp"
                    checked={formData.hasMobileApp}
                    onCheckedChange={(checked) => updateForm('hasMobileApp', checked as boolean)}
                  />
                  <Label htmlFor="hasMobileApp" className="text-sm font-normal">I also have a mobile app</Label>
                </div>
              </div>

              <div className="flex justify-end mt-6">
                <Button onClick={() => setStep(2)} className="btn-gradient">
                  Next Step <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </Card>
          )}

          {/* Step 2: Data Collection */}
          {step === 2 && (
            <Card className="p-6">
              <h2 className="text-lg font-semibold mb-6">Data Collection</h2>
              <p className="text-sm text-muted-foreground mb-4">What personal information do you collect from users?</p>
              
              <div className="grid grid-cols-2 gap-3">
                {[
                  { key: 'collectsName', label: 'Full name' },
                  { key: 'collectsEmail', label: 'Email address' },
                  { key: 'collectsPhone', label: 'Phone number' },
                  { key: 'collectsAddress', label: 'Mailing address' },
                  { key: 'collectsPayment', label: 'Payment / billing info' },
                  { key: 'collectsLocation', label: 'Location / GPS data' },
                  { key: 'collectsDeviceInfo', label: 'Device & browser info' },
                  { key: 'collectsBirthdate', label: 'Date of birth' },
                  { key: 'collectsSocialProfiles', label: 'Social media profiles' },
                  { key: 'collectsEmploymentInfo', label: 'Employment info' },
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

              <h3 className="text-md font-medium mt-6 mb-4">Site Features</h3>
              <div className="grid grid-cols-2 gap-3">
                {[
                  { key: 'hasUserAccounts', label: 'User accounts / login' },
                  { key: 'hasUserProfiles', label: 'User profiles' },
                  { key: 'allowsUserContent', label: 'User-generated content' },
                  { key: 'hasComments', label: 'Comments / forums' },
                  { key: 'hasNewsletter', label: 'Email newsletter' },
                  { key: 'sellsProducts', label: 'Sells physical products' },
                  { key: 'sellsDigitalProducts', label: 'Sells digital products' },
                  { key: 'hasSubscriptions', label: 'Subscription billing' },
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

          {/* Step 3: Third-Party Services & Cookies */}
          {step === 3 && (
            <Card className="p-6">
              <h2 className="text-lg font-semibold mb-6">Third-Party Services</h2>
              <p className="text-sm text-muted-foreground mb-4">Which services do you use?</p>
              
              <div className="grid grid-cols-2 gap-3">
                {[
                  { key: 'usesGoogleAnalytics', label: 'Google Analytics' },
                  { key: 'usesStripe', label: 'Stripe (payments)' },
                  { key: 'usesPaypal', label: 'PayPal' },
                  { key: 'usesFacebookPixel', label: 'Facebook Pixel' },
                  { key: 'usesMailchimp', label: 'Mailchimp' },
                  { key: 'usesIntercom', label: 'Intercom' },
                  { key: 'usesHotjar', label: 'Hotjar' },
                  { key: 'usesCloudflare', label: 'Cloudflare' },
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

              <div className="mt-4">
                <Label htmlFor="otherServices">Other services (optional)</Label>
                <Input
                  id="otherServices"
                  value={formData.otherServices}
                  onChange={(e) => updateForm('otherServices', e.target.value)}
                  placeholder="e.g., Zendesk, HubSpot, Segment..."
                  className="mt-1"
                />
              </div>

              <h3 className="text-md font-medium mt-6 mb-4">Cookie Types</h3>
              <div className="space-y-3">
                {[
                  { key: 'usesEssentialCookies', label: 'Essential cookies', desc: 'Required for basic site functionality' },
                  { key: 'usesFunctionalCookies', label: 'Functional cookies', desc: 'Remember preferences and settings' },
                  { key: 'usesAnalyticsCookies', label: 'Analytics cookies', desc: 'Track usage and performance' },
                  { key: 'usesAdvertisingCookies', label: 'Advertising cookies', desc: 'Targeted ads and remarketing' },
                ].map(({ key, label, desc }) => (
                  <div key={key} className="flex items-start space-x-2">
                    <Checkbox
                      id={key}
                      checked={formData[key as keyof FormData] as boolean}
                      onCheckedChange={(checked) => updateForm(key as keyof FormData, checked as boolean)}
                      className="mt-0.5"
                    />
                    <div>
                      <Label htmlFor={key} className="text-sm font-normal">{label}</Label>
                      <p className="text-xs text-muted-foreground">{desc}</p>
                    </div>
                  </div>
                ))}
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

          {/* Step 4: Compliance */}
          {step === 4 && (
            <Card className="p-6">
              <h2 className="text-lg font-semibold mb-6">Compliance & Legal</h2>
              
              <div className="space-y-4">
                <h3 className="text-md font-medium">Privacy Regulations</h3>
                <div className="grid grid-cols-2 gap-3">
                  {[
                    { key: 'gdprCompliant', label: 'GDPR (EU users)', desc: 'European data protection' },
                    { key: 'ccpaCompliant', label: 'CCPA (California)', desc: 'California privacy rights' },
                    { key: 'coppaCompliant', label: 'COPPA (Children)', desc: 'May have users under 13' },
                    { key: 'hipaaCompliant', label: 'HIPAA (Health)', desc: 'Health information' },
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

                <div className="pt-4">
                  <Label>Data Retention Period</Label>
                  <Select value={formData.dataRetentionPeriod} onValueChange={(v) => updateForm('dataRetentionPeriod', v)}>
                    <SelectTrigger className="mt-1">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1-year">1 year</SelectItem>
                      <SelectItem value="2-years">2 years</SelectItem>
                      <SelectItem value="3-years">3 years</SelectItem>
                      <SelectItem value="5-years">5 years</SelectItem>
                      <SelectItem value="7-years">7 years</SelectItem>
                      <SelectItem value="indefinite">As long as necessary</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-3 pt-4">
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="allowsInternationalTransfers"
                      checked={formData.allowsInternationalTransfers}
                      onCheckedChange={(checked) => updateForm('allowsInternationalTransfers', checked as boolean)}
                    />
                    <Label htmlFor="allowsInternationalTransfers" className="text-sm font-normal">
                      Data may be transferred internationally
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="hasDataProcessingAgreements"
                      checked={formData.hasDataProcessingAgreements}
                      onCheckedChange={(checked) => updateForm('hasDataProcessingAgreements', checked as boolean)}
                    />
                    <Label htmlFor="hasDataProcessingAgreements" className="text-sm font-normal">
                      We have Data Processing Agreements with vendors
                    </Label>
                  </div>
                </div>
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
                documentType="Privacy Policy"
                documentTypeSlug="privacy-policy"
                formData={{ ...formData }}
              />

              {/* Disclaimer */}
              <Card className="p-4 bg-amber-50 border-amber-200">
                <div className="flex gap-3">
                  <AlertTriangle className="h-5 w-5 text-amber-600 shrink-0" />
                  <div className="text-sm text-amber-800">
                    <strong>Legal Disclaimer:</strong> This privacy policy template covers common requirements but may not address all legal requirements for your specific business, industry, or jurisdiction. We strongly recommend having this document reviewed by a qualified attorney.
                  </div>
                </div>
              </Card>

              <div className="flex justify-between">
                <Button variant="outline" onClick={() => setStep(4)}>
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
