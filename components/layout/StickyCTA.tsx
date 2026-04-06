'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { cn } from '@/lib/utils'
import { useAnalytics } from '@/lib/analytics/events'

interface StickyCTAProps {
  primaryLabel?: string
  primaryHref?: string
  secondaryLabel?: string
  secondaryHref?: string
  showAfterScrollPx?: number
  pageContext?: string
}

export function StickyCTA({
  primaryLabel = 'Find my best setup →',
  primaryHref = '/quiz',
  secondaryLabel = 'Get a quote',
  secondaryHref = '/?quote=open',
  showAfterScrollPx = 400,
  pageContext = 'general',
}: StickyCTAProps) {
  const [visible, setVisible] = useState(false)
  const { track } = useAnalytics()

  useEffect(() => {
    const onScroll = () => {
      setVisible(window.scrollY > showAfterScrollPx)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [showAfterScrollPx])

  return (
    <div
      className={cn(
        'fixed bottom-0 left-0 right-0 z-50 transition-transform duration-300 ease-out md:hidden',
        visible ? 'translate-y-0' : 'translate-y-full'
      )}
      aria-hidden={!visible}
    >
      <div className="bg-white border-t border-neutral-200 shadow-lg px-4 py-3 safe-area-pb">
        <div className="flex items-center gap-3 max-w-md mx-auto">
          <Link
            href={secondaryHref}
            className="flex-1 text-center py-3 px-4 rounded-xl border border-brand-200 text-brand-600 font-semibold text-sm hover:bg-brand-50 transition-colors"
            onClick={() => track('sticky_cta_click', { label: secondaryLabel, page_context: pageContext })}
          >
            {secondaryLabel}
          </Link>
          <Link
            href={primaryHref}
            className="flex-1 text-center py-3 px-4 rounded-xl bg-brand-600 text-white font-semibold text-sm hover:bg-brand-700 transition-colors"
            onClick={() => track('sticky_cta_click', { label: primaryLabel, page_context: pageContext })}
          >
            {primaryLabel}
          </Link>
        </div>
      </div>
    </div>
  )
}
