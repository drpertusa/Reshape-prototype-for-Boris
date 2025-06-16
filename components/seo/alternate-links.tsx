import { locales } from '@/i18n/config'

interface AlternateLinksProps {
  pathname: string
}

export function AlternateLinks({ pathname }: AlternateLinksProps) {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://reshape.clinic'
  
  return (
    <>
      {locales.map(locale => (
        <link
          key={locale}
          rel="alternate"
          hrefLang={locale}
          href={`${baseUrl}/${locale}${pathname === '/' ? '' : pathname}`}
        />
      ))}
      <link
        rel="alternate"
        hrefLang="x-default"
        href={`${baseUrl}/en${pathname === '/' ? '' : pathname}`}
      />
    </>
  )
}