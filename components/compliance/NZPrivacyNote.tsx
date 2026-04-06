import { cn } from '@/lib/utils'

interface NZPrivacyNoteProps {
  compact?: boolean
  className?: string
}

export function NZPrivacyNote({ compact = false, className }: NZPrivacyNoteProps) {
  if (compact) {
    return (
      <p className={cn('text-xs text-neutral-500', className)}>
        🔒 <strong>NZ privacy note:</strong> Home security cameras can film neighbours or public areas
        — use signage and avoid unnecessary audio recording. Handle footage responsibly.{' '}
        <a
          href="https://www.privacy.org.nz/tools/privacy-in-the-workplace/cctv/"
          target="_blank"
          rel="noopener noreferrer"
          className="underline hover:text-neutral-700"
        >
          Learn more
        </a>
      </p>
    )
  }

  return (
    <aside
      className={cn(
        'rounded-2xl bg-neutral-50 border border-neutral-200 p-5 space-y-3',
        className
      )}
      aria-label="New Zealand privacy guidance"
    >
      <div className="flex items-center gap-2">
        <span className="text-lg" aria-hidden="true">🔒</span>
        <h3 className="font-semibold text-neutral-800 text-sm">A quick note on NZ privacy</h3>
      </div>
      <ul className="space-y-2 text-sm text-neutral-700">
        <li className="flex gap-2">
          <span className="text-neutral-400 flex-shrink-0 mt-0.5">•</span>
          <span>
            <strong>Think about what your camera can see.</strong> If it captures a neighbour&apos;s
            property or a shared driveway, that can raise privacy issues under the NZ Privacy Act 2020.
          </span>
        </li>
        <li className="flex gap-2">
          <span className="text-neutral-400 flex-shrink-0 mt-0.5">•</span>
          <span>
            <strong>Use a sign.</strong> A simple &ldquo;CCTV in operation&rdquo; notice near cameras is good
            practice and puts visitors on reasonable notice.
          </span>
        </li>
        <li className="flex gap-2">
          <span className="text-neutral-400 flex-shrink-0 mt-0.5">•</span>
          <span>
            <strong>Avoid recording audio unless you really need it.</strong> Audio recording has stricter
            rules than video in New Zealand.
          </span>
        </li>
        <li className="flex gap-2">
          <span className="text-neutral-400 flex-shrink-0 mt-0.5">•</span>
          <span>
            <strong>Handle footage carefully.</strong> Don&apos;t share footage of others without good
            reason, and delete old footage you no longer need.
          </span>
        </li>
      </ul>
      <p className="text-xs text-neutral-500">
        This is general guidance, not legal advice. For more information, visit{' '}
        <a
          href="https://www.privacy.org.nz"
          target="_blank"
          rel="noopener noreferrer"
          className="underline hover:text-neutral-700"
        >
          privacy.org.nz
        </a>
        .
      </p>
    </aside>
  )
}
