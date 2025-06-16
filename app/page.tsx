import { redirect } from 'next/navigation'
import { defaultLocale } from '@/i18n/config'

// This page should never be reached due to middleware redirects
// But we keep it as a fallback
export default function RootPage() {
  redirect(`/${defaultLocale}`)
}