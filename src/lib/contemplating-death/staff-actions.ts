"use server";

import crypto from "crypto";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { sendEmail } from "@/lib/email";
import { cdEvent } from "../../../content/contemplating-death";
import { getCdBaseUrl, getCdEmailFrom } from "./config";
import { cdDb } from "./db";
import {
  STAFF_HOME_PATH,
  STAFF_LINKS_TABLE,
  STAFF_LOGIN_PATH,
  STAFF_TABLE,
  clearStaffSession,
  getCdStaff,
  hashToken,
  isStaffEmail,
  normalizeEmail,
  safeNextPath,
  setStaffSession,
} from "./staff";

const LINK_MINUTES = 20;
const MAX_LINKS_PER_WINDOW = 4;

export interface StaffFormResult {
  ok: boolean;
  message: string;
}

const SENT_MESSAGE =
  "If that email is on the staff list, a sign-in link is on its way. It works for 20 minutes.";

/**
 * Emails a one-time sign-in link. The reply is the same whether or not the
 * email is on the staff list, so the form cannot be used to discover who is.
 */
export async function requestStaffLink(
  emailInput: string,
  nextInput: string
): Promise<StaffFormResult> {
  const email = normalizeEmail(emailInput);
  if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
    return { ok: false, message: "Enter a valid email address." };
  }

  try {
    if (!(await isStaffEmail(email)))
      return { ok: true, message: SENT_MESSAGE };

    const db = cdDb();
    const since = new Date(Date.now() - LINK_MINUTES * 60 * 1000).toISOString();
    const { count, error: countError } = await db
      .from(STAFF_LINKS_TABLE)
      .select("token_hash", { count: "exact", head: true })
      .eq("email", email)
      .gte("created_at", since);
    if (countError) throw new Error(countError.message);
    if ((count ?? 0) >= MAX_LINKS_PER_WINDOW) {
      return { ok: true, message: SENT_MESSAGE };
    }

    const token = crypto.randomBytes(32).toString("hex");
    const { error: insertError } = await db.from(STAFF_LINKS_TABLE).insert({
      token_hash: hashToken(token),
      email,
      expires_at: new Date(Date.now() + LINK_MINUTES * 60 * 1000).toISOString(),
    });
    if (insertError) throw new Error(insertError.message);

    const params = new URLSearchParams({
      token,
      next: safeNextPath(nextInput),
    });
    const link = `${getCdBaseUrl()}${STAFF_LOGIN_PATH}/verify?${params.toString()}`;

    await sendEmail({
      from: getCdEmailFrom(),
      to: email,
      replyTo: cdEvent.contactEmail,
      subject: `Staff sign-in link for ${cdEvent.title}`,
      html: `<!DOCTYPE html><html><body style="margin:0;padding:28px 12px;background:#ece5d5;font-family:Arial,Helvetica,sans-serif;">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0"><tr><td align="center">
<table role="presentation" width="520" cellpadding="0" cellspacing="0" style="max-width:520px;width:100%;background:#f8f5ed;border:1px solid #d8cdb7;border-radius:6px;">
<tr><td style="padding:30px 32px;">
<p style="margin:0 0 8px;color:#805a2a;font-size:11px;letter-spacing:2px;text-transform:uppercase;font-weight:bold;">${cdEvent.title} staff</p>
<h1 style="margin:0 0 14px;color:#24231c;font-family:Georgia,serif;font-size:26px;font-weight:normal;">Your sign-in link</h1>
<p style="margin:0 0 22px;color:#5e594d;font-size:15px;line-height:1.6;">Open this link on the device you will use for the attendee list or the ticket scanner. It works once and expires in ${LINK_MINUTES} minutes.</p>
<p style="margin:0 0 22px;"><a href="${link}" style="display:inline-block;background:#1d1f17;color:#f8f5ed;text-decoration:none;font-size:15px;font-weight:bold;padding:14px 24px;border-radius:3px;">Sign in</a></p>
<p style="margin:0;color:#5e594d;font-size:13px;line-height:1.6;">If you did not ask for this, you can ignore this email.</p>
</td></tr></table></td></tr></table></body></html>`,
    });

    return { ok: true, message: SENT_MESSAGE };
  } catch (error) {
    console.error(
      "Contemplating Death staff link failed:",
      error instanceof Error ? error.message : error
    );
    return {
      ok: false,
      message:
        "We could not send the sign-in link. Please try again in a minute.",
    };
  }
}

/** Uses a sign-in link once and starts the staff session. */
export async function completeStaffSignIn(formData: FormData): Promise<void> {
  const token = String(formData.get("token") ?? "");
  const next = safeNextPath(formData.get("next"));

  let email: string | null = null;
  if (/^[0-9a-f]{64}$/.test(token)) {
    const { data } = await cdDb()
      .from(STAFF_LINKS_TABLE)
      .update({ used_at: new Date().toISOString() })
      .eq("token_hash", hashToken(token))
      .is("used_at", null)
      .gt("expires_at", new Date().toISOString())
      .select("email")
      .maybeSingle();
    const linkEmail = (data as { email?: string } | null)?.email;
    if (linkEmail && (await isStaffEmail(linkEmail))) email = linkEmail;
  }

  if (!email) redirect(`${STAFF_LOGIN_PATH}?error=link`);

  setStaffSession(email);
  redirect(next);
}

export async function signOutStaff(): Promise<void> {
  clearStaffSession();
  redirect(STAFF_LOGIN_PATH);
}

export async function addStaffMember(formData: FormData): Promise<void> {
  const staff = await getCdStaff();
  if (!staff) redirect(STAFF_LOGIN_PATH);

  const email = normalizeEmail(formData.get("email"));
  if (/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
    await cdDb()
      .from(STAFF_TABLE)
      .upsert({ email, added_by: staff.email }, { onConflict: "email" });
  }
  revalidatePath(STAFF_HOME_PATH);
}

export async function removeStaffMember(formData: FormData): Promise<void> {
  const staff = await getCdStaff();
  if (!staff) redirect(STAFF_LOGIN_PATH);

  const email = normalizeEmail(formData.get("email"));
  // Nobody can remove themselves, so the list can never end up empty.
  if (email && email !== staff.email) {
    await cdDb().from(STAFF_TABLE).delete().eq("email", email);
  }
  revalidatePath(STAFF_HOME_PATH);
}
