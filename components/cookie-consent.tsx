'use client'

import { useEffect, useState } from 'react'

import Link from 'next/link'

import { Button } from '@/components/ui/button'
import { Drawer, DrawerContent } from '@/components/ui/drawer'
import { useTranslations } from '@/i18n/client'

export function CookieConsent() {
  const t = useTranslations()
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
    <Drawer open={show} onOpenChange={setShow}>
      <DrawerContent className="h-auto border-0">
        <div className="mx-auto w-full max-w-prose p-6 sm:p-8">
          <p className="text-base leading-relaxed mb-6">
            {t("cookie_consent_text")}
          </p>
          
          <div className="flex flex-col sm:flex-row gap-3">
            <Button
              variant="default"
              size="sm"
              onClick={() => handleConsent('essential')}
              disabled={isLoading}
              className="flex-1"
            >
              {t("cookie_consent_accept")}
            </Button>
            
            <Button
              variant="ghost"
              size="sm"
              asChild
              className="flex-1"
            >
              <Link href="/privacy#cookies">
                {t("cookie_consent_privacy")}
              </Link>
            </Button>
          </div>
        </div>
      </DrawerContent>
    </Drawer>
  )
}