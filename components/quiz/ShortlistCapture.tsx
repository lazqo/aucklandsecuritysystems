'use client'

import { useState } from 'react'
import type { QuizResult } from '@/types'
import { architectureLabels } from '@/lib/quiz/rules-engine'
import { useAnalytics } from '@/lib/analytics/events'
import { Button } from '@/components/ui/Button'

interface ShortlistCaptureProps {
  result: QuizResult
  onRestart: () => void
}

export function ShortlistCapture({ result, onRestart }: ShortlistCaptureProps) {
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
  const { track } = useAnalytics()

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!email) return
    setLoading(true)
    // TODO: Wire to email/CRM endpoint
    await new Promise((r) => setTimeout(r, 800))
    track('shortlist_capture_submit', { result_type: result.primaryRecommendation })
    setLoading(false)
    setSubmitted(true)
  }

  if (submitted) {
    return (
      <div className="text-center py-8">
        <div className="text-4xl mb-4">✅</div>
        <h2 className="text-xl font-bold text-neutral-900 mb-2">Shortlist sent!</h2>
        <p className="text-neutral-500 text-sm mb-6">
          Check your inbox — we&apos;ve sent your personalised camera recommendation.
        </p>
        <Button href="/?quote=open" fullWidth>
          Talk to an expert →
        </Button>
        <button
          onClick={onRestart}
          className="mt-4 text-sm text-neutral-400 hover:text-neutral-600 transition-colors block mx-auto"
        >
          Start over
        </button>
      </div>
    )
  }

  return (
    <div className="bg-white rounded-2xl border border-neutral-100 shadow-sm p-6">
      <div className="text-2xl mb-3">📩</div>
      <h2 className="text-xl font-bold text-neutral-900 mb-2">
        Get your shortlist by email
      </h2>
      <p className="text-sm text-neutral-500 mb-1">
        We&apos;ll send your recommendation (
        <strong className="text-neutral-700">{architectureLabels[result.primaryRecommendation]}</strong>
        ) plus a guide to next steps.
      </p>
      <p className="text-xs text-neutral-400 mb-5">No spam. One email. Unsubscribe any time.</p>

      <form onSubmit={handleSubmit} className="space-y-3">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="your@email.com"
          required
          className="w-full rounded-xl border border-neutral-200 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-brand-400 focus:border-transparent placeholder:text-neutral-400"
        />
        <Button type="submit" fullWidth disabled={loading || !email}>
          {loading ? 'Sending…' : 'Send my shortlist →'}
        </Button>
      </form>

      <div className="mt-4 text-center">
        <button
          onClick={onRestart}
          className="text-sm text-neutral-400 hover:text-neutral-600 transition-colors"
        >
          Skip — start over instead
        </button>
      </div>
    </div>
  )
}
