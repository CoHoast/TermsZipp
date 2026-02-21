// Email Templates for TermsZipp
// Use with Resend, SendGrid, or similar email service

export { WelcomeEmailHtml, WelcomeEmailText } from './welcome';
export { PasswordResetEmailHtml, PasswordResetEmailText } from './password-reset';
export { ContactConfirmationEmailHtml, ContactConfirmationEmailText } from './contact-confirmation';
export { ContactNotificationEmailHtml, ContactNotificationEmailText } from './contact-notification';

// Example usage with Resend:
// 
// import { Resend } from 'resend';
// import { WelcomeEmailHtml, WelcomeEmailText } from '@/emails';
// 
// const resend = new Resend(process.env.RESEND_API_KEY);
// 
// await resend.emails.send({
//   from: 'TermsZipp <hello@termszipp.com>',
//   to: user.email,
//   subject: 'Welcome to TermsZipp!',
//   html: WelcomeEmailHtml(user.name),
//   text: WelcomeEmailText(user.name),
// });
