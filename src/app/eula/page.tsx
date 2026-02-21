"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Textarea } from "@/components/ui/textarea";
import { 
  ScrollText, ArrowLeft, ArrowRight,
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
  // Company Info
  companyName: string;
  appName: string;
  websiteUrl: string;
  contactEmail: string;
  supportEmail: string;
  companyAddress: string;
  country: string;
  
  // Application Type
  isMobileApp: boolean;
  isDesktopApp: boolean;
  isWebApp: boolean;
  isSaaS: boolean;
  isBrowserExtension: boolean;
  isPlugin: boolean;
  isAPI: boolean;
  
  // Platforms
  supportsIOS: boolean;
  supportsAndroid: boolean;
  supportsWindows: boolean;
  supportsMac: boolean;
  supportsLinux: boolean;
  supportsWeb: boolean;
  
  // License Type
  licenseType: string;
  isFreeApp: boolean;
  hasFreeTier: boolean;
  hasPaidTiers: boolean;
  isOpenSource: boolean;
  
  // License Grant
  allowsPersonalUse: boolean;
  allowsCommercialUse: boolean;
  allowsEducationalUse: boolean;
  allowsGovernmentUse: boolean;
  maxInstallations: string;
  maxUsers: string;
  isTransferable: boolean;
  isSublicensable: boolean;
  
  // Features & Functionality
  hasUserAccounts: boolean;
  collectsData: boolean;
  hasAnalytics: boolean;
  hasCloudStorage: boolean;
  hasOfflineMode: boolean;
  requiresInternet: boolean;
  hasThirdPartyIntegrations: boolean;
  
  // Content & UGC
  allowsUserContent: boolean;
  allowsUserUploads: boolean;
  userContentLicense: string;
  moderatesContent: boolean;
  
  // Monetization
  hasSubscription: boolean;
  hasOneTimePurchase: boolean;
  hasInAppPurchases: boolean;
  hasMicrotransactions: boolean;
  hasAds: boolean;
  hasVirtualCurrency: boolean;
  
  // Restrictions
  restrictReverseEngineering: boolean;
  restrictDecompilation: boolean;
  restrictModification: boolean;
  restrictRedistribution: boolean;
  restrictCommercialUse: boolean;
  restrictCompetitiveUse: boolean;
  restrictBenchmarking: boolean;
  restrictAutomatedUse: boolean;
  restrictScraping: boolean;
  restrictVPN: boolean;
  restrictVirtualization: boolean;
  
  // Technical
  hasAutoUpdates: boolean;
  collectsCrashReports: boolean;
  collectsUsageAnalytics: boolean;
  requiresActivation: boolean;
  hasDRM: boolean;
  hasLicenseKey: boolean;
  
  // Support & Maintenance
  providesTechnicalSupport: boolean;
  supportLevel: string;
  providesUpdates: boolean;
  updatePeriod: string;
  providesDocumentation: boolean;
  
  // Warranties & Liability
  hasLimitedWarranty: boolean;
  warrantyPeriod: string;
  hasServiceLevelAgreement: boolean;
  maxLiability: string;
  
  // Termination
  canTerminateForBreach: boolean;
  canTerminateForConvenience: boolean;
  terminationNotice: string;
  dataRetentionAfterTermination: string;
  
  // Legal
  governingLaw: string;
  jurisdiction: string;
  hasArbitration: boolean;
  arbitrationProvider: string;
  hasClassActionWaiver: boolean;
  
  // Compliance
  gdprCompliant: boolean;
  ccpaCompliant: boolean;
  coppaCompliant: boolean;
  hipaaCompliant: boolean;
  exportControlled: boolean;
  
  // Additional
  customTerms: string;
}

const defaultFormData: FormData = {
  companyName: "",
  appName: "",
  websiteUrl: "",
  contactEmail: "",
  supportEmail: "",
  companyAddress: "",
  country: "United States",
  
  isMobileApp: false,
  isDesktopApp: false,
  isWebApp: true,
  isSaaS: true,
  isBrowserExtension: false,
  isPlugin: false,
  isAPI: false,
  
  supportsIOS: false,
  supportsAndroid: false,
  supportsWindows: false,
  supportsMac: false,
  supportsLinux: false,
  supportsWeb: true,
  
  licenseType: "proprietary",
  isFreeApp: false,
  hasFreeTier: true,
  hasPaidTiers: true,
  isOpenSource: false,
  
  allowsPersonalUse: true,
  allowsCommercialUse: true,
  allowsEducationalUse: true,
  allowsGovernmentUse: true,
  maxInstallations: "unlimited",
  maxUsers: "1",
  isTransferable: false,
  isSublicensable: false,
  
  hasUserAccounts: true,
  collectsData: true,
  hasAnalytics: true,
  hasCloudStorage: false,
  hasOfflineMode: false,
  requiresInternet: true,
  hasThirdPartyIntegrations: true,
  
  allowsUserContent: false,
  allowsUserUploads: false,
  userContentLicense: "limited",
  moderatesContent: false,
  
  hasSubscription: true,
  hasOneTimePurchase: false,
  hasInAppPurchases: false,
  hasMicrotransactions: false,
  hasAds: false,
  hasVirtualCurrency: false,
  
  restrictReverseEngineering: true,
  restrictDecompilation: true,
  restrictModification: true,
  restrictRedistribution: true,
  restrictCommercialUse: false,
  restrictCompetitiveUse: true,
  restrictBenchmarking: true,
  restrictAutomatedUse: true,
  restrictScraping: true,
  restrictVPN: false,
  restrictVirtualization: false,
  
  hasAutoUpdates: true,
  collectsCrashReports: true,
  collectsUsageAnalytics: true,
  requiresActivation: false,
  hasDRM: false,
  hasLicenseKey: false,
  
  providesTechnicalSupport: true,
  supportLevel: "standard",
  providesUpdates: true,
  updatePeriod: "subscription",
  providesDocumentation: true,
  
  hasLimitedWarranty: false,
  warrantyPeriod: "30",
  hasServiceLevelAgreement: false,
  maxLiability: "fees-paid",
  
  canTerminateForBreach: true,
  canTerminateForConvenience: true,
  terminationNotice: "30",
  dataRetentionAfterTermination: "30",
  
  governingLaw: "State of Delaware",
  jurisdiction: "Delaware, United States",
  hasArbitration: true,
  arbitrationProvider: "AAA",
  hasClassActionWaiver: true,
  
  gdprCompliant: true,
  ccpaCompliant: true,
  coppaCompliant: false,
  hipaaCompliant: false,
  exportControlled: true,
  
  customTerms: "",
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

    // Build application type string
    const appTypes = [
      formData.isMobileApp && "mobile application",
      formData.isDesktopApp && "desktop software",
      formData.isWebApp && "web application",
      formData.isSaaS && "software-as-a-service (SaaS)",
      formData.isBrowserExtension && "browser extension",
      formData.isPlugin && "plugin/add-on",
      formData.isAPI && "application programming interface (API)",
    ].filter(Boolean);
    const appTypeString = appTypes.length > 0 ? appTypes.join(", ") : "software";

    // Build platforms string
    const platforms = [
      formData.supportsIOS && "iOS",
      formData.supportsAndroid && "Android",
      formData.supportsWindows && "Windows",
      formData.supportsMac && "macOS",
      formData.supportsLinux && "Linux",
      formData.supportsWeb && "Web browsers",
    ].filter(Boolean);
    const platformString = platforms.length > 0 ? platforms.join(", ") : "various platforms";

    let eula = `# End User License Agreement (EULA)

**Effective Date: ${today}**
**Last Updated: ${today}**

---

## IMPORTANT — READ CAREFULLY

**THIS END USER LICENSE AGREEMENT ("AGREEMENT" OR "EULA") IS A LEGAL CONTRACT BETWEEN YOU ("USER," "YOU," OR "YOUR") AND ${(formData.companyName || "[COMPANY NAME]").toUpperCase()} ("COMPANY," "LICENSOR," "WE," "US," OR "OUR"). BY INSTALLING, COPYING, ACCESSING, OR OTHERWISE USING ${(formData.appName || "[APPLICATION NAME]").toUpperCase()} (THE "SOFTWARE"), YOU ACKNOWLEDGE THAT YOU HAVE READ, UNDERSTOOD, AND AGREE TO BE BOUND BY THE TERMS AND CONDITIONS OF THIS AGREEMENT.**

**IF YOU DO NOT AGREE TO THESE TERMS, DO NOT INSTALL, ACCESS, OR USE THE SOFTWARE. IF YOU HAVE ALREADY PAID FOR THE SOFTWARE, YOU MAY BE ENTITLED TO A REFUND IN ACCORDANCE WITH OUR REFUND POLICY.**

**IF YOU ARE ENTERING INTO THIS AGREEMENT ON BEHALF OF A COMPANY OR OTHER LEGAL ENTITY, YOU REPRESENT THAT YOU HAVE THE AUTHORITY TO BIND SUCH ENTITY TO THIS AGREEMENT, IN WHICH CASE "YOU" OR "YOUR" SHALL REFER TO SUCH ENTITY.**

---

## 1. Definitions

In this Agreement, the following terms shall have the meanings set forth below:

**1.1 "Authorized User"** means an individual who is authorized by you to use the Software and who has been supplied user identification and password credentials by you (or by the Company at your request).

**1.2 "Documentation"** means the user guides, online help, release notes, training materials, and other documentation provided by the Company regarding the Software.

**1.3 "Intellectual Property Rights"** means all patent rights, copyright rights, moral rights, rights of publicity, trademark, trade dress and service mark rights, goodwill, trade secret rights, and other intellectual property rights as may now exist or hereafter come into existence, and all applications and registrations, renewals, and extensions thereof.

**1.4 "License Key"** means a unique code or file provided by the Company that enables you to activate and use the Software.

**1.5 "Software"** means ${formData.appName || "[Application Name]"}, a ${appTypeString}, including any Updates, Documentation, and related materials provided by the Company.

**1.6 "Subscription Period"** means the period during which you have paid for and are entitled to access and use the Software.

**1.7 "Updates"** means any updates, upgrades, patches, bug fixes, new versions, or other modifications to the Software that the Company may provide.

**1.8 "User Content"** means any data, content, or materials that you or your Authorized Users upload, submit, store, send, or receive through the Software.

---

## 2. License Grant

### 2.1 Grant of License

Subject to your compliance with this Agreement and, if applicable, payment of all applicable fees, the Company hereby grants you a **limited, non-exclusive, ${formData.isTransferable ? "" : "non-transferable, "}${formData.isSublicensable ? "" : "non-sublicensable, "}revocable license** to:

`;

    // License permissions based on settings
    const licensePermissions = [];
    if (formData.isMobileApp || formData.isDesktopApp) {
      licensePermissions.push(`Download and install the Software on ${formData.maxInstallations === "unlimited" ? "devices" : `up to ${formData.maxInstallations} device(s)`} that you own or control`);
    }
    if (formData.isWebApp || formData.isSaaS) {
      licensePermissions.push("Access and use the Software via the internet through your web browser or authorized client application");
    }
    if (formData.allowsPersonalUse) {
      licensePermissions.push("Use the Software for personal, non-commercial purposes");
    }
    if (formData.allowsCommercialUse) {
      licensePermissions.push("Use the Software for internal business and commercial purposes");
    }
    if (formData.allowsEducationalUse) {
      licensePermissions.push("Use the Software for educational and academic purposes");
    }
    licensePermissions.push("Make one (1) backup copy of the Software for archival purposes only");

    eula += licensePermissions.map(p => `- ${p}`).join('\n') + '\n';

    eula += `
### 2.2 License Restrictions

Except as expressly permitted in this Agreement, you shall NOT:

`;

    const restrictions = [];
    if (formData.restrictReverseEngineering) {
      restrictions.push("Reverse engineer, disassemble, decompile, decode, or otherwise attempt to derive or gain access to the source code of the Software or any part thereof");
    }
    if (formData.restrictDecompilation) {
      restrictions.push("Translate, adapt, or create derivative works based on the Software or any part thereof, except as expressly permitted by applicable law");
    }
    if (formData.restrictModification) {
      restrictions.push("Modify, alter, tamper with, repair, or otherwise create derivative works of the Software");
    }
    if (formData.restrictRedistribution) {
      restrictions.push("Copy, distribute, sublicense, lease, rent, loan, sell, resell, assign, or otherwise transfer rights to the Software to any third party");
    }
    restrictions.push("Remove, alter, or obscure any proprietary notices, labels, or marks on the Software or Documentation");
    restrictions.push("Use the Software to develop or operate a product or service that is competitive with the Software or any other product or service offered by the Company");
    if (formData.restrictBenchmarking) {
      restrictions.push("Perform or disclose any benchmark or performance tests on the Software without the Company's prior written consent");
    }
    if (formData.restrictAutomatedUse) {
      restrictions.push("Use any automated means, including bots, scrapers, or scripts, to access, interact with, or collect data from the Software, except as expressly authorized");
    }
    if (formData.restrictScraping) {
      restrictions.push("Scrape, harvest, or collect any information from the Software using automated means");
    }
    restrictions.push("Use the Software in any manner that could damage, disable, overburden, or impair the Software or interfere with any other party's use of the Software");
    restrictions.push("Use the Software in violation of any applicable laws, rules, or regulations");
    restrictions.push("Attempt to gain unauthorized access to the Software, other accounts, computer systems, or networks connected to the Software");
    restrictions.push("Use the Software to transmit any viruses, worms, malware, or other malicious code");
    restrictions.push("Impersonate any person or entity or misrepresent your affiliation with any person or entity");
    if (formData.restrictVirtualization) {
      restrictions.push("Run the Software in a virtualized environment or through virtual machine technology without prior written consent");
    }

    eula += restrictions.map(r => `- ${r}`).join('\n\n') + '\n';

    eula += `
### 2.3 Number of Users

`;

    if (formData.maxUsers === "1") {
      eula += `This license is granted for use by one (1) individual only. You may not share your account credentials or allow others to use the Software under your license.\n`;
    } else if (formData.maxUsers === "unlimited") {
      eula += `This license permits unlimited users within your organization, subject to the terms of your subscription plan.\n`;
    } else {
      eula += `This license is granted for use by up to ${formData.maxUsers} Authorized Users. Each Authorized User must have a unique account and may not share account credentials.\n`;
    }

    eula += `
### 2.4 Reservation of Rights

The Company reserves all rights not expressly granted to you in this Agreement. The Software is licensed, not sold, and this Agreement does not grant you any rights to the Company's trademarks, service marks, or logos.

---

## 3. Intellectual Property

### 3.1 Ownership

The Software, including all copies, modifications, enhancements, and derivative works thereof, and all Intellectual Property Rights therein, are and shall remain the sole and exclusive property of the Company and its licensors. You acknowledge that the Software and its structure, organization, and source code constitute valuable trade secrets of the Company.

### 3.2 Third-Party Components

The Software may include third-party software components that are subject to separate license terms. A list of third-party components and their licenses is available ${formData.providesDocumentation ? "in the Documentation or " : ""}upon request.

### 3.3 Feedback

If you provide any feedback, suggestions, or recommendations regarding the Software ("Feedback"), you hereby grant the Company a perpetual, irrevocable, worldwide, royalty-free license to use, modify, incorporate, and otherwise exploit such Feedback for any purpose without compensation or attribution to you.

### 3.4 Trademarks

${formData.appName || "[Application Name]"} and all related names, logos, product and service names, designs, and slogans are trademarks of the Company or its affiliates. You may not use such marks without the prior written permission of the Company.

---

`;

    // User Accounts Section
    if (formData.hasUserAccounts) {
      eula += `## 4. User Accounts

### 4.1 Account Registration

To access certain features of the Software, you may be required to create an account. When registering, you agree to:

- Provide accurate, current, and complete information
- Maintain and promptly update your account information
- Maintain the security and confidentiality of your login credentials
- Accept responsibility for all activities that occur under your account
- Notify us immediately of any unauthorized use of your account

### 4.2 Account Security

You are solely responsible for maintaining the confidentiality of your account credentials. You agree not to:

- Share your account credentials with any third party
- Allow any other person to access your account
- Use the account of another user without permission

### 4.3 Account Suspension or Termination

We reserve the right to suspend, disable, or terminate your account at any time if:

- You violate any term of this Agreement
- We reasonably believe your account has been compromised
- Your use of the Software poses a security risk
- You fail to pay applicable fees

---

`;
    }

    // Data Collection Section
    if (formData.collectsData) {
      const sectionNum = formData.hasUserAccounts ? 5 : 4;
      eula += `## ${sectionNum}. Data Collection and Privacy

### ${sectionNum}.1 Information We Collect

In connection with your use of the Software, we may collect and process:

- Account information (name, email, payment details)
- Usage data and analytics
${formData.collectsCrashReports ? "- Crash reports and diagnostic information\n" : ""}${formData.collectsUsageAnalytics ? "- Feature usage statistics\n" : ""}- Device information and identifiers
- Log files and technical data

### ${sectionNum}.2 Privacy Policy

Our collection and use of your personal information is governed by our Privacy Policy, available at ${formData.websiteUrl || "[Website URL]"}/privacy. By using the Software, you consent to the collection and use of your information as described in our Privacy Policy.

### ${sectionNum}.3 Data Security

We implement appropriate technical and organizational measures to protect your data. However, no method of transmission over the Internet or electronic storage is 100% secure, and we cannot guarantee absolute security.

${formData.gdprCompliant ? `### ${sectionNum}.4 GDPR Compliance

If you are located in the European Economic Area (EEA), you have certain rights under the General Data Protection Regulation (GDPR), including the right to access, rectify, erase, or port your personal data. For more information, please see our Privacy Policy.

` : ""}${formData.ccpaCompliant ? `### ${sectionNum}.${formData.gdprCompliant ? "5" : "4"} CCPA Compliance

If you are a California resident, you have certain rights under the California Consumer Privacy Act (CCPA). We do not sell your personal information. For more information, please see our Privacy Policy.

` : ""}---

`;
    }

    // User Content Section
    if (formData.allowsUserContent || formData.allowsUserUploads) {
      const sectionNum = (formData.hasUserAccounts ? 1 : 0) + (formData.collectsData ? 1 : 0) + 4;
      eula += `## ${sectionNum}. User Content

### ${sectionNum}.1 Your Content

The Software may allow you to submit, upload, store, or share content ("User Content"). You retain ownership of your User Content, subject to the license granted below.

### ${sectionNum}.2 License to User Content

By submitting User Content, you grant the Company a ${formData.userContentLicense === "broad" ? "perpetual, irrevocable, worldwide, royalty-free, sublicensable" : "non-exclusive, worldwide, royalty-free"} license to use, reproduce, modify, display, distribute, and create derivative works of your User Content solely for the purposes of:

- Operating and improving the Software
- Providing the services you request
${formData.userContentLicense === "broad" ? "- Marketing and promotional purposes\n" : ""}- Complying with legal obligations

### ${sectionNum}.3 User Content Representations

You represent and warrant that:

- You own or have the necessary rights to your User Content
- Your User Content does not infringe any third-party rights
- Your User Content does not violate any applicable laws
- Your User Content does not contain any harmful, offensive, or illegal material

### ${sectionNum}.4 Prohibited Content

You agree not to submit User Content that:

- Is illegal, harmful, threatening, abusive, harassing, defamatory, or invasive of privacy
- Infringes any patent, trademark, trade secret, copyright, or other intellectual property rights
- Contains viruses, malware, or other harmful code
- Constitutes unsolicited advertising, spam, or pyramid schemes
- Impersonates any person or entity

${formData.moderatesContent ? `### ${sectionNum}.5 Content Moderation

We reserve the right, but are not obligated, to monitor, review, edit, or remove any User Content at our sole discretion. We may remove or disable access to any User Content that we determine violates this Agreement or is otherwise objectionable.

` : ""}---

`;
    }

    // Payment Section
    if (formData.hasSubscription || formData.hasOneTimePurchase || formData.hasInAppPurchases) {
      const sectionNum = (formData.hasUserAccounts ? 1 : 0) + 
                          (formData.collectsData ? 1 : 0) + 
                          (formData.allowsUserContent || formData.allowsUserUploads ? 1 : 0) + 4;
      
      eula += `## ${sectionNum}. Fees and Payment

### ${sectionNum}.1 Fees

`;
      if (formData.hasFreeTier) {
        eula += `The Software offers both free and paid tiers. Certain features are available only with a paid subscription or purchase.\n\n`;
      }

      if (formData.hasSubscription) {
        eula += `### ${sectionNum}.2 Subscription Terms

If you purchase a subscription to the Software:

**Billing:** You will be billed in advance on a recurring basis (monthly, annually, or as specified at the time of purchase).

**Automatic Renewal:** Unless you cancel your subscription before the end of the current billing period, your subscription will automatically renew for an additional period of the same length.

**Price Changes:** We may change subscription fees upon thirty (30) days' notice. Price changes will take effect at the start of the next billing period following the notice.

**Cancellation:** You may cancel your subscription at any time through your account settings or by contacting us at ${formData.supportEmail || formData.contactEmail || "[Support Email]"}. Cancellation will be effective at the end of the current billing period.

`;
      }

      if (formData.hasInAppPurchases || formData.hasMicrotransactions) {
        eula += `### ${sectionNum}.${formData.hasSubscription ? "3" : "2"} In-App Purchases

The Software may offer in-app purchases, including but not limited to:

- Premium features or functionality
- Virtual goods or currency
- Subscription upgrades

All in-app purchases are final and non-refundable except as required by applicable law or as otherwise stated in our Refund Policy. You are responsible for managing your in-app purchases.

`;
      }

      if (formData.hasVirtualCurrency) {
        const vcNum = (formData.hasSubscription ? 1 : 0) + (formData.hasInAppPurchases || formData.hasMicrotransactions ? 1 : 0) + 2;
        eula += `### ${sectionNum}.${vcNum} Virtual Currency

The Software may include virtual currency, points, or credits ("Virtual Currency"). Virtual Currency:

- Has no real-world monetary value and cannot be exchanged for cash
- Is non-transferable and non-refundable
- May expire or be forfeited upon termination of your account
- May be modified or discontinued at any time

`;
      }

      eula += `### ${sectionNum}.${formData.hasSubscription ? (formData.hasInAppPurchases ? (formData.hasVirtualCurrency ? "5" : "4") : (formData.hasVirtualCurrency ? "4" : "3")) : "2"} Taxes

You are responsible for paying all applicable taxes associated with your use of the Software. If we are required to collect or pay taxes, those taxes will be charged to you.

---

`;
    }

    // Updates Section
    if (formData.hasAutoUpdates || formData.providesUpdates) {
      const sectionNum = (formData.hasUserAccounts ? 1 : 0) + 
                          (formData.collectsData ? 1 : 0) + 
                          (formData.allowsUserContent || formData.allowsUserUploads ? 1 : 0) + 
                          (formData.hasSubscription || formData.hasOneTimePurchase || formData.hasInAppPurchases ? 1 : 0) + 4;
      
      eula += `## ${sectionNum}. Updates and Modifications

### ${sectionNum}.1 Software Updates

`;
      if (formData.hasAutoUpdates) {
        eula += `The Software may automatically download and install updates without prior notice. These updates may include bug fixes, security patches, new features, or other improvements. By using the Software, you consent to such automatic updates.

`;
      }

      eula += `### ${sectionNum}.2 Modifications to the Software

We reserve the right to modify, suspend, or discontinue, temporarily or permanently, the Software or any features or portions thereof at any time with or without notice. You agree that we will not be liable to you or any third party for any modification, suspension, or discontinuance of the Software.

### ${sectionNum}.3 Modifications to Terms

We may modify this Agreement from time to time. We will notify you of any material changes by posting the new Agreement on our website or through the Software. Your continued use of the Software after such modifications constitutes your acceptance of the updated Agreement.

---

`;
    }

    // Support Section
    if (formData.providesTechnicalSupport) {
      const sectionNum = (formData.hasUserAccounts ? 1 : 0) + 
                          (formData.collectsData ? 1 : 0) + 
                          (formData.allowsUserContent || formData.allowsUserUploads ? 1 : 0) + 
                          (formData.hasSubscription || formData.hasOneTimePurchase || formData.hasInAppPurchases ? 1 : 0) + 
                          (formData.hasAutoUpdates || formData.providesUpdates ? 1 : 0) + 4;
      
      eula += `## ${sectionNum}. Technical Support

### ${sectionNum}.1 Support Services

`;
      if (formData.supportLevel === "standard") {
        eula += `We provide standard technical support for the Software via email at ${formData.supportEmail || formData.contactEmail || "[Support Email]"}. Support is available during regular business hours and response times may vary.

`;
      } else if (formData.supportLevel === "premium") {
        eula += `We provide premium technical support for the Software, including:

- Email support with priority response times
- Phone support during business hours
- Access to knowledge base and documentation
- Technical assistance and troubleshooting

`;
      } else if (formData.supportLevel === "enterprise") {
        eula += `Enterprise customers receive dedicated technical support, including:

- 24/7 priority support
- Dedicated account manager
- Phone, email, and chat support
- Implementation assistance
- Training and onboarding

`;
      }

      eula += `### ${sectionNum}.2 Support Limitations

Technical support does not include:

- Support for third-party software or hardware
- Support for customizations or modifications made by you
- Support for issues caused by your misuse of the Software
- Data recovery or migration services
- Training beyond basic documentation

---

`;
    }

    // Disclaimers Section
    const disclaimerSectionNum = (formData.hasUserAccounts ? 1 : 0) + 
                                  (formData.collectsData ? 1 : 0) + 
                                  (formData.allowsUserContent || formData.allowsUserUploads ? 1 : 0) + 
                                  (formData.hasSubscription || formData.hasOneTimePurchase || formData.hasInAppPurchases ? 1 : 0) + 
                                  (formData.hasAutoUpdates || formData.providesUpdates ? 1 : 0) + 
                                  (formData.providesTechnicalSupport ? 1 : 0) + 4;

    eula += `## ${disclaimerSectionNum}. Disclaimer of Warranties

### ${disclaimerSectionNum}.1 "As Is" Basis

THE SOFTWARE IS PROVIDED "AS IS" AND "AS AVAILABLE" WITHOUT WARRANTIES OF ANY KIND, EITHER EXPRESS OR IMPLIED. TO THE FULLEST EXTENT PERMITTED BY APPLICABLE LAW, THE COMPANY DISCLAIMS ALL WARRANTIES, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO:

- IMPLIED WARRANTIES OF MERCHANTABILITY
- FITNESS FOR A PARTICULAR PURPOSE
- TITLE AND NON-INFRINGEMENT
- ACCURACY, RELIABILITY, OR COMPLETENESS
- QUIET ENJOYMENT
- SYSTEM INTEGRATION
- FREEDOM FROM VIRUSES OR OTHER HARMFUL CODE

### ${disclaimerSectionNum}.2 No Guarantee

THE COMPANY DOES NOT WARRANT THAT:

- THE SOFTWARE WILL MEET YOUR SPECIFIC REQUIREMENTS OR EXPECTATIONS
- THE SOFTWARE WILL BE UNINTERRUPTED, TIMELY, SECURE, OR ERROR-FREE
- THE RESULTS OBTAINED FROM THE USE OF THE SOFTWARE WILL BE ACCURATE OR RELIABLE
- ANY ERRORS OR DEFECTS IN THE SOFTWARE WILL BE CORRECTED
- THE SOFTWARE WILL BE COMPATIBLE WITH YOUR HARDWARE, SOFTWARE, OR NETWORK

### ${disclaimerSectionNum}.3 Beta Features

Any beta, preview, or early access features are provided "as is" and "as available" without any warranties. Beta features may contain bugs, errors, or other issues and may be discontinued at any time.

### ${disclaimerSectionNum}.4 Internet and Third-Party Risks

The Company is not responsible for any damage, loss, or injury resulting from:

- Viruses, malware, or other harmful code transmitted through the Software
- Unauthorized access to or use of our servers or your data
- Interruptions or cessation of transmission to or from the Software
- Errors or omissions in any content or data
- Any third-party services, websites, or content

---

## ${disclaimerSectionNum + 1}. Limitation of Liability

### ${disclaimerSectionNum + 1}.1 Exclusion of Damages

TO THE MAXIMUM EXTENT PERMITTED BY APPLICABLE LAW, IN NO EVENT SHALL ${(formData.companyName || "[COMPANY NAME]").toUpperCase()}, ITS AFFILIATES, DIRECTORS, OFFICERS, EMPLOYEES, AGENTS, SUPPLIERS, LICENSORS, OR SERVICE PROVIDERS BE LIABLE FOR ANY:

- INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, EXEMPLARY, OR PUNITIVE DAMAGES
- LOSS OF PROFITS, REVENUE, BUSINESS, GOODWILL, OR ANTICIPATED SAVINGS
- LOSS OF DATA, USE, OR OTHER INTANGIBLE LOSSES
- BUSINESS INTERRUPTION OR LOSS OF BUSINESS OPPORTUNITY
- COSTS OF PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES

ARISING OUT OF OR IN CONNECTION WITH THIS AGREEMENT OR THE USE OR INABILITY TO USE THE SOFTWARE, WHETHER BASED ON WARRANTY, CONTRACT, TORT (INCLUDING NEGLIGENCE), STRICT LIABILITY, OR ANY OTHER LEGAL THEORY, EVEN IF WE HAVE BEEN ADVISED OF THE POSSIBILITY OF SUCH DAMAGES.

### ${disclaimerSectionNum + 1}.2 Cap on Liability

`;
    if (formData.maxLiability === "fees-paid") {
      eula += `TO THE MAXIMUM EXTENT PERMITTED BY APPLICABLE LAW, OUR TOTAL CUMULATIVE LIABILITY TO YOU FOR ALL CLAIMS ARISING OUT OF OR RELATING TO THIS AGREEMENT OR THE SOFTWARE SHALL NOT EXCEED THE GREATER OF: (A) THE TOTAL AMOUNT YOU PAID TO US FOR THE SOFTWARE IN THE TWELVE (12) MONTHS PRECEDING THE EVENT GIVING RISE TO THE LIABILITY, OR (B) ONE HUNDRED DOLLARS ($100).

`;
    } else if (formData.maxLiability === "none") {
      eula += `TO THE MAXIMUM EXTENT PERMITTED BY APPLICABLE LAW, OUR TOTAL LIABILITY SHALL NOT EXCEED ONE HUNDRED DOLLARS ($100).

`;
    }

    eula += `### ${disclaimerSectionNum + 1}.3 Essential Basis

THE LIMITATIONS AND EXCLUSIONS IN THIS SECTION APPLY REGARDLESS OF WHETHER THE REMEDY FAILS OF ITS ESSENTIAL PURPOSE AND SHALL SURVIVE ANY TERMINATION OR EXPIRATION OF THIS AGREEMENT.

### ${disclaimerSectionNum + 1}.4 Jurisdictional Limitations

SOME JURISDICTIONS DO NOT ALLOW THE EXCLUSION OR LIMITATION OF CERTAIN WARRANTIES OR LIABILITY FOR CONSEQUENTIAL OR INCIDENTAL DAMAGES. IN SUCH JURISDICTIONS, OUR LIABILITY SHALL BE LIMITED TO THE MAXIMUM EXTENT PERMITTED BY APPLICABLE LAW.

---

## ${disclaimerSectionNum + 2}. Indemnification

### ${disclaimerSectionNum + 2}.1 Your Indemnification Obligations

You agree to indemnify, defend, and hold harmless ${formData.companyName || "[Company Name]"}, its affiliates, and their respective officers, directors, employees, agents, licensors, and suppliers from and against any and all claims, liabilities, damages, losses, costs, expenses, and fees (including reasonable attorneys' fees) arising from or relating to:

- Your use or misuse of the Software
- Your violation of this Agreement
- Your violation of any applicable laws, rules, or regulations
- Your violation of any third-party rights, including intellectual property rights
${formData.allowsUserContent || formData.allowsUserUploads ? "- Any User Content you submit through the Software\n" : ""}- Your negligent or wrongful conduct

### ${disclaimerSectionNum + 2}.2 Indemnification Procedure

We will provide you with prompt written notice of any claim subject to indemnification and will reasonably cooperate with you in the defense of such claim. We reserve the right, at our own expense, to assume the exclusive defense and control of any matter otherwise subject to indemnification by you.

---

## ${disclaimerSectionNum + 3}. Term and Termination

### ${disclaimerSectionNum + 3}.1 Term

This Agreement is effective until terminated. ${formData.hasSubscription ? "For subscription-based licenses, this Agreement will continue for the duration of your Subscription Period unless earlier terminated." : ""}

### ${disclaimerSectionNum + 3}.2 Termination by You

You may terminate this Agreement at any time by:

- Ceasing all use of the Software
- Uninstalling and destroying all copies of the Software in your possession
- Deleting your account (if applicable)
${formData.hasSubscription ? "- Canceling your subscription through your account settings\n" : ""}
### ${disclaimerSectionNum + 3}.3 Termination by Us

We may terminate or suspend your license and access to the Software immediately, without prior notice or liability, if:

- You breach any term of this Agreement
- You fail to pay any applicable fees when due
- We are required to do so by law
- We discontinue the Software or your geographic region
- We reasonably believe your use poses a security risk

${formData.canTerminateForConvenience ? `We may also terminate this Agreement for convenience upon ${formData.terminationNotice} days' written notice to you.

` : ""}### ${disclaimerSectionNum + 3}.4 Effect of Termination

Upon termination of this Agreement:

- All rights and licenses granted to you under this Agreement shall immediately cease
- You must cease all use of the Software
- You must uninstall, delete, and destroy all copies of the Software
- Any provisions that by their nature should survive termination shall survive, including but not limited to: ownership provisions, warranty disclaimers, limitation of liability, and dispute resolution

${formData.dataRetentionAfterTermination !== "0" ? `### ${disclaimerSectionNum + 3}.5 Data Retention

Upon termination, we will retain your data for ${formData.dataRetentionAfterTermination} days, after which it may be permanently deleted. You may request a copy of your data before this period expires by contacting us at ${formData.contactEmail || "[Contact Email]"}.

` : ""}---

`;

    // Export Compliance
    if (formData.exportControlled) {
      const exportSection = disclaimerSectionNum + 4;
      eula += `## ${exportSection}. Export Compliance

### ${exportSection}.1 Export Restrictions

The Software may be subject to export control laws and regulations, including the U.S. Export Administration Regulations. You agree to comply with all applicable export and re-export control laws and regulations.

### ${exportSection}.2 Prohibited Uses

You represent and warrant that:

- You are not located in a country subject to U.S. embargo
- You are not listed on any U.S. government prohibited or restricted parties list
- You will not use the Software for any purposes prohibited by export laws

---

`;
    }

    // Dispute Resolution
    const disputeSection = disclaimerSectionNum + (formData.exportControlled ? 5 : 4);
    eula += `## ${disputeSection}. Governing Law and Dispute Resolution

### ${disputeSection}.1 Governing Law

This Agreement shall be governed by and construed in accordance with the laws of ${formData.governingLaw || "the State of Delaware"}, without giving effect to any principles of conflicts of law.

### ${disputeSection}.2 Jurisdiction

`;

    if (formData.hasArbitration) {
      eula += `**PLEASE READ THIS SECTION CAREFULLY. IT AFFECTS YOUR RIGHTS AND HOW CLAIMS CAN BE RESOLVED.**

Any dispute, claim, or controversy arising out of or relating to this Agreement or the Software ("Dispute") shall be resolved exclusively through final and binding arbitration administered by ${formData.arbitrationProvider === "AAA" ? "the American Arbitration Association (AAA)" : formData.arbitrationProvider === "JAMS" ? "JAMS" : "an arbitration provider mutually agreed upon"} in accordance with its Commercial Arbitration Rules.

**Arbitration Terms:**

- The arbitration shall be conducted by a single arbitrator
- The arbitration shall take place in ${formData.jurisdiction || "Delaware, United States"}
- The arbitrator's decision shall be final and binding
- Judgment on the award may be entered in any court of competent jurisdiction
- Each party shall bear its own costs, and the parties shall share equally the costs of the arbitration

${formData.hasClassActionWaiver ? `### ${disputeSection}.3 Class Action Waiver

**YOU AND THE COMPANY AGREE THAT EACH MAY BRING CLAIMS AGAINST THE OTHER ONLY IN YOUR OR ITS INDIVIDUAL CAPACITY AND NOT AS A PLAINTIFF OR CLASS MEMBER IN ANY PURPORTED CLASS OR REPRESENTATIVE ACTION.**

Unless both you and the Company agree otherwise, the arbitrator may not consolidate more than one person's claims and may not otherwise preside over any form of a representative or class proceeding.

` : ""}`;
    } else {
      eula += `Any dispute arising out of or relating to this Agreement shall be subject to the exclusive jurisdiction of the courts located in ${formData.jurisdiction || "Delaware, United States"}, and you hereby consent to the personal jurisdiction of such courts.

`;
    }

    eula += `### ${disputeSection}.${formData.hasArbitration && formData.hasClassActionWaiver ? "4" : "3"} Waiver of Jury Trial

TO THE EXTENT PERMITTED BY APPLICABLE LAW, YOU AND THE COMPANY WAIVE ANY RIGHT TO A JURY TRIAL IN ANY ACTION OR PROCEEDING ARISING OUT OF OR RELATING TO THIS AGREEMENT OR THE SOFTWARE.

---

`;

    // General Provisions
    const generalSection = disputeSection + 1;
    eula += `## ${generalSection}. General Provisions

### ${generalSection}.1 Entire Agreement

This Agreement, together with the Privacy Policy and any other policies referenced herein, constitutes the entire agreement between you and the Company regarding the Software and supersedes all prior and contemporaneous agreements, proposals, or representations, written or oral.

### ${generalSection}.2 Severability

If any provision of this Agreement is held to be invalid, illegal, or unenforceable, the remaining provisions shall continue in full force and effect. The invalid provision shall be modified to the minimum extent necessary to make it valid and enforceable.

### ${generalSection}.3 Waiver

The failure of the Company to enforce any right or provision of this Agreement shall not constitute a waiver of such right or provision. Any waiver of any provision of this Agreement will be effective only if in writing and signed by the Company.

### ${generalSection}.4 Assignment

You may not assign or transfer this Agreement or any of your rights or obligations hereunder without the prior written consent of the Company. The Company may assign this Agreement without restriction.

### ${generalSection}.5 Force Majeure

The Company shall not be liable for any failure or delay in performance due to causes beyond its reasonable control, including but not limited to acts of God, natural disasters, war, terrorism, riots, embargoes, acts of civil or military authorities, fire, floods, accidents, pandemics, strikes, or shortages of transportation, facilities, fuel, energy, labor, or materials.

### ${generalSection}.6 Notices

All notices under this Agreement shall be in writing and shall be deemed given when delivered personally, sent by email with confirmation of receipt, or three (3) business days after being sent by certified mail, return receipt requested, to the addresses set forth below or to such other address as a party may designate in writing.

### ${generalSection}.7 Headings

The section headings in this Agreement are for convenience only and shall not affect the interpretation of this Agreement.

### ${generalSection}.8 No Third-Party Beneficiaries

This Agreement does not create any third-party beneficiary rights in any individual or entity.

---

`;

    // Custom Terms
    if (formData.customTerms && formData.customTerms.trim()) {
      eula += `## ${generalSection + 1}. Additional Terms

${formData.customTerms}

---

`;
    }

    // Contact Section
    const contactSection = generalSection + (formData.customTerms && formData.customTerms.trim() ? 2 : 1);
    eula += `## ${contactSection}. Contact Information

If you have any questions about this Agreement or the Software, please contact us:

**${formData.companyName || "[Company Name]"}**
${formData.companyAddress ? `Address: ${formData.companyAddress}\n` : ""}Email: ${formData.contactEmail || "[Contact Email]"}
${formData.supportEmail ? `Support: ${formData.supportEmail}\n` : ""}Website: ${formData.websiteUrl || "[Website URL]"}

---

## Acknowledgment

BY INSTALLING, ACCESSING, OR USING THE SOFTWARE, YOU ACKNOWLEDGE THAT YOU HAVE READ THIS AGREEMENT, UNDERSTAND IT, AND AGREE TO BE BOUND BY ITS TERMS AND CONDITIONS.

---

*This End User License Agreement was generated using TermsZipp. While this document covers common EULA requirements, we strongly recommend having it reviewed by a qualified legal professional to ensure compliance with all applicable laws and regulations for your specific software and jurisdiction.*
`;

    setGeneratedEULA(eula);
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
              <ScrollText className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold">EULA Generator</h1>
              <p className="text-muted-foreground">Create a comprehensive End User License Agreement for your software</p>
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
                  {s === 1 ? 'Software' : s === 2 ? 'License' : s === 3 ? 'Features' : s === 4 ? 'Legal' : 'Generate'}
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
          
          {/* Step 1: Software Info */}
          {step === 1 && (
            <Card className="p-6">
              <h2 className="text-lg font-semibold mb-6">Software Information</h2>
              
              <div className="space-y-4">
                <div>
                  <Label htmlFor="companyName">Company Name *</Label>
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
                  <Label htmlFor="appName">Application / Software Name *</Label>
                  <Input
                    id="appName"
                    value={formData.appName}
                    onChange={(e) => updateForm('appName', e.target.value)}
                    placeholder="My Awesome App"
                    className="mt-1"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
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
                    <Label htmlFor="contactEmail">Legal Email *</Label>
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
                </div>

                <div>
                  <Label htmlFor="supportEmail">Support Email (optional)</Label>
                  <Input
                    id="supportEmail"
                    type="email"
                    value={formData.supportEmail}
                    onChange={(e) => updateForm('supportEmail', e.target.value)}
                    placeholder="support@example.com"
                    className="mt-1"
                  />
                </div>

                <div>
                  <Label>Application Type</Label>
                  <div className="grid grid-cols-2 gap-3 mt-2">
                    {[
                      { key: 'isMobileApp', label: 'Mobile App' },
                      { key: 'isDesktopApp', label: 'Desktop Software' },
                      { key: 'isWebApp', label: 'Web Application' },
                      { key: 'isSaaS', label: 'SaaS' },
                      { key: 'isBrowserExtension', label: 'Browser Extension' },
                      { key: 'isPlugin', label: 'Plugin/Add-on' },
                      { key: 'isAPI', label: 'API Service' },
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

                {(formData.isMobileApp || formData.isDesktopApp) && (
                  <div>
                    <Label>Supported Platforms</Label>
                    <div className="grid grid-cols-3 gap-3 mt-2">
                      {[
                        { key: 'supportsIOS', label: 'iOS' },
                        { key: 'supportsAndroid', label: 'Android' },
                        { key: 'supportsWindows', label: 'Windows' },
                        { key: 'supportsMac', label: 'macOS' },
                        { key: 'supportsLinux', label: 'Linux' },
                        { key: 'supportsWeb', label: 'Web' },
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
                )}
              </div>

              <div className="flex justify-end mt-6">
                <Button onClick={() => setStep(2)} className="btn-gradient">
                  Next Step <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </Card>
          )}

          {/* Step 2: License Terms */}
          {step === 2 && (
            <Card className="p-6">
              <h2 className="text-lg font-semibold mb-6">License Terms</h2>
              
              <div className="mb-6">
                <Label>License Type</Label>
                <Select value={formData.licenseType} onValueChange={(v) => updateForm('licenseType', v)}>
                  <SelectTrigger className="mt-1">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="proprietary">Proprietary (Closed Source)</SelectItem>
                    <SelectItem value="freemium">Freemium</SelectItem>
                    <SelectItem value="subscription">Subscription-Based</SelectItem>
                    <SelectItem value="perpetual">Perpetual License</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <h3 className="text-md font-medium mb-3">Pricing Model</h3>
              <div className="grid grid-cols-2 gap-3 mb-6">
                {[
                  { key: 'isFreeApp', label: 'Completely free' },
                  { key: 'hasFreeTier', label: 'Has free tier' },
                  { key: 'hasPaidTiers', label: 'Has paid tiers' },
                  { key: 'hasSubscription', label: 'Subscription-based' },
                  { key: 'hasOneTimePurchase', label: 'One-time purchase' },
                  { key: 'hasInAppPurchases', label: 'In-app purchases' },
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

              <h3 className="text-md font-medium mb-3">License Permissions</h3>
              <div className="space-y-3 mb-6">
                {[
                  { key: 'allowsPersonalUse', label: 'Personal use' },
                  { key: 'allowsCommercialUse', label: 'Commercial use' },
                  { key: 'allowsEducationalUse', label: 'Educational use' },
                  { key: 'allowsGovernmentUse', label: 'Government use' },
                  { key: 'isTransferable', label: 'License is transferable' },
                  { key: 'isSublicensable', label: 'Can be sublicensed' },
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

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Max Installations</Label>
                  <Select value={formData.maxInstallations} onValueChange={(v) => updateForm('maxInstallations', v)}>
                    <SelectTrigger className="mt-1">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1">1 device</SelectItem>
                      <SelectItem value="3">3 devices</SelectItem>
                      <SelectItem value="5">5 devices</SelectItem>
                      <SelectItem value="unlimited">Unlimited</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label>Max Users</Label>
                  <Select value={formData.maxUsers} onValueChange={(v) => updateForm('maxUsers', v)}>
                    <SelectTrigger className="mt-1">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1">1 user</SelectItem>
                      <SelectItem value="5">Up to 5 users</SelectItem>
                      <SelectItem value="10">Up to 10 users</SelectItem>
                      <SelectItem value="unlimited">Unlimited</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
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

          {/* Step 3: Features & Restrictions */}
          {step === 3 && (
            <Card className="p-6">
              <h2 className="text-lg font-semibold mb-6">Features & Restrictions</h2>
              
              <h3 className="text-md font-medium mb-3">Software Features</h3>
              <div className="grid grid-cols-2 gap-3 mb-6">
                {[
                  { key: 'hasUserAccounts', label: 'User accounts' },
                  { key: 'collectsData', label: 'Collects user data' },
                  { key: 'hasAnalytics', label: 'Has analytics' },
                  { key: 'hasCloudStorage', label: 'Cloud storage' },
                  { key: 'hasOfflineMode', label: 'Offline mode' },
                  { key: 'requiresInternet', label: 'Requires internet' },
                  { key: 'hasThirdPartyIntegrations', label: 'Third-party integrations' },
                  { key: 'hasAutoUpdates', label: 'Auto-updates' },
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

              <h3 className="text-md font-medium mb-3">User Content</h3>
              <div className="grid grid-cols-2 gap-3 mb-6">
                {[
                  { key: 'allowsUserContent', label: 'Allows user content' },
                  { key: 'allowsUserUploads', label: 'Allows file uploads' },
                  { key: 'moderatesContent', label: 'Moderates content' },
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

              <h3 className="text-md font-medium mb-3">License Restrictions</h3>
              <div className="space-y-3">
                {[
                  { key: 'restrictReverseEngineering', label: 'Prohibit reverse engineering' },
                  { key: 'restrictDecompilation', label: 'Prohibit decompilation' },
                  { key: 'restrictModification', label: 'Prohibit modifications' },
                  { key: 'restrictRedistribution', label: 'Prohibit redistribution' },
                  { key: 'restrictCompetitiveUse', label: 'Prohibit competitive use' },
                  { key: 'restrictBenchmarking', label: 'Prohibit benchmarking' },
                  { key: 'restrictAutomatedUse', label: 'Prohibit automated/bot use' },
                  { key: 'restrictScraping', label: 'Prohibit scraping' },
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
              
              <h3 className="text-md font-medium mb-3">Support & Maintenance</h3>
              <div className="grid grid-cols-2 gap-3 mb-6">
                {[
                  { key: 'providesTechnicalSupport', label: 'Technical support' },
                  { key: 'providesUpdates', label: 'Software updates' },
                  { key: 'providesDocumentation', label: 'Documentation' },
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

              <h3 className="text-md font-medium mb-3">Termination</h3>
              <div className="space-y-3 mb-6">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="canTerminateForBreach"
                    checked={formData.canTerminateForBreach}
                    onCheckedChange={(checked) => updateForm('canTerminateForBreach', checked as boolean)}
                  />
                  <Label htmlFor="canTerminateForBreach" className="text-sm font-normal">Can terminate for breach</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="canTerminateForConvenience"
                    checked={formData.canTerminateForConvenience}
                    onCheckedChange={(checked) => updateForm('canTerminateForConvenience', checked as boolean)}
                  />
                  <Label htmlFor="canTerminateForConvenience" className="text-sm font-normal">Can terminate for convenience</Label>
                </div>
              </div>

              <h3 className="text-md font-medium mb-3">Dispute Resolution</h3>
              <div className="space-y-3 mb-6">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="hasArbitration"
                    checked={formData.hasArbitration}
                    onCheckedChange={(checked) => updateForm('hasArbitration', checked as boolean)}
                  />
                  <Label htmlFor="hasArbitration" className="text-sm font-normal">Require binding arbitration</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="hasClassActionWaiver"
                    checked={formData.hasClassActionWaiver}
                    onCheckedChange={(checked) => updateForm('hasClassActionWaiver', checked as boolean)}
                  />
                  <Label htmlFor="hasClassActionWaiver" className="text-sm font-normal">Class action waiver</Label>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-6">
                <div>
                  <Label htmlFor="governingLaw">Governing Law</Label>
                  <Input
                    id="governingLaw"
                    value={formData.governingLaw}
                    onChange={(e) => updateForm('governingLaw', e.target.value)}
                    placeholder="State of Delaware"
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="jurisdiction">Jurisdiction</Label>
                  <Input
                    id="jurisdiction"
                    value={formData.jurisdiction}
                    onChange={(e) => updateForm('jurisdiction', e.target.value)}
                    placeholder="Delaware, United States"
                    className="mt-1"
                  />
                </div>
              </div>

              <h3 className="text-md font-medium mb-3">Privacy Compliance</h3>
              <div className="grid grid-cols-2 gap-3 mb-6">
                {[
                  { key: 'gdprCompliant', label: 'GDPR compliant' },
                  { key: 'ccpaCompliant', label: 'CCPA compliant' },
                  { key: 'coppaCompliant', label: 'COPPA compliant' },
                  { key: 'exportControlled', label: 'Export controlled' },
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

              <div>
                <Label htmlFor="customTerms">Additional Terms (optional)</Label>
                <Textarea
                  id="customTerms"
                  value={formData.customTerms}
                  onChange={(e) => updateForm('customTerms', e.target.value)}
                  placeholder="Any additional terms specific to your software..."
                  className="mt-1"
                  rows={3}
                />
              </div>

              <div className="flex justify-between mt-6">
                <Button variant="outline" onClick={() => setStep(3)}>
                  <ArrowLeft className="mr-2 h-4 w-4" /> Back
                </Button>
                <Button onClick={generateEULA} className="btn-gradient">
                  Generate EULA <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </Card>
          )}

          {/* Step 5: Generated EULA */}
          {step === 5 && (
            <div className="space-y-4">
              <DocumentPreviewGate 
                content={generatedEULA} 
                documentType="EULA"
                documentTypeSlug="eula"
                formData={{ ...formData }}
              />

              {/* Disclaimer */}
              <Card className="p-4 bg-amber-50 border-amber-200">
                <div className="flex gap-3">
                  <AlertTriangle className="h-5 w-5 text-amber-600 shrink-0" />
                  <div className="text-sm text-amber-800">
                    <strong>Legal Disclaimer:</strong> This EULA template covers common requirements but may not address all legal requirements for your specific software, industry, or jurisdiction. We strongly recommend having this document reviewed by a qualified attorney.
                  </div>
                </div>
              </Card>

              <div className="flex justify-between">
                <Button variant="outline" onClick={() => setStep(4)}>
                  <ArrowLeft className="mr-2 h-4 w-4" /> Edit Options
                </Button>
                <Button className="btn-gradient" asChild>
                  <Link href="/">
                    Back to All Generators <ArrowRight className="ml-2 h-4 w-4" />
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
