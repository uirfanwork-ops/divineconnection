import { withRetry } from "@/lib/utils";

interface RecaptchaResponse {
  success: boolean;
  score: number;
  action: string;
  challenge_ts: string;
  hostname: string;
  "error-codes"?: string[];
}

export async function verifyRecaptcha(token: string): Promise<{
  success: boolean;
  score: number;
}> {
  const secretKey = process.env.RECAPTCHA_SECRET_KEY;

  if (!secretKey) {
    console.warn("RECAPTCHA_SECRET_KEY not set, skipping verification");
    return { success: true, score: 1.0 };
  }

  return withRetry(
    async () => {
      const response = await fetch(
        "https://www.google.com/recaptcha/api/siteverify",
        {
          method: "POST",
          headers: { "Content-Type": "application/x-www-form-urlencoded" },
          body: new URLSearchParams({
            secret: secretKey,
            response: token,
          }),
        }
      );

      if (!response.ok) {
        throw new Error(`reCAPTCHA verification HTTP error: ${response.status}`);
      }

      const data: RecaptchaResponse = await response.json();

      return {
        success: data.success && data.score >= 0.5,
        score: data.score,
      };
    },
    { maxAttempts: 3, baseDelayMs: 500, label: "reCAPTCHA verify" }
  );
}
