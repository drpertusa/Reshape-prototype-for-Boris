import { cn } from "@/lib/utils"
import type { SectionProps } from "@/types"

import { Container } from "./container"

const sectionVariants = {
  default: "bg-background",
  muted: "bg-muted bg-opacity-30",
  transparent: "bg-transparent",
} as const

const gutters = {
  xs: 'py-12',  // 48px - Footer & utility sections
  sm: 'py-16',  // 64px - Standard (default)
  md: 'py-24',  // 96px - Hero & dramatic breaks
} as const

export function Section({ 
  children, 
  className,
  containerClassName,
  containerSize = "lg",
  id,
  variant = "default",
  gutter = "sm"
}: SectionProps) {
  return (
    <section 
      id={id}
      className={cn(
        gutters[gutter],
        sectionVariants[variant],
        className
      )}
    >
      <Container size={containerSize} className={containerClassName}>
        {children}
      </Container>
    </section>
  )
}