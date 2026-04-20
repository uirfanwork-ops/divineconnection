import { createClient } from "@/lib/supabase/server";
import type { AdminRole } from "@/types/database";

export interface AdminUser {
  userId: string;
  email: string;
  role: AdminRole;
  displayName: string | null;
}

export async function getAdminUser(): Promise<AdminUser | null> {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return null;

  const { data: adminRole, error } = await supabase
    .from("admin_roles")
    .select("*")
    .eq("user_id", user.id)
    .single();

  if (error || !adminRole) return null;

  return {
    userId: user.id,
    email: adminRole.email,
    role: adminRole.role,
    displayName: adminRole.display_name,
  };
}

export function isSuperAdmin(admin: AdminUser): boolean {
  return admin.role === "super_admin";
}
