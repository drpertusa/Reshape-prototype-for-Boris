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
      style={{ backgroundColor: '#DCC9E8' }}
    >
      <div className="relative w-full">
        <div className="flex items-center justify-center px-4 sm:px-6 py-2.5">
          <div className="text-center">
            <p className="text-[13px] font-normal flex items-center justify-center gap-1.5 flex-wrap" style={{ color: '#1A1A1A' }}>
              <Badge className="bg-[#FFD700] text-black font-semibold text-[11px] px-2 py-0.5 h-5 rounded-full">1</Badge>
              <span>Free Session for every</span>
              <Badge className="bg-[#8B6AA7] text-white font-semibold text-[11px] px-2 py-0.5 h-5 rounded-full">5</Badge>
              <span>booked. On all machines.</span>
              <Badge className="bg-[#6B4A85] text-white font-semibold text-[11px] px-2 py-0.5 h-5 rounded-full">Forever!</Badge>
            </p>
          </div>
          <button
            onClick={handleDismiss}
            className="absolute right-3 sm:right-4 top-1/2 -translate-y-1/2 text-[#1A1A1A] hover:opacity-70 transition-opacity p-1"
            aria-label="Close banner"
          >
            <X className="h-3.5 w-3.5" strokeWidth={2.5} />
          </button>
        </div>
      </div>
    </div>
  )
}