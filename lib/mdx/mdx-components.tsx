import type { MDXComponents } from 'mdx/types'
import Link from 'next/link'
import { ProsConsTable } from '@/components/content/ProsConsTable'

// Custom components available inside MDX files
export function getMDXComponents(): MDXComponents {
  return {
    // Override standard elements
    a: ({ href, children, ...props }) => {
      if (href?.startsWith('/') || href?.startsWith('#')) {
        return (
          <Link href={href} {...props}>
            {children as React.ReactNode}
          </Link>
        )
      }
      return (
        <a href={href} target="_blank" rel="noopener noreferrer" {...props}>
          {children as React.ReactNode}
        </a>
      )
    },

    // Custom MDX-only components (used in .mdx files as <ProsConsTable ... />)
    ProsConsTable,

    // Info/warning callout boxes
    Callout: ({
      type = 'info',
      children,
    }: {
      type?: 'info' | 'warning' | 'tip'
      children: React.ReactNode
    }) => {
      const styles = {
        info: 'bg-brand-50 border-brand-200 text-brand-800',
        warning: 'bg-amber-50 border-amber-200 text-amber-800',
        tip: 'bg-green-50 border-green-200 text-green-800',
      }
      const icons = { info: 'ℹ️', warning: '⚠️', tip: '💡' }
      return (
        <div className={`rounded-2xl border p-4 my-4 flex gap-3 ${styles[type]}`}>
          <span>{icons[type]}</span>
          <div className="text-sm leading-relaxed">{children}</div>
        </div>
      )
    },
  }
}
