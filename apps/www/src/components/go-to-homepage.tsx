'use client'

import type { JSX } from 'react'

import { useTranslations } from '@fintrack/i18n/client'
import { buttonVariants } from '@fintrack/ui'

import { Link } from '@/components/link'

export const GoToHomepage = (): JSX.Element => {
  const t = useTranslations()

  return (
    <Link href='/' className={buttonVariants()}>
      {t('component.go-to-homepage')}
    </Link>
  )
}
