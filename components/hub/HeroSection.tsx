import Link from 'next/link'
import { Check } from '@phosphor-icons/react/dist/ssr'
import { GET_SECURE } from '@/lib/business/get-secure'

interface HeroSectionProps {
  headline?: string
  subheadline?: string
  primaryCTA?: { label: string; href: string }
  secondaryCTA?: { label: string; href: string }
  trustSignals?: string[]
}

export function HeroSection({
  headline = 'Which home security camera is right for you?',
  subheadline = 'Compare DIY cameras, subscriptions, power types and storage in one place. Answer 8 quick questions and get a personalised recommendation — then ask an Auckland installer if you want a proper quote.',
  primaryCTA = { label: 'Find my best setup →', href: '/quiz' },
  secondaryCTA = { label: 'Ask an Auckland installer', href: '/?quote=open' },
  trustSignals = ['NZ-based advice', 'Free to use', 'No affiliate pressure', 'Installed by Get Secure'],
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
          <div className="flex flex-wrap gap-4 mb-6">
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

          <div className="rounded-2xl border border-brand-100 bg-white/80 p-4 text-sm text-neutral-600 shadow-sm max-w-2xl">
            <p className="font-semibold text-brand-700 mb-1">Want a professional install?</p>
            <p>
              {GET_SECURE.name} handles CCTV, alarms, intercoms and networking across Auckland. Free site visits for quote jobs, with 3-year product warranty and 5-year workmanship warranty.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
