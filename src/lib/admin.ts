import { createClient } from "@/lib/supabase/server";
import { createServiceClient } from "@/lib/supabase/service";
import type { AdminRole } from "@/types/database";

export interface AdminUser {
  userId: string;
  email: string;
  role: AdminRole;
  displayName: string | null;
}

export async function getAdminUser(): Promise<AdminUser | null> {
  try {
    const supabase = await createClient();

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) return null;

    // Use service client to bypass RLS for admin_roles check
    const serviceClient = createServiceClient();
    const { data: adminRole, error } = await serviceClient
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
  } catch {
    return null;
  }
}

export function isSuperAdmin(admin: AdminUser): boolean {
  return admin.role === "super_admin";
}
