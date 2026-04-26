import { siteConfig } from "../../../content/site-config";
import { formatCents } from "@/lib/utils";

interface RegistrationData {
  id: string;
  full_name: string;
  email: string;
  amount_cents: number;
  currency: string;
  confirmation_code: string;
}

function baseLayout(content: string): string {
  return `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body style="margin:0;padding:0;font-family:Arial,Helvetica,sans-serif;background-color:#f5f5f5;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:#f5f5f5;padding:24px 0;">
    <tr>
      <td align="center">
        <table role="presentation" width="600" cellpadding="0" cellspacing="0" style="background-color:#ffffff;border-radius:8px;overflow:hidden;max-width:600px;width:100%;">
          <tr>
            <td style="background:linear-gradient(135deg,#0a1a0a 0%,#1a3a1a 100%);padding:28px 32px;text-align:center;">
              <h1 style="margin:0;color:#ffffff;font-size:22px;font-weight:bold;">${siteConfig.shortName}</h1>
              <p style="margin:4px 0 0;color:#c9a84c;font-size:13px;letter-spacing:1px;text-transform:uppercase;">${siteConfig.footer.tagline}</p>
            </td>
          </tr>
          <tr>
            <td style="padding:32px;">
              ${content}
            </td>
          </tr>
          <tr>
            <td style="padding:16px 32px;border-top:1px solid #e5e5e5;text-align:center;">
              <p style="margin:0;color:#888;font-size:12px;">
                ${siteConfig.footer.copyright} | ${siteConfig.retreatDate}
              </p>
              <p style="margin:4px 0 0;color:#888;font-size:12px;">
                <a href="mailto:${siteConfig.supportEmail}" style="color:#1a6847;">${siteConfig.supportEmail}</a>
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}

export function eTransferConfirmationEmail(
  registration: RegistrationData
): { subject: string; html: string } {
  const amount = formatCents(registration.amount_cents, registration.currency);

  const content = `
    <h2 style="margin:0 0 16px;color:#1a1a1a;font-size:20px;">Registration Received — Pending Payment</h2>
    <p style="margin:0 0 12px;color:#444;font-size:15px;line-height:1.6;">
      Assalamu Alaikum ${registration.full_name.split(" ")[0]},
    </p>
    <p style="margin:0 0 16px;color:#444;font-size:15px;line-height:1.6;">
      Thank you for registering for <strong>${siteConfig.name}</strong>. Your registration is <strong>pending</strong> until we receive your e-Transfer payment.
    </p>
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:#0a1a0a;border-radius:6px;margin:0 0 20px;">
      <tr>
        <td style="padding:20px;text-align:center;">
          <p style="margin:0 0 4px;color:#c9a84c;font-size:11px;text-transform:uppercase;letter-spacing:1px;">Your Confirmation Code</p>
          <p style="margin:0;color:#ffffff;font-size:32px;font-weight:bold;letter-spacing:4px;font-family:monospace;">${registration.confirmation_code}</p>
        </td>
      </tr>
    </table>
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:#f8f8f8;border-radius:6px;margin:0 0 20px;">
      <tr>
        <td style="padding:16px;">
          <p style="margin:0 0 8px;color:#888;font-size:12px;text-transform:uppercase;letter-spacing:0.5px;">E-Transfer Details</p>
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
            <tr>
              <td style="padding:4px 0;color:#666;font-size:14px;">Send to:</td>
              <td style="padding:4px 0;color:#1a1a1a;font-size:14px;font-weight:bold;">finance@mathabah.org</td>
            </tr>
            <tr>
              <td style="padding:4px 0;color:#666;font-size:14px;">Amount:</td>
              <td style="padding:4px 0;color:#1a1a1a;font-size:14px;font-weight:bold;">${amount} ${registration.currency}</td>
            </tr>
            <tr>
              <td style="padding:4px 0;color:#666;font-size:14px;">Message:</td>
              <td style="padding:4px 0;color:#1a1a1a;font-size:13px;font-family:monospace;">${registration.confirmation_code} - ${registration.full_name}</td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin:0 0 20px;">
      <tr>
        <td style="padding:12px 16px;background-color:#fffbeb;border:1px solid #fde68a;border-radius:6px;">
          <p style="margin:0;color:#92400e;font-size:13px;">
            <strong>Important:</strong> You MUST include your confirmation code <strong>${registration.confirmation_code}</strong> in the e-Transfer message field so we can match your payment to your registration.
          </p>
        </td>
      </tr>
    </table>
    <p style="margin:0 0 12px;color:#444;font-size:15px;line-height:1.6;">
      Once we verify your payment, you will receive a final confirmation email confirming your official registration for the retreat.
    </p>
    <p style="margin:0;color:#888;font-size:13px;">
      Questions? Reply to this email or contact us at ${siteConfig.supportEmail}
    </p>`;

  return {
    subject: `Registration Pending - ${registration.confirmation_code} - ${siteConfig.shortName}`,
    html: baseLayout(content),
  };
}

export function adminNewRegistrationEmail(
  registration: RegistrationData & { phone: string; tier_name: string }
): { subject: string; html: string } {
  const amount = formatCents(registration.amount_cents, registration.currency);

  const content = `
    <h2 style="margin:0 0 16px;color:#1a1a1a;font-size:20px;">New Registration</h2>
    <p style="margin:0 0 16px;color:#444;font-size:15px;line-height:1.6;">
      A new registration has been submitted for the retreat.
    </p>
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:#f8f8f8;border-radius:6px;margin:0 0 20px;">
      <tr>
        <td style="padding:16px;">
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
            <tr>
              <td style="padding:4px 0;color:#666;font-size:14px;width:140px;">Confirmation Code:</td>
              <td style="padding:4px 0;color:#1a1a1a;font-size:14px;font-weight:bold;font-family:monospace;">${registration.confirmation_code}</td>
            </tr>
            <tr>
              <td style="padding:4px 0;color:#666;font-size:14px;">Name:</td>
              <td style="padding:4px 0;color:#1a1a1a;font-size:14px;font-weight:bold;">${registration.full_name}</td>
            </tr>
            <tr>
              <td style="padding:4px 0;color:#666;font-size:14px;">Email:</td>
              <td style="padding:4px 0;color:#1a1a1a;font-size:14px;">${registration.email}</td>
            </tr>
            <tr>
              <td style="padding:4px 0;color:#666;font-size:14px;">Phone:</td>
              <td style="padding:4px 0;color:#1a1a1a;font-size:14px;">${registration.phone}</td>
            </tr>
            <tr>
              <td style="padding:4px 0;color:#666;font-size:14px;">Tier:</td>
              <td style="padding:4px 0;color:#1a1a1a;font-size:14px;">${registration.tier_name}</td>
            </tr>
            <tr>
              <td style="padding:4px 0;color:#666;font-size:14px;">Amount:</td>
              <td style="padding:4px 0;color:#1a1a1a;font-size:14px;font-weight:bold;">${amount} ${registration.currency}</td>
            </tr>
            <tr>
              <td style="padding:4px 0;color:#666;font-size:14px;">Payment:</td>
              <td style="padding:4px 0;color:#e74c3c;font-size:14px;font-weight:bold;">UNPAID - Awaiting e-Transfer</td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
    <p style="margin:0;color:#888;font-size:13px;">
      Log in to the admin portal to view and manage this registration.
    </p>`;

  return {
    subject: `New Registration: ${registration.full_name} [${registration.confirmation_code}] - ${siteConfig.shortName}`,
    html: baseLayout(content),
  };
}

export function paymentConfirmedEmail(
  registration: { full_name: string; confirmation_code: string }
): { subject: string; html: string } {
  const content = `
    <h2 style="margin:0 0 16px;color:#1a1a1a;font-size:20px;">Registration Confirmed!</h2>
    <p style="margin:0 0 12px;color:#444;font-size:15px;line-height:1.6;">
      Assalamu Alaikum ${registration.full_name.split(" ")[0]},
    </p>
    <p style="margin:0 0 16px;color:#444;font-size:15px;line-height:1.6;">
      Alhamdulillah! Your payment has been received and verified. You are now <strong>officially registered</strong> for the <strong>${siteConfig.name}</strong> retreat.
    </p>
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:#0a1a0a;border-radius:6px;margin:0 0 20px;">
      <tr>
        <td style="padding:20px;text-align:center;">
          <p style="margin:0 0 4px;color:#c9a84c;font-size:11px;text-transform:uppercase;letter-spacing:1px;">Your Confirmation Code</p>
          <p style="margin:0;color:#ffffff;font-size:32px;font-weight:bold;letter-spacing:4px;font-family:monospace;">${registration.confirmation_code}</p>
        </td>
      </tr>
    </table>
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:#f0fdf4;border:1px solid #bbf7d0;border-radius:6px;margin:0 0 20px;">
      <tr>
        <td style="padding:16px;">
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
            <tr>
              <td style="padding:4px 0;color:#166534;font-size:14px;font-weight:bold;">Retreat Details</td>
            </tr>
            <tr>
              <td style="padding:4px 0;color:#15803d;font-size:14px;">Date: ${siteConfig.retreatDate}</td>
            </tr>
            <tr>
              <td style="padding:4px 0;color:#15803d;font-size:14px;">Venue: ${siteConfig.retreatVenue}</td>
            </tr>
            <tr>
              <td style="padding:4px 0;color:#15803d;font-size:14px;">Address: ${siteConfig.retreatAddress}</td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
    <p style="margin:0 0 12px;color:#444;font-size:15px;line-height:1.6;">
      Please keep your confirmation code for your records. More details about the retreat (schedule, packing list, etc.) will be sent closer to the date.
    </p>
    <p style="margin:0;color:#888;font-size:13px;">
      We look forward to seeing you! If you have any questions, contact us at ${siteConfig.supportEmail}
    </p>`;

  return {
    subject: `Registration Confirmed! - ${siteConfig.shortName}`,
    html: baseLayout(content),
  };
}

export function paymentReminderEmail(
  registration: { full_name: string; confirmation_code: string; amount_cents: number; currency: string }
): { subject: string; html: string } {
  const amount = formatCents(registration.amount_cents, registration.currency);

  const content = `
    <h2 style="margin:0 0 16px;color:#1a1a1a;font-size:20px;">Payment Reminder</h2>
    <p style="margin:0 0 12px;color:#444;font-size:15px;line-height:1.6;">
      Assalamu Alaikum ${registration.full_name.split(" ")[0]},
    </p>
    <p style="margin:0 0 16px;color:#444;font-size:15px;line-height:1.6;">
      This is a friendly reminder that your registration for <strong>${siteConfig.name}</strong> is still <strong>pending payment</strong>. Please complete your e-Transfer to secure your spot.
    </p>
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:#0a1a0a;border-radius:6px;margin:0 0 20px;">
      <tr>
        <td style="padding:20px;text-align:center;">
          <p style="margin:0 0 4px;color:#c9a84c;font-size:11px;text-transform:uppercase;letter-spacing:1px;">Your Confirmation Code</p>
          <p style="margin:0;color:#ffffff;font-size:32px;font-weight:bold;letter-spacing:4px;font-family:monospace;">${registration.confirmation_code}</p>
        </td>
      </tr>
    </table>
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:#f8f8f8;border-radius:6px;margin:0 0 20px;">
      <tr>
        <td style="padding:16px;">
          <p style="margin:0 0 8px;color:#888;font-size:12px;text-transform:uppercase;letter-spacing:0.5px;">E-Transfer Details</p>
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
            <tr>
              <td style="padding:4px 0;color:#666;font-size:14px;">Send to:</td>
              <td style="padding:4px 0;color:#1a1a1a;font-size:14px;font-weight:bold;">finance@mathabah.org</td>
            </tr>
            <tr>
              <td style="padding:4px 0;color:#666;font-size:14px;">Amount:</td>
              <td style="padding:4px 0;color:#1a1a1a;font-size:14px;font-weight:bold;">${amount} ${registration.currency}</td>
            </tr>
            <tr>
              <td style="padding:4px 0;color:#666;font-size:14px;">Message:</td>
              <td style="padding:4px 0;color:#1a1a1a;font-size:13px;font-family:monospace;">${registration.confirmation_code} - ${registration.full_name}</td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
    <p style="margin:0 0 12px;color:#444;font-size:15px;line-height:1.6;">
      Please include your confirmation code <strong>${registration.confirmation_code}</strong> in the e-Transfer message so we can match your payment.
    </p>
    <p style="margin:0 0 12px;color:#444;font-size:15px;line-height:1.6;">
      Once we verify your payment, you will receive a confirmation email with retreat details.
    </p>
    <p style="margin:0;color:#888;font-size:13px;">
      Questions? Contact us at ${siteConfig.supportEmail}
    </p>`;

  return {
    subject: `Payment Reminder - ${registration.confirmation_code} - ${siteConfig.shortName}`,
    html: baseLayout(content),
  };
}
