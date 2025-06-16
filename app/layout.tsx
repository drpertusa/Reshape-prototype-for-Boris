import type React from "react"
import type { Metadata } from "next"
import "./globals.css"
import { ThemeProvider } from "next-themes"
import { lavaChickenSerif, inter } from "@/lib/fonts"

import { SITE_CONFIG } from "@/lib/constants"

export const metadata: Metadata = {
  title: `${SITE_CONFIG.name} - ${SITE_CONFIG.tagline}`,
  description: SITE_CONFIG.description,
  keywords: "medical clinic, aesthetic surgery, regenerative medicine, longevity programs, transformation",
  authors: [{ name: SITE_CONFIG.name }],
  openGraph: {
    title: `${SITE_CONFIG.name} - ${SITE_CONFIG.tagline}`,
    description: SITE_CONFIG.description,
    type: "website",
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning className={`${lavaChickenSerif.variable} ${inter.variable}`}>
      <body className="antialiased">
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
