import { createClient } from "@/lib/supabase/server";
import { RegistrationForm } from "@/components/registration-form";
import { siteConfig } from "../../../../content/site-config";
import { Calendar, MapPin, Sparkles } from "lucide-react";
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
      <div className="relative min-h-[60vh] overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-orange-50" />
        <div className="container relative py-20 text-center">
          <h1 className="text-3xl font-bold text-slate-900">
            Registration Unavailable
          </h1>
          <p className="mt-4 text-slate-600">
            Registration is currently unavailable. Please check back later or
            contact us at{" "}
            <a
              href={`mailto:${siteConfig.supportEmail}`}
              className="font-medium text-orange-600 underline"
            >
              {siteConfig.supportEmail}
            </a>
            .
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-orange-50" />
      <div
        className="blob blob-blue absolute h-[500px] w-[500px] opacity-20"
        style={{ top: "-10%", left: "-10%" }}
      />
      <div
        className="blob blob-orange absolute h-[400px] w-[400px] opacity-20"
        style={{ top: "20%", right: "-10%", animationDelay: "4s" }}
      />

      <div className="container relative py-12 md:py-16">
        <div className="mx-auto max-w-3xl">
          {/* Header */}
          <div className="mb-10 text-center">
            <div className="mb-4 flex justify-center">
              <span className="inline-flex items-center gap-2 rounded-full bg-orange-100 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-orange-900">
                <Sparkles className="h-3 w-3" />
                Secure Your Spot
              </span>
            </div>
            <h1 className="text-4xl font-bold tracking-tight text-slate-900 md:text-5xl">
              Register for{" "}
              <span className="gradient-orange">{siteConfig.shortName}</span>
            </h1>

            <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
              <div className="glass inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm">
                <Calendar className="h-4 w-4 text-blue-700" />
                <span className="font-medium text-slate-700">
                  {siteConfig.retreatDate}
                </span>
              </div>
              <div className="glass inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm">
                <MapPin className="h-4 w-4 text-orange-600" />
                <span className="font-medium text-slate-700">
                  {siteConfig.retreatVenue}
                </span>
              </div>
            </div>

            <p className="mt-6 text-sm text-slate-500">
              Fields marked with{" "}
              <span className="font-semibold text-orange-600">*</span> are
              required.
            </p>
          </div>

          {/* Form card */}
          <div className="glass-strong rounded-3xl p-6 md:p-10">
            <RegistrationForm
              tiers={tiers}
              preselectedTierId={params.tier}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
