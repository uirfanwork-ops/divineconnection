"use server";

import { createClient } from "@/lib/supabase/server";
import { getAdminUser, isSuperAdmin } from "@/lib/admin";
import type { Json } from "@/types/database";

export async function updateRetreatConfig(key: string, value: string) {
  const admin = await getAdminUser();
  if (!admin) return { error: "Unauthorized" };

  const supabase = await createClient();

  const { error } = await supabase
    .from("retreat_config")
    .update({ value: value as unknown as Json, updated_by: admin.userId })
    .eq("key", key);

  if (error) return { error: error.message };

  await supabase.from("audit_log").insert({
    user_id: admin.userId,
    action: "update_config",
    resource_type: "retreat_config",
    details: { key, value },
  });

  return { success: true };
}

export async function updatePricingTier(
  tierId: string,
  updates: {
    name?: string;
    description?: string;
    price_cents?: number;
    max_spots?: number | null;
    is_active?: boolean;
  }
) {
  const admin = await getAdminUser();
  if (!admin || !isSuperAdmin(admin)) {
    return { error: "Super admin access required" };
  }

  const supabase = await createClient();

  const { error } = await supabase
    .from("pricing_tiers")
    .update(updates)
    .eq("id", tierId);

  if (error) return { error: error.message };

  await supabase.from("audit_log").insert({
    user_id: admin.userId,
    action: "update_pricing_tier",
    resource_type: "pricing_tier",
    resource_id: tierId,
    details: updates as unknown as Record<string, Json>,
  });

  return { success: true };
}

export async function inviteAdmin(email: string, role: "admin" | "super_admin") {
  const admin = await getAdminUser();
  if (!admin || !isSuperAdmin(admin)) {
    return { error: "Super admin access required" };
  }

  await (await createClient()).from("audit_log").insert({
    user_id: admin.userId,
    action: "invite_admin",
    resource_type: "admin_roles",
    details: { invited_email: email, role },
  });

  return {
    success: true,
    message: `To complete the invite: 1) Create a Supabase Auth user for ${email}, 2) Run: INSERT INTO admin_roles (user_id, role, email) VALUES ('<user-uuid>', '${role}', '${email}');`,
  };
}
