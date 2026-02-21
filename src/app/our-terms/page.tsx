import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Service - TermsZipp",
  description: "Terms of Service for TermsZipp legal document generator service.",
};

export default function OurTermsPage() {
  const lastUpdated = "February 21, 2025";
  const companyName = "TermsZipp";
  const companyEmail = "legal@termszipp.com";
  const websiteUrl = "https://termszipp.com";

  return (
    <div className="min-h-screen bg-white">
      <div className="container mx-auto px-4 py-16 max-w-4xl">
        <h1 className="text-4xl font-bold mb-4">Terms of Service</h1>
        <p className="text-muted-foreground mb-8">Last Updated: {lastUpdated}</p>

        <div className="prose prose-slate max-w-none">
          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">1. Agreement to Terms</h2>
            <p className="mb-4">
              By accessing or using {companyName} ("{websiteUrl}"), you agree to be bound by these Terms of Service ("Terms"). 
              If you disagree with any part of these terms, you may not access our service.
            </p>
            <p className="mb-4">
              These Terms apply to all visitors, users, and others who access or use our Service, including users of our 
              free tier and paid subscription plans.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">2. Description of Service</h2>
            <p className="mb-4">
              {companyName} provides an online platform that generates legal document templates, including but not limited to:
            </p>
            <ul className="list-disc pl-6 mb-4 space-y-2">
              <li>Privacy Policies</li>
              <li>Terms of Service / Terms and Conditions</li>
              <li>Cookie Policies</li>
              <li>Disclaimers</li>
              <li>Refund Policies</li>
              <li>End User License Agreements (EULAs)</li>
            </ul>
          </section>

          <section className="mb-8 bg-amber-50 border border-amber-200 rounded-lg p-6">
            <h2 className="text-2xl font-semibold mb-4 text-amber-800">3. IMPORTANT DISCLAIMER - NOT LEGAL ADVICE</h2>
            <p className="mb-4 text-amber-900 font-medium">
              THE DOCUMENTS AND CONTENT PROVIDED BY {companyName.toUpperCase()} ARE FOR INFORMATIONAL PURPOSES ONLY AND DO NOT 
              CONSTITUTE LEGAL ADVICE. {companyName.toUpperCase()} IS NOT A LAW FIRM AND DOES NOT PROVIDE LEGAL SERVICES.
            </p>
            <p className="mb-4">
              <strong>You acknowledge and agree that:</strong>
            </p>
            <ul className="list-disc pl-6 mb-4 space-y-2">
              <li>The document templates provided are general in nature and may not be suitable for your specific circumstances, jurisdiction, or legal requirements.</li>
              <li>No attorney-client relationship is created between you and {companyName} or any of its employees, agents, or affiliates.</li>
              <li>The use of our templates does not guarantee legal compliance or protection from liability.</li>
              <li>Laws and regulations vary by jurisdiction and change frequently. Our templates may not reflect the most current legal requirements in your area.</li>
              <li>You are solely responsible for ensuring that any documents you use comply with applicable laws and regulations.</li>
              <li><strong>WE STRONGLY RECOMMEND THAT YOU CONSULT WITH A QUALIFIED ATTORNEY</strong> licensed in your jurisdiction before using any legal document on your website or in your business operations.</li>
            </ul>
            <p className="text-amber-900 font-medium">
              BY USING OUR SERVICE, YOU ACKNOWLEDGE THAT YOU HAVE READ, UNDERSTOOD, AND AGREE TO THIS DISCLAIMER.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">4. User Accounts</h2>
            <h3 className="text-xl font-medium mb-2">4.1 Account Creation</h3>
            <p className="mb-4">
              To access certain features of our Service, you must create an account. You agree to:
            </p>
            <ul className="list-disc pl-6 mb-4 space-y-2">
              <li>Provide accurate, current, and complete information during registration</li>
              <li>Maintain and promptly update your account information</li>
              <li>Maintain the security of your password and accept all risks of unauthorized access</li>
              <li>Immediately notify us of any unauthorized use of your account</li>
            </ul>

            <h3 className="text-xl font-medium mb-2">4.2 Account Responsibilities</h3>
            <p className="mb-4">
              You are responsible for all activities that occur under your account. You may not share your account 
              credentials with others or allow others to access your account, except as permitted under team/enterprise plans.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">5. Subscription Plans and Payment</h2>
            <h3 className="text-xl font-medium mb-2">5.1 Subscription Tiers</h3>
            <p className="mb-4">
              We offer various subscription tiers (Free, Pro, Premium) with different features and limitations. 
              Details of each plan are available on our pricing page.
            </p>

            <h3 className="text-xl font-medium mb-2">5.2 Payment Terms</h3>
            <ul className="list-disc pl-6 mb-4 space-y-2">
              <li>Paid subscriptions are billed in advance on a monthly or annual basis.</li>
              <li>All payments are processed securely through Stripe, our third-party payment processor.</li>
              <li>Prices are listed in US Dollars (USD) unless otherwise specified.</li>
              <li>You authorize us to charge your payment method for all fees incurred.</li>
            </ul>

            <h3 className="text-xl font-medium mb-2">5.3 Automatic Renewal</h3>
            <p className="mb-4">
              Your subscription will automatically renew at the end of each billing period unless you cancel it 
              before the renewal date. You can cancel your subscription at any time through your account settings 
              or the Stripe billing portal.
            </p>

            <h3 className="text-xl font-medium mb-2">5.4 Refund Policy</h3>
            <p className="mb-4">
              We offer a 14-day money-back guarantee for new paid subscriptions. If you are not satisfied with our 
              service, you may request a full refund within 14 days of your initial purchase. Refund requests after 
              this period will be considered on a case-by-case basis. To request a refund, contact us at {companyEmail}.
            </p>

            <h3 className="text-xl font-medium mb-2">5.5 Price Changes</h3>
            <p className="mb-4">
              We reserve the right to modify our prices at any time. Any price changes will be communicated to you 
              in advance and will take effect at the start of your next billing cycle.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">6. Acceptable Use</h2>
            <p className="mb-4">You agree NOT to use our Service to:</p>
            <ul className="list-disc pl-6 mb-4 space-y-2">
              <li>Violate any applicable laws or regulations</li>
              <li>Infringe upon the intellectual property rights of others</li>
              <li>Transmit any malicious code, viruses, or harmful data</li>
              <li>Attempt to gain unauthorized access to our systems or other users' accounts</li>
              <li>Interfere with or disrupt the integrity or performance of our Service</li>
              <li>Resell, redistribute, or commercially exploit our Service without authorization</li>
              <li>Use automated tools to scrape, crawl, or extract data from our Service</li>
              <li>Create multiple accounts to abuse free tier limitations</li>
              <li>Misrepresent your identity or affiliation</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">7. Intellectual Property</h2>
            <h3 className="text-xl font-medium mb-2">7.1 Our Intellectual Property</h3>
            <p className="mb-4">
              The Service, including its original content, features, functionality, and underlying technology, 
              is owned by {companyName} and is protected by copyright, trademark, and other intellectual property laws.
            </p>

            <h3 className="text-xl font-medium mb-2">7.2 Your Use of Generated Documents</h3>
            <p className="mb-4">
              Documents generated through our Service are provided to you for your personal or business use. 
              You may use, modify, and publish these documents on your own websites and applications. However, 
              you may not resell or redistribute the templates themselves as a competing service.
            </p>

            <h3 className="text-xl font-medium mb-2">7.3 Feedback</h3>
            <p className="mb-4">
              Any feedback, suggestions, or ideas you provide regarding our Service may be used by us without 
              any obligation to compensate you.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">8. Limitation of Liability</h2>
            <p className="mb-4 font-medium">
              TO THE MAXIMUM EXTENT PERMITTED BY APPLICABLE LAW:
            </p>
            <ul className="list-disc pl-6 mb-4 space-y-2">
              <li>
                {companyName.toUpperCase()}, ITS OFFICERS, DIRECTORS, EMPLOYEES, AND AGENTS SHALL NOT BE LIABLE FOR ANY 
                INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES, INCLUDING WITHOUT LIMITATION, 
                LOSS OF PROFITS, DATA, USE, GOODWILL, OR OTHER INTANGIBLE LOSSES.
              </li>
              <li>
                OUR TOTAL LIABILITY TO YOU FOR ANY CLAIMS ARISING FROM OR RELATED TO THESE TERMS OR THE SERVICE 
                SHALL NOT EXCEED THE AMOUNT YOU PAID TO US IN THE TWELVE (12) MONTHS PRECEDING THE CLAIM, OR 
                ONE HUNDRED DOLLARS ($100), WHICHEVER IS GREATER.
              </li>
              <li>
                WE SHALL NOT BE LIABLE FOR ANY DAMAGES, LIABILITY, OR LOSSES ARISING FROM YOUR USE OF OR RELIANCE 
                ON ANY DOCUMENTS GENERATED THROUGH OUR SERVICE.
              </li>
              <li>
                WE DO NOT GUARANTEE THAT THE SERVICE WILL BE UNINTERRUPTED, TIMELY, SECURE, OR ERROR-FREE.
              </li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">9. Indemnification</h2>
            <p className="mb-4">
              You agree to defend, indemnify, and hold harmless {companyName}, its officers, directors, employees, 
              and agents from and against any claims, damages, obligations, losses, liabilities, costs, or debt, 
              and expenses (including attorney's fees) arising from:
            </p>
            <ul className="list-disc pl-6 mb-4 space-y-2">
              <li>Your use of and access to the Service</li>
              <li>Your violation of these Terms</li>
              <li>Your violation of any third-party right, including intellectual property rights</li>
              <li>Any claim that your use of documents generated through our Service caused damage to a third party</li>
              <li>Your failure to obtain proper legal review of documents before use</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">10. Disclaimer of Warranties</h2>
            <p className="mb-4">
              THE SERVICE IS PROVIDED ON AN "AS IS" AND "AS AVAILABLE" BASIS WITHOUT WARRANTIES OF ANY KIND, 
              WHETHER EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO IMPLIED WARRANTIES OF MERCHANTABILITY, 
              FITNESS FOR A PARTICULAR PURPOSE, NON-INFRINGEMENT, OR COURSE OF PERFORMANCE.
            </p>
            <p className="mb-4">
              {companyName.toUpperCase()} DOES NOT WARRANT THAT:
            </p>
            <ul className="list-disc pl-6 mb-4 space-y-2">
              <li>The Service will meet your specific requirements</li>
              <li>The documents generated will be legally sufficient or compliant in your jurisdiction</li>
              <li>The Service will be uninterrupted, timely, secure, or error-free</li>
              <li>Any errors in the Service will be corrected</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">11. Termination</h2>
            <p className="mb-4">
              We may terminate or suspend your account and access to the Service immediately, without prior notice 
              or liability, for any reason, including but not limited to a breach of these Terms.
            </p>
            <p className="mb-4">
              Upon termination, your right to use the Service will immediately cease. All provisions of these Terms 
              which by their nature should survive termination shall survive, including ownership provisions, 
              warranty disclaimers, indemnity, and limitations of liability.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">12. Governing Law and Dispute Resolution</h2>
            <p className="mb-4">
              These Terms shall be governed by and construed in accordance with the laws of the State of Delaware, 
              United States, without regard to its conflict of law provisions.
            </p>
            <p className="mb-4">
              Any dispute arising from or relating to these Terms or the Service shall first be attempted to be 
              resolved through good-faith negotiation. If the dispute cannot be resolved through negotiation within 
              30 days, either party may pursue binding arbitration or litigation in the courts of Delaware.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">13. Changes to Terms</h2>
            <p className="mb-4">
              We reserve the right to modify or replace these Terms at any time at our sole discretion. If a 
              revision is material, we will provide at least 30 days' notice prior to any new terms taking effect 
              by posting the updated Terms on this page and/or notifying you via email.
            </p>
            <p className="mb-4">
              Your continued use of the Service after any changes to these Terms constitutes your acceptance of 
              the new Terms.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">14. Severability</h2>
            <p className="mb-4">
              If any provision of these Terms is held to be unenforceable or invalid, such provision will be 
              changed and interpreted to accomplish the objectives of such provision to the greatest extent 
              possible under applicable law, and the remaining provisions will continue in full force and effect.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">15. Entire Agreement</h2>
            <p className="mb-4">
              These Terms, together with our Privacy Policy and any other legal notices published by us on the 
              Service, constitute the entire agreement between you and {companyName} regarding the Service and 
              supersede any prior agreements.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">16. Contact Us</h2>
            <p className="mb-4">
              If you have any questions about these Terms, please contact us at:
            </p>
            <p className="mb-2"><strong>{companyName}</strong></p>
            <p className="mb-2">Email: {companyEmail}</p>
            <p className="mb-2">Website: {websiteUrl}</p>
          </section>

          <div className="mt-12 p-4 bg-slate-100 rounded-lg">
            <p className="text-sm text-muted-foreground text-center">
              By using {companyName}, you acknowledge that you have read, understood, and agree to be bound by these Terms of Service.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
