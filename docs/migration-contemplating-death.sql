-- ============================================================
-- Contemplating Death (January 16, 2027) registrations
-- Runs in the Mathabah Supabase project (CD_SUPABASE_URL). The table is
-- named cd_seminar_registrations so it does not collide with the older
-- cd_registrations table from the first version of the site.
--
-- Security model: RLS is enabled with NO policies, so the anon
-- and authenticated roles cannot read or write this table at
-- all. Only server code using the service role key touches it
-- (checkout action, Stripe webhook, admin pages).
-- ============================================================

CREATE TABLE cd_seminar_registrations (
  id                        UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at                TIMESTAMPTZ NOT NULL DEFAULT now(),

  -- Attendee
  full_name                 TEXT NOT NULL CHECK (char_length(full_name) BETWEEN 2 AND 120),
  email                     TEXT NOT NULL CHECK (char_length(email) <= 254),
  phone                     TEXT CHECK (phone IS NULL OR char_length(phone) <= 40),

  -- Event questions
  source                    TEXT NOT NULL CHECK (source IN ('social', 'friend', 'masjid', 'other')),
  heard_of_mathabah         BOOLEAN NOT NULL,
  attended_mathabah         BOOLEAN NOT NULL,
  interest                  TEXT CHECK (interest IS NULL OR char_length(interest) <= 1000),
  accessibility             TEXT CHECK (accessibility IS NULL OR char_length(accessibility) <= 1000),
  wants_updates             BOOLEAN NOT NULL,

  -- Payment
  status                    TEXT NOT NULL DEFAULT 'pending'
                              CHECK (status IN ('pending', 'paid', 'expired', 'refunded')),
  amount_cents              INTEGER NOT NULL CHECK (amount_cents >= 0),
  currency                  TEXT NOT NULL DEFAULT 'CAD',
  stripe_session_id         TEXT UNIQUE,
  stripe_payment_intent_id  TEXT,
  paid_at                   TIMESTAMPTZ,

  -- Ticket
  ticket_token              TEXT NOT NULL UNIQUE,
  ticket_code               TEXT NOT NULL UNIQUE,
  ticket_emailed_at         TIMESTAMPTZ,

  -- Door check-in
  checked_in_at             TIMESTAMPTZ,
  checked_in_by             TEXT
);

CREATE INDEX IF NOT EXISTS cd_seminar_registrations_status_idx
  ON cd_seminar_registrations (status);
CREATE INDEX IF NOT EXISTS cd_seminar_registrations_email_idx
  ON cd_seminar_registrations (lower(email));
CREATE INDEX IF NOT EXISTS cd_seminar_registrations_payment_intent_idx
  ON cd_seminar_registrations (stripe_payment_intent_id);

ALTER TABLE cd_seminar_registrations ENABLE ROW LEVEL SECURITY;
REVOKE ALL ON cd_seminar_registrations FROM anon, authenticated;
-- Intentionally no policies. See the security model note above.
