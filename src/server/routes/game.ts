import express from "express";
const router = express.Router();

import redis from "../utils/redis";
import { userExtractor } from "../utils/middleware";
import {
  subscribeToChannel,
  waitForMessage,
  removeListener,
} from "../utils/subscribe";

router.get("/wait", userExtractor, async (_req, res) => {
  const id = res.locals.id;

  const key = `user:${id}:wait`;
  subscribeToChannel(key);
  const subResponse = await waitForMessage(key);
  removeListener(subResponse._listener);

  // TODO format response
  res.send(subResponse.message);
});

router.get("/challenge/:id", userExtractor, async (req, res) => {
  const challengeId = req.params.id;
  const { username } = res.locals;

  const key = `user:${challengeId}:wait`;
  // TODO change sent info
  redis.publish(key, username);

  // TODO format response
  res.send("message sent");
});

export default router;
