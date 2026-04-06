import type {
  ArchitectureType,
  QuizResult,
  RulesEngineConfig,
  DisqualifierRule,
  TieBreakerRule,
  BrandMappingRule,
  ReasoningTemplate,
} from '@/types'
import { quizQuestions } from './questions'

// ─────────────────────────────────────────────────────────────────────────────
// RULES ENGINE CONFIG
// Edit this config to change recommendation logic — no UI changes needed.
// ─────────────────────────────────────────────────────────────────────────────

const disqualifiers: DisqualifierRule[] = [
  {
    id: 'renter-no-wiring',
    description: 'Renters who cannot run cables cannot do PoE/NVR systems',
    condition: (a) => a.tenure === 'renting' && a.power === 'no-battery-only',
    disqualifies: ['poe-nvr-system'],
  },
  {
    id: 'low-budget-many-cameras',
    description: 'Under-500 budget with 5+ cameras makes PoE/NVR impossible',
    condition: (a) => a.budget === 'under-500' && a['camera-count'] === '5-plus',
    disqualifies: ['poe-nvr-system'],
  },
  {
    id: 'no-subscription-blocks-wifi-diy',
    description: 'Refusing subscriptions makes cloud-first systems unappealing',
    condition: (a) => a.subscription === 'definitely-not',
    disqualifies: ['wifi-diy-ecosystem'],
  },
  {
    id: 'renter-no-poe',
    description: 'Renters without a professional installer should avoid PoE/NVR',
    condition: (a) => a.tenure === 'renting' && a.install !== 'professional-please',
    disqualifies: ['poe-nvr-system'],
  },
  {
    id: 'no-power-no-poe',
    description: 'Battery-only setups cannot use PoE',
    condition: (a) => a.power === 'no-battery-only',
    disqualifies: ['poe-nvr-system'],
  },
]

const tieBreakers: TieBreakerRule[] = [
  {
    id: 'prefer-local-when-privacy',
    preferredType: 'local-storage-no-sub',
    condition: (scores, a) => {
      const diff = Math.abs((scores['local-storage-no-sub'] ?? 0) - (scores['wifi-diy-ecosystem'] ?? 0))
      return diff < 8 && a.priority === 'privacy-control'
    },
  },
  {
    id: 'prefer-wifi-diy-when-ease',
    preferredType: 'wifi-diy-ecosystem',
    condition: (scores, a) => {
      const diff = Math.abs((scores['wifi-diy-ecosystem'] ?? 0) - (scores['local-storage-no-sub'] ?? 0))
      return diff < 8 && a.priority === 'ease-of-use'
    },
  },
  {
    id: 'prefer-poe-when-quality',
    preferredType: 'poe-nvr-system',
    condition: (scores, a) => {
      const diff = Math.abs((scores['poe-nvr-system'] ?? 0) - (scores['wifi-diy-ecosystem'] ?? 0))
      return diff < 8 && a.priority === 'picture-quality'
    },
  },
]

const brandMappings: BrandMappingRule[] = [
  {
    architectureType: 'wifi-diy-ecosystem',
    primaryBrandSlugs: ['ring', 'arlo'],
  },
  {
    architectureType: 'local-storage-no-sub',
    primaryBrandSlugs: ['eufy'],
  },
  {
    architectureType: 'poe-nvr-system',
    primaryBrandSlugs: [],
  },
  {
    architectureType: 'battery-solar',
    primaryBrandSlugs: ['arlo', 'eufy'],
  },
  {
    architectureType: 'hybrid',
    primaryBrandSlugs: ['eufy', 'ring'],
  },
]

const reasoningTemplates: Record<ArchitectureType, ReasoningTemplate> = {
  'wifi-diy-ecosystem': {
    headline: 'A Wi-Fi DIY ecosystem suits you best',
    bullets: [
      'Quick to set up — most cameras install in under 30 minutes',
      'Strong app experience with reliable alerts',
      'Works well for 1–4 cameras without complex wiring',
      'Small monthly subscription unlocks cloud history and AI detection',
      'Great for renters and homeowners alike',
    ],
  },
  'local-storage-no-sub': {
    headline: 'A local-storage, no-subscription system is your match',
    bullets: [
      'No monthly fees — ever. You pay once for hardware',
      'Footage stays on your device, not a cloud server',
      'Eufy HomeBase stores up to 16GB locally (expandable)',
      'Solid AI detection included at no extra cost',
      "You own your footage — privacy is in your control",
    ],
  },
  'poe-nvr-system': {
    headline: 'A wired PoE / NVR system is the right fit',
    bullets: [
      'Best-in-class reliability — cameras are always online',
      '24/7 continuous recording with no buffering or missed starts',
      'No Wi-Fi dependency means no dropouts',
      'Best evidence-quality footage for driveways and entry points',
      'Scales easily to 8–16 cameras without extra subscriptions',
    ],
    warningIfAny:
      '⚠️ A PoE system usually requires professional installation. Get Secure can handle the full install for you.',
  },
  'battery-solar': {
    headline: 'A battery or solar camera setup is ideal for you',
    bullets: [
      'No wiring needed — place cameras wherever you need them',
      "Perfect for renters and locations where running cables isn't possible",
      'Solar panels can make some locations maintenance-free',
      'Good for low-traffic spots where batteries last months',
      'Easy to remove and take with you if you move',
    ],
    warningIfAny:
      '⚠️ Note: battery cameras can miss the first 1–2 seconds of motion. For driveways or evidence capture, wired is more reliable.',
  },
  hybrid: {
    headline: 'A hybrid system (wired + wireless) gives you the best of both',
    bullets: [
      'Wired cameras for key entry points with 24/7 reliability',
      'Battery cameras for hard-to-reach spots',
      'Mix and match based on what each location needs',
      'Local storage option keeps costs predictable',
      'Can be expanded incrementally as your needs grow',
    ],
  },
}

export const rulesEngineConfig: RulesEngineConfig = {
  disqualifiers,
  tieBreakers,
  brandMappings,
  reasoningTemplates,
}

// ─── Pure compute function ────────────────────────────────────────────────────

export function computeResult(
  answers: Record<string, string | string[]>,
  config: RulesEngineConfig = rulesEngineConfig
): QuizResult {
  // Step 1: Accumulate scores from all answers
  const scores: Record<ArchitectureType, number> = {
    'wifi-diy-ecosystem': 0,
    'local-storage-no-sub': 0,
    'poe-nvr-system': 0,
    'battery-solar': 0,
    hybrid: 0,
  }

  for (const question of quizQuestions) {
    const selected = answers[question.id]
    if (!selected) continue

    const selectedIds = Array.isArray(selected) ? selected : [selected]
    for (const answerId of selectedIds) {
      const option = question.answers.find((a) => a.id === answerId)
      if (!option) continue
      for (const [arch, weight] of Object.entries(option.scores)) {
        scores[arch as ArchitectureType] += weight ?? 0
      }
    }
  }

  // Step 2: Apply hard disqualifiers
  const disqualified = new Set<ArchitectureType>()
  for (const rule of config.disqualifiers) {
    if (rule.condition(answers)) {
      for (const arch of rule.disqualifies) {
        disqualified.add(arch)
      }
    }
  }

  // Step 3: Find top two eligible architectures
  const eligible = (Object.keys(scores) as ArchitectureType[]).filter(
    (arch) => !disqualified.has(arch)
  )

  eligible.sort((a, b) => scores[b] - scores[a])

  let primary = eligible[0] ?? 'wifi-diy-ecosystem'
  let alternative: ArchitectureType | null = eligible[1] ?? null

  // Step 4: Apply tie-breakers
  for (const rule of config.tieBreakers) {
    if (rule.condition(scores, answers)) {
      primary = rule.preferredType
      break
    }
  }

  // Step 5: Map to brands
  const brandMapping = config.brandMappings.find((m) => m.architectureType === primary)
  const recommendedBrandSlugs = brandMapping?.primaryBrandSlugs ?? []

  // Step 6: Build reasoning from template
  const template = config.reasoningTemplates[primary]
  const reasoning = template?.bullets ?? []
  const warningMessage = template?.warningIfAny

  // Step 7: Build CTA
  const ctaHrefMap: Record<ArchitectureType, string> = {
    'wifi-diy-ecosystem': '/brands/ring',
    'local-storage-no-sub': '/brands/eufy',
    'poe-nvr-system': '/?quote=open',
    'battery-solar': '/brands/arlo',
    hybrid: '/brands/eufy',
  }

  const ctaLabelMap: Record<ArchitectureType, string> = {
    'wifi-diy-ecosystem': 'Explore Ring & Arlo',
    'local-storage-no-sub': 'Explore Eufy',
    'poe-nvr-system': 'Get a professional quote',
    'battery-solar': 'Explore Arlo & Eufy',
    hybrid: 'Explore hybrid options',
  }

  return {
    primaryRecommendation: primary,
    alternativeRecommendation: alternative,
    scores,
    recommendedBrandSlugs,
    reasoning,
    warningMessage,
    ctaLabel: ctaLabelMap[primary],
    ctaHref: ctaHrefMap[primary],
  }
}

// ─── Architecture display helpers ─────────────────────────────────────────────

export const architectureLabels: Record<ArchitectureType, string> = {
  'wifi-diy-ecosystem': 'Wi-Fi DIY Ecosystem',
  'local-storage-no-sub': 'Local Storage (No Subscription)',
  'poe-nvr-system': 'Wired PoE / NVR System',
  'battery-solar': 'Battery & Solar',
  hybrid: 'Hybrid System',
}

export const architectureDescriptions: Record<ArchitectureType, string> = {
  'wifi-diy-ecosystem':
    'Cloud-connected cameras (Ring, Arlo) with a monthly subscription for history and AI. Easy to set up, great app, good for 1–4 cameras.',
  'local-storage-no-sub':
    'Cameras that store footage locally on a hub or SD card — no cloud, no monthly fees. Eufy is the main example.',
  'poe-nvr-system':
    'Wired cameras connected via ethernet cable to a central NVR recorder. Best reliability, 24/7 recording, professional-grade.',
  'battery-solar':
    'Wireless cameras powered by battery or solar panel. No wiring needed. Best for renters or hard-to-reach spots.',
  hybrid:
    'A mix of wired and wireless cameras. Wired for key entry points, battery for the rest.',
}

export const architectureUprfontRange: Record<ArchitectureType, string> = {
  'wifi-diy-ecosystem': 'NZ$200–$600',
  'local-storage-no-sub': 'NZ$400–$900',
  'poe-nvr-system': 'NZ$1,200–$3,000+',
  'battery-solar': 'NZ$200–$700',
  hybrid: 'NZ$600–$1,800',
}

export const architectureYear3Range: Record<ArchitectureType, string> = {
  'wifi-diy-ecosystem': 'NZ$550–$1,200 (incl. subscription)',
  'local-storage-no-sub': 'NZ$400–$1,000 (no subscription)',
  'poe-nvr-system': 'NZ$1,200–$3,500+ (no subscription after install)',
  'battery-solar': 'NZ$200–$900 (battery replacements only)',
  hybrid: 'NZ$600–$2,000',
}
