import React, { useState } from 'react';
import { AlertCircle, Check, CheckCircle2, Copy, ExternalLink, Loader2, Mail, Send } from 'lucide-react';
import { profile } from '../data/portfolio';

interface SendResult {
  ok: boolean;
  mode: 'smtp' | 'ethereal';
  deliveredTo: string;
  confirmationTo: string;
  previewToUsman?: string;
  previewToSender?: string;
}

export const MailApp: React.FC = () => {
  const [fromName, setFromName] = useState('');
  const [fromEmail, setFromEmail] = useState('');
  const [subject, setSubject] = useState('Hello Usman — Saw your MacBook portfolio!');
  const [message, setMessage] = useState('');
  const [copied, setCopied] = useState(false);

  const [sending, setSending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<SendResult | null>(null);

  const handleCopyEmail = () => {
    navigator.clipboard?.writeText(profile.links.email).catch(() => {});
    setCopied(true);
    window.setTimeout(() => setCopied(false), 2000);
  };

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setResult(null);

    if (!fromEmail.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(fromEmail.trim())) {
      setError('Please enter a valid email address in the "From" field so Usman can reach back out.');
      return;
    }
    if (!message.trim()) {
      setError('Please write a message before sending.');
      return;
    }

    setSending(true);
    try {
      const apiBase = import.meta.env.VITE_MAIL_API_URL || '';
      const res = await fetch(`${apiBase}/api/send-email`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          fromName: fromName.trim(),
          fromEmail: fromEmail.trim(),
          subject: subject.trim(),
          message: message.trim(),
        }),
      });

      const data = await res.json();
      if (!res.ok || !data.ok) {
        throw new Error(data.error || 'Could not deliver message. Please try again.');
      }

      setResult(data as SendResult);
      setMessage('');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Network error while sending email.');
    } finally {
      setSending(false);
    }
  };

  const channels = [
    { label: 'GitHub', handle: '@usmananwar11', href: profile.links.github },
    { label: 'GitHub (Alt)', handle: '@usmananwar12', href: profile.links.githubAlt },
    { label: 'LinkedIn', handle: 'in/musman-anwar', href: profile.links.linkedin },
    { label: 'X / Twitter', handle: '@Usman_Anwar9957', href: profile.links.x },
    { label: 'Telegram', handle: '@usmananwar9957', href: profile.links.telegram },
  ];

  return (
    <div className="mail-app">
      <aside className="mail-sidebar">
        <div className="mail-side-title">Direct Channels</div>
        <div className="mail-direct-box">
          <div className="mail-direct-head">
            <Mail size={15} />
            <strong>Email</strong>
          </div>
          <code className="mono">{profile.links.email}</code>
          <button type="button" className="mac-btn-secondary" onClick={handleCopyEmail}>
            {copied ? <Check size={13} /> : <Copy size={13} />}
            <span>{copied ? 'Copied!' : 'Copy Address'}</span>
          </button>
        </div>

        <div className="mail-side-title" style={{ marginTop: 16 }}>
          Social Profiles
        </div>
        <div className="mail-channels">
          {channels.map((ch) => (
            <a
              key={ch.label}
              href={ch.href}
              target="_blank"
              rel="noopener noreferrer"
              className="mail-channel-row"
            >
              <div>
                <strong>{ch.label}</strong>
                <span>{ch.handle}</span>
              </div>
              <ExternalLink size={13} />
            </a>
          ))}
        </div>
      </aside>

      <form className="mail-compose" onSubmit={handleSend}>
        <div className="mail-compose-head">
          <h3>New Message</h3>
          <button type="submit" className="mac-btn-primary" disabled={sending}>
            {sending ? <Loader2 size={13} className="spin" /> : <Send size={13} />}
            <span>{sending ? 'Sending...' : 'Send Message'}</span>
          </button>
        </div>

        <div className="mail-field">
          <label>To:</label>
          <span className="mail-to-pill">
            {profile.name} &lt;{profile.links.email}&gt;
          </span>
        </div>

        <div className="mail-field">
          <label htmlFor="mail-from-email">From:</label>
          <input
            id="mail-from-email"
            type="email"
            required
            value={fromEmail}
            onChange={(e) => setFromEmail(e.target.value)}
            placeholder="your.email@domain.com (for reply + confirmation)"
          />
        </div>

        <div className="mail-field">
          <label htmlFor="mail-from-name">Your Name:</label>
          <input
            id="mail-from-name"
            type="text"
            value={fromName}
            onChange={(e) => setFromName(e.target.value)}
            placeholder="Alex from Protocol Labs"
          />
        </div>

        <div className="mail-field">
          <label htmlFor="mail-subject">Subject:</label>
          <input
            id="mail-subject"
            type="text"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
          />
        </div>

        <textarea
          className="mail-body-input"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Write your message about Web3 engineering, smart contract audits, or collaborations..."
        />

        {error && (
          <div className="mail-toast is-error">
            <AlertCircle size={14} />
            <span>{error}</span>
          </div>
        )}

        {result && (
          <div className="mail-toast is-success">
            <div className="mail-toast-row">
              <CheckCircle2 size={15} />
              <div>
                <strong>Message sent to {result.deliveredTo}!</strong>
                <div className="mail-toast-sub">
                  A confirmation email was also sent to <strong>{result.confirmationTo}</strong>.
                </div>
              </div>
            </div>

            {result.mode === 'ethereal' && (
              <div className="mail-ethereal-box">
                <span>
                  Running in local Ethereal test mode (add your Gmail App Password in{' '}
                  <code className="mono">macbook-os/.env</code> for live Gmail delivery). Preview sent emails:
                </span>
                <div className="mail-preview-links">
                  {result.previewToUsman && (
                    <a href={result.previewToUsman} target="_blank" rel="noopener noreferrer">
                      Preview Email to Usman ↗
                    </a>
                  )}
                  {result.previewToSender && (
                    <a href={result.previewToSender} target="_blank" rel="noopener noreferrer">
                      Preview Confirmation to Sender ↗
                    </a>
                  )}
                </div>
              </div>
            )}
          </div>
        )}
      </form>
    </div>
  );
};
