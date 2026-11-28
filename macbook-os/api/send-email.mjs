import { sendPortfolioEmails } from '../server/mailer.mjs';

/**
 * Vercel / Node serverless handler for POST /api/send-email
 */
export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.status(405).json({ ok: false, error: 'Method not allowed' });
    return;
  }

  try {
    const result = await sendPortfolioEmails(req.body || {});
    res.status(200).json(result);
  } catch (err) {
    res.status(400).json({
      ok: false,
      error: err instanceof Error ? err.message : 'Failed to send email.',
    });
  }
}
