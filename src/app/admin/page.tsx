export const dynamic = "force-dynamic";

import {
  Users,
  CheckCircle2,
  Clock,
  XCircle,
  DollarSign,
  Ticket,
  UserCheck,
} from "lucide-react";
import { createServiceClient } from "@/lib/supabase/service";
import { formatCents } from "@/lib/utils";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";

const MAX_SEATS = 45;

async function getDashboardData() {
  const supabase = createServiceClient();

  const { data: registrations } = await supabase
    .from("registrations")
    .select("id, status, payment_status, amount_cents, currency, admin_notes")
    .order("created_at", { ascending: false });

  const rows = registrations ?? [];

  const staffGuest = rows.filter((r) => r.status === "waitlisted").length;
  const paid = rows.filter((r) => r.payment_status === "completed" && r.status !== "waitlisted").length;
  const cancelled = rows.filter(
    (r) => r.status === "cancelled" || r.status === "refunded"
  ).length;
  const partialPayment = rows.filter(
    (r) => r.status === "confirmed" && r.payment_status === "pending"
  ).length;
  const pendingPayment = rows.filter(
    (r) => r.payment_status === "pending" && r.status !== "cancelled" && r.status !== "refunded" && r.status !== "confirmed" && r.status !== "waitlisted"
  ).length;

  const fullRevenueCents = rows
    .filter((r) => r.payment_status === "completed" && r.status !== "waitlisted")
    .reduce((sum, r) => sum + r.amount_cents, 0);

  const partialRevenueCents = rows
    .filter((r) => r.status === "confirmed" && r.payment_status === "pending" && r.admin_notes)
    .reduce((sum, r) => {
      const re = /Payment: \$(\d+(?:\.\d+)?)/g;
      let m: RegExpExecArray | null;
      let total = 0;
      while ((m = re.exec(r.admin_notes ?? "")) !== null) {
        total += Math.round(parseFloat(m[1]) * 100);
      }
      return sum + total;
    }, 0);

  const seatsTaken = paid + partialPayment;

  const { data: recent } = await supabase
    .from("registrations")
    .select("id, full_name, email, status, payment_status, amount_cents, currency, created_at")
    .order("created_at", { ascending: false })
    .limit(10);

  return {
    kpi: {
      totalRegistrations: rows.length,
      paid,
      pendingPayment,
      staffGuest,
      cancelled,
      partialPayment,
      revenueCents: fullRevenueCents + partialRevenueCents,
      seatsRemaining: Math.max(0, MAX_SEATS - seatsTaken),
    },
    recentRegistrations: recent ?? [],
  };
}

export default async function AdminDashboardPage() {
  const { kpi, recentRegistrations } = await getDashboardData();

  const kpiCards = [
    { title: "Total Registrations", value: kpi.totalRegistrations, icon: Users, color: "text-blue-600" },
    { title: "Fully Paid", value: kpi.paid, icon: CheckCircle2, color: "text-green-600" },
    { title: "Pending Payment", value: kpi.pendingPayment, icon: Clock, color: "text-amber-600" },
    { title: "Partial Payment", value: kpi.partialPayment, icon: DollarSign, color: "text-orange-600" },
    { title: "Cancelled / Refunded", value: kpi.cancelled, icon: XCircle, color: "text-red-600" },
    { title: "Staff / Guest", value: kpi.staffGuest, icon: UserCheck, color: "text-purple-600" },
    { title: "Revenue", value: formatCents(kpi.revenueCents, "CAD"), icon: DollarSign, color: "text-emerald-600" },
    { title: "Seats Remaining", value: `${kpi.seatsRemaining} / ${MAX_SEATS}`, icon: Ticket, color: "text-sky-600" },
  ];

  return (
    <div>
      <h1 className="text-2xl font-bold text-foreground">Dashboard</h1>
      <p className="mt-1 text-sm text-muted-foreground">
        Overview of retreat registrations and payments.
      </p>

      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {kpiCards.map((card) => (
          <Card key={card.title}>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">{card.title}</CardTitle>
              <card.icon className={`h-4 w-4 ${card.color}`} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">{card.value}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="mt-8">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-foreground">Recent Registrations</h2>
          <Link href="/admin/registrations" className="text-sm text-primary hover:underline">View all</Link>
        </div>

        <div className="mt-4 overflow-hidden rounded-lg border bg-card">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b bg-muted/50">
                <th className="px-4 py-3 text-left font-medium text-muted-foreground">Name</th>
                <th className="hidden px-4 py-3 text-left font-medium text-muted-foreground md:table-cell">Email</th>
                <th className="px-4 py-3 text-left font-medium text-muted-foreground">Payment</th>
                <th className="px-4 py-3 text-right font-medium text-muted-foreground">Amount</th>
              </tr>
            </thead>
            <tbody>
              {recentRegistrations.length === 0 ? (
                <tr><td colSpan={4} className="px-4 py-8 text-center text-muted-foreground">No registrations yet.</td></tr>
              ) : (
                recentRegistrations.map((reg) => (
                  <tr key={reg.id} className="border-b last:border-0">
                    <td className="px-4 py-3 font-medium text-foreground">{reg.full_name}</td>
                    <td className="hidden px-4 py-3 text-muted-foreground md:table-cell">{reg.email}</td>
                    <td className="px-4 py-3">
                      <Badge
                        variant={reg.payment_status === "completed" ? "default" : "outline"}
                        className="text-xs"
                      >
                        {reg.payment_status === "completed" ? "PAID" : "UNPAID"}
                      </Badge>
                    </td>
                    <td className="px-4 py-3 text-right font-medium">{formatCents(reg.amount_cents, reg.currency)}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
