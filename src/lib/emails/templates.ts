import { siteConfig } from "../../../content/site-config";
import { formatCents } from "@/lib/utils";

interface RegistrationData {
  id: string;
  full_name: string;
  email: string;
  amount_cents: number;
  currency: string;
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
            <td style="background:linear-gradient(135deg,#0b1120 0%,#1e3a8a 100%);padding:28px 32px;text-align:center;">
              <h1 style="margin:0;color:#ffffff;font-size:22px;font-weight:bold;">${siteConfig.shortName}</h1>
              <p style="margin:4px 0 0;color:#fbbf24;font-size:13px;letter-spacing:1px;text-transform:uppercase;">${siteConfig.footer.tagline}</p>
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
    <h2 style="margin:0 0 16px;color:#1a1a1a;font-size:20px;">Registration Received</h2>
    <p style="margin:0 0 12px;color:#444;font-size:15px;line-height:1.6;">
      Assalamu Alaikum ${registration.full_name.split(" ")[0]},
    </p>
    <p style="margin:0 0 16px;color:#444;font-size:15px;line-height:1.6;">
      Thank you for registering for <strong>${siteConfig.name}</strong>. We have received your registration and are awaiting your e-Transfer payment.
    </p>
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
              <td style="padding:4px 0;color:#1a1a1a;font-size:13px;font-family:monospace;">${registration.full_name} - ${registration.id}</td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
    <p style="margin:0 0 12px;color:#444;font-size:15px;line-height:1.6;">
      Once we verify your payment, you will receive a final confirmation email with retreat details and a packing list.
    </p>
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin:0 0 20px;">
      <tr>
        <td style="padding:12px 16px;background-color:#fffbeb;border:1px solid #fde68a;border-radius:6px;">
          <p style="margin:0;color:#92400e;font-size:13px;">
            <strong>Important:</strong> Include your full name and registration ID in the e-Transfer message field so we can match your payment to your registration.
          </p>
        </td>
      </tr>
    </table>
    <p style="margin:0 0 4px;color:#444;font-size:14px;"><strong>Registration ID:</strong></p>
    <p style="margin:0 0 16px;color:#666;font-size:13px;font-family:monospace;word-break:break-all;">${registration.id}</p>
    <p style="margin:0;color:#888;font-size:13px;">
      Questions? Reply to this email or contact us at ${siteConfig.supportEmail}
    </p>`;

  return {
    subject: `Registration Received - ${siteConfig.shortName}`,
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
              <td style="padding:4px 0;color:#666;font-size:14px;width:120px;">Name:</td>
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
              <td style="padding:4px 0;color:#1a1a1a;font-size:14px;">e-Transfer (awaiting)</td>
            </tr>
            <tr>
              <td style="padding:4px 0;color:#666;font-size:14px;">ID:</td>
              <td style="padding:4px 0;color:#666;font-size:12px;font-family:monospace;">${registration.id}</td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
    <p style="margin:0;color:#888;font-size:13px;">
      Log in to the admin portal to view and manage this registration.
    </p>`;

  return {
    subject: `New Registration: ${registration.full_name} - ${siteConfig.shortName}`,
    html: baseLayout(content),
  };
}
