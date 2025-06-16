"use client"

import Link from "next/link"
import { createLocalizedHref } from "@/i18n/navigation"
import { useTranslations, useLocale } from "@/i18n/client"

export default function NotFound() {
  const t = useTranslations()
  const locale = useLocale()

  return (
    <main className="flex min-h-screen flex-col items-center justify-center text-center animate-in fade-in duration-250">
      {/* Clinic name - large display font */}
      <h1 className="font-display text-4xl md:text-6xl">
        {t("site_name")}
      </h1>
      
      {/* Screen reader only - for accessibility and SEO */}
      <h2 className="sr-only">
        {t("not_found_subtitle")}
      </h2>

      {/* "Begin here →" */}
      <Link
        href={createLocalizedHref("/", locale)}
        className="mt-6 inline-flex items-center gap-1 text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-dashed focus-visible:outline-2 focus-visible:outline-offset-4"
      >
        <span>{t("not_found_begin_here")}</span>
        <span className="animate-subtle-pulse">→</span>
      </Link>
      
      {/* Subtle hint that fades in after delay */}
      <p className="mt-2 text-sm text-muted-foreground fade-in-delay">
        {t("not_found_hint")}
      </p>
    </main>
  )
}