import { ImageResponse } from "next/og";

// Static export needs this pinned so the card is generated at build time.
export const dynamic = "force-static";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = "Ashir Qureshi — Software Engineer";

/** Share card, in the same neon-on-night palette the site opens with. */
export default function OgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "0 84px",
          background:
            "linear-gradient(160deg, #0a0616 0%, #1b0b34 34%, #6b1450 60%, #c62a6b 80%, #ff7a3d 100%)",
          position: "relative",
        }}
      >
        {/* Sun */}
        <div
          style={{
            position: "absolute",
            right: -110,
            top: 150,
            width: 460,
            height: 460,
            borderRadius: 999,
            background: "linear-gradient(180deg, #ffd166 0%, #ff9b3d 45%, #ff2e88 100%)",
            opacity: 0.5,
            display: "flex",
          }}
        />
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(100deg, rgba(6,3,13,0.94) 0%, rgba(6,3,13,0.7) 42%, rgba(6,3,13,0.1) 78%)",
            display: "flex",
          }}
        />

        <div style={{ display: "flex", flexDirection: "column", position: "relative" }}>
          <div
            style={{
              fontSize: 21,
              letterSpacing: 10,
              color: "#ff6eb4",
              display: "flex",
            }}
          >
            ISLAMABAD · PAKISTAN
          </div>

          <div
            style={{
              fontSize: 108,
              fontWeight: 800,
              color: "#f4f0ff",
              lineHeight: 1,
              marginTop: 20,
              letterSpacing: -3,
              display: "flex",
            }}
          >
            ASHIR QURESHI
          </div>

          <div
            style={{
              width: 260,
              height: 5,
              borderRadius: 999,
              background: "linear-gradient(90deg, #ff2e88, #ff9b3d, #ffd166)",
              marginTop: 26,
              display: "flex",
            }}
          />

          <div
            style={{
              fontSize: 33,
              color: "rgba(244,240,255,0.88)",
              marginTop: 26,
              maxWidth: 820,
              lineHeight: 1.35,
              display: "flex",
            }}
          >
            Software engineer — backend, full-stack, and AI-integrated systems.
          </div>

          <div
            style={{
              fontSize: 21,
              letterSpacing: 5,
              color: "#22d3ee",
              marginTop: 38,
              display: "flex",
            }}
          >
            NODE.JS · NESTJS · POSTGRESQL · YOLOV8
          </div>
        </div>
      </div>
    ),
    size
  );
}
