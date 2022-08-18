import express from "express";
const router = express.Router();

import redis from "../utils/redis";
import { userExtractor } from "../utils/middleware";
import { getMessage } from "../utils/subscribe";
import { isGameFinished } from "../utils/game";
import { GAME_TIMEOUT } from "../utils/config";

router.use(userExtractor);

router.get("/wait", async (_req, res) => {
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

router.get("/challenge/:id", async (req, res) => {
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
    activePlayer: playerAPiece === "x" ? "playerA" : "playerB",
    move: 0,
    isOver: false,
  };

  await redis.hmset(`game:${gameId}`, gameObject);
  await redis.expire(`game:${gameId}`, GAME_TIMEOUT);

  redis.publish(channel, String(gameId));

  res.send(gameObject);
});

router.get("/challenge", async (req, res) => {
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

router.post("/:gameId", async (req, res) => {
  const { gameId } = req.params;
  const { id } = res.locals;
  const position = Number(req.body.position);

  const gameKey = `game:${gameId}`;
  const game = await redis.hgetall(gameKey);

  if (Object.keys(game).length === 0) throw new Error("invalidGameId");
  if (game.isOver.toLowerCase() === "true") throw new Error("finishedGame");

  const { activePlayer } = game;

  if (Number(game[activePlayer]) !== id) throw new Error("notActivePlayer");
  if (position in game) throw new Error("playedPosition");
  if (typeof position !== "number" || position < 0 || position > 8)
    throw new Error("invalidPosition");

  // update game state
  const playerPiece = game[activePlayer + "Piece"];
  const newActivePlayer = activePlayer === "playerA" ? "playerB" : "playerA";
  await redis
    .pipeline()
    .hincrby(gameKey, "move", 1)
    .hmset(gameKey, position, playerPiece, "activePlayer", newActivePlayer)
    .exec();

  game[position] = playerPiece;
  const winner = isGameFinished(game);
  const gameChannel = gameKey + ":wait";
  if (winner) {
    // announce that game has ended
    await redis.hset(gameKey, "isOver", "true");
    await redis.publish(gameChannel, "winner," + winner);
  } else {
    await redis.publish(gameChannel, playerPiece);
    await getMessage(gameChannel);
  }

  const newGame = await redis.hgetall(gameKey);
  res.send({ game: newGame });
});

router.get("/:gameId/wait", async (req, res) => {
  const { gameId } = req.params;
  const gameKey = `game:${gameId}`;
  const gameChannel = `${gameKey}:wait`;
  await getMessage(gameChannel);

  const game = await redis.hgetall(gameKey);
  res.send({ game });
});

export default router;
