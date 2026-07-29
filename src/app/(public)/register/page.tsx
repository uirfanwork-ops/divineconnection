import Link from "next/link";
import { RegistrationForm } from "@/components/registration-form";
import { REGISTRATIONS_CLOSED } from "@/lib/registration-status";
import { siteConfig } from "../../../../content/site-config";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: REGISTRATIONS_CLOSED
    ? `Sold Out - ${siteConfig.shortName}`
    : `Register - ${siteConfig.shortName}`,
  description: REGISTRATIONS_CLOSED
    ? `The ${siteConfig.name} retreat is sold out.`
    : `Register for the ${siteConfig.name} retreat, ${siteConfig.retreatDate} at ${siteConfig.retreatVenue}.`,
};

export default function RegisterPage() {
  return (
    <div className="bg-gradient-to-b from-[#0a1a0a] via-[#0d1f0d] to-[var(--bg-primary)] bg-topo py-16 md:py-20">
      <div className="container">
        <div className="mx-auto max-w-3xl">
          <div className="mb-12 text-center">
            <p className="label-gold">
              {REGISTRATIONS_CLOSED ? "Sold Out" : "Registration"}
            </p>
            <h1 className="font-heading mt-3 text-4xl font-bold uppercase tracking-wide text-[var(--text-primary)] md:text-5xl">
              {REGISTRATIONS_CLOSED ? "Registrations Closed" : "Secure Your Spot"}
            </h1>
            <p className="mt-4 text-sm uppercase tracking-[0.15em] text-[#d4c9a8]">
              {siteConfig.retreatDate} | {siteConfig.retreatVenue}
            </p>
            <p className="mt-1 text-xs text-[#d4c9a8]">
              {siteConfig.retreatAddress}
            </p>
            <div className="mx-auto mt-6 flex items-center justify-center gap-3">
              <div className="h-px w-12 bg-[var(--gold)]" />
              <div className="h-2 w-2 rotate-45 border border-[var(--gold)]" />
              <div className="h-px w-12 bg-[var(--gold)]" />
            </div>
            {!REGISTRATIONS_CLOSED && (
              <p className="mt-4 text-sm text-[var(--text-muted)]">
                Fields marked with{" "}
                <span className="font-semibold text-[var(--gold)]">*</span> are
                required.
              </p>
            )}
          </div>

          {REGISTRATIONS_CLOSED ? (
            <div className="rounded-md border border-red-400/50 bg-red-950/40 px-6 py-8 text-center backdrop-blur-sm">
              <p className="font-heading text-2xl font-bold uppercase tracking-wide text-red-200 md:text-3xl">
                Event Sold Out
              </p>
              <p className="mx-auto mt-4 max-w-xl text-sm leading-relaxed text-red-100 sm:text-base">
                This event has been sold out and registrations are now closed.
                For any inquiries, please email{" "}
                <a
                  href="mailto:events@mathabah.org"
                  className="underline underline-offset-2 hover:text-white"
                >
                  events@mathabah.org
                </a>
                .
              </p>
              <Link
                href="/"
                className="btn-outline-gold mt-8 inline-flex"
              >
                Back to Home
              </Link>
            </div>
          ) : (
            <div className="border border-[#e0d5c5] bg-[#faf6f0] p-6 md:p-10">
              <RegistrationForm mode="light" />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
