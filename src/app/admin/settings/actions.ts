"use server";

import { createServiceClient } from "@/lib/supabase/service";
import { getAdminUser, isSuperAdmin } from "@/lib/admin";
import type { Json, AdminRole } from "@/types/database";

export async function updateRetreatConfig(key: string, value: string) {
  const admin = await getAdminUser();
  if (!admin) return { error: "Unauthorized" };

  const supabase = createServiceClient();

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
    return { error: "Admin access required" };
  }

  const supabase = createServiceClient();

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

export async function createUserAccount(
  email: string,
  password: string,
  displayName: string,
  role: AdminRole
) {
  const admin = await getAdminUser();
  if (!admin || !isSuperAdmin(admin)) {
    return { error: "Admin access required" };
  }

  if (!email || !password || password.length < 6) {
    return { error: "Email and password (min 6 chars) are required" };
  }

  const supabase = createServiceClient();

  // Create auth user via Supabase Admin API
  const { data: newUser, error: createError } =
    await supabase.auth.admin.createUser({
      email,
      password,
      email_confirm: true,
    });

  if (createError || !newUser.user) {
    return { error: createError?.message ?? "Failed to create user" };
  }

  // Insert admin_roles record
  const { error: roleError } = await supabase.from("admin_roles").insert({
    user_id: newUser.user.id,
    role,
    email,
    display_name: displayName || null,
  });

  if (roleError) {
    return { error: `User created but role assignment failed: ${roleError.message}` };
  }

  await supabase.from("audit_log").insert({
    user_id: admin.userId,
    action: "create_user",
    resource_type: "admin_roles",
    resource_id: newUser.user.id,
    details: { email, role, display_name: displayName },
  });

  return { success: true };
}

export async function deleteUserAccount(userId: string) {
  const admin = await getAdminUser();
  if (!admin || !isSuperAdmin(admin)) {
    return { error: "Admin access required" };
  }

  if (userId === admin.userId) {
    return { error: "You cannot delete your own account" };
  }

  const supabase = createServiceClient();

  // Delete admin role
  const { error: roleError } = await supabase
    .from("admin_roles")
    .delete()
    .eq("user_id", userId);

  if (roleError) {
    return { error: roleError.message };
  }

  // Delete auth user
  const { error: authError } = await supabase.auth.admin.deleteUser(userId);

  if (authError) {
    return { error: `Role removed but auth deletion failed: ${authError.message}` };
  }

  await supabase.from("audit_log").insert({
    user_id: admin.userId,
    action: "delete_user",
    resource_type: "admin_roles",
    resource_id: userId,
  });

  return { success: true };
}
