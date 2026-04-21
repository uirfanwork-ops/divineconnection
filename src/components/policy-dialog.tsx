"use client";

import { useCallback, useEffect, useState } from "react";
import { X } from "lucide-react";

interface PolicyDialogProps {
  slug: string;
  title: string;
  open: boolean;
  onClose: () => void;
}

export function PolicyDialog({ slug, title, open, onClose }: PolicyDialogProps) {
  const [html, setHtml] = useState<string>("");
  const [loading, setLoading] = useState(false);

  const fetchPolicy = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/policy/${slug}`);
      if (res.ok) {
        const data = await res.json();
        setHtml(data.html);
      }
    } catch {
      setHtml("<p>Failed to load policy. Please try again.</p>");
    } finally {
      setLoading(false);
    }
  }, [slug]);

  useEffect(() => {
    if (open && !html) {
      fetchPolicy();
    }
  }, [open, html, fetchPolicy]);

  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-label={title}
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/70 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Dialog */}
      <div className="relative flex max-h-[85vh] w-full max-w-2xl flex-col border border-[var(--border-color)] bg-[var(--bg-secondary)]">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-[var(--border-color)] px-6 py-4">
          <h2 className="font-heading text-lg font-bold uppercase tracking-wide text-[var(--text-primary)]">
            {title}
          </h2>
          <button
            onClick={onClose}
            className="flex h-8 w-8 items-center justify-center text-[var(--text-muted)] transition-colors hover:text-[var(--text-primary)]"
            aria-label="Close"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto px-6 py-6">
          {loading ? (
            <div className="flex items-center justify-center py-12">
              <div className="text-sm text-[var(--text-muted)]">Loading...</div>
            </div>
          ) : (
            <div
              className="policy-article"
              dangerouslySetInnerHTML={{ __html: html }}
            />
          )}
        </div>

        {/* Footer */}
        <div className="border-t border-[var(--border-color)] px-6 py-4">
          <button onClick={onClose} className="btn-outline-gold w-full">
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
