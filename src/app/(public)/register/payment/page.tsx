import { notFound } from "next/navigation";
import Link from "next/link";
import { Mail, User, Hash, DollarSign } from "lucide-react";
import { createServiceClient } from "@/lib/supabase/service";
import { formatCents } from "@/lib/utils";
import { ETransferConfirmButton } from "@/components/e-transfer-confirm-button";
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
  const eTransferInstructions =
    (await getRetreatConfigValue("e_transfer_instructions")) ??
    `Please send your Interac e-Transfer to ${eTransferEmail}. Include your full name and registration ID in the message field.`;

  const messageReference = `${registration.full_name} - ${registration.id}`;

  return (
    <div className="container py-12">
      <div className="mx-auto max-w-2xl">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-foreground">
            Complete Your Payment
          </h1>
          <p className="mt-2 text-muted-foreground">
            Your registration has been received. Please complete payment via
            Interac e-Transfer to confirm your spot.
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
                  <dt className="text-muted-foreground">Registration ID</dt>
                  <dd className="break-all font-mono text-xs font-medium text-foreground">
                    {registration.id}
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
                    Include your full name and registration ID in the message
                    field
                  </li>
                  <li>
                    Your registration is confirmed once we verify the transfer
                  </li>
                  <li>We typically verify e-Transfers within 24 hours</li>
                </ul>
              </div>

              <p className="text-sm text-muted-foreground">
                {eTransferInstructions}
              </p>
            </div>
          </div>

          <ETransferConfirmButton registrationId={registration.id} />

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
