import express from "express";
const router = express.Router();

import redis from "../utils/redis";
import { userExtractor } from "../utils/middleware";

router.get("/wait", userExtractor, async (_req, res) => {
  const id = res.locals.id;

  const redisRes = await redis.blpop(`user:${id}:wait`, 60);

  res.send(redisRes);
});

export default router;
