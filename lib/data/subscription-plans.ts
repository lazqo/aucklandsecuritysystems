import type { SubscriptionPlan } from '@/types'

// ─────────────────────────────────────────────────────────────────────────────
// IMPORTANT: Update pricing data here when plans change.
// Always update lastVerifiedDate and sourceUrl when editing any row.
// NZ pricing is estimated — verify directly with each brand before publishing.
// ─────────────────────────────────────────────────────────────────────────────

export const subscriptionPlans: SubscriptionPlan[] = [
  // ─── Ring ──────────────────────────────────────────────────────────────────
  {
    id: 'ring-free',
    brandSlug: 'ring',
    planName: 'Ring Free (No Plan)',
    isFree: true,
    priceNZDMonthly: 0,
    priceNZDYearly: 0,
    cameras: 'unlimited',
    videoHistory: 'Live view only — no recording',
    cloudStorage: false,
    localBackup: false,
    aiDetection: false,
    professionalMonitoring: false,
    features: ['Live view', 'Real-time motion alerts', 'Two-way talk'],
    notes:
      'Without a plan, Ring cameras do not record or store footage. You can view live video but nothing is saved. This tier is very limited for real-world security use.',
    lastVerifiedDate: '2026-04-01',
    sourceUrl: 'https://ring.com/pages/protect-plans',
  },
  {
    id: 'ring-protect-basic',
    brandSlug: 'ring',
    planName: 'Ring Protect Basic',
    isFree: false,
    priceNZDMonthly: 5,
    priceNZDYearly: 50,
    cameras: 1,
    videoHistory: '180 days',
    cloudStorage: true,
    localBackup: false,
    aiDetection: true,
    professionalMonitoring: false,
    features: [
      '180-day cloud video history',
      'Video sharing and downloading',
      'Rich notifications with video preview',
      'Person, motion, and package detection',
      'Covers 1 device only',
    ],
    notes:
      'Ring Protect Basic covers a single device. NZ pricing estimated at ~NZ$5/month. Ideal for a single doorbell or camera. Subscribe per device if you need more coverage.',
    lastVerifiedDate: '2026-04-01',
    sourceUrl: 'https://ring.com/pages/protect-plans',
  },
  {
    id: 'ring-protect-plus',
    brandSlug: 'ring',
    planName: 'Ring Protect Plus',
    isFree: false,
    priceNZDMonthly: 12,
    priceNZDYearly: 120,
    cameras: 'unlimited',
    videoHistory: '180 days',
    cloudStorage: true,
    localBackup: false,
    aiDetection: true,
    professionalMonitoring: false,
    features: [
      '180-day cloud video history for all devices at one address',
      'Unlimited cameras at one location',
      'Video sharing and downloading',
      'Person, motion, vehicle, and package detection',
      'Warranty extension on Ring devices',
    ],
    notes:
      'Ring Protect Plus covers all Ring cameras at one address. This is the most cost-effective Ring plan for multi-camera setups. NZ pricing estimated ~NZ$12/month. Note: Ring has changed plan names over time — verify current plan names before quoting.',
    lastVerifiedDate: '2026-04-01',
    sourceUrl: 'https://ring.com/pages/protect-plans',
  },
  {
    id: 'ring-protect-pro',
    brandSlug: 'ring',
    planName: 'Ring Protect Pro',
    isFree: false,
    priceNZDMonthly: 22,
    priceNZDYearly: 220,
    cameras: 'unlimited',
    videoHistory: '180 days',
    cloudStorage: true,
    localBackup: true,
    aiDetection: true,
    professionalMonitoring: true,
    features: [
      'Everything in Protect Plus',
      '24/7 professional monitoring via Ring Alarm',
      'Backup internet during outages (requires Ring Alarm Pro)',
      'Local backup storage option',
      'Priority customer support',
    ],
    notes:
      'Ring Protect Pro is bundled with Ring Alarm Pro hardware. Professional monitoring requires Ring Alarm system. NZ pricing estimated — verify before publishing.',
    lastVerifiedDate: '2026-04-01',
    sourceUrl: 'https://ring.com/pages/protect-plans',
  },

  // ─── Arlo ──────────────────────────────────────────────────────────────────
  {
    id: 'arlo-free',
    brandSlug: 'arlo',
    planName: 'Arlo Free (No Subscription)',
    isFree: true,
    priceNZDMonthly: 0,
    priceNZDYearly: 0,
    cameras: 5,
    videoHistory: '30 days',
    cloudStorage: true,
    localBackup: false,
    aiDetection: false,
    professionalMonitoring: false,
    features: [
      '30 days free cloud video history (up to 5 cameras)',
      'Activity zones',
      'Basic motion and sound alerts',
    ],
    notes:
      'Arlo Essential cameras include 30 days of free cloud storage at no cost — this is a genuine differentiator vs Ring. Basic motion alerts only; no AI person/vehicle detection without Arlo Secure.',
    lastVerifiedDate: '2026-04-01',
    sourceUrl: 'https://www.arlo.com/en-us/plans',
  },
  {
    id: 'arlo-secure',
    brandSlug: 'arlo',
    planName: 'Arlo Secure',
    isFree: false,
    priceNZDMonthly: 10,
    priceNZDYearly: 100,
    cameras: 1,
    videoHistory: '30 days',
    cloudStorage: true,
    localBackup: false,
    aiDetection: true,
    professionalMonitoring: false,
    features: [
      '30-day cloud history (1 camera)',
      'AI person, vehicle, animal, package detection',
      'Activity zones',
      'E911 emergency calling',
      'Theft replacement',
    ],
    notes:
      'Arlo Secure covers a single camera. NZ pricing estimated ~NZ$10/month. Multi-camera subscribers should consider Arlo Secure Plus.',
    lastVerifiedDate: '2026-04-01',
    sourceUrl: 'https://www.arlo.com/en-us/plans',
  },
  {
    id: 'arlo-secure-plus',
    brandSlug: 'arlo',
    planName: 'Arlo Secure Plus',
    isFree: false,
    priceNZDMonthly: 18,
    priceNZDYearly: 180,
    cameras: 'unlimited',
    videoHistory: '30 days',
    cloudStorage: true,
    localBackup: false,
    aiDetection: true,
    professionalMonitoring: false,
    features: [
      'All Arlo Secure features',
      'Unlimited cameras at one location',
      '30-day cloud history for all cameras',
      'AI detection on all cameras',
    ],
    notes: 'Best value Arlo plan for 3+ camera setups. NZ pricing estimated.',
    lastVerifiedDate: '2026-04-01',
    sourceUrl: 'https://www.arlo.com/en-us/plans',
  },

  // ─── Eufy ──────────────────────────────────────────────────────────────────
  {
    id: 'eufy-no-subscription',
    brandSlug: 'eufy',
    planName: 'No Subscription Required',
    isFree: true,
    priceNZDMonthly: 0,
    priceNZDYearly: 0,
    cameras: 'unlimited',
    videoHistory: 'Up to 16GB local (HomeBase)',
    cloudStorage: false,
    localBackup: true,
    aiDetection: true,
    professionalMonitoring: false,
    features: [
      'Local storage via HomeBase hub (up to 16GB included)',
      'AI person and motion detection',
      'No monthly fees ever',
      'Footage stays on your device',
      'Works without internet after initial setup',
    ],
    notes:
      'Eufy cameras store footage locally on the HomeBase hub at no ongoing cost. The HomeBase device has an upfront cost (~NZ$150–200) but no subscription. This is the core appeal of the Eufy ecosystem. SD card recording available on some models.',
    lastVerifiedDate: '2026-04-01',
    sourceUrl: 'https://www.eufy.com/pages/eufy-security-plans',
  },
  {
    id: 'eufy-cloud-storage-plus',
    brandSlug: 'eufy',
    planName: 'Eufy Cloud Storage Plus (Optional)',
    isFree: false,
    priceNZDMonthly: 4,
    priceNZDYearly: 40,
    cameras: 1,
    videoHistory: '30 days cloud',
    cloudStorage: true,
    localBackup: true,
    aiDetection: true,
    professionalMonitoring: false,
    features: [
      '30-day cloud backup (one camera)',
      'Cloud + local hybrid storage',
      'End-to-end encryption for cloud clips',
    ],
    notes:
      'Optional cloud backup for Eufy cameras. Most Eufy buyers use local storage only. This plan is available if cloud redundancy is wanted. NZ pricing estimated.',
    lastVerifiedDate: '2026-04-01',
    sourceUrl: 'https://www.eufy.com/pages/eufy-security-plans',
  },
]

export function getPlansByBrand(brandSlug: string): SubscriptionPlan[] {
  return subscriptionPlans.filter((p) => p.brandSlug === brandSlug)
}

export function getPlanById(id: string): SubscriptionPlan | undefined {
  return subscriptionPlans.find((p) => p.id === id)
}
