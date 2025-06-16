import { cn } from "@/lib/utils"
import { Container } from "./container"

interface SectionProps {
  children: React.ReactNode
  className?: string
  containerClassName?: string
  containerSize?: "sm" | "md" | "lg" | "xl" | "full"
  id?: string
  variant?: "default" | "muted" | "transparent"
}

const sectionVariants = {
  default: "bg-background",
  muted: "bg-muted bg-opacity-30",
  transparent: "bg-transparent",
} as const

export function Section({ 
  children, 
  className,
  containerClassName,
  containerSize = "lg",
  id,
  variant = "default"
}: SectionProps) {
  return (
    <section 
      id={id}
      className={cn(
        "py-20",
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