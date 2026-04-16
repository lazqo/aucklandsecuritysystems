import type { Metadata } from 'next'
import { SiteHeader } from '@/components/layout/SiteHeader'
import { SiteFooter } from '@/components/layout/SiteFooter'
import { BreadcrumbNav } from '@/components/layout/BreadcrumbNav'
import { JsonLd } from '@/components/seo/JsonLd'

export const metadata: Metadata = {
  title: 'About | Auckland Security Systems — Independent Security Camera Guides for NZ',
  description:
    'Auckland Security Systems is an independent resource helping New Zealand homeowners and renters compare, research, and choose the right security cameras — without the sales pitch.',
}

const aboutSchema = {
  '@context': 'https://schema.org',
  '@type': 'AboutPage',
  name: 'About Auckland Security Systems',
  description:
    'Independent security camera comparison guides and tools for New Zealand homeowners, renters, and small businesses.',
  url: 'https://aucklandsecuritysystems.co.nz/about',
  publisher: {
    '@type': 'Organization',
    name: 'Auckland Security Systems',
    url: 'https://aucklandsecuritysystems.co.nz',
  },
}

export default function AboutPage() {
  return (
    <>
      <JsonLd data={aboutSchema} />
      <SiteHeader variant="minimal" />
      <main>
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <BreadcrumbNav
            items={[{ label: 'Home', href: '/' }, { label: 'About' }]}
            currentPath="/about"
          />

          {/* Header */}
          <div className="mb-10">
            <p className="text-accent-500 font-semibold text-sm uppercase tracking-widest mb-3">
              About this site
            </p>
            <h1 className="text-4xl font-bold text-brand-600 mb-4">
              Independent security camera guides for New Zealand
            </h1>
            <p className="text-lg text-neutral-600 leading-relaxed">
              Auckland Security Systems is a free, independent resource — not a shop, not a brand,
              and not sponsored by any manufacturer. Our only job is to help you make a better
              decision about home security.
            </p>
          </div>

          {/* What we do */}
          <section className="mb-10 prose prose-neutral max-w-none">
            <h2>What this site is for</h2>
            <p>
              Choosing a home security camera in New Zealand is harder than it should be. Retailer
              websites push whatever earns the highest margin. Review sites are often written by
              people who&apos;ve never installed a camera in their life. And the brands themselves
              have obvious reasons to oversell their products.
            </p>
            <p>
              We built this site to cut through that. Every guide, comparison, and tool here is
              written with one question in mind: <strong>what would genuinely help a NZ homeowner
              make a better decision?</strong>
            </p>
            <p>
              That means covering things other sites skip — like how NZ privacy law affects where
              you can point a camera, which brands are actually stocked locally (not just shipped
              from overseas warehouses), and what a system will realistically cost you over three
              years once you factor in subscriptions and replacements.
            </p>

            <h2>What we cover</h2>
            <ul>
              <li>
                <strong>Brand reviews</strong> — honest assessments of Ring, Arlo, Eufy, Swann,
                and others. We cover NZ availability, subscription costs, offline capability, and
                rental-friendliness.
              </li>
              <li>
                <strong>Side-by-side comparisons</strong> — when the choice comes down to two
                specific systems, we break down exactly how they differ and who each one suits.
              </li>
              <li>
                <strong>Buying guides</strong> — scenario-based guides (rentals, driveways, small
                businesses) that match real NZ situations rather than generic advice.
              </li>
              <li>
                <strong>Tools</strong> — a free 8-question quiz that recommends a system based on
                your property type, budget, and priorities, plus a 3-year total cost calculator
                that includes subscriptions, hardware, and installation.
              </li>
              <li>
                <strong>NZ legal guides</strong> — plain-English explanations of how the Privacy
                Act 2020 and Crimes Act apply to home security cameras, so you stay on the right
                side of the law.
              </li>
            </ul>

            <h2>How we stay independent</h2>
            <p>
              This site does not accept payment from brands for reviews or placement. We do not
              run affiliate links. When we recommend getting a professional assessment, it&apos;s
              because that genuinely serves you — not because we earn a referral fee.
            </p>
            <p>
              Content is reviewed and updated regularly as NZ pricing, availability, and
              subscription plans change. If you spot something that&apos;s out of date or
              inaccurate, we want to know.
            </p>

            <h2>Who is behind this site</h2>
            <p>
              This resource is produced by the team at{' '}
              <a
                href="https://getsecure.co.nz"
                target="_blank"
                rel="noopener noreferrer"
                className="text-accent-500 hover:text-accent-600"
              >
                Get Secure Ltd
              </a>
              , a New Zealand security installation company. The guides and tools are written to be
              genuinely useful whether you end up using Get Secure or not — but if you do want a
              professional assessment after doing your research, that&apos;s what the quote form is
              for.
            </p>
            <p>
              We think the best way to earn your trust as a business is to give you honest
              information first. That&apos;s the idea behind this site.
            </p>
          </section>

          {/* CTA */}
          <div className="bg-brand-600 rounded-2xl p-8 text-white text-center">
            <h2 className="text-xl font-bold mb-2">Not sure where to start?</h2>
            <p className="text-brand-100 mb-6 text-sm">
              Take the free 8-question quiz. It matches your situation to the right camera
              architecture in about two minutes.
            </p>
            <a
              href="/quiz"
              className="inline-block bg-accent-400 hover:bg-accent-500 text-white font-semibold px-6 py-3 rounded-xl transition-colors"
            >
              Start the quiz →
            </a>
          </div>
        </div>
      </main>
      <SiteFooter />
    </>
  )
}
