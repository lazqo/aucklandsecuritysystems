import type { Metadata } from 'next'
import Link from 'next/link'
import { SiteHeader } from '@/components/layout/SiteHeader'
import { SiteFooter } from '@/components/layout/SiteFooter'
import { BreadcrumbNav } from '@/components/layout/BreadcrumbNav'
import { getContentCards } from '@/lib/mdx/utils'
import { formatDate } from '@/lib/utils'

export const metadata: Metadata = {
  title: 'Security Camera Guides NZ | Get Secure',
  description: 'Plain-English guides to choosing a home security camera in New Zealand — cloud vs local storage, wired vs wireless, no-subscription options and more.',
}

export default function GuidesIndexPage() {
  const cards = getContentCards('guides')

  return (
    <>
      <SiteHeader variant="minimal" />
      <main>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <BreadcrumbNav
            items={[{ label: 'Home', href: '/' }, { label: 'Guides' }]}
            currentPath="/guides"
          />
          <div className="py-8">
            <h1 className="text-3xl font-bold text-neutral-900 mb-2">Security camera guides</h1>
            <p className="text-neutral-600 mb-8">
              Plain-English explanations of everything you need to know before buying a home security camera in New Zealand.
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
                  <p className="text-sm text-neutral-500 mb-3 leading-relaxed">{card.excerpt}</p>
                  <p className="text-xs text-neutral-400">Updated {formatDate(card.lastUpdatedDate)}</p>
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
