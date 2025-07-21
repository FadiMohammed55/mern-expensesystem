import redis from "../config/redis.js";

const rateLimit = async (req, res, next) => {
  try {
    const userKey = req.user ? req.user.id : req.ip;
    const key = `ratelimit:${userKey}`;
    const count = await redis.incr(key);
    if (count === 1) await redis.expire(key, 60);
    if (count > 5)
      return res.status(429).json({ message: "Too many requests, slow down!" });
    next();
  } catch (error) {
    console.error("Rate Limiting Error", error);
    res.status(500).json({ message: "Rate limiting error" });
  }
};

export default rateLimit;
