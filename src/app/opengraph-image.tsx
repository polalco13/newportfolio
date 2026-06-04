import { ImageResponse } from "next/og";

export const runtime = "edge";

export const alt = "Pol Alcoverro - Software Engineer and Full-Stack Developer";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#FAFAFA",
          color: "#000",
          padding: "72px",
          fontFamily: "Inter, Arial, sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            fontSize: 28,
            fontWeight: 700,
          }}
        >
          <span>PA</span>
          <span style={{ color: "#2563EB", fontSize: 24 }}>Barcelona, Spain</span>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          <h1
            style={{
              maxWidth: 860,
              fontSize: 82,
              lineHeight: 0.98,
              fontStyle: "italic",
              fontWeight: 400,
              margin: 0,
              fontFamily: "Georgia, serif",
            }}
          >
            Pol Alcoverro
          </h1>
          <p
            style={{
              maxWidth: 900,
              fontSize: 34,
              lineHeight: 1.35,
              margin: 0,
              color: "#525252",
            }}
          >
            Software Engineer and Full-Stack Developer building React, Next.js,
            Angular, and Node.js products.
          </p>
        </div>

        <div
          style={{
            display: "flex",
            gap: 16,
            fontSize: 22,
            color: "#525252",
          }}
        >
          <span>FIB-UPC graduate</span>
          <span style={{ color: "#D4D4D4" }}>/</span>
          <span>Frontend and full-stack roles</span>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
