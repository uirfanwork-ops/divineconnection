import { createClient } from "@/lib/supabase/server";
import { ReceiptsManager } from "@/components/admin/receipts-manager";

export default async function ReceiptsPage() {
  const supabase = await createClient();

  const { data: receipts } = await supabase
    .from("receipts")
    .select("*")
    .order("created_at", { ascending: false })
    .limit(100);

  return (
    <div>
      <h1 className="text-2xl font-bold text-foreground">Receipt Tracker</h1>
      <p className="mt-1 text-sm text-muted-foreground">
        Upload, process, and manage e-Transfer receipts.
      </p>
      <div className="mt-6">
        <ReceiptsManager receipts={receipts ?? []} />
      </div>
    </div>
  );
}
