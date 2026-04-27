import type { Metadata } from 'next'
import { Suspense } from 'react'
import { SiteHeader } from '@/components/layout/SiteHeader'
import { SiteFooter } from '@/components/layout/SiteFooter'
import { StickyCTA } from '@/components/layout/StickyCTA'
import { HeroSection } from '@/components/hub/HeroSection'
import { HowItWorksStrip } from '@/components/hub/HowItWorksStrip'
import { ScenarioPicker } from '@/components/hub/ScenarioPicker'
import { EducationBlockGrid } from '@/components/hub/EducationBlockGrid'
import { TrustBar } from '@/components/hub/TrustBar'
import { NZPrivacyNote } from '@/components/compliance/NZPrivacyNote'
import { QuoteModalTrigger } from '@/components/hub/QuoteModalTrigger'

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://aucklandsecuritysystems.co.nz'

export const metadata: Metadata = {
  title: 'Which Home Security Camera Is Right for Me? | Get Secure NZ',
  description:
    'Compare DIY home security cameras in NZ. Use our free 8-question quiz and TCO calculator to find the right system — Ring, Arlo, Eufy, PoE, battery, no-subscription and more.',
  alternates: {
    canonical: `${SITE_URL}/`,
  },
}

export default function HomePage() {
  return (
    <>
      <SiteHeader variant="full" />

      <main>
        <HeroSection />
        <HowItWorksStrip />
        <ScenarioPicker />
        <EducationBlockGrid />

        {/* Brand comparison quick links */}
        <section className="py-14 bg-neutral-50 border-t border-neutral-100">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-neutral-900 mb-2">Compare the main brands</h2>
              <p className="text-neutral-500">
                Side-by-side comparisons of the most popular NZ home security camera brands.
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {[
                { label: 'Ring vs Arlo', href: '/compare/ring-vs-arlo', desc: 'Cloud-first DIY ecosystems compared' },
                { label: 'Eufy vs Ring', href: '/compare/eufy-vs-ring', desc: 'No-subscription vs subscription' },
                { label: 'Ring NZ review', href: '/brands/ring', desc: "Amazon's DIY security ecosystem" },
              ].map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  className="bg-white rounded-2xl border border-neutral-100 p-5 hover:shadow-md hover:border-accent-200 transition-all group"
                >
                  <div className="font-semibold text-neutral-900 group-hover:text-accent-500 transition-colors mb-1">
                    {item.label}
                  </div>
                  <p className="text-sm text-neutral-500">{item.desc}</p>
                </a>
              ))}
            </div>
          </div>
        </section>

        {/* TCO calculator CTA */}
        <section className="py-14 bg-brand-600 text-white">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-2xl font-bold mb-3">What will it actually cost over 3 years?</h2>
            <p className="text-brand-200 mb-6 max-w-xl mx-auto">
              Subscriptions add up. Our free calculator shows the real total cost — including hidden costs most people forget.
            </p>
            <a
              href="/calculator"
              className="inline-flex items-center px-8 py-4 bg-accent-400 text-white font-semibold rounded-xl hover:bg-accent-500 transition-colors shadow-sm"
            >
              Open the cost calculator →
            </a>
          </div>
        </section>

        <TrustBar />

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <NZPrivacyNote />
        </div>
      </main>

      <SiteFooter />
      <StickyCTA pageContext="hub" />

      <Suspense fallback={null}>
        <QuoteModalTrigger />
      </Suspense>
    </>
  )
}
