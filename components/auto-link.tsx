"use client"

import Link from 'next/link'
import React from 'react'
import { findInternalLinks } from '../lib/internal-linking'

interface AutoLinkProps {
  children: string
  currentPath: string
  locale: string
  maxLinks?: number
  className?: string
}

export function AutoLink({
  children,
  currentPath,
  locale,
  maxLinks = 2,
  className = 'text-primary underline-offset-4 hover:underline'
}: AutoLinkProps) {
  const links = findInternalLinks(children, currentPath, locale, maxLinks)
  
  if (links.length === 0) {
    return <>{children}</>
  }
  
  let remaining = children
  const parts: (string | React.ReactElement)[] = []
  const usedKeywords = new Set<string>()
  
  for (const link of links) {
    // Skip if we already used this keyword
    if (usedKeywords.has(link.text.toLowerCase())) continue
    
    const regex = new RegExp(`\\b(${link.text})\\b`, 'i')
    const match = remaining.match(regex)
    
    if (match && match.index !== undefined) {
      // Add text before the link
      if (match.index > 0) {
        parts.push(remaining.substring(0, match.index))
      }
      
      // Add the link
      parts.push(
        <Link
          key={`${link.href}-${parts.length}`}
          href={link.href}
          className={className}
          title={link.title}
        >
          {match[0]}
        </Link>
      )
      
      // Update remaining text
      remaining = remaining.substring(match.index + match[0].length)
      usedKeywords.add(link.text.toLowerCase())
    }
  }
  
  // Add any remaining text
  if (remaining) {
    parts.push(remaining)
  }
  
  return <>{parts}</>
}