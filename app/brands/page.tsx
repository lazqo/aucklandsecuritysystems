import type { Metadata } from 'next'
import Link from 'next/link'
import { SiteHeader } from '@/components/layout/SiteHeader'
import { SiteFooter } from '@/components/layout/SiteFooter'
import { BreadcrumbNav } from '@/components/layout/BreadcrumbNav'
import { JsonLd } from '@/components/seo/JsonLd'
import { buildItemListSchema } from '@/lib/seo/structured-data'
import { brands } from '@/lib/data/brands'
import { Badge } from '@/components/ui/Badge'

export const metadata: Metadata = {
  title: 'Security Camera Brand Reviews NZ | Get Secure',
  description: 'Independent reviews of Ring, Arlo, Eufy, Swann, and more. Compare security camera brands available in New Zealand — subscription plans, NZ pricing, and honest verdicts.',
}

export default function BrandsIndexPage() {
  const listSchema = buildItemListSchema({
    name: 'Security Camera Brand Reviews — New Zealand',
    description: 'Independent reviews of home security camera brands available in New Zealand, including Ring, Arlo, Eufy, and Swann.',
    url: '/brands',
    items: brands.map((b) => ({
      name: `${b.name} NZ Review`,
      url: `/brands/${b.slug}`,
      description: b.tagline,
    })),
  })

  return (
    <>
      <JsonLd data={listSchema} />
      <SiteHeader variant="minimal" />
      <main>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <BreadcrumbNav
            items={[{ label: 'Home', href: '/' }, { label: 'Brands' }]}
            currentPath="/brands"
          />
          <div className="py-8">
            <h1 className="text-3xl font-bold text-neutral-900 mb-2">Brand reviews</h1>
            <p className="text-neutral-600 mb-8">
              Independent reviews of the main home security camera brands available in New Zealand. Updated regularly as plans and pricing change.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {brands.map((brand) => (
                <Link
                  key={brand.slug}
                  href={`/brands/${brand.slug}`}
                  className="bg-white rounded-2xl border border-neutral-100 p-5 hover:shadow-md hover:border-brand-200 transition-all group"
                >
                  <div className="flex items-start justify-between gap-3 mb-3">
                    <h2 className="font-semibold text-neutral-900 group-hover:text-brand-600 transition-colors text-lg">
                      {brand.name}
                    </h2>
                    <Badge
                      variant={brand.subscriptionRequired ? 'amber' : 'green'}
                      size="sm"
                    >
                      {brand.subscriptionRequired ? 'Subscription' : 'No sub required'}
                    </Badge>
                  </div>
                  <p className="text-sm text-neutral-500 leading-relaxed mb-3">{brand.tagline}</p>
                  <div className="flex flex-wrap gap-1.5">
                    {brand.bestFor.slice(0, 2).map((item) => (
                      <span key={item} className="text-xs bg-neutral-100 text-neutral-600 px-2 py-0.5 rounded-full">
                        {item}
                      </span>
                    ))}
                  </div>
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
