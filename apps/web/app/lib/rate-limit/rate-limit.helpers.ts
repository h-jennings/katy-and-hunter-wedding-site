import "server-only";
import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";
import { err, fromPromise, ok } from "neverthrow";
import { headers } from "next/headers";
import { rateLimitError } from "~/app/lib/errors/rate-limit.errors";

const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL!,
  token: process.env.UPSTASH_REDIS_REST_TOKEN!,
});

export const lookupRateLimit = new Ratelimit({
  redis,
  limiter: Ratelimit.slidingWindow(10, "1 m"), // 10 requests per minute
  analytics: true,
  prefix: "ratelimit:lookup",
});

export const verifyCodeRateLimit = new Ratelimit({
  redis,
  limiter: Ratelimit.slidingWindow(5, "1 m"), // 5 requests per minute
  analytics: true,
  prefix: "ratelimit:verifyCode",
});

export async function getRateLimitIdentifier(): Promise<string> {
  const headersList = await headers();

  const forwardedFor = headersList.get("x-forwarded-for");
  const realIp = headersList.get("x-real-ip");
  const cfConnectingIp = headersList.get("cf-connecting-ip");

  const ip = forwardedFor?.split(",")[0] ?? realIp ?? cfConnectingIp;

  return ip ?? "anonymous";
}

export async function checkRateLimit(limiter: Ratelimit, identifier?: string) {
  const id = identifier ?? (await getRateLimitIdentifier());
  const { success, reset } = await limiter.limit(id);

  if (!success) {
    const resetDate = new Date(reset);
    const minutesUntilReset = Math.ceil((reset - Date.now()) / 1000 / 60);
    console.warn(`[Rate Limit]: Exceeded for ${id}, resets at ${resetDate.toISOString()}`);

    throw minutesUntilReset;
  }
}
