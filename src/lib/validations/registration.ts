import { z } from "zod";

export const registrationSchema = z
  .object({
    full_name: z
      .string()
      .min(2, "Full name must be at least 2 characters")
      .max(100, "Full name must be under 100 characters")
      .trim(),
    email: z
      .string()
      .email("Please enter a valid email address")
      .max(255, "Email must be under 255 characters")
      .trim()
      .toLowerCase(),
    phone: z
      .string()
      .min(7, "Please enter a valid phone number")
      .max(20, "Phone number is too long")
      .regex(
        /^[+]?[\d\s()-]+$/,
        "Phone number can only contain digits, spaces, hyphens, parentheses, and an optional leading +"
      )
      .trim(),
    tier_id: z.string().uuid("Please select a valid pricing tier"),
    emergency_contact_name: z
      .string()
      .min(2, "Emergency contact name must be at least 2 characters")
      .max(100, "Emergency contact name must be under 100 characters")
      .trim(),
    emergency_contact_phone: z
      .string()
      .min(7, "Please enter a valid phone number")
      .max(20, "Phone number is too long")
      .regex(
        /^[+]?[\d\s()-]+$/,
        "Phone number can only contain digits, spaces, hyphens, parentheses, and an optional leading +"
      )
      .trim(),
    dietary_restrictions: z
      .string()
      .max(500, "Dietary restrictions must be under 500 characters")
      .trim()
      .optional()
      .default(""),
    medical_conditions: z
      .string()
      .max(500, "Medical conditions must be under 500 characters")
      .trim()
      .optional()
      .default(""),
    accept_privacy_policy: z.literal(true, {
      message: "You must accept the Privacy Policy",
    }),
    accept_terms_of_service: z.literal(true, {
      message: "You must accept the Terms of Service",
    }),
    accept_refund_policy: z.literal(true, {
      message: "You must accept the Refund Policy",
    }),
    accept_code_of_conduct: z.literal(true, {
      message: "You must accept the Code of Conduct",
    }),
    typed_signature: z
      .string()
      .min(2, "Typed signature must be at least 2 characters")
      .max(100, "Typed signature must be under 100 characters")
      .trim(),
    recaptcha_token: z.string().min(1, "reCAPTCHA verification failed"),
  })
  .refine(
    (data) =>
      data.typed_signature.toLowerCase() === data.full_name.toLowerCase(),
    {
      message: "Typed signature must match your full name",
      path: ["typed_signature"],
    }
  );

export type RegistrationFormData = z.infer<typeof registrationSchema>;

export type RegistrationFormInput = z.input<typeof registrationSchema>;
