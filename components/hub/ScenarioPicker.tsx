import Link from 'next/link'
import { cn } from '@/lib/utils'
import {
  Key,
  Car,
  Door,
  Tag,
  ShieldCheck,
  House,
} from '@phosphor-icons/react/dist/ssr'
import type { Icon } from '@phosphor-icons/react'

interface Scenario {
  Icon: Icon
  iconColor: string
  title: string
  description: string
  href: string
  accent: string
}

const scenarios: Scenario[] = [
  {
    Icon: Key,
    iconColor: 'text-blue-500',
    title: 'Best cameras for renters',
    description: 'No-drill, removable cameras that go with you when you move.',
    href: '/scenarios/best-security-camera-for-renters',
    accent: 'border-blue-200 hover:border-blue-400',
  },
  {
    Icon: Car,
    iconColor: 'text-green-500',
    title: 'Best driveway camera',
    description: 'Capture plates and evidence with clarity. Wired or wireless options.',
    href: '/scenarios/best-driveway-camera',
    accent: 'border-green-200 hover:border-green-400',
  },
  {
    Icon: Door,
    iconColor: 'text-amber-500',
    title: 'Best front door camera',
    description: "See who's there before you open the door.",
    href: '/scenarios/best-front-door-camera',
    accent: 'border-amber-200 hover:border-amber-400',
  },
  {
    Icon: Tag,
    iconColor: 'text-purple-500',
    title: 'No monthly fees',
    description: 'Great cameras that never charge a subscription.',
    href: '/guides/no-subscription-security-cameras',
    accent: 'border-purple-200 hover:border-purple-400',
  },
  {
    Icon: ShieldCheck,
    iconColor: 'text-neutral-500',
    title: 'Best for privacy',
    description: 'Local storage, no cloud, your footage stays yours.',
    href: '/guides/cloud-vs-local-storage',
    accent: 'border-neutral-200 hover:border-neutral-400',
  },
  {
    Icon: House,
    iconColor: 'text-brand-500',
    title: 'Full-home coverage',
    description: 'Multi-camera systems that cover every angle.',
    href: '/quiz',
    accent: 'border-brand-200 hover:border-brand-400',
  },
]

export function ScenarioPicker() {
  return (
    <section className="py-14 bg-surface">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-brand-600 mb-2">What are you trying to solve?</h2>
          <p className="text-neutral-500">
            Pick your situation and we&apos;ll take you straight to the right advice.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {scenarios.map((s) => (
            <Link
              key={s.href}
              href={s.href}
              className={cn(
                'bg-white rounded-2xl border-2 p-5 flex gap-4 items-start transition-all duration-200 hover:shadow-md group',
                s.accent
              )}
            >
              <s.Icon
                size={26}
                weight="duotone"
                className={cn('flex-shrink-0 mt-0.5', s.iconColor)}
              />
              <div>
                <h3 className="font-semibold text-neutral-900 group-hover:text-brand-600 transition-colors mb-1">
                  {s.title}
                </h3>
                <p className="text-sm text-neutral-500 leading-snug">{s.description}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
