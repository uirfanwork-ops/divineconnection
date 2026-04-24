"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  LayoutDashboard,
  Users,
  Receipt,
  FileText,
  Settings,
  LogOut,
} from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import { cn } from "@/lib/utils";
import type { AdminUser } from "@/lib/admin";

const navItems = [
  { label: "Dashboard", href: "/admin", icon: LayoutDashboard, adminOnly: false },
  { label: "Registrations", href: "/admin/registrations", icon: Users, adminOnly: false },
  { label: "Receipts", href: "/admin/receipts", icon: Receipt, adminOnly: false },
  { label: "Documents", href: "/admin/documents", icon: FileText, adminOnly: false },
  { label: "Settings", href: "/admin/settings", icon: Settings, adminOnly: true },
];

export function AdminSidebar({ admin }: { admin: AdminUser }) {
  const pathname = usePathname();
  const router = useRouter();
  const isSuperAdmin = admin.role === "super_admin";

  async function handleSignOut() {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push("/admin-login");
    router.refresh();
  }

  const visibleItems = navItems.filter(
    (item) => !item.adminOnly || isSuperAdmin
  );

  return (
    <aside className="flex w-64 flex-col border-r bg-card">
      <div className="border-b p-4">
        <h2 className="text-lg font-bold text-primary">DC Admin</h2>
        <p className="text-xs text-muted-foreground">
          {admin.displayName ?? admin.email}
        </p>
        <span className="mt-1 inline-block rounded-full bg-primary/10 px-2 py-0.5 text-xs font-medium text-primary">
          {admin.role === "super_admin" ? "Admin" : "Employee"}
        </span>
      </div>

      <nav className="flex-1 space-y-1 p-3">
        {visibleItems.map((item) => {
          const isActive =
            item.href === "/admin"
              ? pathname === "/admin"
              : pathname.startsWith(item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors",
                isActive
                  ? "bg-primary/10 text-primary"
                  : "text-muted-foreground hover:bg-muted hover:text-foreground"
              )}
            >
              <item.icon className="h-4 w-4" />
              {item.label}
            </Link>
          );
        })}
      </nav>

      <div className="border-t p-3">
        <button
          onClick={handleSignOut}
          className="flex w-full items-center gap-3 rounded-md px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
        >
          <LogOut className="h-4 w-4" />
          Sign Out
        </button>
      </div>
    </aside>
  );
}
