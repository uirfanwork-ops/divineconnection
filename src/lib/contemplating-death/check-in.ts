"use server";

import { revalidatePath } from "next/cache";
import { getAdminUser } from "@/lib/admin";
import { CD_PATH } from "./config";
import {
  CD_TABLE,
  cdDb,
  TICKET_TOKEN_PATTERN,
  type CdRegistration,
} from "./db";
import { sendTicketEmail } from "./tickets";

export interface StaffActionResult {
  ok: boolean;
  message: string;
}

function refresh(token?: string) {
  revalidatePath("/admin/contemplating-death");
  if (token) revalidatePath(`${CD_PATH}/check-in/${token}`);
}

/** Every action re-checks the staff session; the page guard alone is not enough. */
export async function checkInTicket(token: string): Promise<StaffActionResult> {
  const admin = await getAdminUser();
  if (!admin) return { ok: false, message: "Staff sign-in required." };
  if (!TICKET_TOKEN_PATTERN.test(token)) {
    return { ok: false, message: "Ticket not found." };
  }

  const { data, error } = await cdDb()
    .from(CD_TABLE)
    .update({
      checked_in_at: new Date().toISOString(),
      checked_in_by: admin.email,
    })
    .eq("ticket_token", token)
    .eq("status", "paid")
    .is("checked_in_at", null)
    .select("id")
    .maybeSingle();

  refresh(token);
  if (error) return { ok: false, message: "Check-in failed. Try again." };
  if (!data) {
    return {
      ok: false,
      message: "This ticket is not valid or was already used.",
    };
  }
  return { ok: true, message: "Checked in." };
}

export async function undoCheckIn(token: string): Promise<StaffActionResult> {
  const admin = await getAdminUser();
  if (!admin) return { ok: false, message: "Staff sign-in required." };
  if (!TICKET_TOKEN_PATTERN.test(token)) {
    return { ok: false, message: "Ticket not found." };
  }

  const { error } = await cdDb()
    .from(CD_TABLE)
    .update({ checked_in_at: null, checked_in_by: null })
    .eq("ticket_token", token);

  refresh(token);
  if (error) return { ok: false, message: "Could not undo the check-in." };
  return { ok: true, message: "Check-in removed." };
}

export async function resendTicket(token: string): Promise<StaffActionResult> {
  const admin = await getAdminUser();
  if (!admin) return { ok: false, message: "Staff sign-in required." };
  if (!TICKET_TOKEN_PATTERN.test(token)) {
    return { ok: false, message: "Ticket not found." };
  }

  const { data } = await cdDb()
    .from(CD_TABLE)
    .select("*")
    .eq("ticket_token", token)
    .maybeSingle();
  const registration = data as CdRegistration | null;
  if (!registration || registration.status !== "paid") {
    return { ok: false, message: "Only paid registrations have a ticket." };
  }

  try {
    await sendTicketEmail(registration, { force: true });
  } catch {
    return { ok: false, message: "The email could not be sent." };
  }
  refresh();
  return { ok: true, message: `Ticket sent to ${registration.email}.` };
}

export type ScanState =
  | "checked_in"
  | "already"
  | "not_paid"
  | "refunded"
  | "not_found"
  | "unauthorized"
  | "error";

export interface ScanResult {
  state: ScanState;
  name?: string;
  code?: string;
  detail?: string;
  accessibility?: string | null;
}

function torontoTime(iso: string): string {
  return new Intl.DateTimeFormat("en-CA", {
    timeZone: "America/Toronto",
    hour: "numeric",
    minute: "2-digit",
  }).format(new Date(iso));
}

/**
 * Used by the in-browser scanner. Accepts the text read from a QR code (the
 * check-in URL) or a typed ticket code, and checks the attendee in right away.
 */
export async function scanTicket(input: string): Promise<ScanResult> {
  const admin = await getAdminUser();
  if (!admin) return { state: "unauthorized" };

  const text = String(input ?? "")
    .trim()
    .slice(0, 500);
  const token = text.toLowerCase().match(/[0-9a-f]{32}/)?.[0];
  const code = text.toUpperCase().match(/^CD-?([A-Z0-9]{6})$/)?.[1];
  if (!token && !code) return { state: "not_found" };

  try {
    const db = cdDb();
    const lookup = db.from(CD_TABLE).select("*");
    const { data, error } = await (
      token
        ? lookup.eq("ticket_token", token)
        : lookup.eq("ticket_code", `CD-${code}`)
    ).maybeSingle();
    if (error) throw new Error(error.message);

    const registration = data as CdRegistration | null;
    if (!registration) return { state: "not_found" };

    const base = {
      name: registration.full_name,
      code: registration.ticket_code,
      accessibility: registration.accessibility,
    };

    if (registration.status === "refunded")
      return { ...base, state: "refunded" };
    if (registration.status !== "paid") return { ...base, state: "not_paid" };

    const alreadyDetail = (at: string, by: string | null) =>
      `Checked in at ${torontoTime(at)}${by ? ` by ${by}` : ""}.`;

    if (registration.checked_in_at) {
      return {
        ...base,
        state: "already",
        detail: alreadyDetail(
          registration.checked_in_at,
          registration.checked_in_by
        ),
      };
    }

    // Conditional update: if two phones scan the same ticket, only one wins.
    const { data: updated, error: updateError } = await db
      .from(CD_TABLE)
      .update({
        checked_in_at: new Date().toISOString(),
        checked_in_by: admin.email,
      })
      .eq("id", registration.id)
      .eq("status", "paid")
      .is("checked_in_at", null)
      .select("id")
      .maybeSingle();
    if (updateError) throw new Error(updateError.message);

    refresh(registration.ticket_token);
    if (!updated) {
      return {
        ...base,
        state: "already",
        detail: "Checked in a moment ago on another device.",
      };
    }
    return { ...base, state: "checked_in" };
  } catch (error) {
    console.error(
      "Contemplating Death scan failed:",
      error instanceof Error ? error.message : error
    );
    return { state: "error" };
  }
}
