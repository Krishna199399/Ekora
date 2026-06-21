import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

// ─── Types ────────────────────────────────────────────────
interface ContactFormData {
  name: string;
  email: string;
  phone?: string;
  company?: string;
  subject?: string;
  country?: string;
  interest?: string;
  message?: string;
  formSource?: 'contact' | 'modal';
  // Modal-specific
  fullName?: string;
  companyName?: string;
  service?: string;
}

interface ValidationResult {
  valid: boolean;
  errors: string[];
}

// ─── Rate limiting (in-memory, resets on server restart) ──
const rateLimitMap = new Map<string, { count: number; resetAt: number }>();
const RATE_LIMIT = 5;           // max 5 submissions
const RATE_WINDOW_MS = 10 * 60 * 1000; // per 10 minutes

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const record = rateLimitMap.get(ip);

  if (!record || now > record.resetAt) {
    rateLimitMap.set(ip, { count: 1, resetAt: now + RATE_WINDOW_MS });
    return false;
  }

  if (record.count >= RATE_LIMIT) return true;
  record.count++;
  return false;
}

// ─── Sanitization ─────────────────────────────────────────
function sanitize(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;')
    .trim();
}

// ─── Validation ───────────────────────────────────────────
function validate(data: ContactFormData): ValidationResult {
  const errors: string[] = [];
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const phoneRegex = /^[+]?[\d\s\-().]{7,20}$/;

  const name = (data.name || data.fullName || '').trim();
  if (!name || name.length < 2) errors.push('Name must be at least 2 characters.');
  if (name.length > 100) errors.push('Name is too long (max 100 chars).');

  if (!data.email || !emailRegex.test(data.email.trim()))
    errors.push('A valid email address is required.');

  if (data.phone && !phoneRegex.test(data.phone.trim()))
    errors.push('Phone number is not valid.');

  // Spam honeypot check (if a hidden field named "website" is populated, it's a bot)
  if ((data as any).website) errors.push('Spam detected.');

  return { valid: errors.length === 0, errors };
}

// ─── SMTP Transporter ─────────────────────────────────────
function createTransporter() {
  return nodemailer.createTransport({
    host: process.env.SMTP_HOST || 'smtp.hostinger.com',
    port: Number(process.env.SMTP_PORT) || 465,
    secure: true, // SSL on port 465
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
    connectionTimeout: 10000,
    greetingTimeout: 10000,
    socketTimeout: 15000,
  });
}

// ─── Email Templates ──────────────────────────────────────
function buildAdminEmail(data: ContactFormData): { subject: string; html: string } {
  const name    = sanitize(data.name || data.fullName || 'Unknown');
  const email   = sanitize(data.email);
  const phone   = sanitize(data.phone || '—');
  const company = sanitize(data.company || data.companyName || '—');
  const subject = sanitize(data.subject || data.service || data.interest || 'General Inquiry');
  const country = sanitize(data.country || '—');
  const message = sanitize(data.message || '—');
  const source  = data.formSource === 'modal' ? 'Consultation Popup' : 'Contact Page Form';
  const ts      = new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' });

  const emailSubject = `🔔 New Lead: ${name} — ${subject}`;

  const html = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width,initial-scale=1" />
<title>New Lead — EGC Ekora Global Consulting</title>
</head>
<body style="margin:0;padding:0;background:#f4f1ec;font-family:'Segoe UI',Arial,sans-serif;">
<table width="100%" cellpadding="0" cellspacing="0" style="background:#f4f1ec;padding:32px 0;">
  <tr><td align="center">
    <table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;background:#ffffff;border-radius:12px;overflow:hidden;box-shadow:0 4px 24px rgba(13,42,82,0.10);">

      <!-- Header -->
      <tr>
        <td style="background:linear-gradient(135deg,#0D2A52 0%,#0b2244 60%,#071730 100%);padding:32px 40px;text-align:center;">
          <p style="margin:0 0 6px;font-size:11px;font-weight:700;letter-spacing:3px;text-transform:uppercase;color:#B5893B;">EGC EKORA GLOBAL CONSULTING</p>
          <h1 style="margin:0;font-size:22px;font-weight:700;color:#ffffff;letter-spacing:-0.3px;">New Lead Received</h1>
          <p style="margin:8px 0 0;font-size:13px;color:rgba(255,255,255,0.6);">via ${source}</p>
        </td>
      </tr>

      <!-- Alert Banner -->
      <tr>
        <td style="background:#B5893B;padding:10px 40px;text-align:center;">
          <p style="margin:0;font-size:12px;font-weight:700;color:#ffffff;letter-spacing:1px;">ACTION REQUIRED — Please follow up within 24 hours</p>
        </td>
      </tr>

      <!-- Body -->
      <tr>
        <td style="padding:36px 40px;">
          <table width="100%" cellpadding="0" cellspacing="0">

            <!-- Contact Info -->
            <tr>
              <td style="padding-bottom:28px;border-bottom:1px solid #e8e4dc;">
                <p style="margin:0 0 16px;font-size:11px;font-weight:700;letter-spacing:2px;text-transform:uppercase;color:#B5893B;">Contact Information</p>
                <table width="100%" cellpadding="0" cellspacing="0">
                  ${row('👤 Full Name',  name)}
                  ${row('📧 Email',      `<a href="mailto:${email}" style="color:#0D2A52;text-decoration:none;">${email}</a>`)}
                  ${row('📞 Phone',      phone !== '—' ? `<a href="tel:${phone}" style="color:#0D2A52;text-decoration:none;">${phone}</a>` : '—')}
                  ${row('🏢 Company',    company)}
                  ${row('🌍 Country',    country)}
                </table>
              </td>
            </tr>

            <!-- Inquiry Details -->
            <tr>
              <td style="padding:28px 0;border-bottom:1px solid #e8e4dc;">
                <p style="margin:0 0 16px;font-size:11px;font-weight:700;letter-spacing:2px;text-transform:uppercase;color:#B5893B;">Inquiry Details</p>
                <table width="100%" cellpadding="0" cellspacing="0">
                  ${row('📋 Subject / Service', subject)}
                  ${row('💬 Message', `<span style="white-space:pre-wrap;">${message}</span>`)}
                </table>
              </td>
            </tr>

            <!-- Meta -->
            <tr>
              <td style="padding-top:24px;">
                <table width="100%" cellpadding="0" cellspacing="0">
                  ${row('🕐 Submitted At', ts + ' IST')}
                  ${row('📂 Form Source', source)}
                </table>
              </td>
            </tr>

          </table>
        </td>
      </tr>

      <!-- CTA -->
      <tr>
        <td style="padding:0 40px 36px;text-align:center;">
          <a href="mailto:${email}?subject=Re: Your inquiry with EGC Ekora Global Consulting" style="display:inline-block;padding:13px 32px;background:#B5893B;color:#ffffff;text-decoration:none;border-radius:7px;font-weight:700;font-size:14px;letter-spacing:0.3px;">Reply to ${name}</a>
        </td>
      </tr>

      <!-- Footer -->
      <tr>
        <td style="background:#0D2A52;padding:20px 40px;text-align:center;">
          <p style="margin:0;font-size:11px;color:rgba(255,255,255,0.5);">EGC Ekora Global Consulting · info@ekoraglobalconsulting.com · +91 78929 78516</p>
        </td>
      </tr>

    </table>
  </td></tr>
</table>
</body>
</html>`;

  return { subject: emailSubject, html };
}

function buildAutoReply(data: ContactFormData): { subject: string; html: string } {
  const name    = sanitize(data.name || data.fullName || 'there');
  const subject = sanitize(data.subject || data.service || data.interest || 'General Inquiry');
  const company = sanitize(data.company || data.companyName || '');
  const phone   = sanitize(data.phone || '—');
  const message = sanitize(data.message || '—');
  const ts      = new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' });

  const emailSubject = `We received your inquiry — EGC Ekora Global Consulting`;

  const html = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width,initial-scale=1" />
<title>Thank You — EGC Ekora Global Consulting</title>
</head>
<body style="margin:0;padding:0;background:#f4f1ec;font-family:'Segoe UI',Arial,sans-serif;">
<table width="100%" cellpadding="0" cellspacing="0" style="background:#f4f1ec;padding:32px 0;">
  <tr><td align="center">
    <table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;background:#ffffff;border-radius:12px;overflow:hidden;box-shadow:0 4px 24px rgba(13,42,82,0.10);">

      <!-- Header -->
      <tr>
        <td style="background:linear-gradient(135deg,#0D2A52 0%,#0b2244 60%,#071730 100%);padding:40px;text-align:center;">
          <div style="width:60px;height:60px;background:rgba(181,137,59,0.2);border-radius:50%;margin:0 auto 16px;display:flex;align-items:center;justify-content:center;">
            <span style="font-size:28px;">✓</span>
          </div>
          <p style="margin:0 0 6px;font-size:11px;font-weight:700;letter-spacing:3px;text-transform:uppercase;color:#B5893B;">EGC EKORA GLOBAL CONSULTING</p>
          <h1 style="margin:0;font-size:24px;font-weight:700;color:#ffffff;">Thank You, ${name}!</h1>
          <p style="margin:12px 0 0;font-size:14px;color:rgba(255,255,255,0.72);line-height:1.6;">We have received your inquiry and our team will<br>be in touch within <strong style="color:#B5893B;">1–2 business days</strong>.</p>
        </td>
      </tr>

      <!-- Body -->
      <tr>
        <td style="padding:36px 40px;">

          <!-- Greeting -->
          <p style="margin:0 0 24px;font-size:15px;color:#3a3344;line-height:1.75;">
            Dear <strong>${name}</strong>,<br><br>
            Thank you for reaching out to <strong>EGC Ekora Global Consulting</strong>. We have received your inquiry and it has been forwarded to our senior advisory team for review.<br><br>
            We understand that your time is valuable and we are committed to providing you with a thoughtful response at the earliest.
          </p>

          <!-- Inquiry Summary -->
          <div style="background:#f8f6f2;border:1px solid #e8e4dc;border-radius:10px;padding:24px;margin-bottom:28px;">
            <p style="margin:0 0 16px;font-size:11px;font-weight:700;letter-spacing:2px;text-transform:uppercase;color:#B5893B;">Your Inquiry Summary</p>
            <table width="100%" cellpadding="0" cellspacing="0">
              ${replyRow('Service / Interest', subject)}
              ${company ? replyRow('Company', company) : ''}
              ${phone !== '—' ? replyRow('Phone', phone) : ''}
              ${replyRow('Message', `<span style="white-space:pre-wrap;font-style:italic;">"${message}"</span>`)}
              ${replyRow('Submitted', ts + ' IST')}
            </table>
          </div>

          <!-- What Happens Next -->
          <p style="margin:0 0 12px;font-size:11px;font-weight:700;letter-spacing:2px;text-transform:uppercase;color:#0D2A52;">What Happens Next</p>
          <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:28px;">
            ${step('1', 'Review', 'Our experts review your specific requirements carefully.')}
            ${step('2', 'Contact', 'A senior advisor will reach out via email or phone.')}
            ${step('3', 'Consultation', 'We schedule a free initial consultation at your convenience.')}
          </table>

          <!-- Contact Info -->
          <div style="background:#0D2A52;border-radius:10px;padding:24px;">
            <p style="margin:0 0 14px;font-size:12px;font-weight:700;letter-spacing:2px;text-transform:uppercase;color:#B5893B;">Need Immediate Assistance?</p>
            <table cellpadding="0" cellspacing="0">
              <tr>
                <td style="padding:4px 0;font-size:13px;color:rgba(255,255,255,0.8);">📧&nbsp;&nbsp;<a href="mailto:info@ekoraglobalconsulting.com" style="color:#B5893B;text-decoration:none;">info@ekoraglobalconsulting.com</a></td>
              </tr>
              <tr>
                <td style="padding:4px 0;font-size:13px;color:rgba(255,255,255,0.8);">📞&nbsp;&nbsp;<a href="tel:+917892978516" style="color:#B5893B;text-decoration:none;">+91 78929 78516</a></td>
              </tr>
              <tr>
                <td style="padding:4px 0;font-size:13px;color:rgba(255,255,255,0.8);">📍&nbsp;&nbsp;<span>No. 39/3, Richmond Road, Bengaluru</span></td>
              </tr>
            </table>
          </div>

        </td>
      </tr>

      <!-- Footer -->
      <tr>
        <td style="background:#f8f6f2;border-top:1px solid #e8e4dc;padding:20px 40px;text-align:center;">
          <p style="margin:0 0 6px;font-size:12px;color:#7c728a;">This is an automated confirmation. Please do not reply to this email.</p>
          <p style="margin:0;font-size:11px;color:#b0a9bc;">© ${new Date().getFullYear()} EGC Ekora Global Consulting. All rights reserved.</p>
        </td>
      </tr>

    </table>
  </td></tr>
</table>
</body>
</html>`;

  return { subject: emailSubject, html };
}

// ─── HTML helper functions ─────────────────────────────────
function row(label: string, value: string): string {
  return `<tr>
    <td style="padding:6px 0;vertical-align:top;width:160px;">
      <span style="font-size:12px;font-weight:600;color:#7c728a;">${label}</span>
    </td>
    <td style="padding:6px 0;vertical-align:top;">
      <span style="font-size:13px;color:#1a1527;font-weight:500;">${value}</span>
    </td>
  </tr>`;
}

function replyRow(label: string, value: string): string {
  return `<tr>
    <td style="padding:5px 0;vertical-align:top;width:140px;">
      <span style="font-size:12px;font-weight:600;color:#7c728a;">${label}</span>
    </td>
    <td style="padding:5px 0;vertical-align:top;">
      <span style="font-size:13px;color:#1a1527;">${value}</span>
    </td>
  </tr>`;
}

function step(num: string, title: string, desc: string): string {
  return `<tr>
    <td style="padding:7px 0;vertical-align:top;">
      <table cellpadding="0" cellspacing="0">
        <tr>
          <td style="width:28px;vertical-align:top;padding-right:12px;">
            <div style="width:24px;height:24px;background:#B5893B;border-radius:50%;text-align:center;line-height:24px;font-size:11px;font-weight:700;color:#fff;">${num}</div>
          </td>
          <td style="vertical-align:top;">
            <strong style="font-size:13px;color:#0D2A52;">${title}</strong><br>
            <span style="font-size:12px;color:#7c728a;">${desc}</span>
          </td>
        </tr>
      </table>
    </td>
  </tr>`;
}

// ─── Main Route Handler ────────────────────────────────────
export async function POST(req: NextRequest) {
  // Get client IP for rate limiting
  const forwarded = req.headers.get('x-forwarded-for');
  const ip = forwarded ? forwarded.split(',')[0].trim() : 'unknown';

  // Rate limit check
  if (isRateLimited(ip)) {
    return NextResponse.json(
      { success: false, message: 'Too many submissions. Please wait 10 minutes and try again.' },
      { status: 429 }
    );
  }

  // Parse body
  let body: ContactFormData;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json(
      { success: false, message: 'Invalid request body.' },
      { status: 400 }
    );
  }

  // Honeypot spam check
  if ((body as any).website) {
    return NextResponse.json({ success: true, message: 'Submitted.' }); // Silent reject
  }

  // Validate
  const { valid, errors } = validate(body);
  if (!valid) {
    return NextResponse.json(
      { success: false, message: errors[0], errors },
      { status: 422 }
    );
  }

  // Check SMTP config
  if (!process.env.SMTP_USER || !process.env.SMTP_PASS) {
    console.error('[EGC Contact API] SMTP credentials not configured in environment variables.');
    return NextResponse.json(
      { success: false, message: 'Email service is not configured. Please contact us directly.' },
      { status: 500 }
    );
  }

  try {
    const transporter = createTransporter();

    // Verify SMTP connection
    await transporter.verify();

    const contactEmail = process.env.CONTACT_EMAIL || process.env.SMTP_USER;
    const senderEmail  = process.env.SMTP_USER!;

    const { subject: adminSubject, html: adminHtml } = buildAdminEmail(body);
    const { subject: replySubject, html: replyHtml  } = buildAutoReply(body);

    // Send both emails in parallel
    await Promise.all([
      // Admin notification
      transporter.sendMail({
        from: `"EGC Website Lead" <${senderEmail}>`,
        to: contactEmail,
        replyTo: body.email,
        subject: adminSubject,
        html: adminHtml,
      }),
      // Auto-reply to user
      transporter.sendMail({
        from: `"EGC Ekora Global Consulting" <${senderEmail}>`,
        to: body.email,
        subject: replySubject,
        html: replyHtml,
      }),
    ]);

    return NextResponse.json(
      { success: true, message: 'Your inquiry has been submitted successfully! Check your email for confirmation.' },
      { status: 200 }
    );
  } catch (error: unknown) {
    const errMsg = error instanceof Error ? error.message : 'Unknown error';
    console.error('[EGC Contact API] Email send failed:', errMsg);

    // Provide a user-friendly error message
    if (errMsg.includes('ECONNREFUSED') || errMsg.includes('ETIMEDOUT')) {
      return NextResponse.json(
        { success: false, message: 'Email service is temporarily unavailable. Please contact us directly at info@ekoraglobalconsulting.com' },
        { status: 503 }
      );
    }

    return NextResponse.json(
      { success: false, message: 'Failed to send email. Please try again or contact us directly.' },
      { status: 500 }
    );
  }
}

// Block non-POST methods
export async function GET() {
  return NextResponse.json({ message: 'Method not allowed.' }, { status: 405 });
}
