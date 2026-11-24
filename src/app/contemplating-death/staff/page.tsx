import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { StaffLoginForm } from "@/components/contemplating-death/staff-login-form";
import { getCdStaff, safeNextPath } from "@/lib/contemplating-death/staff";

export const dynamic = "force-dynamic";
export const metadata: Metadata = {
  title: "Staff sign-in | Contemplating Death",
  robots: { index: false, follow: false },
};

export default async function StaffLoginPage({
  searchParams,
}: {
  searchParams: { next?: string; error?: string };
}) {
  const next = safeNextPath(searchParams.next);
  if (await getCdStaff()) redirect(next);

  return (
    <main className="cd-page">
      <div className="cd-card">
        <p className="eyebrow">Contemplating Death</p>
        <h1>Staff sign-in</h1>
        {searchParams.error === "link" ? (
          <p className="cd-banner" data-tone="error">
            That sign-in link has expired or was already used. Request a new one
            below.
          </p>
        ) : null}
        <p>Enter your email and we will send you a sign-in link.</p>
        <StaffLoginForm next={next} />
      </div>
    </main>
  );
}
