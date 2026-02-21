// Contact Form Notification Email Template
// Sent to admin/support when someone submits the contact form

interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export const ContactNotificationEmailHtml = (data: ContactFormData) => `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>New Contact Form Submission - TermsZipp</title>
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
                New Contact Form Submission
              </h1>
              
              <table width="100%" style="border-collapse: collapse; margin: 20px 0;">
                <tr>
                  <td style="padding: 12px; background-color: #f8fafc; border: 1px solid #e2e8f0; font-weight: 600; width: 120px;">Name</td>
                  <td style="padding: 12px; border: 1px solid #e2e8f0;">${data.name}</td>
                </tr>
                <tr>
                  <td style="padding: 12px; background-color: #f8fafc; border: 1px solid #e2e8f0; font-weight: 600;">Email</td>
                  <td style="padding: 12px; border: 1px solid #e2e8f0;">
                    <a href="mailto:${data.email}" style="color: #0d9488; text-decoration: none;">${data.email}</a>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 12px; background-color: #f8fafc; border: 1px solid #e2e8f0; font-weight: 600;">Subject</td>
                  <td style="padding: 12px; border: 1px solid #e2e8f0;">${data.subject}</td>
                </tr>
              </table>
              
              <div style="margin: 20px 0;">
                <h3 style="margin: 0 0 10px; font-size: 16px; font-weight: 600; color: #1e293b;">Message:</h3>
                <div style="background-color: #f8fafc; border-radius: 8px; padding: 20px; border: 1px solid #e2e8f0;">
                  <p style="margin: 0; font-size: 14px; line-height: 1.6; color: #475569; white-space: pre-wrap;">${data.message}</p>
                </div>
              </div>
              
              <div style="text-align: center; margin: 30px 0;">
                <a href="mailto:${data.email}?subject=Re: ${encodeURIComponent(data.subject)}" style="display: inline-block; padding: 14px 32px; background: linear-gradient(135deg, #0891B2 0%, #0D9488 50%, #059669 100%); color: #ffffff; text-decoration: none; font-weight: 600; font-size: 16px; border-radius: 8px;">
                  Reply to ${data.name}
                </a>
              </div>
            </td>
          </tr>
          
          <!-- Footer -->
          <tr>
            <td style="padding: 30px 40px; background-color: #f8fafc; border-top: 1px solid #e2e8f0;">
              <p style="margin: 0; font-size: 12px; color: #94a3b8; text-align: center;">
                This email was sent from the TermsZipp contact form.
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

export const ContactNotificationEmailText = (data: ContactFormData) => `
New Contact Form Submission - TermsZipp

Name: ${data.name}
Email: ${data.email}
Subject: ${data.subject}

Message:
${data.message}

---
Reply to: ${data.email}
`;
