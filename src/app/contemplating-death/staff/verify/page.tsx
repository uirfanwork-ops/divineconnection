import type { Metadata } from "next";
import { completeStaffSignIn } from "@/lib/contemplating-death/staff-actions";
import { safeNextPath } from "@/lib/contemplating-death/staff";

export const dynamic = "force-dynamic";
export const metadata: Metadata = {
  title: "Confirm sign-in | Contemplating Death",
  robots: { index: false, follow: false },
};

/**
 * The link is only used when the button is pressed. Email security scanners
 * open links automatically, and would otherwise burn the one-time link.
 */
export default function VerifyPage({
  searchParams,
}: {
  searchParams: { token?: string; next?: string };
}) {
  return (
    <main className="cd-page">
      <div className="cd-card">
        <p className="eyebrow">Contemplating Death staff</p>
        <h1>Finish signing in</h1>
        <p>This keeps you signed in on this device for 30 days.</p>
        <form action={completeStaffSignIn}>
          <input type="hidden" name="token" value={searchParams.token ?? ""} />
          <input
            type="hidden"
            name="next"
            value={safeNextPath(searchParams.next)}
          />
          <div className="cd-actions">
            <button type="submit" className="button button-dark">
              Sign in
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}
