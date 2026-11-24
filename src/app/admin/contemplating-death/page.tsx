export const dynamic = "force-dynamic";

import Link from "next/link";
import {
  CD_TABLE,
  cdDb,
  type CdRegistration,
} from "@/lib/contemplating-death/db";
import { getCdCapacity } from "@/lib/contemplating-death/config";
import { StaffButton } from "@/components/contemplating-death/staff-buttons";
import { formatCents } from "@/lib/utils";

interface PageProps {
  searchParams: { search?: string; show?: string };
}

function formatTime(iso: string | null): string {
  if (!iso) return "";
  return new Intl.DateTimeFormat("en-CA", {
    timeZone: "America/Toronto",
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
  }).format(new Date(iso));
}

const SOURCE_LABELS: Record<string, string> = {
  social: "Social media",
  friend: "Friend or family",
  masjid: "Masjid",
  other: "Other",
};

function yesNo(value: boolean): string {
  return value ? "Yes" : "No";
}

function detailRows(row: CdRegistration): [string, string][] {
  return [
    ["Full name", row.full_name],
    ["Email", row.email],
    ["Phone", row.phone ?? ""],
    ["Ticket code", row.ticket_code],
    ["Status", row.status],
    ["Amount", formatCents(row.amount_cents, row.currency)],
    ["Registered", formatTime(row.created_at)],
    ["Paid", formatTime(row.paid_at)],
    ["Ticket emailed", formatTime(row.ticket_emailed_at)],
    ["Checked in", formatTime(row.checked_in_at)],
    ["Checked in by", row.checked_in_by ?? ""],
    ["Heard via", SOURCE_LABELS[row.source] ?? row.source],
    ["Heard of Mathabah", yesNo(row.heard_of_mathabah)],
    ["Attended before", yesNo(row.attended_mathabah)],
    ["Wants updates", yesNo(row.wants_updates)],
    ["Interest", row.interest ?? ""],
    ["Accessibility", row.accessibility ?? ""],
  ];
}

export default async function ContemplatingDeathAdminPage({
  searchParams,
}: PageProps) {
  const search = (searchParams.search ?? "").trim();
  const show = searchParams.show === "all" ? "all" : "paid";

  let rows: CdRegistration[] = [];
  let loadError: string | null = null;
  let paidCount = 0;
  let checkedInCount = 0;
  let revenueCents = 0;

  try {
    const db = cdDb();

    const { data: paid, error: paidError } = await db
      .from(CD_TABLE)
      .select("amount_cents, checked_in_at")
      .eq("status", "paid");
    if (paidError) throw new Error(paidError.message);
    paidCount = paid?.length ?? 0;
    checkedInCount = (paid ?? []).filter((r) => r.checked_in_at).length;
    revenueCents = (paid ?? []).reduce(
      (sum, r) => sum + (r.amount_cents ?? 0),
      0
    );

    let query = db
      .from(CD_TABLE)
      .select("*")
      .order("created_at", { ascending: false })
      .limit(1000);
    if (show === "paid") query = query.eq("status", "paid");
    if (search) {
      const s = search.replace(/[%_,()]/g, "");
      query = query.or(
        `full_name.ilike.%${s}%,email.ilike.%${s}%,phone.ilike.%${s}%,ticket_code.ilike.%${s}%`
      );
    }
    const { data, error } = await query;
    if (error) throw new Error(error.message);
    rows = (data ?? []) as CdRegistration[];
  } catch (error) {
    loadError = error instanceof Error ? error.message : "Unknown error";
  }

  const capacity = getCdCapacity();
  const stats = [
    {
      label: "Paid tickets",
      value: capacity ? `${paidCount} / ${capacity}` : String(paidCount),
    },
    { label: "Checked in", value: `${checkedInCount} / ${paidCount}` },
    { label: "Revenue", value: formatCents(revenueCents) },
  ];

  return (
    <div>
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground">
            Contemplating Death
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            January 16, 2027. Tickets, payments and door check-in.
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <Link
            className="rounded-md bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground"
            href="/contemplating-death/scan"
          >
            Start scanning
          </Link>
          <a
            className="rounded-md border px-5 py-2.5 text-sm font-semibold text-foreground"
            href="/admin/contemplating-death/export"
            download
          >
            Download CSV
          </a>
          <Link
            className="text-sm underline text-primary"
            href="/contemplating-death"
            target="_blank"
          >
            View event page
          </Link>
        </div>
      </div>

      <div className="mt-6 grid gap-4 sm:grid-cols-3">
        {stats.map((stat) => (
          <div key={stat.label} className="rounded-lg border bg-card p-4">
            <p className="text-xs uppercase tracking-wider text-muted-foreground">
              {stat.label}
            </p>
            <p className="mt-1 text-2xl font-bold text-foreground">
              {stat.value}
            </p>
          </div>
        ))}
      </div>

      <form className="mt-6 flex flex-wrap gap-3" method="get">
        <input
          type="search"
          name="search"
          defaultValue={search}
          placeholder="Search name, email, phone or ticket code"
          className="h-10 min-w-[260px] flex-1 rounded-md border bg-background px-3 text-sm text-foreground"
        />
        <select
          name="show"
          defaultValue={show}
          className="h-10 rounded-md border bg-background px-3 text-sm text-foreground"
        >
          <option value="paid">Paid only</option>
          <option value="all">All, including unpaid</option>
        </select>
        <button
          type="submit"
          className="h-10 rounded-md bg-primary px-4 text-sm font-medium text-primary-foreground"
        >
          Filter
        </button>
      </form>

      {loadError ? (
        <p className="mt-6 rounded-md border border-destructive/50 bg-destructive/10 p-3 text-sm text-destructive">
          Could not load registrations: {loadError}. If the table is missing,
          run docs/migration-contemplating-death.sql in Supabase.
        </p>
      ) : null}

      <div className="mt-6 overflow-x-auto rounded-lg border">
        <table className="w-full min-w-[860px] text-left text-sm">
          <thead className="bg-muted text-xs uppercase tracking-wider text-muted-foreground">
            <tr>
              <th className="px-3 py-2">Attendee</th>
              <th className="px-3 py-2">Ticket</th>
              <th className="px-3 py-2">Status</th>
              <th className="px-3 py-2">Heard via</th>
              <th className="px-3 py-2">Notes</th>
              <th className="px-3 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {rows.length === 0 ? (
              <tr>
                <td className="px-3 py-6 text-muted-foreground" colSpan={6}>
                  No registrations match.
                </td>
              </tr>
            ) : null}
            {rows.map((row) => (
              <tr key={row.id} className="border-t align-top">
                <td className="px-3 py-3">
                  <p className="font-medium text-foreground">{row.full_name}</p>
                  <p className="text-muted-foreground">{row.email}</p>
                  {row.phone ? (
                    <p className="text-muted-foreground">{row.phone}</p>
                  ) : null}
                  <details className="mt-2">
                    <summary className="cursor-pointer text-primary underline">
                      Full registration
                      {row.status === "paid" ? " and QR code" : ""}
                    </summary>
                    <div className="mt-3 flex flex-wrap gap-5 rounded-md border bg-card p-4">
                      {row.status === "paid" ? (
                        <div className="text-center">
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img
                            src={`/admin/contemplating-death/qr/${row.ticket_token}`}
                            alt={`QR code for ${row.full_name}`}
                            width={180}
                            height={180}
                            loading="lazy"
                            className="rounded bg-white"
                          />
                          <a
                            className="mt-2 inline-block text-xs underline text-primary"
                            href={`/contemplating-death/ticket/${row.ticket_token}`}
                            target="_blank"
                          >
                            Open ticket
                          </a>
                        </div>
                      ) : null}
                      <dl className="grid min-w-[260px] flex-1 grid-cols-[150px_1fr] gap-x-3 gap-y-1.5 text-sm">
                        {detailRows(row).map(([label, value]) => (
                          <div key={label} className="contents">
                            <dt className="text-muted-foreground">{label}</dt>
                            <dd className="break-words text-foreground">
                              {value || "None"}
                            </dd>
                          </div>
                        ))}
                      </dl>
                    </div>
                  </details>
                </td>
                <td className="px-3 py-3 font-mono text-foreground">
                  {row.ticket_code}
                </td>
                <td className="px-3 py-3">
                  <p className="text-foreground">
                    {row.status === "paid"
                      ? `Paid ${formatTime(row.paid_at)}`
                      : row.status.charAt(0).toUpperCase() +
                        row.status.slice(1)}
                  </p>
                  {row.checked_in_at ? (
                    <p className="text-primary">
                      Checked in {formatTime(row.checked_in_at)}
                    </p>
                  ) : null}
                  {row.status === "paid" && !row.ticket_emailed_at ? (
                    <p className="text-destructive">Ticket email not sent</p>
                  ) : null}
                </td>
                <td className="px-3 py-3 text-muted-foreground">
                  {SOURCE_LABELS[row.source] ?? row.source}
                  <br />
                  {row.attended_mathabah
                    ? "Past attendee"
                    : row.heard_of_mathabah
                      ? "Knows Mathabah"
                      : "New to Mathabah"}
                  {row.wants_updates ? (
                    <>
                      <br />
                      Wants updates
                    </>
                  ) : null}
                </td>
                <td className="max-w-[240px] px-3 py-3 text-muted-foreground">
                  {row.accessibility ? (
                    <p>Accessibility: {row.accessibility}</p>
                  ) : null}
                  {row.interest ? <p>Interest: {row.interest}</p> : null}
                </td>
                <td className="space-y-2 px-3 py-3">
                  {row.status === "paid" ? (
                    <div className="flex flex-col items-start gap-2">
                      {row.checked_in_at ? (
                        <StaffButton
                          action="undo"
                          token={row.ticket_token}
                          className="underline text-muted-foreground"
                          confirmText={`Remove the check-in for ${row.full_name}?`}
                        >
                          Undo check-in
                        </StaffButton>
                      ) : (
                        <StaffButton
                          action="checkIn"
                          token={row.ticket_token}
                          className="rounded-md bg-primary px-3 py-1.5 text-sm font-medium text-primary-foreground"
                        >
                          Check in
                        </StaffButton>
                      )}
                      <StaffButton
                        action="resend"
                        token={row.ticket_token}
                        className="underline text-primary"
                      >
                        Resend ticket
                      </StaffButton>
                    </div>
                  ) : null}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
