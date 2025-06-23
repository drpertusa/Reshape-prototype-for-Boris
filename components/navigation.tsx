"use client"

import { useState } from "react"

import Link from "next/link"

import { Menu } from "lucide-react"

import { LanguageSwitcher } from "@/components/language-switcher"
import { Container } from "@/components/layout/container"
import { ThemeToggle } from "@/components/theme-toggle"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { 
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
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
    <nav className="fixed top-0 w-screen bg-background bg-opacity-80 backdrop-blur-md z-50">
      <Container className="h-16 flex items-center justify-between">
        {/* Logo - Always left */}
        <Link href={createLocalizedHref("/", locale)} className="flex items-center">
          <img src="/logo-wordmark-cropped.svg" alt="Reshape" className="h-9 w-auto" />
        </Link>

        {/* Desktop Navigation with NavigationMenu */}
        <NavigationMenu className="hidden md:block">
          <NavigationMenuList>
            {NAVIGATION_ITEMS.map((item) => (
              <NavigationMenuItem key={item.href}>
                <Link href={createLocalizedHref(item.href, locale)} legacyBehavior passHref>
                  <NavigationMenuLink className={cn(
                    "group relative inline-flex h-10 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-teal-50 hover:text-teal-800 focus:bg-teal-50 focus:text-teal-800 focus:outline-none disabled:pointer-events-none disabled:opacity-50",
                    // Horizontal underline for active states using #1f5f5b
                    pathname === item.href && "after:content-[''] after:absolute after:bottom-0 after:left-1/2 after:-translate-x-1/2 after:w-6 after:h-0.5 after:bg-[#1f5f5b]"
                  )}>
                    <span className="flex items-center gap-2">
                      {t(item.labelKey)}
                      {(item.labelKey === "nav_exion" || item.labelKey === "nav_injectables") && (
                        <Badge variant="black" className="text-xs">NEW</Badge>
                      )}
                    </span>
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