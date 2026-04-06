// ─── Architecture Types ────────────────────────────────────────────────────────
export type ArchitectureType =
  | 'wifi-diy-ecosystem'
  | 'local-storage-no-sub'
  | 'poe-nvr-system'
  | 'battery-solar'
  | 'hybrid'

export type StorageType = 'cloud' | 'local' | 'sd-card' | 'nvr'
export type ConnectionType = 'wifi' | 'poe' | 'cellular' | 'wired'
export type PowerSource = 'mains' | 'battery' | 'solar' | 'poe'

export type NZRegion =
  | 'auckland' | 'wellington' | 'canterbury' | 'waikato'
  | 'bay-of-plenty' | 'otago' | 'manawatu-wanganui' | 'hawkes-bay'
  | 'northland' | 'tasman' | 'nelson' | 'marlborough'
  | 'southland' | 'gisborne' | 'westcoast' | 'taranaki' | 'other'

// ─── Brand ────────────────────────────────────────────────────────────────────
export interface Brand {
  slug: string
  name: string
  tagline: string
  logoSrc: string
  heroImageSrc?: string
  country: string
  nzAvailability: 'widely-available' | 'online-only' | 'limited'
  nzRetailers: string[]
  architectureType: ArchitectureType
  storageType: StorageType[]
  subscriptionRequired: boolean
  offlineCapable: boolean
  rentalFriendly: boolean
  professionalInstallRequired: boolean
  summary: string
  pros: string[]
  cons: string[]
  expertVerdict: string
  bestFor: string[]
  notIdealFor: string[]
  lastReviewedDate: string // 'YYYY-MM-DD'
  affiliateDisclosure?: string
}

// ─── Subscription Plan ────────────────────────────────────────────────────────
export interface SubscriptionPlan {
  id: string
  brandSlug: string
  planName: string
  isFree: boolean
  priceNZDMonthly: number | null
  priceNZDYearly: number | null
  cameras: number | 'unlimited'
  videoHistory: string
  cloudStorage: boolean
  localBackup: boolean
  aiDetection: boolean
  professionalMonitoring: boolean
  features: string[]
  notes: string
  lastVerifiedDate: string
  sourceUrl: string
}

// ─── Product Line ─────────────────────────────────────────────────────────────
export interface AffiliateLink {
  retailer: string
  url: string
  priceNZD?: number
}

export interface ProductLine {
  id: string
  brandSlug: string
  name: string
  imageSrc?: string
  priceNZDRRP: number | null
  connection: ConnectionType[]
  resolution: '1080p' | '2K' | '4K' | 'other'
  powerSource: PowerSource[]
  outdoorRated: boolean
  nightVision: boolean
  twoWayAudio: boolean
  localStorageSlot: boolean
  subscriptionFreeCapable: boolean
  nzRetailers: string[]
  affiliateLinks: AffiliateLink[]
  notes: string
}

// ─── NZ Retailer ──────────────────────────────────────────────────────────────
export interface NZRetailer {
  id: string
  name: string
  url: string
  logoSrc?: string
}

// ─── FAQ ──────────────────────────────────────────────────────────────────────
export interface FAQ {
  question: string
  answer: string
}

// ─── Related Link ─────────────────────────────────────────────────────────────
export interface RelatedLink {
  slug: string
  type: 'guide' | 'scenario' | 'brand' | 'compare'
  label?: string
}

// ─── MDX Frontmatter Base ─────────────────────────────────────────────────────
export interface MDXFrontmatterBase {
  title: string
  metaTitle: string
  metaDescription: string
  publishedDate: string
  lastUpdatedDate: string
  author: string
  canonicalUrl?: string
  ogImageSrc?: string
  noIndex?: boolean
}

export interface GuideFrontmatter extends MDXFrontmatterBase {
  type: 'guide'
  slug: string
  excerpt: string
  readingTimeMinutes: number
  faqs: FAQ[]
  relatedSlugs: RelatedLink[]
  tags: string[]
}

export interface ScenarioFrontmatter extends MDXFrontmatterBase {
  type: 'scenario'
  slug: string
  excerpt: string
  targetProfile: string
  primaryRecommendationSlug: string
  alternativeSlug?: string
  keyRequirements: string[]
  faqs: FAQ[]
  relatedSlugs: RelatedLink[]
}

export interface BrandFrontmatter extends MDXFrontmatterBase {
  type: 'brand'
  slug: string
  brandSlug: string
  excerpt: string
  faqs: FAQ[]
  relatedSlugs: RelatedLink[]
}

export interface ComparisonFrontmatter extends MDXFrontmatterBase {
  type: 'comparison'
  slug: string
  brandSlugA: string
  brandSlugB: string
  excerpt: string
  verdict: string
  faqs: FAQ[]
  relatedSlugs: RelatedLink[]
}

// ─── Quiz ─────────────────────────────────────────────────────────────────────
export interface QuizAnswerOption {
  id: string
  label: string
  icon?: string
  helpText?: string
  scores: Partial<Record<ArchitectureType, number>>
}

export interface QuizQuestion {
  id: string
  step: number
  question: string
  helpText?: string
  inputType: 'single' | 'multi'
  answers: QuizAnswerOption[]
}

export interface QuizState {
  currentStep: number
  answers: Record<string, string | string[]>
  phase: 'questions' | 'results' | 'capture'
}

export interface QuizResult {
  primaryRecommendation: ArchitectureType
  alternativeRecommendation: ArchitectureType | null
  scores: Record<ArchitectureType, number>
  recommendedBrandSlugs: string[]
  reasoning: string[]
  warningMessage?: string
  ctaLabel: string
  ctaHref: string
}

// ─── Rules Engine ─────────────────────────────────────────────────────────────
export interface ReasoningTemplate {
  headline: string
  bullets: string[]
  warningIfAny?: string
}

export interface DisqualifierRule {
  id: string
  description: string
  condition: (answers: Record<string, string | string[]>) => boolean
  disqualifies: ArchitectureType[]
}

export interface TieBreakerRule {
  id: string
  preferredType: ArchitectureType
  condition: (
    scores: Record<ArchitectureType, number>,
    answers: Record<string, string | string[]>
  ) => boolean
}

export interface BrandMappingRule {
  architectureType: ArchitectureType
  primaryBrandSlugs: string[]
  conditions?: (answers: Record<string, string | string[]>) => boolean
}

export interface RulesEngineConfig {
  disqualifiers: DisqualifierRule[]
  tieBreakers: TieBreakerRule[]
  brandMappings: BrandMappingRule[]
  reasoningTemplates: Record<ArchitectureType, ReasoningTemplate>
}

// ─── TCO Calculator ───────────────────────────────────────────────────────────
export interface TCOInputs {
  cameraCount: number
  architectureType: ArchitectureType
  brandSlug: string
  subscriptionPlanId: string
  hardwareCostNZD: number
  installationCostNZD: number
  yearsToProject: 2 | 3 | 5
  includeStorageDevice: boolean
  storageDeviceCostNZD: number
}

export interface TCOBreakdownLine {
  label: string
  year1: number
  year2: number
  year3: number
  isRecurring: boolean
  category: 'hardware' | 'subscription' | 'installation' | 'maintenance'
}

export interface TCOOutputs {
  year1TotalNZD: number
  year2TotalNZD: number
  year3TotalNZD: number
  breakdown: TCOBreakdownLine[]
  monthlyOngoingNZD: number
  annualOngoingNZD: number
  hardwareTotalNZD: number
  savingsVsCloudNZD: number | null
  notes: string[]
}

// ─── Analytics ────────────────────────────────────────────────────────────────
export interface AnalyticsEvent {
  event: string
  properties?: Record<string, string | number | boolean>
}

// ─── Quote Form ───────────────────────────────────────────────────────────────
export interface QuoteFormInputs {
  name: string
  email: string
  phone?: string
  suburb: string
  region: NZRegion
  cameraCount: number
  propertyType: 'house' | 'apartment' | 'rental' | 'business'
  message?: string
  quizResult?: ArchitectureType
  consentMarketing: boolean
}

// ─── Content Card (for index listings) ───────────────────────────────────────
export interface ContentCard {
  slug: string
  type: 'guide' | 'scenario' | 'brand' | 'compare'
  title: string
  excerpt: string
  lastUpdatedDate: string
  href: string
  iconEmoji?: string
  tags?: string[]
}

// ─── Breadcrumb ───────────────────────────────────────────────────────────────
export interface BreadcrumbItem {
  label: string
  href?: string
}
