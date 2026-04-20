import {
  Users,
  CheckCircle2,
  Clock,
  XCircle,
  RotateCcw,
  DollarSign,
  Ticket,
} from "lucide-react";
import { createClient } from "@/lib/supabase/server";
import { formatCents } from "@/lib/utils";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";

interface KpiData {
  totalRegistrations: number;
  paid: number;
  pending: number;
  cancelled: number;
  refunded: number;
  revenueCents: number;
  seatsRemaining: number;
}

async function getDashboardData(): Promise<{
  kpi: KpiData;
  recentRegistrations: Array<{
    id: string;
    full_name: string;
    email: string;
    status: string;
    payment_status: string;
    amount_cents: number;
    currency: string;
    created_at: string;
  }>;
}> {
  const supabase = await createClient();

  const { data: registrations } = await supabase
    .from("registrations")
    .select("id, status, payment_status, amount_cents")
    .order("created_at", { ascending: false });

  const rows = registrations ?? [];

  const paid = rows.filter((r) => r.payment_status === "completed").length;
  const pending = rows.filter((r) => r.payment_status === "pending").length;
  const cancelled = rows.filter((r) => r.status === "cancelled").length;
  const refunded = rows.filter((r) => r.status === "refunded").length;
  const revenueCents = rows
    .filter((r) => r.payment_status === "completed")
    .reduce((sum, r) => sum + r.amount_cents, 0);

  const { data: tiers } = await supabase
    .from("pricing_tiers")
    .select("max_spots, spots_taken")
    .eq("is_active", true);

  const totalCapacity = (tiers ?? []).reduce(
    (sum, t) => sum + (t.max_spots ?? 0),
    0
  );
  const totalTaken = (tiers ?? []).reduce((sum, t) => sum + t.spots_taken, 0);

  const { data: recent } = await supabase
    .from("registrations")
    .select(
      "id, full_name, email, status, payment_status, amount_cents, currency, created_at"
    )
    .order("created_at", { ascending: false })
    .limit(10);

  return {
    kpi: {
      totalRegistrations: rows.length,
      paid,
      pending,
      cancelled,
      refunded,
      revenueCents,
      seatsRemaining: totalCapacity - totalTaken,
    },
    recentRegistrations: recent ?? [],
  };
}

export default async function AdminDashboardPage() {
  const { kpi, recentRegistrations } = await getDashboardData();

  const kpiCards = [
    {
      title: "Total Registrations",
      value: kpi.totalRegistrations,
      icon: Users,
      color: "text-blue-600",
    },
    {
      title: "Paid",
      value: kpi.paid,
      icon: CheckCircle2,
      color: "text-green-600",
    },
    {
      title: "Pending Payment",
      value: kpi.pending,
      icon: Clock,
      color: "text-amber-600",
    },
    {
      title: "Cancelled",
      value: kpi.cancelled,
      icon: XCircle,
      color: "text-red-600",
    },
    {
      title: "Refunded",
      value: kpi.refunded,
      icon: RotateCcw,
      color: "text-purple-600",
    },
    {
      title: "Revenue",
      value: formatCents(kpi.revenueCents, "CAD"),
      icon: DollarSign,
      color: "text-emerald-600",
    },
    {
      title: "Seats Remaining",
      value: kpi.seatsRemaining,
      icon: Ticket,
      color: "text-sky-600",
    },
  ];

  return (
    <div>
      <h1 className="text-2xl font-bold text-foreground">Dashboard</h1>
      <p className="mt-1 text-sm text-muted-foreground">
        Overview of retreat registrations and payments.
      </p>

      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {kpiCards.map((card) => (
          <Card key={card.title}>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {card.title}
              </CardTitle>
              <card.icon className={`h-4 w-4 ${card.color}`} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">
                {card.value}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="mt-8">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-foreground">
            Recent Registrations
          </h2>
          <Link
            href="/admin/registrations"
            className="text-sm text-primary hover:underline"
          >
            View all
          </Link>
        </div>

        <div className="mt-4 overflow-hidden rounded-lg border bg-card">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b bg-muted/50">
                <th className="px-4 py-3 text-left font-medium text-muted-foreground">
                  Name
                </th>
                <th className="hidden px-4 py-3 text-left font-medium text-muted-foreground md:table-cell">
                  Email
                </th>
                <th className="px-4 py-3 text-left font-medium text-muted-foreground">
                  Status
                </th>
                <th className="px-4 py-3 text-right font-medium text-muted-foreground">
                  Amount
                </th>
              </tr>
            </thead>
            <tbody>
              {recentRegistrations.length === 0 ? (
                <tr>
                  <td
                    colSpan={4}
                    className="px-4 py-8 text-center text-muted-foreground"
                  >
                    No registrations yet.
                  </td>
                </tr>
              ) : (
                recentRegistrations.map((reg) => (
                  <tr key={reg.id} className="border-b last:border-0">
                    <td className="px-4 py-3 font-medium text-foreground">
                      {reg.full_name}
                    </td>
                    <td className="hidden px-4 py-3 text-muted-foreground md:table-cell">
                      {reg.email}
                    </td>
                    <td className="px-4 py-3">
                      <StatusBadge status={reg.payment_status} />
                    </td>
                    <td className="px-4 py-3 text-right font-medium">
                      {formatCents(reg.amount_cents, reg.currency)}
                    </td>
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

function StatusBadge({ status }: { status: string }) {
  const variants: Record<string, "default" | "secondary" | "destructive" | "outline"> = {
    completed: "default",
    pending: "outline",
    failed: "destructive",
    refunded: "secondary",
  };
  return (
    <Badge variant={variants[status] ?? "outline"} className="text-xs">
      {status}
    </Badge>
  );
}
