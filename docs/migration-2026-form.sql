-- =============================================================
-- Migration: 2026 Registration Form Fields
-- =============================================================
-- Run this AFTER docs/schema.sql to add new columns for the
-- 2026 registration form (July 31 - Aug 3, 2026 retreat).
-- Safe to run multiple times (idempotent).
-- =============================================================

-- Participant details
ALTER TABLE registrations ADD COLUMN IF NOT EXISTS date_of_birth DATE;
ALTER TABLE registrations ADD COLUMN IF NOT EXISTS gender TEXT;
ALTER TABLE registrations ADD COLUMN IF NOT EXISTS is_minor BOOLEAN NOT NULL DEFAULT false;

-- Parent/Guardian info (for minors)
ALTER TABLE registrations ADD COLUMN IF NOT EXISTS guardian_name TEXT;
ALTER TABLE registrations ADD COLUMN IF NOT EXISTS guardian_phone TEXT;
ALTER TABLE registrations ADD COLUMN IF NOT EXISTS guardian_email TEXT;

-- Emergency contact
ALTER TABLE registrations ADD COLUMN IF NOT EXISTS emergency_contact_relationship TEXT;

-- Medical details
ALTER TABLE registrations ADD COLUMN IF NOT EXISTS allergies TEXT;
ALTER TABLE registrations ADD COLUMN IF NOT EXISTS current_medications TEXT;

-- Transportation
ALTER TABLE registrations ADD COLUMN IF NOT EXISTS driving_self BOOLEAN NOT NULL DEFAULT false;
ALTER TABLE registrations ADD COLUMN IF NOT EXISTS seeking_carpool BOOLEAN NOT NULL DEFAULT false;

-- Photo/Media consent
ALTER TABLE registrations ADD COLUMN IF NOT EXISTS photo_consent BOOLEAN NOT NULL DEFAULT false;

-- Document acceptance timestamps
ALTER TABLE registrations ADD COLUMN IF NOT EXISTS waiver_accepted_at TIMESTAMPTZ;
ALTER TABLE registrations ADD COLUMN IF NOT EXISTS conduct_accepted_at TIMESTAMPTZ;
ALTER TABLE registrations ADD COLUMN IF NOT EXISTS consent_form_accepted_at TIMESTAMPTZ;

-- Guardian signature (for minors)
ALTER TABLE registrations ADD COLUMN IF NOT EXISTS guardian_signature TEXT;

-- Useful index for searching minors
CREATE INDEX IF NOT EXISTS idx_registrations_is_minor ON registrations (is_minor);
