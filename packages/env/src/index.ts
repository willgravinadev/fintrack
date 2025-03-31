import { createEnv } from '@t3-oss/env-nextjs'
import { vercel } from '@t3-oss/env-nextjs/presets-zod'
import { z } from 'zod'

export const flags = {
  //  comment: process.env.NEXT_PUBLIC_FLAG_COMMENT === 'true',
  // auth: process.env.NEXT_PUBLIC_FLAG_AUTH === 'true',
  // stats: process.env.NEXT_PUBLIC_FLAG_STATS === 'true',
  // spotify: process.env.NEXT_PUBLIC_FLAG_SPOTIFY === 'true',
  // analytics: process.env.NEXT_PUBLIC_FLAG_ANALYTICS === 'true',
  // guestbookNotification: process.env.NEXT_PUBLIC_FLAG_GUESTBOOK_NOTIFICATION === 'true',
  // likeButton: process.env.NEXT_PUBLIC_FLAG_LIKE_BUTTON === 'true'
}

export const env = createEnv({
  skipValidation: !!process.env.CI,
  extends: [vercel()],

  shared: {
    NODE_ENV: z.enum(['local', 'development', 'production', 'test']).default('local'),
    CORE_API_PORT: z.number().default(2222),
    NEXT_PUBLIC_CORE_API_URL: z.string().url(),
    JWT_SECRET: z.string().min(1),
    JWT_ISSUER: z.string().min(1),
    JWT_ALGORITHM: z.enum(['HS256', 'HS384', 'HS512']),
    JWT_EXPIRES_IN_DAYS: z.coerce.number().min(1),
    NEXT_PUBLIC_GOOGLE_TAG_MANAGER_ID: z.string().min(1),
    NEXT_PUBLIC_GOOGLE_ANALYTICS_ID: z.string().min(1)
  },

  server: {
    // ...(flags.spotify
    //   ? {
    //       SPOTIFY_CLIENT_ID: z.string().min(1),
    //       SPOTIFY_CLIENT_SECRET: z.string().min(1),
    //       SPOTIFY_REFRESH_TOKEN: z.string().min(1)
    //     }
    //   : {}),

    // ...(flags.auth
    //   ? {
    //       BETTER_AUTH_SECRET: z.string().min(1),
    //       BETTER_AUTH_URL: z.string().url(),
    //       GOOGLE_CLIENT_ID: z.string().min(1),
    //       GOOGLE_CLIENT_SECRET: z.string().min(1),
    //       GITHUB_CLIENT_ID: z.string().min(1),
    //       GITHUB_CLIENT_SECRET: z.string().min(1)
    //     }
    //   : {}),

    // ...(flags.stats
    //   ? {
    //       GOOGLE_API_KEY: z.string().min(1),
    //       GITHUB_TOKEN: z.string().min(1),
    //       WAKATIME_API_KEY: z.string().min(1)
    //     }
    //   : {}),

    // ...(flags.comment
    //   ? { RESEND_API_KEY: z.string().min(1), AUTHOR_EMAIL: z.string().email() }
    //   : {}),

    // ...(flags.guestbookNotification
    //   ? {
    //       DISCORD_WEBHOOK_URL: z.string().url()
    //     }
    //   : {}),

    // ...(flags.likeButton
    //   ? {
    //       IP_ADDRESS_SALT: z.string().min(1)
    //     }
    //   : {}),

    DATABASE_URL: z.string().url()
    // UPSTASH_REDIS_REST_URL: z.string().url(),
    // UPSTASH_REDIS_REST_TOKEN: z.string().min(1),
    // REACT_SCAN_MONITOR_API_KEY: z.string().optional()
  },
  client: {
    // ...(flags.analytics
    //   ? {
    //       NEXT_PUBLIC_UMAMI_URL: z.string().url(),
    //       NEXT_PUBLIC_UMAMI_WEBSITE_ID: z.string().uuid()
    //     }
    //   : {}),
    // NEXT_PUBLIC_FLAG_COMMENT: z.string().min(1).optional(),
    // NEXT_PUBLIC_FLAG_AUTH: z.string().min(1).optional(),
    // NEXT_PUBLIC_FLAG_STATS: z.string().min(1).optional(),
    // NEXT_PUBLIC_FLAG_SPOTIFY: z.string().min(1).optional(),
    // NEXT_PUBLIC_FLAG_ANALYTICS: z.string().min(1).optional(),
    // NEXT_PUBLIC_FLAG_GUESTBOOK_NOTIFICATION: z.string().min(1).optional(),
    // NEXT_PUBLIC_FLAG_LIKE_BUTTON: z.string().min(1).optional(),
    // NEXT_PUBLIC_VERCEL_GIT_COMMIT_SHA: z.string().min(1).optional(),
    // NEXT_PUBLIC_VERCEL_GIT_COMMIT_REF: z.string().min(1).optional()
  },
  experimental__runtimeEnv: {
    NODE_ENV: process.env.NODE_ENV,
    CORE_API_PORT: process.env.CORE_API_PORT,
    JWT_SECRET: process.env.JWT_SECRET,
    JWT_ISSUER: process.env.JWT_ISSUER,
    JWT_ALGORITHM: process.env.JWT_ALGORITHM,
    JWT_EXPIRES_IN_DAYS: process.env.JWT_EXPIRES_IN_DAYS,
    NEXT_PUBLIC_GOOGLE_TAG_MANAGER_ID: process.env.NEXT_PUBLIC_GOOGLE_TAG_MANAGER_ID,
    NEXT_PUBLIC_GOOGLE_ANALYTICS_ID: process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID,
    NEXT_PUBLIC_CORE_API_URL: process.env.NEXT_PUBLIC_CORE_API_URL
    // NEXT_PUBLIC_UMAMI_URL: process.env.NEXT_PUBLIC_UMAMI_URL,
    // NEXT_PUBLIC_UMAMI_WEBSITE_ID: process.env.NEXT_PUBLIC_UMAMI_WEBSITE_ID,

    // NEXT_PUBLIC_FLAG_COMMENT: process.env.NEXT_PUBLIC_FLAG_COMMENT,
    // NEXT_PUBLIC_FLAG_AUTH: process.env.NEXT_PUBLIC_FLAG_AUTH,
    // NEXT_PUBLIC_FLAG_STATS: process.env.NEXT_PUBLIC_FLAG_STATS,
    // NEXT_PUBLIC_FLAG_SPOTIFY: process.env.NEXT_PUBLIC_FLAG_SPOTIFY,
    // NEXT_PUBLIC_FLAG_ANALYTICS: process.env.NEXT_PUBLIC_FLAG_ANALYTICS,
    // NEXT_PUBLIC_FLAG_GUESTBOOK_NOTIFICATION: process.env.NEXT_PUBLIC_FLAG_GUESTBOOK_NOTIFICATION,
    // NEXT_PUBLIC_FLAG_LIKE_BUTTON: process.env.NEXT_PUBLIC_FLAG_LIKE_BUTTON,

    // NEXT_PUBLIC_VERCEL_GIT_COMMIT_SHA: process.env.NEXT_PUBLIC_VERCEL_GIT_COMMIT_SHA,
    // NEXT_PUBLIC_VERCEL_GIT_COMMIT_REF: process.env.NEXT_PUBLIC_VERCEL_GIT_COMMIT_REF
  },

  emptyStringAsUndefined: true
})
