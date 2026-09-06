import { ImageResponse } from "next/og";

// Static export needs this pinned so the card is generated at build time.
export const dynamic = "force-static";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = "Ashir Qureshi — Software Engineer";

/** Share card: the same dusk palette the site opens on. */
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
          padding: "0 88px",
          background:
            "linear-gradient(140deg, #0B1020 0%, #241A22 34%, #5A2A1C 62%, #A44E1E 84%, #D9832F 100%)",
          position: "relative",
        }}
      >
        {/* Horizon band */}
        <div
          style={{
            position: "absolute",
            left: 0,
            right: 0,
            bottom: 0,
            height: 190,
            background: "linear-gradient(180deg, rgba(10,7,8,0) 0%, #0A0708 62%)",
            display: "flex",
          }}
        />

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              fontSize: 22,
              letterSpacing: 12,
              color: "#D8B65E",
              textTransform: "uppercase",
              display: "flex",
            }}
          >
            Islamabad · Pakistan
          </div>

          <div
            style={{
              fontSize: 104,
              fontWeight: 700,
              color: "#F4EBD8",
              lineHeight: 1.02,
              marginTop: 22,
              letterSpacing: -1,
              display: "flex",
            }}
          >
            ASHIR QURESHI
          </div>

          <div
            style={{
              width: 240,
              height: 3,
              background: "linear-gradient(90deg, #F0DFA8, rgba(240,223,168,0))",
              marginTop: 26,
              display: "flex",
            }}
          />

          <div
            style={{
              fontSize: 34,
              color: "rgba(240,231,210,0.86)",
              marginTop: 26,
              maxWidth: 900,
              lineHeight: 1.35,
              display: "flex",
            }}
          >
            Software engineer — full-stack products, backend services, and
            computer-vision systems.
          </div>

          <div
            style={{
              fontSize: 22,
              letterSpacing: 6,
              color: "#D8B65E",
              marginTop: 40,
              display: "flex",
            }}
          >
            NODE.JS · POSTGRESQL · NEXT.JS · YOLOV8
          </div>
        </div>
      </div>
    ),
    size
  );
}
