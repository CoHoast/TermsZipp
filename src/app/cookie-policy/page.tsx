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
  
  // Cookie Types
  usesEssentialCookies: boolean;
  usesPerformanceCookies: boolean;
  usesFunctionalCookies: boolean;
  usesTargetingCookies: boolean;
  usesSocialMediaCookies: boolean;
  
  // Essential Cookie Details
  usesSessionCookies: boolean;
  usesAuthCookies: boolean;
  usesSecurityCookies: boolean;
  usesLoadBalancing: boolean;
  usesShoppingCart: boolean;
  
  // Analytics & Performance
  usesGoogleAnalytics: boolean;
  usesGoogleAnalytics4: boolean;
  usesMixpanel: boolean;
  usesSegment: boolean;
  usesHotjar: boolean;
  usesFullStory: boolean;
  usesHeap: boolean;
  usesAmplitude: boolean;
  
  // Advertising & Marketing
  usesFacebookPixel: boolean;
  usesGoogleAds: boolean;
  usesLinkedInInsight: boolean;
  usesTwitterPixel: boolean;
  usesTikTokPixel: boolean;
  usesPinterestTag: boolean;
  usesSnapchatPixel: boolean;
  usesCriteo: boolean;
  
  // Third-Party Services
  usesStripe: boolean;
  usesPaypal: boolean;
  usesIntercom: boolean;
  usesZendesk: boolean;
  usesDrift: boolean;
  usesHubSpot: boolean;
  usesMailchimp: boolean;
  usesKlaviyo: boolean;
  usesCloudflare: boolean;
  usesRecaptcha: boolean;
  otherServices: string;
  
  // Cookie Management
  hasCookieBanner: boolean;
  hasGranularConsent: boolean;
  allowsOptOut: boolean;
  respectsDoNotTrack: boolean;
  hasPreferenceCenter: boolean;
  
  // Compliance
  gdprCompliant: boolean;
  ccpaCompliant: boolean;
  pecr: boolean;
  
  // Retention
  sessionCookieRetention: string;
  persistentCookieRetention: string;
  analyticsCookieRetention: string;
  advertisingCookieRetention: string;
}

const defaultFormData: FormData = {
  companyName: "",
  websiteUrl: "",
  contactEmail: "",
  companyAddress: "",
  country: "United States",
  
  usesEssentialCookies: true,
  usesPerformanceCookies: true,
  usesFunctionalCookies: true,
  usesTargetingCookies: false,
  usesSocialMediaCookies: false,
  
  usesSessionCookies: true,
  usesAuthCookies: true,
  usesSecurityCookies: true,
  usesLoadBalancing: false,
  usesShoppingCart: false,
  
  usesGoogleAnalytics: true,
  usesGoogleAnalytics4: false,
  usesMixpanel: false,
  usesSegment: false,
  usesHotjar: false,
  usesFullStory: false,
  usesHeap: false,
  usesAmplitude: false,
  
  usesFacebookPixel: false,
  usesGoogleAds: false,
  usesLinkedInInsight: false,
  usesTwitterPixel: false,
  usesTikTokPixel: false,
  usesPinterestTag: false,
  usesSnapchatPixel: false,
  usesCriteo: false,
  
  usesStripe: false,
  usesPaypal: false,
  usesIntercom: false,
  usesZendesk: false,
  usesDrift: false,
  usesHubSpot: false,
  usesMailchimp: false,
  usesKlaviyo: false,
  usesCloudflare: false,
  usesRecaptcha: false,
  otherServices: "",
  
  hasCookieBanner: true,
  hasGranularConsent: true,
  allowsOptOut: true,
  respectsDoNotTrack: false,
  hasPreferenceCenter: false,
  
  gdprCompliant: true,
  ccpaCompliant: true,
  pecr: false,
  
  sessionCookieRetention: "session",
  persistentCookieRetention: "1-year",
  analyticsCookieRetention: "2-years",
  advertisingCookieRetention: "90-days",
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

    const retentionTextMap: Record<string, string> = {
      "session": "deleted when you close your browser",
      "30-days": "30 days",
      "90-days": "90 days",
      "6-months": "6 months",
      "1-year": "1 year",
      "2-years": "2 years",
      "13-months": "13 months (Google Analytics default)",
    };

    let policy = `# Cookie Policy

**Effective Date: ${today}**
**Last Updated: ${today}**

---

## 1. Introduction

This Cookie Policy explains how ${formData.companyName || "[Company Name]"} ("Company," "we," "us," or "our") uses cookies and similar tracking technologies when you visit our website at ${formData.websiteUrl || "[Website URL]"} (the "Website").

This Cookie Policy should be read together with our Privacy Policy, which provides detailed information about how we collect, use, and protect your personal information.

By continuing to use our Website, you consent to the use of cookies and similar technologies as described in this policy. You can manage your cookie preferences at any time using the methods described in Section 7 below.

---

## 2. What Are Cookies and Similar Technologies?

### 2.1 Cookies

Cookies are small text files that are placed on your device (computer, tablet, smartphone, or other electronic device) when you visit a website. Cookies are widely used to make websites work more efficiently, provide a better user experience, and give website owners information about how their site is being used.

Cookies can be either:

- **First-party cookies**: Set by the website you are visiting directly
- **Third-party cookies**: Set by a domain other than the website you are visiting (e.g., analytics services, advertising networks)

### 2.2 Session vs. Persistent Cookies

- **Session cookies**: Temporary cookies that are deleted when you close your browser. They are used to track your actions during a single browsing session.
- **Persistent cookies**: Cookies that remain on your device for a set period of time or until you delete them. They are used to remember your preferences across multiple visits.

### 2.3 Similar Technologies

In addition to cookies, we may use other similar tracking technologies:

- **Web beacons (pixel tags)**: Small, transparent images embedded in web pages or emails that allow us to track whether content has been viewed or an email has been opened.
- **Local storage**: Technology that allows websites to store data locally on your device, similar to cookies but with greater storage capacity.
- **Session storage**: Similar to local storage but data is cleared when the browser session ends.
- **Device fingerprinting**: Collecting information about your device configuration to identify it across sessions.

---

## 3. Types of Cookies We Use

We categorize the cookies on our Website as follows:

`;

    // Essential Cookies Section
    if (formData.usesEssentialCookies) {
      policy += `### 3.1 Strictly Necessary (Essential) Cookies

These cookies are essential for the operation of our Website. They enable core functionality such as security, network management, and accessibility. You cannot opt out of these cookies as they are required for the Website to function properly.

**Purpose**: Enable basic functions like page navigation, secure areas access, and essential features.

**Legal Basis**: Legitimate interest (necessary for website functionality).

| Cookie Name | Provider | Purpose | Duration |
|-------------|----------|---------|----------|
`;

      if (formData.usesSessionCookies) {
        policy += `| session_id | ${formData.companyName || "First-party"} | Maintains user session state | Session |\n`;
      }
      if (formData.usesAuthCookies) {
        policy += `| auth_token | ${formData.companyName || "First-party"} | Authentication and login status | ${retentionTextMap[formData.persistentCookieRetention] || "1 year"} |\n`;
      }
      if (formData.usesSecurityCookies) {
        policy += `| csrf_token | ${formData.companyName || "First-party"} | Security - prevents cross-site request forgery | Session |\n`;
        policy += `| __cf_bm | Cloudflare | Bot management and security | 30 minutes |\n`;
      }
      if (formData.usesLoadBalancing) {
        policy += `| SERVERID | ${formData.companyName || "First-party"} | Load balancing across servers | Session |\n`;
      }
      if (formData.usesShoppingCart) {
        policy += `| cart_id | ${formData.companyName || "First-party"} | Shopping cart contents | 30 days |\n`;
      }
      if (formData.usesRecaptcha) {
        policy += `| _GRECAPTCHA | Google reCAPTCHA | Bot detection and spam prevention | 6 months |\n`;
      }

      policy += `
`;
    }

    // Performance/Analytics Cookies Section
    if (formData.usesPerformanceCookies) {
      policy += `### 3.2 Performance and Analytics Cookies

These cookies collect information about how visitors use our Website, such as which pages are visited most often, how visitors navigate around the site, and whether they experience any errors. All information collected by these cookies is aggregated and therefore anonymous.

**Purpose**: Help us understand how visitors interact with our Website, allowing us to improve its performance and design.

**Legal Basis**: Consent (where required by law) or Legitimate interest.

| Cookie Name | Provider | Purpose | Duration |
|-------------|----------|---------|----------|
`;

      if (formData.usesGoogleAnalytics) {
        policy += `| _ga | Google Analytics | Distinguishes unique users | 2 years |\n`;
        policy += `| _gid | Google Analytics | Distinguishes unique users | 24 hours |\n`;
        policy += `| _gat | Google Analytics | Throttles request rate | 1 minute |\n`;
      }
      if (formData.usesGoogleAnalytics4) {
        policy += `| _ga_* | Google Analytics 4 | Persists session state | 2 years |\n`;
      }
      if (formData.usesMixpanel) {
        policy += `| mp_* | Mixpanel | User analytics and event tracking | 1 year |\n`;
      }
      if (formData.usesSegment) {
        policy += `| ajs_* | Segment | Analytics data collection | 1 year |\n`;
      }
      if (formData.usesHotjar) {
        policy += `| _hj* | Hotjar | Heatmaps and user behavior analysis | 1 year |\n`;
      }
      if (formData.usesFullStory) {
        policy += `| fs_uid | FullStory | Session recording and user analysis | 1 year |\n`;
      }
      if (formData.usesHeap) {
        policy += `| _hp2_* | Heap | Product analytics | 2 years |\n`;
      }
      if (formData.usesAmplitude) {
        policy += `| amplitude_* | Amplitude | Product analytics | 10 years |\n`;
      }

      policy += `
`;
    }

    // Functional Cookies Section
    if (formData.usesFunctionalCookies) {
      policy += `### 3.3 Functional Cookies

These cookies allow the Website to remember choices you make (such as your username, language, or the region you are in) and provide enhanced, more personalized features. They may also be used to provide services you have requested, such as watching a video or commenting on a blog.

**Purpose**: Enable personalization and enhanced functionality.

**Legal Basis**: Consent or Legitimate interest.

| Cookie Name | Provider | Purpose | Duration |
|-------------|----------|---------|----------|
| lang_pref | ${formData.companyName || "First-party"} | Remembers language preference | 1 year |
| theme | ${formData.companyName || "First-party"} | Remembers display preferences | 1 year |
| cookie_consent | ${formData.companyName || "First-party"} | Stores cookie consent preferences | 1 year |
`;

      if (formData.usesIntercom) {
        policy += `| intercom-* | Intercom | Customer messaging preferences | 1 year |\n`;
      }
      if (formData.usesZendesk) {
        policy += `| __zlcmid | Zendesk | Chat widget preferences | 1 year |\n`;
      }
      if (formData.usesDrift) {
        policy += `| drift* | Drift | Chat widget and visitor identification | 2 years |\n`;
      }

      policy += `
`;
    }

    // Targeting/Advertising Cookies Section
    if (formData.usesTargetingCookies) {
      policy += `### 3.4 Targeting and Advertising Cookies

These cookies are used to deliver advertisements that are more relevant to you and your interests. They are also used to limit the number of times you see an advertisement and to help measure the effectiveness of advertising campaigns. They are usually placed by advertising networks with our permission.

**Purpose**: Deliver relevant advertisements and measure campaign effectiveness.

**Legal Basis**: Consent.

| Cookie Name | Provider | Purpose | Duration |
|-------------|----------|---------|----------|
`;

      if (formData.usesFacebookPixel) {
        policy += `| _fbp | Facebook (Meta) | Facebook advertising and retargeting | 90 days |\n`;
        policy += `| fr | Facebook (Meta) | Facebook advertising delivery | 90 days |\n`;
      }
      if (formData.usesGoogleAds) {
        policy += `| _gcl_* | Google Ads | Google advertising conversion tracking | 90 days |\n`;
        policy += `| IDE | Google DoubleClick | Retargeting and ad personalization | 13 months |\n`;
      }
      if (formData.usesLinkedInInsight) {
        policy += `| li_* | LinkedIn | LinkedIn advertising and analytics | 6 months |\n`;
        policy += `| bcookie | LinkedIn | Browser ID cookie | 2 years |\n`;
      }
      if (formData.usesTwitterPixel) {
        policy += `| muc_ads | Twitter (X) | Twitter advertising | 2 years |\n`;
        policy += `| personalization_id | Twitter (X) | Ad personalization | 2 years |\n`;
      }
      if (formData.usesTikTokPixel) {
        policy += `| _ttp | TikTok | TikTok advertising and tracking | 13 months |\n`;
      }
      if (formData.usesPinterestTag) {
        policy += `| _pinterest_* | Pinterest | Pinterest advertising | 1 year |\n`;
      }
      if (formData.usesSnapchatPixel) {
        policy += `| _scid | Snapchat | Snapchat advertising | 13 months |\n`;
      }
      if (formData.usesCriteo) {
        policy += `| cto_* | Criteo | Retargeting advertising | 13 months |\n`;
      }

      policy += `
**Note**: We do not have control over third-party advertising cookies. Please refer to the respective third-party privacy policies for more information about their practices.

`;
    }

    // Social Media Cookies Section
    if (formData.usesSocialMediaCookies) {
      policy += `### 3.5 Social Media Cookies

These cookies are set by social media services that we have added to the Website to enable you to share our content with your friends and networks. They are capable of tracking your browser across other sites and building up a profile of your interests.

**Purpose**: Enable social media sharing functionality and may track browsing activity.

**Legal Basis**: Consent.

| Cookie Name | Provider | Purpose | Duration |
|-------------|----------|---------|----------|
| datr | Facebook | Security and site integrity | 2 years |
| sb | Facebook | Browser identification | 2 years |
| guest_id | Twitter (X) | Unique visitor identification | 2 years |
| GPS | YouTube | Location tracking on mobile | 30 minutes |
| PREF | YouTube | User preferences | 8 months |
| VISITOR_INFO1_LIVE | YouTube | Bandwidth estimation | 6 months |

`;
    }

    // Third-Party Services Section
    policy += `---

## 4. Third-Party Service Providers

We use various third-party service providers who may set cookies on your device. These third parties have their own privacy policies governing the use of your information:

`;

    const thirdParties = [];
    
    if (formData.usesGoogleAnalytics || formData.usesGoogleAnalytics4 || formData.usesGoogleAds) {
      thirdParties.push({
        name: "Google (Analytics, Ads, reCAPTCHA)",
        purpose: "Website analytics, advertising, and security",
        privacy: "https://policies.google.com/privacy",
        optOut: "https://tools.google.com/dlpage/gaoptout"
      });
    }
    if (formData.usesFacebookPixel) {
      thirdParties.push({
        name: "Meta (Facebook, Instagram)",
        purpose: "Advertising and social media integration",
        privacy: "https://www.facebook.com/privacy/policy",
        optOut: "https://www.facebook.com/settings?tab=ads"
      });
    }
    if (formData.usesStripe) {
      thirdParties.push({
        name: "Stripe",
        purpose: "Payment processing and fraud prevention",
        privacy: "https://stripe.com/privacy",
        optOut: null
      });
    }
    if (formData.usesPaypal) {
      thirdParties.push({
        name: "PayPal",
        purpose: "Payment processing",
        privacy: "https://www.paypal.com/webapps/mpp/ua/privacy-full",
        optOut: null
      });
    }
    if (formData.usesHotjar) {
      thirdParties.push({
        name: "Hotjar",
        purpose: "User behavior analytics and feedback",
        privacy: "https://www.hotjar.com/privacy",
        optOut: "https://www.hotjar.com/policies/do-not-track"
      });
    }
    if (formData.usesIntercom) {
      thirdParties.push({
        name: "Intercom",
        purpose: "Customer messaging and support",
        privacy: "https://www.intercom.com/legal/privacy",
        optOut: null
      });
    }
    if (formData.usesHubSpot) {
      thirdParties.push({
        name: "HubSpot",
        purpose: "Marketing automation and CRM",
        privacy: "https://legal.hubspot.com/privacy-policy",
        optOut: null
      });
    }
    if (formData.usesMailchimp) {
      thirdParties.push({
        name: "Mailchimp",
        purpose: "Email marketing",
        privacy: "https://mailchimp.com/legal/privacy/",
        optOut: null
      });
    }
    if (formData.usesKlaviyo) {
      thirdParties.push({
        name: "Klaviyo",
        purpose: "Email and SMS marketing",
        privacy: "https://www.klaviyo.com/legal/privacy-notice",
        optOut: null
      });
    }
    if (formData.usesCloudflare) {
      thirdParties.push({
        name: "Cloudflare",
        purpose: "Security, performance, and CDN",
        privacy: "https://www.cloudflare.com/privacypolicy/",
        optOut: null
      });
    }
    if (formData.usesLinkedInInsight) {
      thirdParties.push({
        name: "LinkedIn",
        purpose: "Advertising and professional networking",
        privacy: "https://www.linkedin.com/legal/privacy-policy",
        optOut: "https://www.linkedin.com/psettings/guest-controls/retargeting-opt-out"
      });
    }
    if (formData.usesTwitterPixel) {
      thirdParties.push({
        name: "Twitter (X)",
        purpose: "Advertising and social media",
        privacy: "https://twitter.com/privacy",
        optOut: "https://twitter.com/settings/personalization"
      });
    }

    if (thirdParties.length > 0) {
      thirdParties.forEach(tp => {
        policy += `### ${tp.name}
- **Purpose**: ${tp.purpose}
- **Privacy Policy**: ${tp.privacy}
${tp.optOut ? `- **Opt-Out**: ${tp.optOut}` : ""}

`;
      });
    }

    if (formData.otherServices) {
      policy += `### Other Services
${formData.otherServices}

`;
    }

    // Cookie Retention Section
    policy += `---

## 5. Cookie Duration and Retention

Different types of cookies are retained for different periods:

| Cookie Category | Typical Retention Period |
|----------------|-------------------------|
| Session cookies | ${retentionTextMap["session"]} |
| Essential cookies | ${retentionTextMap[formData.persistentCookieRetention] || "1 year"} |
| Analytics cookies | ${retentionTextMap[formData.analyticsCookieRetention] || "2 years"} |
| Advertising cookies | ${retentionTextMap[formData.advertisingCookieRetention] || "90 days"} |
| Functional cookies | ${retentionTextMap[formData.persistentCookieRetention] || "1 year"} |

We periodically review and update cookie retention periods to ensure they are appropriate and comply with applicable regulations.

---

## 6. Your Rights and Choices

`;

    if (formData.gdprCompliant) {
      policy += `### 6.1 Rights Under GDPR (European Users)

If you are located in the European Economic Area (EEA), United Kingdom, or Switzerland, you have the following rights regarding cookies:

- **Right to be informed**: This Cookie Policy provides information about the cookies we use.
- **Right to consent**: We will ask for your consent before placing non-essential cookies.
- **Right to withdraw consent**: You can withdraw your consent at any time.
- **Right to access**: You can request information about the data collected via cookies.
- **Right to erasure**: You can request deletion of cookie data we hold about you.

`;
    }

    if (formData.ccpaCompliant) {
      policy += `### 6.2 Rights Under CCPA (California Residents)

If you are a California resident, you have the following rights:

- **Right to know**: What personal information is collected, including via cookies.
- **Right to delete**: Request deletion of personal information collected through cookies.
- **Right to opt-out**: Opt out of the "sale" of personal information (some advertising cookies may constitute a "sale" under CCPA).
- **Right to non-discrimination**: We will not discriminate against you for exercising your rights.

**Do Not Sell My Personal Information**: ${formData.usesTargetingCookies ? "Some of our advertising cookies may share data with third parties in ways that constitute a 'sale' under CCPA. You can opt out using the methods described below." : "We do not sell your personal information as defined by the CCPA."}

`;
    }

    if (formData.pecr) {
      policy += `### 6.3 UK PECR Compliance

We comply with the Privacy and Electronic Communications Regulations (PECR) which require consent for non-essential cookies. We obtain consent through our cookie banner before placing any non-essential cookies.

`;
    }

    policy += `---

## 7. Managing Your Cookie Preferences

You have several options for managing cookies:

### 7.1 Cookie Consent Banner

${formData.hasCookieBanner ? `When you first visit our Website, you will see a cookie consent banner that allows you to:
- Accept all cookies
- Reject non-essential cookies
- Customize your preferences by cookie category

${formData.hasGranularConsent ? "Our banner provides granular controls so you can choose which categories of cookies to accept." : ""}` : "We provide information about cookies on our Website."}

${formData.hasPreferenceCenter ? `### 7.2 Cookie Preference Center

You can access our Cookie Preference Center at any time to review and change your cookie settings. Look for the "Cookie Settings" or "Privacy Settings" link in our website footer.

` : ""}

### 7.${formData.hasPreferenceCenter ? "3" : "2"} Browser Controls

Most web browsers allow you to manage cookies through their settings. You can:

- **View cookies** stored on your device
- **Delete cookies** individually or all at once  
- **Block cookies** from specific websites or all websites
- **Set preferences** for first-party vs. third-party cookies
- **Enable private browsing** mode (cookies are deleted when session ends)

**Browser-specific instructions:**

| Browser | How to Manage Cookies |
|---------|----------------------|
| **Google Chrome** | Settings → Privacy and Security → Cookies and other site data |
| **Mozilla Firefox** | Settings → Privacy & Security → Cookies and Site Data |
| **Apple Safari** | Preferences → Privacy → Manage Website Data |
| **Microsoft Edge** | Settings → Cookies and site permissions → Manage and delete cookies |
| **Opera** | Settings → Privacy and security → Cookies |

${formData.respectsDoNotTrack ? `### 7.${formData.hasPreferenceCenter ? "4" : "3"} Do Not Track

Our Website respects the Do Not Track (DNT) signal sent by your browser. When we detect a DNT signal, we will not place non-essential cookies on your device.

` : ""}

### 7.${formData.hasPreferenceCenter ? (formData.respectsDoNotTrack ? "5" : "4") : (formData.respectsDoNotTrack ? "4" : "3")} Opt-Out Tools

You can opt out of interest-based advertising from participating companies through:

- **Network Advertising Initiative (NAI)**: https://optout.networkadvertising.org/
- **Digital Advertising Alliance (DAA)**: https://optout.aboutads.info/
- **European Interactive Digital Advertising Alliance (EDAA)**: https://www.youronlinechoices.eu/
- **Google Ads Personalization**: https://adssettings.google.com/

### Mobile Device Controls

On mobile devices, you can manage tracking through your device settings:

- **iOS**: Settings → Privacy → Tracking → Toggle "Allow Apps to Request to Track"
- **Android**: Settings → Privacy → Ads → Opt out of Ads Personalization

**Important Note**: Blocking or deleting cookies may impact your experience on our Website. Some features may not function properly, and you may need to re-enter information or reset preferences each time you visit.

---

## 8. Updates to This Cookie Policy

We may update this Cookie Policy from time to time to reflect changes in our practices, technology, legal requirements, or for other operational reasons.

When we make material changes, we will:
- Update the "Last Updated" date at the top of this policy
- ${formData.hasCookieBanner ? "Display a notice on our cookie banner" : "Post a notice on our Website"}
- Where appropriate, notify you by email

We encourage you to review this Cookie Policy periodically to stay informed about how we use cookies.

---

## 9. Contact Us

If you have any questions, concerns, or requests regarding this Cookie Policy or our use of cookies, please contact us:

**${formData.companyName || "[Company Name]"}**
${formData.companyAddress ? `Address: ${formData.companyAddress}\n` : ""}Email: ${formData.contactEmail || "[Contact Email]"}
Website: ${formData.websiteUrl || "[Website URL]"}

For privacy-related inquiries, you may also contact our Data Protection Officer (if applicable) at the email address above.

---

## 10. Additional Information

### 10.1 Cookie Policy vs. Privacy Policy

This Cookie Policy is supplemental to our Privacy Policy. Our Privacy Policy provides more comprehensive information about how we collect, use, store, and share your personal information. Please read both policies together for a complete understanding of our data practices.

### 10.2 Children's Privacy

Our Website is not intended for children under the age of 16 (or 13 in certain jurisdictions). We do not knowingly collect personal information from children through cookies. If you believe we have inadvertently collected information from a child, please contact us immediately.

### 10.3 International Data Transfers

Some of our third-party cookie providers are located outside your country of residence. When data is transferred internationally, we ensure appropriate safeguards are in place, such as Standard Contractual Clauses or reliance on the service provider's participation in approved data transfer frameworks.

---

*This Cookie Policy was generated using TermsZipp. While this document covers common cookie policy requirements, we strongly recommend having it reviewed by a qualified legal professional to ensure compliance with all applicable laws and regulations for your specific business and jurisdiction.*
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
              <Cookie className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold">Cookie Policy Generator</h1>
              <p className="text-muted-foreground">Create a comprehensive GDPR & CCPA compliant cookie policy</p>
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
                  {s === 1 ? 'Business' : s === 2 ? 'Cookie Types' : s === 3 ? 'Services' : s === 4 ? 'Settings' : 'Generate'}
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
                  <Label htmlFor="companyAddress">Business Address (optional)</Label>
                  <Input
                    id="companyAddress"
                    value={formData.companyAddress}
                    onChange={(e) => updateForm('companyAddress', e.target.value)}
                    placeholder="123 Main St, City, State, ZIP"
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

              <div className="flex justify-end mt-6">
                <Button onClick={() => setStep(2)} className="btn-gradient">
                  Next Step <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </Card>
          )}

          {/* Step 2: Cookie Types */}
          {step === 2 && (
            <Card className="p-6">
              <h2 className="text-lg font-semibold mb-6">Cookie Categories</h2>
              <p className="text-sm text-muted-foreground mb-4">What types of cookies does your website use?</p>
              
              <div className="space-y-3 mb-6">
                {[
                  { key: 'usesEssentialCookies', label: 'Essential/Strictly Necessary', desc: 'Required for site to function (login, security, cart)' },
                  { key: 'usesPerformanceCookies', label: 'Performance & Analytics', desc: 'Track usage patterns and site performance' },
                  { key: 'usesFunctionalCookies', label: 'Functional', desc: 'Remember preferences (language, theme, settings)' },
                  { key: 'usesTargetingCookies', label: 'Targeting & Advertising', desc: 'Retargeting, ads, and marketing pixels' },
                  { key: 'usesSocialMediaCookies', label: 'Social Media', desc: 'Social sharing buttons and embeds' },
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

              <h3 className="text-md font-medium mt-6 mb-4">Essential Cookie Details</h3>
              <div className="grid grid-cols-2 gap-3">
                {[
                  { key: 'usesSessionCookies', label: 'Session cookies' },
                  { key: 'usesAuthCookies', label: 'Authentication cookies' },
                  { key: 'usesSecurityCookies', label: 'Security/CSRF cookies' },
                  { key: 'usesLoadBalancing', label: 'Load balancing' },
                  { key: 'usesShoppingCart', label: 'Shopping cart' },
                  { key: 'usesRecaptcha', label: 'reCAPTCHA' },
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

          {/* Step 3: Third-Party Services */}
          {step === 3 && (
            <Card className="p-6">
              <h2 className="text-lg font-semibold mb-6">Third-Party Services</h2>
              
              <h3 className="text-md font-medium mb-3">Analytics & Performance</h3>
              <div className="grid grid-cols-2 gap-3 mb-6">
                {[
                  { key: 'usesGoogleAnalytics', label: 'Google Analytics (UA)' },
                  { key: 'usesGoogleAnalytics4', label: 'Google Analytics 4' },
                  { key: 'usesMixpanel', label: 'Mixpanel' },
                  { key: 'usesSegment', label: 'Segment' },
                  { key: 'usesHotjar', label: 'Hotjar' },
                  { key: 'usesFullStory', label: 'FullStory' },
                  { key: 'usesHeap', label: 'Heap' },
                  { key: 'usesAmplitude', label: 'Amplitude' },
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

              <h3 className="text-md font-medium mb-3">Advertising & Marketing</h3>
              <div className="grid grid-cols-2 gap-3 mb-6">
                {[
                  { key: 'usesFacebookPixel', label: 'Facebook/Meta Pixel' },
                  { key: 'usesGoogleAds', label: 'Google Ads' },
                  { key: 'usesLinkedInInsight', label: 'LinkedIn Insight' },
                  { key: 'usesTwitterPixel', label: 'Twitter/X Pixel' },
                  { key: 'usesTikTokPixel', label: 'TikTok Pixel' },
                  { key: 'usesPinterestTag', label: 'Pinterest Tag' },
                  { key: 'usesSnapchatPixel', label: 'Snapchat Pixel' },
                  { key: 'usesCriteo', label: 'Criteo' },
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

              <h3 className="text-md font-medium mb-3">Other Services</h3>
              <div className="grid grid-cols-2 gap-3 mb-4">
                {[
                  { key: 'usesStripe', label: 'Stripe' },
                  { key: 'usesPaypal', label: 'PayPal' },
                  { key: 'usesIntercom', label: 'Intercom' },
                  { key: 'usesZendesk', label: 'Zendesk' },
                  { key: 'usesDrift', label: 'Drift' },
                  { key: 'usesHubSpot', label: 'HubSpot' },
                  { key: 'usesMailchimp', label: 'Mailchimp' },
                  { key: 'usesKlaviyo', label: 'Klaviyo' },
                  { key: 'usesCloudflare', label: 'Cloudflare' },
                  { key: 'usesRecaptcha', label: 'Google reCAPTCHA' },
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
                <Label htmlFor="otherServices">Other services (list any not mentioned above)</Label>
                <Input
                  id="otherServices"
                  value={formData.otherServices}
                  onChange={(e) => updateForm('otherServices', e.target.value)}
                  placeholder="e.g., Zendesk, ActiveCampaign, etc."
                  className="mt-1"
                />
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

          {/* Step 4: Settings & Compliance */}
          {step === 4 && (
            <Card className="p-6">
              <h2 className="text-lg font-semibold mb-6">Cookie Management & Compliance</h2>
              
              <h3 className="text-md font-medium mb-3">Cookie Consent</h3>
              <div className="space-y-3 mb-6">
                {[
                  { key: 'hasCookieBanner', label: 'Display cookie consent banner', desc: 'Show a banner asking users to accept/reject cookies' },
                  { key: 'hasGranularConsent', label: 'Granular consent controls', desc: 'Let users choose which cookie categories to accept' },
                  { key: 'allowsOptOut', label: 'Allow users to opt out', desc: 'Provide ways for users to disable non-essential cookies' },
                  { key: 'hasPreferenceCenter', label: 'Cookie preference center', desc: 'Dedicated page/modal for managing cookie preferences' },
                  { key: 'respectsDoNotTrack', label: 'Respect Do Not Track (DNT)', desc: 'Honor browser DNT signals' },
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

              <h3 className="text-md font-medium mb-3">Compliance Requirements</h3>
              <div className="grid grid-cols-2 gap-3 mb-6">
                {[
                  { key: 'gdprCompliant', label: 'GDPR (EU/UK)' },
                  { key: 'ccpaCompliant', label: 'CCPA (California)' },
                  { key: 'pecr', label: 'PECR (UK)' },
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

              <h3 className="text-md font-medium mb-3">Cookie Retention Periods</h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Persistent cookies</Label>
                  <Select value={formData.persistentCookieRetention} onValueChange={(v) => updateForm('persistentCookieRetention', v)}>
                    <SelectTrigger className="mt-1">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="30-days">30 days</SelectItem>
                      <SelectItem value="90-days">90 days</SelectItem>
                      <SelectItem value="6-months">6 months</SelectItem>
                      <SelectItem value="1-year">1 year</SelectItem>
                      <SelectItem value="2-years">2 years</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label>Analytics cookies</Label>
                  <Select value={formData.analyticsCookieRetention} onValueChange={(v) => updateForm('analyticsCookieRetention', v)}>
                    <SelectTrigger className="mt-1">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="30-days">30 days</SelectItem>
                      <SelectItem value="90-days">90 days</SelectItem>
                      <SelectItem value="6-months">6 months</SelectItem>
                      <SelectItem value="13-months">13 months</SelectItem>
                      <SelectItem value="2-years">2 years</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label>Advertising cookies</Label>
                  <Select value={formData.advertisingCookieRetention} onValueChange={(v) => updateForm('advertisingCookieRetention', v)}>
                    <SelectTrigger className="mt-1">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="30-days">30 days</SelectItem>
                      <SelectItem value="90-days">90 days</SelectItem>
                      <SelectItem value="6-months">6 months</SelectItem>
                      <SelectItem value="1-year">1 year</SelectItem>
                    </SelectContent>
                  </Select>
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
                documentType="Cookie Policy"
                documentTypeSlug="cookie-policy"
                formData={{ ...formData }}
              />

              {/* Disclaimer */}
              <Card className="p-4 bg-amber-50 border-amber-200">
                <div className="flex gap-3">
                  <AlertTriangle className="h-5 w-5 text-amber-600 shrink-0" />
                  <div className="text-sm text-amber-800">
                    <strong>Legal Disclaimer:</strong> This cookie policy template covers common requirements but may not address all legal requirements for your specific business, industry, or jurisdiction. We strongly recommend having this document reviewed by a qualified attorney.
                  </div>
                </div>
              </Card>

              <div className="flex justify-between">
                <Button variant="outline" onClick={() => setStep(4)}>
                  <ArrowLeft className="mr-2 h-4 w-4" /> Edit Options
                </Button>
                <Button className="btn-gradient" asChild>
                  <Link href="/disclaimer">
                    Generate Disclaimer <ArrowRight className="ml-2 h-4 w-4" />
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
