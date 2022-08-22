import express from "express";
const router = express.Router();

import gameChallengeRouter from "./gameChallenge";
import redis, { gameKey } from "../services/redis";
import userExtractor from "../middleware/userExtractor";
import { getMessage, publishMessage } from "../services/subscribe";
import { isGameFinished } from "../utils/game";
import { GameState, BaseParams } from "../utils/types";
import gameStateSchema from "../models/gameState";

router.use(userExtractor);
router.use(gameChallengeRouter);

// play turn
router.post<BaseParams, GameState>("/:id", async (req, res) => {
  const gameId = req.params.id;
  const { id } = res.locals;
  const position = Number(req.body.position);

  // const gameKey = `game:${gameId}`;
  const key = gameKey(gameId);
  // const game = await redis.hgetall(gameKey);
  const redisGameState = await redis.hgetall(key);

  if (Object.keys(gameStateSchema).length === 0)
    throw new Error("invalidGameId");
  const gameState = await gameStateSchema.validateAsync(redisGameState);

  if (gameState.isOver) throw new Error("finishedGame");

  const { activePlayer } = gameState;

  if (gameState[activePlayer] !== id) throw new Error("notActivePlayer");
  if (position in gameState) throw new Error("playedPosition");
  if (typeof position !== "number" || position < 0 || position > 8)
    throw new Error("invalidPosition");

  // update game state
  const playerPiece = gameState[activePlayer + "Piece"];
  const newActivePlayer = activePlayer === "playerA" ? "playerB" : "playerA";
  await redis
    .pipeline()
    .hincrby(key, "move", 1)
    .hmset(key, position, playerPiece, "activePlayer", newActivePlayer)
    .exec();

  gameState[position] = playerPiece;
  const winner = isGameFinished(gameState);
  // const gameChannel = gameKey + ":wait";
  const gameChannel = gameKey(gameId, true);
  if (winner) {
    // announce that game has ended
    // TODO: fix winner message
    await redis.hset(key, "isOver", "true");
    await redis.publish(gameChannel, "winner," + winner);
  } else {
    await publishMessage(gameChannel, { play: playerPiece });
    await getMessage(gameChannel);
  }

  const redisNewGame = await redis.hgetall(key);
  const newGameState = await gameStateSchema.validateAsync(redisNewGame);
  res.send(newGameState);
});

// wait for first move
router.get<BaseParams, GameState>("/:id/wait", async (req, res) => {
  const { id } = req.params;
  const key = gameKey(id);
  const channel = gameKey(id, true);
  await getMessage(channel);

  const redisGameState = await redis.hgetall(key);
  const gameState = await gameStateSchema.validateAsync(redisGameState);

  res.send(gameState);
});

export default router;
