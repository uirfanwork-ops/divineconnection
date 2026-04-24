"use server";

import { createServiceClient } from "@/lib/supabase/service";
import { getAdminUser } from "@/lib/admin";
import { sendEmail } from "@/lib/email";
import { paymentConfirmedEmail } from "@/lib/emails/templates";
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
  paymentStatus: PaymentStatus
) {
  const admin = await getAdminUser();
  if (!admin) return { error: "Unauthorized" };

  const supabase = createServiceClient();

  const { data: registration } = await supabase
    .from("registrations")
    .select("email, full_name, confirmation_code, payment_status")
    .eq("id", registrationId)
    .single();

  const { error } = await supabase
    .from("registrations")
    .update(
      paymentStatus === "completed"
        ? { payment_status: paymentStatus, status: "confirmed" as const }
        : { payment_status: paymentStatus }
    )
    .eq("id", registrationId);

  if (error) return { error: error.message };

  // Send confirmation email when payment is marked as completed
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
    details: { new_payment_status: paymentStatus },
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
    "status",
    "payment_status",
    "amount_cents",
    "currency",
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
