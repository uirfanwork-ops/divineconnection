"use server";

import { createServiceClient } from "@/lib/supabase/service";
import { getAdminUser } from "@/lib/admin";
import { processReceiptImage } from "@/lib/anthropic";
import type { ReceiptStatus } from "@/types/database";

export async function uploadReceipt(formData: FormData) {
  const admin = await getAdminUser();
  if (!admin) return { error: "Unauthorized" };

  const file = formData.get("file") as File | null;
  if (!file) return { error: "No file provided" };

  if (file.size > 10 * 1024 * 1024) {
    return { error: "File must be under 10MB" };
  }

  const allowedTypes = [
    "image/jpeg",
    "image/png",
    "image/webp",
    "application/pdf",
  ];
  if (!allowedTypes.includes(file.type)) {
    return { error: "Only JPEG, PNG, WebP, and PDF files are allowed" };
  }

  const supabase = createServiceClient();
  const timestamp = Date.now();
  const safeName = file.name.replace(/[^a-zA-Z0-9._-]/g, "_");
  const storagePath = `${timestamp}-${safeName}`;

  const bytes = await file.arrayBuffer();
  const { error: uploadError } = await supabase.storage
    .from("receipts")
    .upload(storagePath, bytes, {
      contentType: file.type,
      upsert: false,
    });

  if (uploadError) {
    return { error: `Upload failed: ${uploadError.message}` };
  }

  const { data: receipt, error: insertError } = await supabase
    .from("receipts")
    .insert({
      storage_path: storagePath,
      original_filename: file.name,
      file_size_bytes: file.size,
      mime_type: file.type,
      status: "processing" as const,
    })
    .select("id")
    .single();

  if (insertError || !receipt) {
    return { error: "Failed to create receipt record" };
  }

  await supabase.from("audit_log").insert({
    user_id: admin.userId,
    action: "upload_receipt",
    resource_type: "receipt",
    resource_id: receipt.id,
    details: { filename: file.name, size: file.size },
  });

  if (file.type.startsWith("image/")) {
    processReceiptInBackground(
      receipt.id,
      bytes,
      file.type as "image/jpeg" | "image/png" | "image/webp"
    );
  } else {
    await supabase
      .from("receipts")
      .update({ status: "processed" as const })
      .eq("id", receipt.id);
  }

  return { success: true, receiptId: receipt.id };
}

async function processReceiptInBackground(
  receiptId: string,
  imageBytes: ArrayBuffer,
  mediaType: "image/jpeg" | "image/png" | "image/webp"
) {
  try {
    const base64 = Buffer.from(imageBytes).toString("base64");
    const result = await processReceiptImage(base64, mediaType);
    const supabase = createServiceClient();

    await supabase
      .from("receipts")
      .update({
        status: "processed" as const,
        ocr_result: JSON.parse(JSON.stringify(result)),
        amount_cents: result.amount,
        currency: result.currency,
        category: result.category,
        sender_name: result.sender,
        receipt_date: result.date,
        reference_number: result.reference,
      })
      .eq("id", receiptId);
  } catch (err) {
    console.error("OCR processing failed for receipt", receiptId, err);
    const supabase = createServiceClient();
    await supabase
      .from("receipts")
      .update({ status: "processed" as const, admin_notes: "OCR failed" })
      .eq("id", receiptId);
  }
}

export async function updateReceiptStatus(
  receiptId: string,
  status: ReceiptStatus
) {
  const admin = await getAdminUser();
  if (!admin) return { error: "Unauthorized" };

  const supabase = createServiceClient();

  const { error } = await supabase
    .from("receipts")
    .update({
      status,
      reviewed_by: admin.userId,
      reviewed_at: new Date().toISOString(),
    })
    .eq("id", receiptId);

  if (error) return { error: error.message };

  await supabase.from("audit_log").insert({
    user_id: admin.userId,
    action: `receipt_${status}`,
    resource_type: "receipt",
    resource_id: receiptId,
  });

  return { success: true };
}

export async function getReceiptFileUrl(storagePath: string) {
  const admin = await getAdminUser();
  if (!admin) return { error: "Unauthorized" };

  const supabase = createServiceClient();

  const { data, error } = await supabase.storage
    .from("receipts")
    .createSignedUrl(storagePath, 300);

  if (error || !data) {
    return { error: error?.message ?? "Failed to get file URL" };
  }

  return { url: data.signedUrl };
}
