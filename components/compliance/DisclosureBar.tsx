import { formatDate } from '@/lib/utils'
import { cn } from '@/lib/utils'

interface DisclosureBarProps {
  lastUpdated: string
  showAffiliate?: boolean
  showEditorial?: boolean
  className?: string
}

export function DisclosureBar({
  lastUpdated,
  showAffiliate = false,
  showEditorial = true,
  className,
}: DisclosureBarProps) {
  return (
    <div
      className={cn(
        'flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-neutral-500 py-3 border-b border-neutral-100',
        className
      )}
    >
      <span className="flex items-center gap-1">
        <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        Last updated: <strong className="text-neutral-700">{formatDate(lastUpdated)}</strong>
      </span>

      {showEditorial && (
        <span className="flex items-center gap-1">
          <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          Independent editorial
        </span>
      )}

      {showAffiliate && (
        <span className="flex items-center gap-1">
          <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          Some links may be affiliate links
        </span>
      )}

      <span className="flex items-center gap-1">
        <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.07 16.5c-.77.833.192 2.5 1.732 2.5z" />
        </svg>
        Prices may have changed — verify with retailers
      </span>
    </div>
  )
}
