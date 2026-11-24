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

  // One quick retry only: a missing database should not stall a form for seconds.
  return new Redis({ url, token, retry: { retries: 1 } });
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

const cdCheckoutLimiter = redis
  ? new Ratelimit({
      redis,
      limiter: Ratelimit.slidingWindow(20, "1 h"),
      analytics: true,
      prefix: "ratelimit:cd-checkout",
    })
  : null;

interface RateLimitResult {
  success: boolean;
  limit: number;
  remaining: number;
  reset: number;
}

/**
 * Runs a limiter but never lets a rate-limit outage take a form down.
 * If Redis is unreachable (deleted database, network error), the request is
 * allowed and the failure is logged.
 */
async function safeLimit(
  limiter: Ratelimit | null,
  key: string,
  fallbackLimit: number
): Promise<RateLimitResult> {
  const open = {
    success: true,
    limit: fallbackLimit,
    remaining: fallbackLimit,
    reset: 0,
  };
  if (!limiter) return open;

  try {
    const result = await limiter.limit(key);
    return {
      success: result.success,
      limit: result.limit,
      remaining: result.remaining,
      reset: result.reset,
    };
  } catch (error) {
    console.error(
      "Rate limiter unavailable, allowing request:",
      error instanceof Error ? error.message : error
    );
    return open;
  }
}

export async function checkRegistrationRateLimit(
  ip: string
): Promise<RateLimitResult> {
  return safeLimit(registrationLimiter, ip, 5);
}

export async function checkApiRateLimit(
  identifier: string
): Promise<RateLimitResult> {
  return safeLimit(apiLimiter, identifier, 60);
}

/** Contemplating Death checkout: families often register several people from one IP. */
export async function checkCdCheckoutRateLimit(
  ip: string
): Promise<RateLimitResult> {
  return safeLimit(cdCheckoutLimiter, ip, 20);
}
