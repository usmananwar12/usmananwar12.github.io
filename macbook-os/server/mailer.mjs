import dotenv from 'dotenv';
import nodemailer from 'nodemailer';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: path.resolve(__dirname, '../.env') });

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function escapeHtml(str = '') {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

export async function sendPortfolioEmails({ fromName, fromEmail, subject, message }) {
  const cleanName = (fromName || '').trim() || 'Portfolio Visitor';
  const cleanEmail = (fromEmail || '').trim();
  const cleanSubject = (subject || '').trim() || 'New message from UsmanOS Portfolio';
  const cleanMessage = (message || '').trim();

  if (!cleanEmail || !EMAIL_REGEX.test(cleanEmail)) {
    throw new Error('Please enter a valid "From" email address so Usman can reply to you.');
  }
  if (!cleanMessage) {
    throw new Error('Please write a message before sending.');
  }

  const ownerEmail = process.env.OWNER_EMAIL || 'usmananwar9957@gmail.com';
  const smtpUser = process.env.SMTP_USER;
  const smtpPass = process.env.SMTP_PASS;
  const smtpHost = process.env.SMTP_HOST || 'smtp.gmail.com';
  const smtpPort = Number(process.env.SMTP_PORT || 465);

  let transporter;
  let senderAccount;
  let mode = 'smtp';

  if (smtpUser && smtpPass) {
    senderAccount = smtpUser;
    transporter = nodemailer.createTransport({
      host: smtpHost,
      port: smtpPort,
      secure: smtpPort === 465,
      auth: {
        user: smtpUser,
        pass: smtpPass,
      },
    });
  } else {
    // Dev preview fallback using Nodemailer's Ethereal sandbox SMTP so the full flow works immediately
    mode = 'ethereal';
    const testAccount = await nodemailer.createTestAccount();
    senderAccount = testAccount.user;
    transporter = nodemailer.createTransport({
      host: testAccount.smtp.host,
      port: testAccount.smtp.port,
      secure: testAccount.smtp.secure,
      auth: {
        user: testAccount.user,
        pass: testAccount.pass,
      },
    });
  }

  const safeName = escapeHtml(cleanName);
  const safeEmail = escapeHtml(cleanEmail);
  const safeSubject = escapeHtml(cleanSubject);
  const safeMessageHtml = escapeHtml(cleanMessage).replace(/\n/g, '<br />');
  const sentAt = new Date().toLocaleString('en-US', {
    dateStyle: 'medium',
    timeStyle: 'short',
  });

  // 1. Email delivered to Usman
  const ownerMailPromise = transporter.sendMail({
    from: `"UsmanOS Mail" <${senderAccount}>`,
    to: ownerEmail,
    replyTo: `"${cleanName}" <${cleanEmail}>`,
    subject: `[UsmanOS Portfolio] ${cleanSubject}`,
    text: `New message from your MacBook Portfolio\n\nFrom: ${cleanName} <${cleanEmail}>\nSubject: ${cleanSubject}\nSent: ${sentAt}\n\nMessage:\n${cleanMessage}`,
    html: `
      <div style="font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;background:#0b1120;color:#e2e8f0;padding:28px;border-radius:14px;max-width:580px;margin:0 auto;border:1px solid #1e293b;">
        <div style="font-size:12px;letter-spacing:0.08em;text-transform:uppercase;color:#38bdf8;font-weight:700;margin-bottom:8px;">UsmanOS · New Portfolio Message</div>
        <h2 style="margin:0 0 16px;color:#ffffff;font-size:20px;">${safeSubject}</h2>
        <div style="background:#111827;border:1px solid #1f2937;border-radius:10px;padding:14px 16px;margin-bottom:18px;font-size:13.5px;">
          <div style="margin-bottom:6px;"><strong style="color:#94a3b8;">From:</strong> <span style="color:#ffffff;">${safeName}</span></div>
          <div style="margin-bottom:6px;"><strong style="color:#94a3b8;">Reply Email:</strong> <a href="mailto:${safeEmail}" style="color:#38bdf8;">${safeEmail}</a></div>
          <div><strong style="color:#94a3b8;">Sent:</strong> ${escapeHtml(sentAt)}</div>
        </div>
        <div style="background:#0f172a;border-left:3px solid #38bdf8;padding:16px;border-radius:8px;font-size:14.5px;line-height:1.65;color:#f1f5f9;">
          ${safeMessageHtml}
        </div>
        <p style="margin:18px 0 0;font-size:12px;color:#64748b;">Hit Reply in Gmail to respond directly to ${safeEmail}.</p>
      </div>
    `,
  });

  // 2. Confirmation email delivered back to the visitor
  const visitorMailPromise = transporter.sendMail({
    from: `"Usman Anwar" <${senderAccount}>`,
    to: cleanEmail,
    replyTo: ownerEmail,
    subject: `Message received — Usman Anwar`,
    text: `Hi ${cleanName},\n\nThanks for reaching out through my MacBook portfolio! This is a quick confirmation that your message ("${cleanSubject}") was successfully delivered to ${ownerEmail}.\n\nI'll review it and get back to you soon.\n\nCopy of your message:\n${cleanMessage}\n\n— Usman Anwar\nFull-Stack Web3 Engineer · DeFa by InvoiceMate\nGitHub: https://github.com/usmananwar11\nLinkedIn: https://www.linkedin.com/in/musman-anwar`,
    html: `
      <div style="font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;background:#0b1120;color:#e2e8f0;padding:28px;border-radius:14px;max-width:580px;margin:0 auto;border:1px solid #1e293b;">
        <div style="font-size:12px;letter-spacing:0.08em;text-transform:uppercase;color:#34d399;font-weight:700;margin-bottom:8px;">✓ Message Delivered</div>
        <h2 style="margin:0 0 12px;color:#ffffff;font-size:21px;">Thanks for reaching out, ${safeName}!</h2>
        <p style="margin:0 0 16px;font-size:14.5px;line-height:1.65;color:#cbd5e1;">
          Your message has been delivered to <strong>Usman Anwar</strong> (<a href="mailto:${escapeHtml(ownerEmail)}" style="color:#38bdf8;">${escapeHtml(ownerEmail)}</a>). I&apos;ll get back to you as soon as possible.
        </p>
        <div style="background:#111827;border:1px solid #1f2937;border-radius:10px;padding:14px 16px;margin-bottom:18px;">
          <div style="font-size:12px;color:#94a3b8;margin-bottom:6px;text-transform:uppercase;letter-spacing:0.05em;">Copy of your message</div>
          <div style="font-size:13.5px;font-weight:600;color:#ffffff;margin-bottom:8px;">${safeSubject}</div>
          <div style="font-size:13.5px;line-height:1.6;color:#cbd5e1;">${safeMessageHtml}</div>
        </div>
        <div style="border-top:1px solid #1e293b;padding-top:14px;font-size:12.5px;color:#94a3b8;">
          <strong style="color:#ffffff;">Usman Anwar</strong> · Full-Stack Web3 Engineer at DeFa by InvoiceMate<br />
          <a href="https://github.com/usmananwar11" style="color:#38bdf8;text-decoration:none;">GitHub</a> &nbsp;·&nbsp;
          <a href="https://www.linkedin.com/in/musman-anwar" style="color:#38bdf8;text-decoration:none;">LinkedIn</a> &nbsp;·&nbsp;
          <a href="https://x.com/Usman_Anwar9957" style="color:#38bdf8;text-decoration:none;">X</a> &nbsp;·&nbsp;
          <a href="https://t.me/usmananwar9957" style="color:#38bdf8;text-decoration:none;">Telegram</a>
        </div>
      </div>
    `,
  });

  const [ownerInfo, visitorInfo] = await Promise.all([ownerMailPromise, visitorMailPromise]);

  return {
    ok: true,
    mode,
    deliveredTo: ownerEmail,
    confirmationTo: cleanEmail,
    previewToUsman: mode === 'ethereal' ? nodemailer.getTestMessageUrl(ownerInfo) : undefined,
    previewToSender: mode === 'ethereal' ? nodemailer.getTestMessageUrl(visitorInfo) : undefined,
  };
}
