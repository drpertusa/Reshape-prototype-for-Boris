"use client"

import * as React from "react"
import * as SelectPrimitive from "@radix-ui/react-select"
import { Select } from "./select"
import { applyScrollbarPadding } from "@/lib/scrollbar-gutter-fallback"

type SelectWithFallbackProps = React.ComponentPropsWithoutRef<typeof SelectPrimitive.Root>

export function SelectWithFallback({ onOpenChange, ...props }: SelectWithFallbackProps) {
  const handleOpenChange = (open: boolean) => {
    applyScrollbarPadding(open)
    onOpenChange?.(open)
  }

  return <Select onOpenChange={handleOpenChange} {...props} />
}