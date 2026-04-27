import type { Metadata } from 'next'
import { Suspense } from 'react'
import { SiteHeader } from '@/components/layout/SiteHeader'
import { SiteFooter } from '@/components/layout/SiteFooter'
import { StickyCTA } from '@/components/layout/StickyCTA'
import { QuoteModalTrigger } from '@/components/hub/QuoteModalTrigger'
import { JsonLd } from '@/components/seo/JsonLd'
import { Button } from '@/components/ui/Button'
import { GET_SECURE, AUCKLAND_AREAS } from '@/lib/business/get-secure'
import {
  buildBreadcrumbSchema,
  buildFaqSchema,
  buildLocalBusinessSchema,
  buildSecurityInstallationServiceSchema,
} from '@/lib/seo/structured-data'

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://aucklandsecuritysystems.co.nz'
const path = '/security-camera-installation-auckland'

const faqs = [
  {
    question: 'Do I need professional security camera installation?',
    answer:
      'DIY cameras can be fine for renters, one or two simple indoor cameras, or a basic doorbell camera. Professional installation is usually better for wired PoE cameras, NVR recording, driveway coverage, four or more cameras, businesses, and clean long-term cable work.',
  },
  {
    question: 'Does Get Secure offer free CCTV quotes in Auckland?',
    answer:
      'Yes. Get Secure offers free site visits for quote jobs in Auckland. Final pricing depends on property layout, camera count, cable runs, recording requirements and hardware choice.',
  },
  {
    question: 'What camera systems are best for Auckland homes?',
    answer:
      'For reliable long-term recording, a wired PoE camera system with an NVR is often the best fit. Battery or Wi-Fi cameras can still suit renters, small areas or low-risk locations where easy installation matters more than continuous recording.',
  },
  {
    question: 'Can you help with alarms, intercoms or networking too?',
    answer:
      'Yes. Get Secure can quote CCTV, alarms, intercoms and networking work across Auckland, so the camera system can be planned with the wider security setup in mind.',
  },
]

export const metadata: Metadata = {
  title: 'Security Camera Installation Auckland | CCTV Installer | Get Secure NZ',
  description:
    'Professional security camera and CCTV installation in Auckland by Get Secure NZ. Free quote site visits, wired PoE/NVR options, driveway coverage, home and business systems.',
  alternates: {
    canonical: `${SITE_URL}${path}`,
  },
}

export default function SecurityCameraInstallationAucklandPage() {
  return (
    <>
      <JsonLd data={buildLocalBusinessSchema()} />
      <JsonLd data={buildSecurityInstallationServiceSchema()} />
      <JsonLd data={buildFaqSchema(faqs, path)} />
      <JsonLd
        data={buildBreadcrumbSchema(
          [
            { label: 'Home', href: '/' },
            { label: 'Security camera installation Auckland' },
          ],
          path,
        )}
      />

      <SiteHeader variant="full" />

      <main>
        <section className="bg-gradient-to-b from-brand-50 to-white py-16 sm:py-20">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl">
              <p className="text-accent-500 font-semibold text-sm uppercase tracking-widest mb-4">
                Auckland CCTV installation
              </p>
              <h1 className="text-4xl sm:text-5xl font-bold text-brand-600 leading-tight mb-6">
                Security camera installation in Auckland — without the guesswork
              </h1>
              <p className="text-lg text-neutral-600 leading-relaxed mb-8">
                Not sure whether you need DIY cameras, Wi‑Fi cameras or a wired NVR system? This page explains when professional installation is worth it, and lets you request a practical quote from {GET_SECURE.name}.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 mb-6">
                <Button href="?quote=open" size="lg">Get a free quote →</Button>
                <Button href="/quiz" variant="secondary" size="lg">Use the camera chooser</Button>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm text-neutral-600">
                {GET_SECURE.proofPoints.map((point) => (
                  <div key={point} className="rounded-xl bg-white border border-brand-100 px-4 py-3 shadow-sm">
                    {point}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="py-14 bg-white">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-2 gap-8">
            <div className="rounded-3xl border border-neutral-100 p-6 shadow-sm">
              <h2 className="text-2xl font-bold text-neutral-900 mb-4">DIY is usually enough when…</h2>
              <ul className="space-y-3 text-neutral-600">
                <li>• You rent and need removable, no-drill cameras.</li>
                <li>• You only need one or two simple indoor or doorbell cameras.</li>
                <li>• Missing the first second of motion is not a big issue.</li>
                <li>• You are comfortable managing batteries, apps and subscriptions yourself.</li>
              </ul>
            </div>
            <div className="rounded-3xl border border-brand-100 bg-brand-50 p-6 shadow-sm">
              <h2 className="text-2xl font-bold text-brand-700 mb-4">Professional install is smarter when…</h2>
              <ul className="space-y-3 text-neutral-700">
                <li>• Driveway, gate or plate capture matters.</li>
                <li>• You want four or more cameras covering the whole property.</li>
                <li>• You want local NVR recording with no monthly camera subscription.</li>
                <li>• Cable work needs to be clean, safe and reliable long term.</li>
                <li>• The site is a shop, office, warehouse or commercial property.</li>
              </ul>
            </div>
          </div>
        </section>

        <section className="py-14 bg-neutral-50 border-y border-neutral-100">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-2xl mb-8">
              <h2 className="text-3xl font-bold text-neutral-900 mb-3">What Get Secure can install</h2>
              <p className="text-neutral-600">
                The aim is not to oversell hardware. The right setup depends on your property, camera positions, recording needs and budget.
              </p>
            </div>
            <div className="grid md:grid-cols-3 gap-5">
              {[
                ['Wired PoE/NVR systems', 'Reliable full-time recording, local storage, better for evidence and multi-camera homes.'],
                ['Driveway and entry cameras', 'Camera placement planned around faces, vehicles, approach angles and useful footage.'],
                ['Business CCTV', 'Coverage planning for entries, stock areas, counters, yards, offices and after-hours visibility.'],
                ['Alarm and intercom planning', 'CCTV can be quoted alongside alarms, intercoms and access-related work.'],
                ['Network/Wi‑Fi support', 'Useful when cameras need stable connectivity or a cleaner network layout.'],
                ['Repairs and upgrades', 'Existing systems can be checked, repaired or upgraded where practical.'],
              ].map(([title, copy]) => (
                <div key={title} className="rounded-2xl bg-white border border-neutral-100 p-5 shadow-sm">
                  <h3 className="font-bold text-neutral-900 mb-2">{title}</h3>
                  <p className="text-sm text-neutral-600 leading-relaxed">{copy}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-14 bg-white">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-[1fr_360px] gap-8 items-start">
            <div>
              <h2 className="text-3xl font-bold text-neutral-900 mb-4">Auckland service areas</h2>
              <p className="text-neutral-600 mb-5">
                Get Secure services Auckland-wide, with a practical focus on jobs where a proper site visit and reliable install will make a real difference.
              </p>
              <div className="flex flex-wrap gap-2">
                {AUCKLAND_AREAS.map((area) => (
                  <span key={area} className="rounded-full bg-brand-50 border border-brand-100 px-4 py-2 text-sm text-brand-700">
                    {area}
                  </span>
                ))}
              </div>
            </div>
            <aside className="rounded-3xl bg-brand-600 text-white p-6 shadow-lg">
              <h3 className="text-xl font-bold mb-3">Want a straight answer?</h3>
              <p className="text-brand-100 text-sm leading-relaxed mb-5">
                Send your suburb, property type and rough camera count. If DIY is enough, we can say that. If a professional install is better, Get Secure can quote it properly.
              </p>
              <Button href="?quote=open" variant="secondary" fullWidth>Request a quote</Button>
              <p className="text-xs text-brand-200 mt-4">
                Or call <a href={GET_SECURE.phoneHref} className="font-semibold text-white">{GET_SECURE.phoneDisplay}</a>
              </p>
            </aside>
          </div>
        </section>

        <section className="py-14 bg-neutral-50">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-neutral-900 mb-6">Security camera installation FAQs</h2>
            <div className="space-y-4">
              {faqs.map((faq) => (
                <div key={faq.question} className="rounded-2xl bg-white border border-neutral-100 p-5">
                  <h3 className="font-bold text-neutral-900 mb-2">{faq.question}</h3>
                  <p className="text-sm text-neutral-600 leading-relaxed">{faq.answer}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <SiteFooter />
      <StickyCTA
        primaryLabel="Get a free quote →"
        primaryHref="?quote=open"
        secondaryLabel="Take the quiz"
        secondaryHref="/quiz"
        pageContext="security-camera-installation-auckland"
      />
      <Suspense fallback={null}>
        <QuoteModalTrigger />
      </Suspense>
    </>
  )
}
