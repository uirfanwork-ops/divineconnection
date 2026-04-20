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
      <div className="starfield relative min-h-[60vh] overflow-hidden bg-gradient-to-b from-slate-950 via-blue-950/30 to-slate-950">
        <div className="container relative py-20 text-center">
          <h1 className="text-3xl font-bold text-slate-100">Registration Unavailable</h1>
          <p className="mt-4 text-slate-400">
            Registration is currently unavailable. Please check back later or contact us at{" "}
            <a href={`mailto:${siteConfig.supportEmail}`} className="font-medium text-amber-400 underline">{siteConfig.supportEmail}</a>.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="starfield relative overflow-hidden bg-gradient-to-b from-slate-950 via-blue-950/20 to-slate-950">
      <div className="nebula nebula-blue h-[500px] w-[500px]" style={{ top: "-10%", left: "-10%" }} />
      <div className="nebula nebula-gold h-[400px] w-[400px]" style={{ top: "30%", right: "-10%", animationDelay: "6s" }} />

      <div className="container relative py-12 md:py-16">
        <div className="mx-auto max-w-3xl">
          <div className="mb-10 text-center">
            <div className="mb-4 flex justify-center">
              <span className="inline-flex items-center gap-2 rounded-full bg-amber-500/10 border border-amber-500/20 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-amber-400">
                <Sparkles className="h-3 w-3" />
                Secure Your Spot
              </span>
            </div>
            <h1 className="text-4xl font-bold tracking-tight text-slate-100 md:text-5xl">
              Register for{" "}
              <span className="gradient-text-gold">{siteConfig.shortName}</span>
            </h1>

            <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
              <div className="glass inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm">
                <Calendar className="h-4 w-4 text-blue-400" />
                <span className="font-medium text-slate-300">{siteConfig.retreatDate}</span>
              </div>
              <div className="glass inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm">
                <MapPin className="h-4 w-4 text-amber-400" />
                <span className="font-medium text-slate-300">{siteConfig.retreatVenue}</span>
              </div>
            </div>

            <p className="mt-6 text-sm text-slate-500">
              Fields marked with <span className="font-semibold text-amber-400">*</span> are required.
            </p>
          </div>

          <div className="glass-strong rounded-3xl p-6 md:p-10">
            <RegistrationForm tiers={tiers} preselectedTierId={params.tier} />
          </div>
        </div>
      </div>
    </div>
  );
}
