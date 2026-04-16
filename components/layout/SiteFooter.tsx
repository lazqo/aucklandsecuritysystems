import Link from 'next/link'
import { Camera } from '@phosphor-icons/react/dist/ssr'

export function SiteFooter() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-brand-600 text-brand-200 mt-auto">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-10">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <div className="w-7 h-7 bg-accent-400 rounded-lg flex items-center justify-center">
                <Camera size={16} weight="fill" className="text-white" />
              </div>
              <span className="text-sm font-bold text-white">Get Secure NZ</span>
            </div>
            <p className="text-xs leading-relaxed text-brand-300">
              New Zealand&apos;s home security camera guide. Independent advice, no affiliate pressure.
            </p>
          </div>

          {/* Tools */}
          <div>
            <p className="text-xs font-semibold text-accent-300 uppercase tracking-wider mb-3">Tools</p>
            <ul className="space-y-2">
              {[
                { label: 'Camera chooser quiz', href: '/quiz' },
                { label: 'TCO calculator', href: '/calculator' },
                { label: 'Compare brands', href: '/compare' },
              ].map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="text-xs hover:text-white transition-colors">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Guides */}
          <div>
            <p className="text-xs font-semibold text-accent-300 uppercase tracking-wider mb-3">Guides</p>
            <ul className="space-y-2">
              {[
                { label: 'Cloud vs local storage', href: '/guides/cloud-vs-local-storage' },
                { label: 'Wired vs wireless', href: '/guides/wired-vs-wireless-security-cameras' },
                { label: 'No-subscription cameras', href: '/guides/no-subscription-security-cameras' },
                { label: 'All guides', href: '/guides' },
              ].map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="text-xs hover:text-white transition-colors">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Brands */}
          <div>
            <p className="text-xs font-semibold text-accent-300 uppercase tracking-wider mb-3">Brands</p>
            <ul className="space-y-2">
              {[
                { label: 'Ring review', href: '/brands/ring' },
                { label: 'Arlo review', href: '/brands/arlo' },
                { label: 'Eufy review', href: '/brands/eufy' },
                { label: 'Ring vs Arlo', href: '/compare/ring-vs-arlo' },
                { label: 'Eufy vs Ring', href: '/compare/eufy-vs-ring' },
              ].map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="text-xs hover:text-white transition-colors">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-brand-500 pt-8 space-y-3">
          <div className="flex flex-wrap gap-4 mb-2">
            <Link href="/about" className="text-xs text-brand-300 hover:text-white transition-colors">About this site</Link>
            <Link href="/guides/security-camera-laws-nz" className="text-xs text-brand-300 hover:text-white transition-colors">NZ privacy law guide</Link>
          </div>
          <p className="text-xs text-brand-300">
            <strong className="text-brand-100">Editorial independence:</strong> Get Secure NZ writes
            independent editorial content. Some pages may include links to retailers. Prices shown are
            estimates — verify with retailers before purchasing. Subscription plans change frequently;
            always check the brand directly for current NZ pricing.
          </p>
          <p className="text-xs text-brand-400">
            © {currentYear} Get Secure Ltd. New Zealand. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
