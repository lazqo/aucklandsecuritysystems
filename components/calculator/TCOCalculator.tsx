'use client'

import { useState, useEffect, useCallback } from 'react'
import { useSearchParams } from 'next/navigation'
import type { TCOInputs, ArchitectureType } from '@/types'
import { computeTCO, defaultTCOInputs } from '@/lib/tco/calculator'
import { brands } from '@/lib/data/brands'
import { subscriptionPlans } from '@/lib/data/subscription-plans'
import { architectureLabels } from '@/lib/quiz/rules-engine'
import { formatNZD } from '@/lib/utils'
import { useAnalytics } from '@/lib/analytics/events'
import { TCOOutputsDisplay } from './TCOOutputs'

const architectureOptions: ArchitectureType[] = [
  'wifi-diy-ecosystem',
  'local-storage-no-sub',
  'poe-nvr-system',
  'battery-solar',
  'hybrid',
]

export function TCOCalculator() {
  const searchParams = useSearchParams()
  const { track } = useAnalytics()
  const [hasTrackedView, setHasTrackedView] = useState(false)

  const [inputs, setInputs] = useState<TCOInputs>(() => {
    return defaultTCOInputs({
      architectureType: (searchParams.get('arch') as ArchitectureType) ?? 'wifi-diy-ecosystem',
      brandSlug: searchParams.get('brand') ?? 'ring',
      subscriptionPlanId: searchParams.get('plan') ?? 'ring-protect-plus',
    })
  })

  useEffect(() => {
    if (!hasTrackedView) {
      track('calculator_view', {})
      setHasTrackedView(true)
    }
  }, [track, hasTrackedView])

  const outputs = computeTCO(inputs)

  useEffect(() => {
    track('calculator_result_view', {
      architecture: inputs.architectureType,
      year1_cost: outputs.year1TotalNZD,
    })
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inputs.architectureType, outputs.year1TotalNZD])

  function updateInput<K extends keyof TCOInputs>(key: K, value: TCOInputs[K]) {
    setInputs((prev) => ({ ...prev, [key]: value }))
    track('calculator_input_change', { field: key, value: String(value) })
  }

  const filteredPlans = subscriptionPlans.filter(
    (p) => p.brandSlug === inputs.brandSlug
  )

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
      {/* ─── Inputs ──────────��─────────────────────────────���──────────────── */}
      <div className="bg-white rounded-2xl border border-neutral-100 shadow-sm p-6 space-y-5">
        <h2 className="font-bold text-lg text-neutral-900">Configure your system</h2>

        {/* Architecture */}
        <div>
          <label className="block text-sm font-semibold text-neutral-700 mb-1.5">
            System type
          </label>
          <select
            value={inputs.architectureType}
            onChange={(e) => updateInput('architectureType', e.target.value as ArchitectureType)}
            className="w-full rounded-xl border border-neutral-200 px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-brand-400"
          >
            {architectureOptions.map((opt) => (
              <option key={opt} value={opt}>
                {architectureLabels[opt]}
              </option>
            ))}
          </select>
        </div>

        {/* Brand */}
        <div>
          <label className="block text-sm font-semibold text-neutral-700 mb-1.5">
            Brand (optional)
          </label>
          <select
            value={inputs.brandSlug}
            onChange={(e) => updateInput('brandSlug', e.target.value)}
            className="w-full rounded-xl border border-neutral-200 px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-brand-400"
          >
            <option value="">No specific brand</option>
            {brands.map((b) => (
              <option key={b.slug} value={b.slug}>
                {b.name}
              </option>
            ))}
          </select>
        </div>

        {/* Subscription plan */}
        {filteredPlans.length > 0 && (
          <div>
            <label className="block text-sm font-semibold text-neutral-700 mb-1.5">
              Subscription plan
            </label>
            <select
              value={inputs.subscriptionPlanId}
              onChange={(e) => updateInput('subscriptionPlanId', e.target.value)}
              className="w-full rounded-xl border border-neutral-200 px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-brand-400"
            >
              <option value="none">No subscription</option>
              {filteredPlans.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.planName}
                  {p.priceNZDMonthly !== null && p.priceNZDMonthly > 0
                    ? ` — ${formatNZD(p.priceNZDMonthly)}/mo`
                    : ' — Free'}
                </option>
              ))}
            </select>
          </div>
        )}

        {/* Number of cameras */}
        <div>
          <label className="block text-sm font-semibold text-neutral-700 mb-1.5">
            Number of cameras: <span className="text-brand-600">{inputs.cameraCount}</span>
          </label>
          <input
            type="range"
            min={1}
            max={16}
            value={inputs.cameraCount}
            onChange={(e) => updateInput('cameraCount', parseInt(e.target.value))}
            className="w-full accent-brand-600"
          />
          <div className="flex justify-between text-xs text-neutral-400 mt-1">
            <span>1</span>
            <span>8</span>
            <span>16</span>
          </div>
        </div>

        {/* Installation cost */}
        <div>
          <label className="block text-sm font-semibold text-neutral-700 mb-1.5">
            Installation cost (NZD) — 0 for DIY
          </label>
          <input
            type="number"
            min={0}
            step={50}
            value={inputs.installationCostNZD}
            onChange={(e) => updateInput('installationCostNZD', parseInt(e.target.value) || 0)}
            placeholder="0"
            className="w-full rounded-xl border border-neutral-200 px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-brand-400"
          />
        </div>

        {/* Storage device */}
        <div>
          <label className="flex items-center gap-2 cursor-pointer text-sm font-semibold text-neutral-700">
            <input
              type="checkbox"
              checked={inputs.includeStorageDevice}
              onChange={(e) => updateInput('includeStorageDevice', e.target.checked)}
              className="rounded border-neutral-300 text-brand-600 focus:ring-brand-400"
            />
            Include storage device (hub / NVR)
          </label>
          {inputs.includeStorageDevice && (
            <input
              type="number"
              min={0}
              step={50}
              value={inputs.storageDeviceCostNZD || ''}
              onChange={(e) => updateInput('storageDeviceCostNZD', parseInt(e.target.value) || 0)}
              placeholder="Leave empty for estimate"
              className="mt-2 w-full rounded-xl border border-neutral-200 px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-brand-400"
            />
          )}
        </div>

        {/* Years to project */}
        <div>
          <label className="block text-sm font-semibold text-neutral-700 mb-1.5">
            Project over
          </label>
          <div className="flex gap-2">
            {([2, 3, 5] as const).map((yr) => (
              <button
                key={yr}
                onClick={() => updateInput('yearsToProject', yr)}
                className={`flex-1 py-2 rounded-xl text-sm font-medium border transition-colors ${
                  inputs.yearsToProject === yr
                    ? 'border-brand-500 bg-brand-50 text-brand-700'
                    : 'border-neutral-200 text-neutral-600 hover:border-brand-300'
                }`}
              >
                {yr} years
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* ─── Outputs ────────────────��─────────────────────────────────────── */}
      <TCOOutputsDisplay outputs={outputs} inputs={inputs} />
    </div>
  )
}
