import type { Metadata } from 'next'
import type { JSX } from 'react'
import type { WebSite, WithContext } from 'schema-dts'

import { i18n } from '@fintrack/i18n/config'
import { Link } from '@fintrack/i18n/routing'
import { getTranslations, setRequestLocale } from '@fintrack/i18n/server'
import { Button } from '@fintrack/ui'

import {
  SITE_GITHUB_URL,
  SITE_INSTAGRAM_URL,
  SITE_KEYWORDS,
  SITE_LINKEDIN_URL,
  SITE_NAME,
  SITE_URL,
  SITE_X_URL
} from '@/utils/constants.util'
import { getLocalizedPath } from '@/utils/get-localized-path.util'

type PageProps = Readonly<{
  params: Promise<{
    locale: string
  }>
  searchParams: Promise<Record<string, string | string[] | undefined>>
}>

export const generateStaticParams = (): Array<{ locale: string }> => {
  return i18n.locales.map((locale) => ({ locale }))
}

export const generateMetadata = async (props: PageProps): Promise<Metadata> => {
  const { locale } = await props.params

  return {
    alternates: {
      canonical: getLocalizedPath({ slug: '', locale })
    }
  }
}

export default async function HomePage(props: PageProps): Promise<JSX.Element> {
  const { locale } = await props.params
  setRequestLocale(locale)
  const t = await getTranslations()
  const url = `${SITE_URL}${getLocalizedPath({ slug: '', locale })}`

  const jsonLd: WithContext<WebSite> = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: t('metadata.site-title'),
    description: t('metadata.site-description'),
    url,
    author: {
      '@type': 'Person',
      name: SITE_NAME,
      url: SITE_URL,
      sameAs: [SITE_INSTAGRAM_URL, SITE_X_URL, SITE_GITHUB_URL, SITE_LINKEDIN_URL]
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': SITE_URL
    },
    inLanguage: locale,
    copyrightYear: new Date().getFullYear(),
    keywords: SITE_KEYWORDS,
    dateCreated: '2025-03-29',
    dateModified: new Date().toISOString()
  }

  return (
    <>
      <script
        type='application/ld+json'
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className='flex h-[calc(100vh-3.75rem)] flex-col items-center justify-center gap-8'>
        <h1 className='max-w-2xl text-pretty text-center text-6xl font-light tracking-tighter'>
          {t('home.title')}
        </h1>

        <p className='text-muted-foreground max-w-2xl text-pretty text-center text-lg leading-relaxed tracking-tight md:text-xl'>
          {t('home.description')}
        </p>

        <Link href='/sign-in'>
          <Button
            className='max-w-fit cursor-pointer'
            size='lg'
            isPending={false}
            isSuccess={false}
          >
            {t('home.start-now')}
          </Button>
        </Link>
      </div>
    </>
  )
}
