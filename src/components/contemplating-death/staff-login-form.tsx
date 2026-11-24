"use client";

import { useState, useTransition } from "react";
import {
  requestStaffLink,
  type StaffFormResult,
} from "@/lib/contemplating-death/staff-actions";

export function StaffLoginForm({ next }: { next: string }) {
  const [email, setEmail] = useState("");
  const [pending, startTransition] = useTransition();
  const [result, setResult] = useState<StaffFormResult | null>(null);

  return (
    <form
      className="cd-staff-form"
      onSubmit={(event) => {
        event.preventDefault();
        startTransition(async () => {
          try {
            setResult(await requestStaffLink(email, next));
          } catch {
            setResult({
              ok: false,
              message: "We could not reach the server. Please try again.",
            });
          }
        });
      }}
    >
      <label htmlFor="staff-email">Email address</label>
      <input
        id="staff-email"
        type="email"
        required
        autoComplete="email"
        value={email}
        onChange={(event) => setEmail(event.target.value)}
      />
      <button type="submit" className="button button-dark" disabled={pending}>
        {pending ? "Sending…" : "Email me a sign-in link"}
      </button>
      {result ? (
        <p
          className="cd-banner"
          role="status"
          data-tone={result.ok ? "note" : "error"}
        >
          {result.message}
        </p>
      ) : null}
    </form>
  );
}
