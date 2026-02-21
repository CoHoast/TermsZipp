import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy - TermsZipp",
  description: "Privacy Policy for TermsZipp legal document generator service.",
};

export default function OurPrivacyPage() {
  const lastUpdated = "February 21, 2025";
  const companyName = "TermsZipp";
  const companyEmail = "privacy@termszipp.com";
  const websiteUrl = "https://termszipp.com";

  return (
    <div className="min-h-screen bg-white">
      <div className="container mx-auto px-4 py-16 max-w-4xl">
        <h1 className="text-4xl font-bold mb-4">Privacy Policy</h1>
        <p className="text-muted-foreground mb-8">Last Updated: {lastUpdated}</p>

        <div className="prose prose-slate max-w-none">
          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">1. Introduction</h2>
            <p className="mb-4">
              Welcome to {companyName} ("{websiteUrl}"). We respect your privacy and are committed to protecting 
              your personal data. This Privacy Policy explains how we collect, use, disclose, and safeguard your 
              information when you visit our website and use our services.
            </p>
            <p className="mb-4">
              Please read this Privacy Policy carefully. By using our Service, you consent to the data practices 
              described in this policy. If you do not agree with the terms of this Privacy Policy, please do not 
              access or use our Service.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">2. Information We Collect</h2>
            
            <h3 className="text-xl font-medium mb-2">2.1 Personal Information You Provide</h3>
            <p className="mb-4">We collect information that you voluntarily provide to us, including:</p>
            <ul className="list-disc pl-6 mb-4 space-y-2">
              <li><strong>Account Information:</strong> Name, email address, and password when you create an account</li>
              <li><strong>Payment Information:</strong> Billing address and payment card details (processed securely by Stripe; we do not store full card numbers)</li>
              <li><strong>Document Generation Data:</strong> Information you input to generate documents, such as company name, website URL, and contact information</li>
              <li><strong>Communications:</strong> Information you provide when contacting us for support or feedback</li>
              <li><strong>Profile Information:</strong> Any additional information you choose to add to your account</li>
            </ul>

            <h3 className="text-xl font-medium mb-2">2.2 Automatically Collected Information</h3>
            <p className="mb-4">When you access our Service, we automatically collect certain information:</p>
            <ul className="list-disc pl-6 mb-4 space-y-2">
              <li><strong>Device Information:</strong> Browser type, operating system, device type, and unique device identifiers</li>
              <li><strong>Log Data:</strong> IP address, access times, pages viewed, referring URL, and other usage statistics</li>
              <li><strong>Cookies and Tracking Technologies:</strong> Information collected through cookies, pixel tags, and similar technologies (see Section 6)</li>
              <li><strong>Location Information:</strong> General geographic location based on IP address</li>
            </ul>

            <h3 className="text-xl font-medium mb-2">2.3 Information from Third Parties</h3>
            <p className="mb-4">We may receive information about you from third parties, including:</p>
            <ul className="list-disc pl-6 mb-4 space-y-2">
              <li><strong>Payment Processors:</strong> Transaction and billing information from Stripe</li>
              <li><strong>Analytics Providers:</strong> Aggregated usage data from analytics services</li>
              <li><strong>Authentication Services:</strong> If you sign in using a third-party service</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">3. How We Use Your Information</h2>
            <p className="mb-4">We use the information we collect for various purposes, including:</p>
            
            <h3 className="text-xl font-medium mb-2">3.1 Providing and Improving Our Service</h3>
            <ul className="list-disc pl-6 mb-4 space-y-2">
              <li>To create and manage your account</li>
              <li>To generate legal document templates based on your inputs</li>
              <li>To process payments and manage subscriptions</li>
              <li>To provide customer support and respond to inquiries</li>
              <li>To improve and optimize our Service</li>
              <li>To develop new features and functionality</li>
            </ul>

            <h3 className="text-xl font-medium mb-2">3.2 Communications</h3>
            <ul className="list-disc pl-6 mb-4 space-y-2">
              <li>To send transactional emails (account confirmations, password resets, billing receipts)</li>
              <li>To send service-related announcements and updates</li>
              <li>To send marketing communications (with your consent, which you can withdraw at any time)</li>
            </ul>

            <h3 className="text-xl font-medium mb-2">3.3 Security and Legal Compliance</h3>
            <ul className="list-disc pl-6 mb-4 space-y-2">
              <li>To detect and prevent fraud, abuse, and security incidents</li>
              <li>To enforce our Terms of Service</li>
              <li>To comply with legal obligations and respond to lawful requests</li>
            </ul>

            <h3 className="text-xl font-medium mb-2">3.4 Analytics and Research</h3>
            <ul className="list-disc pl-6 mb-4 space-y-2">
              <li>To analyze usage patterns and trends</li>
              <li>To measure the effectiveness of our Service</li>
              <li>To conduct research and analysis to improve user experience</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">4. How We Share Your Information</h2>
            <p className="mb-4">
              We do not sell your personal information to third parties. We may share your information in the 
              following circumstances:
            </p>

            <h3 className="text-xl font-medium mb-2">4.1 Service Providers</h3>
            <p className="mb-4">
              We share information with third-party service providers who perform services on our behalf, including:
            </p>
            <ul className="list-disc pl-6 mb-4 space-y-2">
              <li><strong>Stripe:</strong> Payment processing</li>
              <li><strong>Supabase:</strong> Database and authentication services</li>
              <li><strong>Vercel/Railway:</strong> Web hosting and infrastructure</li>
              <li><strong>Analytics Providers:</strong> Website analytics and performance monitoring</li>
              <li><strong>Email Service Providers:</strong> Transactional and marketing email delivery</li>
            </ul>
            <p className="mb-4">
              These service providers are bound by contractual obligations to keep personal information 
              confidential and use it only for the purposes for which we disclose it to them.
            </p>

            <h3 className="text-xl font-medium mb-2">4.2 Legal Requirements</h3>
            <p className="mb-4">
              We may disclose your information if required to do so by law or in response to valid requests 
              by public authorities (e.g., court order, subpoena, government agency).
            </p>

            <h3 className="text-xl font-medium mb-2">4.3 Business Transfers</h3>
            <p className="mb-4">
              If we are involved in a merger, acquisition, or sale of all or a portion of our assets, your 
              information may be transferred as part of that transaction. We will notify you of any such 
              change and any choices you may have regarding your information.
            </p>

            <h3 className="text-xl font-medium mb-2">4.4 With Your Consent</h3>
            <p className="mb-4">
              We may share your information with third parties when you have given us explicit consent to do so.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">5. Data Security</h2>
            <p className="mb-4">
              We implement appropriate technical and organizational measures to protect your personal data, including:
            </p>
            <ul className="list-disc pl-6 mb-4 space-y-2">
              <li>Encryption of data in transit using TLS/SSL</li>
              <li>Encryption of sensitive data at rest</li>
              <li>Secure authentication mechanisms</li>
              <li>Regular security assessments and updates</li>
              <li>Access controls limiting employee access to personal data</li>
              <li>Secure data centers with physical security measures</li>
            </ul>
            <p className="mb-4">
              However, no method of transmission over the Internet or electronic storage is 100% secure. 
              While we strive to protect your personal information, we cannot guarantee its absolute security.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">6. Cookies and Tracking Technologies</h2>
            
            <h3 className="text-xl font-medium mb-2">6.1 Types of Cookies We Use</h3>
            <ul className="list-disc pl-6 mb-4 space-y-2">
              <li><strong>Essential Cookies:</strong> Required for the operation of our Service (authentication, security)</li>
              <li><strong>Functional Cookies:</strong> Remember your preferences and settings</li>
              <li><strong>Analytics Cookies:</strong> Help us understand how visitors interact with our Service</li>
              <li><strong>Marketing Cookies:</strong> Used to deliver relevant advertisements (only with consent)</li>
            </ul>

            <h3 className="text-xl font-medium mb-2">6.2 Managing Cookies</h3>
            <p className="mb-4">
              Most web browsers allow you to control cookies through their settings. You can set your browser 
              to refuse cookies or alert you when cookies are being sent. Note that disabling cookies may 
              affect the functionality of our Service.
            </p>

            <h3 className="text-xl font-medium mb-2">6.3 Do Not Track</h3>
            <p className="mb-4">
              We currently do not respond to "Do Not Track" signals. However, you can manage your tracking 
              preferences through your browser settings and cookie preferences.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">7. Data Retention</h2>
            <p className="mb-4">
              We retain your personal information for as long as necessary to fulfill the purposes outlined 
              in this Privacy Policy, unless a longer retention period is required or permitted by law. Specifically:
            </p>
            <ul className="list-disc pl-6 mb-4 space-y-2">
              <li><strong>Account Data:</strong> Retained while your account is active and for a reasonable period thereafter</li>
              <li><strong>Generated Documents:</strong> Retained in your account until you delete them or your account is closed</li>
              <li><strong>Payment Records:</strong> Retained for 7 years for tax and accounting purposes</li>
              <li><strong>Log Data:</strong> Generally retained for 90 days</li>
              <li><strong>Communications:</strong> Retained for as long as necessary to resolve inquiries</li>
            </ul>
            <p className="mb-4">
              When you delete your account, we will delete or anonymize your personal information within 30 days, 
              except where we are required to retain it for legal or legitimate business purposes.
            </p>
          </section>

          <section className="mb-8 bg-blue-50 border border-blue-200 rounded-lg p-6">
            <h2 className="text-2xl font-semibold mb-4">8. Your Rights Under GDPR (European Users)</h2>
            <p className="mb-4">
              If you are located in the European Economic Area (EEA), United Kingdom, or Switzerland, you have 
              certain data protection rights under the General Data Protection Regulation (GDPR):
            </p>
            <ul className="list-disc pl-6 mb-4 space-y-2">
              <li><strong>Right to Access:</strong> Request a copy of the personal data we hold about you</li>
              <li><strong>Right to Rectification:</strong> Request correction of inaccurate personal data</li>
              <li><strong>Right to Erasure:</strong> Request deletion of your personal data ("right to be forgotten")</li>
              <li><strong>Right to Restrict Processing:</strong> Request limitation of how we process your data</li>
              <li><strong>Right to Data Portability:</strong> Receive your data in a structured, machine-readable format</li>
              <li><strong>Right to Object:</strong> Object to processing of your personal data</li>
              <li><strong>Right to Withdraw Consent:</strong> Withdraw consent at any time where processing is based on consent</li>
              <li><strong>Right to Lodge a Complaint:</strong> File a complaint with your local data protection authority</li>
            </ul>
            <p className="mb-4">
              <strong>Legal Basis for Processing:</strong> We process your data based on:
            </p>
            <ul className="list-disc pl-6 mb-4 space-y-2">
              <li>Performance of a contract (to provide our Service)</li>
              <li>Your consent (for marketing communications)</li>
              <li>Our legitimate interests (to improve our Service, prevent fraud)</li>
              <li>Legal obligations (to comply with laws)</li>
            </ul>
            <p className="mb-4">
              To exercise these rights, contact us at {companyEmail}. We will respond within 30 days.
            </p>
          </section>

          <section className="mb-8 bg-green-50 border border-green-200 rounded-lg p-6">
            <h2 className="text-2xl font-semibold mb-4">9. Your Rights Under CCPA (California Residents)</h2>
            <p className="mb-4">
              If you are a California resident, you have specific rights under the California Consumer Privacy Act (CCPA):
            </p>
            <ul className="list-disc pl-6 mb-4 space-y-2">
              <li><strong>Right to Know:</strong> Request information about the categories and specific pieces of personal information we have collected about you</li>
              <li><strong>Right to Delete:</strong> Request deletion of your personal information</li>
              <li><strong>Right to Opt-Out:</strong> Opt out of the "sale" of personal information (Note: We do not sell personal information)</li>
              <li><strong>Right to Non-Discrimination:</strong> We will not discriminate against you for exercising your CCPA rights</li>
            </ul>
            <p className="mb-4">
              <strong>Categories of Personal Information Collected:</strong> Identifiers, commercial information, 
              internet activity, and inferences drawn from the above.
            </p>
            <p className="mb-4">
              To exercise your rights, contact us at {companyEmail} or call us. You may also designate an 
              authorized agent to make requests on your behalf.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">10. International Data Transfers</h2>
            <p className="mb-4">
              Your information may be transferred to and processed in countries other than your country of 
              residence, including the United States. These countries may have data protection laws that are 
              different from those in your country.
            </p>
            <p className="mb-4">
              When we transfer personal data from the EEA, UK, or Switzerland, we ensure appropriate safeguards 
              are in place, including:
            </p>
            <ul className="list-disc pl-6 mb-4 space-y-2">
              <li>Standard Contractual Clauses approved by the European Commission</li>
              <li>Data processing agreements with our service providers</li>
              <li>Adequacy decisions where applicable</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">11. Children's Privacy</h2>
            <p className="mb-4">
              Our Service is not directed to children under 16 years of age (or 13 in the United States). 
              We do not knowingly collect personal information from children. If you are a parent or guardian 
              and believe your child has provided us with personal information, please contact us immediately. 
              If we become aware that we have collected personal information from a child without parental 
              consent, we will take steps to delete that information.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">12. Third-Party Links</h2>
            <p className="mb-4">
              Our Service may contain links to third-party websites or services. We are not responsible for 
              the privacy practices of these third parties. We encourage you to read the privacy policies of 
              any third-party websites you visit.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">13. Changes to This Privacy Policy</h2>
            <p className="mb-4">
              We may update this Privacy Policy from time to time. We will notify you of any changes by posting 
              the new Privacy Policy on this page and updating the "Last Updated" date. For material changes, 
              we will provide notice through our Service or via email.
            </p>
            <p className="mb-4">
              We encourage you to review this Privacy Policy periodically for any changes. Your continued use 
              of our Service after any modifications constitutes your acceptance of the updated Privacy Policy.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">14. Contact Us</h2>
            <p className="mb-4">
              If you have any questions about this Privacy Policy or our data practices, please contact us:
            </p>
            <p className="mb-2"><strong>{companyName}</strong></p>
            <p className="mb-2">Email: {companyEmail}</p>
            <p className="mb-2">Website: {websiteUrl}</p>
            <p className="mb-4">
              For GDPR-related inquiries, you may also contact your local data protection authority.
            </p>
          </section>

          <div className="mt-12 p-4 bg-slate-100 rounded-lg">
            <p className="text-sm text-muted-foreground text-center">
              By using {companyName}, you acknowledge that you have read and understood this Privacy Policy.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
