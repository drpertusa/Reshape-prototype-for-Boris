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
    <div 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-400 ease-in-out ${
        isAnimating ? '-translate-y-full opacity-0' : 'translate-y-0 opacity-100'
      }`}
      style={{ backgroundColor: '#E6D5F6' }}
    >
      <div className="relative max-w-7xl mx-auto">
        <div className="flex items-center justify-center px-12 py-4">
          <div className="text-center">
            <p className="text-sm font-medium flex items-center justify-center gap-2 flex-wrap text-gray-800">
              <Badge className="bg-yellow-400 text-black font-bold px-3 py-1 shadow-sm">1</Badge>
              <span>Free Session for every</span>
              <Badge className="bg-[#9B72CF] text-white font-semibold px-3 py-1 shadow-sm">5</Badge>
              <span>booked. On all machines.</span>
              <Badge className="bg-[#7B5AA6] text-white font-bold px-3 py-1 shadow-sm">Forever!</Badge>
            </p>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={handleDismiss}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-600 hover:text-gray-800 hover:bg-purple-200/50 p-2 h-8 w-8 rounded-full transition-colors"
            aria-label="Close banner"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  )
}