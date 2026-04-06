import { cn } from '@/lib/utils'
import type { ReactNode } from 'react'

interface ProseProps {
  children: ReactNode
  className?: string
  size?: 'sm' | 'md' | 'lg'
}

export function Prose({ children, className, size = 'md' }: ProseProps) {
  return (
    <div
      className={cn(
        'prose max-w-none',
        size === 'sm' && 'prose-sm',
        size === 'lg' && 'prose-lg',
        // Typography overrides for brand
        'prose-headings:font-bold prose-headings:text-neutral-900',
        'prose-p:text-neutral-700 prose-p:leading-relaxed',
        'prose-a:text-brand-600 prose-a:no-underline hover:prose-a:underline',
        'prose-strong:text-neutral-900',
        'prose-ul:text-neutral-700 prose-ol:text-neutral-700',
        'prose-blockquote:border-brand-300 prose-blockquote:text-neutral-600',
        'prose-code:text-brand-700 prose-code:bg-brand-50 prose-code:px-1 prose-code:rounded',
        className
      )}
    >
      {children}
    </div>
  )
}
