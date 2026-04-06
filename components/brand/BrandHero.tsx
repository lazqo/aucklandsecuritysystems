import type { Brand } from '@/types'
import { Badge } from '@/components/ui/Badge'
import { formatDate } from '@/lib/utils'
import { Button } from '@/components/ui/Button'

interface BrandHeroProps {
  brand: Brand
}

const availabilityBadge: Record<Brand['nzAvailability'], { label: string; variant: 'green' | 'amber' | 'neutral' }> = {
  'widely-available': { label: 'Widely available in NZ', variant: 'green' },
  'online-only': { label: 'Online only in NZ', variant: 'amber' },
  'limited': { label: 'Limited NZ availability', variant: 'neutral' },
}

export function BrandHero({ brand }: BrandHeroProps) {
  const avail = availabilityBadge[brand.nzAvailability]

  return (
    <div className="bg-gradient-to-b from-neutral-50 to-white py-10 border-b border-neutral-100">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <div className="flex flex-col sm:flex-row sm:items-start gap-5">
          {/* Brand icon placeholder */}
          <div className="w-16 h-16 bg-neutral-100 rounded-2xl flex items-center justify-center flex-shrink-0 text-2xl font-bold text-neutral-400 border border-neutral-200">
            {brand.name.charAt(0)}
          </div>

          <div className="flex-1">
            <div className="flex flex-wrap gap-2 mb-2">
              <Badge variant={avail.variant}>{avail.label}</Badge>
              {!brand.subscriptionRequired && (
                <Badge variant="green">No subscription required</Badge>
              )}
              {brand.rentalFriendly && (
                <Badge variant="blue">Renter-friendly</Badge>
              )}
            </div>

            <h1 className="text-3xl sm:text-4xl font-bold text-neutral-900 mb-2">
              {brand.name} Security Cameras
            </h1>
            <p className="text-neutral-600 mb-1">{brand.tagline}</p>
            <p className="text-xs text-neutral-400">
              Reviewed: {formatDate(brand.lastReviewedDate)} · {brand.country}
            </p>
          </div>

          <div className="flex flex-col gap-2 sm:flex-shrink-0">
            <Button href="/?quote=open" size="md">
              Get a {brand.name} quote
            </Button>
            {brand.nzRetailers.length > 0 && (
              <p className="text-xs text-neutral-400 text-center">
                Available at {brand.nzRetailers.slice(0, 2).join(', ')}
                {brand.nzRetailers.length > 2 && ' + more'}
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
