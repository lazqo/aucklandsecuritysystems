import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { MDXRemote } from 'next-mdx-remote/rsc'
import { SiteHeader } from '@/components/layout/SiteHeader'
import { SiteFooter } from '@/components/layout/SiteFooter'
import { BreadcrumbNav } from '@/components/layout/BreadcrumbNav'
import { StickyCTA } from '@/components/layout/StickyCTA'
import { DisclosureBar } from '@/components/compliance/DisclosureBar'
import { NZPrivacyNote } from '@/components/compliance/NZPrivacyNote'
import { FAQ } from '@/components/content/FAQ'
import { RelatedLinks } from '@/components/content/RelatedLinks'
import { ProsConsTable } from '@/components/content/ProsConsTable'
import { Prose } from '@/components/ui/Prose'
import { BrandHero } from '@/components/brand/BrandHero'
import { SubscriptionMatrix } from '@/components/brand/SubscriptionMatrix'
import { getAllSlugs, getBrandContent } from '@/lib/mdx/utils'
import { getBrandBySlug } from '@/lib/data/brands'
import { getPlansByBrand } from '@/lib/data/subscription-plans'
import { getMDXComponents } from '@/lib/mdx/mdx-components'
import { buildMetadata, brandTitle } from '@/lib/seo/metadata'
import { buildArticleSchema, buildBreadcrumbSchema } from '@/lib/seo/structured-data'
import { JsonLd } from '@/components/seo/JsonLd'

export const dynamicParams = false
export const revalidate = 86400 // ISR: revalidate brand pages every 24 hours

export async function generateStaticParams() {
  return getAllSlugs('brands').map((slug) => ({ slug }))
}

interface Props {
  params: { slug: string }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const brand = getBrandBySlug(params.slug)
  if (!brand) return {}
  return buildMetadata({
    title: brandTitle(brand.name),
    description: `${brand.name} security cameras in NZ: ${brand.summary.slice(0, 130)}`,
    canonicalPath: `/brands/${params.slug}`,
    type: 'article',
  })
}

export default function BrandPage({ params }: Props) {
  const brand = getBrandBySlug(params.slug)
  if (!brand) notFound()

  let data
  try {
    data = getBrandContent(params.slug)
  } catch {
    notFound()
  }
  if (!data) notFound()

  const { frontmatter, content } = data
  const plans = getPlansByBrand(params.slug)

  const breadcrumbs = [
    { label: 'Home', href: '/' },
    { label: 'Brands', href: '/brands' },
    { label: brand.name },
  ]

  return (
    <>
      <SiteHeader variant="minimal" />
      <JsonLd
        data={buildArticleSchema({
          title: brandTitle(brand.name),
          description: brand.summary,
          url: `/brands/${params.slug}`,
          publishedDate: brand.lastReviewedDate,
          modifiedDate: brand.lastReviewedDate,
        })}
      />
      <JsonLd data={buildBreadcrumbSchema(breadcrumbs, `/brands/${params.slug}`)} />

      <BrandHero brand={brand} />

      <main>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <BreadcrumbNav items={breadcrumbs} currentPath={`/brands/${params.slug}`} />
          <DisclosureBar lastUpdated={brand.lastReviewedDate} showEditorial showAffiliate={false} />

          {/* Pros/Cons */}
          <div className="py-8">
            <ProsConsTable pros={brand.pros} cons={brand.cons} />
          </div>

          {/* MDX content */}
          <Prose>
            <MDXRemote source={content} components={getMDXComponents()} />
          </Prose>

          {/* Subscription plans */}
          {plans.length > 0 && (
            <div className="py-8">
              <h2 className="text-xl font-bold text-neutral-900 mb-4">{brand.name} subscription plans</h2>
              <SubscriptionMatrix plans={plans} brandName={brand.name} />
            </div>
          )}

          {/* Expert verdict */}
          <div className="bg-brand-50 rounded-2xl border border-brand-100 p-5 my-8">
            <p className="text-xs font-bold text-brand-700 uppercase tracking-wide mb-2">Our verdict</p>
            <p className="text-neutral-800">{brand.expertVerdict}</p>
          </div>

          {/* Best for / Not ideal for */}
          <div className="grid sm:grid-cols-2 gap-4 mb-8">
            <div className="bg-green-50 rounded-2xl p-4 border border-green-100">
              <p className="text-xs font-bold text-green-700 uppercase tracking-wide mb-2">Best for</p>
              <ul className="space-y-1">
                {brand.bestFor.map((item) => (
                  <li key={item} className="text-sm text-green-900 flex gap-2">
                    <span className="text-green-400">✓</span> {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-red-50 rounded-2xl p-4 border border-red-100">
              <p className="text-xs font-bold text-red-700 uppercase tracking-wide mb-2">Not ideal for</p>
              <ul className="space-y-1">
                {brand.notIdealFor.map((item) => (
                  <li key={item} className="text-sm text-red-900 flex gap-2">
                    <span className="text-red-400">✗</span> {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <NZPrivacyNote compact className="mb-8" />

          {frontmatter.faqs?.length > 0 && (
            <FAQ items={frontmatter.faqs} renderSchema pageUrl={`/brands/${params.slug}`} />
          )}

          <RelatedLinks links={frontmatter.relatedSlugs ?? []} />
        </div>
      </main>

      <SiteFooter />
      <StickyCTA
        primaryLabel={`Get a ${brand.name} quote →`}
        primaryHref="/?quote=open"
        secondaryLabel="Compare brands"
        secondaryHref="/compare"
        pageContext="brand"
      />
    </>
  )
}
