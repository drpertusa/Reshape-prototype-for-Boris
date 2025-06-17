"use client"

import Link from "next/link"

import { Container } from "@/components/layout/container"
import { useTranslations, useLocale } from "@/i18n/client"
import { createLocalizedHref } from "@/i18n/navigation"
import { getCurrentYear } from "@/lib/config"
import { FOOTER_LINKS } from "@/lib/constants"

export function Footer() {
  const t = useTranslations()
  const locale = useLocale()
  
  return (
    <footer className="py-8 border-t">
      <Container className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-muted-foreground">
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
      </Container>
    </footer>
  )
}