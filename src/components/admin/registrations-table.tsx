"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { SelectNative } from "@/components/ui/select-native";
import { formatCents } from "@/lib/utils";
import {
  updateRegistrationStatus,
  updatePaymentStatus,
  exportRegistrationsCsv,
} from "@/app/admin/registrations/actions";
import type { Database, RegistrationStatus, PaymentStatus } from "@/types/database";
import { Search, Download, ChevronLeft, ChevronRight, X } from "lucide-react";

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

  async function handleStatusChange(
    id: string,
    status: RegistrationStatus
  ) {
    await updateRegistrationStatus(id, status);
    router.refresh();
  }

  async function handlePaymentChange(
    id: string,
    paymentStatus: PaymentStatus
  ) {
    await updatePaymentStatus(id, paymentStatus);
    router.refresh();
    if (selectedRow?.id === id) {
      setSelectedRow({ ...selectedRow, payment_status: paymentStatus });
    }
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
        <Button
          variant={!paymentFilter && !statusFilter ? "default" : "outline"}
          size="sm"
          onClick={() => updateParams({ payment: "", status: "", page: "" })}
        >
          All
        </Button>
        <Button
          variant={paymentFilter === "pending" ? "default" : "outline"}
          size="sm"
          onClick={() => updateParams({ payment: "pending", status: "", page: "" })}
        >
          Unpaid
        </Button>
        <Button
          variant={paymentFilter === "completed" ? "default" : "outline"}
          size="sm"
          onClick={() => updateParams({ payment: "completed", status: "", page: "" })}
        >
          Paid
        </Button>
        <Button
          variant={statusFilter === "confirmed" ? "default" : "outline"}
          size="sm"
          onClick={() => updateParams({ status: "confirmed", payment: "", page: "" })}
        >
          Confirmed
        </Button>
        <Button
          variant={statusFilter === "cancelled" ? "default" : "outline"}
          size="sm"
          onClick={() => updateParams({ status: "cancelled", payment: "", page: "" })}
        >
          Cancelled
        </Button>
      </div>

      {/* Search and Filters */}
      <div className="flex flex-wrap items-end gap-3">
        <form onSubmit={handleSearch} className="flex items-center gap-2">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search name, email, phone..."
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              className="w-64 pl-9"
            />
          </div>
          <Button type="submit" variant="outline" size="sm">
            Search
          </Button>
          {search && (
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={() => {
                setSearchInput("");
                updateParams({ search: "" });
              }}
            >
              <X className="h-4 w-4" />
            </Button>
          )}
        </form>

        <SelectNative
          value={statusFilter}
          onChange={(e) =>
            updateParams({ status: e.target.value, page: "" })
          }
          className="w-40"
        >
          <option value="">All statuses</option>
          <option value="pending">Pending</option>
          <option value="confirmed">Confirmed</option>
          <option value="cancelled">Cancelled</option>
          <option value="refunded">Refunded</option>
          <option value="waitlisted">Waitlisted</option>
        </SelectNative>

        <SelectNative
          value={paymentFilter}
          onChange={(e) =>
            updateParams({ payment: e.target.value, page: "" })
          }
          className="w-40"
        >
          <option value="">All payments</option>
          <option value="pending">Pending</option>
          <option value="completed">Completed</option>
          <option value="failed">Failed</option>
          <option value="refunded">Refunded</option>
        </SelectNative>

        <Button variant="outline" size="sm" onClick={handleExport}>
          <Download className="mr-1 h-4 w-4" />
          CSV
        </Button>
      </div>

      {/* Table */}
      <div className="overflow-x-auto rounded-lg border bg-card">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b bg-muted/50">
              <th className="px-4 py-3 text-left font-medium text-muted-foreground">
                Code
              </th>
              <th className="px-4 py-3 text-left font-medium text-muted-foreground">
                Name
              </th>
              <th className="hidden px-4 py-3 text-left font-medium text-muted-foreground md:table-cell">
                Email
              </th>
              <th className="px-4 py-3 text-left font-medium text-muted-foreground">
                Status
              </th>
              <th className="px-4 py-3 text-left font-medium text-muted-foreground">
                Payment
              </th>
              <th className="px-4 py-3 text-right font-medium text-muted-foreground">
                Amount
              </th>
              <th className="hidden px-4 py-3 text-left font-medium text-muted-foreground lg:table-cell">
                Date
              </th>
            </tr>
          </thead>
          <tbody>
            {registrations.length === 0 ? (
              <tr>
                <td
                  colSpan={7}
                  className="px-4 py-8 text-center text-muted-foreground"
                >
                  No registrations found.
                </td>
              </tr>
            ) : (
              registrations.map((reg) => (
                <tr
                  key={reg.id}
                  className={`cursor-pointer border-b last:border-0 hover:bg-muted/30 ${
                    reg.payment_status === "pending"
                      ? "bg-amber-500/5"
                      : reg.payment_status === "completed"
                        ? "bg-green-500/5"
                        : ""
                  }`}
                  onClick={() =>
                    setSelectedRow(selectedRow?.id === reg.id ? null : reg)
                  }
                >
                  <td className="px-4 py-3 font-mono text-xs font-bold text-foreground">
                    {reg.confirmation_code}
                  </td>
                  <td className="px-4 py-3 font-medium text-foreground">
                    {reg.full_name}
                  </td>
                  <td className="hidden px-4 py-3 text-muted-foreground md:table-cell">
                    {reg.email}
                  </td>
                  <td className="px-4 py-3">
                    <Badge
                      variant={
                        reg.status === "confirmed"
                          ? "default"
                          : reg.status === "cancelled"
                            ? "destructive"
                            : "outline"
                      }
                      className="text-xs"
                    >
                      {reg.status}
                    </Badge>
                  </td>
                  <td className="px-4 py-3">
                    <Badge
                      variant={
                        reg.payment_status === "completed"
                          ? "default"
                          : reg.payment_status === "failed"
                            ? "destructive"
                            : "outline"
                      }
                      className="text-xs"
                    >
                      {reg.payment_status === "pending" ? "UNPAID" : reg.payment_status === "completed" ? "PAID" : reg.payment_status}
                    </Badge>
                  </td>
                  <td className="px-4 py-3 text-right font-medium">
                    {formatCents(reg.amount_cents, reg.currency)}
                  </td>
                  <td className="hidden px-4 py-3 text-muted-foreground lg:table-cell">
                    {new Date(reg.created_at).toLocaleDateString()}
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
          onStatusChange={handleStatusChange}
          onPaymentChange={handlePaymentChange}
          onClose={() => setSelectedRow(null)}
        />
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between">
          <p className="text-sm text-muted-foreground">
            Showing {(currentPage - 1) * 25 + 1} to{" "}
            {Math.min(currentPage * 25, totalCount)} of {totalCount}
          </p>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              disabled={currentPage <= 1}
              onClick={() =>
                updateParams({ page: String(currentPage - 1) })
              }
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <span className="text-sm text-muted-foreground">
              Page {currentPage} of {totalPages}
            </span>
            <Button
              variant="outline"
              size="sm"
              disabled={currentPage >= totalPages}
              onClick={() =>
                updateParams({ page: String(currentPage + 1) })
              }
            >
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
  onStatusChange,
  onPaymentChange,
  onClose,
}: {
  registration: Registration;
  onStatusChange: (id: string, status: RegistrationStatus) => Promise<void>;
  onPaymentChange: (id: string, status: PaymentStatus) => Promise<void>;
  onClose: () => void;
}) {
  return (
    <div className="rounded-lg border bg-card p-6 shadow-sm">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold">{registration.full_name}</h3>
          <p className="font-mono text-sm font-bold text-muted-foreground">
            Code: {registration.confirmation_code}
          </p>
        </div>
        <Button variant="ghost" size="sm" onClick={onClose}>
          <X className="h-4 w-4" />
        </Button>
      </div>

      <dl className="mt-4 grid gap-3 text-sm sm:grid-cols-2">
        <div>
          <dt className="text-muted-foreground">Email</dt>
          <dd className="font-medium">{registration.email}</dd>
        </div>
        <div>
          <dt className="text-muted-foreground">Phone</dt>
          <dd className="font-medium">{registration.phone}</dd>
        </div>
        <div>
          <dt className="text-muted-foreground">Amount</dt>
          <dd className="font-medium">
            {formatCents(registration.amount_cents, registration.currency)}{" "}
            {registration.currency}
          </dd>
        </div>
        <div>
          <dt className="text-muted-foreground">Gender</dt>
          <dd className="font-medium">
            {registration.gender ?? "N/A"}
          </dd>
        </div>
        <div>
          <dt className="text-muted-foreground">Date of Birth</dt>
          <dd className="font-medium">
            {registration.date_of_birth ?? "N/A"}
          </dd>
        </div>
        <div>
          <dt className="text-muted-foreground">Emergency Contact</dt>
          <dd className="font-medium">
            {registration.emergency_contact_name ?? "N/A"}
            {registration.emergency_contact_phone
              ? ` (${registration.emergency_contact_phone})`
              : ""}
          </dd>
        </div>
        {registration.dietary_restrictions && (
          <div className="sm:col-span-2">
            <dt className="text-muted-foreground">Dietary Restrictions</dt>
            <dd className="font-medium">
              {registration.dietary_restrictions}
            </dd>
          </div>
        )}
        {registration.allergies && (
          <div className="sm:col-span-2">
            <dt className="text-muted-foreground">Allergies</dt>
            <dd className="font-medium">{registration.allergies}</dd>
          </div>
        )}
        {registration.medical_conditions && (
          <div className="sm:col-span-2">
            <dt className="text-muted-foreground">Medical Conditions</dt>
            <dd className="font-medium">{registration.medical_conditions}</dd>
          </div>
        )}
        {registration.admin_notes && (
          <div className="sm:col-span-2">
            <dt className="text-muted-foreground">Admin Notes</dt>
            <dd className="whitespace-pre-wrap font-medium">
              {registration.admin_notes}
            </dd>
          </div>
        )}
      </dl>

      <div className="mt-6 flex flex-wrap gap-3">
        <div>
          <label className="mb-1 block text-xs font-medium text-muted-foreground">
            Update Status
          </label>
          <SelectNative
            value={registration.status}
            onChange={(e) =>
              onStatusChange(
                registration.id,
                e.target.value as RegistrationStatus
              )
            }
            className="w-36"
          >
            <option value="pending">Pending</option>
            <option value="confirmed">Confirmed</option>
            <option value="cancelled">Cancelled</option>
            <option value="refunded">Refunded</option>
            <option value="waitlisted">Waitlisted</option>
          </SelectNative>
        </div>
        <div>
          <label className="mb-1 block text-xs font-medium text-muted-foreground">
            Payment Status
          </label>
          <SelectNative
            value={registration.payment_status}
            onChange={(e) =>
              onPaymentChange(
                registration.id,
                e.target.value as PaymentStatus
              )
            }
            className="w-36"
          >
            <option value="pending">Unpaid</option>
            <option value="completed">Paid</option>
            <option value="failed">Failed</option>
            <option value="refunded">Refunded</option>
          </SelectNative>
        </div>
      </div>
    </div>
  );
}
