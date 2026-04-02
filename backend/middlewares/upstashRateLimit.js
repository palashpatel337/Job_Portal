export const upstashRateLimit = (limiter) => {
  return async (req, res, next) => {
    try {
      const ip = req.ip || req.headers["x-forwarded-for"] || "unknown";

      const { success } = await limiter.limit(ip);

      if (!success) {
        return res.status(429).json({
          success: false,
          message: "Too many requests. Please try again later.",
        });
      }

      next();
    } catch (error) {
      console.log("Rate limit error:", error);
      next(); // fail open
    }
  };
};
