import { URL } from 'node:url'

import { env } from '@fintrack/env'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

import { COOKIE_KEYS } from './constants.util'

const getBody = <T>(c: Response | Request): Promise<T> => {
  const contentType = c.headers.get('content-type')

  if (contentType?.includes('application/json')) {
    return c.json()
  }

  if (contentType?.includes('application/pdf')) {
    return c.blob() as Promise<T>
  }

  return c.text() as Promise<T>
}

// NOTE: Update just base url
const getUrl = (contextUrl: string): string => {
  const url = new URL(contextUrl)
  const pathname = url.pathname
  const search = url.search
  const baseUrl = env.NEXT_PUBLIC_CORE_API_URL
  const requestUrl = new URL(`${baseUrl}${pathname}${search}`)
  return requestUrl.toString()
}

// NOTE: Add headers
const getHeaders = async (headers?: HeadersInit): Promise<HeadersInit> => {
  const cookieStore = await cookies()
  const token = cookieStore.get(COOKIE_KEYS.ACCESS_TOKEN)?.value

  return {
    // eslint-disable-next-line @typescript-eslint/no-misused-spread -- headers is an object
    ...headers,
    Authorization: `Bearer ${token}`
  }
}

export const customFetch = async <T>(url: string, options: RequestInit): Promise<T> => {
  const requestUrl = getUrl(url)
  const requestHeaders = await getHeaders(options.headers)
  const requestInit: RequestInit = {
    ...options,
    headers: requestHeaders
  }
  const request = new Request(requestUrl, requestInit)
  const response = await fetch(request)
  if (response.status === 401) {
    redirect('/api/logout')
  }
  const data = await getBody<T>(response)
  return { status: response.status, data, headers: response.headers } as T
}
