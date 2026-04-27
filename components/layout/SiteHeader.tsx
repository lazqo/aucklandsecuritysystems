import Link from 'next/link'
import { Button } from '@/components/ui/Button'
import { Camera } from '@phosphor-icons/react/dist/ssr'
import { GET_SECURE } from '@/lib/business/get-secure'
import { TrackedLink } from '@/components/analytics/TrackedLink'

interface SiteHeaderProps {
  variant?: 'minimal' | 'full'
}

export function SiteHeader({ variant = 'minimal' }: SiteHeaderProps) {
  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-sm border-b border-neutral-100">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="w-8 h-8 bg-brand-600 rounded-lg flex items-center justify-center">
              <Camera size={18} weight="fill" className="text-white" />
            </div>
            <div className="leading-none">
              <span className="text-sm font-bold text-brand-600 group-hover:text-brand-700 transition-colors">
                Get Secure
              </span>
              <span className="hidden sm:inline text-xs text-neutral-400 ml-1">NZ</span>
            </div>
          </Link>

          {/* Nav links (full variant) */}
          {variant === 'full' && (
            <nav className="hidden md:flex items-center gap-6">
              <Link
                href="/guides"
                className="text-sm text-neutral-500 hover:text-accent-500 font-medium transition-colors"
              >
                Guides
              </Link>
              <Link
                href="/compare"
                className="text-sm text-neutral-500 hover:text-accent-500 font-medium transition-colors"
              >
                Compare brands
              </Link>
              <Link
                href="/calculator"
                className="text-sm text-neutral-500 hover:text-accent-500 font-medium transition-colors"
              >
                Cost calculator
              </Link>
            </nav>
          )}

          {/* CTA */}
          <div className="flex items-center gap-3">
            <TrackedLink
              href={GET_SECURE.phoneHref}
              location="header"
              kind="phone"
              className="hidden lg:inline-flex text-sm font-semibold text-brand-600 hover:text-accent-500 transition-colors"
            >
              {GET_SECURE.phoneDisplay}
            </TrackedLink>
            <Link
              href="/quiz"
              className="hidden sm:inline-flex text-sm font-medium text-brand-500 hover:text-accent-500 transition-colors"
            >
              Take the quiz
            </Link>
            <Button href="/?quote=open" variant="primary" size="sm">
              Get a quote
            </Button>
          </div>
        </div>
      </div>
    </header>
  )
}
