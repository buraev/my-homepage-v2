import React from "react"

export default function StyledCard({
  children,
  padding = "10px",
}: {
  children: React.ReactNode
  padding?: string
}) {
  return (
    <div
      className="bg-primaryMain border-primaryMain overflow-hidden rounded-lg border shadow-lg transition-shadow hover:shadow-xl"
      style={{ padding }}
    >
      {children}
    </div>
  )
}
