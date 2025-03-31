import type { JSX } from 'react'

import { useTranslations } from '@fintrack/i18n/client'
import { Button, Card, Separator } from '@fintrack/ui'
import Link from 'next/link'
import { PiGithubLogoLight, PiGoogleLogoLight } from 'react-icons/pi'

import { FormSignInComponent } from './_components/form-sign-in.component'

export default function SignInPage(): JSX.Element {
  const t = useTranslations()

  return (
    <div className='flex h-[calc(100vh-3.75rem)] flex-col items-center justify-center'>
      <Card className='flex w-full max-w-sm flex-col items-center justify-center gap-6 px-4 py-6'>
        <div className='flex flex-col items-center justify-center gap-1'>
          <h1 className='text-3xl font-bold'>{t('sign-in.title')}</h1>
          <p className='text-muted-foreground text-base'>{t('sign-in.description')}</p>
        </div>
        <FormSignInComponent />

        <div className='flex w-full items-center justify-center gap-2'>
          <Separator className='bg-card-foreground/50 my-2 flex-1' />
          <span className='text-muted-foreground'>{t('sign-in.or')}</span>
          <Separator className='bg-card-foreground/50 my-2 flex-1' />
        </div>

        <div className='flex w-full items-center justify-center gap-4'>
          <Link href='/sign-in'>
            <Button
              className='border-foreground/50 flex-1 cursor-pointer'
              variant='outline'
              aria-label='Login with Google'
              size='icon'
            >
              <PiGoogleLogoLight className='text-foreground' size={16} aria-hidden='true' />
            </Button>
          </Link>
          <Link href='/sign-in'>
            <Button
              className='border-foreground/50 flex-1 cursor-pointer'
              type='button'
              variant='outline'
              aria-label='Login with GitHub'
              size='icon'
            >
              <PiGithubLogoLight className='text-foreground' size={16} aria-hidden='true' />
            </Button>
          </Link>
        </div>
      </Card>
    </div>
  )
}
