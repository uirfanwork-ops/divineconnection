"use server";

import { createServiceClient } from "@/lib/supabase/service";
import { getAdminUser } from "@/lib/admin";
import { sendEmail } from "@/lib/email";
import { paymentConfirmedEmail, paymentReminderEmail } from "@/lib/emails/templates";
import type { RegistrationStatus, PaymentStatus } from "@/types/database";

export async function updateRegistrationStatus(
  registrationId: string,
  status: RegistrationStatus
) {
  const admin = await getAdminUser();
  if (!admin) return { error: "Unauthorized" };

  const supabase = createServiceClient();

  const { error } = await supabase
    .from("registrations")
    .update({ status })
    .eq("id", registrationId);

  if (error) return { error: error.message };

  await supabase.from("audit_log").insert({
    user_id: admin.userId,
    action: "update_status",
    resource_type: "registration",
    resource_id: registrationId,
    details: { new_status: status },
  });

  return { success: true };
}

export async function updatePaymentStatus(
  registrationId: string,
  paymentStatus: PaymentStatus,
  paymentDetails?: { payment_received_date: string; amount_deposited: number },
  statusOverride?: RegistrationStatus
) {
  const admin = await getAdminUser();
  if (!admin) return { error: "Unauthorized" };

  const supabase = createServiceClient();

  const { data: registration } = await supabase
    .from("registrations")
    .select("email, full_name, confirmation_code, payment_status")
    .eq("id", registrationId)
    .single();

  let adminNotes: string | undefined;
  if (paymentStatus === "completed" && paymentDetails) {
    adminNotes = [
      `Payment confirmed by admin on ${new Date().toLocaleDateString()}`,
      `E-Transfer received: ${paymentDetails.payment_received_date}`,
      `Amount deposited: $${(paymentDetails.amount_deposited / 100).toFixed(2)}`,
    ].join("\n");
  }

  const updateData =
    paymentStatus === "completed"
      ? {
          payment_status: paymentStatus,
          status: (statusOverride ?? "confirmed") as RegistrationStatus,
          ...(adminNotes ? { admin_notes: adminNotes } : {}),
          ...(paymentDetails ? { amount_cents: paymentDetails.amount_deposited } : {}),
        }
      : {
          payment_status: paymentStatus,
          ...(statusOverride ? { status: statusOverride } : {}),
        };

  const { error } = await supabase
    .from("registrations")
    .update(updateData)
    .eq("id", registrationId);

  if (error) return { error: error.message };

  if (
    paymentStatus === "completed" &&
    registration &&
    registration.payment_status !== "completed"
  ) {
    sendEmail({
      to: registration.email,
      ...paymentConfirmedEmail({
        full_name: registration.full_name,
        confirmation_code: registration.confirmation_code,
      }),
    }).catch((err) => console.error("Failed to send payment confirmation email:", err));
  }

  await supabase.from("audit_log").insert({
    user_id: admin.userId,
    action: "update_payment_status",
    resource_type: "registration",
    resource_id: registrationId,
    details: {
      new_payment_status: paymentStatus,
      registrant_name: registration?.full_name,
      registrant_email: registration?.email,
      ...(paymentDetails ? {
        payment_received_date: paymentDetails.payment_received_date,
        amount_deposited_cents: paymentDetails.amount_deposited,
      } : {}),
    },
  });

  return { success: true };
}

export async function deleteRegistration(registrationId: string) {
  const admin = await getAdminUser();
  if (!admin) return { error: "Unauthorized" };

  const supabase = createServiceClient();

  const { data: registration } = await supabase
    .from("registrations")
    .select("full_name, email, confirmation_code")
    .eq("id", registrationId)
    .single();

  const { error } = await supabase
    .from("registrations")
    .delete()
    .eq("id", registrationId);

  if (error) return { error: error.message };

  await supabase.from("audit_log").insert({
    user_id: admin.userId,
    action: "delete_registration",
    resource_type: "registration",
    resource_id: registrationId,
    details: {
      deleted_name: registration?.full_name,
      deleted_email: registration?.email,
      deleted_code: registration?.confirmation_code,
    },
  });

  return { success: true };
}

export interface RegistrationUpdateData {
  full_name: string;
  email: string;
  phone: string;
  date_of_birth: string;
  gender: string;
  emergency_contact_name: string;
  emergency_contact_relationship: string;
  emergency_contact_phone: string;
  allergies: string;
  medical_conditions: string;
  current_medications: string;
  dietary_restrictions: string;
  driving_self: boolean;
  seeking_carpool: boolean;
  photo_consent: boolean;
  admin_notes: string;
}

export async function updateRegistrationDetails(
  registrationId: string,
  data: RegistrationUpdateData
) {
  const admin = await getAdminUser();
  if (!admin) return { error: "Unauthorized" };

  const supabase = createServiceClient();

  const { error } = await supabase
    .from("registrations")
    .update({
      full_name: data.full_name,
      email: data.email,
      phone: data.phone,
      date_of_birth: data.date_of_birth || null,
      gender: data.gender || null,
      emergency_contact_name: data.emergency_contact_name || null,
      emergency_contact_relationship: data.emergency_contact_relationship || null,
      emergency_contact_phone: data.emergency_contact_phone || null,
      allergies: data.allergies || null,
      medical_conditions: data.medical_conditions || null,
      current_medications: data.current_medications || null,
      dietary_restrictions: data.dietary_restrictions || null,
      driving_self: data.driving_self,
      seeking_carpool: data.seeking_carpool,
      photo_consent: data.photo_consent,
      admin_notes: data.admin_notes.trim() || null,
    })
    .eq("id", registrationId);

  if (error) return { error: error.message };

  await supabase.from("audit_log").insert({
    user_id: admin.userId,
    action: "update_registration",
    resource_type: "registration",
    resource_id: registrationId,
    details: { updated_fields: Object.keys(data) },
  });

  return { success: true };
}

export async function exportRegistrationsCsv(): Promise<string> {
  const admin = await getAdminUser();
  if (!admin) return "";

  const supabase = createServiceClient();

  const { data } = await supabase
    .from("registrations")
    .select("*")
    .order("created_at", { ascending: false });

  if (!data || data.length === 0) return "";

  const headers = [
    "confirmation_code",
    "full_name",
    "email",
    "phone",
    "date_of_birth",
    "gender",
    "status",
    "payment_status",
    "amount_cents",
    "currency",
    "emergency_contact_name",
    "emergency_contact_relationship",
    "emergency_contact_phone",
    "allergies",
    "medical_conditions",
    "current_medications",
    "dietary_restrictions",
    "driving_self",
    "seeking_carpool",
    "photo_consent",
    "admin_notes",
    "created_at",
  ];

  const csvRows = [headers.join(",")];
  for (const row of data) {
    csvRows.push(
      headers
        .map((h) => {
          const val = row[h as keyof typeof row];
          const str = val === null || val === undefined ? "" : String(val);
          return `"${str.replace(/"/g, '""')}"`;
        })
        .join(",")
    );
  }

  return csvRows.join("\n");
}

export async function sendPaymentReminder(registrationId: string) {
  const admin = await getAdminUser();
  if (!admin) return { error: "Unauthorized" };

  const supabase = createServiceClient();

  const { data: registration } = await supabase
    .from("registrations")
    .select("email, full_name, confirmation_code, amount_cents, currency, payment_status")
    .eq("id", registrationId)
    .single();

  if (!registration) return { error: "Registration not found" };
  if (registration.payment_status === "completed") return { error: "Already paid" };

  try {
    await sendEmail({
      to: registration.email,
      ...paymentReminderEmail({
        full_name: registration.full_name,
        confirmation_code: registration.confirmation_code,
        amount_cents: registration.amount_cents,
        currency: registration.currency,
      }),
    });
  } catch {
    return { error: "Failed to send email" };
  }

  await supabase.from("audit_log").insert({
    user_id: admin.userId,
    action: "send_payment_reminder",
    resource_type: "registration",
    resource_id: registrationId,
    details: {
      registrant_name: registration.full_name,
      registrant_email: registration.email,
    },
  });

  return { success: true };
}
