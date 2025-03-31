import type { JSX, ReactNode } from 'react'

import { isAuthenticated } from '@/utils/auth.util'

import { NavBarComponent } from './_components/navbar.component'

export default async function UnauthenticatedLayout(
  props: Readonly<{ children: ReactNode }>
): Promise<JSX.Element> {
  const authenticated = await isAuthenticated()
  return (
    <div className='flex min-h-screen w-full flex-col'>
      <NavBarComponent isAuthenticated={authenticated} />
      <main className='mt-15 z-100 flex-1'>{props.children}</main>
    </div>
  )
}
