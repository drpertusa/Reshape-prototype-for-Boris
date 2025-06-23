"use client"

import { useState } from "react"

import { ChevronDown } from "lucide-react"

import { Prose } from "@/components/layout/prose"
import { cn } from "@/lib/utils"

interface FAQItem {
  question: string
  answer: string
  category?: string
}

interface FAQSectionProps {
  items: FAQItem[]
  title?: string
  description?: string
  className?: string
  showCategories?: boolean
}

export function FAQSection({
  items,
  title = "Frequently Asked Questions",
  description,
  className,
  showCategories = false
}: FAQSectionProps) {
  const [openItems, setOpenItems] = useState<Set<number>>(new Set())
  
  const toggleItem = (index: number) => {
    const newOpenItems = new Set(openItems)
    if (newOpenItems.has(index)) {
      newOpenItems.delete(index)
    } else {
      newOpenItems.add(index)
    }
    setOpenItems(newOpenItems)
  }
  
  // Group items by category if needed
  const groupedItems = showCategories
    ? items.reduce((acc, item, index) => {
        const category = item.category || 'General'
        if (!acc[category]) acc[category] = []
        acc[category].push({ ...item, originalIndex: index })
        return acc
      }, {} as Record<string, (FAQItem & { originalIndex: number })[]>)
    : { 'All': items.map((item, index) => ({ ...item, originalIndex: index })) }
  
  return (
    <section className={cn("faq-section", className)} itemScope itemType="https://schema.org/FAQPage">
      {title && (
        <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">{title}</h2>
      )}
      {description && (
        <p className="text-lg text-muted-foreground mb-8 max-w-3xl">{description}</p>
      )}
      
      <div className="space-y-8">
        {Object.entries(groupedItems).map(([category, categoryItems]) => (
          <div key={category}>
            {showCategories && category !== 'All' && (
              <h3 className="text-xl font-medium mb-4">{category}</h3>
            )}
            
            <div className="space-y-4">
              {categoryItems.map((item) => (
                <div
                  key={item.originalIndex}
                  className="border rounded-lg overflow-hidden"
                  itemScope
                  itemProp="mainEntity"
                  itemType="https://schema.org/Question"
                >
                  <button
                    onClick={() => toggleItem(item.originalIndex)}
                    className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-muted/50 transition-colors"
                    aria-expanded={openItems.has(item.originalIndex)}
                    aria-controls={`faq-answer-${item.originalIndex}`}
                  >
                    <h3 className="font-semibold pr-4" itemProp="name">
                      {item.question}
                    </h3>
                    <ChevronDown
                      className={cn(
                        "h-5 w-5 flex-shrink-0 transition-transform duration-200",
                        openItems.has(item.originalIndex) && "rotate-180"
                      )}
                    />
                  </button>
                  
                  <div
                    id={`faq-answer-${item.originalIndex}`}
                    className={cn(
                      "px-6 overflow-hidden transition-all duration-200",
                      openItems.has(item.originalIndex) ? "py-4" : "max-h-0"
                    )}
                    itemScope
                    itemProp="acceptedAnswer"
                    itemType="https://schema.org/Answer"
                  >
                    <Prose 
                      size="sm"
                      className="text-muted-foreground"
                    >
                      <div itemProp="text">
                        {item.answer}
                      </div>
                    </Prose>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

// Export a simplified static version for better AI/SEO parsing
export function FAQSectionStatic({ items, title, description, className }: FAQSectionProps) {
  return (
    <section className={cn("faq-section", className)} itemScope itemType="https://schema.org/FAQPage">
      {title && (
        <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">{title}</h2>
      )}
      {description && (
        <p className="text-lg text-muted-foreground mb-8 max-w-3xl">{description}</p>
      )}
      
      <dl className="space-y-6">
        {items.map((item, index) => (
          <div
            key={index}
            itemScope
            itemProp="mainEntity"
            itemType="https://schema.org/Question"
          >
            <dt className="font-semibold text-lg mb-2" itemProp="name">
              {item.question}
            </dt>
            <dd
              className="text-muted-foreground pl-4"
              itemScope
              itemProp="acceptedAnswer"
              itemType="https://schema.org/Answer"
            >
              <span itemProp="text">{item.answer}</span>
            </dd>
          </div>
        ))}
      </dl>
    </section>
  )
}