import {
  MapPin,
  BookOpen,
  CreditCard,
  ArrowsClockwise,
  Lock,
} from '@phosphor-icons/react/dist/ssr'
import type { Icon } from '@phosphor-icons/react'

interface Signal {
  Icon: Icon
  label: string
}

const signals: Signal[] = [
  { Icon: MapPin,           label: 'NZ-based advice' },
  { Icon: BookOpen,         label: 'Independent editorial' },
  { Icon: CreditCard,       label: 'Free to use — no sign up' },
  { Icon: ArrowsClockwise,  label: 'Updated regularly' },
  { Icon: Lock,             label: 'No data sold' },
]

export function TrustBar() {
  return (
    <section className="py-8 bg-surface border-y border-neutral-100">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-wrap justify-center gap-x-8 gap-y-3">
          {signals.map((s) => (
            <span key={s.label} className="flex items-center gap-2 text-sm text-neutral-600">
              <s.Icon size={16} weight="duotone" className="text-accent-400 flex-shrink-0" />
              {s.label}
            </span>
          ))}
        </div>
      </div>
    </section>
  )
}
