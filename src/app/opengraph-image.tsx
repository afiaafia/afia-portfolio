import { ImageResponse } from "next/og"

export const alt = "Afia — Full Stack Developer"
export const size = {
  width: 1200,
  height: 630,
}
export const contentType = "image/png"

export default function Image() {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "#0a0a0a",
        color: "#ffffff",
        fontSize: 64,
      }}
    >
      Afia — Full Stack Developer
    </div>,
  )
}
