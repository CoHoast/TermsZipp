// Password Reset Email Template
// Use with Resend, SendGrid, or similar email service

export const PasswordResetEmailHtml = (resetLink: string) => `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Reset Your Password - TermsZipp</title>
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
                Reset Your Password
              </h1>
              <p style="margin: 0 0 20px; font-size: 16px; line-height: 1.6; color: #475569;">
                We received a request to reset your password. Click the button below to create a new password:
              </p>
              
              <div style="text-align: center; margin: 30px 0;">
                <a href="${resetLink}" style="display: inline-block; padding: 14px 32px; background: linear-gradient(135deg, #0891B2 0%, #0D9488 50%, #059669 100%); color: #ffffff; text-decoration: none; font-weight: 600; font-size: 16px; border-radius: 8px;">
                  Reset Password
                </a>
              </div>
              
              <p style="margin: 20px 0; font-size: 14px; line-height: 1.6; color: #64748b;">
                This link will expire in 1 hour. If you didn't request a password reset, you can safely ignore this email.
              </p>
              
              <p style="margin: 20px 0 0; font-size: 14px; line-height: 1.6; color: #64748b;">
                If the button doesn't work, copy and paste this link into your browser:
              </p>
              <p style="margin: 10px 0 0; font-size: 12px; line-height: 1.6; color: #94a3b8; word-break: break-all;">
                ${resetLink}
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

export const PasswordResetEmailText = (resetLink: string) => `
Reset Your Password

We received a request to reset your password. Visit the link below to create a new password:

${resetLink}

This link will expire in 1 hour. If you didn't request a password reset, you can safely ignore this email.

© ${new Date().getFullYear()} TermsZipp. All rights reserved.
Part of the Zipp Family
`;
