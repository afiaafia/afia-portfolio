import { ImageResponse } from "next/og"

export function GET() {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "#0a0a0a",
        color: "white",
        fontSize: 64,
      }}
    >
      Afia — Full Stack Developer
    </div>,
  )
}
