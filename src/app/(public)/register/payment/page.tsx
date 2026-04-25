import { notFound } from "next/navigation";
import Link from "next/link";
import { Mail, User, Hash, DollarSign } from "lucide-react";
import { createServiceClient } from "@/lib/supabase/service";
import { formatCents } from "@/lib/utils";
import { CopyButton } from "@/components/copy-button";
import { siteConfig } from "../../../../../content/site-config";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: `Payment - ${siteConfig.shortName}`,
  description: "Complete your registration payment via Interac e-Transfer.",
};

interface PaymentPageProps {
  searchParams: Promise<{ id?: string }>;
}

async function getRetreatConfigValue(
  key: string
): Promise<string | null> {
  const supabase = createServiceClient();
  const { data, error } = await supabase
    .from("retreat_config")
    .select("value")
    .eq("key", key)
    .single();

  if (error || !data) {
    return null;
  }

  const value = data.value;
  if (typeof value === "string") {
    return value;
  }
  return null;
}

export default async function PaymentPage({ searchParams }: PaymentPageProps) {
  const params = await searchParams;
  const registrationId = params.id;

  if (!registrationId) {
    notFound();
  }

  const supabase = createServiceClient();

  const { data: registration, error } = await supabase
    .from("registrations")
    .select("*")
    .eq("id", registrationId)
    .single();

  if (error || !registration) {
    notFound();
  }

  const eTransferEmail =
    (await getRetreatConfigValue("e_transfer_email")) ??
    "finance@mathabah.org";

  const messageReference = `${registration.confirmation_code} - ${registration.full_name}`;

  return (
    <div className="container pb-12 pt-28">
      <div className="mx-auto max-w-2xl">
        <div className="mb-8 rounded-lg border border-green-200 bg-green-50 p-6 text-center">
          <h1 className="text-2xl font-bold text-green-800">
            Thank You for Registering!
          </h1>
          <p className="mt-2 text-sm text-green-700">
            Your registration will only be confirmed once your e-Transfer payment is complete.
            Please check your inbox and spam folder for a follow-up email with your confirmation code.
          </p>
        </div>

        <div className="space-y-6">
          <div className="rounded-lg border bg-card p-6 shadow-sm">
            <h2 className="mb-4 text-lg font-semibold text-foreground">
              Registration Summary
            </h2>
            <dl className="space-y-3 text-sm">
              <div className="flex items-start gap-3">
                <User className="mt-0.5 h-4 w-4 shrink-0 text-muted-foreground" />
                <div className="flex-1">
                  <dt className="text-muted-foreground">Name</dt>
                  <dd className="font-medium text-foreground">
                    {registration.full_name}
                  </dd>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Hash className="mt-0.5 h-4 w-4 shrink-0 text-muted-foreground" />
                <div className="flex-1">
                  <dt className="text-muted-foreground">Confirmation Code</dt>
                  <dd className="font-mono text-2xl font-bold tracking-wider text-foreground">
                    {registration.confirmation_code}
                  </dd>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <DollarSign className="mt-0.5 h-4 w-4 shrink-0 text-muted-foreground" />
                <div className="flex-1">
                  <dt className="text-muted-foreground">Amount Due</dt>
                  <dd className="text-lg font-semibold text-foreground">
                    {formatCents(
                      registration.amount_cents,
                      registration.currency
                    )}{" "}
                    {registration.currency}
                  </dd>
                </div>
              </div>
            </dl>
          </div>

          <div className="rounded-lg border-2 border-primary bg-card p-6 shadow-sm">
            <div className="mb-4 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                <Mail className="h-5 w-5 text-primary" />
              </div>
              <div>
                <h2 className="text-lg font-semibold text-foreground">
                  Pay by Interac e-Transfer
                </h2>
                <p className="text-sm text-muted-foreground">
                  Secure, instant, and fee-free
                </p>
              </div>
            </div>

            <div className="space-y-4">
              <div className="rounded-md bg-muted p-4">
                <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                  Send e-Transfer to
                </p>
                <div className="mt-1 flex items-center justify-between gap-2">
                  <code className="break-all text-base font-semibold text-foreground">
                    {eTransferEmail}
                  </code>
                  <CopyButton value={eTransferEmail} label="email" />
                </div>
              </div>

              <div className="rounded-md bg-muted p-4">
                <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                  Include in the message
                </p>
                <div className="mt-1 flex items-center justify-between gap-2">
                  <code className="text-sm font-medium text-foreground">
                    {messageReference}
                  </code>
                  <CopyButton value={messageReference} label="message" />
                </div>
              </div>

              <div className="rounded-md bg-muted p-4">
                <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                  Amount to send
                </p>
                <p className="mt-1 text-lg font-bold text-foreground">
                  {formatCents(
                    registration.amount_cents,
                    registration.currency
                  )}{" "}
                  {registration.currency}
                </p>
              </div>

              <div className="rounded-md border border-amber-200 bg-amber-50 p-4 text-sm text-amber-900">
                <p className="font-semibold">Important:</p>
                <ul className="mt-1 list-inside list-disc space-y-1">
                  <li>Send the exact amount shown above</li>
                  <li>
                    Include your confirmation code <strong>{registration.confirmation_code}</strong> in the message field
                  </li>
                  <li>
                    Your registration is pending until we verify the transfer
                  </li>
                  <li>We typically verify e-Transfers within 24 hours</li>
                </ul>
              </div>
            </div>
          </div>

          <p className="text-center text-sm text-muted-foreground">
            A confirmation email with these details has been sent to your email address.
          </p>

          <p className="text-center text-sm text-muted-foreground">
            Questions? Email us at{" "}
            <a
              href={`mailto:${siteConfig.supportEmail}`}
              className="text-primary underline"
            >
              {siteConfig.supportEmail}
            </a>
          </p>

          <div className="text-center">
            <Link
              href="/"
              className="text-sm text-muted-foreground hover:text-primary"
            >
              Return to home
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
