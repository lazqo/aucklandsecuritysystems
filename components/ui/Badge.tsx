import { cn } from '@/lib/utils'
import type { ReactNode } from 'react'

interface BadgeProps {
  children: ReactNode
  variant?: 'default' | 'green' | 'amber' | 'blue' | 'neutral' | 'red'
  size?: 'sm' | 'md'
  className?: string
}

const variants = {
  default: 'bg-neutral-100 text-neutral-700',
  green: 'bg-green-100 text-green-800',
  amber: 'bg-amber-100 text-amber-800',
  blue: 'bg-brand-100 text-brand-800',
  neutral: 'bg-neutral-100 text-neutral-600',
  red: 'bg-red-100 text-red-800',
}

const sizes = {
  sm: 'px-2 py-0.5 text-xs',
  md: 'px-2.5 py-1 text-xs',
}

export function Badge({ children, variant = 'default', size = 'md', className }: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1 rounded-full font-medium',
        variants[variant],
        sizes[size],
        className
      )}
    >
      {children}
    </span>
  )
}
