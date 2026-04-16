import Anthropic from "@anthropic-ai/sdk";
import { withRetry } from "@/lib/utils";

const apiKey = process.env.ANTHROPIC_API_KEY;

if (!apiKey && typeof window === "undefined" && process.env.NEXT_PHASE !== "phase-production-build") {
  console.warn("Missing ANTHROPIC_API_KEY environment variable");
}

const anthropic = new Anthropic({
  apiKey: apiKey ?? "",
});

export interface OcrResult {
  amount: number | null;
  currency: string;
  date: string | null;
  sender: string | null;
  reference: string | null;
  category: string | null;
  rawText: string;
  confidence: number;
}

export async function processReceiptImage(
  imageBase64: string,
  mediaType: "image/jpeg" | "image/png" | "image/webp"
): Promise<OcrResult> {
  return withRetry(
    async () => {
      const response = await anthropic.messages.create({
        model: "claude-sonnet-4-6-20250514",
        max_tokens: 1024,
        messages: [
          {
            role: "user",
            content: [
              {
                type: "image",
                source: {
                  type: "base64",
                  media_type: mediaType,
                  data: imageBase64,
                },
              },
              {
                type: "text",
                text: `Analyze this e-transfer receipt or payment confirmation image. Extract:
1. amount (in cents as integer, e.g. 25000 for $250.00)
2. currency (ISO code, default "CAD")
3. date (ISO 8601 format)
4. sender (full name of person who sent the payment)
5. reference (transaction/reference number)
6. category (one of: "e-transfer", "bank_transfer", "cheque", "cash", "other")
7. rawText (all readable text from the image)
8. confidence (0.0 to 1.0)

Return ONLY valid JSON matching this schema. No markdown, no explanation.`,
              },
            ],
          },
        ],
      });

      const text =
        response.content[0].type === "text" ? response.content[0].text : "";
      return JSON.parse(text) as OcrResult;
    },
    { maxAttempts: 3, baseDelayMs: 1000, label: "Claude OCR" }
  );
}
