import Link from 'next/link'

import { ArrowRight } from 'lucide-react'

import { cn } from '@/lib/utils'

import { getRelatedContent } from '../lib/internal-linking'

interface RelatedContentProps {
  currentPath: string
  locale: string
  title?: string
  className?: string
}

export function RelatedContent({
  currentPath,
  locale,
  title = 'Related Pages',
  className
}: RelatedContentProps) {
  const related = getRelatedContent(currentPath, locale)
  
  if (related.length === 0) return null
  
  return (
    <div className={cn('related-content', className)}>
      <h3 className="text-lg font-semibold mb-4">{title}</h3>
      <div className="space-y-3">
        {related.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="group block p-4 border rounded-lg hover:border-primary transition-colors"
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <h4 className="font-medium group-hover:text-primary transition-colors">
                  {item.title}
                </h4>
                <p className="text-sm text-muted-foreground mt-1">
                  {item.description}
                </p>
              </div>
              <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors mt-1 flex-shrink-0" />
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}