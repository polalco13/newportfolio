import { ImageResponse } from "next/og";

export const runtime = "edge";

export const alt = "Pol Alcoverro - Software Engineer";
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
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#FAFAFA",
          fontFamily: "Inter, sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "24px",
          }}
        >
          <div
            style={{
              width: "100px",
              height: "100px",
              borderRadius: "50%",
              backgroundColor: "#E5E5E5",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "40px",
              color: "#666",
            }}
          >
            PA
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "8px",
            }}
          >
            <h1
              style={{
                fontSize: "56px",
                fontStyle: "italic",
                fontWeight: 400,
                color: "#000",
                margin: 0,
                fontFamily: "Georgia, serif",
              }}
            >
              Pol Alcoverro
            </h1>
            <p
              style={{
                fontSize: "24px",
                color: "#666",
                margin: 0,
              }}
            >
              Software Engineer
            </p>
          </div>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
