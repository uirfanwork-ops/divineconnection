import { redirect } from "next/navigation";
import { getAdminUser } from "@/lib/admin";
import { AdminSidebar } from "@/components/admin/sidebar";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  let admin;
  try {
    admin = await getAdminUser();
  } catch {
    admin = null;
  }

  if (!admin) {
    redirect("/admin-login");
  }

  return (
    <div className="flex min-h-screen">
      <AdminSidebar admin={admin} />
      <main className="theme-admin flex-1 overflow-auto p-6 lg:p-8">
        {children}
      </main>
    </div>
  );
}
