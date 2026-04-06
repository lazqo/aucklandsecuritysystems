'use client'

import { useEffect, useRef, useCallback } from 'react'
import { usePathname } from 'next/navigation'
import Script from 'next/script'
import { AnalyticsContext, trackEvent, type AnalyticsEventName, type AnalyticsEventProperties } from '@/lib/analytics/events'
import type { ReactNode } from 'react'

const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID

interface AnalyticsProviderProps {
  children: ReactNode
}

export function AnalyticsProvider({ children }: AnalyticsProviderProps) {
  const pathname = usePathname()
  const prevPathname = useRef<string | null>(null)

  // Fire page_view on navigation
  useEffect(() => {
    if (prevPathname.current !== null && prevPathname.current !== pathname) {
      trackEvent('page_view', { path: pathname })
    }
    prevPathname.current = pathname
  }, [pathname])

  const track = useCallback(
    <E extends AnalyticsEventName>(event: E, properties?: AnalyticsEventProperties[E]) => {
      trackEvent(event, properties as Record<string, unknown>)
    },
    []
  )

  return (
    <AnalyticsContext.Provider value={{ track }}>
      {GA_MEASUREMENT_ID && (
        <>
          <Script
            src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
            strategy="afterInteractive"
          />
          <Script id="gtag-init" strategy="afterInteractive">
            {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${GA_MEASUREMENT_ID}', { page_path: '${pathname}' });
            `}
          </Script>
        </>
      )}
      {children}
    </AnalyticsContext.Provider>
  )
}
