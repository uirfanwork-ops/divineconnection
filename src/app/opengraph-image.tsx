import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Aozat General Contractors";
export const contentType = "image/png";
export const size = { width: 1200, height: 630 };

export default async function OG() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px 88px",
          background:
            "linear-gradient(180deg, #1F1A14 0%, #2A231B 100%)",
          color: "#F4EDE3",
          fontFamily: "Georgia, serif",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 18,
            color: "#D4A574",
            fontSize: 22,
            letterSpacing: "0.32em",
            textTransform: "uppercase",
          }}
        >
          <div
            style={{
              width: 30,
              height: 30,
              border: "2px solid #D4A574",
              transform: "rotate(45deg)",
            }}
          />
          AOZAT
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          <div
            style={{
              fontSize: 96,
              lineHeight: 1.0,
              letterSpacing: "-0.025em",
              color: "#F4EDE3",
            }}
          >
            Buildings that
          </div>
          <div
            style={{
              fontSize: 96,
              lineHeight: 1.0,
              letterSpacing: "-0.025em",
              color: "#C9B89C",
              fontStyle: "italic",
            }}
          >
            earn their ground.
          </div>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            color: "#8B8278",
            fontSize: 18,
            letterSpacing: "0.22em",
            textTransform: "uppercase",
          }}
        >
          <span>General Contractor</span>
          <span>Greater Toronto Area</span>
        </div>
      </div>
    ),
    { ...size },
  );
}
