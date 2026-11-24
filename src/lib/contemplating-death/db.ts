import { createClient } from "@supabase/supabase-js";

export type CdStatus = "pending" | "paid" | "expired" | "refunded";

export interface CdRegistration {
  id: string;
  created_at: string;
  full_name: string;
  email: string;
  phone: string | null;
  source: "social" | "friend" | "masjid" | "other";
  heard_of_mathabah: boolean;
  attended_mathabah: boolean;
  interest: string | null;
  accessibility: string | null;
  wants_updates: boolean;
  status: CdStatus;
  amount_cents: number;
  currency: string;
  stripe_session_id: string | null;
  stripe_payment_intent_id: string | null;
  paid_at: string | null;
  ticket_token: string;
  ticket_code: string;
  ticket_emailed_at: string | null;
  checked_in_at: string | null;
  checked_in_by: string | null;
}

/** Named apart from the older cd_registrations table that already exists in the Mathabah project. */
export const CD_TABLE = "cd_seminar_registrations";

/**
 * Service role client for the event's registrations table.
 * Server only: this bypasses RLS. Never import from a client component.
 *
 * The event's data lives in the Mathabah Supabase project, set with
 * CD_SUPABASE_URL and CD_SUPABASE_SERVICE_ROLE_KEY. Without those it falls
 * back to the project the rest of this app uses.
 */
export function cdDb() {
  const url =
    process.env.CD_SUPABASE_URL ?? process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceKey = process.env.CD_SUPABASE_URL
    ? process.env.CD_SUPABASE_SERVICE_ROLE_KEY
    : process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!url || !serviceKey) {
    throw new Error(
      "Missing CD_SUPABASE_URL and CD_SUPABASE_SERVICE_ROLE_KEY (or the default Supabase variables)"
    );
  }

  return createClient(url, serviceKey, {
    auth: { autoRefreshToken: false, persistSession: false },
  });
}

export const TICKET_TOKEN_PATTERN = /^[0-9a-f]{32}$/;
