import { cn } from '@/lib/utils'
import type { ReactNode } from 'react'

interface CardProps {
  children: ReactNode
  className?: string
  variant?: 'default' | 'highlight' | 'warning' | 'flat'
  onClick?: () => void
  href?: string
}

export function Card({ children, className, variant = 'default', onClick }: CardProps) {
  const base = 'rounded-2xl border transition-shadow duration-200'
  const variants = {
    default: 'bg-white border-neutral-100 shadow-sm hover:shadow-md',
    highlight: 'bg-green-50 border-green-200 shadow-sm',
    warning: 'bg-amber-50 border-amber-200 shadow-sm',
    flat: 'bg-neutral-50 border-neutral-100',
  }

  return (
    <div
      className={cn(base, variants[variant], onClick && 'cursor-pointer', className)}
      onClick={onClick}
    >
      {children}
    </div>
  )
}
