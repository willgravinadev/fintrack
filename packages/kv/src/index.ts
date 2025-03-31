import { Ratelimit } from '@upstash/ratelimit'
import { Redis } from '@upstash/redis'

export const redis = new Redis({
  url: '',
  token: ''
})

export const ratelimit = new Ratelimit({
  redis,
  limiter: Ratelimit.slidingWindow(50, '10 s'),
  analytics: true
})

export const redisKeys = {
  postViews: (slug: string) => `post:views:${slug}`,
  postViewCount: 'post:views:count',
  postLikes: (slug: string) => `post:likes:${slug}`,
  postLikeCount: 'post:likes:count',
  currentUserLikes: (slug: string, sessionId: string) =>
    `post:likes:${slug}:current-user-likes:${sessionId}`
}
