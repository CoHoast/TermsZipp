import { NextRequest, NextResponse } from 'next/server';
import { getResend, EMAIL_FROM } from '@/lib/resend';

const logoUrl = 'https://termszipp.com/termszipp-logo.png';

export async function POST(request: NextRequest) {
  try {
    const { email, name, plan } = await request.json();

    if (!email || !name) {
      return NextResponse.json({ error: 'Email and name required' }, { status: 400 });
    }

    const resend = getResend();

    const planMap: Record<string, { name: string; price: string }> = {
      free: { name: 'Free', price: '$0/month' },
      pro: { name: 'Pro', price: '$9/month' },
      premium: { name: 'Premium', price: '$19/month' },
    };
    const planDetails = planMap[plan as string] || { name: 'Free', price: '$0/month' };

    await resend.emails.send({
      from: EMAIL_FROM,
      to: email,
      subject: `Welcome to TermsZipp, ${name}! 🎉`,
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
                Welcome to TermsZipp, ${name}! 🎉
              </h1>
              <p style="margin: 0 0 20px; font-size: 16px; line-height: 1.6; color: #475569;">
                Thank you for signing up! Your account is ready and you're on the <strong>${planDetails.name}</strong> plan (${planDetails.price}).
              </p>
              <p style="margin: 0 0 20px; font-size: 16px; line-height: 1.6; color: #475569;">
                With TermsZipp, you can generate:
              </p>
              <ul style="margin: 0 0 30px; padding-left: 20px; font-size: 16px; line-height: 1.8; color: #475569;">
                <li>Privacy Policies (GDPR & CCPA compliant)</li>
                <li>Terms of Service</li>
                <li>Cookie Policies</li>
                <li>Disclaimers</li>
                <li>Refund Policies</li>
                <li>End User License Agreements (EULA)</li>
              </ul>
              <div style="text-align: center; margin: 30px 0;">
                <a href="https://termszipp.com/dashboard" style="display: inline-block; padding: 14px 32px; background: linear-gradient(135deg, #0891B2 0%, #0D9488 50%, #059669 100%); color: #ffffff; text-decoration: none; font-weight: 600; font-size: 16px; border-radius: 8px;">
                  Go to Dashboard
                </a>
              </div>
              <p style="margin: 30px 0 0; font-size: 14px; line-height: 1.6; color: #64748b;">
                Questions? Just reply to this email — we're happy to help!
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

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Welcome email error:', error);
    return NextResponse.json({ error: 'Failed to send email' }, { status: 500 });
  }
}
