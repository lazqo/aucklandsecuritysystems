import type { FAQ, BreadcrumbItem } from '@/types'

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://cameras.getsecure.co.nz'
const ORG_NAME = 'Get Secure Ltd'

export function buildOrganizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: ORG_NAME,
    url: SITE_URL,
    description: 'New Zealand security company specialising in home and business security camera installation.',
    areaServed: 'NZ',
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'customer service',
      areaServed: 'NZ',
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
