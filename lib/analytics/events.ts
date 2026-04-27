'use client'

import { createContext, useContext } from 'react'
import type { ArchitectureType } from '@/types'

// ─── Event definitions ────────────────────────────────────────────────────────

export type AnalyticsEventName =
  | 'quiz_start'
  | 'quiz_step_view'
  | 'quiz_step_complete'
  | 'quiz_back_clicked'
  | 'quiz_complete'
  | 'quiz_result_view'
  | 'quiz_result_cta_click'
  | 'quiz_restart'
  | 'calculator_view'
  | 'calculator_input_change'
  | 'calculator_result_view'
  | 'guide_view'
  | 'guide_scroll_depth'
  | 'scenario_view'
  | 'brand_page_view'
  | 'compare_page_view'
  | 'quote_modal_open'
  | 'quote_modal_close'
  | 'quote_form_start'
  | 'quote_form_submit'
  | 'quote_cta_click'
  | 'phone_click'
  | 'outbound_getsecure_click'
  | 'shortlist_capture_submit'
  | 'affiliate_link_click'
  | 'sticky_cta_click'
  | 'internal_link_click'
  | 'page_view'

export type AnalyticsEventProperties = {
  quiz_start: { entry_point: string }
  quiz_step_view: { step: number; question_id: string }
  quiz_step_complete: { step: number; question_id: string; answer_id: string }
  quiz_back_clicked: { from_step: number }
  quiz_complete: { result_type: ArchitectureType; duration_seconds: number }
  quiz_result_view: { result_type: ArchitectureType; primary_brand: string }
  quiz_result_cta_click: { result_type: ArchitectureType; cta_label: string }
  quiz_restart: Record<string, never>
  calculator_view: Record<string, never>
  calculator_input_change: { field: string; value: string | number }
  calculator_result_view: { architecture: string; year1_cost: number }
  guide_view: { slug: string }
  guide_scroll_depth: { slug: string; percent: 25 | 50 | 75 | 100 }
  scenario_view: { slug: string }
  brand_page_view: { brand: string }
  compare_page_view: { brand_a: string; brand_b: string }
  quote_modal_open: { source: string }
  quote_modal_close: { source: string; completed: boolean }
  quote_form_start: { source: string; page_path: string }
  quote_form_submit: { source: string; region: string; camera_count: number; service_type?: string; urgency?: string; lead_quality?: string }
  quote_cta_click: { label: string; href: string; location: string; page_path: string }
  phone_click: { location: string; page_path: string }
  outbound_getsecure_click: { location: string; page_path: string }
  shortlist_capture_submit: { result_type: ArchitectureType }
  affiliate_link_click: { brand: string; retailer: string; product?: string }
  sticky_cta_click: { label: string; page_context: string }
  internal_link_click: { from: string; to: string; link_type: 'related' | 'cta' | 'nav' }
  page_view: { path: string }
}

// ─── Analytics context + hook ─────────────────────────────────────────────────

type TrackFn = <E extends AnalyticsEventName>(
  event: E,
  properties?: AnalyticsEventProperties[E]
) => void

interface AnalyticsContextValue {
  track: TrackFn
}

export const AnalyticsContext = createContext<AnalyticsContextValue>({
  track: () => {},
})

export function useAnalytics(): AnalyticsContextValue {
  return useContext(AnalyticsContext)
}

// ─── gtag helper (safe — no-ops if gtag not loaded) ──────────────────────────

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void
    dataLayer?: unknown[]
  }
}

export function trackEvent(event: string, properties?: Record<string, unknown>) {
  if (typeof window === 'undefined') return
  if (typeof window.gtag === 'function') {
    window.gtag('event', event, {
      ...properties,
      page_path: window.location.pathname,
      timestamp: new Date().toISOString(),
    })
  }
  // Also log to console in development
  if (process.env.NODE_ENV === 'development') {
    console.log(`[Analytics] ${event}`, properties)
  }
}
