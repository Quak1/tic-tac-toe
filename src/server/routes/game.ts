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
    // TODO: fix winner message
    await redis.hset(gameKey, "isOver", "true");
    await redis.publish(gameChannel, "winner," + winner);
  } else {
    await publishMessage(gameChannel, { play: playerPiece });
    await getMessage(gameChannel);
  }

  const newGame = await redis.hgetall(gameKey);
  res.send({ game: newGame });
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
