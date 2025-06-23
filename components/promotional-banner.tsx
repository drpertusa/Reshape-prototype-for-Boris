"use client"

import { useState } from "react"

import { X } from "lucide-react"

import { Button } from "@/components/ui/button"

export function PromotionalBanner() {
  const [isVisible, setIsVisible] = useState(true)

  if (!isVisible) return null

  return (
    <div className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-r from-yellow-100 to-amber-100 text-amber-800 border-b border-amber-300">
      <div className="flex items-center justify-between px-4 py-2 max-w-7xl mx-auto">
        <div className="flex-1 text-center">
          <p className="text-sm font-medium">
            <span className="font-bold">1 Free Session</span> for every <span className="font-bold">5 booked</span>. On all machines. <span className="font-bold">Forever!</span>
          </p>
        </div>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setIsVisible(false)}
          className="text-amber-600 hover:bg-amber-200 p-1 h-6 w-6"
        >
          <X className="h-4 w-4" />
          <span className="sr-only">Close banner</span>
        </Button>
      </div>
    </div>
  )
}