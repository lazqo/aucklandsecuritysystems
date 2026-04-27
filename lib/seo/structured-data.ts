import type { FAQ, BreadcrumbItem } from '@/types'
import { GET_SECURE, AUCKLAND_AREAS } from '@/lib/business/get-secure'

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://aucklandsecuritysystems.co.nz'
const ORG_NAME = GET_SECURE.legalName

export function buildOrganizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: ORG_NAME,
    url: SITE_URL,
    description: 'New Zealand security company specialising in home and business security camera installation.',
    areaServed: GET_SECURE.serviceArea,
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: GET_SECURE.phoneDisplay,
      email: GET_SECURE.email,
      contactType: 'customer service',
      areaServed: GET_SECURE.serviceArea,
      availableLanguage: 'English',
    },
  }
}

export function buildWebSiteSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'Get Secure NZ Camera Chooser',
    url: SITE_URL,
    description:
      'Compare home security cameras in New Zealand. Use our free quiz and TCO calculator to find the right system for your home.',
  }
}

export function buildArticleSchema({
  title,
  description,
  url,
  publishedDate,
  modifiedDate,
  authorName = 'Get Secure NZ Editorial Team',
}: {
  title: string
  description: string
  url: string
  publishedDate: string
  modifiedDate: string
  authorName?: string
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: title,
    description,
    url: `${SITE_URL}${url}`,
    datePublished: publishedDate,
    dateModified: modifiedDate,
    author: {
      '@type': 'Organization',
      name: authorName,
      url: SITE_URL,
    },
    publisher: {
      '@type': 'Organization',
      name: ORG_NAME,
      url: SITE_URL,
    },
  }
}

export function buildFaqSchema(faqs: FAQ[], pageUrl: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    url: `${SITE_URL}${pageUrl}`,
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  }
}

export function buildBreadcrumbSchema(items: BreadcrumbItem[], currentPath: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    url: `${SITE_URL}${currentPath}`,
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.label,
      ...(item.href && { item: `${SITE_URL}${item.href}` }),
    })),
  }
}

export function buildItemListSchema({
  name,
  description,
  url,
  items,
}: {
  name: string
  description: string
  url: string
  items: { name: string; url: string; description?: string }[]
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name,
    description,
    url: `${SITE_URL}${url}`,
    numberOfItems: items.length,
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      url: `${SITE_URL}${item.url}`,
      ...(item.description && { description: item.description }),
    })),
  }
}

export function buildWebApplicationSchema({
  name,
  description,
  url,
}: {
  name: string
  description: string
  url: string
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name,
    description,
    url: `${SITE_URL}${url}`,
    applicationCategory: 'UtilitiesApplication',
    operatingSystem: 'Web',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'NZD',
    },
  }
}

export function buildLocalBusinessSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: GET_SECURE.name,
    legalName: GET_SECURE.legalName,
    url: GET_SECURE.url,
    telephone: GET_SECURE.phoneDisplay,
    email: GET_SECURE.email,
    areaServed: AUCKLAND_AREAS.map((area) => ({
      '@type': 'Place',
      name: area,
    })),
    description:
      'Auckland security installer providing CCTV, alarm, intercom and networking services for homes and businesses.',
    sameAs: [GET_SECURE.url],
  }
}

export function buildSecurityInstallationServiceSchema({
  name = 'Security camera installation Auckland',
  url = '/security-camera-installation-auckland',
  description = 'Professional CCTV and security camera installation for Auckland homes and businesses.',
}: {
  name?: string
  url?: string
  description?: string
} = {}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name,
    description,
    url: `${SITE_URL}${url}`,
    provider: {
      '@type': 'LocalBusiness',
      name: GET_SECURE.name,
      url: GET_SECURE.url,
      telephone: GET_SECURE.phoneDisplay,
    },
    serviceType: 'Security camera installation',
    areaServed: AUCKLAND_AREAS.map((area) => ({
      '@type': 'Place',
      name: area,
    })),
    offers: {
      '@type': 'Offer',
      availability: 'https://schema.org/InStock',
      priceCurrency: 'NZD',
      description: 'Free site visits for quote jobs. Final pricing depends on property layout, camera count and hardware choice.',
    },
  }
}
