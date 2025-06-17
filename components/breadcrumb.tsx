"use client"

import Link from "next/link"

import { ChevronRight, Home } from "lucide-react"

import { useLocale } from "@/i18n/client"
import { createLocalizedHref } from "@/i18n/navigation"
import { site } from "@/lib/site"
import { cn } from "@/lib/utils"

export interface BreadcrumbItem {
  name: string
  href?: string
}

interface BreadcrumbProps {
  items: BreadcrumbItem[]
  className?: string
  showHome?: boolean
  homeLabel?: string
}

export function Breadcrumb({ 
  items, 
  className,
  showHome = true,
  homeLabel = "Home"
}: BreadcrumbProps) {
  const locale = useLocale()
  
  // Add home to breadcrumb items if requested
  const breadcrumbItems = showHome 
    ? [{ name: homeLabel, href: '/' }, ...items]
    : items
  
  return (
    <nav 
      aria-label="Breadcrumb"
      className={cn("breadcrumb", className)}
    >
      <ol 
        className="flex items-center space-x-2 text-sm"
        itemScope 
        itemType="https://schema.org/BreadcrumbList"
      >
        {breadcrumbItems.map((item, index) => {
          const isLast = index === breadcrumbItems.length - 1
          const itemUrl = item.href 
            ? site.absoluteUrl(item.href, locale)
            : undefined
          
          return (
            <li 
              key={index}
              className="flex items-center"
              itemProp="itemListElement" 
              itemScope 
              itemType="https://schema.org/ListItem"
            >
              {index > 0 && (
                <ChevronRight className="h-4 w-4 mx-2 text-muted-foreground flex-shrink-0" />
              )}
              
              {isLast || !item.href ? (
                <span 
                  className="text-muted-foreground"
                  itemProp="name"
                >
                  {index === 0 && showHome ? (
                    <Home className="h-4 w-4" />
                  ) : (
                    item.name
                  )}
                </span>
              ) : (
                <Link
                  href={createLocalizedHref(item.href, locale)}
                  className="text-muted-foreground hover:text-foreground transition-colors"
                  itemProp="item"
                >
                  <span itemProp="name">
                    {index === 0 && showHome ? (
                      <Home className="h-4 w-4" />
                    ) : (
                      item.name
                    )}
                  </span>
                </Link>
              )}
              
              {itemUrl && <meta itemProp="item" content={itemUrl} />}
              <meta itemProp="position" content={String(index + 1)} />
            </li>
          )
        })}
      </ol>
    </nav>
  )
}

// Server component version for better SEO
export function BreadcrumbStatic({ 
  items, 
  className,
  showHome = true,
  homeLabel = "Home",
  locale = 'en'
}: BreadcrumbProps & { locale?: string }) {
  const breadcrumbItems = showHome 
    ? [{ name: homeLabel, href: '/' }, ...items]
    : items
  
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": breadcrumbItems.map((item, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": item.name,
      "item": item.href ? site.absoluteUrl(item.href, locale) : undefined
    }))
  }
  
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <nav 
        aria-label="Breadcrumb"
        className={cn("breadcrumb", className)}
      >
        <ol className="flex items-center space-x-2 text-sm">
          {breadcrumbItems.map((item, index) => {
            const isLast = index === breadcrumbItems.length - 1
            
            return (
              <li key={index} className="flex items-center">
                {index > 0 && (
                  <ChevronRight className="h-4 w-4 mx-2 text-muted-foreground flex-shrink-0" />
                )}
                
                {isLast || !item.href ? (
                  <span className="text-muted-foreground">
                    {index === 0 && showHome ? (
                      <Home className="h-4 w-4" />
                    ) : (
                      item.name
                    )}
                  </span>
                ) : (
                  <a
                    href={`/${locale}${item.href}`}
                    className="text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {index === 0 && showHome ? (
                      <Home className="h-4 w-4" />
                    ) : (
                      item.name
                    )}
                  </a>
                )}
              </li>
            )
          })}
        </ol>
      </nav>
    </>
  )
}