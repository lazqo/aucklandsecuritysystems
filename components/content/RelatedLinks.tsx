import Link from 'next/link'
import type { RelatedLink } from '@/types'

interface RelatedLinksProps {
  links: RelatedLink[]
  title?: string
}

const typeLabels: Record<RelatedLink['type'], string> = {
  guide: 'Guide',
  scenario: 'Scenario',
  brand: 'Brand review',
  compare: 'Comparison',
}

const typeColors: Record<RelatedLink['type'], string> = {
  guide: 'bg-blue-50 text-blue-700',
  scenario: 'bg-green-50 text-green-700',
  brand: 'bg-purple-50 text-purple-700',
  compare: 'bg-amber-50 text-amber-700',
}

const typeHrefs: Record<RelatedLink['type'], string> = {
  guide: '/guides',
  scenario: '/scenarios',
  brand: '/brands',
  compare: '/compare',
}

export function RelatedLinks({ links, title = 'Related resources' }: RelatedLinksProps) {
  if (!links || links.length === 0) return null

  return (
    <aside className="py-8 border-t border-neutral-100">
      <h3 className="text-sm font-bold text-neutral-700 uppercase tracking-wide mb-4">{title}</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {links.map((link) => {
          const href = `${typeHrefs[link.type]}/${link.slug}`
          return (
            <Link
              key={`${link.type}-${link.slug}`}
              href={href}
              className="flex items-center gap-3 bg-neutral-50 rounded-xl p-3.5 hover:bg-neutral-100 transition-colors group border border-neutral-100"
            >
              <span
                className={`text-xs font-semibold px-2 py-0.5 rounded-full flex-shrink-0 ${typeColors[link.type]}`}
              >
                {typeLabels[link.type]}
              </span>
              <span className="text-sm text-neutral-700 group-hover:text-brand-600 transition-colors font-medium">
                {link.label ?? link.slug.replace(/-/g, ' ')}
              </span>
              <svg
                className="w-4 h-4 text-neutral-300 group-hover:text-brand-400 ml-auto flex-shrink-0 transition-colors"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 18l6-6-6-6" />
              </svg>
            </Link>
          )
        })}
      </div>
    </aside>
  )
}
