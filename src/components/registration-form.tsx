"use client";

import { useCallback, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { SelectNative } from "@/components/ui/select-native";
import { Button } from "@/components/ui/button";
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
import Link from "next/link";

type PricingTier = Database["public"]["Tables"]["pricing_tiers"]["Row"];

interface RegistrationFormProps {
  tiers: PricingTier[];
  preselectedTierId?: string;
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

export function RegistrationForm({
  tiers,
  preselectedTierId,
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
      tier_id: preselectedTierId ?? tiers[0]?.id ?? "",
      emergency_contact_name: "",
      emergency_contact_phone: "",
      dietary_restrictions: "",
      medical_conditions: "",
      accept_privacy_policy: false as unknown as true,
      accept_terms_of_service: false as unknown as true,
      accept_refund_policy: false as unknown as true,
      accept_code_of_conduct: false as unknown as true,
      typed_signature: "",
      recaptcha_token: "",
    },
  });

  const selectedTierId = watch("tier_id");
  const fullName = watch("full_name");
  const selectedTier = tiers.find((t) => t.id === selectedTierId);

  const acceptPrivacy = watch("accept_privacy_policy");
  const acceptTerms = watch("accept_terms_of_service");
  const acceptRefund = watch("accept_refund_policy");
  const acceptConduct = watch("accept_code_of_conduct");

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
        fd.set("full_name", data.full_name);
        fd.set("email", data.email);
        fd.set("phone", data.phone);
        fd.set("tier_id", data.tier_id);
        fd.set("emergency_contact_name", data.emergency_contact_name);
        fd.set("emergency_contact_phone", data.emergency_contact_phone);
        fd.set("dietary_restrictions", data.dietary_restrictions ?? "");
        fd.set("medical_conditions", data.medical_conditions ?? "");
        fd.set("accept_privacy_policy", String(data.accept_privacy_policy));
        fd.set(
          "accept_terms_of_service",
          String(data.accept_terms_of_service)
        );
        fd.set("accept_refund_policy", String(data.accept_refund_policy));
        fd.set("accept_code_of_conduct", String(data.accept_code_of_conduct));
        fd.set("typed_signature", data.typed_signature);
        fd.set("recaptcha_token", data.recaptcha_token);

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
    <>
      {recaptchaSiteKey && (
        <script
          src={`https://www.google.com/recaptcha/api.js?render=${recaptchaSiteKey}`}
          async
          defer
        />
      )}

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-8"
        noValidate
      >
        {serverState.error && (
          <div className="rounded-md border border-destructive/50 bg-destructive/10 p-4 text-sm text-destructive">
            {serverState.error}
          </div>
        )}

        <fieldset className="space-y-4">
          <legend className="text-lg font-semibold text-foreground">
            Personal Information
          </legend>

          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <Label htmlFor="full_name">
                Full Name <span className="text-destructive">*</span>
              </Label>
              <Input
                id="full_name"
                {...register("full_name")}
                placeholder="Your full name"
                className="mt-1"
              />
              <FieldError
                error={
                  errors.full_name?.message ||
                  serverState.fieldErrors?.full_name?.[0]
                }
              />
            </div>

            <div>
              <Label htmlFor="email">
                Email <span className="text-destructive">*</span>
              </Label>
              <Input
                id="email"
                type="email"
                {...register("email")}
                placeholder="you@example.com"
                className="mt-1"
              />
              <FieldError
                error={
                  errors.email?.message ||
                  serverState.fieldErrors?.email?.[0]
                }
              />
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <Label htmlFor="phone">
                Phone Number <span className="text-destructive">*</span>
              </Label>
              <Input
                id="phone"
                type="tel"
                {...register("phone")}
                placeholder="+1 (555) 000-0000"
                className="mt-1"
              />
              <FieldError
                error={
                  errors.phone?.message ||
                  serverState.fieldErrors?.phone?.[0]
                }
              />
            </div>

            <div>
              <Label htmlFor="tier_id">
                Registration Tier{" "}
                <span className="text-destructive">*</span>
              </Label>
              <SelectNative
                id="tier_id"
                {...register("tier_id")}
                className="mt-1"
              >
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
                      {tier.name} -{" "}
                      {formatCents(tier.price_cents, tier.currency)}
                      {spotsLeft !== null && spotsLeft <= 10
                        ? ` (${spotsLeft} spots left)`
                        : ""}
                      {spotsLeft === 0 ? " (Sold out)" : ""}
                    </option>
                  );
                })}
              </SelectNative>
              <FieldError
                error={
                  errors.tier_id?.message ||
                  serverState.fieldErrors?.tier_id?.[0]
                }
              />
              {selectedTier && (
                <p className="mt-1 text-sm text-muted-foreground">
                  {selectedTier.description}
                </p>
              )}
            </div>
          </div>
        </fieldset>

        <fieldset className="space-y-4">
          <legend className="text-lg font-semibold text-foreground">
            Emergency Contact
          </legend>

          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <Label htmlFor="emergency_contact_name">
                Contact Name <span className="text-destructive">*</span>
              </Label>
              <Input
                id="emergency_contact_name"
                {...register("emergency_contact_name")}
                placeholder="Emergency contact full name"
                className="mt-1"
              />
              <FieldError
                error={
                  errors.emergency_contact_name?.message ||
                  serverState.fieldErrors?.emergency_contact_name?.[0]
                }
              />
            </div>

            <div>
              <Label htmlFor="emergency_contact_phone">
                Contact Phone <span className="text-destructive">*</span>
              </Label>
              <Input
                id="emergency_contact_phone"
                type="tel"
                {...register("emergency_contact_phone")}
                placeholder="+1 (555) 000-0000"
                className="mt-1"
              />
              <FieldError
                error={
                  errors.emergency_contact_phone?.message ||
                  serverState.fieldErrors?.emergency_contact_phone?.[0]
                }
              />
            </div>
          </div>
        </fieldset>

        <fieldset className="space-y-4">
          <legend className="text-lg font-semibold text-foreground">
            Additional Information
          </legend>

          <div>
            <Label htmlFor="dietary_restrictions">
              Dietary Restrictions
            </Label>
            <Textarea
              id="dietary_restrictions"
              {...register("dietary_restrictions")}
              placeholder="e.g., vegetarian, nut allergy, gluten-free (leave blank if none)"
              className="mt-1"
              rows={2}
            />
            <FieldError
              error={
                errors.dietary_restrictions?.message ||
                serverState.fieldErrors?.dietary_restrictions?.[0]
              }
            />
          </div>

          <div>
            <Label htmlFor="medical_conditions">Medical Conditions</Label>
            <Textarea
              id="medical_conditions"
              {...register("medical_conditions")}
              placeholder="Any medical conditions we should be aware of (leave blank if none)"
              className="mt-1"
              rows={2}
            />
            <FieldError
              error={
                errors.medical_conditions?.message ||
                serverState.fieldErrors?.medical_conditions?.[0]
              }
            />
          </div>
        </fieldset>

        <fieldset className="space-y-4">
          <legend className="text-lg font-semibold text-foreground">
            Policy Consent
          </legend>
          <p className="text-sm text-muted-foreground">
            Please read and accept all policies before proceeding.
          </p>

          <PolicyCheckbox
            id="accept_privacy_policy"
            checked={acceptPrivacy as boolean}
            onChange={(checked) =>
              setValue(
                "accept_privacy_policy",
                checked as unknown as true,
                { shouldValidate: true }
              )
            }
            label="I have read and accept the"
            policyName="Privacy Policy"
            policyHref="/policies/privacy"
            error={
              errors.accept_privacy_policy?.message ||
              serverState.fieldErrors?.accept_privacy_policy?.[0]
            }
          />

          <PolicyCheckbox
            id="accept_terms_of_service"
            checked={acceptTerms as boolean}
            onChange={(checked) =>
              setValue(
                "accept_terms_of_service",
                checked as unknown as true,
                { shouldValidate: true }
              )
            }
            label="I have read and accept the"
            policyName="Terms of Service"
            policyHref="/policies/terms"
            error={
              errors.accept_terms_of_service?.message ||
              serverState.fieldErrors?.accept_terms_of_service?.[0]
            }
          />

          <PolicyCheckbox
            id="accept_refund_policy"
            checked={acceptRefund as boolean}
            onChange={(checked) =>
              setValue(
                "accept_refund_policy",
                checked as unknown as true,
                { shouldValidate: true }
              )
            }
            label="I have read and accept the"
            policyName="Refund Policy"
            policyHref="/policies/refund"
            error={
              errors.accept_refund_policy?.message ||
              serverState.fieldErrors?.accept_refund_policy?.[0]
            }
          />

          <PolicyCheckbox
            id="accept_code_of_conduct"
            checked={acceptConduct as boolean}
            onChange={(checked) =>
              setValue(
                "accept_code_of_conduct",
                checked as unknown as true,
                { shouldValidate: true }
              )
            }
            label="I have read and accept the"
            policyName="Code of Conduct"
            policyHref="/policies/code-of-conduct"
            error={
              errors.accept_code_of_conduct?.message ||
              serverState.fieldErrors?.accept_code_of_conduct?.[0]
            }
          />
        </fieldset>

        <fieldset className="space-y-4">
          <legend className="text-lg font-semibold text-foreground">
            Digital Signature
          </legend>
          <p className="text-sm text-muted-foreground">
            Type your full name exactly as entered above to confirm your
            registration and agreement to all policies.
          </p>

          <div>
            <Label htmlFor="typed_signature">
              Type your full name:{" "}
              <span className="font-semibold text-foreground">
                {fullName || "(enter your name above)"}
              </span>
            </Label>
            <Input
              id="typed_signature"
              {...register("typed_signature")}
              placeholder="Type your full name to sign"
              className="mt-1"
              autoComplete="off"
            />
            <FieldError
              error={
                errors.typed_signature?.message ||
                serverState.fieldErrors?.typed_signature?.[0]
              }
            />
          </div>
        </fieldset>

        <div className="flex flex-col gap-4 border-t pt-6">
          {selectedTier && (
            <p className="text-center text-lg font-semibold text-foreground">
              Total:{" "}
              {formatCents(selectedTier.price_cents, selectedTier.currency)}{" "}
              {selectedTier.currency}
            </p>
          )}
          <Button
            type="submit"
            size="lg"
            disabled={isSubmitting}
            className="w-full"
          >
            {isSubmitting ? "Submitting..." : "Continue to Payment"}
          </Button>
          <p className="text-center text-xs text-muted-foreground">
            By clicking &quot;Continue to Payment&quot; you confirm all
            information above is accurate.
          </p>
        </div>
      </form>
    </>
  );
}

function FieldError({ error }: { error?: string }) {
  if (!error) return null;
  return <p className="mt-1 text-sm text-destructive">{error}</p>;
}

function PolicyCheckbox({
  id,
  checked,
  onChange,
  label,
  policyName,
  policyHref,
  error,
}: {
  id: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
  label: string;
  policyName: string;
  policyHref: string;
  error?: string;
}) {
  return (
    <div>
      <div className="flex items-start gap-3">
        <Checkbox
          id={id}
          checked={checked}
          onCheckedChange={onChange}
          className="mt-0.5"
        />
        <label htmlFor={id} className="text-sm text-foreground">
          {label}{" "}
          <Link
            href={policyHref}
            target="_blank"
            className="font-medium text-primary underline underline-offset-4 hover:text-primary/80"
          >
            {policyName}
          </Link>
        </label>
      </div>
      <FieldError error={error} />
    </div>
  );
}
