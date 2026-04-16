import { createClient } from "@/lib/supabase/server";
import { RegistrationForm } from "@/components/registration-form";
import { siteConfig } from "../../../../content/site-config";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: `Register - ${siteConfig.shortName}`,
  description: `Register for the ${siteConfig.name} retreat, ${siteConfig.retreatDate} at ${siteConfig.retreatVenue}.`,
};

interface RegisterPageProps {
  searchParams: Promise<{ tier?: string }>;
}

export default async function RegisterPage({ searchParams }: RegisterPageProps) {
  const params = await searchParams;
  const supabase = await createClient();

  const { data: tiers, error } = await supabase
    .from("pricing_tiers")
    .select("*")
    .eq("is_active", true)
    .order("sort_order", { ascending: true });

  if (error || !tiers || tiers.length === 0) {
    return (
      <div className="container py-16 text-center">
        <h1 className="text-2xl font-bold text-foreground">
          Registration Unavailable
        </h1>
        <p className="mt-4 text-muted-foreground">
          Registration is currently unavailable. Please check back later or
          contact us at{" "}
          <a
            href={`mailto:${siteConfig.supportEmail}`}
            className="text-primary underline"
          >
            {siteConfig.supportEmail}
          </a>
          .
        </p>
      </div>
    );
  }

  return (
    <div className="container py-12">
      <div className="mx-auto max-w-2xl">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-foreground">
            Register for {siteConfig.shortName}
          </h1>
          <p className="mt-2 text-muted-foreground">
            {siteConfig.retreatDate} at {siteConfig.retreatVenue}
          </p>
          <p className="mt-1 text-sm text-muted-foreground">
            Fields marked with <span className="text-destructive">*</span>{" "}
            are required.
          </p>
        </div>

        <div className="rounded-lg border bg-card p-6 shadow-sm md:p-8">
          <RegistrationForm
            tiers={tiers}
            preselectedTierId={params.tier}
          />
        </div>
      </div>
    </div>
  );
}
