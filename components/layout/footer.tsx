"use client"

import Link from "next/link"
import { getCurrentYear } from "@/lib/config"
import { useTranslations, useLocale } from "@/i18n/client"
import { createLocalizedHref } from "@/i18n/navigation"

const FOOTER_LINKS = [
  { href: "/privacy", labelKey: "nav_privacy" },
  { href: "/terms", labelKey: "nav_terms" },
  { href: "/contact", labelKey: "nav_contact" },
]

export function Footer() {
  const t = useTranslations()
  const locale = useLocale()
  
  return (
    <footer className="py-8 px-6 border-t">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-muted-foreground">
        <p>{t("site_copyright", { year: getCurrentYear(), name: t("site_name") })}</p>
        <nav className="flex gap-6">
          {FOOTER_LINKS.map((link) => (
            <Link
              key={link.href}
              href={createLocalizedHref(link.href, locale)}
              className="hover:text-foreground transition-colors"
            >
              {t(link.labelKey)}
            </Link>
          ))}
        </nav>
      </div>
    </footer>
  )
}