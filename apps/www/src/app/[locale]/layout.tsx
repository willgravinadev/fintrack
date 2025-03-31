import type { Metadata, Viewport } from 'next'
import type { JSX, ReactNode } from 'react'

import '@/styles/globals.css'

import { NextIntlClientProvider } from '@fintrack/i18n/client'
import { i18n } from '@fintrack/i18n/config'
import { getMessages, getTranslations, setRequestLocale } from '@fintrack/i18n/server'
import { cn } from '@fintrack/utils'
import { Analytics } from '@vercel/analytics/next'
import { SpeedInsights } from '@vercel/speed-insights/next'
import localFont from 'next/font/local'
import { NuqsAdapter } from 'nuqs/adapters/next/app'

import { SITE_KEYWORDS, SITE_NAME, SITE_URL } from '@/utils/constants.util'

import Providers from '../providers'

type LayoutProps = Readonly<{
  children: ReactNode
  params: Promise<{
    locale: string
  }>
}>

// Define custom font(s) using next/font
const lufga = localFont({
  src: [
    { path: '../../../public/fonts/lufga-light.ttf', weight: '300', style: 'normal' },
    { path: '../../../public/fonts/lufga-regular.ttf', weight: '400', style: 'normal' },
    { path: '../../../public/fonts/lufga-semibold.ttf', weight: '600', style: 'normal' }
  ],
  variable: '--font-lufga',
  fallback: ['system-ui', 'sans-serif']
})

// Generate static params for i18n routes
export function generateStaticParams(): Array<{ locale: string }> {
  return i18n.locales.map((locale) => ({ locale }))
}

// Create SEO/metadata dynamically based on active locale
export async function generateMetadata(props: LayoutProps): Promise<Metadata> {
  const { locale } = await props.params
  const t = await getTranslations({ locale, namespace: 'metadata' })

  const title = t('site-title')
  const description = t('site-description')

  return {
    metadataBase: new URL(SITE_URL),
    title: {
      default: title,
      template: `%s | ${title}`
    },
    description,
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1
      }
    },
    manifest: '/favicon/site.webmanifest',
    twitter: {
      card: 'summary_large_image',
      title: SITE_NAME,
      description,
      creator: '@fintrack',
      images: [
        {
          url: '/images/og.png',
          width: 1200,
          height: 630,
          alt: description
        }
      ]
    },
    keywords: SITE_KEYWORDS,
    creator: '@willgravinadev',
    openGraph: {
      url: SITE_URL,
      type: 'website',
      title,
      siteName: title,
      description,
      locale,
      images: [
        {
          url: '/images/og.png',
          width: 1200,
          height: 630,
          alt: description,
          type: 'image/png'
        }
      ]
    },
    icons: {
      icon: '/favicon/favicon.svg',
      shortcut: '/favicon/favicon.svg',
      apple: [
        {
          url: '/favicon/apple-touch-icon.png',
          sizes: '180x180',
          type: 'image/png'
        }
      ],
      other: [
        {
          rel: 'icon',
          type: 'image/png',
          sizes: '16x16',
          url: '/favicon/favicon-16x16.png'
        },
        {
          rel: 'icon',
          type: 'image/png',
          sizes: '32x32',
          url: '/favicon/favicon-32x32.png'
        }
      ]
    }
  }
}

// Example: define custom theme color handling
export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: 'white' },
    { media: '(prefers-color-scheme: dark)', color: 'black' }
  ]
}

export default async function Layout(
  props: Readonly<{
    children: React.ReactNode
    params: Promise<{
      locale: string
    }>
  }>
): Promise<JSX.Element> {
  const { locale } = await props.params
  setRequestLocale(locale)

  const messages = await getMessages()
  return (
    <html lang={locale} className={cn(lufga.className)} suppressHydrationWarning>
      <body className='font-lufga min-h-screen scroll-smooth bg-gradient-to-bl from-[#152331] to-[#000000] font-light antialiased'>
        <NuqsAdapter>
          <Providers>
            <NextIntlClientProvider messages={messages}>{props.children}</NextIntlClientProvider>
          </Providers>
        </NuqsAdapter>
        <SpeedInsights />
        <Analytics />
      </body>
    </html>
  )
}
