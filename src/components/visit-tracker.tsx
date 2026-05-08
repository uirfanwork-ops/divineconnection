"use client";

import { useEffect } from "react";

export function VisitTracker() {
  useEffect(() => {
    fetch("/api/track-visit", { method: "POST" }).catch(() => {});
  }, []);

  return null;
}
