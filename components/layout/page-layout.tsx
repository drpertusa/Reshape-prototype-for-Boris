import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/layout/footer"

interface PageLayoutProps {
  children: React.ReactNode
}

export function PageLayout({ children }: PageLayoutProps) {
  return (
    <>
      <Navigation />
      <main id="main-content" className="flex-grow">
        {children}
      </main>
      <Footer />
    </>
  )
}