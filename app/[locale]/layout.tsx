// Simple layout for testing
import type React from "react"

export default function SimpleLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body style={{ fontFamily: 'sans-serif', padding: '2rem' }}>
        <h1>Simple Layout Test</h1>
        {children}
      </body>
    </html>
  )
}