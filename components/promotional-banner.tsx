"use client"

import { useState, useEffect } from "react"
import { usePathname } from "next/navigation"
import { X } from "lucide-react"
import { Badge } from "@/components/ui/badge"

export function PromotionalBanner() {
  const [isVisible, setIsVisible] = useState(true)
  const [isAnimating, setIsAnimating] = useState(false)
  const pathname = usePathname()

  /* --------  auto-dismiss & restore logic (unchanged)  -------- */
  useEffect(() => {
    const t = setTimeout(() => isVisible && handleDismiss(), 60_000)
    return () => clearTimeout(t)
  }, [isVisible])

  useEffect(() => {
    const d = sessionStorage.getItem("promo-banner-dismissed")
    const ts = sessionStorage.getItem("promo-banner-dismiss-time")
    if (d && ts) {
      const age = Date.now() - parseInt(ts, 10)
      if (age > 10 * 60_000 || age > 2 * 60_000) {
        setIsVisible(true)
        sessionStorage.removeItem("promo-banner-dismissed")
        sessionStorage.removeItem("promo-banner-dismiss-time")
      } else {
        setIsVisible(false)
      }
    }
  }, [pathname])

  const handleDismiss = () => {
    setIsAnimating(true)
    sessionStorage.setItem("promo-banner-dismissed", "true")
    sessionStorage.setItem("promo-banner-dismiss-time", Date.now().toString())
    setTimeout(() => {
      setIsVisible(false)
      setIsAnimating(false)
    }, 400)
  }

  if (!isVisible) return null

  /* ----------  Treatwell-styled banner  ---------- */
  return (
    <div
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-in-out shadow-sm ${
        isAnimating ? "-translate-y-full opacity-0" : "translate-y-0 opacity-100"
      }`}
      style={{ backgroundColor: "#EDE7F6" }} /* pale lilac like Treatwell */
    >
      <div className="relative w-full">
        <div className="flex items-center justify-center px-3 sm:px-4 py-2 min-h-[34px]">
          <p className="text-[12px] sm:text-[13px] font-medium flex items-center gap-1 sm:gap-1.5 flex-wrap text-[#1A1A1A]">
            <Badge className="bg-[#F9D648] text-black font-semibold text-[10px] px-2 py-0.5 h-5 rounded-full min-w-[20px] flex justify-center">
              1
            </Badge>
            <span>Free Session for every</span>
            <Badge className="bg-[#8B6AA7] text-white font-semibold text-[10px] px-2 py-0.5 h-5 rounded-full min-w-[20px] flex justify-center">
              5
            </Badge>
            <span>booked. On all machines.</span>
            <Badge className="bg-[#6B4A85] text-white font-semibold text-[10px] px-2 py-0.5 h-5 rounded-full min-w-[56px] flex justify-center">
              Forever!
            </Badge>
          </p>

          {/* close (X) button, 12 px icon, right-aligned */}
          <button
            onClick={handleDismiss}
            aria-label="Close banner"
            className="absolute right-3 sm:right-4 top-1/2 -translate-y-1/2 text-[#1A1A1A] hover:opacity-70 transition-opacity p-1"
          >
            <X className="h-3 w-3" strokeWidth={2} />
          </button>
        </div>
      </div>
    </div>
  )
}