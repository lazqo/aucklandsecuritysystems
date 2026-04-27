'use client'

import { useEffect } from 'react'
import { useAnalytics } from '@/lib/analytics/events'
import { QuoteForm } from './QuoteForm'
import { GET_SECURE } from '@/lib/business/get-secure'
import type { ArchitectureType } from '@/types'

interface QuoteModalProps {
  isOpen: boolean
  onClose: () => void
  prefillResult?: ArchitectureType
  source?: string
}

export function QuoteModal({ isOpen, onClose, prefillResult, source = 'general' }: QuoteModalProps) {
  const { track } = useAnalytics()

  useEffect(() => {
    if (isOpen) {
      track('quote_modal_open', { source })
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [isOpen, source, track])

  useEffect(() => {
    function handleEsc(e: KeyboardEvent) {
      if (e.key === 'Escape') onClose()
    }
    if (isOpen) window.addEventListener('keydown', handleEsc)
    return () => window.removeEventListener('keydown', handleEsc)
  }, [isOpen, onClose])

  if (!isOpen) return null

  function handleClose() {
    track('quote_modal_close', { source, completed: false })
    onClose()
  }

  function handleSuccess() {
    track('quote_form_submit', { source, region: 'unknown', camera_count: 0 })
    onClose()
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-label="Get a security camera quote"
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={handleClose}
        aria-hidden="true"
      />

      {/* Modal */}
      <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-neutral-100">
          <div>
            <h2 className="font-bold text-neutral-900">Get a free Auckland security quote</h2>
            <p className="text-sm text-neutral-500">
              {GET_SECURE.name} will review your request and contact you within 1 business day.
            </p>
          </div>
          <button
            onClick={handleClose}
            className="w-8 h-8 flex items-center justify-center rounded-full text-neutral-400 hover:text-neutral-700 hover:bg-neutral-100 transition-colors"
            aria-label="Close"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Form */}
        <div className="px-6 py-5">
          <QuoteForm onSuccess={handleSuccess} prefillResult={prefillResult} />
        </div>
      </div>
    </div>
  )
}
