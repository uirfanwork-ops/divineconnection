import { createClient } from "@/lib/supabase/server";
import { getAdminUser, isSuperAdmin } from "@/lib/admin";
import { SettingsTabs } from "@/components/admin/settings-tabs";
import type { Database } from "@/types/database";

type PricingTier = Database["public"]["Tables"]["pricing_tiers"]["Row"];
type RetreatConfig = Database["public"]["Tables"]["retreat_config"]["Row"];
type AuditLogEntry = Database["public"]["Tables"]["audit_log"]["Row"];
type AdminRoleRow = Database["public"]["Tables"]["admin_roles"]["Row"];

export default async function SettingsPage() {
  const admin = await getAdminUser();
  if (!admin) return null;

  const supabase = await createClient();
  const superAdmin = isSuperAdmin(admin);

  const { data: tiers } = await supabase
    .from("pricing_tiers")
    .select("*")
    .order("sort_order", { ascending: true });

  const { data: config } = await supabase
    .from("retreat_config")
    .select("*")
    .order("key", { ascending: true });

  const { data: auditLog } = await supabase
    .from("audit_log")
    .select("*")
    .order("created_at", { ascending: false })
    .limit(50);

  let adminUsers: AdminRoleRow[] = [];
  if (superAdmin) {
    const { data } = await supabase
      .from("admin_roles")
      .select("*")
      .order("created_at", { ascending: true });
    adminUsers = data ?? [];
  }

  return (
    <div>
      <h1 className="text-2xl font-bold text-foreground">Settings</h1>
      <p className="mt-1 text-sm text-muted-foreground">
        Manage retreat configuration, pricing, and admin users.
      </p>
      <div className="mt-6">
        <SettingsTabs
          tiers={(tiers ?? []) as PricingTier[]}
          config={(config ?? []) as RetreatConfig[]}
          auditLog={(auditLog ?? []) as AuditLogEntry[]}
          adminUsers={adminUsers}
          isSuperAdmin={superAdmin}
        />
      </div>
    </div>
  );
}
