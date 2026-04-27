import type { Metadata } from 'next'
import { getCurrentYear } from '@/lib/utils'

const SITE_NAME = 'Get Secure NZ'
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://aucklandsecuritysystems.co.nz'
const DEFAULT_OG_IMAGE = '/og/default.png'

interface BuildMetadataOptions {
  title: string
  description: string
  canonicalPath: string
  ogImagePath?: string
  noIndex?: boolean
  publishedDate?: string
  modifiedDate?: string
  type?: 'website' | 'article'
}

export function buildMetadata(options: BuildMetadataOptions): Metadata {
  const {
    title,
    description,
    canonicalPath,
    ogImagePath = DEFAULT_OG_IMAGE,
    noIndex = false,
    publishedDate,
    modifiedDate,
    type = 'website',
  } = options

  const canonicalUrl = `${SITE_URL}${canonicalPath}`
  const ogImageUrl = ogImagePath.startsWith('http')
    ? ogImagePath
    : `${SITE_URL}${ogImagePath}`

  return {
    title: `${title} | ${SITE_NAME}`,
    description,
    alternates: {
      canonical: canonicalUrl,
    },
    robots: noIndex
      ? { index: false, follow: false }
      : { index: true, follow: true },
    openGraph: {
      title: `${title} | ${SITE_NAME}`,
      description,
      url: canonicalUrl,
      siteName: SITE_NAME,
      type,
      images: [
        {
          url: ogImageUrl,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
      ...(publishedDate && { publishedTime: publishedDate }),
      ...(modifiedDate && { modifiedTime: modifiedDate }),
    },
    twitter: {
      card: 'summary_large_image',
      title: `${title} | ${SITE_NAME}`,
      description,
      images: [ogImageUrl],
    },
  }
}

// ─── Title helpers ────────────────────────────────────────────────────────────

export function guideTitle(title: string): string {
  return `${title} | Get Secure NZ Camera Guide`
}

export function scenarioTitle(scenarioName: string): string {
  return `Best Security Camera for ${scenarioName} in NZ ${getCurrentYear()}`
}

export function brandTitle(brandName: string): string {
  return `${brandName} Security Cameras NZ ${getCurrentYear()} Review`
}

export function comparisonTitle(brandA: string, brandB: string): string {
  return `${brandA} vs ${brandB} NZ ${getCurrentYear()}: Full Comparison`
}
