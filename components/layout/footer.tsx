import Link from "next/link"
import { SITE_CONFIG, FOOTER_LINKS } from "@/lib/constants"
import { getCurrentYear } from "@/lib/config"

export function Footer() {
  return (
    <footer className="py-8 px-6 border-t">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-muted-foreground">
        <p>&copy; {getCurrentYear()} {SITE_CONFIG.name}. All rights reserved.</p>
        <nav className="flex gap-6">
          {FOOTER_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="hover:text-foreground transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </div>
    </footer>
  )
}