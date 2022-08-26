import express from "express";
const router = express.Router();

import redis, { GAME_ID, userKey, gameKey } from "../services/redis";
import { getMessage, publishMessage } from "../services/subscribe";
import { GAME_TTL } from "../config";
import { UserDetails, BaseParams, GameState, Piece } from "../utils/types";
import gameStateSchema from "../models/gameState";

// wait for match
router.get<never, UserDetails>("/wait", async (_req, res) => {
  const id = res.locals.id;

  const key = userKey(id, true);
  const challenger = await getMessage<UserDetails>(key);

  res.send({
    username: challenger.username,
    id: challenger.id,
  });
});

// challenge player to match
router.get<BaseParams, GameState>("/:id", async (req, res) => {
  const opponent = req.params.id;
  const { username, id } = res.locals;

  const [opponentUsername, opponentId] = opponent.split("-");
  // verify that opponent exists
  const opponentData = await redis.get(userKey(opponentId));
  if (opponentUsername !== opponentData) throw new Error("invalidUser");

  // send challenge
  const opponentChannel = userKey(opponentId, true);
  await publishMessage(opponentChannel, { username, id });

  // wait for response
  const channel = userKey(id, true);
  const accept = await getMessage<boolean>(channel);

  if (!accept) throw new Error("challengeDenied");

  // setup game in db
  const gameId = await redis.incr(GAME_ID);
  const playerAPiece = Math.floor(Math.random() * 2) ? "x" : "o";
  const gameObject: GameState = {
    id: gameId,
    playerA: Number(opponentId),
    playerB: Number(id),
    playerAPiece,
    playerBPiece: playerAPiece === "x" ? "o" : "x",
    activePlayer: playerAPiece === "x" ? "playerA" : "playerB",
    move: 0,
    isOver: false,
  };

  const key = gameKey(gameId);
  await redis.hmset(key, gameObject);
  await redis.expire(key, GAME_TTL);

  // send game info
  await publishMessage(opponentChannel, { gameId });

  res.send(gameObject);
});

// answer to challenge
router.post<never, GameState>("/answer", async (req, res) => {
  const { id } = res.locals;
  const { accept, opponentId } = req.body;

  if (!opponentId) throw new Error("invalidReqBody");

  // send answer
  const opponentChannel = userKey(opponentId, true);
  await publishMessage(opponentChannel, accept);
  if (!accept) throw new Error("challengeDenied");

  // wait for game info
  const channel = userKey(id, true);
  const gameId = await getMessage<{ gameId: string }>(channel);
  const gameInfo = await redis.hgetall(gameKey(gameId.gameId));

  const game = await gameStateSchema.validateAsync(gameInfo);

  res.send(game);
});

export default router;
