import { type CookiesFn, getCookie } from 'cookies-next'

import { COOKIE_KEYS } from './constants.util'

/**
 * Returns the server cookie store when running on the server.
 */
export const getCookieStore = async (): Promise<CookiesFn | undefined> => {
  // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition -- This is a valid check
  if (globalThis.window != undefined) return undefined
  const { cookies: serverCookies } = await import('next/headers')
  return serverCookies
}

/**
 * Generic helper to retrieve a cookie's value.
 */
export async function getCookieValue(key: string): Promise<string | null> {
  const cookieStore = await getCookieStore()
  const value = await getCookie(key, { cookies: cookieStore })

  return value ?? null
}

/**
 * Check if the user is authenticated by verifying the token cookie.
 */
export async function isAuthenticated(): Promise<boolean> {
  const token = await getCookieValue(COOKIE_KEYS.ACCESS_TOKEN)
  return !!token
}
