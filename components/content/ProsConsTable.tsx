interface ProsConsTableProps {
  pros: string[]
  cons: string[]
  prosLabel?: string
  consLabel?: string
}

export function ProsConsTable({
  pros,
  cons,
  prosLabel = 'What we like',
  consLabel = 'Watch out for',
}: ProsConsTableProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      <div className="bg-green-50 rounded-2xl p-5 border border-green-100">
        <h4 className="text-sm font-bold text-green-800 mb-3 flex items-center gap-2">
          <span>✅</span> {prosLabel}
        </h4>
        <ul className="space-y-2">
          {(pros ?? []).map((pro, i) => (
            <li key={i} className="flex gap-2 text-sm text-green-900">
              <span className="text-green-500 flex-shrink-0 mt-0.5">+</span>
              {pro}
            </li>
          ))}
        </ul>
      </div>

      <div className="bg-red-50 rounded-2xl p-5 border border-red-100">
        <h4 className="text-sm font-bold text-red-800 mb-3 flex items-center gap-2">
          <span>⚠️</span> {consLabel}
        </h4>
        <ul className="space-y-2">
          {(cons ?? []).map((con, i) => (
            <li key={i} className="flex gap-2 text-sm text-red-900">
              <span className="text-red-400 flex-shrink-0 mt-0.5">−</span>
              {con}
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
