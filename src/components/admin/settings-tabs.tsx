"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { SelectNative } from "@/components/ui/select-native";
import { cn, formatCents } from "@/lib/utils";
import {
  updateRetreatConfig,
  updatePricingTier,
  createUserAccount,
  deleteUserAccount,
} from "@/app/admin/settings/actions";
import type { Database } from "@/types/database";

type PricingTier = Database["public"]["Tables"]["pricing_tiers"]["Row"];
type RetreatConfig = Database["public"]["Tables"]["retreat_config"]["Row"];
type AuditLogEntry = Database["public"]["Tables"]["audit_log"]["Row"];
type AdminRoleRow = Database["public"]["Tables"]["admin_roles"]["Row"];

interface SettingsTabsProps {
  tiers: PricingTier[];
  config: RetreatConfig[];
  auditLog: AuditLogEntry[];
  adminUsers: AdminRoleRow[];
  isSuperAdmin: boolean;
}

const tabs = [
  { id: "config", label: "Retreat Config" },
  { id: "pricing", label: "Pricing Tiers" },
  { id: "admins", label: "Admin Users" },
  { id: "audit", label: "Audit Log" },
] as const;

type TabId = (typeof tabs)[number]["id"];

export function SettingsTabs({
  tiers,
  config,
  auditLog,
  adminUsers,
  isSuperAdmin,
}: SettingsTabsProps) {
  const [activeTab, setActiveTab] = useState<TabId>("config");

  return (
    <div>
      <div className="flex gap-1 border-b">
        {tabs
          .filter(
            (t) =>
              t.id !== "admins" || isSuperAdmin
          )
          .filter(
            (t) =>
              t.id !== "pricing" || isSuperAdmin
          )
          .map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={cn(
                "border-b-2 px-4 py-2 text-sm font-medium transition-colors",
                activeTab === tab.id
                  ? "border-primary text-primary"
                  : "border-transparent text-muted-foreground hover:text-foreground"
              )}
            >
              {tab.label}
            </button>
          ))}
      </div>

      <div className="mt-6">
        {activeTab === "config" && <RetreatConfigTab config={config} />}
        {activeTab === "pricing" && isSuperAdmin && (
          <PricingTab tiers={tiers} />
        )}
        {activeTab === "admins" && isSuperAdmin && (
          <AdminUsersTab users={adminUsers} />
        )}
        {activeTab === "audit" && <AuditLogTab entries={auditLog} />}
      </div>
    </div>
  );
}

function RetreatConfigTab({ config }: { config: RetreatConfig[] }) {
  const router = useRouter();
  const [saving, setSaving] = useState<string | null>(null);

  async function handleSave(key: string, value: string) {
    setSaving(key);
    await updateRetreatConfig(key, value);
    setSaving(null);
    router.refresh();
  }

  return (
    <div className="space-y-4">
      {config.map((item) => (
        <ConfigRow
          key={item.id}
          configKey={item.key}
          value={
            typeof item.value === "string"
              ? item.value
              : JSON.stringify(item.value)
          }
          onSave={handleSave}
          isSaving={saving === item.key}
        />
      ))}
    </div>
  );
}

function ConfigRow({
  configKey,
  value,
  onSave,
  isSaving,
}: {
  configKey: string;
  value: string;
  onSave: (key: string, value: string) => Promise<void>;
  isSaving: boolean;
}) {
  const [editValue, setEditValue] = useState(value);
  const isDirty = editValue !== value;

  return (
    <div className="flex items-end gap-3 rounded-lg border bg-card p-4">
      <div className="flex-1">
        <Label className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
          {configKey.replace(/_/g, " ")}
        </Label>
        <Input
          value={editValue}
          onChange={(e) => setEditValue(e.target.value)}
          className="mt-1"
        />
      </div>
      {isDirty && (
        <Button
          size="sm"
          onClick={() => onSave(configKey, editValue)}
          disabled={isSaving}
        >
          {isSaving ? "Saving..." : "Save"}
        </Button>
      )}
    </div>
  );
}

function PricingTab({ tiers }: { tiers: PricingTier[] }) {
  const router = useRouter();

  async function handleToggleActive(tier: PricingTier) {
    await updatePricingTier(tier.id, { is_active: !tier.is_active });
    router.refresh();
  }

  return (
    <div className="space-y-4">
      {tiers.map((tier) => (
        <div
          key={tier.id}
          className="flex items-center justify-between rounded-lg border bg-card p-4"
        >
          <div>
            <div className="flex items-center gap-2">
              <h3 className="font-semibold text-foreground">{tier.name}</h3>
              <Badge
                variant={tier.is_active ? "default" : "outline"}
                className="text-xs"
              >
                {tier.is_active ? "Active" : "Inactive"}
              </Badge>
            </div>
            <p className="mt-1 text-sm text-muted-foreground">
              {formatCents(tier.price_cents, tier.currency)} {tier.currency} |{" "}
              {tier.spots_taken}/{tier.max_spots ?? "unlimited"} spots taken
            </p>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={() => handleToggleActive(tier)}
          >
            {tier.is_active ? "Deactivate" : "Activate"}
          </Button>
        </div>
      ))}
    </div>
  );
}

function AdminUsersTab({ users }: { users: AdminRoleRow[] }) {
  const router = useRouter();
  const [showForm, setShowForm] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [role, setRole] = useState<"super_admin" | "admin">("admin");
  const [creating, setCreating] = useState(false);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  async function handleCreate(e: React.FormEvent) {
    e.preventDefault();
    setCreating(true);
    setMessage(null);
    const result = await createUserAccount(email, password, displayName, role);
    if (result.error) {
      setMessage({ type: "error", text: result.error });
    } else {
      setMessage({ type: "success", text: "Account created successfully" });
      setEmail("");
      setPassword("");
      setDisplayName("");
      setRole("admin");
      setShowForm(false);
      router.refresh();
    }
    setCreating(false);
  }

  async function handleDelete(userId: string) {
    if (!confirm("Are you sure you want to delete this user?")) return;
    const result = await deleteUserAccount(userId);
    if (result.error) {
      setMessage({ type: "error", text: result.error });
    } else {
      router.refresh();
    }
  }

  return (
    <div className="space-y-4">
      {message && (
        <div className={`rounded-md border p-3 text-sm ${
          message.type === "error"
            ? "border-destructive/50 bg-destructive/10 text-destructive"
            : "border-green-500/50 bg-green-500/10 text-green-400"
        }`}>
          {message.text}
        </div>
      )}

      {/* User list */}
      {users.map((user) => (
        <div
          key={user.id}
          className="flex items-center justify-between rounded-lg border bg-card p-4"
        >
          <div>
            <p className="font-medium text-foreground">
              {user.display_name ?? user.email}
            </p>
            <p className="text-sm text-muted-foreground">{user.email}</p>
          </div>
          <div className="flex items-center gap-3">
            <Badge
              variant={user.role === "super_admin" ? "default" : "secondary"}
              className="text-xs"
            >
              {user.role === "super_admin" ? "Admin" : "Employee"}
            </Badge>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => handleDelete(user.user_id)}
              className="text-xs text-destructive hover:text-destructive"
            >
              Delete
            </Button>
          </div>
        </div>
      ))}

      {/* Create form toggle */}
      {!showForm ? (
        <Button variant="outline" size="sm" onClick={() => setShowForm(true)}>
          + Create New Account
        </Button>
      ) : (
        <form onSubmit={handleCreate} className="space-y-3 rounded-lg border bg-card p-4">
          <h4 className="font-semibold text-foreground">Create New Account</h4>
          <div className="grid gap-3 sm:grid-cols-2">
            <div>
              <Label className="mb-1 block text-xs text-muted-foreground">Display Name</Label>
              <Input value={displayName} onChange={(e) => setDisplayName(e.target.value)} placeholder="Full name" />
            </div>
            <div>
              <Label className="mb-1 block text-xs text-muted-foreground">Email *</Label>
              <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="email@example.com" required />
            </div>
            <div>
              <Label className="mb-1 block text-xs text-muted-foreground">Password *</Label>
              <Input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Min 6 characters" required minLength={6} />
            </div>
            <div>
              <Label className="mb-1 block text-xs text-muted-foreground">Role *</Label>
              <SelectNative value={role} onChange={(e) => setRole(e.target.value as "super_admin" | "admin")}>
                <option value="admin">Employee (no settings access)</option>
                <option value="super_admin">Admin (full access)</option>
              </SelectNative>
            </div>
          </div>
          <div className="flex gap-2">
            <Button type="submit" size="sm" disabled={creating}>
              {creating ? "Creating..." : "Create Account"}
            </Button>
            <Button type="button" variant="ghost" size="sm" onClick={() => setShowForm(false)}>
              Cancel
            </Button>
          </div>
        </form>
      )}

      <p className="text-xs text-muted-foreground">
        <strong>Admin</strong> accounts have full access including settings. <strong>Employee</strong> accounts can access everything except settings.
      </p>
    </div>
  );
}

function AuditLogTab({ entries }: { entries: AuditLogEntry[] }) {
  return (
    <div className="overflow-x-auto rounded-lg border bg-card">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b bg-muted/50">
            <th className="px-4 py-3 text-left font-medium text-muted-foreground">
              Time
            </th>
            <th className="px-4 py-3 text-left font-medium text-muted-foreground">
              Action
            </th>
            <th className="px-4 py-3 text-left font-medium text-muted-foreground">
              Resource
            </th>
            <th className="hidden px-4 py-3 text-left font-medium text-muted-foreground lg:table-cell">
              Details
            </th>
          </tr>
        </thead>
        <tbody>
          {entries.length === 0 ? (
            <tr>
              <td
                colSpan={4}
                className="px-4 py-8 text-center text-muted-foreground"
              >
                No audit log entries.
              </td>
            </tr>
          ) : (
            entries.map((entry) => (
              <tr key={entry.id} className="border-b last:border-0">
                <td className="whitespace-nowrap px-4 py-3 text-muted-foreground">
                  {new Date(entry.created_at).toLocaleString()}
                </td>
                <td className="px-4 py-3 font-medium text-foreground">
                  {entry.action}
                </td>
                <td className="px-4 py-3 text-muted-foreground">
                  {entry.resource_type}
                  {entry.resource_id && (
                    <span className="ml-1 font-mono text-xs">
                      {entry.resource_id.slice(0, 8)}
                    </span>
                  )}
                </td>
                <td className="hidden max-w-xs truncate px-4 py-3 font-mono text-xs text-muted-foreground lg:table-cell">
                  {entry.details ? JSON.stringify(entry.details) : "-"}
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
