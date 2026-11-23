"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import {
  checkInTicket,
  resendTicket,
  undoCheckIn,
  type StaffActionResult,
} from "@/lib/contemplating-death/check-in";

const actions = {
  checkIn: checkInTicket,
  undo: undoCheckIn,
  resend: resendTicket,
} as const;

export function StaffButton({
  action,
  token,
  children,
  className,
  confirmText,
}: {
  action: keyof typeof actions;
  token: string;
  children: React.ReactNode;
  className?: string;
  confirmText?: string;
}) {
  const router = useRouter();
  const [pending, startTransition] = useTransition();
  const [result, setResult] = useState<StaffActionResult | null>(null);

  return (
    <span>
      <button
        type="button"
        className={className}
        disabled={pending}
        onClick={() => {
          if (confirmText && !window.confirm(confirmText)) return;
          startTransition(async () => {
            const outcome = await actions[action](token);
            setResult(outcome);
            router.refresh();
          });
        }}
      >
        {pending ? "Working…" : children}
      </button>
      {result && !result.ok ? (
        <span
          role="alert"
          style={{
            display: "block",
            marginTop: 6,
            color: "#c0392b",
            fontSize: 13,
          }}
        >
          {result.message}
        </span>
      ) : null}
      {result && result.ok && action === "resend" ? (
        <span
          role="status"
          style={{ display: "block", marginTop: 6, fontSize: 13 }}
        >
          {result.message}
        </span>
      ) : null}
    </span>
  );
}
