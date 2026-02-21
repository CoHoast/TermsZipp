"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Textarea } from "@/components/ui/textarea";
import { 
  AlertTriangle, ArrowLeft, ArrowRight,
  Globe, Mail, Building
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
  
  // General Disclaimers
  generalDisclaimer: boolean;
  accuracyDisclaimer: boolean;
  errorDisclaimer: boolean;
  availabilityDisclaimer: boolean;
  changesToContentDisclaimer: boolean;
  
  // Professional Advice Disclaimers
  noProfessionalAdvice: boolean;
  isHealthSite: boolean;
  isFinanceSite: boolean;
  isLegalSite: boolean;
  isFitnessSite: boolean;
  isEducationSite: boolean;
  isTaxSite: boolean;
  isRealEstateSite: boolean;
  isTechSite: boolean;
  
  // Content-Related
  userGeneratedContent: boolean;
  testimonialsDisclaimer: boolean;
  viewsExpressed: boolean;
  copyrightFairUse: boolean;
  
  // Third-Party
  externalLinksDisclaimer: boolean;
  thirdPartyProducts: boolean;
  thirdPartyServices: boolean;
  
  // E-Commerce & Monetization
  affiliateDisclaimer: boolean;
  sponsoredContent: boolean;
  productReviews: boolean;
  earningsDisclaimer: boolean;
  pricingDisclaimer: boolean;
  
  // Legal & Liability
  limitationOfLiability: boolean;
  indemnification: boolean;
  noWarranties: boolean;
  jurisdictionClause: boolean;
  forceClause: boolean;
  jurisdiction: string;
  
  // Technical
  technicalDisclaimer: boolean;
  securityDisclaimer: boolean;
  
  // Custom
  customDisclaimers: string;
}

const defaultFormData: FormData = {
  companyName: "",
  websiteUrl: "",
  contactEmail: "",
  companyAddress: "",
  country: "United States",
  businessType: "general",
  
  generalDisclaimer: true,
  accuracyDisclaimer: true,
  errorDisclaimer: true,
  availabilityDisclaimer: true,
  changesToContentDisclaimer: true,
  
  noProfessionalAdvice: true,
  isHealthSite: false,
  isFinanceSite: false,
  isLegalSite: false,
  isFitnessSite: false,
  isEducationSite: false,
  isTaxSite: false,
  isRealEstateSite: false,
  isTechSite: false,
  
  userGeneratedContent: false,
  testimonialsDisclaimer: false,
  viewsExpressed: true,
  copyrightFairUse: true,
  
  externalLinksDisclaimer: true,
  thirdPartyProducts: false,
  thirdPartyServices: false,
  
  affiliateDisclaimer: false,
  sponsoredContent: false,
  productReviews: false,
  earningsDisclaimer: false,
  pricingDisclaimer: false,
  
  limitationOfLiability: true,
  indemnification: true,
  noWarranties: true,
  jurisdictionClause: true,
  forceClause: false,
  jurisdiction: "State of Delaware, United States",
  
  technicalDisclaimer: false,
  securityDisclaimer: false,
  
  customDisclaimers: "",
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

    let disclaimer = `# Website Disclaimer

**Effective Date: ${today}**
**Last Updated: ${today}**

---

## 1. Introduction

This Disclaimer ("Disclaimer") applies to the website ${formData.websiteUrl || "[Website URL]"} (the "Website") operated by ${formData.companyName || "[Company Name]"} ("Company," "we," "us," or "our").

By accessing or using our Website, you acknowledge that you have read, understood, and agree to be bound by this Disclaimer. If you do not agree with any part of this Disclaimer, you must not use our Website.

This Disclaimer should be read in conjunction with our Terms of Service and Privacy Policy, which provide additional terms governing your use of our Website.

---

`;

    // Section counter
    let sectionNum = 2;

    // General Disclaimer
    if (formData.generalDisclaimer) {
      disclaimer += `## ${sectionNum}. General Information Disclaimer

### ${sectionNum}.1 Informational Purposes Only

The information provided on this Website is for general informational and educational purposes only. While we strive to keep the information accurate and up-to-date, we make no representations or warranties of any kind, express or implied, about the completeness, accuracy, reliability, suitability, or availability of the Website or the information, products, services, or related graphics contained on the Website for any purpose.

### ${sectionNum}.2 No Guarantees

We do not guarantee that:
- The information on this Website is complete, true, accurate, or non-misleading
- The Website will be available at all times or at any specific time
- The Website will be free from errors, defects, or viruses
- The results obtained from using the Website will meet your requirements
- Any errors or defects will be corrected

### ${sectionNum}.3 Use at Your Own Risk

Any reliance you place on the information provided on this Website is strictly at your own risk. You assume full responsibility for any decisions or actions you take based on the information, products, or services provided through this Website.

We shall not be liable for any loss or damage, including without limitation, indirect or consequential loss or damage, or any loss or damage whatsoever arising from loss of data or profits arising out of, or in connection with, the use of this Website.

`;
      sectionNum++;
    }

    // Accuracy Disclaimer
    if (formData.accuracyDisclaimer) {
      disclaimer += `## ${sectionNum}. Accuracy of Information

### ${sectionNum}.1 No Guarantees of Accuracy

While we endeavor to ensure that the information on this Website is correct, we do not warrant the accuracy, completeness, or usefulness of this information. Any reliance you place on such information is strictly at your own risk.

### ${sectionNum}.2 Information May Be Outdated

The information contained on this Website may be out of date, and we make no commitment to update such material. The content on this Website is provided "as is" without any warranty of any kind, either express or implied.

### ${sectionNum}.3 Not Official or Authoritative

Unless explicitly stated otherwise, the information on this Website should not be considered official, authoritative, or as a substitute for information from official sources. We encourage you to verify any critical information with primary sources.

`;
      sectionNum++;
    }

    // Errors and Omissions
    if (formData.errorDisclaimer) {
      disclaimer += `## ${sectionNum}. Errors and Omissions

### ${sectionNum}.1 Typographical Errors

The Website may contain typographical errors, inaccuracies, or omissions relating to product descriptions, pricing, promotions, offers, and availability. We reserve the right to correct any errors, inaccuracies, or omissions and to change or update information at any time without prior notice.

### ${sectionNum}.2 Technical Errors

We are not responsible for any technical errors that may occur on the Website, including but not limited to errors in pricing, product information, or other content. If an error occurs, we reserve the right to correct it and, where applicable, to cancel any orders placed based on erroneous information.

### ${sectionNum}.3 Reservation of Rights

We reserve the right to refuse or cancel any order placed for a product or service listed at an incorrect price, regardless of whether the order has been confirmed or your payment method has been charged. If your payment method has already been charged and your order is cancelled, we will issue a credit to your payment method in the amount of the incorrect price.

`;
      sectionNum++;
    }

    // No Professional Advice
    if (formData.noProfessionalAdvice) {
      disclaimer += `## ${sectionNum}. No Professional Advice Disclaimer

### ${sectionNum}.1 General Statement

The content on this Website is provided for general information purposes only and does not constitute professional advice. The information should not be relied upon as a substitute for professional advice from a qualified professional in the relevant field.

You should always seek the advice of an appropriately qualified professional regarding any specific questions or concerns you may have. Never disregard professional advice or delay in seeking it because of something you have read on this Website.

`;

      if (formData.isHealthSite) {
        disclaimer += `### ${sectionNum}.2 Medical and Health Disclaimer

**IMPORTANT: This Website does not provide medical advice.**

The health and medical information on this Website is provided for general informational and educational purposes only and is not a substitute for professional medical advice, diagnosis, or treatment.

**Key Points:**
- Always seek the advice of your physician, qualified healthcare provider, or other qualified health professional with any questions you may have regarding a medical condition, symptoms, or treatment
- Never disregard professional medical advice or delay in seeking it because of something you have read on this Website
- If you think you may have a medical emergency, call your doctor, go to the nearest emergency room, or call emergency services immediately
- We do not recommend or endorse any specific tests, physicians, products, procedures, opinions, or other information that may be mentioned on the Website
- Reliance on any information provided by this Website is solely at your own risk

**The information on this Website:**
- Is not intended to diagnose, treat, cure, or prevent any disease
- Has not been evaluated by the FDA or any other regulatory body
- Should not be used as a substitute for professional medical care
- May not be applicable to your specific health situation

We do not assume any liability for any injury, illness, or other damage resulting from the use of or reliance on information contained in or accessed through this Website.

`;
      }

      if (formData.isFinanceSite) {
        disclaimer += `### ${sectionNum}.${formData.isHealthSite ? "3" : "2"} Financial Disclaimer

**IMPORTANT: This Website does not provide financial advice.**

The financial information provided on this Website is for general informational and educational purposes only and should not be construed as professional financial advice.

**Key Points:**
- We are not registered financial advisors, investment advisors, tax advisors, or brokers
- The information provided should not be considered as individualized financial advice
- Past performance is not indicative of future results
- All investments involve risk, including the potential loss of principal
- You should consult with qualified financial professionals before making any investment decisions

**Important Disclaimers:**
- Any references to returns, income, or investment performance are hypothetical and for illustrative purposes only
- Market conditions change continuously, and historical data may not be indicative of future results
- Tax implications vary based on individual circumstances; consult a qualified tax professional
- We may receive compensation from financial products or services mentioned on this Website, which may influence the content

**No Investment Advice:**
The content on this Website should not be construed as an offer, solicitation, or recommendation to buy or sell any securities or other financial instruments. We do not provide personalized investment recommendations.

`;
      }

      if (formData.isLegalSite) {
        disclaimer += `### ${sectionNum}.${formData.isHealthSite && formData.isFinanceSite ? "4" : formData.isHealthSite || formData.isFinanceSite ? "3" : "2"} Legal Disclaimer

**IMPORTANT: This Website does not provide legal advice.**

The legal information on this Website is provided for general informational purposes only and does not constitute legal advice or create an attorney-client relationship.

**Key Points:**
- We are not a law firm and do not provide legal services
- The information should not be used as a substitute for legal advice from a licensed attorney
- Legal matters are fact-specific and jurisdiction-dependent
- Laws change frequently, and the information may not reflect the most current legal developments

**What You Should Know:**
- No attorney-client relationship is formed by your use of this Website
- Communications through this Website do not create an attorney-client privilege
- Outcomes vary based on specific facts and circumstances
- You should consult with a licensed attorney in your jurisdiction for advice specific to your situation

**Jurisdictional Limitations:**
- The legal information provided may not be applicable in your jurisdiction
- Laws vary significantly between jurisdictions
- Always verify information with local legal counsel

`;
      }

      if (formData.isTaxSite) {
        const taxSubNum = (formData.isHealthSite ? 1 : 0) + (formData.isFinanceSite ? 1 : 0) + (formData.isLegalSite ? 1 : 0) + 2;
        disclaimer += `### ${sectionNum}.${taxSubNum} Tax Disclaimer

**IMPORTANT: This Website does not provide tax advice.**

The tax information on this Website is provided for general informational purposes only and should not be considered as tax advice, nor should it be relied upon in making any tax-related decisions.

**Key Points:**
- We are not licensed tax professionals, CPAs, or enrolled agents
- Tax laws are complex and change frequently
- Your specific tax situation may differ from examples provided
- Always consult with a qualified tax professional for advice specific to your situation

**Important Notes:**
- Federal, state, and local tax laws vary significantly
- Tax implications depend on your individual circumstances
- Information provided may not reflect the most current tax code changes
- We do not take responsibility for any tax positions taken based on information from this Website

`;
      }

      if (formData.isFitnessSite) {
        const fitnessSubNum = (formData.isHealthSite ? 1 : 0) + (formData.isFinanceSite ? 1 : 0) + (formData.isLegalSite ? 1 : 0) + (formData.isTaxSite ? 1 : 0) + 2;
        disclaimer += `### ${sectionNum}.${fitnessSubNum} Fitness and Exercise Disclaimer

**IMPORTANT: Consult your doctor before beginning any exercise program.**

The fitness, exercise, and nutrition information on this Website is provided for general informational and educational purposes only.

**Assumption of Risk:**
- You understand that when participating in any exercise, workout, or fitness program, there is the possibility of physical injury and/or death
- By voluntarily engaging in these activities, you agree to accept and assume all risk of injury or death
- You should consult your physician before beginning any exercise program

**Important Warnings:**
- Stop exercising immediately if you experience faintness, dizziness, pain, or shortness of breath
- Do not perform any exercise without proper instruction
- Results may vary based on individual effort, body composition, and other factors
- We are not liable for any injuries sustained from exercises or activities described on this Website

**Nutritional Information:**
- Nutritional information is provided for informational purposes only
- Consult a healthcare professional or registered dietitian for personalized nutrition advice
- We do not endorse any specific diet, supplement, or nutritional approach

`;
      }

      if (formData.isEducationSite) {
        const eduSubNum = (formData.isHealthSite ? 1 : 0) + (formData.isFinanceSite ? 1 : 0) + (formData.isLegalSite ? 1 : 0) + (formData.isTaxSite ? 1 : 0) + (formData.isFitnessSite ? 1 : 0) + 2;
        disclaimer += `### ${sectionNum}.${eduSubNum} Educational Content Disclaimer

The educational content on this Website is provided for general informational and educational purposes only.

**Key Points:**
- Educational content is not a substitute for formal education or professional training
- We do not guarantee any specific outcomes, grades, or employment results
- Course materials and curricula may change without notice
- Certifications, if any, may not be recognized by all employers or institutions

**No Guarantee of Results:**
- Individual results vary based on effort, background, and other factors
- Completion of any course or program does not guarantee employment or career advancement
- Skills and knowledge gained depend on individual commitment and application

`;
      }

      if (formData.isRealEstateSite) {
        const reSubNum = (formData.isHealthSite ? 1 : 0) + (formData.isFinanceSite ? 1 : 0) + (formData.isLegalSite ? 1 : 0) + (formData.isTaxSite ? 1 : 0) + (formData.isFitnessSite ? 1 : 0) + (formData.isEducationSite ? 1 : 0) + 2;
        disclaimer += `### ${sectionNum}.${reSubNum} Real Estate Disclaimer

The real estate information on this Website is for general informational purposes only.

**Key Points:**
- We are not licensed real estate agents, brokers, or appraisers (unless explicitly stated)
- Property values, market conditions, and regulations vary by location
- Always conduct your own due diligence before any real estate transaction
- Consult with licensed real estate professionals in your area

**Important Notes:**
- Property listings may contain errors or be outdated
- Availability, pricing, and terms are subject to change without notice
- Square footage and property details should be independently verified
- We do not guarantee the accuracy of any property information

`;
      }

      if (formData.isTechSite) {
        const techSubNum = (formData.isHealthSite ? 1 : 0) + (formData.isFinanceSite ? 1 : 0) + (formData.isLegalSite ? 1 : 0) + (formData.isTaxSite ? 1 : 0) + (formData.isFitnessSite ? 1 : 0) + (formData.isEducationSite ? 1 : 0) + (formData.isRealEstateSite ? 1 : 0) + 2;
        disclaimer += `### ${sectionNum}.${techSubNum} Technology and Software Disclaimer

The technology information, code samples, and software recommendations on this Website are provided for informational and educational purposes only.

**Key Points:**
- Code samples are provided "as is" without warranty of any kind
- We are not responsible for any damage caused by implementing suggestions from this Website
- Always test code in a development environment before deploying to production
- Technology changes rapidly; information may become outdated

**Important Warnings:**
- Back up your data before making any system changes
- We are not responsible for data loss or system failures
- Software recommendations are our opinions and may not suit your specific needs
- Always verify compatibility with your systems before implementation

`;
      }

      sectionNum++;
    }

    // Website Availability
    if (formData.availabilityDisclaimer) {
      disclaimer += `## ${sectionNum}. Website Availability

### ${sectionNum}.1 No Guarantee of Availability

We do not guarantee that our Website will be available at all times. The Website may experience downtime for maintenance, updates, technical issues, or other reasons beyond our control.

### ${sectionNum}.2 Service Interruptions

We reserve the right to modify, suspend, or discontinue, temporarily or permanently, the Website (or any part of it) with or without notice. We shall not be liable to you or to any third party for any modification, suspension, or discontinuance of the Website.

### ${sectionNum}.3 Technical Issues

We are not responsible for any technical issues that may affect your ability to access the Website, including but not limited to:
- Internet connection issues
- Browser compatibility issues
- Device compatibility issues
- Network outages
- Server errors or downtime

`;
      sectionNum++;
    }

    // Views Expressed
    if (formData.viewsExpressed) {
      disclaimer += `## ${sectionNum}. Views Expressed

### ${sectionNum}.1 Personal Opinions

The views and opinions expressed on this Website are those of the original authors and other contributors. These views and opinions do not necessarily represent those of ${formData.companyName || "[Company Name]"}, its owners, employees, affiliates, or other contributors.

### ${sectionNum}.2 Guest Content

Any opinions expressed by guest authors or contributors are solely their own and do not necessarily reflect the opinions of ${formData.companyName || "[Company Name]"}. We are not responsible for the accuracy or reliability of any opinion, advice, or statement made on this Website by anyone other than an authorized spokesperson of ${formData.companyName || "[Company Name]"}.

### ${sectionNum}.3 Comments and User Contributions

Comments and user-generated content do not represent the views of ${formData.companyName || "[Company Name]"}. We reserve the right, but are not obligated, to monitor, edit, or remove any comments or user content.

`;
      sectionNum++;
    }

    // External Links
    if (formData.externalLinksDisclaimer) {
      disclaimer += `## ${sectionNum}. External Links Disclaimer

### ${sectionNum}.1 Third-Party Websites

This Website may contain links to external websites that are not provided or maintained by or in any way affiliated with ${formData.companyName || "[Company Name]"}.

We have no control over the nature, content, availability, privacy policies, or practices of these external sites and are not responsible for:
- The accuracy or reliability of information on external sites
- The privacy practices of external sites
- The security of external sites
- Any products or services offered by external sites
- Any content, advertising, or materials on external sites

### ${sectionNum}.2 No Endorsement

The inclusion of any links does not necessarily imply a recommendation or endorsement of the views expressed within them. We are providing these links only as a convenience, and the inclusion of any link does not imply affiliation, endorsement, or adoption by us of any site or any information contained therein.

### ${sectionNum}.3 Link at Your Own Risk

When you click on a link to a third-party website, you leave our Website and are subject to the terms, conditions, and privacy policies of that third-party website. We encourage you to read the privacy policies and terms of service of any external site you visit.

`;
      sectionNum++;
    }

    // Third-Party Products/Services
    if (formData.thirdPartyProducts || formData.thirdPartyServices) {
      disclaimer += `## ${sectionNum}. Third-Party Products and Services

`;

      if (formData.thirdPartyProducts) {
        disclaimer += `### ${sectionNum}.1 Third-Party Products

This Website may reference, recommend, or feature third-party products. We are not responsible for:
- The quality, safety, or legality of any third-party products
- The accuracy of any product descriptions or claims made by third parties
- Any damages arising from the use of third-party products
- The fulfillment of orders by third-party vendors

Any third-party trademarks or product names mentioned on this Website are the property of their respective owners and are used for identification purposes only.

`;
      }

      if (formData.thirdPartyServices) {
        disclaimer += `### ${sectionNum}.${formData.thirdPartyProducts ? "2" : "1"} Third-Party Services

This Website may reference or recommend third-party services. We are not responsible for:
- The quality, reliability, or performance of third-party services
- Any agreements or contracts between you and third-party service providers
- The privacy practices or security measures of third-party service providers
- Any issues arising from your use of third-party services

`;
      }
      sectionNum++;
    }

    // Affiliate Disclosure
    if (formData.affiliateDisclaimer) {
      disclaimer += `## ${sectionNum}. Affiliate Disclosure

### ${sectionNum}.1 Affiliate Relationships

${formData.companyName || "[Company Name]"} is a participant in various affiliate marketing programs, which means we may earn commissions on purchases made through our links to retailer sites.

### ${sectionNum}.2 How Affiliate Links Work

When you click on an affiliate link on our Website and make a purchase, we may receive a small commission at no additional cost to you. This helps us maintain and improve our Website.

### ${sectionNum}.3 FTC Disclosure

In accordance with the Federal Trade Commission's guidelines, we disclose that:
- We may receive compensation for links, reviews, and recommendations on this Website
- Our opinions are our own and are not influenced by affiliate relationships
- We only recommend products and services we genuinely believe will provide value to our readers

### ${sectionNum}.4 Our Commitment

Despite affiliate relationships, we strive to provide honest, unbiased information. Our recommendations are based on our research and experience, not solely on commission rates. However, you should always conduct your own research before making any purchase decisions.

`;
      sectionNum++;
    }

    // Sponsored Content
    if (formData.sponsoredContent) {
      disclaimer += `## ${sectionNum}. Sponsored Content Disclosure

### ${sectionNum}.1 Sponsored Posts

From time to time, we may publish sponsored content on this Website. Sponsored content is content that we are compensated to create or publish by a third party.

### ${sectionNum}.2 Identification

All sponsored content will be clearly identified as "Sponsored," "Paid Partnership," "Advertisement," or similar language.

### ${sectionNum}.3 Editorial Independence

While we receive compensation for sponsored content, we maintain editorial control over the content. However, the views expressed in sponsored content may not necessarily reflect our own views or opinions.

### ${sectionNum}.4 Your Responsibility

You should evaluate sponsored content with the understanding that we have been compensated for its publication. We encourage you to conduct your own research before acting on any information in sponsored content.

`;
      sectionNum++;
    }

    // Product Reviews
    if (formData.productReviews) {
      disclaimer += `## ${sectionNum}. Product Reviews Disclaimer

### ${sectionNum}.1 Review Process

Product reviews on this Website represent our honest opinions based on our testing and research. However, individual experiences may vary.

### ${sectionNum}.2 Compensation and Free Products

We may receive compensation, free products, or discounts from companies whose products we review. When this occurs, we will disclose this relationship.

### ${sectionNum}.3 No Guarantee

We do not guarantee that you will experience the same results as described in our reviews. Product performance may vary based on individual circumstances, usage patterns, and other factors.

### ${sectionNum}.4 Affiliate Relationships

Some product reviews may contain affiliate links. See our Affiliate Disclosure for more information.

`;
      sectionNum++;
    }

    // Earnings Disclaimer
    if (formData.earningsDisclaimer) {
      disclaimer += `## ${sectionNum}. Earnings Disclaimer

### ${sectionNum}.1 No Income Guarantees

Any income or earnings statements, testimonials, or examples shown on this Website are not guarantees of income or earnings. Your results will vary and depend on many factors, including but not limited to your background, experience, effort, and market conditions.

### ${sectionNum}.2 Individual Results Vary

There is no assurance that any prior successes or past results regarding income earnings can be used as an indication of your future success or results. We cannot guarantee that you will achieve similar results.

### ${sectionNum}.3 Not Financial Advice

Any references to income, earnings, or revenue are for illustrative purposes only and should not be construed as financial advice or as a promise, guarantee, or projection of your potential earnings.

### ${sectionNum}.4 Your Responsibility

Success in business and income generation requires hard work, dedication, and skills. We make no representations about your ability to achieve any particular financial results.

`;
      sectionNum++;
    }

    // Testimonials
    if (formData.testimonialsDisclaimer) {
      disclaimer += `## ${sectionNum}. Testimonials Disclaimer

### ${sectionNum}.1 Individual Experiences

The testimonials on this Website represent the real-life experiences and opinions of actual users. However, the experiences are personal to those particular users and may not necessarily be representative of all users of our products and/or services.

### ${sectionNum}.2 No Guarantee of Results

We do not claim, and you should not assume, that all users will have the same experiences. Your individual results may vary based on many factors.

### ${sectionNum}.3 Testimonial Authenticity

The testimonials displayed on this Website are given verbatim except for correction of grammatical or typing errors. Some testimonials may have been shortened for space considerations.

### ${sectionNum}.4 Material Connections

Some individuals providing testimonials may have received free products, services, or other compensation. We will disclose any material connections where required by law.

`;
      sectionNum++;
    }

    // User-Generated Content
    if (formData.userGeneratedContent) {
      disclaimer += `## ${sectionNum}. User-Generated Content Disclaimer

### ${sectionNum}.1 Not Our Content

This Website may include user-generated content, including but not limited to comments, reviews, forum posts, and other submissions. Such content is the responsibility of the person who posted it, and we do not endorse or guarantee the accuracy, completeness, or usefulness of any user-generated content.

### ${sectionNum}.2 No Liability

We are not responsible or liable for any user-generated content, including but not limited to:
- Defamatory, offensive, or illegal content
- Infringement of intellectual property rights
- Privacy violations
- False or misleading information

### ${sectionNum}.3 Right to Remove

We reserve the right, but are not obligated, to monitor, edit, or remove any user-generated content that we determine, in our sole discretion, is unlawful, offensive, threatening, libelous, defamatory, obscene, or otherwise objectionable.

### ${sectionNum}.4 Your Responsibility

If you post content on this Website, you are solely responsible for ensuring that your content does not violate any laws or infringe on the rights of others.

`;
      sectionNum++;
    }

    // Copyright and Fair Use
    if (formData.copyrightFairUse) {
      disclaimer += `## ${sectionNum}. Copyright and Fair Use

### ${sectionNum}.1 Ownership of Content

Unless otherwise stated, ${formData.companyName || "[Company Name]"} and/or its licensors own the intellectual property rights for all content on this Website. All intellectual property rights are reserved.

### ${sectionNum}.2 Fair Use Notice

This Website may contain copyrighted material, the use of which has not always been specifically authorized by the copyright owner. We are making such material available in our efforts to advance understanding of various topics.

We believe this constitutes a "fair use" of any such copyrighted material as provided for in Section 107 of the US Copyright Law. The material is distributed without profit for research and educational purposes.

### ${sectionNum}.3 DMCA Compliance

If you believe that content on this Website infringes your copyright, please contact us with a detailed DMCA notice. We will respond to valid notices in accordance with the Digital Millennium Copyright Act.

### ${sectionNum}.4 Permission Required

If you wish to use copyrighted material from this Website for purposes of your own that go beyond "fair use," you must obtain permission from the copyright owner.

`;
      sectionNum++;
    }

    // Pricing Disclaimer
    if (formData.pricingDisclaimer) {
      disclaimer += `## ${sectionNum}. Pricing Disclaimer

### ${sectionNum}.1 Prices Subject to Change

All prices displayed on this Website are subject to change without notice. While we make every effort to ensure that prices are accurate, errors may occur.

### ${sectionNum}.2 No Price Guarantee

We do not guarantee that prices shown on this Website will match prices available elsewhere or in physical stores. Prices may vary based on location, promotions, and other factors.

### ${sectionNum}.3 Currency and Taxes

Unless otherwise stated, all prices are displayed in ${formData.country === "United States" ? "US Dollars (USD)" : "the local currency"} and do not include applicable taxes, shipping, or other fees.

### ${sectionNum}.4 Price Errors

In the event of a pricing error, we reserve the right to cancel any orders placed at the incorrect price and will notify you of any such cancellation.

`;
      sectionNum++;
    }

    // Technical Disclaimer
    if (formData.technicalDisclaimer) {
      disclaimer += `## ${sectionNum}. Technical Information Disclaimer

### ${sectionNum}.1 Technical Accuracy

While we strive to provide accurate technical information, we cannot guarantee that all technical specifications, system requirements, or other technical details on this Website are error-free or current.

### ${sectionNum}.2 Compatibility

We do not guarantee compatibility of any software, code, or technical solutions mentioned on this Website with your specific systems, devices, or configurations.

### ${sectionNum}.3 Implementation Risk

If you choose to implement any technical solutions, code, or recommendations from this Website, you do so at your own risk. Always back up your data and test in a non-production environment first.

### ${sectionNum}.4 No Support Obligation

Unless otherwise stated, we are not obligated to provide technical support, updates, or bug fixes for any technical information provided on this Website.

`;
      sectionNum++;
    }

    // Security Disclaimer
    if (formData.securityDisclaimer) {
      disclaimer += `## ${sectionNum}. Security Disclaimer

### ${sectionNum}.1 Internet Security

While we implement security measures to protect your information, no data transmission over the Internet or electronic storage system can be guaranteed to be 100% secure.

### ${sectionNum}.2 Your Responsibility

You are responsible for maintaining the security of your devices, accounts, and passwords. We are not responsible for any unauthorized access resulting from your failure to maintain security.

### ${sectionNum}.3 No Guarantee

We cannot guarantee that our security measures will prevent all unauthorized access, data breaches, or cyberattacks. We disclaim any liability for losses resulting from such events beyond our reasonable control.

`;
      sectionNum++;
    }

    // Limitation of Liability
    if (formData.limitationOfLiability) {
      disclaimer += `## ${sectionNum}. Limitation of Liability

### ${sectionNum}.1 No Liability for Damages

TO THE MAXIMUM EXTENT PERMITTED BY APPLICABLE LAW, IN NO EVENT SHALL ${(formData.companyName || "[COMPANY NAME]").toUpperCase()}, ITS DIRECTORS, EMPLOYEES, PARTNERS, AGENTS, SUPPLIERS, OR AFFILIATES BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES, INCLUDING WITHOUT LIMITATION:

- Loss of profits, revenue, or data
- Loss of goodwill or reputation
- Cost of substitute goods or services
- Any other intangible losses

WHETHER BASED ON WARRANTY, CONTRACT, TORT (INCLUDING NEGLIGENCE), STRICT LIABILITY, OR ANY OTHER LEGAL THEORY, WHETHER OR NOT WE HAVE BEEN INFORMED OF THE POSSIBILITY OF SUCH DAMAGES.

### ${sectionNum}.2 Cap on Liability

TO THE MAXIMUM EXTENT PERMITTED BY APPLICABLE LAW, OUR TOTAL LIABILITY TO YOU FOR ALL CLAIMS ARISING OUT OF OR RELATING TO THE USE OF OR ANY INABILITY TO USE ANY PORTION OF THE WEBSITE OR OTHERWISE UNDER THIS DISCLAIMER, WHETHER IN CONTRACT, TORT, OR OTHERWISE, IS LIMITED TO THE GREATER OF (A) THE AMOUNT YOU HAVE PAID TO ${(formData.companyName || "[COMPANY NAME]").toUpperCase()} FOR ACCESS TO AND USE OF THE WEBSITE IN THE 12 MONTHS PRIOR TO THE EVENT GIVING RISE TO THE CLAIM, OR (B) $100.

### ${sectionNum}.3 Essential Basis

THE LIMITATIONS OF LIABILITY SET FORTH IN THIS SECTION SHALL APPLY EVEN IF THE REMEDIES SET FORTH HEREIN FAIL OF THEIR ESSENTIAL PURPOSE AND EVEN IF WE HAVE BEEN ADVISED OF THE POSSIBILITY OF SUCH DAMAGES.

### ${sectionNum}.4 Jurisdictional Limitations

SOME JURISDICTIONS DO NOT ALLOW THE EXCLUSION OR LIMITATION OF LIABILITY FOR CONSEQUENTIAL OR INCIDENTAL DAMAGES, SO THE ABOVE LIMITATION MAY NOT APPLY TO YOU. IN SUCH JURISDICTIONS, OUR LIABILITY IS LIMITED TO THE MAXIMUM EXTENT PERMITTED BY LAW.

`;
      sectionNum++;
    }

    // No Warranties
    if (formData.noWarranties) {
      disclaimer += `## ${sectionNum}. Disclaimer of Warranties

### ${sectionNum}.1 "As Is" Basis

THE WEBSITE AND ALL CONTENT, INFORMATION, PRODUCTS, AND SERVICES INCLUDED ON OR OTHERWISE MADE AVAILABLE TO YOU THROUGH THE WEBSITE ARE PROVIDED ON AN "AS IS" AND "AS AVAILABLE" BASIS, WITHOUT ANY WARRANTIES OF ANY KIND, EITHER EXPRESS OR IMPLIED.

### ${sectionNum}.2 No Warranties

TO THE FULLEST EXTENT PERMITTED BY APPLICABLE LAW, WE DISCLAIM ALL WARRANTIES, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO:

- IMPLIED WARRANTIES OF MERCHANTABILITY
- FITNESS FOR A PARTICULAR PURPOSE
- NON-INFRINGEMENT
- TITLE
- CUSTOM
- TRADE
- QUIET ENJOYMENT
- SYSTEM INTEGRATION
- FREEDOM FROM COMPUTER VIRUS

### ${sectionNum}.3 No Guarantee

WE DO NOT WARRANT THAT:
- THE WEBSITE WILL MEET YOUR SPECIFIC REQUIREMENTS
- THE WEBSITE WILL BE UNINTERRUPTED, TIMELY, SECURE, OR ERROR-FREE
- THE RESULTS OBTAINED FROM USE OF THE WEBSITE WILL BE ACCURATE OR RELIABLE
- ANY ERRORS IN THE WEBSITE WILL BE CORRECTED

### ${sectionNum}.4 Your Responsibility

ANY CONTENT DOWNLOADED OR OTHERWISE OBTAINED THROUGH THE USE OF THE WEBSITE IS ACCESSED AT YOUR OWN DISCRETION AND RISK, AND YOU WILL BE SOLELY RESPONSIBLE FOR ANY DAMAGE TO YOUR COMPUTER SYSTEM OR LOSS OF DATA THAT RESULTS FROM THE DOWNLOAD OF ANY SUCH MATERIAL.

`;
      sectionNum++;
    }

    // Indemnification
    if (formData.indemnification) {
      disclaimer += `## ${sectionNum}. Indemnification

### ${sectionNum}.1 Your Agreement to Indemnify

You agree to defend, indemnify, and hold harmless ${formData.companyName || "[Company Name]"}, its officers, directors, employees, agents, licensors, suppliers, and any third-party information providers from and against all claims, losses, expenses, damages, and costs (including reasonable attorneys' fees) arising out of or relating to:

- Your use or misuse of the Website
- Your violation of this Disclaimer or any applicable terms and conditions
- Your violation of any rights of another party, including any intellectual property rights
- Your violation of any applicable laws, rules, or regulations

### ${sectionNum}.2 Reservation of Rights

We reserve the right to assume the exclusive defense and control of any matter otherwise subject to indemnification by you, and you agree to cooperate with our defense of any claim.

`;
      sectionNum++;
    }

    // Force Majeure
    if (formData.forceClause) {
      disclaimer += `## ${sectionNum}. Force Majeure

We shall not be liable for any failure or delay in performing our obligations where such failure or delay results from any cause beyond our reasonable control, including but not limited to:

- Acts of God, nature, or the public enemy
- War, terrorism, riots, or civil unrest
- Government actions or regulations
- Fire, flood, earthquake, or other natural disasters
- Epidemics, pandemics, or public health emergencies
- Power outages or telecommunications failures
- Labor disputes or strikes
- Internet service provider failures

`;
      sectionNum++;
    }

    // Jurisdiction
    if (formData.jurisdictionClause) {
      disclaimer += `## ${sectionNum}. Governing Law and Jurisdiction

### ${sectionNum}.1 Governing Law

This Disclaimer and your use of the Website shall be governed by and construed in accordance with the laws of the ${formData.jurisdiction || "[State/Country]"}, without giving effect to any principles of conflicts of law.

### ${sectionNum}.2 Exclusive Jurisdiction

Any dispute arising out of or relating to this Disclaimer or your use of the Website shall be subject to the exclusive jurisdiction of the courts located in ${formData.jurisdiction || "[State/Country]"}, and you hereby consent to the personal jurisdiction of such courts.

### ${sectionNum}.3 Waiver of Jury Trial

TO THE EXTENT PERMITTED BY APPLICABLE LAW, YOU AND ${(formData.companyName || "[COMPANY NAME]").toUpperCase()} WAIVE ANY RIGHT TO A JURY TRIAL IN ANY ACTION OR PROCEEDING ARISING OUT OF OR RELATING TO THIS DISCLAIMER OR YOUR USE OF THE WEBSITE.

`;
      sectionNum++;
    }

    // Changes to Disclaimer
    if (formData.changesToContentDisclaimer) {
      disclaimer += `## ${sectionNum}. Changes to This Disclaimer

### ${sectionNum}.1 Right to Modify

We reserve the right to modify this Disclaimer at any time. Changes and clarifications will take effect immediately upon their posting on the Website.

### ${sectionNum}.2 Notification of Changes

Material changes to this Disclaimer will be indicated by updating the "Last Updated" date at the top of this page. We encourage you to review this Disclaimer periodically.

### ${sectionNum}.3 Continued Use

Your continued use of the Website after the posting of changes constitutes your acceptance of such changes. If you do not agree with any changes to this Disclaimer, you should discontinue your use of the Website.

`;
      sectionNum++;
    }

    // Custom Disclaimers
    if (formData.customDisclaimers && formData.customDisclaimers.trim()) {
      disclaimer += `## ${sectionNum}. Additional Disclaimers

${formData.customDisclaimers}

`;
      sectionNum++;
    }

    // Contact Section
    disclaimer += `## ${sectionNum}. Contact Us

If you have any questions about this Disclaimer, please contact us:

**${formData.companyName || "[Company Name]"}**
${formData.companyAddress ? `Address: ${formData.companyAddress}\n` : ""}Email: ${formData.contactEmail || "[Contact Email]"}
Website: ${formData.websiteUrl || "[Website URL]"}

We will respond to your inquiry as soon as reasonably possible.

---

*This Disclaimer was generated using TermsZipp. While this document covers common disclaimer requirements, we strongly recommend having it reviewed by a qualified legal professional to ensure it meets all applicable laws and regulations for your specific business and jurisdiction.*
`;

    setGeneratedDisclaimer(disclaimer);
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
              <AlertTriangle className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold">Disclaimer Generator</h1>
              <p className="text-muted-foreground">Create a comprehensive liability disclaimer for your website</p>
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
                  {s === 1 ? 'Business' : s === 2 ? 'General' : s === 3 ? 'Industry' : s === 4 ? 'Legal' : 'Generate'}
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
                  <Label htmlFor="companyAddress">Business Address (optional)</Label>
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
                        <SelectItem value="general">General Website</SelectItem>
                        <SelectItem value="blog">Blog / Content</SelectItem>
                        <SelectItem value="ecommerce">E-commerce</SelectItem>
                        <SelectItem value="saas">SaaS / Software</SelectItem>
                        <SelectItem value="agency">Agency / Services</SelectItem>
                        <SelectItem value="education">Education</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
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

          {/* Step 2: General Disclaimers */}
          {step === 2 && (
            <Card className="p-6">
              <h2 className="text-lg font-semibold mb-6">General Disclaimers</h2>
              <p className="text-sm text-muted-foreground mb-4">Select the general disclaimer sections to include:</p>
              
              <div className="space-y-3">
                {[
                  { key: 'generalDisclaimer', label: 'General Information Disclaimer', desc: 'Basic disclaimer about information accuracy and use at own risk' },
                  { key: 'accuracyDisclaimer', label: 'Accuracy of Information', desc: 'No guarantees about accuracy or timeliness of content' },
                  { key: 'errorDisclaimer', label: 'Errors & Omissions', desc: 'Disclaimer for typographical and technical errors' },
                  { key: 'availabilityDisclaimer', label: 'Website Availability', desc: 'No guarantee of uptime or availability' },
                  { key: 'changesToContentDisclaimer', label: 'Changes to Content', desc: 'Right to modify content and disclaimer at any time' },
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

              <h3 className="text-md font-medium mt-6 mb-4">Content & Third-Party</h3>
              <div className="space-y-3">
                {[
                  { key: 'viewsExpressed', label: 'Views Expressed', desc: 'Opinions are those of authors, not the company' },
                  { key: 'externalLinksDisclaimer', label: 'External Links', desc: 'No responsibility for third-party websites' },
                  { key: 'thirdPartyProducts', label: 'Third-Party Products', desc: 'No responsibility for third-party product quality' },
                  { key: 'thirdPartyServices', label: 'Third-Party Services', desc: 'No responsibility for third-party service reliability' },
                  { key: 'userGeneratedContent', label: 'User-Generated Content', desc: 'No responsibility for user comments/posts' },
                  { key: 'copyrightFairUse', label: 'Copyright & Fair Use', desc: 'Copyright ownership and fair use notice' },
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

          {/* Step 3: Industry-Specific */}
          {step === 3 && (
            <Card className="p-6">
              <h2 className="text-lg font-semibold mb-6">Industry-Specific Disclaimers</h2>
              
              <div className="flex items-center space-x-2 mb-4">
                <Checkbox
                  id="noProfessionalAdvice"
                  checked={formData.noProfessionalAdvice}
                  onCheckedChange={(checked) => updateForm('noProfessionalAdvice', checked as boolean)}
                />
                <Label htmlFor="noProfessionalAdvice" className="text-sm font-medium">Include "No Professional Advice" Disclaimer</Label>
              </div>

              <p className="text-sm text-muted-foreground mb-4">Does your website contain content in any of these areas?</p>
              
              <div className="grid grid-cols-2 gap-3 mb-6">
                {[
                  { key: 'isHealthSite', label: 'Health & Medical' },
                  { key: 'isFinanceSite', label: 'Financial / Investment' },
                  { key: 'isLegalSite', label: 'Legal Information' },
                  { key: 'isTaxSite', label: 'Tax Information' },
                  { key: 'isFitnessSite', label: 'Fitness & Exercise' },
                  { key: 'isEducationSite', label: 'Education / Training' },
                  { key: 'isRealEstateSite', label: 'Real Estate' },
                  { key: 'isTechSite', label: 'Technology / Code' },
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

              <h3 className="text-md font-medium mb-4">Monetization & Reviews</h3>
              <div className="space-y-3">
                {[
                  { key: 'affiliateDisclaimer', label: 'Affiliate Disclosure', desc: 'Earn commissions from affiliate links' },
                  { key: 'sponsoredContent', label: 'Sponsored Content', desc: 'Publish paid/sponsored posts' },
                  { key: 'productReviews', label: 'Product Reviews', desc: 'Review products (may receive free samples)' },
                  { key: 'testimonialsDisclaimer', label: 'Testimonials', desc: 'Display user testimonials or reviews' },
                  { key: 'earningsDisclaimer', label: 'Earnings Disclaimer', desc: 'Reference income or earnings potential' },
                  { key: 'pricingDisclaimer', label: 'Pricing Disclaimer', desc: 'Display product/service pricing' },
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

              <h3 className="text-md font-medium mt-6 mb-4">Technical</h3>
              <div className="grid grid-cols-2 gap-3">
                {[
                  { key: 'technicalDisclaimer', label: 'Technical Info Disclaimer' },
                  { key: 'securityDisclaimer', label: 'Security Disclaimer' },
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

          {/* Step 4: Legal Clauses */}
          {step === 4 && (
            <Card className="p-6">
              <h2 className="text-lg font-semibold mb-6">Legal Protections</h2>
              
              <div className="space-y-3 mb-6">
                {[
                  { key: 'limitationOfLiability', label: 'Limitation of Liability', desc: 'Caps liability and excludes certain damages' },
                  { key: 'noWarranties', label: 'Disclaimer of Warranties', desc: '"As is" basis, no express or implied warranties' },
                  { key: 'indemnification', label: 'Indemnification Clause', desc: 'Users agree to defend and hold harmless' },
                  { key: 'jurisdictionClause', label: 'Governing Law & Jurisdiction', desc: 'Specify applicable law and courts' },
                  { key: 'forceClause', label: 'Force Majeure', desc: 'Not liable for events beyond control' },
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

              {formData.jurisdictionClause && (
                <div className="mb-6">
                  <Label htmlFor="jurisdiction">Governing Jurisdiction</Label>
                  <Input
                    id="jurisdiction"
                    value={formData.jurisdiction}
                    onChange={(e) => updateForm('jurisdiction', e.target.value)}
                    placeholder="State of Delaware, United States"
                    className="mt-1"
                  />
                  <p className="text-xs text-muted-foreground mt-1">The state/country whose laws will govern this disclaimer</p>
                </div>
              )}

              <div>
                <Label htmlFor="customDisclaimers">Custom Disclaimers (optional)</Label>
                <Textarea
                  id="customDisclaimers"
                  value={formData.customDisclaimers}
                  onChange={(e) => updateForm('customDisclaimers', e.target.value)}
                  placeholder="Add any additional disclaimers specific to your business..."
                  className="mt-1"
                  rows={4}
                />
                <p className="text-xs text-muted-foreground mt-1">Use Markdown formatting if desired</p>
              </div>

              <div className="flex justify-between mt-6">
                <Button variant="outline" onClick={() => setStep(3)}>
                  <ArrowLeft className="mr-2 h-4 w-4" /> Back
                </Button>
                <Button onClick={generateDisclaimer} className="btn-gradient">
                  Generate Disclaimer <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </Card>
          )}

          {/* Step 5: Generated Disclaimer */}
          {step === 5 && (
            <div className="space-y-4">
              <DocumentPreviewGate 
                content={generatedDisclaimer} 
                documentType="Disclaimer"
                documentTypeSlug="disclaimer"
                formData={{ ...formData }}
              />

              {/* Disclaimer */}
              <Card className="p-4 bg-amber-50 border-amber-200">
                <div className="flex gap-3">
                  <AlertTriangle className="h-5 w-5 text-amber-600 shrink-0" />
                  <div className="text-sm text-amber-800">
                    <strong>Legal Disclaimer:</strong> This disclaimer template covers common requirements but may not address all legal requirements for your specific business, industry, or jurisdiction. We strongly recommend having this document reviewed by a qualified attorney.
                  </div>
                </div>
              </Card>

              <div className="flex justify-between">
                <Button variant="outline" onClick={() => setStep(4)}>
                  <ArrowLeft className="mr-2 h-4 w-4" /> Edit Options
                </Button>
                <Button className="btn-gradient" asChild>
                  <Link href="/refund-policy">
                    Generate Refund Policy <ArrowRight className="ml-2 h-4 w-4" />
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
