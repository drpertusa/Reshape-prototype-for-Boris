"use client"

import * as React from "react"

import * as SelectPrimitive from "@radix-ui/react-select"

import { applyScrollbarPadding } from "@/lib/scrollbar-gutter-fallback"

import { Select } from "./select"

type SelectWithFallbackProps = React.ComponentPropsWithoutRef<typeof SelectPrimitive.Root>

export function SelectWithFallback({ onOpenChange, ...props }: SelectWithFallbackProps) {
  const handleOpenChange = (open: boolean) => {
    applyScrollbarPadding(open)
    onOpenChange?.(open)
  }

  return <Select onOpenChange={handleOpenChange} {...props} />
}