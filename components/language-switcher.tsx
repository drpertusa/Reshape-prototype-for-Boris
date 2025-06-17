"use client"

import { useRouter } from "next/navigation"
import { useState, useTransition } from "react"
import { SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { SelectWithFallback as Select } from "@/components/ui/select-with-fallback"
import { useLocale } from "@/i18n/client"
import { locales, LOCALE_COOKIE, isValidLocale } from "@/i18n/config"
import { usePathname } from "@/i18n/navigation"

const LOCALE_NAMES = {
  en: "English",
  fr: "Français",
  es: "Español",
  zh: "中文",
  ru: "Русский",
  ar: "العربية",
} as const

export function LanguageSwitcher() {
  const locale = useLocale()
  const router = useRouter()
  const pathname = usePathname() // Get pathname without locale
  const [isPending, startTransition] = useTransition()
  const [isChanging, setIsChanging] = useState(false)
  
  const handleLocaleChange = (newLocale: string) => {
    // Validate locale
    if (!isValidLocale(newLocale)) return
    
    // Prevent multiple clicks
    if (isChanging || isPending) return
    
    setIsChanging(true)
    
    // Set cookie to persist choice (accessible from client)
    document.cookie = `${LOCALE_COOKIE}=${newLocale};path=/;max-age=31536000;SameSite=Lax`
    
    // Preserve query params and hash
    const url = new URL(window.location.href)
    const search = url.search
    const hash = url.hash
    
    // Navigate to the new locale URL
    const newPath = `/${newLocale}${pathname === '/' ? '' : pathname}${search}${hash}`
    
    startTransition(() => {
      router.push(newPath)
      // Reset changing state after navigation
      setTimeout(() => setIsChanging(false), 500)
    })
  }
  
  return (
    <Select 
      value={locale} 
      onValueChange={handleLocaleChange}
      disabled={isChanging || isPending}
    >
      <SelectTrigger 
        className="w-[140px]" 
        aria-label="Select language"
        aria-describedby="language-description"
      >
        <SelectValue />
      </SelectTrigger>
      <span id="language-description" className="sr-only">
        Choose your preferred language for the website
      </span>
      <SelectContent>
        {locales.map((loc) => (
          <SelectItem 
            key={loc} 
            value={loc}
            lang={loc}
          >
            {LOCALE_NAMES[loc]}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}