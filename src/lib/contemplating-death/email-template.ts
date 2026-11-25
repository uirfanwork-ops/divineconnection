import { escapeHtml } from "@/lib/sanitize";
import { cdEvent } from "../../../content/contemplating-death";
import type { CdRegistration } from "./db";

function calendarLink(): string {
  const params = new URLSearchParams({
    action: "TEMPLATE",
    text: `${cdEvent.title} with Mathabah`,
    dates: "20270116T160000Z/20270117T000000Z",
    location: `${cdEvent.venueName}, ${cdEvent.venueAddress}`,
    details: "Bring your ticket QR code to show at the door.",
  });
  return `https://calendar.google.com/calendar/render?${params.toString()}`;
}

export function ticketEmail(
  registration: CdRegistration,
  links: { ticketUrl: string }
): { subject: string; html: string } {
  const firstName = escapeHtml(registration.full_name.trim().split(/\s+/)[0]);
  const fullName = escapeHtml(registration.full_name);
  const amount = new Intl.NumberFormat("en-CA", {
    style: "currency",
    currency: registration.currency,
  }).format(registration.amount_cents / 100);

  const row = (label: string, value: string) => `
    <tr>
      <td style="padding:9px 0;border-top:1px solid #e3dac8;color:#805a2a;font-size:11px;letter-spacing:1.6px;text-transform:uppercase;font-weight:bold;width:92px;vertical-align:top;">${label}</td>
      <td style="padding:9px 0;border-top:1px solid #e3dac8;color:#24231c;font-size:15px;line-height:1.5;">${value}</td>
    </tr>`;

  const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Your ticket: ${cdEvent.title}</title>
</head>
<body style="margin:0;padding:0;background-color:#ece5d5;font-family:Arial,Helvetica,sans-serif;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:#ece5d5;padding:28px 12px;">
    <tr>
      <td align="center">
        <table role="presentation" width="560" cellpadding="0" cellspacing="0" style="max-width:560px;width:100%;background-color:#f8f5ed;border:1px solid #d8cdb7;border-radius:6px;overflow:hidden;">
          <tr>
            <td style="background-color:#151612;padding:34px 32px 30px;text-align:center;border-bottom:2px solid #e3bf81;">
              <p style="margin:0 0 10px;color:#e3bf81;font-size:11px;letter-spacing:2.4px;text-transform:uppercase;font-weight:bold;">Mathabah Learning Centre</p>
              <h1 style="margin:0;color:#f4efe4;font-family:Georgia,'Times New Roman',serif;font-size:32px;font-weight:normal;line-height:1.1;">Contemplating <span style="color:#e3bf81;font-style:italic;">Death</span></h1>
            </td>
          </tr>
          <tr>
            <td style="padding:32px 32px 8px;">
              <p style="margin:0 0 14px;color:#24231c;font-size:16px;line-height:1.6;">Assalamu alaikum ${firstName},</p>
              <p style="margin:0;color:#5e594d;font-size:15px;line-height:1.65;">Your place is confirmed${registration.amount_cents > 0 ? ` and your payment of ${amount} has been received` : ""}. This email is your ticket. Show the QR code below at the door, on your phone or printed.</p>
            </td>
          </tr>
          <tr>
            <td align="center" style="padding:22px 32px 6px;">
              <table role="presentation" cellpadding="0" cellspacing="0" style="background-color:#ffffff;border:1px solid #cbbda3;border-radius:6px;">
                <tr>
                  <td align="center" style="padding:16px 16px 8px;">
                    <img src="cid:ticket-qr" width="240" height="240" alt="Ticket QR code for ${fullName}" style="display:block;width:240px;height:240px;border:0;">
                  </td>
                </tr>
                <tr>
                  <td align="center" style="padding:0 16px 16px;">
                    <p style="margin:0;color:#24231c;font-size:16px;font-weight:bold;">${fullName}</p>
                    <p style="margin:4px 0 0;color:#805a2a;font-family:'Courier New',Courier,monospace;font-size:15px;letter-spacing:2px;">${escapeHtml(registration.ticket_code)}</p>
                  </td>
                </tr>
              </table>
              <p style="margin:14px 0 0;color:#5e594d;font-size:13px;line-height:1.5;">QR code not showing? <a href="${links.ticketUrl}" style="color:#805a2a;">Open your ticket online</a>.</p>
            </td>
          </tr>
          <tr>
            <td style="padding:22px 32px 6px;">
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                ${row("Date", cdEvent.dateLabel)}
                ${row("Time", `${cdEvent.startLabel} to ${cdEvent.endLabel} ${cdEvent.timezoneLabel}`)}
                ${row("Venue", `${cdEvent.venueName}<br><a href="${cdEvent.venueMapUrl}" style="color:#805a2a;">${cdEvent.venueAddress}</a>`)}
                ${row("Lunch", "Served on site by Al-Dar Catering")}
              </table>
            </td>
          </tr>
          <tr>
            <td align="center" style="padding:18px 32px 30px;">
              <a href="${calendarLink()}" style="display:inline-block;background-color:#1d1f17;color:#f8f5ed;text-decoration:none;font-size:14px;font-weight:bold;padding:13px 22px;border-radius:3px;">Add to Google Calendar</a>
              <p style="margin:18px 0 0;color:#5e594d;font-size:13px;line-height:1.6;">This ticket admits one person. Each attendee needs their own ticket.</p>
            </td>
          </tr>
          <tr>
            <td style="padding:18px 32px;border-top:1px solid #d8cdb7;text-align:center;">
              <p style="margin:0;color:#5e594d;font-size:12px;line-height:1.6;">Questions? Reply to this email or write to <a href="mailto:${cdEvent.contactEmail}" style="color:#805a2a;">${cdEvent.contactEmail}</a>.</p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;

  return {
    subject: `Your ticket for ${cdEvent.title}, ${cdEvent.dateLabel}`,
    html,
  };
}
