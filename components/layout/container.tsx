import { cn } from "@/lib/utils"

interface ContainerProps {
  children: React.ReactNode
  className?: string
  size?: "sm" | "md" | "lg" | "xl" | "full"
}

const containerSizes = {
  sm: "max-w-2xl",
  md: "max-w-4xl", 
  lg: "max-w-6xl",
  xl: "max-w-7xl",
  full: "max-w-full",
} as const

export function Container({ 
  children, 
  className,
  size = "xl" 
}: ContainerProps) {
  return (
    <div className={cn(
      "mx-auto px-6",
      containerSizes[size],
      className
    )}>
      {children}
    </div>
  )
}