"use server";

import { createServiceClient } from "@/lib/supabase/service";

export async function logAdminLogin(email: string) {
  const supabase = createServiceClient();

  const { data: adminRole } = await supabase
    .from("admin_roles")
    .select("user_id")
    .eq("email", email)
    .single();

  await supabase.from("audit_log").insert({
    user_id: adminRole?.user_id ?? null,
    action: "login",
    resource_type: "auth",
    details: { email },
  });
}
