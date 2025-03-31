import { env } from '@fintrack/env'

export const COOKIE_KEYS = {
  ACCESS_TOKEN: 'fintrack-access-token'
} as const

export const COOKIE_CONFIG = {
  MAX_AGE: 60 * 60 * 24 * 7, // 7 days
  PATH: '/'
} as const

export const isProduction = env.NODE_ENV === 'production'

export const SITE_URL = isProduction ? 'https://fintrack.gravina.dev' : 'http://localhost:3000'

export const GITHUB_USERNAME = 'gravinawill'

export const SITE_NAME = 'Fintrack'
export const SITE_KEYWORDS = [
  'Fintrack',
  'Finance',
  'Investing',
  'Stocks',
  'Crypto',
  'ETFs',
  'Tracking',
  'Portfolio',
  'Dashboard'
]

export const SITE_GITHUB_URL = 'https://github.com/willgravinadev'
export const SITE_INSTAGRAM_URL = 'https://www.instagram.com/willgravinadev'
export const SITE_X_URL = 'https://x.com/willgravinadev'
export const SITE_YOUTUBE_URL = 'https://www.youtube.com/@willgravinadev'
export const SITE_LINKEDIN_URL = 'https://www.linkedin.com/in/willgravinadev'
