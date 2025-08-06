// lib/rate-limit.js
import { Redis } from "@upstash/redis";
import "dotenv/config";

const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL,
  token: process.env.UPSTASH_REDIS_REST_TOKEN,
});

export const isRateLimited = async (key, limit = 10, windowSec = 60) => {
  const redisKey = `rate:${key}`;
  const count = await redis.incr(redisKey);
  if (count === 1) await redis.expire(redisKey, windowSec);
  return count > limit;
};
