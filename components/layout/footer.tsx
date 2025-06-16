import Link from "next/link"
import { getCurrentYear } from "@/lib/config"
import { T } from "@/i18n/components"
import { getTranslations } from "@/i18n/server"

const FOOTER_LINKS = [
  { href: "/privacy", labelKey: "nav_privacy" },
  { href: "/terms", labelKey: "nav_terms" },
  { href: "/contact", labelKey: "nav_contact" },
]

export async function Footer() {
  const t = await getTranslations()
  
  return (
    <footer className="py-8 px-6 border-t">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-muted-foreground">
        <p><T id="site_copyright" values={{ year: getCurrentYear(), name: t.site_name }} /></p>
        <nav className="flex gap-6">
          {FOOTER_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="hover:text-foreground transition-colors"
            >
              <T id={link.labelKey} />
            </Link>
          ))}
        </nav>
      </div>
    </footer>
  )
}