"use server";

import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { registrationSchema } from "@/lib/validations/registration";
import { createServiceClient } from "@/lib/supabase/service";
import { checkRegistrationRateLimit } from "@/lib/rate-limit";
import { verifyRecaptcha } from "@/lib/recaptcha";
import { sendEmail } from "@/lib/email";
import {
  eTransferConfirmationEmail,
  adminNewRegistrationEmail,
} from "@/lib/emails/templates";

export interface RegistrationActionState {
  success: boolean;
  error?: string;
  fieldErrors?: Record<string, string[]>;
  registrationId?: string;
}

export async function submitRegistration(
  _prevState: RegistrationActionState,
  formData: FormData
): Promise<RegistrationActionState> {
  const headerStore = await headers();
  const ip =
    headerStore.get("x-forwarded-for")?.split(",")[0]?.trim() ??
    headerStore.get("x-real-ip") ??
    "unknown";

  const rateLimit = await checkRegistrationRateLimit(ip);
  if (!rateLimit.success) {
    return {
      success: false,
      error:
        "Too many registration attempts. Please try again in an hour.",
    };
  }

  const rawData = {
    full_name: formData.get("full_name"),
    email: formData.get("email"),
    phone: formData.get("phone"),
    tier_id: formData.get("tier_id"),
    emergency_contact_name: formData.get("emergency_contact_name"),
    emergency_contact_phone: formData.get("emergency_contact_phone"),
    dietary_restrictions: formData.get("dietary_restrictions") || "",
    medical_conditions: formData.get("medical_conditions") || "",
    accept_privacy_policy: formData.get("accept_privacy_policy") === "true",
    accept_terms_of_service:
      formData.get("accept_terms_of_service") === "true",
    accept_refund_policy: formData.get("accept_refund_policy") === "true",
    accept_code_of_conduct:
      formData.get("accept_code_of_conduct") === "true",
    typed_signature: formData.get("typed_signature"),
    recaptcha_token: formData.get("recaptcha_token"),
  };

  const parsed = registrationSchema.safeParse(rawData);
  if (!parsed.success) {
    const fieldErrors: Record<string, string[]> = {};
    for (const issue of parsed.error.issues) {
      const path = issue.path.join(".");
      if (!fieldErrors[path]) {
        fieldErrors[path] = [];
      }
      fieldErrors[path].push(issue.message);
    }
    return {
      success: false,
      error: "Please fix the errors below.",
      fieldErrors,
    };
  }

  const data = parsed.data;

  const recaptchaResult = await verifyRecaptcha(data.recaptcha_token);
  if (!recaptchaResult.success) {
    return {
      success: false,
      error:
        "reCAPTCHA verification failed. Please refresh the page and try again.",
    };
  }

  const supabase = createServiceClient();

  const { data: tier, error: tierError } = await supabase
    .from("pricing_tiers")
    .select("*")
    .eq("id", data.tier_id)
    .single();

  if (tierError || !tier) {
    return {
      success: false,
      error: "Selected pricing tier not found. Please try again.",
    };
  }

  if (!tier.is_active) {
    return {
      success: false,
      error: "Selected pricing tier is no longer available.",
    };
  }

  if (tier.max_spots !== null && tier.spots_taken >= tier.max_spots) {
    return {
      success: false,
      error: "This tier is sold out. Please select a different tier.",
    };
  }

  const { data: registration, error: insertError } = await supabase
    .from("registrations")
    .insert({
      full_name: data.full_name,
      email: data.email,
      phone: data.phone,
      tier_id: data.tier_id,
      status: "pending",
      payment_status: "pending",
      amount_cents: tier.price_cents,
      currency: tier.currency,
      emergency_contact_name: data.emergency_contact_name,
      emergency_contact_phone: data.emergency_contact_phone,
      dietary_restrictions: data.dietary_restrictions || null,
      medical_conditions: data.medical_conditions || null,
      policy_consent_at: new Date().toISOString(),
      typed_signature: data.typed_signature,
      ip_address: ip,
    })
    .select("id")
    .single();

  if (insertError || !registration) {
    console.error("Registration insert failed:", insertError?.message);
    return {
      success: false,
      error: "Failed to create registration. Please try again.",
    };
  }

  const { error: updateError } = await supabase
    .from("pricing_tiers")
    .update({ spots_taken: tier.spots_taken + 1 })
    .eq("id", data.tier_id);

  if (updateError) {
    console.error("Failed to update spots_taken:", updateError.message);
  }

  const regEmailData = {
    id: registration.id,
    full_name: data.full_name,
    email: data.email,
    amount_cents: tier.price_cents,
    currency: tier.currency,
  };

  const confirmation = eTransferConfirmationEmail(regEmailData);
  sendEmail({
    to: data.email,
    subject: confirmation.subject,
    html: confirmation.html,
  }).catch((err) =>
    console.error("Failed to send confirmation email:", err)
  );

  const adminEmail = process.env.ADMIN_NOTIFICATION_EMAIL;
  if (adminEmail) {
    const notification = adminNewRegistrationEmail({
      ...regEmailData,
      phone: data.phone,
      tier_name: tier.name,
    });
    sendEmail({
      to: adminEmail,
      subject: notification.subject,
      html: notification.html,
    }).catch((err) =>
      console.error("Failed to send admin notification:", err)
    );
  }

  redirect(`/register/payment?id=${registration.id}`);
}
