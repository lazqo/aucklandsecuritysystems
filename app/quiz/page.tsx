import type { Metadata } from 'next'
import { Suspense } from 'react'
import { SiteHeader } from '@/components/layout/SiteHeader'
import { SiteFooter } from '@/components/layout/SiteFooter'
import { BreadcrumbNav } from '@/components/layout/BreadcrumbNav'
import { QuizWizard } from '@/components/quiz/QuizWizard'
import { JsonLd } from '@/components/seo/JsonLd'
import { buildWebApplicationSchema } from '@/lib/seo/structured-data'

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://aucklandsecuritysystems.co.nz'

export const metadata: Metadata = {
  title: 'Find My Best Security Camera — 2-Minute Quiz | Get Secure NZ',
  description:
    'Answer 8 quick questions and get a personalised home security camera recommendation for your NZ home. No jargon. No sales pressure.',
  alternates: { canonical: `${SITE_URL}/quiz` },
}

export default function QuizPage() {
  return (
    <>
      <SiteHeader variant="minimal" />
      <JsonLd
        data={buildWebApplicationSchema({
          name: 'Get Secure NZ — Camera Chooser Quiz',
          description: 'Answer 8 questions and get a personalised security camera recommendation for your NZ home.',
          url: '/quiz',
        })}
      />

      <main className="min-h-screen bg-gradient-to-b from-neutral-50 to-white">
        <div className="max-w-3xl mx-auto px-4 py-4">
          <BreadcrumbNav
            items={[
              { label: 'Home', href: '/' },
              { label: 'Camera chooser quiz' },
            ]}
            currentPath="/quiz"
          />
        </div>

        <div className="max-w-3xl mx-auto px-4 pb-4 text-center">
          <h1 className="text-3xl font-bold text-neutral-900 mb-2">
            Find your best security camera setup
          </h1>
          <p className="text-neutral-500 text-sm mb-2">
            Takes about 2 minutes · Personalised to your NZ home
          </p>
        </div>

        <Suspense
          fallback={
            <div className="max-w-2xl mx-auto px-4 py-16 text-center text-neutral-400">
              Loading quiz…
            </div>
          }
        >
          <QuizWizard />
        </Suspense>
      </main>

      <SiteFooter />
    </>
  )
}
