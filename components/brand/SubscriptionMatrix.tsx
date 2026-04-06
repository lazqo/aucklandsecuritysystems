import type { SubscriptionPlan } from '@/types'
import { formatNZD, formatDate } from '@/lib/utils'
import { Badge } from '@/components/ui/Badge'

interface SubscriptionMatrixProps {
  plans: SubscriptionPlan[]
  brandName: string
}

export function SubscriptionMatrix({ plans, brandName }: SubscriptionMatrixProps) {
  if (plans.length === 0) return null

  const paidPlans = plans.filter((p) => !p.isFree)
  const freePlan = plans.find((p) => p.isFree)
  const latestVerified = plans.reduce((acc, p) => (p.lastVerifiedDate > acc ? p.lastVerifiedDate : acc), '')

  return (
    <div className="rounded-2xl border border-neutral-100 overflow-hidden">
      <div className="bg-neutral-50 px-5 py-4 border-b border-neutral-100 flex items-center justify-between flex-wrap gap-2">
        <h3 className="font-bold text-neutral-900">{brandName} subscription plans</h3>
        <p className="text-xs text-neutral-400">
          Prices estimated — verified {formatDate(latestVerified)}. Check {brandName} directly for current NZ pricing.
        </p>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-neutral-100">
              <th className="text-left px-4 py-3 text-xs font-semibold text-neutral-500 bg-neutral-50/50">Plan</th>
              <th className="text-center px-3 py-3 text-xs font-semibold text-neutral-500 bg-neutral-50/50">Monthly</th>
              <th className="text-center px-3 py-3 text-xs font-semibold text-neutral-500 bg-neutral-50/50">Annual</th>
              <th className="text-center px-3 py-3 text-xs font-semibold text-neutral-500 bg-neutral-50/50">Cameras</th>
              <th className="text-center px-3 py-3 text-xs font-semibold text-neutral-500 bg-neutral-50/50">History</th>
              <th className="text-center px-3 py-3 text-xs font-semibold text-neutral-500 bg-neutral-50/50">AI</th>
              <th className="text-center px-3 py-3 text-xs font-semibold text-neutral-500 bg-neutral-50/50">Monitoring</th>
            </tr>
          </thead>
          <tbody>
            {freePlan && (
              <tr className="border-b border-neutral-50 bg-green-50/30">
                <td className="px-4 py-3">
                  <div>
                    <span className="font-semibold text-neutral-900">{freePlan.planName}</span>
                    <Badge variant="green" size="sm" className="ml-2">Free</Badge>
                  </div>
                  {freePlan.notes && (
                    <p className="text-xs text-neutral-500 mt-0.5 max-w-xs">{freePlan.notes.slice(0, 80)}…</p>
                  )}
                </td>
                <td className="text-center px-3 py-3 font-semibold text-green-700">Free</td>
                <td className="text-center px-3 py-3 font-semibold text-green-700">Free</td>
                <td className="text-center px-3 py-3">{freePlan.cameras === 'unlimited' ? '∞' : freePlan.cameras}</td>
                <td className="text-center px-3 py-3 text-xs">{freePlan.videoHistory}</td>
                <td className="text-center px-3 py-3">{freePlan.aiDetection ? '✅' : '—'}</td>
                <td className="text-center px-3 py-3">{freePlan.professionalMonitoring ? '✅' : '—'}</td>
              </tr>
            )}

            {paidPlans.map((plan) => (
              <tr key={plan.id} className="border-b border-neutral-50 hover:bg-neutral-50/50">
                <td className="px-4 py-3">
                  <span className="font-semibold text-neutral-900">{plan.planName}</span>
                  {plan.notes && (
                    <p className="text-xs text-neutral-500 mt-0.5 max-w-xs">{plan.notes.slice(0, 80)}…</p>
                  )}
                </td>
                <td className="text-center px-3 py-3 font-medium text-neutral-800">
                  {plan.priceNZDMonthly !== null
                    ? `~${formatNZD(plan.priceNZDMonthly)}`
                    : <span className="text-neutral-400 text-xs">Verify</span>}
                </td>
                <td className="text-center px-3 py-3 font-medium text-neutral-800">
                  {plan.priceNZDYearly !== null
                    ? `~${formatNZD(plan.priceNZDYearly)}`
                    : <span className="text-neutral-400 text-xs">Verify</span>}
                </td>
                <td className="text-center px-3 py-3">{plan.cameras === 'unlimited' ? '∞' : plan.cameras}</td>
                <td className="text-center px-3 py-3 text-xs">{plan.videoHistory}</td>
                <td className="text-center px-3 py-3">{plan.aiDetection ? '✅' : '—'}</td>
                <td className="text-center px-3 py-3">{plan.professionalMonitoring ? '✅' : '—'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="px-5 py-3 bg-amber-50 border-t border-amber-100">
        <p className="text-xs text-amber-800">
          ⚠️ Pricing shown is estimated and may be out of date. {brandName} changes plan names and pricing regularly.
          Always verify current NZ pricing directly on the {brandName} website before making a decision.
        </p>
      </div>
    </div>
  )
}
