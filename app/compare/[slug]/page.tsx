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
import { Prose } from '@/components/ui/Prose'
import { Button } from '@/components/ui/Button'
import { getAllSlugs, getComparison } from '@/lib/mdx/utils'
import { getBrandBySlug } from '@/lib/data/brands'
import { getMDXComponents } from '@/lib/mdx/mdx-components'
import { buildMetadata, comparisonTitle } from '@/lib/seo/metadata'
import { buildArticleSchema, buildBreadcrumbSchema } from '@/lib/seo/structured-data'
import { JsonLd } from '@/components/seo/JsonLd'
import { formatDate } from '@/lib/utils'

export const dynamicParams = false
export const revalidate = 86400

export async function generateStaticParams() {
  return getAllSlugs('compare').map((slug) => ({ slug }))
}

interface Props {
  params: { slug: string }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  let data
  try {
    data = getComparison(params.slug)
  } catch {
    return {}
  }
  const { frontmatter } = data
  const brandA = getBrandBySlug(frontmatter.brandSlugA)
  const brandB = getBrandBySlug(frontmatter.brandSlugB)
  if (!brandA || !brandB) return {}

  return buildMetadata({
    title: comparisonTitle(brandA.name, brandB.name),
    description: frontmatter.metaDescription,
    canonicalPath: `/compare/${params.slug}`,
    type: 'article',
    publishedDate: frontmatter.publishedDate,
    modifiedDate: frontmatter.lastUpdatedDate,
  })
}

export default function ComparisonPage({ params }: Props) {
  let data
  try {
    data = getComparison(params.slug)
  } catch {
    notFound()
  }
  if (!data) notFound()

  const { frontmatter, content } = data
  const brandA = getBrandBySlug(frontmatter.brandSlugA)
  const brandB = getBrandBySlug(frontmatter.brandSlugB)
  if (!brandA || !brandB) notFound()

  const pageTitle = comparisonTitle(brandA.name, brandB.name)

  const breadcrumbs = [
    { label: 'Home', href: '/' },
    { label: 'Compare', href: '/compare' },
    { label: `${brandA.name} vs ${brandB.name}` },
  ]

  return (
    <>
      <SiteHeader variant="minimal" />
      <JsonLd
        data={buildArticleSchema({
          title: pageTitle,
          description: frontmatter.metaDescription,
          url: `/compare/${params.slug}`,
          publishedDate: frontmatter.publishedDate,
          modifiedDate: frontmatter.lastUpdatedDate,
        })}
      />
      <JsonLd data={buildBreadcrumbSchema(breadcrumbs, `/compare/${params.slug}`)} />

      <main>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <BreadcrumbNav items={breadcrumbs} currentPath={`/compare/${params.slug}`} />
          <DisclosureBar lastUpdated={frontmatter.lastUpdatedDate} showEditorial />

          <div className="py-6">
            <h1 className="text-3xl sm:text-4xl font-bold text-neutral-900 mb-3 text-balance">
              {pageTitle}
            </h1>
            <p className="text-sm text-neutral-500 mb-6">Updated: {formatDate(frontmatter.lastUpdatedDate)}</p>

            {/* Quick verdict */}
            {frontmatter.verdict && (
              <div className="bg-brand-50 border border-brand-200 rounded-2xl p-5 mb-8">
                <p className="text-xs font-bold text-brand-600 uppercase tracking-wide mb-1">Quick verdict</p>
                <p className="text-neutral-800">{frontmatter.verdict}</p>
              </div>
            )}

            {/* Brand quick links */}
            <div className="grid grid-cols-2 gap-4 mb-8">
              <a
                href={`/brands/${brandA.slug}`}
                className="flex flex-col items-center gap-2 bg-white border border-neutral-100 rounded-2xl p-4 hover:border-brand-300 hover:shadow-sm transition-all text-center"
              >
                <div className="w-10 h-10 bg-neutral-100 rounded-xl flex items-center justify-center font-bold text-neutral-500">
                  {brandA.name.charAt(0)}
                </div>
                <div>
                  <p className="font-semibold text-sm text-neutral-900">{brandA.name}</p>
                  <p className="text-xs text-neutral-400">Full review →</p>
                </div>
              </a>
              <a
                href={`/brands/${brandB.slug}`}
                className="flex flex-col items-center gap-2 bg-white border border-neutral-100 rounded-2xl p-4 hover:border-brand-300 hover:shadow-sm transition-all text-center"
              >
                <div className="w-10 h-10 bg-neutral-100 rounded-xl flex items-center justify-center font-bold text-neutral-500">
                  {brandB.name.charAt(0)}
                </div>
                <div>
                  <p className="font-semibold text-sm text-neutral-900">{brandB.name}</p>
                  <p className="text-xs text-neutral-400">Full review →</p>
                </div>
              </a>
            </div>

            <Prose>
              <MDXRemote source={content} components={getMDXComponents()} />
            </Prose>
          </div>

          {/* Decision CTA */}
          <div className="bg-neutral-50 rounded-2xl border border-neutral-100 p-6 mb-8 text-center">
            <h3 className="font-bold text-neutral-900 mb-2">Still not sure which to pick?</h3>
            <p className="text-sm text-neutral-500 mb-4">
              Take our 2-minute quiz — we&apos;ll factor in your budget, property, and priorities.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Button href="/quiz">Take the quiz →</Button>
              <Button href="/?quote=open" variant="secondary">Ask a Get Secure expert</Button>
            </div>
          </div>

          <NZPrivacyNote compact className="mb-6" />

          {frontmatter.faqs?.length > 0 && (
            <FAQ items={frontmatter.faqs} renderSchema pageUrl={`/compare/${params.slug}`} />
          )}

          <RelatedLinks links={frontmatter.relatedSlugs ?? []} />
        </div>
      </main>

      <SiteFooter />
      <StickyCTA
        primaryLabel="Take the quiz →"
        primaryHref="/quiz"
        secondaryLabel="Get a quote"
        secondaryHref="/?quote=open"
        pageContext="compare"
      />
    </>
  )
}
