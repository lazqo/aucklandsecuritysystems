import type { Metadata } from 'next'
import { Sora, DM_Sans } from 'next/font/google'
import './globals.css'
import { AnalyticsProvider } from '@/components/analytics/AnalyticsProvider'
import { buildOrganizationSchema, buildWebSiteSchema } from '@/lib/seo/structured-data'
import { JsonLd } from '@/components/seo/JsonLd'

const sora = Sora({
  subsets: ['latin'],
  variable: '--font-sora',
  display: 'swap',
  weight: ['400', '600', '700', '800'],
})

const dmSans = DM_Sans({
  subsets: ['latin'],
  variable: '--font-dm-sans',
  display: 'swap',
  weight: ['400', '500', '600'],
})

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://cameras.getsecure.co.nz'

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: 'Which Home Security Camera Is Right for Me? | Get Secure NZ',
    template: '%s | Get Secure NZ',
  },
  description:
    'Compare DIY home security cameras in New Zealand. Use our free quiz and cost calculator to find the right system — Ring, Arlo, Eufy, PoE, battery, no-subscription, and more.',
  keywords: [
    'home security camera NZ',
    'best security camera New Zealand',
    'Ring vs Arlo NZ',
    'no subscription security camera',
    'PoE security camera NZ',
    'Eufy NZ review',
    'security camera comparison',
  ],
  openGraph: {
    type: 'website',
    siteName: 'Get Secure NZ',
    locale: 'en_NZ',
  },
  twitter: {
    card: 'summary_large_image',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
    },
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en-NZ" className={`${sora.variable} ${dmSans.variable}`}>
      <head>
        <JsonLd data={buildOrganizationSchema()} />
        <JsonLd data={buildWebSiteSchema()} />
      </head>
      <body className="font-sans bg-white text-neutral-900 antialiased flex flex-col min-h-screen">
        <AnalyticsProvider>
          {children}
        </AnalyticsProvider>
      </body>
    </html>
  )
}
