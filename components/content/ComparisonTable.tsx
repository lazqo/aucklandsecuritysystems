import type { Brand } from '@/types'
import { cn } from '@/lib/utils'

interface ComparisonRow {
  label: string
  helpText?: string
  valueA: string | boolean | number
  valueB: string | boolean | number
  winner?: 'a' | 'b' | 'tie' | 'neither'
}

interface ComparisonCategory {
  category: string
  rows: ComparisonRow[]
}

interface ComparisonTableProps {
  brandA: Brand
  brandB: Brand
  features: ComparisonCategory[]
}

function renderValue(val: string | boolean | number) {
  if (typeof val === 'boolean') {
    return val ? (
      <span className="text-green-600 font-semibold">✅ Yes</span>
    ) : (
      <span className="text-neutral-400">—</span>
    )
  }
  return <span className="text-neutral-800">{String(val)}</span>
}

export function ComparisonTable({ brandA, brandB, features }: ComparisonTableProps) {
  return (
    <div className="rounded-2xl border border-neutral-100 overflow-hidden">
      {/* Header */}
      <div className="grid grid-cols-[1fr_auto_auto] sm:grid-cols-[2fr_1fr_1fr] bg-neutral-900 text-white">
        <div className="px-4 py-4 text-sm font-semibold text-neutral-400">Feature</div>
        <div className="px-4 py-4 text-sm font-bold text-center">{brandA.name}</div>
        <div className="px-4 py-4 text-sm font-bold text-center">{brandB.name}</div>
      </div>

      {/* Feature categories */}
      {features.map((category) => (
        <div key={category.category}>
          {/* Category heading */}
          <div className="bg-neutral-50 px-4 py-2.5 border-t border-neutral-100">
            <span className="text-xs font-bold text-neutral-500 uppercase tracking-wide">
              {category.category}
            </span>
          </div>

          {/* Rows */}
          {category.rows.map((row, i) => (
            <div
              key={row.label}
              className={cn(
                'grid grid-cols-[1fr_auto_auto] sm:grid-cols-[2fr_1fr_1fr] border-t border-neutral-50',
                i % 2 === 0 ? 'bg-white' : 'bg-neutral-50/40'
              )}
            >
              {/* Label */}
              <div className="px-4 py-3">
                <span className="text-sm text-neutral-700 font-medium">{row.label}</span>
                {row.helpText && (
                  <p className="text-xs text-neutral-400 mt-0.5">{row.helpText}</p>
                )}
              </div>

              {/* Brand A value */}
              <div
                className={cn(
                  'px-4 py-3 text-center text-sm flex items-center justify-center',
                  row.winner === 'a' && 'bg-green-50'
                )}
              >
                {row.winner === 'a' && (
                  <span className="mr-1 text-green-600 font-bold text-xs">★ </span>
                )}
                {renderValue(row.valueA)}
              </div>

              {/* Brand B value */}
              <div
                className={cn(
                  'px-4 py-3 text-center text-sm flex items-center justify-center',
                  row.winner === 'b' && 'bg-green-50'
                )}
              >
                {row.winner === 'b' && (
                  <span className="mr-1 text-green-600 font-bold text-xs">★ </span>
                )}
                {renderValue(row.valueB)}
              </div>
            </div>
          ))}
        </div>
      ))}
    </div>
  )
}
