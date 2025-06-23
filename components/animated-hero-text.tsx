"use client"

import { useState, useEffect } from "react"

const treatments = [
  "EMSculpt NEO",
  "EMFace", 
  "Exion",
  "EMSella"
]

export function AnimatedHeroText() {
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % treatments.length)
    }, 2000) // Change every 2 seconds

    return () => clearInterval(interval)
  }, [])

  return (
    <span className="relative inline-block min-w-[400px] min-h-[1.5em] text-center whitespace-nowrap">
      {treatments.map((treatment, index) => (
        <span
          key={treatment}
          className={`absolute inset-0 flex items-center justify-center transition-all duration-800 ease-out ${
            index === currentIndex
              ? "opacity-100"
              : "opacity-0"
          }`}
          style={{
            background: index === currentIndex 
              ? 'transparent'
              : `repeating-linear-gradient(
                  90deg,
                  transparent 0px,
                  transparent 3px,
                  #000 3px,
                  #000 4px
                )`,
            WebkitBackgroundClip: 'text',
            backgroundClip: 'text',
            WebkitTextFillColor: index === currentIndex ? 'inherit' : 'transparent',
            color: index === currentIndex ? 'inherit' : 'transparent',
            filter: index === currentIndex ? 'none' : 'blur(0.3px)',
            transform: index === currentIndex ? 'scaleX(1)' : 'scaleX(1.02)',
          }}
        >
          {treatment}
        </span>
      ))}
      {/* Hidden text for SEO - all treatments included */}
      <span className="sr-only">EMSculpt NEO, EMFace, Exion, EMSella</span>
    </span>
  )
}