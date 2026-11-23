import type { Metadata } from "next";
import Link from "next/link";
import { getAdminUser } from "@/lib/admin";
import { TICKET_TOKEN_PATTERN } from "@/lib/contemplating-death/db";
import { getRegistrationByToken } from "@/lib/contemplating-death/tickets";
import { StaffButton } from "@/components/contemplating-death/staff-buttons";

export const dynamic = "force-dynamic";
export const metadata: Metadata = {
  title: "Door check-in | Contemplating Death",
  robots: { index: false, follow: false },
};

function formatTime(iso: string): string {
  return new Intl.DateTimeFormat("en-CA", {
    timeZone: "America/Toronto",
    dateStyle: "medium",
    timeStyle: "short",
  }).format(new Date(iso));
}

export default async function CheckInPage({
  params,
}: {
  params: { token: string };
}) {
  const admin = await getAdminUser();

  // Attendees who scan their own code land here too. Show nothing about the ticket.
  if (!admin) {
    const next = encodeURIComponent(
      `/contemplating-death/check-in/${params.token}`
    );
    return (
      <main className="cd-page">
        <div className="cd-card">
          <p className="eyebrow">Door check-in</p>
          <h1>This code is for event staff</h1>
          <p>
            Attendees: show this QR code at the door on January 16. Staff: sign
            in to check this ticket in.
          </p>
          <Link
            className="button button-dark"
            href={`/admin-login?next=${next}`}
          >
            Staff sign-in
          </Link>
        </div>
      </main>
    );
  }

  const registration = TICKET_TOKEN_PATTERN.test(params.token)
    ? await getRegistrationByToken(params.token)
    : null;

  let tone: "success" | "error" | "warn" = "error";
  let headline = "Ticket not found";
  let detail = "This QR code does not match any registration.";

  if (registration) {
    if (registration.status !== "paid") {
      headline =
        registration.status === "refunded" ? "Refunded ticket" : "Not paid";
      detail =
        registration.status === "refunded"
          ? "This ticket was refunded. Do not admit without checking with the organizers."
          : "Payment was never completed for this registration.";
    } else if (
      registration.checked_in_at &&
      registration.checked_in_by === admin.email &&
      Date.now() - new Date(registration.checked_in_at).getTime() < 60_000
    ) {
      // The staff member who just tapped Check in sees a clear confirmation.
      tone = "success";
      headline = "Checked in";
      detail = "Welcome them in. Scan the next ticket.";
    } else if (registration.checked_in_at) {
      tone = "warn";
      headline = "Already checked in";
      detail = `Checked in ${formatTime(registration.checked_in_at)}${
        registration.checked_in_by ? ` by ${registration.checked_in_by}` : ""
      }.`;
    } else {
      tone = "success";
      headline = "Valid ticket";
      detail = "Paid and not yet checked in.";
    }
  }

  return (
    <main className="cd-page">
      <div className="cd-card cd-checkin" data-tone={tone}>
        <p className="eyebrow">Door check-in</p>
        <p className="cd-checkin-state">{headline}</p>
        {registration ? (
          <>
            <h1>{registration.full_name}</h1>
            <p className="cd-ticket-code">{registration.ticket_code}</p>
          </>
        ) : null}
        <p>{detail}</p>
        {registration?.accessibility && registration.status === "paid" ? (
          <p className="cd-banner" data-tone="note">
            Accessibility note: {registration.accessibility}
          </p>
        ) : null}
        <div className="cd-actions">
          {registration && tone === "success" && !registration.checked_in_at ? (
            <StaffButton
              action="checkIn"
              token={registration.ticket_token}
              className="button button-checkin"
            >
              Check in
            </StaffButton>
          ) : null}
          {registration?.checked_in_at ? (
            <StaffButton
              action="undo"
              token={registration.ticket_token}
              className="button button-quiet"
              confirmText="Remove this check-in?"
            >
              Undo check-in
            </StaffButton>
          ) : null}
          <Link
            className="button button-quiet"
            href="/admin/contemplating-death"
          >
            Open the door list
          </Link>
        </div>
        <p className="cd-small">Signed in as {admin.email}</p>
      </div>
    </main>
  );
}
