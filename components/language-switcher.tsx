"use client"

import { useRouter } from "next/navigation"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useLocale } from "@/i18n/client"
import { locales, LOCALE_COOKIE } from "@/i18n/config"

const LOCALE_NAMES = {
  en: "English",
  fr: "Français",
} as const

export function LanguageSwitcher() {
  const locale = useLocale()
  const router = useRouter()
  
  const handleLocaleChange = (newLocale: string) => {
    // Set cookie
    document.cookie = `${LOCALE_COOKIE}=${newLocale};path=/;max-age=31536000;SameSite=Lax`
    
    // Refresh the page to apply new locale
    router.refresh()
  }
  
  return (
    <Select value={locale} onValueChange={handleLocaleChange}>
      <SelectTrigger className="w-[120px]">
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        {locales.map((loc) => (
          <SelectItem key={loc} value={loc}>
            {LOCALE_NAMES[loc]}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}