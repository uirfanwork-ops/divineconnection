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
  deleteRegistration,
  sendPaymentReminder,
  exportRegistrationsCsv,
} from "@/app/admin/registrations/actions";
import type { Database } from "@/types/database";
import { Search, Download, ChevronLeft, ChevronRight, X, Pencil, Save, Trash2, Mail } from "lucide-react";

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
        <Button variant={statusFilter === "pending" && paymentFilter === "pending" ? "default" : "outline"} size="sm" onClick={() => updateParams({ status: "pending", payment: "pending", page: "" })}>Pending</Button>
        <Button variant={paymentFilter === "completed" && !statusFilter ? "default" : "outline"} size="sm" onClick={() => updateParams({ payment: "completed", status: "", page: "" })}>Paid</Button>
        <Button variant={statusFilter === "cancelled_refunded" ? "default" : "outline"} size="sm" onClick={() => updateParams({ status: "cancelled_refunded", payment: "", page: "" })}>Cancelled / Refunded</Button>
        <Button variant={statusFilter === "confirmed" && paymentFilter === "pending" ? "default" : "outline"} size="sm" onClick={() => updateParams({ status: "confirmed", payment: "pending", page: "" })}>Partial Payment</Button>
        <Button variant={statusFilter === "waitlisted" ? "default" : "outline"} size="sm" onClick={() => updateParams({ status: "waitlisted", payment: "", page: "" })}>Staff / Guest</Button>
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
          <option value="cancelled_refunded">Cancelled / Refunded</option>
          <option value="waitlisted">Staff / Guest</option>
        </SelectNative>
        <SelectNative value={paymentFilter} onChange={(e) => updateParams({ payment: e.target.value, page: "" })} className="w-40">
          <option value="">All payments</option>
          <option value="pending">Unpaid</option>
          <option value="completed">Paid</option>
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
              <th className="px-4 py-3 text-center font-medium text-muted-foreground">Remind</th>
            </tr>
          </thead>
          <tbody>
            {registrations.length === 0 ? (
              <tr><td colSpan={8} className="px-4 py-8 text-center text-muted-foreground">No registrations found.</td></tr>
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
                  <td className="px-4 py-3 text-center">
                    {reg.payment_status === "pending" && (
                      <ReminderButton registrationId={reg.id} />
                    )}
                  </td>
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
          onRefresh={(keepOpen) => { router.refresh(); if (!keepOpen) setSelectedRow(null); }}
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
  onRefresh: (keepOpen?: boolean) => void;
}) {
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [saveMessage, setSaveMessage] = useState("");
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState(() => {
    if (registration.payment_status === "completed") return "fully_paid";
    if (registration.status === "cancelled" || registration.status === "refunded") return "cancelled_refunded";
    if (registration.status === "confirmed" && registration.payment_status === "pending") return "partial_payment";
    if (registration.status === "waitlisted") return "staff_guest";
    return "pending";
  });
  const [showPaymentForm, setShowPaymentForm] = useState(false);
  const [paymentDate, setPaymentDate] = useState("");
  const [amountDeposited, setAmountDeposited] = useState("");
  const [isSavingStatus, setIsSavingStatus] = useState(false);
  const [isAddingInstallment, setIsAddingInstallment] = useState(false);
  const [installmentDate, setInstallmentDate] = useState("");
  const [installmentAmount, setInstallmentAmount] = useState("");

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
    const result = await updateRegistrationDetails(registration.id, form);
    setIsSaving(false);
    setIsEditing(false);
    if (result.error) {
      setSaveMessage(`Error: ${result.error}`);
    } else {
      setSaveMessage("Saved successfully!");
      setTimeout(() => setSaveMessage(""), 3000);
    }
    onRefresh(true);
  }

  async function handleDelete() {
    setIsDeleting(true);
    await deleteRegistration(registration.id);
    setIsDeleting(false);
    onRefresh();
  }

  function parsePayments(notes: string | null): { date: string; amount: number }[] {
    if (!notes) return [];
    const results: { date: string; amount: number }[] = [];
    const re = /Payment: \$(\d+(?:\.\d+)?) on (\S+)/g;
    let m: RegExpExecArray | null;
    while ((m = re.exec(notes)) !== null) {
      results.push({ amount: parseFloat(m[1]), date: m[2] });
    }
    return results;
  }

  const existingPayments = parsePayments(registration.admin_notes);
  const totalPaidSoFar = existingPayments.reduce((sum, p) => sum + p.amount, 0);
  const amountDueDollars = registration.amount_cents / 100;

  async function handleAddInstallment() {
    if (!installmentDate || !installmentAmount) return;
    setIsAddingInstallment(true);
    const newLine = `Payment: $${parseFloat(installmentAmount).toFixed(2)} on ${installmentDate} (recorded ${new Date().toLocaleDateString()})`;
    const existingNotes = registration.admin_notes ?? "";
    const updatedNotes = existingNotes ? `${existingNotes}\n${newLine}` : newLine;
    await updateRegistrationDetails(registration.id, {
      ...form,
      admin_notes: updatedNotes,
    });
    setInstallmentDate("");
    setInstallmentAmount("");
    setIsAddingInstallment(false);
    onRefresh(true);
  }

  async function handleSaveStatus() {
    setIsSavingStatus(true);
    if (selectedStatus === "fully_paid") {
      if (!paymentDate || !amountDeposited) { setIsSavingStatus(false); return; }
      await updatePaymentStatus(registration.id, "completed", {
        payment_received_date: paymentDate,
        amount_deposited: Math.round(parseFloat(amountDeposited) * 100),
      });
    } else if (selectedStatus === "cancelled_refunded") {
      await updateRegistrationStatus(registration.id, "cancelled");
      await updatePaymentStatus(registration.id, "refunded");
    } else if (selectedStatus === "partial_payment") {
      if (!paymentDate || !amountDeposited) { setIsSavingStatus(false); return; }
      await updateRegistrationStatus(registration.id, "confirmed");
      await updatePaymentStatus(registration.id, "pending");
      const newLine = `Payment: $${parseFloat(amountDeposited).toFixed(2)} on ${paymentDate} (recorded ${new Date().toLocaleDateString()})`;
      const existingNotes = registration.admin_notes ?? "";
      const updatedNotes = existingNotes ? `${existingNotes}\n${newLine}` : newLine;
      await updateRegistrationDetails(registration.id, {
        ...form,
        admin_notes: updatedNotes,
      });
    } else if (selectedStatus === "staff_guest") {
      await updateRegistrationStatus(registration.id, "waitlisted");
      await updatePaymentStatus(registration.id, "completed");
    } else {
      await updateRegistrationStatus(registration.id, "pending");
      await updatePaymentStatus(registration.id, "pending");
    }
    setIsSavingStatus(false);
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
          {isEditing && (
            <Button variant="ghost" size="sm" onClick={() => setIsEditing(false)}>Cancel</Button>
          )}
          <Button variant="ghost" size="sm" onClick={onClose}><X className="h-4 w-4" /></Button>
        </div>
      </div>
      {saveMessage && (
        <div className={`mt-2 rounded-md p-2 text-xs font-medium ${saveMessage.startsWith("Error") ? "bg-red-50 text-red-700 dark:bg-red-950 dark:text-red-300" : "bg-green-50 text-green-700 dark:bg-green-950 dark:text-green-300"}`}>
          {saveMessage}
        </div>
      )}

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

      {/* Status Controls */}
      <div className="mt-6 space-y-4 border-t pt-4">
        <div>
          <Label className="mb-1 block text-xs text-muted-foreground">Registration Status</Label>
          <SelectNative
            value={selectedStatus}
            onChange={(e) => {
              setSelectedStatus(e.target.value);
              setShowPaymentForm(e.target.value === "fully_paid" || e.target.value === "partial_payment");
            }}
            className="w-52"
          >
            <option value="pending">Pending</option>
            <option value="fully_paid">Mark as Fully Paid</option>
            <option value="cancelled_refunded">Cancelled / Refunded</option>
            <option value="partial_payment">Partial Payment</option>
            <option value="staff_guest">Staff / Guest</option>
          </SelectNative>
        </div>

        {showPaymentForm && selectedStatus === "fully_paid" && (
          <div className="rounded-lg border border-green-200 bg-green-50 p-4">
            <h4 className="mb-3 text-sm font-semibold text-green-800">Full Payment Details</h4>
            <div className="grid gap-3 sm:grid-cols-2">
              <div>
                <Label className="mb-1 block text-xs text-green-700">Date e-Transfer Received *</Label>
                <Input type="date" value={paymentDate} onChange={(e) => setPaymentDate(e.target.value)} />
              </div>
              <div>
                <Label className="mb-1 block text-xs text-green-700">Amount Deposited ($) *</Label>
                <Input type="number" step="0.01" min="0" placeholder="475.00" value={amountDeposited} onChange={(e) => setAmountDeposited(e.target.value)} />
              </div>
            </div>
          </div>
        )}

        {(showPaymentForm && selectedStatus === "partial_payment") && (
          <div className="rounded-lg border border-blue-200 bg-blue-50 p-4">
            <h4 className="mb-3 text-sm font-semibold text-blue-800">Installment Plan</h4>

            <div className="mb-3 flex items-baseline justify-between">
              <span className="text-sm text-blue-700">
                Total Due: <strong>${amountDueDollars.toFixed(2)}</strong>
              </span>
              <span className="text-sm text-blue-700">
                Paid: <strong>${totalPaidSoFar.toFixed(2)}</strong> &mdash;
                Remaining: <strong>${(amountDueDollars - totalPaidSoFar).toFixed(2)}</strong>
              </span>
            </div>

            {existingPayments.length > 0 && (
              <div className="mb-4">
                <Label className="mb-1 block text-xs text-blue-700">Payment History</Label>
                <div className="space-y-1">
                  {existingPayments.map((p, i) => (
                    <div key={i} className="flex items-center justify-between rounded border border-blue-100 bg-white px-3 py-1.5 text-xs">
                      <span className="text-blue-800">{p.date}</span>
                      <span className="font-semibold text-blue-900">${p.amount.toFixed(2)}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="border-t border-blue-200 pt-3">
              <Label className="mb-2 block text-xs font-semibold text-blue-700">
                {existingPayments.length > 0 ? "Add Another Installment" : "Record First Installment"}
              </Label>
              {existingPayments.length === 0 ? (
                <div className="grid gap-3 sm:grid-cols-2">
                  <div>
                    <Label className="mb-1 block text-xs text-blue-600">Date Received *</Label>
                    <Input type="date" value={paymentDate} onChange={(e) => setPaymentDate(e.target.value)} />
                  </div>
                  <div>
                    <Label className="mb-1 block text-xs text-blue-600">Amount ($) *</Label>
                    <Input type="number" step="0.01" min="0" placeholder="100.00" value={amountDeposited} onChange={(e) => setAmountDeposited(e.target.value)} />
                  </div>
                </div>
              ) : (
                <>
                  <div className="grid gap-3 sm:grid-cols-2">
                    <div>
                      <Label className="mb-1 block text-xs text-blue-600">Date Received *</Label>
                      <Input type="date" value={installmentDate} onChange={(e) => setInstallmentDate(e.target.value)} />
                    </div>
                    <div>
                      <Label className="mb-1 block text-xs text-blue-600">Amount ($) *</Label>
                      <Input type="number" step="0.01" min="0" placeholder="100.00" value={installmentAmount} onChange={(e) => setInstallmentAmount(e.target.value)} />
                    </div>
                  </div>
                  <Button
                    size="sm"
                    variant="outline"
                    className="mt-3"
                    disabled={!installmentDate || !installmentAmount || isAddingInstallment}
                    onClick={handleAddInstallment}
                  >
                    {isAddingInstallment ? "Adding..." : "+ Add Installment"}
                  </Button>
                </>
              )}
            </div>
          </div>
        )}

        <Button
          size="sm"
          disabled={
            isSavingStatus ||
            (selectedStatus === "fully_paid" && (!paymentDate || !amountDeposited)) ||
            (selectedStatus === "partial_payment" && existingPayments.length === 0 && (!paymentDate || !amountDeposited))
          }
          onClick={handleSaveStatus}
        >
          <Save className="mr-1 h-3 w-3" />
          {isSavingStatus ? "Saving..." : "Save Status"}
        </Button>

        {/* Delete */}
        <div className="mt-4 border-t pt-4">
          {!showDeleteConfirm ? (
            <Button variant="outline" size="sm" className="text-red-600 hover:bg-red-50 hover:text-red-700" onClick={() => setShowDeleteConfirm(true)}>
              <Trash2 className="mr-1 h-3 w-3" />Delete Registration
            </Button>
          ) : (
            <div className="rounded-lg border border-red-200 bg-red-50 p-4 dark:border-red-900 dark:bg-red-950">
              <p className="text-sm font-semibold text-red-800 dark:text-red-200">
                Are you sure you want to delete this registration?
              </p>
              <p className="mt-1 text-xs text-red-600 dark:text-red-400">
                This will permanently remove {registration.full_name} ({registration.confirmation_code}). This action cannot be undone.
              </p>
              <div className="mt-3 flex gap-2">
                <Button size="sm" variant="destructive" disabled={isDeleting} onClick={handleDelete}>
                  {isDeleting ? "Deleting..." : "Yes, Delete"}
                </Button>
                <Button variant="ghost" size="sm" onClick={() => setShowDeleteConfirm(false)}>Cancel</Button>
              </div>
            </div>
          )}
        </div>
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

function ReminderButton({ registrationId }: { registrationId: string }) {
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");

  async function handleSend(e: React.MouseEvent) {
    e.stopPropagation();
    setStatus("sending");
    const result = await sendPaymentReminder(registrationId);
    setStatus(result.error ? "error" : "sent");
    if (!result.error) {
      setTimeout(() => setStatus("idle"), 3000);
    }
  }

  if (status === "sent") {
    return <span className="text-xs text-green-500">Sent!</span>;
  }

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={handleSend}
      disabled={status === "sending"}
      title="Send payment reminder email"
    >
      <Mail className={`h-4 w-4 ${status === "error" ? "text-red-500" : "text-amber-500"}`} />
    </Button>
  );
}
