import type { Metadata } from 'next'
import { Suspense } from 'react'
import { SiteHeader } from '@/components/layout/SiteHeader'
import { SiteFooter } from '@/components/layout/SiteFooter'
import { BreadcrumbNav } from '@/components/layout/BreadcrumbNav'
import { StickyCTA } from '@/components/layout/StickyCTA'
import { TCOCalculator } from '@/components/calculator/TCOCalculator'
import { DisclosureBar } from '@/components/compliance/DisclosureBar'
import { RelatedLinks } from '@/components/content/RelatedLinks'
import { JsonLd } from '@/components/seo/JsonLd'
import { buildWebApplicationSchema } from '@/lib/seo/structured-data'

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://cameras.getsecure.co.nz'

export const metadata: Metadata = {
  title: 'Security Camera Total Cost Calculator NZ | Get Secure',
  description:
    'Calculate the real total cost of any home security camera system over 1, 2, or 3 years. Include subscriptions, hardware, installation, and hidden costs. Free NZ tool.',
  alternates: { canonical: `${SITE_URL}/calculator` },
}

export default function CalculatorPage() {
  return (
    <>
      <SiteHeader variant="minimal" />
      <JsonLd
        data={buildWebApplicationSchema({
          name: 'Security Camera TCO Calculator NZ',
          description: 'Calculate the real total cost of any home security camera system including subscriptions, hardware, and installation.',
          url: '/calculator',
        })}
      />

      <main>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <BreadcrumbNav
            items={[
              { label: 'Home', href: '/' },
              { label: 'TCO Calculator' },
            ]}
            currentPath="/calculator"
          />

          <div className="mb-6">
            <h1 className="text-3xl font-bold text-neutral-900 mb-2">
              Security camera cost calculator
            </h1>
            <p className="text-neutral-600 max-w-2xl">
              Most people only think about the upfront camera price. But cloud subscriptions, storage devices,
              and installation can easily double your real cost over 3 years.
              This calculator shows you the full picture before you buy.
            </p>
          </div>

          <DisclosureBar lastUpdated="2026-04-01" showEditorial />

          <div className="py-8">
            <Suspense
              fallback={
                <div className="text-center py-16 text-neutral-400">Loading calculator…</div>
              }
            >
              <TCOCalculator />
            </Suspense>
          </div>

          <RelatedLinks
            links={[
              { slug: 'cloud-vs-local-storage', type: 'guide', label: 'Cloud vs local storage explained' },
              { slug: 'no-subscription-security-cameras', type: 'guide', label: 'No-subscription camera options' },
              { slug: 'ring-vs-arlo', type: 'compare', label: 'Ring vs Arlo: full comparison' },
            ]}
          />
        </div>
      </main>

      <SiteFooter />
      <StickyCTA
        primaryLabel="Take the quiz instead →"
        primaryHref="/quiz"
        secondaryLabel="Get a quote"
        secondaryHref="/?quote=open"
        pageContext="calculator"
      />
    </>
  )
}
