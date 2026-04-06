import Link from 'next/link'
import type { BreadcrumbItem } from '@/types'
import { buildBreadcrumbSchema } from '@/lib/seo/structured-data'
import { JsonLd } from '@/components/seo/JsonLd'

interface BreadcrumbNavProps {
  items: BreadcrumbItem[]
  currentPath: string
}

export function BreadcrumbNav({ items, currentPath }: BreadcrumbNavProps) {
  const schema = buildBreadcrumbSchema(items, currentPath)

  return (
    <>
      <JsonLd data={schema} />
      <nav aria-label="Breadcrumb" className="py-3">
        <ol className="flex items-center gap-1.5 flex-wrap text-sm text-neutral-500">
          {items.map((item, index) => {
            const isLast = index === items.length - 1
            return (
              <li key={index} className="flex items-center gap-1.5">
                {index > 0 && (
                  <svg
                    className="w-3.5 h-3.5 text-neutral-300 flex-shrink-0"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                    aria-hidden="true"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 18l6-6-6-6" />
                  </svg>
                )}
                {isLast || !item.href ? (
                  <span className="text-neutral-800 font-medium">{item.label}</span>
                ) : (
                  <Link
                    href={item.href}
                    className="hover:text-brand-600 transition-colors"
                  >
                    {item.label}
                  </Link>
                )}
              </li>
            )
          })}
        </ol>
      </nav>
    </>
  )
}
