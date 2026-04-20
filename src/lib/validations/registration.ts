import { z } from "zod";

const phoneRegex = /^[+]?[\d\s()-]+$/;
const phoneMsg =
  "Phone number can only contain digits, spaces, hyphens, parentheses, and an optional leading +";

export const registrationSchema = z
  .object({
    // Participant Information
    full_name: z
      .string()
      .min(2, "Full name must be at least 2 characters")
      .max(100, "Full name must be under 100 characters")
      .trim(),
    email: z
      .string()
      .email("Please enter a valid email address")
      .max(255)
      .trim()
      .toLowerCase(),
    phone: z
      .string()
      .min(7, "Please enter a valid phone number")
      .max(20)
      .regex(phoneRegex, phoneMsg)
      .trim(),
    date_of_birth: z
      .string()
      .regex(/^\d{4}-\d{2}-\d{2}$/, "Please enter a valid date"),
    gender: z
      .string()
      .min(1, "Please select a gender")
      .max(30)
      .trim(),

    // Parent/Guardian (conditional)
    is_minor: z.boolean(),
    guardian_name: z.string().max(100).trim().optional().default(""),
    guardian_phone: z
      .string()
      .max(20)
      .regex(phoneRegex, phoneMsg)
      .trim()
      .optional()
      .or(z.literal("")),
    guardian_email: z
      .string()
      .email("Please enter a valid email")
      .max(255)
      .trim()
      .toLowerCase()
      .optional()
      .or(z.literal("")),
    guardian_signature: z.string().max(100).trim().optional().default(""),

    // Emergency Contact
    emergency_contact_name: z
      .string()
      .min(2, "Emergency contact name is required")
      .max(100)
      .trim(),
    emergency_contact_relationship: z
      .string()
      .min(2, "Please describe the relationship")
      .max(100)
      .trim(),
    emergency_contact_phone: z
      .string()
      .min(7, "Please enter a valid phone number")
      .max(20)
      .regex(phoneRegex, phoneMsg)
      .trim(),

    // Medical Information
    allergies: z.string().max(500).trim().optional().default(""),
    medical_conditions: z.string().max(500).trim().optional().default(""),
    current_medications: z.string().max(500).trim().optional().default(""),

    // Transportation
    driving_self: z.boolean(),
    seeking_carpool: z.boolean(),

    // Photo/Media Consent (explicit yes/no required)
    photo_consent: z.boolean(),

    // Tier
    tier_id: z.string().uuid("Please select a valid pricing tier"),

    // Dietary (keeping from previous)
    dietary_restrictions: z.string().max(500).trim().optional().default(""),

    // Document acceptances
    accept_waiver: z.literal(true, {
      message: "You must accept the Waiver Form to register",
    }),
    accept_code_of_conduct: z.literal(true, {
      message: "You must accept the Code of Conduct to register",
    }),
    accept_consent_form: z.literal(true, {
      message: "You must accept the Consent Form to register",
    }),
    accept_privacy_policy: z.literal(true, {
      message: "You must accept the Privacy Policy to register",
    }),

    // Typed signature
    typed_signature: z
      .string()
      .min(2, "Typed signature is required")
      .max(100)
      .trim(),

    // Bot protection
    recaptcha_token: z.string().min(1, "reCAPTCHA verification failed"),
  })
  .refine(
    (data) =>
      data.typed_signature.toLowerCase() === data.full_name.toLowerCase(),
    {
      message: "Typed signature must match your full name exactly",
      path: ["typed_signature"],
    }
  )
  .refine(
    (data) => {
      if (!data.is_minor) return true;
      return (
        data.guardian_name.length >= 2 &&
        data.guardian_phone &&
        data.guardian_phone.length >= 7 &&
        data.guardian_email &&
        data.guardian_email.length > 0 &&
        data.guardian_signature.length >= 2
      );
    },
    {
      message:
        "Parent/Guardian information and signature are required for participants under 18",
      path: ["guardian_name"],
    }
  );

export type RegistrationFormData = z.infer<typeof registrationSchema>;
export type RegistrationFormInput = z.input<typeof registrationSchema>;
