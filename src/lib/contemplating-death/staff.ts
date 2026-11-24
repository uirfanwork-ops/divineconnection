import crypto from "crypto";
import { cookies } from "next/headers";
import { cdDb } from "./db";

export const STAFF_TABLE = "cd_seminar_staff";
export const STAFF_LINKS_TABLE = "cd_seminar_staff_links";
export const STAFF_LOGIN_PATH = "/contemplating-death/staff";
export const STAFF_HOME_PATH = "/event-admin";

const COOKIE_NAME = "cd_staff";
const SESSION_DAYS = 30;

export interface CdStaff {
  email: string;
}

/**
 * Key for signing staff session cookies. Set CD_STAFF_SECRET to use a
 * dedicated secret; otherwise one is derived from the server-only Supabase
 * service role key, so no extra setup is needed.
 */
function signingKey(): Buffer {
  const base =
    process.env.CD_STAFF_SECRET ??
    process.env.CD_SUPABASE_SERVICE_ROLE_KEY ??
    process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!base) throw new Error("No secret available to sign staff sessions");
  return crypto
    .createHmac("sha256", "cd-staff-session-v1")
    .update(base)
    .digest();
}

function sign(payload: string): string {
  return crypto
    .createHmac("sha256", signingKey())
    .update(payload)
    .digest("base64url");
}

export function hashToken(token: string): string {
  return crypto.createHash("sha256").update(token).digest("hex");
}

export function normalizeEmail(value: unknown): string {
  return String(value ?? "")
    .trim()
    .toLowerCase()
    .slice(0, 254);
}

/** Only same-site paths are allowed as a return address after sign-in. */
export function safeNextPath(value: unknown): string {
  const next = String(value ?? "");
  return /^\/(?![/\\])[A-Za-z0-9\-_/]*$/.test(next) ? next : STAFF_HOME_PATH;
}

export async function isStaffEmail(email: string): Promise<boolean> {
  const { data, error } = await cdDb()
    .from(STAFF_TABLE)
    .select("email")
    .eq("email", email)
    .maybeSingle();
  if (error) throw new Error(`Staff lookup failed: ${error.message}`);
  return Boolean(data);
}

export function setStaffSession(email: string): void {
  const expires = Date.now() + SESSION_DAYS * 24 * 60 * 60 * 1000;
  const payload = Buffer.from(
    JSON.stringify({ e: email, x: expires })
  ).toString("base64url");
  cookies().set(COOKIE_NAME, `${payload}.${sign(payload)}`, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: SESSION_DAYS * 24 * 60 * 60,
  });
}

export function clearStaffSession(): void {
  cookies().delete(COOKIE_NAME);
}

/**
 * Returns the signed-in staff member, or null. Checks the cookie signature and
 * expiry, then confirms the email is still on the staff list, so removing
 * someone from the list signs them out everywhere.
 */
export async function getCdStaff(): Promise<CdStaff | null> {
  try {
    const raw = cookies().get(COOKIE_NAME)?.value;
    if (!raw) return null;

    const [payload, signature] = raw.split(".");
    if (!payload || !signature) return null;

    const expected = Buffer.from(sign(payload));
    const given = Buffer.from(signature);
    if (
      expected.length !== given.length ||
      !crypto.timingSafeEqual(expected, given)
    ) {
      return null;
    }

    const parsed = JSON.parse(
      Buffer.from(payload, "base64url").toString("utf8")
    ) as {
      e?: unknown;
      x?: unknown;
    };
    if (typeof parsed.e !== "string" || typeof parsed.x !== "number")
      return null;
    if (parsed.x < Date.now()) return null;

    return (await isStaffEmail(parsed.e)) ? { email: parsed.e } : null;
  } catch {
    return null;
  }
}
