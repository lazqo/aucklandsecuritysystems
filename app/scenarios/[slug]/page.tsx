import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { MDXRemote } from 'next-mdx-remote/rsc'
import { SiteHeader } from '@/components/layout/SiteHeader'
import { SiteFooter } from '@/components/layout/SiteFooter'
import { BreadcrumbNav } from '@/components/layout/BreadcrumbNav'
import { StickyCTA } from '@/components/layout/StickyCTA'
import { DisclosureBar } from '@/components/compliance/DisclosureBar'
import { FAQ } from '@/components/content/FAQ'
import { RelatedLinks } from '@/components/content/RelatedLinks'
import { Prose } from '@/components/ui/Prose'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { getAllSlugs, getScenario } from '@/lib/mdx/utils'
import { getMDXComponents } from '@/lib/mdx/mdx-components'
import { buildMetadata } from '@/lib/seo/metadata'
import { buildArticleSchema, buildBreadcrumbSchema } from '@/lib/seo/structured-data'
import { JsonLd } from '@/components/seo/JsonLd'
import { formatDate } from '@/lib/utils'

export const dynamicParams = false

export async function generateStaticParams() {
  return getAllSlugs('scenarios').map((slug) => ({ slug }))
}

interface Props {
  params: { slug: string }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const data = getScenario(params.slug)
  if (!data) return {}
  const { frontmatter } = data
  return buildMetadata({
    title: frontmatter.metaTitle || frontmatter.title,
    description: frontmatter.metaDescription,
    canonicalPath: `/scenarios/${params.slug}`,
    publishedDate: frontmatter.publishedDate,
    modifiedDate: frontmatter.lastUpdatedDate,
    type: 'article',
  })
}

export default function ScenarioPage({ params }: Props) {
  let data
  try {
    data = getScenario(params.slug)
  } catch {
    notFound()
  }
  if (!data) notFound()

  const { frontmatter, content } = data
  const breadcrumbs = [
    { label: 'Home', href: '/' },
    { label: 'Scenarios', href: '/scenarios' },
    { label: frontmatter.title },
  ]

  return (
    <>
      <SiteHeader variant="minimal" />
      <JsonLd
        data={buildArticleSchema({
          title: frontmatter.title,
          description: frontmatter.metaDescription,
          url: `/scenarios/${params.slug}`,
          publishedDate: frontmatter.publishedDate,
          modifiedDate: frontmatter.lastUpdatedDate,
        })}
      />
      <JsonLd data={buildBreadcrumbSchema(breadcrumbs, `/scenarios/${params.slug}`)} />

      <main>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <BreadcrumbNav items={breadcrumbs} currentPath={`/scenarios/${params.slug}`} />
          <DisclosureBar lastUpdated={frontmatter.lastUpdatedDate} showEditorial />

          <div className="py-8">
            <Badge variant="blue" className="mb-3">Scenario guide</Badge>
            <h1 className="text-3xl sm:text-4xl font-bold text-neutral-900 mb-3 text-balance">
              {frontmatter.title}
            </h1>
            <div className="flex items-center gap-3 text-sm text-neutral-500 mb-3">
              <span>For: {frontmatter.targetProfile}</span>
              <span>·</span>
              <span>Updated: {formatDate(frontmatter.lastUpdatedDate)}</span>
            </div>

            {frontmatter.keyRequirements?.length > 0 && (
              <div className="bg-brand-50 border border-brand-100 rounded-2xl p-4 mb-8">
                <p className="text-xs font-bold text-brand-700 uppercase tracking-wide mb-2">Key requirements for this scenario</p>
                <ul className="space-y-1">
                  {frontmatter.keyRequirements.map((req: string) => (
                    <li key={req} className="flex gap-2 text-sm text-brand-800">
                      <span className="text-brand-400">•</span> {req}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <Prose>
              <MDXRemote source={content} components={getMDXComponents()} />
            </Prose>
          </div>

          {/* Quiz CTA */}
          <div className="bg-neutral-50 rounded-2xl border border-neutral-100 p-6 mb-8 text-center">
            <h3 className="font-bold text-neutral-900 mb-2">Not sure this is right for you?</h3>
            <p className="text-sm text-neutral-500 mb-4">
              Take our 2-minute quiz for a personalised recommendation.
            </p>
            <Button href="/quiz">Take the quiz →</Button>
          </div>

          {frontmatter.faqs?.length > 0 && (
            <FAQ items={frontmatter.faqs} renderSchema pageUrl={`/scenarios/${params.slug}`} />
          )}

          <RelatedLinks links={frontmatter.relatedSlugs ?? []} />
        </div>
      </main>

      <SiteFooter />
      <StickyCTA pageContext="scenario" />
    </>
  )
}
