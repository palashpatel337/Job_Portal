import client from "../config/valkey.js";

// Generic rate limit middleware factory
export const rateLimit = (maxRequests = 5, windowSeconds = 60) => {
  return async (req, res, next) => {
    try {
      // Create a unique key based on IP address and endpoint
      const key = `ratelimit:${req.ip || req.connection.remoteAddress}:${req.path}`;

      // Get current count
      const current = await client.incr(key);

      // Set expiration on first request
      if (current === 1) {
        await client.expire(key, windowSeconds);
      }

      // Add rate limit headers
      res.set("X-RateLimit-Limit", maxRequests);
      res.set("X-RateLimit-Remaining", Math.max(0, maxRequests - current));
      res.set("X-RateLimit-Reset", new Date(Date.now() + windowSeconds * 1000));

      // Check if limit exceeded
      if (current > maxRequests) {
        return res.status(429).json({
          message: `Too many requests. Please try again after ${windowSeconds} seconds`,
          success: false,
        });
      }

      next();
    } catch (error) {
      console.log("Rate limit middleware error:", error);
      // If Redis fails, allow request to continue
      next();
    }
  };
};

// Specific rate limiters for different endpoints
export const loginRateLimit = rateLimit(5, 900); // 5 attempts per 15 minutes
export const applyJobRateLimit = rateLimit(30, 86400); // 3 applications per 24 hours
