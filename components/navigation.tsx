"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Menu } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { ThemeToggle } from "@/components/theme-toggle"
import { cn } from "@/lib/utils"

const routes = [
  { href: "/", label: "Home" },
  { href: "/#services", label: "Services" },
  { href: "/#philosophy", label: "Philosophy" },
  { href: "/contact", label: "Contact" },
]

export function Navigation() {
  const pathname = usePathname()

  return (
    <nav className="fixed top-0 w-full bg-background/80 backdrop-blur-md z-50 border-b">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo - Always left */}
        <Link href="/" className="font-fraunces text-2xl">
          Reshape
        </Link>

        {/* Desktop Navigation - Center */}
        <div className="hidden md:flex items-center space-x-8">
          {routes.map((route) => (
            <Link
              key={route.href}
              href={route.href}
              className={cn(
                "text-sm font-medium transition-colors hover:text-primary",
                pathname === route.href
                  ? "text-foreground"
                  : "text-muted-foreground"
              )}
            >
              {route.label}
            </Link>
          ))}
        </div>

        {/* Desktop Theme Toggle - Right */}
        <div className="hidden md:block">
          <ThemeToggle />
        </div>

        {/* Mobile Menu - Right */}
        <Sheet>
          <SheetTrigger asChild className="md:hidden">
            <Button variant="ghost" size="icon">
              <Menu className="h-5 w-5" />
              <span className="sr-only">Toggle menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-[300px] sm:w-[400px]">
            <nav className="flex flex-col space-y-1 mt-8">
              {routes.map((route) => (
                <Link
                  key={route.href}
                  href={route.href}
                  className={cn(
                    "block px-4 py-3 text-lg font-medium transition-colors hover:text-primary",
                    pathname === route.href
                      ? "text-foreground bg-muted"
                      : "text-muted-foreground"
                  )}
                >
                  {route.label}
                </Link>
              ))}
            </nav>
            
            {/* Mobile Theme Toggle - Bottom of sheet */}
            <div className="absolute bottom-8 left-6">
              <ThemeToggle />
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </nav>
  )
}