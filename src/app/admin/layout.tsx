import { redirect } from "next/navigation";
import { getAdminUser } from "@/lib/admin";
import { AdminSidebar } from "@/components/admin/sidebar";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const admin = await getAdminUser();

  if (!admin) {
    redirect("/admin/login");
  }

  return (
    <div className="flex min-h-screen">
      <AdminSidebar admin={admin} />
      <main className="flex-1 overflow-auto bg-muted/30 p-6 lg:p-8">
        {children}
      </main>
    </div>
  );
}
