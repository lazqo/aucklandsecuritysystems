'use client'

import { useState, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import { QuoteModal } from '@/components/forms/QuoteModal'

export function QuoteModalTrigger() {
  const [isOpen, setIsOpen] = useState(false)
  const searchParams = useSearchParams()

  useEffect(() => {
    if (searchParams.get('quote') === 'open') {
      setIsOpen(true)
    }
  }, [searchParams])

  return (
    <QuoteModal
      isOpen={isOpen}
      onClose={() => setIsOpen(false)}
      source="url-param"
    />
  )
}
