export const dynamic = "force-dynamic";

import { createServiceClient } from "@/lib/supabase/service";
import { Badge } from "@/components/ui/badge";
import type { Database } from "@/types/database";

type AuditLogEntry = Database["public"]["Tables"]["audit_log"]["Row"];
function formatAction(action: string): { label: string; variant: "default" | "outline" | "destructive" } {
  switch (action) {
    case "login":
      return { label: "Login", variant: "outline" };
    case "update_status":
      return { label: "Status Change", variant: "default" };
    case "update_payment_status":
      return { label: "Payment Update", variant: "default" };
    case "create_user":
      return { label: "User Created", variant: "default" };
    case "delete_user":
      return { label: "User Deleted", variant: "destructive" };
    case "update_receipt":
      return { label: "Receipt Update", variant: "outline" };
    case "approve_receipt":
      return { label: "Receipt Approved", variant: "default" };
    case "reject_receipt":
      return { label: "Receipt Rejected", variant: "destructive" };
    default:
      return { label: action.replace(/_/g, " "), variant: "outline" };
  }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function formatDetails(action: string, details: any): string {
  if (!details || typeof details !== "object" || Array.isArray(details)) return "";
  const d = details as Record<string, unknown>;

  switch (action) {
    case "login":
      return `${d.email ?? ""}`;
    case "update_status":
      return `Changed to ${d.new_status ?? ""}`;
    case "update_payment_status":
      return `Changed to ${d.new_payment_status === "completed" ? "PAID" : d.new_payment_status ?? ""}`;
    case "create_user":
      return `${d.email ?? ""} (${d.role === "super_admin" ? "Admin" : "Employee"})`;
    case "delete_user":
      return `${d.email ?? ""}`;
    default:
      return JSON.stringify(details);
  }
}

export default async function AuditLogPage() {
  const supabase = createServiceClient();

  const { data: entries } = await supabase
    .from("audit_log")
    .select("*")
    .order("created_at", { ascending: false })
    .limit(200);

  const auditLog = (entries ?? []) as AuditLogEntry[];

  // Get admin emails for user_id lookup
  const userIds = Array.from(new Set(auditLog.map((e) => e.user_id).filter(Boolean))) as string[];
  const { data: adminRoles } = await supabase
    .from("admin_roles")
    .select("user_id, email, display_name")
    .in("user_id", userIds.length > 0 ? userIds : ["none"]);

  const adminMap = new Map<string, string>();
  for (const role of adminRoles ?? []) {
    adminMap.set(role.user_id, role.display_name ?? role.email);
  }

  return (
    <div>
      <h1 className="text-2xl font-bold text-foreground">Audit Log</h1>
      <p className="mt-1 text-sm text-muted-foreground">
        Track all admin logins and changes. {auditLog.length} entries.
      </p>

      <div className="mt-6 overflow-x-auto rounded-lg border bg-card">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b bg-muted/50">
              <th className="px-4 py-3 text-left font-medium text-muted-foreground">
                Date &amp; Time
              </th>
              <th className="px-4 py-3 text-left font-medium text-muted-foreground">
                Admin
              </th>
              <th className="px-4 py-3 text-left font-medium text-muted-foreground">
                Action
              </th>
              <th className="px-4 py-3 text-left font-medium text-muted-foreground">
                Resource
              </th>
              <th className="hidden px-4 py-3 text-left font-medium text-muted-foreground md:table-cell">
                Details
              </th>
            </tr>
          </thead>
          <tbody>
            {auditLog.length === 0 ? (
              <tr>
                <td
                  colSpan={5}
                  className="px-4 py-8 text-center text-muted-foreground"
                >
                  No audit log entries yet.
                </td>
              </tr>
            ) : (
              auditLog.map((entry) => {
                const { label, variant } = formatAction(entry.action);
                const adminName = entry.user_id
                  ? adminMap.get(entry.user_id) ?? entry.user_id.slice(0, 8)
                  : "System";

                return (
                  <tr key={entry.id} className="border-b last:border-0">
                    <td className="whitespace-nowrap px-4 py-3 text-muted-foreground">
                      {new Date(entry.created_at).toLocaleDateString()}{" "}
                      <span className="text-xs">
                        {new Date(entry.created_at).toLocaleTimeString()}
                      </span>
                    </td>
                    <td className="px-4 py-3 font-medium text-foreground">
                      {adminName}
                    </td>
                    <td className="px-4 py-3">
                      <Badge variant={variant} className="text-xs">
                        {label}
                      </Badge>
                    </td>
                    <td className="px-4 py-3 text-muted-foreground">
                      {entry.resource_type}
                      {entry.resource_id && (
                        <span className="ml-1 font-mono text-xs">
                          {entry.resource_id.slice(0, 8)}
                        </span>
                      )}
                    </td>
                    <td className="hidden max-w-xs truncate px-4 py-3 text-xs text-muted-foreground md:table-cell">
                      {formatDetails(entry.action, entry.details)}
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
