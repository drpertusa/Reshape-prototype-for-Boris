import { cn } from "@/lib/utils"

interface ProseProps {
  children: React.ReactNode
  className?: string
  size?: "sm" | "base" | "lg"
}

const sizeClasses = {
  sm: "prose-sm",
  base: "prose",
  lg: "prose-lg"
} as const

export function Prose({ children, className, size = "base" }: ProseProps) {
  return (
    <div className={cn(
      "prose max-w-none",
      sizeClasses[size],
      "prose-headings:font-display",
      "prose-a:transition-opacity prose-a:duration-250",
      className
    )}>
      {children}
    </div>
  )
}