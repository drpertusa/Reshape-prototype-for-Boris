"use client"

import { useState } from "react"

import Link from "next/link"

import { Menu } from "lucide-react"

import { LanguageSwitcher } from "@/components/language-switcher"
import { Container } from "@/components/layout/container"
import { ThemeToggle } from "@/components/theme-toggle"
import { Button } from "@/components/ui/button"
import { 
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"
import { Sheet, SheetContent, SheetTrigger, SheetHeader, SheetTitle } from "@/components/ui/sheet"
import { useTranslations, useLocale } from "@/i18n/client"
import { createLocalizedHref, usePathname } from "@/i18n/navigation"
import { NAVIGATION_ITEMS } from "@/lib/constants"
import { applyScrollbarPadding } from "@/lib/scrollbar-gutter-fallback"
import { cn } from "@/lib/utils"

export function Navigation() {
  const pathname = usePathname()
  const [isOpen, setIsOpen] = useState(false)
  const t = useTranslations()
  const locale = useLocale()

  return (
    <nav className="fixed top-0 w-screen bg-background bg-opacity-80 backdrop-blur-md z-50 border-b">
      <Container className="h-16 flex items-center justify-between">
        {/* Logo - Always left */}
        <Link href={createLocalizedHref("/", locale)} className="font-display text-2xl">
          {t("site_name")}
        </Link>

        {/* Desktop Navigation with NavigationMenu */}
        <NavigationMenu className="hidden md:block">
          <NavigationMenuList>
            {NAVIGATION_ITEMS.map((item) => (
              <NavigationMenuItem key={item.href}>
                <Link href={createLocalizedHref(item.href, locale)} legacyBehavior passHref>
                  <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                    {t(item.labelKey)}
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
            ))}
          </NavigationMenuList>
        </NavigationMenu>

        {/* Desktop Theme Toggle and Language Switcher - Right */}
        <div className="hidden md:flex items-center gap-2">
          <LanguageSwitcher />
          <ThemeToggle />
        </div>

        {/* Mobile Menu - Right */}
        <Sheet open={isOpen} onOpenChange={(open) => {
          setIsOpen(open)
          applyScrollbarPadding(open)
        }}>
          <SheetTrigger asChild className="md:hidden">
            <Button variant="ghost" size="icon">
              <Menu className="h-5 w-5" />
              <span className="sr-only">{t("nav_toggle_menu")}</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-[300px] sm:w-[400px]">
            <SheetHeader>
              <SheetTitle className="font-display text-xl">{t("nav_menu")}</SheetTitle>
            </SheetHeader>
            <nav className="flex flex-col space-y-1 mt-8">
              {NAVIGATION_ITEMS.map((item) => (
                <Link
                  key={item.href}
                  href={createLocalizedHref(item.href, locale)}
                  onClick={() => setIsOpen(false)}
                  className={cn(
                    "block px-4 py-3 text-lg font-medium transition-colors hover:text-primary",
                    pathname === item.href
                      ? "text-foreground bg-muted"
                      : "text-muted-foreground"
                  )}
                >
                  {t(item.labelKey)}
                </Link>
              ))}
            </nav>
            
            {/* Mobile Theme Toggle and Language Switcher - Bottom of sheet */}
            <div className="absolute bottom-8 left-6 right-6 flex items-center justify-between">
              <LanguageSwitcher />
              <ThemeToggle />
            </div>
          </SheetContent>
        </Sheet>
      </Container>
    </nav>
  )
}