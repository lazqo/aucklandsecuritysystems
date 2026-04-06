import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import type {
  GuideFrontmatter,
  ScenarioFrontmatter,
  BrandFrontmatter,
  ComparisonFrontmatter,
  ContentCard,
} from '@/types'

const contentRoot = path.join(process.cwd(), 'content')

type ContentType = 'guides' | 'scenarios' | 'brands' | 'compare'

// ─── Read a single MDX file ───────────────────────────────────────────────────

export function getContentBySlug<T>(type: ContentType, slug: string): { frontmatter: T; content: string } {
  const filePath = path.join(contentRoot, type, `${slug}.mdx`)
  const raw = fs.readFileSync(filePath, 'utf-8')
  const { data, content } = matter(raw)
  return { frontmatter: data as T, content }
}

// ─── Get all slugs for a content type ────────────────────────────────────────

export function getAllSlugs(type: ContentType): string[] {
  const dir = path.join(contentRoot, type)
  if (!fs.existsSync(dir)) return []
  return fs
    .readdirSync(dir)
    .filter((f) => f.endsWith('.mdx'))
    .map((f) => f.replace(/\.mdx$/, ''))
}

// ─── Build content card list for index pages ──────────────────────────────────

export function getContentCards(type: ContentType): ContentCard[] {
  const slugs = getAllSlugs(type)
  const hrefBase: Record<ContentType, string> = {
    guides: '/guides',
    scenarios: '/scenarios',
    brands: '/brands',
    compare: '/compare',
  }

  return slugs.map((slug) => {
    const { frontmatter } = getContentBySlug<GuideFrontmatter>(type, slug)
    return {
      slug,
      type: type === 'compare' ? 'compare' : type === 'brands' ? 'brand' : (type as 'guide' | 'scenario'),
      title: frontmatter.title,
      excerpt: frontmatter.excerpt ?? '',
      lastUpdatedDate: frontmatter.lastUpdatedDate,
      href: `${hrefBase[type]}/${slug}`,
    }
  })
}

// ─── Type-specific helpers ───────────────────────────────────────────────────

export function getGuide(slug: string) {
  return getContentBySlug<GuideFrontmatter>('guides', slug)
}

export function getScenario(slug: string) {
  return getContentBySlug<ScenarioFrontmatter>('scenarios', slug)
}

export function getBrandContent(slug: string) {
  return getContentBySlug<BrandFrontmatter>('brands', slug)
}

export function getComparison(slug: string) {
  return getContentBySlug<ComparisonFrontmatter>('compare', slug)
}
