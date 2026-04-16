-- =============================================================
-- Storage Bucket Setup for Supabase
-- =============================================================
-- Run this in the Supabase SQL Editor AFTER running schema.sql.
-- This creates the private 'receipts' bucket and its RLS policies.
-- =============================================================

-- 1. Create the receipts bucket (private)
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'receipts',
  'receipts',
  false,
  10485760,  -- 10 MB
  ARRAY['image/jpeg', 'image/png', 'image/webp', 'application/pdf']
);

-- 2. Storage RLS policies: only authenticated admins can access

-- Admin can upload receipts
CREATE POLICY "receipts_admin_insert"
  ON storage.objects FOR INSERT
  WITH CHECK (
    bucket_id = 'receipts'
    AND EXISTS (
      SELECT 1 FROM public.admin_roles
      WHERE admin_roles.user_id = auth.uid()
    )
  );

-- Admin can read receipts
CREATE POLICY "receipts_admin_select"
  ON storage.objects FOR SELECT
  USING (
    bucket_id = 'receipts'
    AND EXISTS (
      SELECT 1 FROM public.admin_roles
      WHERE admin_roles.user_id = auth.uid()
    )
  );

-- Admin can update receipt files
CREATE POLICY "receipts_admin_update"
  ON storage.objects FOR UPDATE
  USING (
    bucket_id = 'receipts'
    AND EXISTS (
      SELECT 1 FROM public.admin_roles
      WHERE admin_roles.user_id = auth.uid()
    )
  )
  WITH CHECK (
    bucket_id = 'receipts'
    AND EXISTS (
      SELECT 1 FROM public.admin_roles
      WHERE admin_roles.user_id = auth.uid()
    )
  );

-- Admin can delete receipt files
CREATE POLICY "receipts_admin_delete"
  ON storage.objects FOR DELETE
  USING (
    bucket_id = 'receipts'
    AND EXISTS (
      SELECT 1 FROM public.admin_roles
      WHERE admin_roles.user_id = auth.uid()
    )
  );
