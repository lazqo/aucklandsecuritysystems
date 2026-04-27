'use client'

import Link from 'next/link'
import type { ReactNode } from 'react'
import { usePathname } from 'next/navigation'
import { useAnalytics } from '@/lib/analytics/events'

type TrackKind = 'quote' | 'phone' | 'outbound-getsecure'

interface TrackedLinkProps {
  href: string
  children: ReactNode
  className?: string
  location: string
  label?: string
  kind: TrackKind
  external?: boolean
}

export function TrackedLink({
  href,
  children,
  className,
  location,
  label,
  kind,
  external = false,
}: TrackedLinkProps) {
  const pathname = usePathname()
  const { track } = useAnalytics()

  function handleClick() {
    if (kind === 'quote') {
      track('quote_cta_click', {
        label: label ?? String(children),
        href,
        location,
        page_path: pathname,
      })
      return
    }
    if (kind === 'phone') {
      track('phone_click', { location, page_path: pathname })
      return
    }
    track('outbound_getsecure_click', { location, page_path: pathname })
  }

  if (external || href.startsWith('tel:') || href.startsWith('http')) {
    return (
      <a href={href} className={className} onClick={handleClick}>
        {children}
      </a>
    )
  }

  return (
    <Link href={href} className={className} onClick={handleClick}>
      {children}
    </Link>
  )
}
