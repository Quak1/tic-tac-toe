import express from "express";
const router = express.Router();

import redis from "../utils/redis";

router.post("/", async (req, res) => {
  const { username } = req.body;
  if (!username) return res.sendStatus(401);

  const id = await redis.incr("user:id");
  await redis.set(`user:${id}`, username);

  res.send({ username, id });
});

export default router;
