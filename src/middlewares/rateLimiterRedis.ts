import * as dotenv from "dotenv";
import { NextFunction, Response, Request } from "express";
import { RateLimiterRedis } from "rate-limiter-flexible";
import * as redis from "redis";

import { AppError } from "../errors/AppError";

dotenv.config();

const redisClient = redis.createClient({
  host: process.env.REDIS_HOST,
  port: process.env.REDIS_PORT,
});

const rateLimiter = new RateLimiterRedis({
  storeClient: redisClient,
  keyPrefix: "rateLimiter",
  points: 1,
  duration: 5,
});

export async function rateLimiterMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    await rateLimiter.consume(req.ip);
    return next();
  } catch (e) {
    throw new AppError("To many requests", 429);
  }
}
