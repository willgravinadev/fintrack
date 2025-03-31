import type { NextRequest, NextResponse } from 'next/server'

import { i18nMiddleware } from '@fintrack/i18n/middleware'

export default function middleware(request: NextRequest): NextResponse {
  const csp = `
    default-src 'self';
    script-src 'self' 'unsafe-inline' 'unsafe-eval' *.gravina.dev vercel.live va.vercel-scripts.com unpkg.com;
    style-src 'self' 'unsafe-inline' vercel.live;
    img-src * blob: data:;
    font-src 'self' data: assets.vercel.com vercel.live;
    object-src 'none';
    base-uri 'self';
    form-action 'self';
    connect-src *;
    media-src 'self';
    frame-ancestors 'none';
    frame-src vercel.live;
    block-all-mixed-content;
    upgrade-insecure-requests;
    worker-src blob: 'self';
  `

  const response = i18nMiddleware(request)

  response.headers.set('Content-Security-Policy', csp.replaceAll('\n', ''))

  return response
}

export const config = {
  /*
   * Match all request paths except for the ones starting with:
   * - api (API routes)
   * - _next/static (static files)
   * - _next/image (image optimization files)
   * - _vercel (Vercel internal)
   * - favicon.ico (favicon file)
   * - folders in public (which resolve to /foldername)
   * - sitemap.xml
   * - robots.txt
   * - rss.xml
   */
  matcher: [
    '/((?!api|_next/static|_next/image|_vercel|og|favicon|fonts|images|videos|favicon.ico|sitemap.xml|robots.txt|rss.xml).*)'
  ]
}
