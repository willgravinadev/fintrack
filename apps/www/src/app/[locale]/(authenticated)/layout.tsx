import type { ReactNode } from 'react'

import { redirect } from 'next/navigation'

import { isAuthenticated } from '@/utils/auth.util'

// import { isAuthenticated } from '../../utils/auth'

export default async function AuthenticatedLayout(
  props: Readonly<{ children: ReactNode }>
): Promise<ReactNode> {
  const authenticated = await isAuthenticated()
  if (!authenticated) {
    redirect('/sign-in')
  }
  return <>{props.children}</>
}
