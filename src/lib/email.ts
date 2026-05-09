import { Resend } from "resend";
import { withRetry } from "@/lib/utils";

const apiKey = process.env.RESEND_API_KEY;

if (!apiKey && process.env.NEXT_PHASE !== "phase-production-build") {
  console.warn("Missing RESEND_API_KEY environment variable");
}

const resend = new Resend(apiKey ?? "");

const FROM_EMAIL =
  process.env.EMAIL_FROM ?? "Divine Connections <noreply@divineconnections.ca>";

interface SendEmailOptions {
  to: string | string[];
  subject: string;
  html: string;
  replyTo?: string;
  cc?: string | string[];
}

export async function sendEmail(options: SendEmailOptions): Promise<string> {
  return withRetry(
    async () => {
      const { data, error } = await resend.emails.send({
        from: FROM_EMAIL,
        to: Array.isArray(options.to) ? options.to : [options.to],
        subject: options.subject,
        html: options.html,
        replyTo: options.replyTo,
        cc: options.cc ? (Array.isArray(options.cc) ? options.cc : [options.cc]) : undefined,
      });

      if (error) {
        throw new Error(`Resend error: ${error.message}`);
      }

      return data?.id ?? "";
    },
    { maxAttempts: 3, baseDelayMs: 1000, label: "Send email" }
  );
}
