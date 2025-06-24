"use client"

import { useState } from "react"

import Link from "next/link"

import { Menu } from "lucide-react"

import { Container } from "@/components/layout/container"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { 
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu"
import { Sheet, SheetContent, SheetTrigger, SheetHeader, SheetTitle } from "@/components/ui/sheet"
import { useTranslations, useLocale } from "@/i18n/client"
import { createLocalizedHref, usePathname } from "@/i18n/navigation"
import { NAVIGATION_ITEMS, EMSCULPT_SUBMENU_ITEMS, EMFACE_SUBMENU_ITEMS } from "@/lib/constants"
import { applyScrollbarPadding } from "@/lib/scrollbar-gutter-fallback"
import { cn } from "@/lib/utils"

export function Navigation() {
  const pathname = usePathname()
  const [isOpen, setIsOpen] = useState(false)
  const t = useTranslations()
  const locale = useLocale()

  return (
    <nav className="fixed top-10 w-screen bg-background bg-opacity-80 backdrop-blur-md z-40">
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
                {item.labelKey === "nav_emsculpt_neo" ? (
                  // EMSculpt Neo with dropdown
                  <>
                    <NavigationMenuTrigger className={cn(
                      "group relative inline-flex h-10 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-semibold transition-colors hover:bg-teal-50 hover:text-teal-800 focus:bg-teal-50 focus:text-teal-800 focus:outline-none disabled:pointer-events-none disabled:opacity-50",
                      pathname.startsWith(item.href) && "after:content-[''] after:absolute after:bottom-0 after:left-1/2 after:-translate-x-1/2 after:w-6 after:h-0.5 after:bg-[#1f5f5b]"
                    )}>
                      {t(item.labelKey)}
                    </NavigationMenuTrigger>
                    <NavigationMenuContent className="md:left-0">
                      <div className="grid w-[400px] gap-3 p-4">
                        {EMSCULPT_SUBMENU_ITEMS.map((subItem) => (
                          <Link 
                            key={subItem.href}
                            href={createLocalizedHref(subItem.href, locale)}
                            className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                          >
                            <div className="text-sm font-semibold leading-none">
                              {t(subItem.titleKey)}
                            </div>
                            <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                              {t(subItem.descriptionKey)}
                            </p>
                          </Link>
                        ))}
                      </div>
                    </NavigationMenuContent>
                  </>
                ) : item.labelKey === "nav_emface" ? (
                  // EMFace with dropdown
                  <>
                    <NavigationMenuTrigger className={cn(
                      "group relative inline-flex h-10 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-semibold transition-colors hover:bg-teal-50 hover:text-teal-800 focus:bg-teal-50 focus:text-teal-800 focus:outline-none disabled:pointer-events-none disabled:opacity-50",
                      pathname.startsWith(item.href) && "after:content-[''] after:absolute after:bottom-0 after:left-1/2 after:-translate-x-1/2 after:w-6 after:h-0.5 after:bg-[#1f5f5b]"
                    )}>
                      {t(item.labelKey)}
                    </NavigationMenuTrigger>
                    <NavigationMenuContent align="start" sideOffset={6} className="md:left-0" data-align="left">
                      <div className="grid w-[400px] gap-3 p-4">
                        {EMFACE_SUBMENU_ITEMS.map((subItem) => (
                          <Link 
                            key={subItem.href}
                            href={createLocalizedHref(subItem.href, locale)}
                            className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                          >
                            <div className="text-sm font-semibold leading-none">
                              {t(subItem.titleKey)}
                            </div>
                            <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                              {t(subItem.descriptionKey)}
                            </p>
                          </Link>
                        ))}
                      </div>
                    </NavigationMenuContent>
                  </>
                ) : (
                  // Regular navigation items
                  <Link href={createLocalizedHref(item.href, locale)} legacyBehavior passHref>
                    <NavigationMenuLink className={cn(
                      "group relative inline-flex h-10 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-semibold transition-colors hover:bg-teal-50 hover:text-teal-800 focus:bg-teal-50 focus:text-teal-800 focus:outline-none disabled:pointer-events-none disabled:opacity-50",
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
                )}
              </NavigationMenuItem>
            ))}
          </NavigationMenuList>
        </NavigationMenu>

        {/* Desktop Book Online CTA - Right */}
        <div className="hidden md:flex items-center gap-2">
          <Button asChild size="sm" className="font-semibold group">
            <Link href={createLocalizedHref("/contact", locale)}>
              Book Online
              <span className="inline-block transition-transform group-hover:translate-x-1 ml-2">→</span>
            </Link>
          </Button>
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
              <SheetTitle className="font-display text-xl font-semibold">{t("nav_menu")}</SheetTitle>
            </SheetHeader>
            <nav className="flex flex-col space-y-1 mt-8">
              {NAVIGATION_ITEMS.map((item) => (
                <Link
                  key={item.href}
                  href={createLocalizedHref(item.href, locale)}
                  onClick={() => setIsOpen(false)}
                  className={cn(
                    "block px-4 py-3 text-lg font-semibold transition-colors hover:text-primary",
                    pathname === item.href
                      ? "text-foreground bg-muted"
                      : "text-muted-foreground"
                  )}
                >
                  {t(item.labelKey)}
                </Link>
              ))}
            </nav>
            
            {/* Mobile Book Online CTA - Bottom of sheet */}
            <div className="absolute bottom-8 left-6 right-6 flex items-center justify-center">
              <Button asChild size="sm" className="font-semibold w-full group">
                <Link href={createLocalizedHref("/contact", locale)} onClick={() => setIsOpen(false)}>
                  Book Online
                  <span className="inline-block transition-transform group-hover:translate-x-1 ml-2">→</span>
                </Link>
              </Button>
            </div>
          </SheetContent>
        </Sheet>
      </Container>
    </nav>
  )
}