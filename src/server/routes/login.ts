import jwt from "jsonwebtoken";
import express from "express";
const router = express.Router();

import redis from "../services/redis";
import { SECRET, ANON_USER_TIMEOUT } from "../config";

router.post("/", async (req, res) => {
  const { username } = req.body;
  if (!username) return res.sendStatus(401);

  const id = await redis.incr("user:id");
  await redis.set(`user:${id}`, username, "EX", ANON_USER_TIMEOUT);
  const token = jwt.sign({ username, id }, SECRET);

  res.send({ username, id, token });
});

export default router;
