"use client"

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <html>
      <body>
        <div style={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontFamily: "system-ui, -apple-system, sans-serif",
          padding: "20px"
        }}>
          <div style={{ textAlign: "center", maxWidth: "600px" }}>
            <h1 style={{ fontSize: "2rem", marginBottom: "1rem" }}>
              Critical Error
            </h1>
            
            <p style={{ marginBottom: "2rem", color: "#666" }}>
              A critical error has occurred. The application has encountered an 
              unexpected problem that prevented it from functioning properly.
            </p>
            
            <div style={{ display: "flex", gap: "1rem", justifyContent: "center" }}>
              <button
                onClick={reset}
                style={{
                  padding: "0.5rem 1.5rem",
                  background: "#000",
                  color: "#fff",
                  border: "none",
                  borderRadius: "4px",
                  cursor: "pointer",
                  fontSize: "1rem"
                }}
              >
                Try Again
              </button>
              
              <button
                onClick={() => window.location.href = '/'}
                style={{
                  padding: "0.5rem 1.5rem",
                  background: "transparent",
                  color: "#000",
                  border: "1px solid #000",
                  borderRadius: "4px",
                  cursor: "pointer",
                  fontSize: "1rem"
                }}
              >
                Go Home
              </button>
            </div>
            
            {process.env.NODE_ENV === "development" && (
              <details style={{ marginTop: "3rem", textAlign: "left" }}>
                <summary style={{ cursor: "pointer", marginBottom: "1rem" }}>
                  Error Details (Development)
                </summary>
                <pre style={{
                  background: "#f5f5f5",
                  padding: "1rem",
                  borderRadius: "4px",
                  overflow: "auto",
                  fontSize: "0.875rem"
                }}>
                  {error.message}
                  {error.stack && "\n\n" + error.stack}
                </pre>
              </details>
            )}
          </div>
        </div>
      </body>
    </html>
  )
}