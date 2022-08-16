import express from "express";
const router = express.Router();

import redis from "../utils/redis";
import { userExtractor } from "../utils/middleware";
import { getMessage } from "../utils/subscribe";

router.get("/wait", userExtractor, async (_req, res) => {
  const id = res.locals.id;

  const key = `user:${id}:wait`;
  const subResponse = await getMessage(key);
  const opponent = subResponse.message.split(",");

  res.send({
    opponent: {
      username: opponent[0],
      id: opponent[1],
    },
  });
});

router.get("/challenge/:id", userExtractor, async (req, res) => {
  const challengeId = req.params.id;
  const { username, id } = res.locals;

  const channel = `user:${challengeId}:wait`;
  redis.publish(channel, `${username},${id}`);

  const key = `user:${id}:wait`;
  const subResponse = await getMessage(key);

  if (subResponse.message !== "accept") {
    res.send({ message: "challenge denied" });
  }

  const gameId = await redis.incr("game:id");
  const playerAPiece = Math.floor(Math.random() * 2) ? "x" : "o";
  const gameObject = {
    id: gameId,
    playerA: challengeId,
    playerB: id,
    playerAPiece,
    playerBPiece: playerAPiece === "x" ? "o" : "x",
    move: 0,
  };
  await redis.hmset(`game:${gameId}`, gameObject);

  redis.publish(channel, String(gameId));

  res.send(gameObject);
});

router.get("/challenge", userExtractor, async (req, res) => {
  const { id } = res.locals;
  const { reply, opponentId } = req.query;
  if (!reply || !opponentId) res.sendStatus(400);

  const channel = `user:${opponentId}:wait`;
  redis.publish(channel, reply as string);

  if (reply !== "accept") {
    res.send({ message: "challenge denied" });
  }

  const key = `user:${id}:wait`;
  const gameId = await getMessage(key);

  const game = await redis.hgetall(`game:${gameId.message}`);

  res.send(game);
});

export default router;
