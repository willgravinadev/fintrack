'use client'

import type { Metadata } from 'next'
import type { JSX } from 'react'

import { useTranslations } from '@fintrack/i18n/client'

import { GoToHomepage } from '@/components/go-to-homepage'

export const metadata: Metadata = {
  title: '404'
}

export default function NotFound(): JSX.Element {
  const t = useTranslations()

  return (
    <div className='mt-52 mb-40 flex flex-col items-center justify-center gap-12'>
      <h1 className='text-center text-6xl font-bold'>{t('not-found')}</h1>
      <GoToHomepage />
    </div>
  )
}
