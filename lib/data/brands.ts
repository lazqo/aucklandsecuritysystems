import type { Brand } from '@/types'

export const brands: Brand[] = [
  {
    slug: 'ring',
    name: 'Ring',
    tagline: 'Easy setup, Amazon ecosystem, subscription-dependent full features',
    logoSrc: '/images/brands/ring.svg',
    country: 'USA (Amazon)',
    nzAvailability: 'widely-available',
    nzRetailers: ['PB Tech', 'JB Hi-Fi', 'Harvey Norman', 'Noel Leeming'],
    architectureType: 'wifi-diy-ecosystem',
    storageType: ['cloud', 'local'],
    subscriptionRequired: false,
    offlineCapable: false,
    rentalFriendly: true,
    professionalInstallRequired: false,
    summary:
      "Ring is Amazon's DIY security brand — widely available in NZ and dead-simple to set up. The app is polished, the hardware is reliable, and the ecosystem is huge. The catch: you only get 60 days of cloud history on paid plans, and the free tier is very limited. If you're happy with a small monthly fee for peace of mind, Ring is one of the easiest paths to a working camera system.",
    pros: [
      'Extremely easy setup — most cameras install in under 30 minutes',
      'Widely available at major NZ retailers',
      'Strong Amazon Alexa integration',
      'Reliable motion alerts with solid app',
      'Good range of cameras for every use case',
      'Professional monitoring available (Ring Alarm)',
    ],
    cons: [
      'Best features locked behind Ring Protect subscription',
      'No meaningful local storage on most cameras',
      'Cloud-only footage means ongoing cost forever',
      'Privacy concerns — Amazon holds your footage',
      'Battery cameras can miss first 1–2 seconds of motion',
    ],
    expertVerdict:
      'Ring is the right choice if you want the easiest possible setup, a great app, and are comfortable paying ~NZ$5–10/month per location for cloud history. Renters and first-time buyers will find it hard to beat for simplicity.',
    bestFor: [
      'First-time buyers wanting a simple setup',
      'Renters needing removable cameras',
      'Amazon/Alexa smart home users',
      '1–3 camera setups',
      'Front door + driveway coverage',
    ],
    notIdealFor: [
      'Privacy-focused buyers who want footage off the cloud',
      'Large properties needing 5+ cameras',
      'Anyone who refuses a monthly subscription',
      'Full-time continuous recording',
    ],
    lastReviewedDate: '2026-04-01',
  },
  {
    slug: 'arlo',
    name: 'Arlo',
    tagline: 'Premium battery-powered cameras with strong AI and optional subscription',
    logoSrc: '/images/brands/arlo.svg',
    country: 'USA',
    nzAvailability: 'widely-available',
    nzRetailers: ['PB Tech', 'JB Hi-Fi', 'Harvey Norman', 'Noel Leeming'],
    architectureType: 'wifi-diy-ecosystem',
    storageType: ['cloud', 'local'],
    subscriptionRequired: false,
    offlineCapable: true,
    rentalFriendly: true,
    professionalInstallRequired: false,
    summary:
      "Arlo makes some of the best battery-powered security cameras on the market. The video quality is excellent, the AI detection is genuinely smart, and the cameras last months on a single charge. Arlo Essential cameras work without a subscription (30 days of free cloud history included), while Arlo Pro models unlock more with Arlo Secure plans. A solid choice for buyers who want cable-free flexibility without going full Ring.",
    pros: [
      'Excellent video quality — up to 4K on Pro models',
      'Strong AI: person, vehicle, animal detection',
      '30 days free cloud storage included (Essential cameras)',
      'Long battery life — months between charges',
      'Works without subscription at a basic level',
      'Local storage via SmartHub (sold separately)',
    ],
    cons: [
      'Premium pricing for hardware',
      'SmartHub required for local storage — extra upfront cost',
      'Best AI features require Arlo Secure subscription',
      'NZ pricing can be significantly higher than US RRP',
      'Battery cameras still miss first 1–2 seconds of motion',
    ],
    expertVerdict:
      "Arlo is the best choice if you want top-tier battery cameras and don't mind spending more upfront. The Arlo Essential tier gives you a functional system without subscription. Buyers wanting local storage should budget for the SmartHub.",
    bestFor: [
      'Premium buyers wanting the best battery camera quality',
      'People wanting some free cloud without a subscription',
      'Locations where running cables is impossible',
      'Solar panel pairings for off-grid spots',
      'Renters in apartments or townhouses',
    ],
    notIdealFor: [
      'Budget-conscious buyers',
      'Full-time 24/7 continuous recording',
      'High-traffic zones (drains battery faster)',
      'Anyone wanting everything local with no cloud',
    ],
    lastReviewedDate: '2026-04-01',
  },
  {
    slug: 'eufy',
    name: 'Eufy',
    tagline: 'No monthly fees, local storage, strong privacy — but some compromises',
    logoSrc: '/images/brands/eufy.svg',
    country: 'China (Anker)',
    nzAvailability: 'online-only',
    nzRetailers: ['PB Tech', 'Amazon NZ', 'Eufy Direct'],
    architectureType: 'local-storage-no-sub',
    storageType: ['local', 'cloud', 'sd-card'],
    subscriptionRequired: false,
    offlineCapable: true,
    rentalFriendly: true,
    professionalInstallRequired: false,
    summary:
      "Eufy's pitch is simple: decent cameras, zero monthly fees, footage stored locally. The HomeBase hub stores up to 16GB of video locally with no ongoing costs. That's compelling for privacy-focused buyers or anyone sick of subscription creep. The tradeoff: Eufy had well-publicised privacy incidents in 2022-2023, and their cloud features lag behind Ring and Arlo. For buyers who want local-first storage and don't need enterprise-grade AI, Eufy delivers strong value.",
    pros: [
      'No monthly subscription required',
      'Local storage via HomeBase or SD card',
      'Footage stays on your device, not a cloud server',
      'Competitive hardware pricing',
      'Good range of cameras (doorbell, floodlight, outdoor)',
      'Works as a standalone system without internet',
    ],
    cons: [
      'Had documented privacy/security incidents (2022–2023)',
      'AI detection less sophisticated than Ring or Arlo',
      'App is less polished than Ring or Arlo',
      'HomeBase required for full local storage functionality',
      'Limited smart home ecosystem vs Ring/Arlo',
      'Less NZ retail presence — mainly online purchases',
    ],
    expertVerdict:
      "Eufy is the best no-subscription option for homeowners who want footage stored locally. The privacy incidents are worth knowing about, and Eufy has made changes since. If zero monthly fees and local storage are your top priorities, Eufy is hard to beat at this price point.",
    bestFor: [
      'Privacy-focused buyers who want footage off the cloud',
      'Anyone who refuses monthly subscriptions',
      'Budget-conscious buyers wanting capable cameras',
      '2–4 camera home setups',
      'Homeowners (not renters) wanting a more permanent setup',
    ],
    notIdealFor: [
      'Buyers who need cutting-edge AI detection',
      'Smart home users heavily invested in Alexa/Google Home',
      'Anyone needing professional monitoring',
      'Large properties needing 8+ cameras',
    ],
    lastReviewedDate: '2026-04-01',
  },
]

export function getBrandBySlug(slug: string): Brand | undefined {
  return brands.find((b) => b.slug === slug)
}

export function getBrandsByArchitecture(type: string): Brand[] {
  return brands.filter((b) => b.architectureType === type)
}
