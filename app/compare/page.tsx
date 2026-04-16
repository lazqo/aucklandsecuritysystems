import type { Metadata } from 'next'
import Link from 'next/link'
import { SiteHeader } from '@/components/layout/SiteHeader'
import { SiteFooter } from '@/components/layout/SiteFooter'
import { BreadcrumbNav } from '@/components/layout/BreadcrumbNav'
import { JsonLd } from '@/components/seo/JsonLd'
import { buildItemListSchema } from '@/lib/seo/structured-data'
import { getContentCards } from '@/lib/mdx/utils'

export const metadata: Metadata = {
  title: 'Security Camera Brand Comparisons NZ | Get Secure',
  description: 'Compare Ring vs Arlo, Eufy vs Ring, and more — side-by-side comparisons of home security camera brands for NZ buyers.',
}

export default function CompareIndexPage() {
  const cards = getContentCards('compare')

  const listSchema = buildItemListSchema({
    name: 'Security Camera Brand Comparisons — New Zealand',
    description: 'Side-by-side comparisons of the most popular home security camera brands in NZ, covering subscriptions, pricing, storage, and reliability.',
    url: '/compare',
    items: cards.map((c) => ({
      name: c.title,
      url: c.href,
      description: c.excerpt,
    })),
  })

  return (
    <>
      <JsonLd data={listSchema} />
      <SiteHeader variant="minimal" />
      <main>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <BreadcrumbNav
            items={[{ label: 'Home', href: '/' }, { label: 'Compare brands' }]}
            currentPath="/compare"
          />
          <div className="py-8">
            <h1 className="text-3xl font-bold text-neutral-900 mb-2">Compare security camera brands</h1>
            <p className="text-neutral-600 mb-8">
              Side-by-side comparisons of the most popular home security camera brands in NZ. We cover subscriptions, pricing, storage, reliability, and more.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {cards.map((card) => (
                <Link
                  key={card.slug}
                  href={card.href}
                  className="bg-white rounded-2xl border border-neutral-100 p-5 hover:shadow-md hover:border-brand-200 transition-all group"
                >
                  <h2 className="font-semibold text-neutral-900 group-hover:text-brand-600 transition-colors mb-2">
                    {card.title}
                  </h2>
                  <p className="text-sm text-neutral-500">{card.excerpt}</p>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </main>
      <SiteFooter />
    </>
  )
}
