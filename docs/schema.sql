-- =============================================================
-- Divine Connections: Servants of Allah
-- Database Schema for Supabase (PostgreSQL)
-- =============================================================
-- Run this file in the Supabase SQL Editor to set up all tables,
-- enums, RLS policies, indexes, triggers, and functions.
-- =============================================================

-- -----------------------------------------------
-- 0. Extensions
-- -----------------------------------------------
CREATE EXTENSION IF NOT EXISTS "pg_trgm";
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- -----------------------------------------------
-- 1. Custom ENUM types
-- -----------------------------------------------
CREATE TYPE registration_status AS ENUM (
  'pending',
  'confirmed',
  'cancelled',
  'refunded',
  'waitlisted'
);

CREATE TYPE payment_method AS ENUM (
  'stripe',
  'e-transfer',
  'cash',
  'other'
);

CREATE TYPE payment_status AS ENUM (
  'pending',
  'completed',
  'failed',
  'refunded',
  'partially_refunded'
);

CREATE TYPE receipt_status AS ENUM (
  'processing',
  'processed',
  'approved',
  'rejected'
);

CREATE TYPE admin_role AS ENUM (
  'admin',
  'super_admin'
);

-- -----------------------------------------------
-- 2. Tables
-- -----------------------------------------------

-- 2a. Pricing Tiers
CREATE TABLE pricing_tiers (
  id            UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  created_at    TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at    TIMESTAMPTZ NOT NULL DEFAULT now(),
  name          TEXT NOT NULL,
  description   TEXT NOT NULL DEFAULT '',
  price_cents   INTEGER NOT NULL CHECK (price_cents >= 0),
  currency      TEXT NOT NULL DEFAULT 'CAD',
  max_spots     INTEGER,
  spots_taken   INTEGER NOT NULL DEFAULT 0 CHECK (spots_taken >= 0),
  is_active     BOOLEAN NOT NULL DEFAULT true,
  sort_order    INTEGER NOT NULL DEFAULT 0,
  stripe_price_id TEXT,
  features      JSONB NOT NULL DEFAULT '[]'::JSONB
);

-- 2b. Registrations
CREATE TABLE registrations (
  id                              UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  created_at                      TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at                      TIMESTAMPTZ NOT NULL DEFAULT now(),
  full_name                       TEXT NOT NULL,
  email                           TEXT NOT NULL,
  phone                           TEXT NOT NULL,
  date_of_birth                   DATE,
  gender                          TEXT,
  is_minor                        BOOLEAN NOT NULL DEFAULT false,
  guardian_name                   TEXT,
  guardian_phone                  TEXT,
  guardian_email                  TEXT,
  guardian_signature              TEXT,
  tier_id                         UUID NOT NULL REFERENCES pricing_tiers(id),
  status                          registration_status NOT NULL DEFAULT 'pending',
  payment_method                  payment_method,
  payment_status                  payment_status NOT NULL DEFAULT 'pending',
  amount_cents                    INTEGER NOT NULL CHECK (amount_cents >= 0),
  currency                        TEXT NOT NULL DEFAULT 'CAD',
  stripe_session_id               TEXT,
  stripe_payment_intent_id        TEXT,
  admin_notes                     TEXT,
  emergency_contact_name          TEXT,
  emergency_contact_phone         TEXT,
  emergency_contact_relationship  TEXT,
  dietary_restrictions            TEXT,
  medical_conditions              TEXT,
  allergies                       TEXT,
  current_medications             TEXT,
  driving_self                    BOOLEAN NOT NULL DEFAULT false,
  seeking_carpool                 BOOLEAN NOT NULL DEFAULT false,
  photo_consent                   BOOLEAN NOT NULL DEFAULT false,
  policy_consent_at               TIMESTAMPTZ NOT NULL,
  waiver_accepted_at              TIMESTAMPTZ,
  conduct_accepted_at             TIMESTAMPTZ,
  consent_form_accepted_at        TIMESTAMPTZ,
  typed_signature                 TEXT NOT NULL,
  ip_address                      INET
);

-- 2c. Payments
CREATE TABLE payments (
  id                       UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  created_at               TIMESTAMPTZ NOT NULL DEFAULT now(),
  registration_id          UUID NOT NULL REFERENCES registrations(id) ON DELETE CASCADE,
  amount_cents             INTEGER NOT NULL CHECK (amount_cents >= 0),
  currency                 TEXT NOT NULL DEFAULT 'CAD',
  method                   payment_method NOT NULL,
  status                   payment_status NOT NULL DEFAULT 'pending',
  stripe_payment_intent_id TEXT,
  stripe_session_id        TEXT,
  receipt_id               UUID,
  metadata                 JSONB
);

-- 2d. Receipts
CREATE TABLE receipts (
  id                UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  created_at        TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at        TIMESTAMPTZ NOT NULL DEFAULT now(),
  registration_id   UUID REFERENCES registrations(id) ON DELETE SET NULL,
  storage_path      TEXT NOT NULL,
  original_filename TEXT NOT NULL,
  file_size_bytes   INTEGER NOT NULL CHECK (file_size_bytes > 0),
  mime_type         TEXT NOT NULL,
  status            receipt_status NOT NULL DEFAULT 'processing',
  ocr_result        JSONB,
  amount_cents      INTEGER,
  currency          TEXT NOT NULL DEFAULT 'CAD',
  category          TEXT,
  sender_name       TEXT,
  receipt_date      DATE,
  reference_number  TEXT,
  admin_notes       TEXT,
  reviewed_by       UUID REFERENCES auth.users(id),
  reviewed_at       TIMESTAMPTZ
);

-- 2e. Admin Roles
CREATE TABLE admin_roles (
  id            UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  created_at    TIMESTAMPTZ NOT NULL DEFAULT now(),
  user_id       UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  role          admin_role NOT NULL DEFAULT 'admin',
  email         TEXT NOT NULL,
  display_name  TEXT,
  UNIQUE(user_id)
);

-- 2f. Audit Log
CREATE TABLE audit_log (
  id            UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  created_at    TIMESTAMPTZ NOT NULL DEFAULT now(),
  user_id       UUID REFERENCES auth.users(id),
  action        TEXT NOT NULL,
  resource_type TEXT NOT NULL,
  resource_id   UUID,
  details       JSONB,
  ip_address    INET
);

-- 2g. Retreat Config (key-value settings)
CREATE TABLE retreat_config (
  id          UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  key         TEXT NOT NULL UNIQUE,
  value       JSONB NOT NULL,
  updated_at  TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_by  UUID REFERENCES auth.users(id)
);

-- -----------------------------------------------
-- 3. Indexes
-- -----------------------------------------------

-- Registrations search (pg_trgm for fuzzy search)
CREATE INDEX idx_registrations_email ON registrations (email);
CREATE INDEX idx_registrations_status ON registrations (status);
CREATE INDEX idx_registrations_payment_status ON registrations (payment_status);
CREATE INDEX idx_registrations_tier_id ON registrations (tier_id);
CREATE INDEX idx_registrations_created_at ON registrations (created_at DESC);
CREATE INDEX idx_registrations_full_name_trgm ON registrations USING gin (full_name gin_trgm_ops);
CREATE INDEX idx_registrations_email_trgm ON registrations USING gin (email gin_trgm_ops);
CREATE INDEX idx_registrations_phone_trgm ON registrations USING gin (phone gin_trgm_ops);

-- Payments
CREATE INDEX idx_payments_registration_id ON payments (registration_id);
CREATE INDEX idx_payments_status ON payments (status);
CREATE INDEX idx_payments_stripe_session ON payments (stripe_session_id);
CREATE INDEX idx_payments_stripe_intent ON payments (stripe_payment_intent_id);

-- Receipts
CREATE INDEX idx_receipts_registration_id ON receipts (registration_id);
CREATE INDEX idx_receipts_status ON receipts (status);
CREATE INDEX idx_receipts_created_at ON receipts (created_at DESC);

-- Audit Log
CREATE INDEX idx_audit_log_created_at ON audit_log (created_at DESC);
CREATE INDEX idx_audit_log_resource ON audit_log (resource_type, resource_id);
CREATE INDEX idx_audit_log_user_id ON audit_log (user_id);

-- Admin Roles
CREATE INDEX idx_admin_roles_user_id ON admin_roles (user_id);

-- Retreat Config
CREATE INDEX idx_retreat_config_key ON retreat_config (key);

-- -----------------------------------------------
-- 4. Updated_at trigger function
-- -----------------------------------------------
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trg_registrations_updated_at
  BEFORE UPDATE ON registrations
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER trg_pricing_tiers_updated_at
  BEFORE UPDATE ON pricing_tiers
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER trg_receipts_updated_at
  BEFORE UPDATE ON receipts
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER trg_retreat_config_updated_at
  BEFORE UPDATE ON retreat_config
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- -----------------------------------------------
-- 5. Row Level Security (RLS)
-- -----------------------------------------------

-- Enable RLS on all tables
ALTER TABLE pricing_tiers ENABLE ROW LEVEL SECURITY;
ALTER TABLE registrations ENABLE ROW LEVEL SECURITY;
ALTER TABLE payments ENABLE ROW LEVEL SECURITY;
ALTER TABLE receipts ENABLE ROW LEVEL SECURITY;
ALTER TABLE admin_roles ENABLE ROW LEVEL SECURITY;
ALTER TABLE audit_log ENABLE ROW LEVEL SECURITY;
ALTER TABLE retreat_config ENABLE ROW LEVEL SECURITY;

-- 5a. Pricing Tiers: anyone can read active tiers, only admins can write
CREATE POLICY "pricing_tiers_select_active"
  ON pricing_tiers FOR SELECT
  USING (is_active = true);

CREATE POLICY "pricing_tiers_admin_all"
  ON pricing_tiers FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM admin_roles
      WHERE admin_roles.user_id = auth.uid()
    )
  )
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM admin_roles
      WHERE admin_roles.user_id = auth.uid()
    )
  );

-- 5b. Registrations: only admins can read/write
CREATE POLICY "registrations_admin_all"
  ON registrations FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM admin_roles
      WHERE admin_roles.user_id = auth.uid()
    )
  )
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM admin_roles
      WHERE admin_roles.user_id = auth.uid()
    )
  );

-- 5c. Payments: only admins can read/write
CREATE POLICY "payments_admin_all"
  ON payments FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM admin_roles
      WHERE admin_roles.user_id = auth.uid()
    )
  )
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM admin_roles
      WHERE admin_roles.user_id = auth.uid()
    )
  );

-- 5d. Receipts: only admins can read/write
CREATE POLICY "receipts_admin_all"
  ON receipts FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM admin_roles
      WHERE admin_roles.user_id = auth.uid()
    )
  )
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM admin_roles
      WHERE admin_roles.user_id = auth.uid()
    )
  );

-- 5e. Admin Roles: only admins can read, only super_admins can write
CREATE POLICY "admin_roles_admin_select"
  ON admin_roles FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM admin_roles ar
      WHERE ar.user_id = auth.uid()
    )
  );

CREATE POLICY "admin_roles_super_admin_write"
  ON admin_roles FOR INSERT
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM admin_roles ar
      WHERE ar.user_id = auth.uid()
        AND ar.role = 'super_admin'
    )
  );

CREATE POLICY "admin_roles_super_admin_update"
  ON admin_roles FOR UPDATE
  USING (
    EXISTS (
      SELECT 1 FROM admin_roles ar
      WHERE ar.user_id = auth.uid()
        AND ar.role = 'super_admin'
    )
  )
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM admin_roles ar
      WHERE ar.user_id = auth.uid()
        AND ar.role = 'super_admin'
    )
  );

CREATE POLICY "admin_roles_super_admin_delete"
  ON admin_roles FOR DELETE
  USING (
    EXISTS (
      SELECT 1 FROM admin_roles ar
      WHERE ar.user_id = auth.uid()
        AND ar.role = 'super_admin'
    )
  );

-- 5f. Audit Log: only admins can read, inserts allowed for admins
CREATE POLICY "audit_log_admin_select"
  ON audit_log FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM admin_roles
      WHERE admin_roles.user_id = auth.uid()
    )
  );

CREATE POLICY "audit_log_admin_insert"
  ON audit_log FOR INSERT
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM admin_roles
      WHERE admin_roles.user_id = auth.uid()
    )
  );

-- 5g. Retreat Config: anyone can read, only admins can write
CREATE POLICY "retreat_config_select"
  ON retreat_config FOR SELECT
  USING (true);

CREATE POLICY "retreat_config_admin_write"
  ON retreat_config FOR INSERT
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM admin_roles
      WHERE admin_roles.user_id = auth.uid()
    )
  );

CREATE POLICY "retreat_config_admin_update"
  ON retreat_config FOR UPDATE
  USING (
    EXISTS (
      SELECT 1 FROM admin_roles
      WHERE admin_roles.user_id = auth.uid()
    )
  )
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM admin_roles
      WHERE admin_roles.user_id = auth.uid()
    )
  );

CREATE POLICY "retreat_config_admin_delete"
  ON retreat_config FOR DELETE
  USING (
    EXISTS (
      SELECT 1 FROM admin_roles
      WHERE admin_roles.user_id = auth.uid()
    )
  );

-- -----------------------------------------------
-- 6. Seed Data: Default retreat config
-- -----------------------------------------------
INSERT INTO retreat_config (key, value) VALUES
  ('e_transfer_email', '"finance@mathabah.org"'),
  ('e_transfer_instructions', '"Please send your Interac e-Transfer to finance@mathabah.org. Include your full name and registration ID in the message field. Your registration will be confirmed once we verify receipt of payment."'),
  ('retreat_name', '"Divine Connections: Servants of Allah"'),
  ('retreat_date_start', '"2026-07-31"'),
  ('retreat_date_end', '"2026-08-03"'),
  ('retreat_location', '"Mansfield Outdoor Centre, 937365 Airport Rd, Mulmur, ON L9V 3T6"'),
  ('max_attendees', '150'),
  ('registration_open', 'true'),
  ('waitlist_enabled', 'false');

-- -----------------------------------------------
-- 7. Seed Data: Default pricing tiers
-- -----------------------------------------------
INSERT INTO pricing_tiers (name, description, price_cents, currency, max_spots, sort_order, features) VALUES
  (
    'Early Bird',
    'Early bird registrations receive a FREE PRINT poster of the Ibaadur Rahman verses (limited time offer!).',
    47500,
    'CAD',
    NULL,
    1,
    '["FREE Ibaadur Rahman verses print poster", "Shared dormitory accommodation (4-6 per room)", "All halal meals included", "Full access to lectures and workshops", "Welcome package", "Prayer facilities", "Outdoor activities", "Post-retreat digital resources"]'::JSONB
  ),
  (
    'Regular',
    'Standard registration for the Divine Connections retreat. Full access to all sessions, meals, and activities.',
    55000,
    'CAD',
    NULL,
    2,
    '["Shared dormitory accommodation (4-6 per room)", "All halal meals included", "Full access to lectures and workshops", "Welcome package", "Prayer facilities", "Outdoor activities", "Post-retreat digital resources"]'::JSONB
  );

-- -----------------------------------------------
-- 8. Helper: Create first super_admin
-- -----------------------------------------------
-- After creating a Supabase Auth user for your admin, run:
--
--   INSERT INTO admin_roles (user_id, role, email, display_name)
--   VALUES ('<auth-user-uuid>', 'super_admin', 'admin@divineconnections.ca', 'Admin');
--
-- Replace <auth-user-uuid> with the user's ID from auth.users.
