// Marketing-site contact form. Delivers the message to the inbox advertised
// on the legal page (hello@momentfy.io) with Reply-To set to the visitor.
// Rate-limited per IP; a hidden honeypot field swallows most bot submits.

import { contactSchema, validateBody } from '../../utils/validation'
import { sendEmail, emailLayout } from '../../utils/email'

const INBOX = 'hello@momentfy.io'

export default defineEventHandler(async (event) => {
  enforceRateLimit(event, { max: 3, windowSeconds: 60 })
  const body = await validateBody(event, contactSchema)

  if (body.website && body.website.length > 0) {
    return { success: true }
  }

  const name = (body.name || '').trim()
  const email = body.email.trim()
  const message = (body.message || '').trim()

  const escape = (s: string) =>
    s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')

  const html = emailLayout('New contact-form message', `
    <p><strong>From:</strong> ${escape(name) || '(no name)'} &lt;${escape(email)}&gt;</p>
    ${message ? `<p style="white-space:pre-wrap;margin-top:16px">${escape(message)}</p>` : '<p style="color:#888">(no message)</p>'}
    <p style="font-size:12px;color:#888;margin-top:24px">Sent from the Momentfy portal contact form.</p>
  `)

  await sendEmail({
    to: INBOX,
    subject: `Contact form — ${name || email}`,
    html
  })

  return { success: true }
})
