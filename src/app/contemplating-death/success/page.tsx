import type { Metadata } from "next";
import Link from "next/link";
import { CD_PATH } from "@/lib/contemplating-death/config";
import {
  fulfillCheckoutSession,
  ticketQrSvg,
  type FulfillResult,
} from "@/lib/contemplating-death/tickets";
import { cdEvent } from "../../../../content/contemplating-death";

export const dynamic = "force-dynamic";
export const metadata: Metadata = {
  title: "Registration confirmed | Contemplating Death",
  robots: { index: false, follow: false },
};

export default async function SuccessPage({
  searchParams,
}: {
  searchParams: { session_id?: string };
}) {
  const sessionId = searchParams.session_id ?? "";
  let result: FulfillResult | { state: "error" } = { state: "not_found" };

  if (/^cs_[A-Za-z0-9_]+$/.test(sessionId)) {
    try {
      result = await fulfillCheckoutSession(sessionId);
    } catch (error) {
      console.error(
        "Contemplating Death success page failed:",
        error instanceof Error ? error.message : error
      );
      result = { state: "error" };
    }
  }

  if (result.state !== "paid") {
    return (
      <main className="cd-page">
        <div className="cd-card">
          <p className="eyebrow">Registration</p>
          <h1>
            {result.state === "unpaid"
              ? "Your payment is still processing"
              : "We could not confirm this payment"}
          </h1>
          <p>
            {result.state === "unpaid"
              ? "Your ticket will be emailed as soon as the payment clears. You can close this page."
              : "If you were charged, your ticket is still on its way by email. If nothing arrives within a few minutes, contact us and we will sort it out."}
          </p>
          <p>
            <a href={`mailto:${cdEvent.contactEmail}`}>
              {cdEvent.contactEmail}
            </a>
          </p>
          <Link className="button button-dark" href={CD_PATH}>
            Back to the event page
          </Link>
        </div>
      </main>
    );
  }

  const { registration, emailError } = result;
  const qr = await ticketQrSvg(registration.ticket_token);

  return (
    <main className="cd-page">
      <div className="cd-card cd-ticket">
        <p className="eyebrow">You are registered</p>
        <h1>
          Your place is <em>confirmed</em>
        </h1>
        <p>
          {emailError
            ? "You are registered. We had trouble emailing your ticket, so please save this page or take a screenshot of the QR code below."
            : `You are registered. We sent your ticket to ${registration.email}. Show this QR code at the door.`}
        </p>
        <div
          className="cd-qr"
          role="img"
          aria-label="Ticket QR code"
          dangerouslySetInnerHTML={{ __html: qr }}
        />
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
              {cdEvent.venueName}, {cdEvent.venueAddress}
            </dd>
          </div>
        </dl>
        <div className="cd-actions">
          <Link
            className="button button-dark"
            href={`${CD_PATH}/ticket/${registration.ticket_token}`}
          >
            Open your ticket
          </Link>
          <Link className="button button-quiet" href={`${CD_PATH}#register`}>
            Register another attendee
          </Link>
        </div>
      </div>
    </main>
  );
}
