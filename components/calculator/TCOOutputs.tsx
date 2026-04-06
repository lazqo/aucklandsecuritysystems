import type { TCOInputs, TCOOutputs } from '@/types'
import { formatNZD } from '@/lib/utils'
import { Button } from '@/components/ui/Button'

interface TCOOutputsDisplayProps {
  outputs: TCOOutputs
  inputs: TCOInputs
}

export function TCOOutputsDisplay({ outputs, inputs }: TCOOutputsDisplayProps) {
  const years = inputs.yearsToProject

  return (
    <div className="space-y-4">
      {/* Year totals */}
      <div className="bg-white rounded-2xl border border-neutral-100 shadow-sm p-6">
        <h3 className="font-bold text-neutral-900 mb-4">Total cost estimate</h3>
        <div className="space-y-3">
          {[
            { label: 'Year 1 (upfront + running)', value: outputs.year1TotalNZD, highlight: true },
            ...(years >= 2 ? [{ label: 'After 2 years (cumulative)', value: outputs.year2TotalNZD, highlight: false }] : []),
            ...(years >= 3 ? [{ label: 'After 3 years (cumulative)', value: outputs.year3TotalNZD, highlight: false }] : []),
          ].map(({ label, value, highlight }) => (
            <div
              key={label}
              className={`flex justify-between items-center py-2.5 px-3 rounded-xl ${
                highlight ? 'bg-brand-50 border border-brand-100' : 'bg-neutral-50'
              }`}
            >
              <span className="text-sm text-neutral-700">{label}</span>
              <span className={`font-bold ${highlight ? 'text-brand-700' : 'text-neutral-900'}`}>
                {formatNZD(value)}
              </span>
            </div>
          ))}
        </div>

        {outputs.monthlyOngoingNZD > 0 && (
          <p className="text-xs text-neutral-500 mt-3">
            Ongoing monthly cost: <strong>{formatNZD(outputs.monthlyOngoingNZD)}/month</strong>
          </p>
        )}

        {outputs.savingsVsCloudNZD !== null && outputs.savingsVsCloudNZD > 0 && (
          <div className="mt-3 bg-green-50 rounded-xl p-3">
            <p className="text-xs text-green-800 font-medium">
              💰 Estimated saving vs a cloud subscription over 3 years:{' '}
              <strong>{formatNZD(outputs.savingsVsCloudNZD)}</strong>
            </p>
          </div>
        )}
      </div>

      {/* Breakdown table */}
      <div className="bg-white rounded-2xl border border-neutral-100 shadow-sm p-6">
        <h3 className="font-bold text-neutral-900 mb-4">Cost breakdown</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-neutral-100">
                <th className="text-left text-xs font-semibold text-neutral-500 pb-2">Item</th>
                <th className="text-right text-xs font-semibold text-neutral-500 pb-2">Year 1</th>
                {years >= 2 && (
                  <th className="text-right text-xs font-semibold text-neutral-500 pb-2">Year 2</th>
                )}
                {years >= 3 && (
                  <th className="text-right text-xs font-semibold text-neutral-500 pb-2">Year 3</th>
                )}
              </tr>
            </thead>
            <tbody>
              {outputs.breakdown.map((line) => (
                <tr key={line.label} className="border-b border-neutral-50">
                  <td className="py-2 text-neutral-700">
                    {line.label}
                    {line.isRecurring && (
                      <span className="ml-1 text-xs text-neutral-400">(recurring)</span>
                    )}
                  </td>
                  <td className="text-right py-2 text-neutral-800">
                    {line.year1 > 0 ? formatNZD(line.year1) : '—'}
                  </td>
                  {years >= 2 && (
                    <td className="text-right py-2 text-neutral-800">
                      {line.year2 > 0 ? formatNZD(line.year2) : '—'}
                    </td>
                  )}
                  {years >= 3 && (
                    <td className="text-right py-2 text-neutral-800">
                      {line.year3 > 0 ? formatNZD(line.year3) : '—'}
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Notes */}
      <div className="bg-amber-50 border border-amber-100 rounded-2xl p-4 space-y-1.5">
        <p className="text-xs font-semibold text-amber-800 uppercase tracking-wide">Important</p>
        {outputs.notes.map((note, i) => (
          <p key={i} className="text-xs text-amber-700">• {note}</p>
        ))}
      </div>

      {/* CTA */}
      <div className="space-y-2">
        <Button href="/?quote=open" fullWidth variant="primary">
          Get a more accurate quote →
        </Button>
        <Button href="/quiz" fullWidth variant="ghost">
          ← Back to camera chooser quiz
        </Button>
      </div>
    </div>
  )
}
