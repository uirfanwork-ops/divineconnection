"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import jsQR from "jsqr";
import {
  scanTicket,
  type ScanResult,
} from "@/lib/contemplating-death/check-in";

const HEADLINES: Record<ScanResult["state"], string> = {
  checked_in: "Checked in",
  already: "Already checked in",
  not_paid: "Not paid",
  refunded: "Refunded ticket",
  not_found: "Ticket not found",
  unauthorized: "Signed out",
  error: "Something went wrong",
};

const DETAILS: Partial<Record<ScanResult["state"], string>> = {
  checked_in: "Welcome them in.",
  not_paid: "Payment was never completed for this registration.",
  refunded: "Do not admit without checking with the organizers.",
  not_found: "This code does not match any registration.",
  unauthorized: "Your staff session ended. Sign in again to keep scanning.",
  error: "Check the connection and scan again.",
};

function tone(state: ScanResult["state"]): "success" | "warn" | "error" {
  if (state === "checked_in") return "success";
  if (state === "already") return "warn";
  return "error";
}

export function Scanner() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const frameRef = useRef(0);
  const busyRef = useRef(false);
  const lastRef = useRef({ text: "", at: 0 });

  const [active, setActive] = useState(false);
  const [cameraError, setCameraError] = useState<string | null>(null);
  const [result, setResult] = useState<ScanResult | null>(null);
  const [working, setWorking] = useState(false);
  const [count, setCount] = useState(0);
  const [manual, setManual] = useState("");

  const submit = useCallback(async (text: string) => {
    if (busyRef.current) return;
    busyRef.current = true;
    setWorking(true);
    try {
      const outcome = await scanTicket(text);
      setResult(outcome);
      if (outcome.state === "checked_in") setCount((n) => n + 1);
      if ("vibrate" in navigator) {
        navigator.vibrate(outcome.state === "checked_in" ? 80 : [80, 60, 80]);
      }
    } catch {
      setResult({ state: "error" });
    }
    setWorking(false);
    busyRef.current = false;
  }, []);

  const stop = useCallback(() => {
    cancelAnimationFrame(frameRef.current);
    streamRef.current?.getTracks().forEach((track) => track.stop());
    streamRef.current = null;
    setActive(false);
  }, []);

  const tick = useCallback(() => {
    const video = videoRef.current;
    if (!video || !streamRef.current) return;

    if (!busyRef.current && video.readyState >= 2 && video.videoWidth > 0) {
      // Scale the frame down: decoding is faster and still reads a phone-sized QR.
      const scale = Math.min(1, 640 / video.videoWidth);
      const width = Math.round(video.videoWidth * scale);
      const height = Math.round(video.videoHeight * scale);
      const canvas = (canvasRef.current ??= document.createElement("canvas"));
      canvas.width = width;
      canvas.height = height;
      const context = canvas.getContext("2d", { willReadFrequently: true });
      if (context) {
        context.drawImage(video, 0, 0, width, height);
        const image = context.getImageData(0, 0, width, height);
        const found = jsQR(image.data, width, height, {
          inversionAttempts: "dontInvert",
        });
        if (found?.data) {
          const now = Date.now();
          const repeat =
            found.data === lastRef.current.text &&
            now - lastRef.current.at < 4000;
          if (!repeat) {
            lastRef.current = { text: found.data, at: now };
            void submit(found.data);
          }
        }
      }
    }
    frameRef.current = requestAnimationFrame(tick);
  }, [submit]);

  const start = useCallback(async () => {
    setCameraError(null);
    if (!navigator.mediaDevices?.getUserMedia) {
      setCameraError(
        "This browser cannot open the camera. Type the ticket code instead."
      );
      return;
    }
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: { ideal: "environment" } },
        audio: false,
      });
      streamRef.current = stream;
      const video = videoRef.current;
      if (video) {
        video.srcObject = stream;
        await video.play().catch(() => {});
      }
      setActive(true);
      frameRef.current = requestAnimationFrame(tick);
    } catch {
      setCameraError(
        "Camera access was blocked. Allow the camera for this site in your browser settings, then try again."
      );
    }
  }, [tick]);

  useEffect(() => stop, [stop]);

  return (
    <>
      <div className="cd-scan-view" data-active={active}>
        <video ref={videoRef} playsInline muted />
        {active ? <span className="cd-scan-frame" aria-hidden="true" /> : null}
        {!active ? (
          <button type="button" className="button button-gold" onClick={start}>
            Start scanning
          </button>
        ) : null}
      </div>

      {cameraError ? (
        <p className="cd-scan-result" data-tone="error" role="alert">
          {cameraError}
        </p>
      ) : null}

      <div
        className="cd-scan-result"
        data-tone={result ? tone(result.state) : "idle"}
        role="status"
        aria-live="assertive"
      >
        {working ? (
          <p className="cd-scan-state">Checking…</p>
        ) : result ? (
          <>
            <p className="cd-scan-state">{HEADLINES[result.state]}</p>
            {result.name ? <p className="cd-scan-name">{result.name}</p> : null}
            {result.code ? <p className="cd-scan-code">{result.code}</p> : null}
            <p>{result.detail ?? DETAILS[result.state]}</p>
            {result.accessibility &&
            (result.state === "checked_in" || result.state === "already") ? (
              <p className="cd-scan-note">
                Accessibility note: {result.accessibility}
              </p>
            ) : null}
          </>
        ) : (
          <p className="cd-scan-state">
            {active ? "Point the camera at a ticket" : "Ready when you are"}
          </p>
        )}
      </div>

      <form
        className="cd-scan-manual"
        onSubmit={(event) => {
          event.preventDefault();
          if (manual.trim()) void submit(manual).then(() => setManual(""));
        }}
      >
        <label htmlFor="manual-code">No QR code? Type the ticket code</label>
        <div>
          <input
            id="manual-code"
            value={manual}
            onChange={(event) => setManual(event.target.value)}
            placeholder="CD-ABC234"
            autoCapitalize="characters"
            autoComplete="off"
            maxLength={12}
          />
          <button
            type="submit"
            className="button button-dark"
            disabled={working}
          >
            Check in
          </button>
        </div>
      </form>

      <div className="cd-scan-bar">
        <span>Checked in this session: {count}</span>
        {active ? (
          <button type="button" onClick={stop}>
            Stop camera
          </button>
        ) : null}
      </div>
    </>
  );
}
