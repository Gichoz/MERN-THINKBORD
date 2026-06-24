import { Ratelimit } from '@upstash/ratelimit'
import { Redis } from '@upstash/redis'
import dotenv from 'dotenv'
dotenv.config()


const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL,
  token: process.env.UPSTASH_REDIS_REST_TOKEN,
})

// Allow 100 requests per 60 seconds
export const ratelimiter = new Ratelimit({
  redis: redis,
  limiter: Ratelimit.fixedWindow(100, '60 s'),
  analytics: true,
})
