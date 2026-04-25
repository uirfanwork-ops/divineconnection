"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { SelectNative } from "@/components/ui/select-native";
import { Label } from "@/components/ui/label";
import { formatCents } from "@/lib/utils";
import {
  updateRegistrationStatus,
  updatePaymentStatus,
  updateRegistrationDetails,
  exportRegistrationsCsv,
} from "@/app/admin/registrations/actions";
import type { Database, RegistrationStatus } from "@/types/database";
import { Search, Download, ChevronLeft, ChevronRight, X, Pencil, Save } from "lucide-react";

type Registration = Database["public"]["Tables"]["registrations"]["Row"];

interface RegistrationsTableProps {
  registrations: Registration[];
  currentPage: number;
  totalPages: number;
  totalCount: number;
  search: string;
  statusFilter: string;
  paymentFilter: string;
  error?: string;
}

export function RegistrationsTable({
  registrations,
  currentPage,
  totalPages,
  totalCount,
  search,
  statusFilter,
  paymentFilter,
  error,
}: RegistrationsTableProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [searchInput, setSearchInput] = useState(search);
  const [selectedRow, setSelectedRow] = useState<Registration | null>(null);

  function updateParams(updates: Record<string, string>) {
    const params = new URLSearchParams(searchParams.toString());
    for (const [key, value] of Object.entries(updates)) {
      if (value) {
        params.set(key, value);
      } else {
        params.delete(key);
      }
    }
    if (!updates.page) params.delete("page");
    router.push(`/admin/registrations?${params.toString()}`);
  }

  function handleSearch(e: React.FormEvent) {
    e.preventDefault();
    updateParams({ search: searchInput, page: "" });
  }

  async function handleExport() {
    const csv = await exportRegistrationsCsv();
    if (!csv) return;
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `registrations-${new Date().toISOString().split("T")[0]}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  }

  if (error) {
    return (
      <div className="rounded-md border border-destructive/50 bg-destructive/10 p-4 text-sm text-destructive">
        {error}
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Quick Filter Buttons */}
      <div className="flex flex-wrap gap-2">
        <Button variant={!paymentFilter && !statusFilter ? "default" : "outline"} size="sm" onClick={() => updateParams({ payment: "", status: "", page: "" })}>All</Button>
        <Button variant={paymentFilter === "pending" ? "default" : "outline"} size="sm" onClick={() => updateParams({ payment: "pending", status: "", page: "" })}>Unpaid</Button>
        <Button variant={paymentFilter === "completed" ? "default" : "outline"} size="sm" onClick={() => updateParams({ payment: "completed", status: "", page: "" })}>Paid</Button>
        <Button variant={statusFilter === "confirmed" ? "default" : "outline"} size="sm" onClick={() => updateParams({ status: "confirmed", payment: "", page: "" })}>Confirmed</Button>
        <Button variant={statusFilter === "cancelled" ? "default" : "outline"} size="sm" onClick={() => updateParams({ status: "cancelled", payment: "", page: "" })}>Cancelled</Button>
      </div>

      {/* Search and Filters */}
      <div className="flex flex-wrap items-end gap-3">
        <form onSubmit={handleSearch} className="flex items-center gap-2">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input placeholder="Search name, email, phone..." value={searchInput} onChange={(e) => setSearchInput(e.target.value)} className="w-64 pl-9" />
          </div>
          <Button type="submit" variant="outline" size="sm">Search</Button>
          {search && (
            <Button type="button" variant="ghost" size="sm" onClick={() => { setSearchInput(""); updateParams({ search: "" }); }}>
              <X className="h-4 w-4" />
            </Button>
          )}
        </form>
        <SelectNative value={statusFilter} onChange={(e) => updateParams({ status: e.target.value, page: "" })} className="w-40">
          <option value="">All statuses</option>
          <option value="pending">Pending</option>
          <option value="confirmed">Confirmed</option>
          <option value="cancelled">Cancelled</option>
          <option value="refunded">Refunded</option>
          <option value="waitlisted">Waitlisted</option>
        </SelectNative>
        <SelectNative value={paymentFilter} onChange={(e) => updateParams({ payment: e.target.value, page: "" })} className="w-40">
          <option value="">All payments</option>
          <option value="pending">Pending</option>
          <option value="completed">Completed</option>
          <option value="failed">Failed</option>
          <option value="refunded">Refunded</option>
        </SelectNative>
        <Button variant="outline" size="sm" onClick={handleExport}>
          <Download className="mr-1 h-4 w-4" />CSV
        </Button>
      </div>

      {/* Table */}
      <div className="overflow-x-auto rounded-lg border bg-card">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b bg-muted/50">
              <th className="px-4 py-3 text-left font-medium text-muted-foreground">Code</th>
              <th className="px-4 py-3 text-left font-medium text-muted-foreground">Name</th>
              <th className="hidden px-4 py-3 text-left font-medium text-muted-foreground md:table-cell">Email</th>
              <th className="px-4 py-3 text-left font-medium text-muted-foreground">Status</th>
              <th className="px-4 py-3 text-left font-medium text-muted-foreground">Payment</th>
              <th className="px-4 py-3 text-right font-medium text-muted-foreground">Amount</th>
              <th className="hidden px-4 py-3 text-left font-medium text-muted-foreground lg:table-cell">Date</th>
            </tr>
          </thead>
          <tbody>
            {registrations.length === 0 ? (
              <tr><td colSpan={7} className="px-4 py-8 text-center text-muted-foreground">No registrations found.</td></tr>
            ) : (
              registrations.map((reg) => (
                <tr
                  key={reg.id}
                  className={`cursor-pointer border-b last:border-0 hover:bg-muted/30 ${reg.payment_status === "pending" ? "bg-amber-500/5" : reg.payment_status === "completed" ? "bg-green-500/5" : ""}`}
                  onClick={() => setSelectedRow(selectedRow?.id === reg.id ? null : reg)}
                >
                  <td className="px-4 py-3 font-mono text-xs font-bold text-foreground">{reg.confirmation_code}</td>
                  <td className="px-4 py-3 font-medium text-foreground">{reg.full_name}</td>
                  <td className="hidden px-4 py-3 text-muted-foreground md:table-cell">{reg.email}</td>
                  <td className="px-4 py-3">
                    <Badge variant={reg.status === "confirmed" ? "default" : reg.status === "cancelled" ? "destructive" : "outline"} className="text-xs">{reg.status}</Badge>
                  </td>
                  <td className="px-4 py-3">
                    <Badge variant={reg.payment_status === "completed" ? "default" : reg.payment_status === "failed" ? "destructive" : "outline"} className="text-xs">
                      {reg.payment_status === "pending" ? "UNPAID" : reg.payment_status === "completed" ? "PAID" : reg.payment_status}
                    </Badge>
                  </td>
                  <td className="px-4 py-3 text-right font-medium">{formatCents(reg.amount_cents, reg.currency)}</td>
                  <td className="hidden px-4 py-3 text-muted-foreground lg:table-cell">{new Date(reg.created_at).toLocaleDateString()}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Detail Drawer */}
      {selectedRow && (
        <RegistrationDetail
          registration={selectedRow}
          onClose={() => setSelectedRow(null)}
          onRefresh={() => { router.refresh(); setSelectedRow(null); }}
        />
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between">
          <p className="text-sm text-muted-foreground">
            Showing {(currentPage - 1) * 25 + 1} to {Math.min(currentPage * 25, totalCount)} of {totalCount}
          </p>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" disabled={currentPage <= 1} onClick={() => updateParams({ page: String(currentPage - 1) })}>
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <span className="text-sm text-muted-foreground">Page {currentPage} of {totalPages}</span>
            <Button variant="outline" size="sm" disabled={currentPage >= totalPages} onClick={() => updateParams({ page: String(currentPage + 1) })}>
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}

function RegistrationDetail({
  registration,
  onClose,
  onRefresh,
}: {
  registration: Registration;
  onClose: () => void;
  onRefresh: () => void;
}) {
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [showPaymentForm, setShowPaymentForm] = useState(false);
  const [paymentDate, setPaymentDate] = useState("");
  const [amountDeposited, setAmountDeposited] = useState("");
  const [isConfirming, setIsConfirming] = useState(false);

  const [form, setForm] = useState({
    full_name: registration.full_name,
    email: registration.email,
    phone: registration.phone,
    date_of_birth: registration.date_of_birth ?? "",
    gender: registration.gender ?? "",
    emergency_contact_name: registration.emergency_contact_name ?? "",
    emergency_contact_relationship: registration.emergency_contact_relationship ?? "",
    emergency_contact_phone: registration.emergency_contact_phone ?? "",
    allergies: registration.allergies ?? "",
    medical_conditions: registration.medical_conditions ?? "",
    current_medications: registration.current_medications ?? "",
    dietary_restrictions: registration.dietary_restrictions ?? "",
    driving_self: registration.driving_self,
    seeking_carpool: registration.seeking_carpool,
    photo_consent: registration.photo_consent,
    admin_notes: registration.admin_notes ?? "",
  });

  function updateField(field: string, value: string | boolean) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  async function handleSave() {
    setIsSaving(true);
    await updateRegistrationDetails(registration.id, form);
    setIsSaving(false);
    setIsEditing(false);
    onRefresh();
  }

  async function handleStatusChange(status: RegistrationStatus) {
    await updateRegistrationStatus(registration.id, status);
    onRefresh();
  }

  async function handleConfirmPayment() {
    if (!paymentDate || !amountDeposited) return;
    setIsConfirming(true);
    await updatePaymentStatus(registration.id, "completed", {
      payment_received_date: paymentDate,
      amount_deposited: Math.round(parseFloat(amountDeposited) * 100),
    });
    setIsConfirming(false);
    onRefresh();
  }

  async function handleMarkUnpaid() {
    await updatePaymentStatus(registration.id, "pending");
    onRefresh();
  }

  return (
    <div className="rounded-lg border bg-card p-6 shadow-sm">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold">{registration.full_name}</h3>
          <p className="font-mono text-sm font-bold text-muted-foreground">Code: {registration.confirmation_code}</p>
        </div>
        <div className="flex gap-2">
          {!isEditing ? (
            <Button variant="outline" size="sm" onClick={() => setIsEditing(true)}>
              <Pencil className="mr-1 h-3 w-3" />Edit
            </Button>
          ) : (
            <Button variant="default" size="sm" disabled={isSaving} onClick={handleSave}>
              <Save className="mr-1 h-3 w-3" />{isSaving ? "Saving..." : "Save"}
            </Button>
          )}
          <Button variant="ghost" size="sm" onClick={onClose}><X className="h-4 w-4" /></Button>
        </div>
      </div>

      {/* Editable Fields */}
      <div className="mt-4 grid gap-3 text-sm sm:grid-cols-2">
        <EditableField label="Full Name" value={form.full_name} editing={isEditing} onChange={(v) => updateField("full_name", v)} />
        <EditableField label="Email" value={form.email} editing={isEditing} onChange={(v) => updateField("email", v)} type="email" />
        <EditableField label="Phone" value={form.phone} editing={isEditing} onChange={(v) => updateField("phone", v)} type="tel" />
        <EditableField label="Date of Birth" value={form.date_of_birth} editing={isEditing} onChange={(v) => updateField("date_of_birth", v)} type="date" />
        <EditableField label="Gender" value={form.gender} editing={isEditing} onChange={(v) => updateField("gender", v)} />
        <div>
          <dt className="text-muted-foreground">Amount Due</dt>
          <dd className="font-medium">{formatCents(registration.amount_cents, registration.currency)} {registration.currency}</dd>
        </div>
      </div>

      <h4 className="mt-5 text-xs font-semibold uppercase tracking-wider text-muted-foreground">Emergency Contact</h4>
      <div className="mt-2 grid gap-3 text-sm sm:grid-cols-3">
        <EditableField label="Name" value={form.emergency_contact_name} editing={isEditing} onChange={(v) => updateField("emergency_contact_name", v)} />
        <EditableField label="Relationship" value={form.emergency_contact_relationship} editing={isEditing} onChange={(v) => updateField("emergency_contact_relationship", v)} />
        <EditableField label="Phone" value={form.emergency_contact_phone} editing={isEditing} onChange={(v) => updateField("emergency_contact_phone", v)} type="tel" />
      </div>

      <h4 className="mt-5 text-xs font-semibold uppercase tracking-wider text-muted-foreground">Medical &amp; Dietary</h4>
      <div className="mt-2 grid gap-3 text-sm sm:grid-cols-2">
        <EditableTextarea label="Allergies" value={form.allergies} editing={isEditing} onChange={(v) => updateField("allergies", v)} />
        <EditableTextarea label="Medical Conditions" value={form.medical_conditions} editing={isEditing} onChange={(v) => updateField("medical_conditions", v)} />
        <EditableTextarea label="Current Medications" value={form.current_medications} editing={isEditing} onChange={(v) => updateField("current_medications", v)} />
        <EditableTextarea label="Dietary Restrictions" value={form.dietary_restrictions} editing={isEditing} onChange={(v) => updateField("dietary_restrictions", v)} />
      </div>

      <h4 className="mt-5 text-xs font-semibold uppercase tracking-wider text-muted-foreground">Other</h4>
      <div className="mt-2 grid gap-3 text-sm sm:grid-cols-3">
        <ToggleField label="Driving Self" value={form.driving_self} editing={isEditing} onChange={(v) => updateField("driving_self", v)} />
        <ToggleField label="Seeking Carpool" value={form.seeking_carpool} editing={isEditing} onChange={(v) => updateField("seeking_carpool", v)} />
        <ToggleField label="Photo Consent" value={form.photo_consent} editing={isEditing} onChange={(v) => updateField("photo_consent", v)} />
      </div>

      <div className="mt-4">
        <EditableTextarea label="Admin Notes" value={form.admin_notes} editing={isEditing} onChange={(v) => updateField("admin_notes", v)} fullWidth />
      </div>

      {/* Status & Payment Controls */}
      <div className="mt-6 space-y-4 border-t pt-4">
        <div className="flex flex-wrap gap-3">
          <div>
            <Label className="mb-1 block text-xs text-muted-foreground">Registration Status</Label>
            <SelectNative value={registration.status} onChange={(e) => handleStatusChange(e.target.value as RegistrationStatus)} className="w-36">
              <option value="pending">Pending</option>
              <option value="confirmed">Confirmed</option>
              <option value="cancelled">Cancelled</option>
              <option value="refunded">Refunded</option>
              <option value="waitlisted">Waitlisted</option>
            </SelectNative>
          </div>

          {registration.payment_status !== "completed" ? (
            <div>
              <Label className="mb-1 block text-xs text-muted-foreground">Payment</Label>
              <Button variant="default" size="sm" onClick={() => setShowPaymentForm(true)} className="bg-green-600 hover:bg-green-700">Mark as Paid</Button>
            </div>
          ) : (
            <>
              <div>
                <Label className="mb-1 block text-xs text-muted-foreground">Payment</Label>
                <Badge variant="default" className="mt-1 bg-green-600 text-sm">PAID</Badge>
              </div>
              <div>
                <Label className="mb-1 block text-xs text-muted-foreground">Revert</Label>
                <Button variant="outline" size="sm" onClick={handleMarkUnpaid}>Mark Unpaid</Button>
              </div>
            </>
          )}
        </div>

        {showPaymentForm && (
          <div className="rounded-lg border border-green-200 bg-green-50 p-4 dark:border-green-900 dark:bg-green-950">
            <h4 className="mb-3 text-sm font-semibold text-green-800 dark:text-green-200">Confirm Payment Received</h4>
            <div className="grid gap-3 sm:grid-cols-2">
              <div>
                <Label className="mb-1 block text-xs text-green-700 dark:text-green-300">Date e-Transfer Received *</Label>
                <Input type="date" value={paymentDate} onChange={(e) => setPaymentDate(e.target.value)} />
              </div>
              <div>
                <Label className="mb-1 block text-xs text-green-700 dark:text-green-300">Amount Deposited ($) *</Label>
                <Input type="number" step="0.01" min="0" placeholder="475.00" value={amountDeposited} onChange={(e) => setAmountDeposited(e.target.value)} />
              </div>
            </div>
            <div className="mt-3 flex gap-2">
              <Button size="sm" disabled={!paymentDate || !amountDeposited || isConfirming} onClick={handleConfirmPayment} className="bg-green-600 hover:bg-green-700">
                {isConfirming ? "Confirming..." : "Confirm Payment"}
              </Button>
              <Button variant="ghost" size="sm" onClick={() => setShowPaymentForm(false)}>Cancel</Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function EditableField({
  label,
  value,
  editing,
  onChange,
  type = "text",
}: {
  label: string;
  value: string;
  editing: boolean;
  onChange: (v: string) => void;
  type?: string;
}) {
  return (
    <div>
      <dt className="text-muted-foreground">{label}</dt>
      {editing ? (
        <Input type={type} value={value} onChange={(e) => onChange(e.target.value)} className="mt-1" />
      ) : (
        <dd className="font-medium">{value || "N/A"}</dd>
      )}
    </div>
  );
}

function EditableTextarea({
  label,
  value,
  editing,
  onChange,
  fullWidth,
}: {
  label: string;
  value: string;
  editing: boolean;
  onChange: (v: string) => void;
  fullWidth?: boolean;
}) {
  return (
    <div className={fullWidth ? "sm:col-span-2" : ""}>
      <dt className="text-muted-foreground">{label}</dt>
      {editing ? (
        <Textarea value={value} onChange={(e) => onChange(e.target.value)} rows={2} className="mt-1" />
      ) : (
        <dd className="whitespace-pre-wrap font-medium">{value || "N/A"}</dd>
      )}
    </div>
  );
}

function ToggleField({
  label,
  value,
  editing,
  onChange,
}: {
  label: string;
  value: boolean;
  editing: boolean;
  onChange: (v: boolean) => void;
}) {
  return (
    <div>
      <dt className="text-muted-foreground">{label}</dt>
      {editing ? (
        <SelectNative value={value ? "yes" : "no"} onChange={(e) => onChange(e.target.value === "yes")} className="mt-1">
          <option value="yes">Yes</option>
          <option value="no">No</option>
        </SelectNative>
      ) : (
        <dd className="font-medium">{value ? "Yes" : "No"}</dd>
      )}
    </div>
  );
}
