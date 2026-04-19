// Thin nodemailer wrapper. Configured from runtimeConfig.smtp at first use.
//
// Phase 1 needs only one transactional email: password reset. Phases 3–4 add
// "license issued" and "GitHub invite sent". All of them go through this.
//
// In dev, point SMTP_HOST at Mailpit (`localhost:1025`) to capture mail without
// sending. In prod, any SMTP relay (Resend SMTP, SendGrid SMTP, your own MTA).

import nodemailer, { type Transporter } from 'nodemailer'

let transporter: Transporter | null = null

function getTransporter(): Transporter {
  if (transporter) return transporter
  const cfg = useRuntimeConfig().smtp
  transporter = nodemailer.createTransport({
    host: cfg.host,
    port: cfg.port,
    secure: cfg.port === 465,
    auth: cfg.user
      ? { user: cfg.user, pass: cfg.pass }
      : undefined
  })
  return transporter
}

export interface SendEmailOptions {
  to: string
  subject: string
  html: string
  text?: string
}

export async function sendEmail(opts: SendEmailOptions) {
  const cfg = useRuntimeConfig().smtp
  if (!cfg.host) {
    // Dev fallback: log instead of failing. Useful before SMTP is configured.
    console.warn('[email] SMTP_HOST not set — would send:', opts.subject, '→', opts.to)
    return { messageId: 'noop' }
  }
  return getTransporter().sendMail({
    from: cfg.from,
    to: opts.to,
    subject: opts.subject,
    html: opts.html,
    text: opts.text
  })
}

export function emailLayout(title: string, body: string): string {
  return `<!doctype html>
<html><body style="font-family:-apple-system,Segoe UI,Roboto,sans-serif;background:#f6f7f9;margin:0;padding:32px">
  <div style="max-width:560px;margin:0 auto;background:#fff;border-radius:14px;padding:28px;box-shadow:0 1px 3px rgba(0,0,0,.06)">
    <h1 style="margin:0 0 16px;font-size:18px;color:#111">${title}</h1>
    ${body}
    <p style="margin-top:32px;font-size:12px;color:#888">— Momentfy</p>
  </div>
</body></html>`
}
