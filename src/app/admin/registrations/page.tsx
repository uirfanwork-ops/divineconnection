export const dynamic = "force-dynamic";

import { createServiceClient } from "@/lib/supabase/service";
import { RegistrationsTable } from "@/components/admin/registrations-table";
import type { RegistrationStatus, PaymentStatus } from "@/types/database";

interface RegistrationsPageProps {
  searchParams: Promise<{
    page?: string;
    search?: string;
    status?: string;
    payment?: string;
  }>;
}

export default async function RegistrationsPage({
  searchParams,
}: RegistrationsPageProps) {
  const params = await searchParams;
  const page = Math.max(1, parseInt(params.page ?? "1", 10));
  const perPage = 25;
  const offset = (page - 1) * perPage;
  const search = params.search ?? "";
  const statusFilter = params.status ?? "";
  const paymentFilter = params.payment ?? "";

  const supabase = createServiceClient();

  let query = supabase
    .from("registrations")
    .select("*", { count: "exact" })
    .order("created_at", { ascending: false })
    .range(offset, offset + perPage - 1);

  if (search) {
    const s = search.replace(/[%_]/g, "");
    query = query.or(
      `full_name.ilike.%${s}%,email.ilike.%${s}%,phone.ilike.%${s}%,confirmation_code.ilike.%${s}%`
    );
  }

  if (statusFilter === "cancelled_refunded") {
    query = query.in("status", ["cancelled", "refunded"]);
  } else if (statusFilter) {
    query = query.eq("status", statusFilter as RegistrationStatus);
  }

  if (paymentFilter) {
    query = query.eq("payment_status", paymentFilter as PaymentStatus);
  }

  const { data, count, error } = await query;

  const totalPages = Math.ceil((count ?? 0) / perPage);

  return (
    <div>
      <h1 className="text-2xl font-bold text-foreground">Registrations</h1>
      <p className="mt-1 text-sm text-muted-foreground">
        Manage retreat registrations. {count ?? 0} total.
      </p>

      <div className="mt-6">
        <RegistrationsTable
          registrations={data ?? []}
          currentPage={page}
          totalPages={totalPages}
          totalCount={count ?? 0}
          search={search}
          statusFilter={statusFilter}
          paymentFilter={paymentFilter}
          error={error?.message}
        />
      </div>
    </div>
  );
}
