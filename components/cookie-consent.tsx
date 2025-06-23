'use client'

import { useEffect, useState } from 'react'

import Link from 'next/link'

import { Button } from '@/components/ui/button'
import { useLocale, useTranslations } from '@/i18n/client'

export function CookieConsent() {
  const t = useTranslations()
  const locale = useLocale()
  const [show, setShow] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    // Check if consent has been given
    const checkConsent = async () => {
      try {
        const res = await fetch('/api/consent')
        const data = await res.json()
        if (!data.consent) {
          setShow(true)
        }
      } catch {
        // If API fails, show banner to be safe
        setShow(true)
      }
    }
    checkConsent()
  }, [])

  const handleConsent = async (preference: 'essential' | 'all') => {
    setIsLoading(true)
    try {
      await fetch('/api/consent', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ preference }),
      })
      setShow(false)
    } catch (error) {
      console.error('Failed to save consent:', error)
    } finally {
      setIsLoading(false)
    }
  }

  if (!show) return null

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-gray-200 shadow-lg">
      <div className="w-full p-4 sm:p-6">
        <div className="mx-auto max-w-7xl flex items-center gap-4">
          {/* Text */}
          <p className="text-sm sm:text-base flex-1">
            {t("cookie_consent_text")}
          </p>
          
          {/* Buttons */}
          <div className="flex gap-3 flex-shrink-0">
            <Button
              variant="default"
              size="sm"
              onClick={() => handleConsent('essential')}
              disabled={isLoading}
              className="whitespace-nowrap"
            >
              {t("cookie_consent_accept")}
            </Button>
            
            <Button
              variant="ghost"
              size="sm"
              asChild
              className="whitespace-nowrap"
            >
              <Link href={`/${locale}/privacy#cookies`} target="_blank" rel="noopener noreferrer">
                {t("cookie_consent_privacy")}
              </Link>
            </Button>
          </div>

          {/* Larger X button on far right */}
          <button
            onClick={() => handleConsent('essential')}
            disabled={isLoading}
            className="p-2 hover:bg-black/5 rounded-full transition-colors flex-shrink-0"
            aria-label="Accept essential cookies"
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  )
}