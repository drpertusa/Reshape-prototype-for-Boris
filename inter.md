I18N Implementation Plan for Clinic-Starter

  Based on my analysis, here's a comprehensive plan:

  📊 Current State Analysis

  87 strings need translation across 23 files. The good news: your architecture is clean with most content already centralized in
  /lib/constants.ts.

  🚀 Recommended Implementation Plan

  Phase 1: Foundation (Day 1)

  1. Install next-intl (best for App Router)
  npm install next-intl
  2. Set up file structure:
  /messages/
    en.json
    es.json
    fr.json
  /app/[locale]/
    layout.tsx
    page.tsx
    contact/page.tsx
  3. Create middleware for locale detection
  4. Move all pages under [locale] folder

  Phase 2: String Extraction (Day 1-2)

  Extract all 87 strings into translation files:

  // messages/en.json
  {
    "site": {
      "name": "Reshape",
      "tagline": "Medical Excellence Through Precision",
      "copyright": "© {year} {name}. All rights reserved."
    },
    "nav": {
      "home": "Home",
      "services": "Services",
      "philosophy": "Philosophy",
      "contact": "Contact",
      "toggleMenu": "Toggle menu"
    },
    "home": {
      "hero": {
        "title": "Where Science Meets",
        "titleAccent": "Transformation",
        "subtitle": "Medical precision. Aesthetic excellence."
      }
    }
    // ... etc
  }

  Phase 3: Component Refactoring (Day 2-3)

  Before:
  <p>&copy; {getCurrentYear()} {SITE_CONFIG.name}. All rights reserved.</p>

  After:
  const t = useTranslations('site');
  <p>{t('copyright', { year: getCurrentYear(), name: SITE_CONFIG.name })}</p>

  Phase 4: Address Critical Issues (Day 3)

  1. Phone formatting - Make locale-aware:
  formatPhone(phone: string, locale: string): string {
    // US: +1 (555) 123-4567
    // UK: +44 20 1234 5678
    // ES: +34 91 123 45 67
  }
  2. Address formatting - Different per country:
  formatAddress(address: Address, locale: string): string {
    // US: 123 Main St, San Francisco, CA 94111
    // UK: 20 Fitzroy Street, London W1T 6EJ
    // Different order for some countries
  }
  3. Date/time display (future appointments):
  // Use Intl.DateTimeFormat
  formatDate(date: Date, locale: string)
  formatTime(time: string, locale: string) // 24h vs 12h

  🏗️ Architecture Changes

  1. Update Layout

  // app/[locale]/layout.tsx
  import {NextIntlClientProvider} from 'next-intl';
  import {getMessages} from 'next-intl/server';

  export default async function LocaleLayout({
    children,
    params: {locale}
  }: {
    children: React.ReactNode;
    params: {locale: string};
  }) {
    const messages = await getMessages();

    return (
      <html lang={locale}>
        <body>
          <NextIntlClientProvider messages={messages}>
            {children}
          </NextIntlClientProvider>
        </body>
      </html>
    );
  }

  2. Add Language Switcher

  // components/language-switcher.tsx
  export function LanguageSwitcher() {
    const locale = useLocale();
    const router = useRouter();
    const pathname = usePathname();

    return (
      <Select value={locale} onValueChange={(newLocale) => {
        router.push(pathname.replace(`/${locale}`, `/${newLocale}`));
      }}>
        <SelectValue />
        <SelectContent>
          <SelectItem value="en">English</SelectItem>
          <SelectItem value="es">Español</SelectItem>
          <SelectItem value="fr">Français</SelectItem>
        </SelectContent>
      </Select>
    );
  }

  🎯 Specific Refactoring Examples

  Constants.ts Transformation

  // Before
  export const NAVIGATION_ITEMS = [
    { href: "/", label: "Home" },
    { href: "/#services", label: "Services" },
  ];

  // After - just keys
  export const NAVIGATION_ITEMS = [
    { href: "/", labelKey: "nav.home" },
    { href: "/#services", labelKey: "nav.services" },
  ];

  Component Usage

  // Before
  {NAVIGATION_ITEMS.map((item) => (
    <Link href={item.href}>{item.label}</Link>
  ))}

  // After
  const t = useTranslations('nav');
  {NAVIGATION_ITEMS.map((item) => (
    <Link href={item.href}>{t(item.labelKey)}</Link>
  ))}

  ⚠️ Challenges to Consider

  1. Font Support: LoveFrom Serif might not support all character sets
  2. Text Length: German ~30% longer, affects layout
  3. RTL Languages: Would need CSS adjustments
  4. Medical Terms: Need professional translation
  5. Legal Compliance: Different disclaimers per country

  📅 Realistic Timeline

  - Basic i18n (EN/ES): 3-4 days
  - Full implementation (EN/ES/FR): 5-6 days
  - With RTL support: +2 days
  - With full testing: +2 days

  🤔 Should You Do It?

  Pros:
  - Clean architecture makes it feasible
  - Early enough to avoid major refactoring
  - Opens global market

  Cons:
  - Adds complexity
  - Ongoing translation costs
  - More testing required
  - Slower feature development

  My recommendation: If you plan to serve non-English speakers within 6 months, implement it now. Otherwise, keep the current clean architecture
   but wait until you have market validation.