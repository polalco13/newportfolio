import { ImageResponse } from "next/og";

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
          background: "#191a18",
          color: "#f2f3ea",
          padding: "72px",
          fontFamily: "Arial, sans-serif",
          borderBottom: "18px solid #ee4f24",
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
          <span style={{ display: "flex", fontSize: 44 }}>pa<span style={{ color: "#ee4f24" }}>.</span></span>
          <span style={{ color: "#b2b5a9", fontSize: 24 }}>Barcelona, Spain</span>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          <h1
            style={{
              maxWidth: 860,
              fontSize: 96,
              lineHeight: 1,
              fontWeight: 700,
              margin: 0,
              letterSpacing: "-5px",
            }}
          >
            POL ALCOVERRO
          </h1>
          <p
            style={{
              maxWidth: 900,
              fontSize: 34,
              lineHeight: 1.35,
              margin: 0,
              color: "#b2b5a9",
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
            color: "#b2b5a9",
          }}
        >
          <span>FIB-UPC graduate</span>
          <span style={{ color: "#ee4f24" }}>/</span>
          <span>Frontend and full-stack roles</span>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
