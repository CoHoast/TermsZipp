// Contact Form Confirmation Email Template
// Sent to user after they submit the contact form

export const ContactConfirmationEmailHtml = (userName: string) => `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>We Got Your Message - TermsZipp</title>
</head>
<body style="margin: 0; padding: 0; background-color: #f8fafc; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f8fafc; padding: 40px 20px;">
    <tr>
      <td align="center">
        <table width="100%" style="max-width: 600px; background-color: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 1px 3px rgba(0,0,0,0.1);">
          <!-- Header -->
          <tr>
            <td style="padding: 40px 40px 30px; text-align: center; border-bottom: 1px solid #e2e8f0;">
              <img src="https://termszipp.com/termszipp-logo.png" alt="TermsZipp" width="200" style="max-width: 200px; height: auto;">
            </td>
          </tr>
          
          <!-- Content -->
          <tr>
            <td style="padding: 40px;">
              <h1 style="margin: 0 0 20px; font-size: 24px; font-weight: 700; color: #1e293b;">
                We Got Your Message! 📬
              </h1>
              <p style="margin: 0 0 20px; font-size: 16px; line-height: 1.6; color: #475569;">
                Hi ${userName},
              </p>
              <p style="margin: 0 0 20px; font-size: 16px; line-height: 1.6; color: #475569;">
                Thank you for reaching out to us. We've received your message and will get back to you as soon as possible — usually within 24-48 hours.
              </p>
              <p style="margin: 0 0 30px; font-size: 16px; line-height: 1.6; color: #475569;">
                In the meantime, you might find answers to common questions in our <a href="https://termszipp.com/faq" style="color: #0d9488; text-decoration: none; font-weight: 500;">FAQ section</a>.
              </p>
              
              <div style="background-color: #f0fdfa; border-radius: 8px; padding: 20px; border-left: 4px solid #0d9488;">
                <p style="margin: 0; font-size: 14px; line-height: 1.6; color: #475569;">
                  <strong>Tip:</strong> If your question is about generating a specific document, try our generators — they include helpful tips and customization options!
                </p>
              </div>
              
              <p style="margin: 30px 0 0; font-size: 14px; line-height: 1.6; color: #64748b;">
                Thanks for choosing TermsZipp!
              </p>
            </td>
          </tr>
          
          <!-- Footer -->
          <tr>
            <td style="padding: 30px 40px; background-color: #f8fafc; border-top: 1px solid #e2e8f0;">
              <p style="margin: 0 0 10px; font-size: 14px; color: #64748b; text-align: center;">
                © ${new Date().getFullYear()} TermsZipp. All rights reserved.
              </p>
              <p style="margin: 0; font-size: 12px; color: #94a3b8; text-align: center;">
                Part of the Zipp Family
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
`;

export const ContactConfirmationEmailText = (userName: string) => `
We Got Your Message!

Hi ${userName},

Thank you for reaching out to us. We've received your message and will get back to you as soon as possible — usually within 24-48 hours.

In the meantime, you might find answers to common questions in our FAQ section: https://termszipp.com/faq

Tip: If your question is about generating a specific document, try our generators — they include helpful tips and customization options!

Thanks for choosing TermsZipp!

© ${new Date().getFullYear()} TermsZipp. All rights reserved.
Part of the Zipp Family
`;
