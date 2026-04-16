import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";

function createRedisClient(): Redis | null {
  const url = process.env.UPSTASH_REDIS_REST_URL;
  const token = process.env.UPSTASH_REDIS_REST_TOKEN;

  if (!url || !token) {
    if (process.env.NEXT_PHASE !== "phase-production-build") {
      console.warn(
        "Missing UPSTASH_REDIS_REST_URL or UPSTASH_REDIS_REST_TOKEN"
      );
    }
    return null;
  }

  return new Redis({ url, token });
}

const redis = createRedisClient();

const registrationLimiter = redis
  ? new Ratelimit({
      redis,
      limiter: Ratelimit.slidingWindow(5, "1 h"),
      analytics: true,
      prefix: "ratelimit:registration",
    })
  : null;

const apiLimiter = redis
  ? new Ratelimit({
      redis,
      limiter: Ratelimit.slidingWindow(60, "1 m"),
      analytics: true,
      prefix: "ratelimit:api",
    })
  : null;

interface RateLimitResult {
  success: boolean;
  limit: number;
  remaining: number;
  reset: number;
}

export async function checkRegistrationRateLimit(
  ip: string
): Promise<RateLimitResult> {
  if (!registrationLimiter) {
    return { success: true, limit: 5, remaining: 5, reset: 0 };
  }

  const result = await registrationLimiter.limit(ip);
  return {
    success: result.success,
    limit: result.limit,
    remaining: result.remaining,
    reset: result.reset,
  };
}

export async function checkApiRateLimit(
  identifier: string
): Promise<RateLimitResult> {
  if (!apiLimiter) {
    return { success: true, limit: 60, remaining: 60, reset: 0 };
  }

  const result = await apiLimiter.limit(identifier);
  return {
    success: result.success,
    limit: result.limit,
    remaining: result.remaining,
    reset: result.reset,
  };
}
