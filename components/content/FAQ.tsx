'use client'

import { useState } from 'react'
import type { FAQ as FAQType } from '@/types'
import { cn } from '@/lib/utils'
import { buildFaqSchema } from '@/lib/seo/structured-data'
import { JsonLd } from '@/components/seo/JsonLd'

interface FAQProps {
  items: FAQType[]
  renderSchema?: boolean
  pageUrl?: string
  title?: string
}

export function FAQ({ items, renderSchema = false, pageUrl = '/', title = 'Frequently asked questions' }: FAQProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  if (items.length === 0) return null

  return (
    <section className="py-8">
      {renderSchema && <JsonLd data={buildFaqSchema(items, pageUrl)} />}

      <h2 className="text-xl font-bold text-neutral-900 mb-5">{title}</h2>
      <div className="space-y-2">
        {items.map((item, index) => {
          const isOpen = openIndex === index
          return (
            <div
              key={index}
              className={cn(
                'rounded-2xl border transition-colors',
                isOpen ? 'border-brand-200 bg-brand-50/30' : 'border-neutral-100 bg-white'
              )}
            >
              <button
                onClick={() => setOpenIndex(isOpen ? null : index)}
                className="w-full flex items-start justify-between gap-4 px-5 py-4 text-left"
                aria-expanded={isOpen}
              >
                <span className="font-semibold text-sm text-neutral-900 leading-snug">
                  {item.question}
                </span>
                <svg
                  className={cn(
                    'w-5 h-5 text-neutral-400 flex-shrink-0 mt-0.5 transition-transform duration-200',
                    isOpen && 'rotate-180'
                  )}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {isOpen && (
                <div className="px-5 pb-4">
                  <p className="text-sm text-neutral-700 leading-relaxed">{item.answer}</p>
                </div>
              )}
            </div>
          )
        })}
      </div>
    </section>
  )
}
