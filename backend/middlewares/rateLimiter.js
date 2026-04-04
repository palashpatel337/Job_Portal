import { Ratelimit } from "@upstash/ratelimit";
import { redis } from "../config/redis.js";

export const loginLimiter = new Ratelimit({
  redis,
  limiter: Ratelimit.slidingWindow(1, "1 m"), // 5 requests per minute
});

export const registerLimiter = new Ratelimit({
  redis,
  limiter: Ratelimit.slidingWindow(3, "1 m"), // 3 requests per minute
});

export const applyLimiter = new Ratelimit({
  redis,
  limiter: Ratelimit.slidingWindow(10, "1 m"), // 10 applies per minute
});
