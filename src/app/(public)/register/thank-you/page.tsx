import { notFound } from "next/navigation";
import Link from "next/link";
import { CheckCircle2, Mail, Calendar, MapPin } from "lucide-react";
import { createServiceClient } from "@/lib/supabase/service";
import { formatCents } from "@/lib/utils";
import { siteConfig } from "../../../../../content/site-config";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: `Thank You - ${siteConfig.shortName}`,
  description: "Your registration has been received.",
};

interface ThankYouPageProps {
  searchParams: Promise<{ id?: string; method?: string }>;
}

export default async function ThankYouPage({
  searchParams,
}: ThankYouPageProps) {
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

  const isETransfer = params.method === "e-transfer";

  return (
    <div className="container py-16">
      <div className="mx-auto max-w-2xl">
        <div className="text-center">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
            <CheckCircle2 className="h-10 w-10 text-primary" />
          </div>
          <h1 className="mt-6 text-3xl font-bold text-foreground md:text-4xl">
            Thank You, {registration.full_name.split(" ")[0]}
          </h1>
          <p className="mt-3 text-lg text-muted-foreground">
            {isETransfer
              ? "Your registration has been received and we are awaiting your e-Transfer."
              : "Your registration has been received."}
          </p>
        </div>

        <div className="mt-10 space-y-6">
          {isETransfer && (
            <div className="rounded-lg border-2 border-primary bg-primary/5 p-6">
              <div className="flex items-start gap-3">
                <Mail className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
                <div>
                  <h2 className="font-semibold text-foreground">
                    Next Step: Send your e-Transfer
                  </h2>
                  <p className="mt-1 text-sm text-muted-foreground">
                    If you have not already, please send{" "}
                    <strong>
                      {formatCents(
                        registration.amount_cents,
                        registration.currency
                      )}{" "}
                      {registration.currency}
                    </strong>{" "}
                    via Interac e-Transfer to{" "}
                    <code className="text-foreground">finance@mathabah.org</code>.
                    Include your full name and registration ID (
                    <code className="break-all text-xs">
                      {registration.id}
                    </code>
                    ) in the message field.
                  </p>
                  <p className="mt-3 text-sm text-muted-foreground">
                    Your spot will be confirmed once we verify your transfer.
                    We typically process e-Transfers within 24 hours.
                  </p>
                </div>
              </div>
            </div>
          )}

          <div className="rounded-lg border bg-card p-6 shadow-sm">
            <h2 className="mb-4 text-lg font-semibold text-foreground">
              Retreat Details
            </h2>
            <dl className="space-y-3 text-sm">
              <div className="flex items-start gap-3">
                <Calendar className="mt-0.5 h-4 w-4 shrink-0 text-muted-foreground" />
                <div>
                  <dt className="text-muted-foreground">Dates</dt>
                  <dd className="font-medium text-foreground">
                    {siteConfig.retreatDate}
                  </dd>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-muted-foreground" />
                <div>
                  <dt className="text-muted-foreground">Location</dt>
                  <dd className="font-medium text-foreground">
                    {siteConfig.retreatVenue}
                  </dd>
                  <dd className="text-muted-foreground">
                    {siteConfig.retreatCity}
                  </dd>
                </div>
              </div>
            </dl>
          </div>

          <div className="rounded-lg border bg-card p-6 shadow-sm">
            <h2 className="mb-4 text-lg font-semibold text-foreground">
              What Happens Next
            </h2>
            <ol className="space-y-3 text-sm">
              <li className="flex gap-3">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary text-xs font-semibold text-primary-foreground">
                  1
                </span>
                <span className="text-muted-foreground">
                  You will receive a confirmation email at{" "}
                  <strong className="text-foreground">
                    {registration.email}
                  </strong>{" "}
                  shortly.
                </span>
              </li>
              <li className="flex gap-3">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary text-xs font-semibold text-primary-foreground">
                  2
                </span>
                <span className="text-muted-foreground">
                  {isETransfer
                    ? "Once we verify your e-Transfer, we will send a final confirmation with retreat details and a packing list."
                    : "We will send a final confirmation with retreat details and a packing list."}
                </span>
              </li>
              <li className="flex gap-3">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary text-xs font-semibold text-primary-foreground">
                  3
                </span>
                <span className="text-muted-foreground">
                  Closer to the retreat date, you will receive logistics
                  information including carpool options and check-in details.
                </span>
              </li>
            </ol>
          </div>

          <div className="text-center">
            <p className="text-sm text-muted-foreground">
              Questions? Email us at{" "}
              <a
                href={`mailto:${siteConfig.supportEmail}`}
                className="text-primary underline"
              >
                {siteConfig.supportEmail}
              </a>
            </p>
            <div className="mt-6">
              <Link
                href="/"
                className="inline-flex h-10 items-center justify-center rounded-md border border-input bg-background px-6 text-sm font-medium hover:bg-accent"
              >
                Return to home
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
