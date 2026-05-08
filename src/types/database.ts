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
          date_of_birth: string | null;
          gender: string | null;
          is_minor: boolean;
          guardian_name: string | null;
          guardian_phone: string | null;
          guardian_email: string | null;
          guardian_signature: string | null;
          tier_id: string | null;
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
          emergency_contact_relationship: string | null;
          dietary_restrictions: string | null;
          medical_conditions: string | null;
          allergies: string | null;
          current_medications: string | null;
          driving_self: boolean;
          seeking_carpool: boolean;
          photo_consent: boolean;
          policy_consent_at: string;
          waiver_accepted_at: string | null;
          conduct_accepted_at: string | null;
          consent_form_accepted_at: string | null;
          typed_signature: string;
          ip_address: string | null;
          confirmation_code: string;
        };
        Insert: {
          id?: string;
          created_at?: string;
          updated_at?: string;
          full_name: string;
          email: string;
          phone: string;
          date_of_birth?: string | null;
          gender?: string | null;
          is_minor?: boolean;
          guardian_name?: string | null;
          guardian_phone?: string | null;
          guardian_email?: string | null;
          guardian_signature?: string | null;
          confirmation_code: string;
          tier_id?: string | null;
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
          emergency_contact_relationship?: string | null;
          dietary_restrictions?: string | null;
          medical_conditions?: string | null;
          allergies?: string | null;
          current_medications?: string | null;
          driving_self?: boolean;
          seeking_carpool?: boolean;
          photo_consent?: boolean;
          policy_consent_at: string;
          waiver_accepted_at?: string | null;
          conduct_accepted_at?: string | null;
          consent_form_accepted_at?: string | null;
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
          date_of_birth?: string | null;
          gender?: string | null;
          is_minor?: boolean;
          guardian_name?: string | null;
          guardian_phone?: string | null;
          guardian_email?: string | null;
          guardian_signature?: string | null;
          tier_id?: string | null;
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
          emergency_contact_relationship?: string | null;
          dietary_restrictions?: string | null;
          medical_conditions?: string | null;
          allergies?: string | null;
          current_medications?: string | null;
          driving_self?: boolean;
          seeking_carpool?: boolean;
          photo_consent?: boolean;
          policy_consent_at?: string;
          waiver_accepted_at?: string | null;
          conduct_accepted_at?: string | null;
          consent_form_accepted_at?: string | null;
          typed_signature?: string;
          ip_address?: string | null;
          confirmation_code?: string;
        };
        Relationships: [
          {
            foreignKeyName: "registrations_tier_id_fkey";
            columns: ["tier_id"];
            isOneToOne: false;
            referencedRelation: "pricing_tiers";
            referencedColumns: ["id"];
          },
        ];
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
        Relationships: [];
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
        Relationships: [
          {
            foreignKeyName: "payments_registration_id_fkey";
            columns: ["registration_id"];
            isOneToOne: false;
            referencedRelation: "registrations";
            referencedColumns: ["id"];
          },
        ];
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
        Relationships: [
          {
            foreignKeyName: "receipts_registration_id_fkey";
            columns: ["registration_id"];
            isOneToOne: false;
            referencedRelation: "registrations";
            referencedColumns: ["id"];
          },
        ];
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
        Relationships: [];
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
        Relationships: [];
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
        Relationships: [];
      };
      site_visits: {
        Row: {
          id: string;
          visitor_id: string;
          visited_at: string;
        };
        Insert: {
          id?: string;
          visitor_id: string;
          visited_at?: string;
        };
        Update: {
          id?: string;
          visitor_id?: string;
          visited_at?: string;
        };
        Relationships: [];
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      registration_status: RegistrationStatus;
      payment_method: PaymentMethod;
      payment_status: PaymentStatus;
      receipt_status: ReceiptStatus;
      admin_role: AdminRole;
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
}
