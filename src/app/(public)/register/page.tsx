import { RegistrationForm } from "@/components/registration-form";
import { siteConfig } from "../../../../content/site-config";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: `Register - ${siteConfig.shortName}`,
  description: `Register for the ${siteConfig.name} retreat, ${siteConfig.retreatDate} at ${siteConfig.retreatVenue}.`,
};

export default function RegisterPage() {
  return (
    <div className="bg-gradient-to-b from-[#0a1a0a] via-[#0d1f0d] to-[var(--bg-primary)] bg-topo py-16 md:py-20">
      <div className="container">
        <div className="mx-auto max-w-3xl">
          <div className="mb-12 text-center">
            <p className="label-gold">Registration</p>
            <h1 className="font-heading mt-3 text-4xl font-bold uppercase tracking-wide text-[var(--text-primary)] md:text-5xl">
              Secure Your Spot
            </h1>
            <p className="mt-4 text-sm uppercase tracking-[0.15em] text-[var(--text-muted)]">
              {siteConfig.retreatDate} | {siteConfig.retreatVenue}
            </p>
            <p className="mt-1 text-xs text-[var(--text-muted)]">
              {siteConfig.retreatAddress}
            </p>
            <div className="mx-auto mt-6 flex items-center justify-center gap-3">
              <div className="h-px w-12 bg-[var(--gold)]" />
              <div className="h-2 w-2 rotate-45 border border-[var(--gold)]" />
              <div className="h-px w-12 bg-[var(--gold)]" />
            </div>
            <p className="mt-4 text-sm text-[var(--text-muted)]">
              Fields marked with <span className="font-semibold text-[var(--gold)]">*</span> are required.
            </p>
          </div>

          <div className="border border-[#e0d5c5] bg-[#faf6f0] p-6 md:p-10">
            <RegistrationForm mode="light" />
          </div>
        </div>
      </div>
    </div>
  );
}
