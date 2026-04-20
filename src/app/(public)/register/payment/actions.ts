"use server";

import { redirect } from "next/navigation";
import { createServiceClient } from "@/lib/supabase/service";

export interface ConfirmETransferState {
  success: boolean;
  error?: string;
}

export async function confirmETransferPromise(
  registrationId: string
): Promise<ConfirmETransferState> {
  if (!registrationId || typeof registrationId !== "string") {
    return { success: false, error: "Invalid registration ID" };
  }

  const uuidRegex =
    /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
  if (!uuidRegex.test(registrationId)) {
    return { success: false, error: "Invalid registration ID format" };
  }

  const supabase = createServiceClient();

  const { data: registration, error: fetchError } = await supabase
    .from("registrations")
    .select("*")
    .eq("id", registrationId)
    .single();

  if (fetchError || !registration) {
    return {
      success: false,
      error: "Registration not found. Please contact support.",
    };
  }

  const existingNote = registration.admin_notes ?? "";
  const promiseTag = "[e-transfer: promise_to_pay]";
  const nextNote = existingNote.includes(promiseTag)
    ? existingNote
    : `${existingNote}${existingNote ? "\n" : ""}${promiseTag} ${new Date().toISOString()}`;

  const { error: updateError } = await supabase
    .from("registrations")
    .update({
      payment_method: "e-transfer",
      admin_notes: nextNote,
    })
    .eq("id", registrationId);

  if (updateError) {
    console.error(
      "Failed to mark e-transfer promise:",
      updateError.message
    );
    return {
      success: false,
      error: "Failed to record your selection. Please try again.",
    };
  }

  redirect(`/register/thank-you?id=${registrationId}&method=e-transfer`);
}
