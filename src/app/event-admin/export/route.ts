import { NextResponse } from "next/server";
import { getCdStaff } from "@/lib/contemplating-death/staff";
import {
  CD_TABLE,
  cdDb,
  type CdRegistration,
} from "@/lib/contemplating-death/db";

export const dynamic = "force-dynamic";

function cell(value: unknown): string {
  let text = value === null || value === undefined ? "" : String(value);
  // Stop spreadsheet apps from running attendee text as a formula.
  if (/^[=+\-@\t\r]/.test(text)) text = `'${text}`;
  return `"${text.replace(/"/g, '""')}"`;
}

export async function GET() {
  const admin = await getCdStaff();
  if (!admin)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { data, error } = await cdDb()
    .from(CD_TABLE)
    .select("*")
    .order("created_at", { ascending: true });
  if (error)
    return NextResponse.json({ error: error.message }, { status: 500 });

  const columns: (keyof CdRegistration)[] = [
    "full_name",
    "email",
    "phone",
    "status",
    "ticket_code",
    "amount_cents",
    "paid_at",
    "checked_in_at",
    "checked_in_by",
    "source",
    "heard_of_mathabah",
    "attended_mathabah",
    "wants_updates",
    "interest",
    "accessibility",
    "created_at",
  ];
  const lines = [
    columns.join(","),
    ...((data ?? []) as CdRegistration[]).map((row) =>
      columns.map((column) => cell(row[column])).join(",")
    ),
  ];

  return new NextResponse(lines.join("\r\n"), {
    headers: {
      "Content-Type": "text/csv; charset=utf-8",
      "Content-Disposition":
        'attachment; filename="contemplating-death-registrations.csv"',
      "Cache-Control": "no-store",
    },
  });
}
