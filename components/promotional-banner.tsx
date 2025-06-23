"use client"

import { useState, useEffect } from "react"

import { usePathname } from "next/navigation"

import { X } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

export function PromotionalBanner() {
  const [isVisible, setIsVisible] = useState(true)
  const [isAnimating, setIsAnimating] = useState(false)
  const pathname = usePathname()

  // Auto-dismiss after 1 minute with gentle animation
  useEffect(() => {
    const timer = setTimeout(() => {
      if (isVisible) {
        handleDismiss()
      }
    }, 60000) // 1 minute

    return () => clearTimeout(timer)
  }, [isVisible])

  // Reappear on page navigation (after initial dismissal)
  useEffect(() => {
    const wasDismissed = sessionStorage.getItem('promo-banner-dismissed')
    const lastDismissTime = sessionStorage.getItem('promo-banner-dismiss-time')
    
    if (wasDismissed && lastDismissTime) {
      const dismissTime = parseInt(lastDismissTime)
      const now = Date.now()
      const timeSinceDismiss = now - dismissTime
      
      // Reappear after 10 minutes of browsing or on new page after 2 minutes
      if (timeSinceDismiss > 600000 || timeSinceDismiss > 120000) {
        setIsVisible(true)
        sessionStorage.removeItem('promo-banner-dismissed')
        sessionStorage.removeItem('promo-banner-dismiss-time')
      } else {
        setIsVisible(false)
      }
    }
  }, [pathname])

  const handleDismiss = () => {
    setIsAnimating(true)
    sessionStorage.setItem('promo-banner-dismissed', 'true')
    sessionStorage.setItem('promo-banner-dismiss-time', Date.now().toString())
    
    // Wait for animation to complete before hiding
    setTimeout(() => {
      setIsVisible(false)
      setIsAnimating(false)
    }, 400)
  }

  if (!isVisible) return null

  return (
    <div className={`fixed top-0 left-0 right-0 z-50 bg-background text-foreground transition-all duration-400 ease-in-out ${
      isAnimating ? '-translate-y-full opacity-0' : 'translate-y-0 opacity-100'
    }`}>
      <div className="flex items-center px-4 py-2 max-w-7xl mx-auto">
        <div className="flex-1 text-center">
          <p className="text-sm font-medium flex items-center justify-center gap-1 flex-wrap">
            <Badge className="bg-gradient-to-r from-yellow-400 to-amber-500 text-black font-bold px-2 py-1">1</Badge>
            <span>Free Session for every</span>
            <Badge className="bg-[#1f5f5b] text-white font-semibold px-2 py-1">5</Badge>
            <span>booked. On all machines.</span>
            <Badge className="bg-gradient-to-r from-emerald-500 to-teal-600 text-white font-bold px-2 py-1">Forever!</Badge>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleDismiss}
              className="text-muted-foreground hover:bg-muted p-1 h-6 w-6 ml-1"
            >
              <X className="h-4 w-4" />
              <span className="sr-only">Close banner</span>
            </Button>
          </p>
        </div>
      </div>
    </div>
  )
}