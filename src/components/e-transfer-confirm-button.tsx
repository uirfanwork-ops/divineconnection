"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { confirmETransferPromise } from "@/app/(public)/register/payment/actions";

interface ETransferConfirmButtonProps {
  registrationId: string;
}

export function ETransferConfirmButton({
  registrationId,
}: ETransferConfirmButtonProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleConfirm() {
    setIsSubmitting(true);
    setError(null);
    try {
      const result = await confirmETransferPromise(registrationId);
      if (!result.success && result.error) {
        setError(result.error);
      }
    } catch {
      setError("An unexpected error occurred. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div>
      {error && (
        <div className="mb-4 rounded-md border border-destructive/50 bg-destructive/10 p-3 text-sm text-destructive">
          {error}
        </div>
      )}
      <Button
        type="button"
        size="lg"
        className="w-full"
        onClick={handleConfirm}
        disabled={isSubmitting}
      >
        {isSubmitting
          ? "Confirming..."
          : "I have sent the e-Transfer"}
      </Button>
    </div>
  );
}
