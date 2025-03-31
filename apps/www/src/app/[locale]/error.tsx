'use client'

import type { JSX } from 'react'

import { useTranslations } from '@fintrack/i18n/client'
import { Button } from '@fintrack/ui'

const Page = (props: { error: Error & { digest?: string }; reset: () => void }): JSX.Element => {
  const { error, reset } = props
  const t = useTranslations()

  return (
    <div className='space-y-4 px-2 py-8'>
      <h1 className='text-2xl font-bold'>{t('error.something-went-wrong')}</h1>
      <Button onClick={reset}>{t('error.try-again')}</Button>
      <p className='break-words rounded-md bg-zinc-100 p-4 dark:bg-zinc-800'>{error.message}</p>
    </div>
  )
}

export default Page
