import Link from 'next/link'
import { ArrowRight } from '@phosphor-icons/react/dist/ssr'
import {
  Cloud,
  WifiHigh,
  Prohibit,
  BatteryLow,
  Sun,
  Plug,
} from '@phosphor-icons/react/dist/ssr'
import type { Icon } from '@phosphor-icons/react'

interface Block {
  Icon: Icon
  iconColor: string
  title: string
  body: string
  href: string
  cta: string
}

const blocks: Block[] = [
  {
    Icon: Cloud,
    iconColor: 'text-sky-500',
    title: 'Cloud vs local storage',
    body: "Cloud storage is convenient but comes with a monthly cost. Local storage is private and free forever, but footage stays at home. We explain the real tradeoffs.",
    href: '/guides/cloud-vs-local-storage',
    cta: 'Read the guide',
  },
  {
    Icon: WifiHigh,
    iconColor: 'text-brand-400',
    title: 'Wired vs wireless cameras',
    body: "Wireless cameras are easy to install anywhere. Wired cameras are more reliable and never miss footage. Find out which is right for your home.",
    href: '/guides/wired-vs-wireless-security-cameras',
    cta: 'Read the guide',
  },
  {
    Icon: Prohibit,
    iconColor: 'text-rose-400',
    title: 'Cameras with no monthly fees',
    body: "Not all security cameras require a subscription. Local storage systems like Eufy give you full functionality forever with no ongoing costs.",
    href: '/guides/no-subscription-security-cameras',
    cta: 'See your options',
  },
  {
    Icon: BatteryLow,
    iconColor: 'text-orange-400',
    title: 'Battery camera limitations',
    body: "Battery cameras are convenient, but they can miss the first 1–2 seconds of motion. In high-traffic spots, this matters more than you might think.",
    href: '/quiz',
    cta: 'Find the right type',
  },
  {
    Icon: Sun,
    iconColor: 'text-accent-400',
    title: 'Solar cameras: when they work',
    body: "Solar panels sound ideal — but shaded locations, cold winters, and high motion traffic can drain batteries faster than the solar panel can recharge them.",
    href: '/quiz',
    cta: 'Is solar right for you?',
  },
  {
    Icon: Plug,
    iconColor: 'text-teal-500',
    title: 'When to get a pro install',
    body: "DIY is fine for most homes. But if you want full PoE wired cameras, 5+ cameras, or NVR recording, a professional install is worth every dollar.",
    href: '/?quote=open',
    cta: 'Get a quote',
  },
]

export function EducationBlockGrid() {
  return (
    <section className="py-14 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-brand-600 mb-2">
            Learn the basics first
          </h2>
          <p className="text-neutral-500">
            Plain-English explanations of the things that actually matter when choosing a security camera.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {blocks.map((block) => (
            <div
              key={block.title}
              className="rounded-2xl border border-neutral-100 bg-white p-5 flex flex-col gap-3 hover:shadow-md transition-shadow"
            >
              <block.Icon size={28} weight="duotone" className={block.iconColor} />
              <div>
                <h3 className="font-semibold text-neutral-900 mb-1">{block.title}</h3>
                <p className="text-sm text-neutral-600 leading-relaxed">{block.body}</p>
              </div>
              <Link
                href={block.href}
                className="text-sm font-semibold text-accent-500 hover:text-accent-600 mt-auto inline-flex items-center gap-1 transition-colors"
              >
                {block.cta}
                <ArrowRight size={14} weight="bold" />
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
