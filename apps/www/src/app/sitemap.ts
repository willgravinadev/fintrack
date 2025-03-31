import type { MetadataRoute } from 'next'

import { supportedLanguages } from '@fintrack/i18n/config'

import { SITE_URL } from '@/utils/constants.util'
import { getLocalizedPath } from '@/utils/get-localized-path.util'

const sitemap = (): MetadataRoute.Sitemap => {
  const routes = ['', '/pricing', '/about', '/dashboard']

  return supportedLanguages.flatMap((locale) => {
    return routes.map((route) => ({
      url: `${SITE_URL}${getLocalizedPath({ slug: route, locale: locale.code })}`,
      lastModified: new Date()
    }))
  })
}

export default sitemap
