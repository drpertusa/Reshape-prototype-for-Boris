export function ResourceHints() {
  return (
    <>
      {/* DNS Prefetch for external domains */}
      <link rel="dns-prefetch" href="https://fonts.googleapis.com" />
      <link rel="dns-prefetch" href="https://www.googletagmanager.com" />
      
      {/* Preconnect for critical origins */}
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      
      {/* Preload critical fonts */}
      <link
        rel="preload"
        href="/fonts/lava-chicken-serif-bold.woff2"
        as="font"
        type="font/woff2"
        crossOrigin="anonymous"
      />
      <link
        rel="preload"
        href="/fonts/inter-var.woff2"
        as="font"
        type="font/woff2"
        crossOrigin="anonymous"
      />
      
      {/* Prefetch likely navigation targets */}
      <link rel="prefetch" href="/services" />
      <link rel="prefetch" href="/contact" />
      
      {/* Resource hints for performance */}
      <meta httpEquiv="x-dns-prefetch-control" content="on" />
    </>
  )
}