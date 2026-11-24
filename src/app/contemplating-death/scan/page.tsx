import type { Metadata } from "next";
import Link from "next/link";
import { getAdminUser } from "@/lib/admin";
import { Scanner } from "@/components/contemplating-death/scanner";

export const dynamic = "force-dynamic";
export const metadata: Metadata = {
  title: "Ticket scanner | Contemplating Death",
  robots: { index: false, follow: false },
};

export default async function ScanPage() {
  const admin = await getAdminUser();

  if (!admin) {
    return (
      <main className="cd-page">
        <div className="cd-card">
          <p className="eyebrow">Ticket scanner</p>
          <h1>Staff sign-in required</h1>
          <p>Sign in to scan tickets at the door.</p>
          <Link
            className="button button-dark"
            href="/admin-login?next=/contemplating-death/scan"
          >
            Staff sign-in
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="cd-page cd-scan-page">
      <div className="cd-scan">
        <div className="cd-scan-head">
          <div>
            <p className="eyebrow">Contemplating Death</p>
            <h1>Ticket scanner</h1>
          </div>
          <Link className="cd-scan-link" href="/admin/contemplating-death">
            Attendee list
          </Link>
        </div>
        <Scanner />
        <p className="cd-scan-foot">Signed in as {admin.email}</p>
      </div>
    </main>
  );
}
