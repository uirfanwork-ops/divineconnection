"use client";

import { useEffect, useState } from "react";
import { startCheckout } from "@/app/contemplating-death/actions";
import { cdEvent, cdSourceOptions } from "../../../content/contemplating-death";

type Status = { tone: "note" | "error"; text: string } | null;

function YesNo({
  name,
  legend,
  error,
  wide,
}: {
  name: string;
  legend: string;
  error?: string;
  wide?: boolean;
}) {
  return (
    <fieldset className={wide ? "question field-wide" : "question"}>
      <legend>{legend}</legend>
      <label>
        <input type="radio" name={name} value="yes" required /> Yes
      </label>
      <label>
        <input type="radio" name={name} value="no" /> No
      </label>
      {error ? <span className="field-error">{error}</span> : null}
    </fieldset>
  );
}

export function RegistrationForm({ open }: { open: boolean }) {
  const [pending, setPending] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<Status>(
    open
      ? null
      : { tone: "note", text: "Online registration is currently closed." }
  );

  useEffect(() => {
    if (!open) return;
    if (
      new URLSearchParams(window.location.search).get("payment") === "cancelled"
    ) {
      setStatus({
        tone: "note",
        text: "Your payment was not completed, so no ticket was issued. You can register again whenever you are ready.",
      });
    }
    // If the visitor comes back from Stripe with the back button, unlock the form.
    const onPageShow = () => setPending(false);
    window.addEventListener("pageshow", onPageShow);
    return () => window.removeEventListener("pageshow", onPageShow);
  }, [open]);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (pending || !open) return;

    setPending(true);
    setErrors({});
    setStatus(null);

    const form = new FormData(event.currentTarget);
    const payload = Object.fromEntries(
      Array.from(form.entries()).map(([key, value]) => [key, String(value)])
    );

    try {
      const result = await startCheckout(payload);
      if (result.ok && result.url) {
        window.location.assign(result.url);
        return;
      }
      setErrors(result.fieldErrors ?? {});
      setStatus({
        tone: "error",
        text: result.error ?? "Something went wrong. Please try again.",
      });
    } catch {
      setStatus({
        tone: "error",
        text: `We could not reach the server. Check your connection and try again, or email ${cdEvent.contactEmail}.`,
      });
    }
    setPending(false);
  }

  return (
    <>
      {status ? (
        <p className="form-status" role="status" data-tone={status.tone}>
          {status.text}
        </p>
      ) : null}
      <noscript>
        <p className="form-status">Enable JavaScript to register online.</p>
      </noscript>
      <form onSubmit={handleSubmit} noValidate={false}>
        <fieldset className="form-fields" disabled={!open || pending}>
          <legend className="sr-only">
            Attendee details and event questions
          </legend>
          <div className="form-grid">
            <label>
              Full name
              <input
                name="name"
                type="text"
                required
                minLength={2}
                maxLength={120}
                autoComplete="name"
                aria-invalid={errors.name ? true : undefined}
              />
              {errors.name ? (
                <span className="field-error">{errors.name}</span>
              ) : null}
            </label>
            <label>
              Email address
              <input
                name="email"
                type="email"
                required
                maxLength={254}
                autoComplete="email"
                aria-invalid={errors.email ? true : undefined}
              />
              {errors.email ? (
                <span className="field-error">{errors.email}</span>
              ) : null}
            </label>
            <label>
              Phone number <span className="optional">(optional)</span>
              <input
                name="phone"
                type="tel"
                maxLength={40}
                autoComplete="tel"
              />
              {errors.phone ? (
                <span className="field-error">{errors.phone}</span>
              ) : null}
            </label>
            <label>
              How did you hear about this event?
              <select
                name="source"
                required
                defaultValue=""
                aria-invalid={errors.source ? true : undefined}
              >
                <option value="" disabled>
                  Select one
                </option>
                {cdSourceOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
              {errors.source ? (
                <span className="field-error">{errors.source}</span>
              ) : null}
            </label>
            <YesNo
              name="heardOfMathabah"
              legend="Have you heard of Mathabah Learning Centre before?"
              error={errors.heardOfMathabah}
            />
            <YesNo
              name="attendedMathabah"
              legend="Have you attended a Mathabah event or program before?"
              error={errors.attendedMathabah}
            />
            <label className="field-wide">
              What interested you in attending this event?{" "}
              <span className="optional">(optional)</span>
              <textarea name="interest" rows={2} maxLength={1000} />
            </label>
            <label className="field-wide">
              Do you have any accessibility requirements we should be aware of?{" "}
              <span className="optional">(optional)</span>
              <textarea name="accessibility" rows={2} maxLength={1000} />
            </label>
            <YesNo
              name="updates"
              legend="Would you like updates about future Mathabah events and programs?"
              error={errors.updates}
              wide
            />
          </div>
          <div className="hp" aria-hidden="true">
            {/* Bot trap. The odd name and label keep browser autofill from filling it. */}
            <label>
              Leave this field empty
              <input
                name="cd_confirm_blank"
                type="text"
                tabIndex={-1}
                autoComplete="off"
                data-1p-ignore
                data-lpignore="true"
                data-form-type="other"
              />
            </label>
          </div>
          <p className="payment-note">
            <svg viewBox="0 0 16 16" fill="none" aria-hidden="true">
              <rect
                x="3"
                y="7"
                width="10"
                height="7"
                rx="1.5"
                stroke="currentColor"
                strokeWidth="1.3"
              />
              <path
                d="M5.5 7V5a2.5 2.5 0 0 1 5 0v2"
                stroke="currentColor"
                strokeWidth="1.3"
              />
            </svg>
            You’ll complete payment on Stripe’s secure checkout.
          </p>
          <button className="button button-dark pay-button" type="submit">
            {pending ? "Opening secure checkout…" : "Continue to payment"}
            {pending ? null : (
              <span className="arrow" aria-hidden="true">
                →
              </span>
            )}
          </button>
        </fieldset>
      </form>
    </>
  );
}
