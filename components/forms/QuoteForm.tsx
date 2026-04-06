'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import type { ArchitectureType, NZRegion } from '@/types'
import { Button } from '@/components/ui/Button'
import { NZPrivacyNote } from '@/components/compliance/NZPrivacyNote'

const schema = z.object({
  name: z.string().min(2, 'Please enter your name'),
  email: z.string().email('Please enter a valid email address'),
  phone: z.string().optional(),
  suburb: z.string().min(2, 'Please enter your suburb'),
  region: z.string().min(1, 'Please select a region'),
  cameraCount: z.number().min(1).max(100),
  propertyType: z.enum(['house', 'apartment', 'rental', 'business']),
  message: z.string().optional(),
  consentMarketing: z.boolean(),
})

type FormValues = z.infer<typeof schema>

interface QuoteFormProps {
  onSuccess: () => void
  prefillResult?: ArchitectureType
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

export function QuoteForm({ onSuccess, prefillResult }: QuoteFormProps) {
  const [submitted, setSubmitted] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      cameraCount: 2,
      propertyType: 'house',
      consentMarketing: false,
    },
  })

  async function onSubmit(data: FormValues) {
    // TODO: Wire to CRM / email endpoint (process.env.NEXT_PUBLIC_FORM_ENDPOINT)
    await new Promise((r) => setTimeout(r, 800))
    console.log('Quote form submitted:', data, 'Quiz result:', prefillResult)
    setSubmitted(true)
    onSuccess()
  }

  if (submitted) {
    return (
      <div className="text-center py-6">
        <div className="text-4xl mb-4">✅</div>
        <h3 className="font-bold text-neutral-900 mb-2">Quote request sent!</h3>
        <p className="text-sm text-neutral-500">
          We&apos;ll be in touch within 1 business day.
        </p>
      </div>
    )
  }

  const inputClass =
    'w-full rounded-xl border border-neutral-200 px-3.5 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-brand-400 focus:border-transparent placeholder:text-neutral-400'
  const labelClass = 'block text-sm font-semibold text-neutral-700 mb-1.5'
  const errorClass = 'text-xs text-red-600 mt-1'

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" noValidate>
      {prefillResult && (
        <div className="bg-brand-50 border border-brand-100 rounded-xl p-3 text-xs text-brand-700">
          Your quiz result ({prefillResult.replace(/-/g, ' ')}) will be included with your request.
        </div>
      )}

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
        <label htmlFor="phone" className={labelClass}>Phone (optional)</label>
        <input id="phone" type="tel" autoComplete="tel" {...register('phone')} placeholder="e.g. 021 000 0000" className={inputClass} />
      </div>

      {/* Suburb + Region */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="suburb" className={labelClass}>Suburb *</label>
          <input id="suburb" type="text" {...register('suburb')} placeholder="e.g. Ponsonby" className={inputClass} />
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

      {/* Message */}
      <div>
        <label htmlFor="message" className={labelClass}>Anything else? (optional)</label>
        <textarea
          id="message"
          rows={3}
          {...register('message')}
          placeholder="Tell us about your property, specific concerns, or budget…"
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

      <Button type="submit" fullWidth size="lg" disabled={isSubmitting}>
        {isSubmitting ? 'Sending…' : 'Send quote request →'}
      </Button>

      <p className="text-xs text-neutral-400 text-center">
        No obligation. A Get Secure expert will reply within 1 business day.
      </p>
    </form>
  )
}
