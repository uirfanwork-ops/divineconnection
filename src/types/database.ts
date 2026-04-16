export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export type RegistrationStatus =
  | "pending"
  | "confirmed"
  | "cancelled"
  | "refunded"
  | "waitlisted";

export type PaymentMethod = "stripe" | "e-transfer" | "cash" | "other";

export type PaymentStatus =
  | "pending"
  | "completed"
  | "failed"
  | "refunded"
  | "partially_refunded";

export type ReceiptStatus =
  | "processing"
  | "processed"
  | "approved"
  | "rejected";

export type AdminRole = "admin" | "super_admin";

export interface Database {
  public: {
    Tables: {
      registrations: {
        Row: {
          id: string;
          created_at: string;
          updated_at: string;
          full_name: string;
          email: string;
          phone: string;
          tier_id: string;
          status: RegistrationStatus;
          payment_method: PaymentMethod | null;
          payment_status: PaymentStatus;
          amount_cents: number;
          currency: string;
          stripe_session_id: string | null;
          stripe_payment_intent_id: string | null;
          admin_notes: string | null;
          emergency_contact_name: string | null;
          emergency_contact_phone: string | null;
          dietary_restrictions: string | null;
          medical_conditions: string | null;
          policy_consent_at: string;
          typed_signature: string;
          ip_address: string | null;
        };
        Insert: {
          id?: string;
          created_at?: string;
          updated_at?: string;
          full_name: string;
          email: string;
          phone: string;
          tier_id: string;
          status?: RegistrationStatus;
          payment_method?: PaymentMethod | null;
          payment_status?: PaymentStatus;
          amount_cents: number;
          currency?: string;
          stripe_session_id?: string | null;
          stripe_payment_intent_id?: string | null;
          admin_notes?: string | null;
          emergency_contact_name?: string | null;
          emergency_contact_phone?: string | null;
          dietary_restrictions?: string | null;
          medical_conditions?: string | null;
          policy_consent_at: string;
          typed_signature: string;
          ip_address?: string | null;
        };
        Update: {
          id?: string;
          created_at?: string;
          updated_at?: string;
          full_name?: string;
          email?: string;
          phone?: string;
          tier_id?: string;
          status?: RegistrationStatus;
          payment_method?: PaymentMethod | null;
          payment_status?: PaymentStatus;
          amount_cents?: number;
          currency?: string;
          stripe_session_id?: string | null;
          stripe_payment_intent_id?: string | null;
          admin_notes?: string | null;
          emergency_contact_name?: string | null;
          emergency_contact_phone?: string | null;
          dietary_restrictions?: string | null;
          medical_conditions?: string | null;
          policy_consent_at?: string;
          typed_signature?: string;
          ip_address?: string | null;
        };
      };
      pricing_tiers: {
        Row: {
          id: string;
          created_at: string;
          updated_at: string;
          name: string;
          description: string;
          price_cents: number;
          currency: string;
          max_spots: number | null;
          spots_taken: number;
          is_active: boolean;
          sort_order: number;
          stripe_price_id: string | null;
          features: Json;
        };
        Insert: {
          id?: string;
          created_at?: string;
          updated_at?: string;
          name: string;
          description: string;
          price_cents: number;
          currency?: string;
          max_spots?: number | null;
          spots_taken?: number;
          is_active?: boolean;
          sort_order?: number;
          stripe_price_id?: string | null;
          features?: Json;
        };
        Update: {
          id?: string;
          created_at?: string;
          updated_at?: string;
          name?: string;
          description?: string;
          price_cents?: number;
          currency?: string;
          max_spots?: number | null;
          spots_taken?: number;
          is_active?: boolean;
          sort_order?: number;
          stripe_price_id?: string | null;
          features?: Json;
        };
      };
      payments: {
        Row: {
          id: string;
          created_at: string;
          registration_id: string;
          amount_cents: number;
          currency: string;
          method: PaymentMethod;
          status: PaymentStatus;
          stripe_payment_intent_id: string | null;
          stripe_session_id: string | null;
          receipt_id: string | null;
          metadata: Json | null;
        };
        Insert: {
          id?: string;
          created_at?: string;
          registration_id: string;
          amount_cents: number;
          currency?: string;
          method: PaymentMethod;
          status?: PaymentStatus;
          stripe_payment_intent_id?: string | null;
          stripe_session_id?: string | null;
          receipt_id?: string | null;
          metadata?: Json | null;
        };
        Update: {
          id?: string;
          created_at?: string;
          registration_id?: string;
          amount_cents?: number;
          currency?: string;
          method?: PaymentMethod;
          status?: PaymentStatus;
          stripe_payment_intent_id?: string | null;
          stripe_session_id?: string | null;
          receipt_id?: string | null;
          metadata?: Json | null;
        };
      };
      receipts: {
        Row: {
          id: string;
          created_at: string;
          updated_at: string;
          registration_id: string | null;
          storage_path: string;
          original_filename: string;
          file_size_bytes: number;
          mime_type: string;
          status: ReceiptStatus;
          ocr_result: Json | null;
          amount_cents: number | null;
          currency: string;
          category: string | null;
          sender_name: string | null;
          receipt_date: string | null;
          reference_number: string | null;
          admin_notes: string | null;
          reviewed_by: string | null;
          reviewed_at: string | null;
        };
        Insert: {
          id?: string;
          created_at?: string;
          updated_at?: string;
          registration_id?: string | null;
          storage_path: string;
          original_filename: string;
          file_size_bytes: number;
          mime_type: string;
          status?: ReceiptStatus;
          ocr_result?: Json | null;
          amount_cents?: number | null;
          currency?: string;
          category?: string | null;
          sender_name?: string | null;
          receipt_date?: string | null;
          reference_number?: string | null;
          admin_notes?: string | null;
          reviewed_by?: string | null;
          reviewed_at?: string | null;
        };
        Update: {
          id?: string;
          created_at?: string;
          updated_at?: string;
          registration_id?: string | null;
          storage_path?: string;
          original_filename?: string;
          file_size_bytes?: number;
          mime_type?: string;
          status?: ReceiptStatus;
          ocr_result?: Json | null;
          amount_cents?: number | null;
          currency?: string;
          category?: string | null;
          sender_name?: string | null;
          receipt_date?: string | null;
          reference_number?: string | null;
          admin_notes?: string | null;
          reviewed_by?: string | null;
          reviewed_at?: string | null;
        };
      };
      admin_roles: {
        Row: {
          id: string;
          created_at: string;
          user_id: string;
          role: AdminRole;
          email: string;
          display_name: string | null;
        };
        Insert: {
          id?: string;
          created_at?: string;
          user_id: string;
          role?: AdminRole;
          email: string;
          display_name?: string | null;
        };
        Update: {
          id?: string;
          created_at?: string;
          user_id?: string;
          role?: AdminRole;
          email?: string;
          display_name?: string | null;
        };
      };
      audit_log: {
        Row: {
          id: string;
          created_at: string;
          user_id: string | null;
          action: string;
          resource_type: string;
          resource_id: string | null;
          details: Json | null;
          ip_address: string | null;
        };
        Insert: {
          id?: string;
          created_at?: string;
          user_id?: string | null;
          action: string;
          resource_type: string;
          resource_id?: string | null;
          details?: Json | null;
          ip_address?: string | null;
        };
        Update: {
          id?: string;
          created_at?: string;
          user_id?: string | null;
          action?: string;
          resource_type?: string;
          resource_id?: string | null;
          details?: Json | null;
          ip_address?: string | null;
        };
      };
      retreat_config: {
        Row: {
          id: string;
          key: string;
          value: Json;
          updated_at: string;
          updated_by: string | null;
        };
        Insert: {
          id?: string;
          key: string;
          value: Json;
          updated_at?: string;
          updated_by?: string | null;
        };
        Update: {
          id?: string;
          key?: string;
          value?: Json;
          updated_at?: string;
          updated_by?: string | null;
        };
      };
    };
    Views: Record<string, never>;
    Functions: Record<string, never>;
    Enums: {
      registration_status: RegistrationStatus;
      payment_method: PaymentMethod;
      payment_status: PaymentStatus;
      receipt_status: ReceiptStatus;
      admin_role: AdminRole;
    };
  };
}
