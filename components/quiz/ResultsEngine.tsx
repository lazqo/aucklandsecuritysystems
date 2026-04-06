import type { QuizResult } from '@/types'
import { architectureLabels, architectureDescriptions, architectureUprfontRange, architectureYear3Range } from '@/lib/quiz/rules-engine'
import { brands } from '@/lib/data/brands'
import Link from 'next/link'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'

interface ResultsEngineProps {
  result: QuizResult
  onStartOver: () => void
  onEmailShortlist: () => void
}

export function ResultsEngine({ result, onStartOver, onEmailShortlist }: ResultsEngineProps) {
  const primaryLabel = architectureLabels[result.primaryRecommendation]
  const primaryDescription = architectureDescriptions[result.primaryRecommendation]
  const upfrontRange = architectureUprfontRange[result.primaryRecommendation]
  const year3Range = architectureYear3Range[result.primaryRecommendation]

  const recommendedBrands = brands.filter((b) =>
    result.recommendedBrandSlugs.includes(b.slug)
  )

  const altLabel = result.alternativeRecommendation
    ? architectureLabels[result.alternativeRecommendation]
    : null

  const showProInstallPrompt = result.primaryRecommendation === 'poe-nvr-system'

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center pb-4">
        <div className="inline-flex items-center gap-2 bg-green-50 text-green-700 rounded-full px-4 py-1.5 text-sm font-semibold mb-4">
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
          Your recommendation is ready
        </div>
        <h2 className="text-2xl font-bold text-neutral-900 mb-2">{primaryLabel}</h2>
        <p className="text-neutral-600 text-sm max-w-lg mx-auto">{primaryDescription}</p>
      </div>

      {/* Why this fits */}
      <div className="bg-white rounded-2xl border border-neutral-100 shadow-sm p-5">
        <h3 className="font-semibold text-neutral-900 mb-3 text-sm uppercase tracking-wide">
          Why this fits you
        </h3>
        <ul className="space-y-2">
          {result.reasoning.map((reason, i) => (
            <li key={i} className="flex gap-2.5 text-sm text-neutral-700">
              <svg className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
              {reason}
            </li>
          ))}
        </ul>
      </div>

      {/* Warning */}
      {result.warningMessage && (
        <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4 text-sm text-amber-800">
          {result.warningMessage}
        </div>
      )}

      {/* Cost estimates */}
      <div className="grid grid-cols-2 gap-3">
        <div className="bg-neutral-50 rounded-2xl p-4 text-center">
          <p className="text-xs text-neutral-500 mb-1">Upfront cost estimate</p>
          <p className="font-bold text-neutral-900">{upfrontRange}</p>
        </div>
        <div className="bg-neutral-50 rounded-2xl p-4 text-center">
          <p className="text-xs text-neutral-500 mb-1">3-year total (est.)</p>
          <p className="font-bold text-neutral-900">{year3Range}</p>
        </div>
      </div>

      {/* Recommended brands */}
      {recommendedBrands.length > 0 && (
        <div>
          <h3 className="font-semibold text-neutral-900 mb-3 text-sm">Recommended for this setup</h3>
          <div className="space-y-2">
            {recommendedBrands.map((brand, i) => (
              <Link
                key={brand.slug}
                href={`/brands/${brand.slug}`}
                className="flex items-center gap-3 bg-white rounded-2xl border border-neutral-100 p-3.5 hover:border-brand-300 hover:shadow-sm transition-all group"
              >
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-sm text-neutral-900 group-hover:text-brand-600 transition-colors">
                      {brand.name}
                    </span>
                    {i === 0 && <Badge variant="green" size="sm">Best match</Badge>}
                    {i === 1 && <Badge variant="neutral" size="sm">Alternative</Badge>}
                  </div>
                  <p className="text-xs text-neutral-500 mt-0.5">{brand.tagline}</p>
                </div>
                <svg className="w-4 h-4 text-neutral-300 group-hover:text-brand-400 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 18l6-6-6-6" />
                </svg>
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* Alternative recommendation */}
      {altLabel && (
        <div className="bg-neutral-50 rounded-2xl border border-neutral-100 p-4">
          <p className="text-sm text-neutral-600">
            <strong className="text-neutral-800">Also consider:</strong>{' '}
            {altLabel} — {architectureDescriptions[result.alternativeRecommendation!]}
          </p>
        </div>
      )}

      {/* CTAs */}
      <div className="space-y-3 pt-2">
        {showProInstallPrompt ? (
          <Button href="/?quote=open" fullWidth size="lg">
            Get a free professional install quote →
          </Button>
        ) : (
          <Button href={result.ctaHref} fullWidth size="lg">
            {result.ctaLabel} →
          </Button>
        )}
        <button
          onClick={onEmailShortlist}
          className="w-full py-3 px-4 rounded-xl border border-brand-200 text-brand-600 font-semibold text-sm hover:bg-brand-50 transition-colors"
        >
          📩 Email me this shortlist
        </button>
        <Link
          href="/calculator"
          className="block text-center py-3 px-4 rounded-xl border border-neutral-200 text-neutral-600 font-medium text-sm hover:bg-neutral-50 transition-colors"
        >
          Calculate total cost over 3 years
        </Link>
      </div>

      {/* Restart */}
      <div className="text-center">
        <button
          onClick={onStartOver}
          className="text-sm text-neutral-400 hover:text-neutral-600 transition-colors"
        >
          Start over
        </button>
      </div>
    </div>
  )
}
