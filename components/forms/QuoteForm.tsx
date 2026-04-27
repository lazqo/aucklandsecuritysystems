'use client'

import { useState } from 'react'
import { useAnalytics } from '@/lib/analytics/events'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import type { ArchitectureType, NZRegion } from '@/types'
import { Button } from '@/components/ui/Button'
import { NZPrivacyNote } from '@/components/compliance/NZPrivacyNote'
import { GET_SECURE } from '@/lib/business/get-secure'

const schema = z.object({
  name: z.string().min(2, 'Please enter your name'),
  email: z.string().email('Please enter a valid email address'),
  phone: z.string().min(7, 'Please enter your phone number'),
  suburb: z.string().min(2, 'Please enter your suburb'),
  region: z.string().min(1, 'Please select a region'),
  cameraCount: z.number().min(1).max(100),
  propertyType: z.enum(['house', 'apartment', 'rental', 'business']),
  serviceType: z.enum(['cctv', 'alarm', 'intercom', 'networking', 'repair', 'not-sure']),
  urgency: z.enum(['researching', 'soon', 'urgent']),
  existingSystem: z.enum(['no', 'yes', 'not-sure']),
  preferredContactTime: z.string().optional(),
  message: z.string().optional(),
  consentMarketing: z.boolean(),
})

type FormValues = z.infer<typeof schema>

export type QuoteFormSuccessData = FormValues & { leadQuality: string }

interface QuoteFormProps {
  onSuccess: (data: QuoteFormSuccessData) => void
  prefillResult?: ArchitectureType
  source?: string
}

const nzRegions: { value: NZRegion; label: string }[] = [
  { value: 'auckland', label: 'Auckland' },
  { value: 'wellington', label: 'Wellington' },
  { value: 'canterbury', label: 'Canterbury / Christchurch' },
  { value: 'waikato', label: 'Waikato / Hamilton' },
  { value: 'bay-of-plenty', label: 'Bay of Plenty' },
  { value: 'otago', label: 'Otago / Dunedin' },
  { value: 'manawatu-wanganui', label: 'Manawatū-Whanganui' },
  { value: 'hawkes-bay', label: "Hawke's Bay" },
  { value: 'northland', label: 'Northland' },
  { value: 'taranaki', label: 'Taranaki' },
  { value: 'other', label: 'Other / Not sure' },
]

const FORMSPREE_ENDPOINT =
  process.env.NEXT_PUBLIC_FORMSPREE_ENDPOINT ?? 'https://formspree.io/f/mdapyedd'

function estimateLeadQuality(data: FormValues) {
  if (data.region === 'auckland' && (data.urgency === 'urgent' || data.cameraCount >= 4 || data.propertyType === 'business')) {
    return 'high-intent'
  }
  if (data.region === 'auckland' && data.urgency === 'soon') return 'good-fit'
  if (data.serviceType === 'repair') return 'service-request'
  return 'researching'
}

export function QuoteForm({ onSuccess, prefillResult, source = 'quote_form' }: QuoteFormProps) {
  const [submitted, setSubmitted] = useState(false)
  const [submitError, setSubmitError] = useState<string | null>(null)
  const [hasStarted, setHasStarted] = useState(false)
  const { track } = useAnalytics()

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      cameraCount: 2,
      propertyType: 'house',
      serviceType: 'cctv',
      urgency: 'soon',
      existingSystem: 'no',
      consentMarketing: false,
    },
  })

  async function onSubmit(data: FormValues) {
    setSubmitError(null)
    try {
      const leadQuality = estimateLeadQuality(data)
      const payload = {
        ...data,
        leadQuality,
        _subject: `New ${leadQuality} security lead — ${data.suburb}, ${data.region}`,
        _replyto: data.email,
        quizResult: prefillResult ?? 'not completed',
        sourceSite: 'aucklandsecuritysystems.co.nz',
      }
      const res = await fetch(FORMSPREE_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify(payload),
      })
      if (!res.ok) {
        const body = await res.json().catch(() => ({}))
        throw new Error(body?.error ?? 'Submission failed. Please try again.')
      }
      setSubmitted(true)
      onSuccess({ ...data, leadQuality })
    } catch (err) {
      setSubmitError(err instanceof Error ? err.message : 'Something went wrong. Please try again.')
    }
  }

  if (submitted) {
    return (
      <div className="text-center py-6">
        <div className="text-4xl mb-4">✅</div>
        <h3 className="font-bold text-neutral-900 mb-2">Quote request sent!</h3>
        <p className="text-sm text-neutral-500">
          We&apos;ll review it and contact you within 1 business day. If it is urgent, call{' '}
          <a href={GET_SECURE.phoneHref} className="font-semibold text-brand-600 hover:text-brand-700">
            {GET_SECURE.phoneDisplay}
          </a>.
        </p>
      </div>
    )
  }

  const inputClass =
    'w-full rounded-xl border border-neutral-200 px-3.5 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-brand-400 focus:border-transparent placeholder:text-neutral-400'
  const labelClass = 'block text-sm font-semibold text-neutral-700 mb-1.5'
  const errorClass = 'text-xs text-red-600 mt-1'

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      onFocusCapture={() => {
        if (!hasStarted) {
          setHasStarted(true)
          track('quote_form_start', {
            source,
            page_path: typeof window === 'undefined' ? '' : window.location.pathname,
          })
        }
      }}
      className="space-y-4"
      noValidate
    >
      {prefillResult && (
        <div className="bg-brand-50 border border-brand-100 rounded-xl p-3 text-xs text-brand-700">
          Your quiz result ({prefillResult.replace(/-/g, ' ')}) will be included with your request.
        </div>
      )}

      <div className="rounded-2xl bg-brand-50 border border-brand-100 p-4 text-sm text-brand-800">
        <p className="font-semibold text-brand-900 mb-1">Installed by {GET_SECURE.name}</p>
        <p>
          Free quote, no pressure. An Auckland-based installer reviews your request and suggests the simplest reliable setup.
        </p>
      </div>

      {/* Name + Email */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="name" className={labelClass}>Name *</label>
          <input id="name" type="text" autoComplete="name" {...register('name')} placeholder="Your name" className={inputClass} />
          {errors.name && <p className={errorClass}>{errors.name.message}</p>}
        </div>
        <div>
          <label htmlFor="email" className={labelClass}>Email *</label>
          <input id="email" type="email" autoComplete="email" {...register('email')} placeholder="your@email.com" className={inputClass} />
          {errors.email && <p className={errorClass}>{errors.email.message}</p>}
        </div>
      </div>

      {/* Phone */}
      <div>
        <label htmlFor="phone" className={labelClass}>Phone *</label>
        <input id="phone" type="tel" autoComplete="tel" {...register('phone')} placeholder="e.g. 021 000 0000" className={inputClass} />
        {errors.phone && <p className={errorClass}>{errors.phone.message}</p>}
      </div>

      {/* Suburb + Region */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="suburb" className={labelClass}>Suburb *</label>
          <input id="suburb" type="text" {...register('suburb')} placeholder="e.g. Henderson" className={inputClass} />
          {errors.suburb && <p className={errorClass}>{errors.suburb.message}</p>}
        </div>
        <div>
          <label htmlFor="region" className={labelClass}>Region *</label>
          <select id="region" {...register('region')} className={inputClass}>
            <option value="">Select region…</option>
            {nzRegions.map((r) => (
              <option key={r.value} value={r.value}>{r.label}</option>
            ))}
          </select>
          {errors.region && <p className={errorClass}>{errors.region.message}</p>}
        </div>
      </div>

      {/* Service + Urgency */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="serviceType" className={labelClass}>What do you need? *</label>
          <select id="serviceType" {...register('serviceType')} className={inputClass}>
            <option value="cctv">Security cameras / CCTV</option>
            <option value="alarm">Alarm system</option>
            <option value="intercom">Intercom</option>
            <option value="networking">Networking / Wi‑Fi</option>
            <option value="repair">Repair / service</option>
            <option value="not-sure">Not sure yet</option>
          </select>
        </div>
        <div>
          <label htmlFor="urgency" className={labelClass}>Timing *</label>
          <select id="urgency" {...register('urgency')} className={inputClass}>
            <option value="researching">Just researching</option>
            <option value="soon">Need advice/quote soon</option>
            <option value="urgent">Urgent / security concern</option>
          </select>
        </div>
      </div>

      {/* Cameras + Property */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="cameraCount" className={labelClass}>Cameras needed</label>
          <input
            id="cameraCount"
            type="number"
            min={1}
            max={50}
            {...register('cameraCount', { valueAsNumber: true })}
            className={inputClass}
          />
          {errors.cameraCount && <p className={errorClass}>{errors.cameraCount.message}</p>}
        </div>
        <div>
          <label htmlFor="propertyType" className={labelClass}>Property type</label>
          <select id="propertyType" {...register('propertyType')} className={inputClass}>
            <option value="house">House</option>
            <option value="apartment">Apartment</option>
            <option value="rental">Rental</option>
            <option value="business">Business</option>
          </select>
        </div>
      </div>

      {/* Existing system + Contact time */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="existingSystem" className={labelClass}>Existing system?</label>
          <select id="existingSystem" {...register('existingSystem')} className={inputClass}>
            <option value="no">No</option>
            <option value="yes">Yes</option>
            <option value="not-sure">Not sure</option>
          </select>
        </div>
        <div>
          <label htmlFor="preferredContactTime" className={labelClass}>Best time to call</label>
          <input
            id="preferredContactTime"
            type="text"
            {...register('preferredContactTime')}
            placeholder="e.g. weekday morning"
            className={inputClass}
          />
        </div>
      </div>

      {/* Message */}
      <div>
        <label htmlFor="message" className={labelClass}>Anything else? (optional)</label>
        <textarea
          id="message"
          rows={3}
          {...register('message')}
          placeholder="Tell us about the property, problem areas, driveway, gates, budget, or install timing…"
          className={`${inputClass} resize-none`}
        />
      </div>

      {/* Marketing consent */}
      <div>
        <label className="flex items-start gap-2.5 cursor-pointer">
          <input
            type="checkbox"
            {...register('consentMarketing')}
            className="mt-0.5 rounded border-neutral-300 text-brand-600 focus:ring-brand-400"
          />
          <span className="text-xs text-neutral-500">
            I&apos;m happy to receive occasional tips and updates from Get Secure NZ. You can unsubscribe any time.
          </span>
        </label>
      </div>

      <NZPrivacyNote compact className="mt-1" />

      {submitError && (
        <div className="rounded-xl bg-red-50 border border-red-200 p-3 text-sm text-red-700">
          {submitError}
        </div>
      )}

      <Button type="submit" fullWidth size="lg" disabled={isSubmitting}>
        {isSubmitting ? 'Sending…' : 'Send quote request →'}
      </Button>

      <p className="text-xs text-neutral-400 text-center">
        No obligation. Free site visits for quote jobs. For urgent jobs call{' '}
        <a href={GET_SECURE.phoneHref} className="font-semibold text-neutral-500 hover:text-brand-600">
          {GET_SECURE.phoneDisplay}
        </a>.
      </p>
    </form>
  )
}
