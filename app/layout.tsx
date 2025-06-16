import type React from "react"
import "./globals.css"

// Root layout only handles global CSS
// All actual content is in [locale] layouts
export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
