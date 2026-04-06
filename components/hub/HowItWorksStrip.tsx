import { ClipboardText, Target, EnvelopeSimple } from '@phosphor-icons/react/dist/ssr'
import type { Icon } from '@phosphor-icons/react'

interface Step {
  number: string
  Icon: Icon
  title: string
  description: string
}

const steps: Step[] = [
  {
    number: '01',
    Icon: ClipboardText,
    title: 'Answer 8 quick questions',
    description: 'Tell us your situation — budget, property type, how many cameras, and what matters most to you.',
  },
  {
    number: '02',
    Icon: Target,
    title: 'Get your personalised match',
    description: "We'll recommend the right camera system type and show you the best NZ brands for your needs.",
  },
  {
    number: '03',
    Icon: EnvelopeSimple,
    title: 'Get a quote or shop direct',
    description: 'Book a free planning call with Get Secure, or browse comparison pages to learn more.',
  },
]

export function HowItWorksStrip() {
  return (
    <section className="py-14 bg-white border-y border-neutral-100">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <h2 className="text-2xl font-bold text-brand-600">How it works</h2>
          <p className="text-neutral-500 mt-2">From confused to confident in 2 minutes</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {steps.map((step, i) => (
            <div key={step.number} className="flex flex-col items-center text-center">
              <div className="relative mb-5">
                <div className="w-14 h-14 bg-brand-50 rounded-2xl flex items-center justify-center">
                  <step.Icon size={28} weight="duotone" className="text-brand-600" />
                </div>
                <span className="absolute -top-2 -right-2 w-6 h-6 bg-accent-400 text-white text-xs font-bold rounded-full flex items-center justify-center">
                  {i + 1}
                </span>
              </div>
              <h3 className="font-semibold text-neutral-900 mb-2">{step.title}</h3>
              <p className="text-sm text-neutral-500 leading-relaxed">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
