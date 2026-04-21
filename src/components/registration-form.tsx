"use client";

import { useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  User,
  Users,
  Phone,
  Stethoscope,
  Car,
  Camera,
  FileCheck,
  PenLine,
  CreditCard,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { SelectNative } from "@/components/ui/select-native";
import { Button } from "@/components/ui/button";
import { PolicyDialog } from "@/components/policy-dialog";
import {
  registrationSchema,
  type RegistrationFormInput,
} from "@/lib/validations/registration";
import {
  submitRegistration,
  type RegistrationActionState,
} from "@/app/(public)/register/actions";
import { formatCents } from "@/lib/utils";
import type { Database } from "@/types/database";

type PricingTier = Database["public"]["Tables"]["pricing_tiers"]["Row"];

interface RegistrationFormProps {
  tiers: PricingTier[];
  preselectedTierId?: string;
  mode?: "dark" | "light";
}

declare global {
  interface Window {
    grecaptcha: {
      ready: (cb: () => void) => void;
      execute: (
        siteKey: string,
        options: { action: string }
      ) => Promise<string>;
    };
  }
}

function calculateIsMinor(dobStr: string): boolean {
  if (!dobStr) return false;
  const dob = new Date(dobStr);
  if (isNaN(dob.getTime())) return false;
  const now = new Date();
  const retreatStart = new Date("2026-07-31");
  let age = retreatStart.getFullYear() - dob.getFullYear();
  const m = retreatStart.getMonth() - dob.getMonth();
  if (m < 0 || (m === 0 && retreatStart.getDate() < dob.getDate())) age--;
  return age < 18 && now > dob;
}

export function RegistrationForm({
  tiers,
  preselectedTierId,
  mode = "dark",
}: RegistrationFormProps) {
  const [serverState, setServerState] = useState<RegistrationActionState>({
    success: false,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<RegistrationFormInput>({
    resolver: zodResolver(registrationSchema),
    defaultValues: {
      full_name: "",
      email: "",
      phone: "",
      date_of_birth: "",
      gender: "",
      is_minor: false,
      guardian_name: "",
      guardian_phone: "",
      guardian_email: "",
      guardian_signature: "",
      tier_id: preselectedTierId ?? tiers[0]?.id ?? "",
      emergency_contact_name: "",
      emergency_contact_relationship: "",
      emergency_contact_phone: "",
      allergies: "",
      medical_conditions: "",
      current_medications: "",
      dietary_restrictions: "",
      driving_self: false,
      seeking_carpool: false,
      photo_consent: false,
      accept_waiver: false as unknown as true,
      accept_code_of_conduct: false as unknown as true,
      accept_consent_form: false as unknown as true,
      accept_privacy_policy: false as unknown as true,
      typed_signature: "",
      recaptcha_token: "",
    },
  });

  const selectedTierId = watch("tier_id");
  const fullName = watch("full_name");
  const dob = watch("date_of_birth");
  const isMinor = watch("is_minor");
  const selectedTier = tiers.find((t) => t.id === selectedTierId);

  // Auto-calculate minor status from DOB
  useEffect(() => {
    setValue("is_minor", calculateIsMinor(dob));
  }, [dob, setValue]);

  const getRecaptchaToken = useCallback(async (): Promise<string> => {
    const siteKey = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY;
    if (!siteKey || typeof window === "undefined" || !window.grecaptcha) {
      return "no-recaptcha-configured";
    }
    return new Promise((resolve) => {
      window.grecaptcha.ready(async () => {
        try {
          const token = await window.grecaptcha.execute(siteKey, {
            action: "register",
          });
          resolve(token);
        } catch {
          resolve("recaptcha-error");
        }
      });
    });
  }, []);

  const onSubmit = useCallback(
    async (data: RegistrationFormInput) => {
      setIsSubmitting(true);
      setServerState({ success: false });

      try {
        const token = await getRecaptchaToken();
        data.recaptcha_token = token;

        const fd = new FormData();
        for (const [key, value] of Object.entries(data)) {
          fd.set(key, String(value ?? ""));
        }

        const result = await submitRegistration({ success: false }, fd);
        setServerState(result);
      } catch {
        setServerState({
          success: false,
          error: "An unexpected error occurred. Please try again.",
        });
      } finally {
        setIsSubmitting(false);
      }
    },
    [getRecaptchaToken]
  );

  const recaptchaSiteKey = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY;

  return (
    <div className={mode === "light" ? "theme-cream" : ""}>
      {recaptchaSiteKey && (
        <script
          src={`https://www.google.com/recaptcha/api.js?render=${recaptchaSiteKey}`}
          async
          defer
        />
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-10" noValidate>
        {serverState.error && (
          <div className="rounded-lg border border-destructive/50 bg-destructive/10 p-4 text-sm text-destructive">
            {serverState.error}
          </div>
        )}

        {/* 1. Participant Information */}
        <Section icon={User} title="Participant Information">
          <Grid>
            <Field
              label="Full Name"
              required
              error={errors.full_name?.message || serverState.fieldErrors?.full_name?.[0]}
            >
              <Input
                {...register("full_name")}
                placeholder="Your full name"
                autoComplete="name"
              />
            </Field>
            <Field
              label="Email"
              required
              error={errors.email?.message || serverState.fieldErrors?.email?.[0]}
            >
              <Input
                type="email"
                {...register("email")}
                placeholder="you@example.com"
                autoComplete="email"
              />
            </Field>
          </Grid>
          <Grid>
            <Field
              label="Phone Number"
              required
              error={errors.phone?.message || serverState.fieldErrors?.phone?.[0]}
            >
              <Input
                type="tel"
                {...register("phone")}
                placeholder="+1 (555) 000-0000"
                autoComplete="tel"
              />
            </Field>
            <Field
              label="Date of Birth (DD/MM/YYYY)"
              required
              error={errors.date_of_birth?.message || serverState.fieldErrors?.date_of_birth?.[0]}
            >
              <Input type="date" {...register("date_of_birth")} />
            </Field>
          </Grid>
          <Grid>
            <Field
              label="Gender"
              required
              error={errors.gender?.message || serverState.fieldErrors?.gender?.[0]}
            >
              <SelectNative {...register("gender")}>
                <option value="">Select...</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Prefer not to say">Prefer not to say</option>
              </SelectNative>
            </Field>
            <Field
              label="Registration Tier"
              required
              error={errors.tier_id?.message || serverState.fieldErrors?.tier_id?.[0]}
            >
              <SelectNative {...register("tier_id")}>
                {tiers.map((tier) => {
                  const spotsLeft =
                    tier.max_spots !== null
                      ? tier.max_spots - tier.spots_taken
                      : null;
                  return (
                    <option
                      key={tier.id}
                      value={tier.id}
                      disabled={spotsLeft === 0}
                    >
                      {tier.name} - {formatCents(tier.price_cents, tier.currency)}
                      {spotsLeft === 0 ? " (Sold out)" : ""}
                    </option>
                  );
                })}
              </SelectNative>
              {selectedTier && (
                <p className="mt-1.5 text-xs text-[var(--text-muted)]">
                  {selectedTier.description}
                </p>
              )}
            </Field>
          </Grid>
        </Section>

        {/* 2. Parent/Guardian (conditional) */}
        {isMinor && (
          <Section
            icon={Users}
            title="Parent/Guardian Information"
            subtitle="Required for participants under 18"
            accent="amber"
          >
            <Grid>
              <Field
                label="Parent/Guardian Name"
                required
                error={errors.guardian_name?.message || serverState.fieldErrors?.guardian_name?.[0]}
              >
                <Input {...register("guardian_name")} placeholder="Full name" />
              </Field>
              <Field
                label="Phone Number"
                required
                error={errors.guardian_phone?.message || serverState.fieldErrors?.guardian_phone?.[0]}
              >
                <Input
                  type="tel"
                  {...register("guardian_phone")}
                  placeholder="+1 (555) 000-0000"
                />
              </Field>
            </Grid>
            <Field
              label="Email Address"
              required
              error={errors.guardian_email?.message || serverState.fieldErrors?.guardian_email?.[0]}
            >
              <Input
                type="email"
                {...register("guardian_email")}
                placeholder="guardian@example.com"
              />
            </Field>
          </Section>
        )}

        {/* 3. Emergency Contact */}
        <Section icon={Phone} title="Emergency Contact Information">
          <Grid>
            <Field
              label="Contact Name"
              required
              error={errors.emergency_contact_name?.message || serverState.fieldErrors?.emergency_contact_name?.[0]}
            >
              <Input {...register("emergency_contact_name")} placeholder="Full name" />
            </Field>
            <Field
              label="Relationship"
              required
              error={errors.emergency_contact_relationship?.message || serverState.fieldErrors?.emergency_contact_relationship?.[0]}
            >
              <Input
                {...register("emergency_contact_relationship")}
                placeholder="e.g., Spouse, Parent, Sibling"
              />
            </Field>
          </Grid>
          <Field
            label="Phone Number"
            required
            error={errors.emergency_contact_phone?.message || serverState.fieldErrors?.emergency_contact_phone?.[0]}
          >
            <Input
              type="tel"
              {...register("emergency_contact_phone")}
              placeholder="+1 (555) 000-0000"
            />
          </Field>
        </Section>

        {/* 4. Medical Information */}
        <Section icon={Stethoscope} title="Medical Information">
          <Field label="Allergies" error={errors.allergies?.message}>
            <Textarea
              {...register("allergies")}
              placeholder="Food, medication, or environmental allergies (leave blank if none)"
              rows={2}
            />
          </Field>
          <Field label="Medical Conditions" error={errors.medical_conditions?.message}>
            <Textarea
              {...register("medical_conditions")}
              placeholder="Any medical conditions we should be aware of (leave blank if none)"
              rows={2}
            />
          </Field>
          <Field label="Current Medications" error={errors.current_medications?.message}>
            <Textarea
              {...register("current_medications")}
              placeholder="Medications you are currently taking (leave blank if none)"
              rows={2}
            />
          </Field>
          <Field label="Dietary Restrictions" error={errors.dietary_restrictions?.message}>
            <Textarea
              {...register("dietary_restrictions")}
              placeholder="e.g., vegetarian, gluten-free (leave blank if none)"
              rows={2}
            />
          </Field>
        </Section>

        {/* 5. Transportation */}
        <Section icon={Car} title="Transportation Information">
          <div className="space-y-3">
            <YesNoRadio
              label="Will you be driving yourself?"
              name="driving_self"
              value={watch("driving_self")}
              onChange={(v) => setValue("driving_self", v)}
            />
            <YesNoRadio
              label="Are you looking to carpool?"
              name="seeking_carpool"
              value={watch("seeking_carpool")}
              onChange={(v) => setValue("seeking_carpool", v)}
            />
          </div>
        </Section>

        {/* 6. Payment Information */}
        <Section icon={CreditCard} title="Payment Information">
          <div className="rounded-lg border border-[var(--border-color)] bg-[var(--gold)]/5 p-4">
            <p className="text-sm text-[var(--text-secondary)]">
              Details for payment will be sent upon registration confirmation.
              Payment will be collected via Interac e-Transfer to{" "}
              <code className="text-[var(--gold)]">finance@mathabah.org</code>.
            </p>
          </div>
        </Section>

        {/* 7. Photo/Media Consent */}
        <Section icon={Camera} title="Photo / Media Consent">
          <p className="mb-3 text-sm text-[var(--text-secondary)]">
            I consent to photographs and videos being taken during the retreat
            which may be used for future promotional purposes.
          </p>
          <YesNoRadio
            label=""
            name="photo_consent"
            value={watch("photo_consent")}
            onChange={(v) => setValue("photo_consent", v)}
            yesLabel="Yes, I consent"
            noLabel="No, I do not consent"
            explicit
          />
        </Section>

        {/* 8. Document Acceptance */}
        <Section icon={FileCheck} title="Required Agreements" accent="amber">
          <p className="mb-4 text-sm text-[var(--text-secondary)]">
            Please read and accept each of the following documents. Click each
            title to open and review.
          </p>
          <div className="space-y-3">
            <AgreementCheckbox
              id="accept_waiver"
              checked={watch("accept_waiver") as boolean}
              onChange={(v) =>
                setValue("accept_waiver", v as unknown as true, { shouldValidate: true })
              }
              title="Waiver Form"
              description="Assumption of risk, release of liability, and COVID-19 acknowledgment"
              slug="waiver"
              error={errors.accept_waiver?.message || serverState.fieldErrors?.accept_waiver?.[0]}
            />
            <AgreementCheckbox
              id="accept_code_of_conduct"
              checked={watch("accept_code_of_conduct") as boolean}
              onChange={(v) =>
                setValue("accept_code_of_conduct", v as unknown as true, { shouldValidate: true })
              }
              title="Code of Conduct"
              description="Respectful behavior, modesty, participation, zero-tolerance policy"
              slug="code-of-conduct"
              error={errors.accept_code_of_conduct?.message || serverState.fieldErrors?.accept_code_of_conduct?.[0]}
            />
            <AgreementCheckbox
              id="accept_consent_form"
              checked={watch("accept_consent_form") as boolean}
              onChange={(v) =>
                setValue("accept_consent_form", v as unknown as true, { shouldValidate: true })
              }
              title="Consent Form"
              description="Medical consent, acknowledgment of risks, behavioral expectations"
              slug="consent"
              error={errors.accept_consent_form?.message || serverState.fieldErrors?.accept_consent_form?.[0]}
            />
            <AgreementCheckbox
              id="accept_privacy_policy"
              checked={watch("accept_privacy_policy") as boolean}
              onChange={(v) =>
                setValue("accept_privacy_policy", v as unknown as true, { shouldValidate: true })
              }
              title="Privacy Policy"
              description="How we collect, use, and protect your personal information"
              slug="privacy"
              error={errors.accept_privacy_policy?.message || serverState.fieldErrors?.accept_privacy_policy?.[0]}
            />
          </div>
        </Section>

        {/* 9. Declaration and Signature */}
        <Section icon={PenLine} title="Declaration">
          <div className="rounded-lg border border-[var(--border-color)] bg-[var(--bg-card)] p-4 text-sm leading-relaxed text-[var(--text-secondary)]">
            <p>
              I declare that the information provided above is accurate to the
              best of my knowledge. I agree to comply with the rules and
              regulations of the Divine Connections Retreat.
            </p>
          </div>
          <Field
            label={
              <>
                Participant Signature <span className="text-xs font-normal text-[var(--text-muted)]">(type your full name exactly)</span>
              </>
            }
            required
            error={errors.typed_signature?.message || serverState.fieldErrors?.typed_signature?.[0]}
          >
            <Input
              {...register("typed_signature")}
              placeholder={fullName || "Type your full name"}
              autoComplete="off"
            />
          </Field>

          {isMinor && (
            <Field
              label="Parent/Guardian Signature"
              required
              error={errors.guardian_signature?.message || serverState.fieldErrors?.guardian_signature?.[0]}
            >
              <Input
                {...register("guardian_signature")}
                placeholder="Parent/Guardian full name"
                autoComplete="off"
              />
            </Field>
          )}
        </Section>

        {/* Submit */}
        <div className="space-y-4 border-t border-[var(--border-color)] pt-6">
          {selectedTier && (
            <div className="flex items-center justify-between rounded-lg glass-luxury p-4">
              <span className="text-sm font-medium text-[var(--text-secondary)]">
                Total for {selectedTier.name}
              </span>
              <span className="text-2xl font-bold text-gold">
                {formatCents(selectedTier.price_cents, selectedTier.currency)}{" "}
                {selectedTier.currency}
              </span>
            </div>
          )}
          <Button type="submit" size="lg" disabled={isSubmitting} className="w-full">
            {isSubmitting ? "Submitting..." : "Submit Registration"}
          </Button>
          <p className="text-center text-xs text-[var(--text-muted)]">
            Indeed, in the remembrance of Allah do hearts find rest. (Qur&apos;an 13:28)
          </p>
        </div>
      </form>
    </div>
  );
}

/* =====================
   Sub-components
   ===================== */

function Section({
  icon: Icon,
  title,
  subtitle,
  accent,
  children,
}: {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  subtitle?: string;
  accent?: "amber";
  children: React.ReactNode;
}) {
  const iconBg =
    accent === "amber"
      ? "bg-[var(--gold)] shadow-[var(--gold-muted)]"
      : "bg-[var(--bg-elevated)] border border-[var(--border-color)]";
  return (
    <fieldset className="space-y-4">
      <legend className="flex items-center gap-3">
        <div className={`flex h-9 w-9 items-center justify-center rounded-lg ${iconBg} shadow-lg`}>
          <Icon className="h-4 w-4 text-white" />
        </div>
        <div>
          <h3 className="text-lg font-bold text-[var(--text-primary)]">{title}</h3>
          {subtitle && <p className="text-xs text-[var(--text-muted)]">{subtitle}</p>}
        </div>
      </legend>
      {children}
    </fieldset>
  );
}

function Grid({ children }: { children: React.ReactNode }) {
  return <div className="grid gap-4 sm:grid-cols-2">{children}</div>;
}

function Field({
  label,
  required,
  error,
  children,
}: {
  label: React.ReactNode;
  required?: boolean;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <Label className="mb-1.5 block text-[var(--text-secondary)]">
        {label}
        {required && <span className="ml-0.5 text-[var(--gold)]">*</span>}
      </Label>
      {children}
      {error && <p className="mt-1.5 text-sm text-destructive">{error}</p>}
    </div>
  );
}

function YesNoRadio({
  label,
  value,
  onChange,
  yesLabel = "Yes",
  noLabel = "No",
  explicit,
}: {
  label: string;
  name: string;
  value: boolean;
  onChange: (v: boolean) => void;
  yesLabel?: string;
  noLabel?: string;
  explicit?: boolean;
}) {
  return (
    <div className="flex items-center justify-between gap-4 rounded-lg border border-[var(--border-color)] bg-[var(--bg-card)] p-4">
      {label && <span className="text-sm font-medium text-[var(--text-secondary)]">{label}</span>}
      <div className="flex gap-2">
        <button
          type="button"
          onClick={() => onChange(true)}
          className={`rounded-md px-4 py-2 text-sm font-medium transition-all ${
            value === true
              ? "bg-[var(--gold)] text-[var(--bg-primary)] shadow-md shadow-[var(--gold-muted)]"
              : "bg-[var(--bg-card)] text-[var(--text-secondary)] hover:bg-[var(--bg-secondary)]"
          }`}
        >
          {yesLabel}
        </button>
        <button
          type="button"
          onClick={() => onChange(false)}
          className={`rounded-md px-4 py-2 text-sm font-medium transition-all ${
            value === false && explicit
              ? "bg-[var(--bg-elevated)] text-[var(--text-primary)]"
              : value === false
                ? "bg-[var(--bg-elevated)] text-[var(--text-secondary)]"
                : "bg-[var(--bg-card)] text-[var(--text-secondary)] hover:bg-[var(--bg-secondary)]"
          }`}
        >
          {noLabel}
        </button>
      </div>
    </div>
  );
}

function AgreementCheckbox({
  id,
  checked,
  onChange,
  title,
  description,
  slug,
  error,
}: {
  id: string;
  checked: boolean;
  onChange: (v: boolean) => void;
  title: string;
  description: string;
  slug: string;
  error?: string;
}) {
  const [dialogOpen, setDialogOpen] = useState(false);

  return (
    <div>
      <label
        htmlFor={id}
        className={`flex cursor-pointer items-start gap-3 border p-4 transition-colors ${
          checked
            ? "border-[var(--gold)] bg-[var(--gold-muted)]"
            : "border-[var(--border-color)] bg-[var(--bg-card)] hover:border-[var(--gold)]"
        }`}
      >
        <input
          id={id}
          type="checkbox"
          checked={checked}
          onChange={(e) => onChange(e.target.checked)}
          className="mt-0.5 h-4 w-4 border-[var(--border-color)] bg-[var(--bg-card)] accent-[var(--gold)]"
        />
        <div className="flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-sm font-semibold text-[var(--text-primary)]">
              I accept the{" "}
              <button
                type="button"
                className="text-[var(--gold)] underline underline-offset-4 hover:text-[var(--gold-light)]"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  setDialogOpen(true);
                }}
              >
                {title}
              </button>
            </span>
          </div>
          <p className="mt-0.5 text-xs text-[var(--text-muted)]">{description}</p>
        </div>
      </label>
      {error && <p className="mt-1.5 text-sm text-destructive">{error}</p>}

      <PolicyDialog
        slug={slug}
        title={title}
        open={dialogOpen}
        onClose={() => setDialogOpen(false)}
      />
    </div>
  );
}
