import type React from "react"
import type { Metadata } from "next"
import "./globals.css"
import { ThemeProvider } from "next-themes"
import { fraunces, inter } from "@/lib/fonts"

export const metadata: Metadata = {
  title: "Reshape - Medical Excellence Through Precision",
  description: "Where science meets transformation. Medical precision, aesthetic excellence, and authentic transformation through evidence-based treatments.",
  keywords: "medical clinic, aesthetic surgery, regenerative medicine, longevity programs, transformation",
  authors: [{ name: "Reshape Clinic" }],
  openGraph: {
    title: "Reshape - Medical Excellence Through Precision",
    description: "Where science meets transformation. Medical precision and aesthetic excellence.",
    type: "website",
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning className={`${fraunces.variable} ${inter.variable}`}>
      <body className="font-inter antialiased">
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
