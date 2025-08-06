import { Store } from "express-session";
import { Redis } from "@upstash/redis";
import "dotenv/config";

const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL,
  token: process.env.UPSTASH_REDIS_REST_TOKEN,
});

export class UpstashSessionStore extends Store {
  constructor() {
    super();
  }

  async get(sid, callback) {
    try {
      const data = await redis.get(`sess:${sid}`);
      callback(null, data ?? null);
    } catch (err) {
      callback(err);
    }
  }

  async set(sid, session, callback) {
    try {
      const maxAge = session.cookie?.maxAge ?? 86400000;
      await redis.set(`sess:${sid}`, session, {
        ex: Math.floor(maxAge / 1000),
      });
      callback(null);
    } catch (err) {
      callback(err);
    }
  }

  async destroy(sid, callback) {
    try {
      await redis.del(`sess:${sid}`);
      callback(null);
    } catch (err) {
      callback(err);
    }
  }
}
