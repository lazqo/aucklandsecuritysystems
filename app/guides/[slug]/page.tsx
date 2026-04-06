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
import { getAllSlugs, getGuide } from '@/lib/mdx/utils'
import { getMDXComponents } from '@/lib/mdx/mdx-components'
import { buildMetadata } from '@/lib/seo/metadata'
import { buildArticleSchema, buildBreadcrumbSchema } from '@/lib/seo/structured-data'
import { JsonLd } from '@/components/seo/JsonLd'
import { formatDate } from '@/lib/utils'

export const dynamicParams = false

export async function generateStaticParams() {
  const slugs = getAllSlugs('guides')
  return slugs.map((slug) => ({ slug }))
}

interface Props {
  params: { slug: string }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const data = getGuide(params.slug)
  if (!data) return {}
  const { frontmatter } = data
  return buildMetadata({
    title: frontmatter.metaTitle || frontmatter.title,
    description: frontmatter.metaDescription,
    canonicalPath: `/guides/${params.slug}`,
    publishedDate: frontmatter.publishedDate,
    modifiedDate: frontmatter.lastUpdatedDate,
    type: 'article',
  })
}

export default function GuidePage({ params }: Props) {
  let data
  try {
    data = getGuide(params.slug)
  } catch {
    notFound()
  }
  if (!data) notFound()

  const { frontmatter, content } = data
  const breadcrumbs = [
    { label: 'Home', href: '/' },
    { label: 'Guides', href: '/guides' },
    { label: frontmatter.title },
  ]

  return (
    <>
      <SiteHeader variant="minimal" />
      <JsonLd
        data={buildArticleSchema({
          title: frontmatter.title,
          description: frontmatter.metaDescription,
          url: `/guides/${params.slug}`,
          publishedDate: frontmatter.publishedDate,
          modifiedDate: frontmatter.lastUpdatedDate,
        })}
      />
      <JsonLd data={buildBreadcrumbSchema(breadcrumbs, `/guides/${params.slug}`)} />

      <main>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <BreadcrumbNav items={breadcrumbs} currentPath={`/guides/${params.slug}`} />

          <DisclosureBar lastUpdated={frontmatter.lastUpdatedDate} showEditorial />

          <div className="py-8">
            <div className="flex flex-wrap gap-2 mb-4">
              {frontmatter.tags?.map((tag) => (
                <span key={tag} className="text-xs bg-brand-50 text-brand-700 px-2.5 py-1 rounded-full font-medium">
                  {tag}
                </span>
              ))}
            </div>

            <h1 className="text-3xl sm:text-4xl font-bold text-neutral-900 mb-3 text-balance">
              {frontmatter.title}
            </h1>

            <div className="flex items-center gap-4 text-sm text-neutral-500 mb-8">
              <span>{frontmatter.readingTimeMinutes} min read</span>
              <span>Updated: {formatDate(frontmatter.lastUpdatedDate)}</span>
            </div>

            <Prose>
              <MDXRemote source={content} components={getMDXComponents()} />
            </Prose>
          </div>

          {frontmatter.faqs?.length > 0 && (
            <FAQ
              items={frontmatter.faqs}
              renderSchema
              pageUrl={`/guides/${params.slug}`}
            />
          )}

          <RelatedLinks links={frontmatter.relatedSlugs ?? []} />
        </div>
      </main>

      <SiteFooter />
      <StickyCTA pageContext="guide" />
    </>
  )
}
