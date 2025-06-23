"use client"

import { useState } from "react"

import { X } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

export function PromotionalBanner() {
  const [isVisible, setIsVisible] = useState(true)

  if (!isVisible) return null

  return (
    <div className="fixed top-0 left-0 right-0 z-50 bg-background text-foreground">
      <div className="flex items-center px-4 py-2 max-w-7xl mx-auto">
        <div className="flex-1 text-center">
          <p className="text-sm font-medium flex items-center justify-center gap-1 flex-wrap">
            <Badge className="bg-gradient-to-r from-yellow-400 to-amber-500 text-black font-bold px-2 py-1">1</Badge>
            <span>Free Session for every</span>
            <Badge className="bg-[#1f5f5b] text-white font-semibold px-2 py-1">5</Badge>
            <span>booked. On all machines.</span>
            <Badge className="bg-gradient-to-r from-emerald-500 to-teal-600 text-white font-bold px-2 py-1">Forever!</Badge>
          </p>
        </div>
        <div className="ml-1">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsVisible(false)}
            className="text-muted-foreground hover:bg-muted p-1 h-6 w-6"
          >
            <X className="h-4 w-4" />
            <span className="sr-only">Close banner</span>
          </Button>
        </div>
      </div>
    </div>
  )
}