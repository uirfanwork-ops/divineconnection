import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { TICKET_TOKEN_PATTERN } from "@/lib/contemplating-death/db";
import {
  getRegistrationByToken,
  ticketQrSvg,
} from "@/lib/contemplating-death/tickets";
import { cdEvent } from "../../../../../content/contemplating-death";

export const dynamic = "force-dynamic";
export const metadata: Metadata = {
  title: "Your ticket | Contemplating Death",
  robots: { index: false, follow: false },
};

export default async function TicketPage({
  params,
}: {
  params: { token: string };
}) {
  if (!TICKET_TOKEN_PATTERN.test(params.token)) notFound();

  const registration = await getRegistrationByToken(params.token);
  if (
    !registration ||
    registration.status === "pending" ||
    registration.status === "expired"
  ) {
    notFound();
  }

  const refunded = registration.status === "refunded";
  const qr = refunded ? null : await ticketQrSvg(registration.ticket_token);

  return (
    <main className="cd-page">
      <div className="cd-card cd-ticket">
        <p className="eyebrow">Mathabah Learning Centre</p>
        <h1>
          Contemplating <em>Death</em>
        </h1>
        {refunded ? (
          <p className="cd-banner" data-tone="error">
            This ticket was refunded and is no longer valid.
          </p>
        ) : (
          <>
            <p>Show this QR code at the door. It admits one person.</p>
            <div
              className="cd-qr"
              role="img"
              aria-label="Ticket QR code"
              dangerouslySetInnerHTML={{ __html: qr ?? "" }}
            />
          </>
        )}
        <p className="cd-ticket-name">{registration.full_name}</p>
        <p className="cd-ticket-code">{registration.ticket_code}</p>
        <dl className="cd-facts">
          <div>
            <dt>Date</dt>
            <dd>{cdEvent.dateLabel}</dd>
          </div>
          <div>
            <dt>Time</dt>
            <dd>
              {cdEvent.startLabel} to {cdEvent.endLabel} {cdEvent.timezoneLabel}
            </dd>
          </div>
          <div>
            <dt>Venue</dt>
            <dd>
              {cdEvent.venueName},{" "}
              <a href={cdEvent.venueMapUrl}>{cdEvent.venueAddress}</a>
            </dd>
          </div>
        </dl>
        <p className="cd-small">
          Questions?{" "}
          <a href={`mailto:${cdEvent.contactEmail}`}>{cdEvent.contactEmail}</a>
        </p>
      </div>
    </main>
  );
}
