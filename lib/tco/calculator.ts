import type { TCOInputs, TCOOutputs, TCOBreakdownLine, ArchitectureType } from '@/types'
import { getPlanById } from '@/lib/data/subscription-plans'

// ─────────────────────────────────────────────────────────────────────────────
// TCO CALCULATOR — Pure computation, no UI dependencies
// ─────────────────────────────────────────────────────────────────────────────

// Default hardware cost estimates by architecture (NZD per camera)
const hardwareCostDefaults: Record<ArchitectureType, number> = {
  'wifi-diy-ecosystem': 250,
  'local-storage-no-sub': 220,
  'poe-nvr-system': 200,
  'battery-solar': 280,
  hybrid: 240,
}

// Default storage device costs (one-time)
const storageDeviceCostDefaults: Record<ArchitectureType, number> = {
  'wifi-diy-ecosystem': 0,
  'local-storage-no-sub': 199, // HomeBase
  'poe-nvr-system': 450,       // NVR + HDD
  'battery-solar': 0,
  hybrid: 199,
}

export function computeTCO(inputs: TCOInputs): TCOOutputs {
  const {
    cameraCount,
    architectureType,
    subscriptionPlanId,
    hardwareCostNZD,
    installationCostNZD,
    yearsToProject,
    includeStorageDevice,
    storageDeviceCostNZD,
  } = inputs

  // ─── Resolve subscription cost ────────────────────────────────────────────
  const plan = subscriptionPlanId !== 'none' ? getPlanById(subscriptionPlanId) : null
  const monthlySubNZD = plan?.priceNZDMonthly ?? 0
  const annualSubNZD = plan?.priceNZDYearly ?? monthlySubNZD * 12

  // ─── Hardware cost ────────────────────────────────────────────────────────
  const cameraHardwareTotal =
    hardwareCostNZD > 0
      ? hardwareCostNZD
      : hardwareCostDefaults[architectureType] * cameraCount

  // ─── Storage device cost ──────────────────────────────────────────────────
  const storageOnetime =
    includeStorageDevice
      ? storageDeviceCostNZD > 0
        ? storageDeviceCostNZD
        : storageDeviceCostDefaults[architectureType]
      : 0

  // ─── Installation ─────────────────────────────────────────────────────────
  const installOnetime = installationCostNZD

  // ─── Battery maintenance estimate ─────────────────────────────────────────
  const batteryAnnualCost =
    architectureType === 'battery-solar'
      ? Math.round(cameraCount * 15) // ~$15/camera/year for replacement costs
      : 0

  // ─── Year 1 breakdown ────────────────────────────────────────────────────
  const year1Hardware = cameraHardwareTotal + storageOnetime + installOnetime
  const year1Subscription = annualSubNZD
  const year1Maintenance = batteryAnnualCost
  const year1Total = year1Hardware + year1Subscription + year1Maintenance

  // ─── Recurring annual cost ───────────────────────────────────────────────
  const annualOngoing = annualSubNZD + batteryAnnualCost
  const monthlyOngoing = Math.round(annualOngoing / 12)

  // ─── Multi-year totals ────────────────────────────────────────────────────
  const year2Total = year1Total + annualOngoing
  const year3Total = year2Total + annualOngoing

  // ─── Savings vs cloud ────────────────────────────────────────────────────
  // Compare against a mid-tier cloud subscription alternative
  let savingsVsCloud: number | null = null
  if (architectureType === 'local-storage-no-sub' || architectureType === 'poe-nvr-system') {
    const cloudAlternativeAnnual = 144 * (cameraCount > 1 ? 1 : 1) // Ring Protect Plus equiv ~NZ$144/yr
    const cloudYear3Cost = cameraHardwareTotal + cloudAlternativeAnnual * 3
    savingsVsCloud = Math.max(0, cloudYear3Cost - year3Total)
  }

  // ─── Build breakdown lines ───────────────────────────────────────────────
  const breakdown: TCOBreakdownLine[] = []

  breakdown.push({
    label: `Camera hardware (${cameraCount} camera${cameraCount > 1 ? 's' : ''})`,
    year1: cameraHardwareTotal,
    year2: 0,
    year3: 0,
    isRecurring: false,
    category: 'hardware',
  })

  if (storageOnetime > 0) {
    breakdown.push({
      label: 'Storage device (hub / NVR)',
      year1: storageOnetime,
      year2: 0,
      year3: 0,
      isRecurring: false,
      category: 'hardware',
    })
  }

  if (installOnetime > 0) {
    breakdown.push({
      label: 'Professional installation',
      year1: installOnetime,
      year2: 0,
      year3: 0,
      isRecurring: false,
      category: 'installation',
    })
  }

  if (annualSubNZD > 0) {
    breakdown.push({
      label: `Cloud subscription (${plan?.planName ?? 'plan'})`,
      year1: annualSubNZD,
      year2: annualSubNZD,
      year3: annualSubNZD,
      isRecurring: true,
      category: 'subscription',
    })
  }

  if (batteryAnnualCost > 0) {
    breakdown.push({
      label: 'Battery maintenance / replacement',
      year1: batteryAnnualCost,
      year2: batteryAnnualCost,
      year3: batteryAnnualCost,
      isRecurring: true,
      category: 'maintenance',
    })
  }

  // ─── Notes ───────────────────────────────────────────────────────────────
  const notes: string[] = [
    'Hardware costs are estimates based on typical NZ retail pricing. Actual prices vary by retailer and change over time.',
    'Subscription prices are estimated and may not reflect current NZ pricing — verify with the brand before purchasing.',
  ]

  if (architectureType === 'battery-solar') {
    notes.push(
      'Battery replacement costs are estimated. Actual costs depend on camera usage and local temperature.'
    )
  }

  if (architectureType === 'poe-nvr-system') {
    notes.push(
      'PoE/NVR installation costs vary significantly depending on your home layout and cable runs. Get a site assessment for an accurate quote.'
    )
  }

  if (monthlySubNZD > 0) {
    notes.push('Subscription prices may change. Check the provider directly for current NZ pricing.')
  }

  return {
    year1TotalNZD: Math.round(year1Total),
    year2TotalNZD: Math.round(year2Total),
    year3TotalNZD: Math.round(year3Total),
    breakdown,
    monthlyOngoingNZD: monthlyOngoing,
    annualOngoingNZD: annualOngoing,
    hardwareTotalNZD: Math.round(year1Hardware),
    savingsVsCloudNZD: savingsVsCloud !== null ? Math.round(savingsVsCloud) : null,
    notes,
  }
}

// ─── Default inputs factory ───────────────────────────────────────────────────

export function defaultTCOInputs(
  overrides?: Partial<TCOInputs>
): TCOInputs {
  return {
    cameraCount: 2,
    architectureType: 'wifi-diy-ecosystem',
    brandSlug: 'ring',
    subscriptionPlanId: 'ring-protect-plus',
    hardwareCostNZD: 0,
    installationCostNZD: 0,
    yearsToProject: 3,
    includeStorageDevice: false,
    storageDeviceCostNZD: 0,
    ...overrides,
  }
}

// ─── Format helpers ───────────────────────────────────────────────────────────

export function formatNZD(value: number): string {
  return `NZ$${value.toLocaleString('en-NZ')}`
}
