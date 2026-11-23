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
