// Simple page for testing
export default async function SimplePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  
  return (
    <div>
      <h2>Simple Page Works!</h2>
      <p>Locale: {locale}</p>
      <p>If you can see this, the Next.js routing is working correctly.</p>
      <ul>
        <li>English: /en/simple-page</li>
        <li>French: /fr/simple-page</li>
        <li>Spanish: /es/simple-page</li>
      </ul>
    </div>
  )
}