import { locales } from '@/i18n/config'
import { site } from '@/lib/site'

interface AlternateLinksProps {
  pathname: string
}

export function AlternateLinks({ pathname }: AlternateLinksProps) {
  return (
    <>
      {locales.map(locale => (
        <link
          key={locale}
          rel="alternate"
          hrefLang={locale}
          href={site.absoluteUrl(pathname, locale)}
        />
      ))}
      <link
        rel="alternate"
        hrefLang="x-default"
        href={site.absoluteUrl(pathname)} // Default to English
      />
    </>
  )
}