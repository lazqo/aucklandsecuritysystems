import Link from 'next/link'
import { Check } from '@phosphor-icons/react/dist/ssr'

interface HeroSectionProps {
  headline?: string
  subheadline?: string
  primaryCTA?: { label: string; href: string }
  secondaryCTA?: { label: string; href: string }
  trustSignals?: string[]
}

export function HeroSection({
  headline = 'Which home security camera is right for you?',
  subheadline = 'Compare DIY cameras, subscriptions, power types and storage in one place. Answer 8 quick questions and get a personalised recommendation — no jargon, no pressure.',
  primaryCTA = { label: 'Find my best setup →', href: '/quiz' },
  secondaryCTA = { label: 'Get expert advice', href: '/?quote=open' },
  trustSignals = ['NZ-based advice', 'Free to use', 'No affiliate pressure', 'Updated April 2026'],
}: HeroSectionProps) {
  return (
    <section className="bg-gradient-to-b from-brand-50 to-white py-16 sm:py-24">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl">
          {/* Eyebrow */}
          <p className="text-accent-500 font-semibold text-sm uppercase tracking-widest mb-4">
            NZ Security Camera Chooser
          </p>

          {/* Headline */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-brand-600 leading-tight mb-6">
            {headline}
          </h1>

          {/* Subheadline */}
          <p className="text-lg sm:text-xl text-neutral-600 leading-relaxed mb-8 max-w-2xl">
            {subheadline}
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-3 mb-8">
            <Link
              href={primaryCTA.href}
              className="inline-flex items-center justify-center px-8 py-4 bg-brand-600 text-white font-semibold rounded-xl hover:bg-brand-700 transition-colors shadow-sm text-base"
            >
              {primaryCTA.label}
            </Link>
            <Link
              href={secondaryCTA.href}
              className="inline-flex items-center justify-center px-8 py-4 bg-white text-brand-600 font-semibold rounded-xl border border-brand-200 hover:bg-brand-50 transition-colors text-base"
            >
              {secondaryCTA.label}
            </Link>
          </div>

          {/* Trust signals */}
          <div className="flex flex-wrap gap-4">
            {trustSignals.map((signal) => (
              <span key={signal} className="flex items-center gap-1.5 text-sm text-neutral-500">
                <Check
                  className="text-accent-400 flex-shrink-0"
                  size={16}
                  weight="bold"
                />
                {signal}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
