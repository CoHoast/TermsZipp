import { NextRequest, NextResponse } from 'next/server';
import { getResend, EMAIL_FROM, EMAIL_REPLY_TO } from '@/lib/resend';

const logoUrl = 'https://termszipp.com/termszipp-logo.png';

export async function POST(request: NextRequest) {
  try {
    const { name, email, subject, message } = await request.json();

    if (!name || !email || !subject || !message) {
      return NextResponse.json({ error: 'All fields required' }, { status: 400 });
    }

    const resend = getResend();

    // Send confirmation to the user
    await resend.emails.send({
      from: EMAIL_FROM,
      to: email,
      subject: `We received your message - TermsZipp`,
      html: `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body style="margin: 0; padding: 0; background-color: #f8fafc; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f8fafc; padding: 40px 20px;">
    <tr>
      <td align="center">
        <table width="100%" style="max-width: 600px; background-color: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 1px 3px rgba(0,0,0,0.1);">
          <tr>
            <td style="padding: 40px 40px 30px; text-align: center; border-bottom: 1px solid #e2e8f0;">
              <img src="${logoUrl}" alt="TermsZipp" width="200" style="max-width: 200px; height: auto;">
            </td>
          </tr>
          <tr>
            <td style="padding: 40px;">
              <h1 style="margin: 0 0 20px; font-size: 24px; font-weight: 700; color: #1e293b;">
                We Got Your Message! 📬
              </h1>
              <p style="margin: 0 0 20px; font-size: 16px; line-height: 1.6; color: #475569;">
                Hi ${name},
              </p>
              <p style="margin: 0 0 20px; font-size: 16px; line-height: 1.6; color: #475569;">
                Thank you for reaching out! We've received your message and will get back to you within 24-48 hours.
              </p>
              <div style="background-color: #f0fdfa; border-radius: 8px; padding: 20px; border-left: 4px solid #0d9488; margin: 20px 0;">
                <p style="margin: 0 0 10px; font-size: 14px; font-weight: 600; color: #1e293b;">Your message:</p>
                <p style="margin: 0; font-size: 14px; color: #475569; font-style: italic;">"${message.substring(0, 200)}${message.length > 200 ? '...' : ''}"</p>
              </div>
              <p style="margin: 20px 0 0; font-size: 14px; line-height: 1.6; color: #64748b;">
                In the meantime, check out our <a href="https://termszipp.com/faq" style="color: #0d9488; text-decoration: none;">FAQ</a> for common questions.
              </p>
            </td>
          </tr>
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
      `,
    });

    // Send notification to admin
    await resend.emails.send({
      from: EMAIL_FROM,
      to: EMAIL_REPLY_TO,
      replyTo: email,
      subject: `[Contact Form] ${subject}`,
      html: `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body style="margin: 0; padding: 0; background-color: #f8fafc; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f8fafc; padding: 40px 20px;">
    <tr>
      <td align="center">
        <table width="100%" style="max-width: 600px; background-color: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 1px 3px rgba(0,0,0,0.1);">
          <tr>
            <td style="padding: 40px 40px 30px; text-align: center; border-bottom: 1px solid #e2e8f0;">
              <img src="${logoUrl}" alt="TermsZipp" width="200" style="max-width: 200px; height: auto;">
            </td>
          </tr>
          <tr>
            <td style="padding: 40px;">
              <h1 style="margin: 0 0 20px; font-size: 24px; font-weight: 700; color: #1e293b;">
                New Contact Form Submission
              </h1>
              <table width="100%" style="border-collapse: collapse; margin: 20px 0;">
                <tr>
                  <td style="padding: 12px; background-color: #f8fafc; border: 1px solid #e2e8f0; font-weight: 600; width: 100px;">Name</td>
                  <td style="padding: 12px; border: 1px solid #e2e8f0;">${name}</td>
                </tr>
                <tr>
                  <td style="padding: 12px; background-color: #f8fafc; border: 1px solid #e2e8f0; font-weight: 600;">Email</td>
                  <td style="padding: 12px; border: 1px solid #e2e8f0;"><a href="mailto:${email}" style="color: #0d9488;">${email}</a></td>
                </tr>
                <tr>
                  <td style="padding: 12px; background-color: #f8fafc; border: 1px solid #e2e8f0; font-weight: 600;">Subject</td>
                  <td style="padding: 12px; border: 1px solid #e2e8f0;">${subject}</td>
                </tr>
              </table>
              <div style="margin: 20px 0;">
                <h3 style="margin: 0 0 10px; font-size: 16px; font-weight: 600; color: #1e293b;">Message:</h3>
                <div style="background-color: #f8fafc; border-radius: 8px; padding: 20px; border: 1px solid #e2e8f0;">
                  <p style="margin: 0; font-size: 14px; line-height: 1.6; color: #475569; white-space: pre-wrap;">${message}</p>
                </div>
              </div>
              <div style="text-align: center; margin: 30px 0;">
                <a href="mailto:${email}?subject=Re: ${encodeURIComponent(subject)}" style="display: inline-block; padding: 14px 32px; background: linear-gradient(135deg, #0891B2 0%, #0D9488 50%, #059669 100%); color: #ffffff; text-decoration: none; font-weight: 600; font-size: 16px; border-radius: 8px;">
                  Reply to ${name}
                </a>
              </div>
            </td>
          </tr>
          <tr>
            <td style="padding: 20px 40px; background-color: #f8fafc; border-top: 1px solid #e2e8f0;">
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
      `,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Contact form error:', error);
    return NextResponse.json({ error: 'Failed to send message' }, { status: 500 });
  }
}
