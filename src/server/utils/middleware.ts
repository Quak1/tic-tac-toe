import { RequestHandler, ErrorRequestHandler } from "express";
import jwt from "jsonwebtoken";

import redis from "./redis";
import { SECRET } from "./config";
import { TokenFields } from "./types";

export const errorHandler: ErrorRequestHandler = (error, _req, res, next) => {
  console.log("errorHandler", error);

  /* if (error.name === "ValidationError") {
    return res.status(400).json({ error: error.message });
  } */

  res.status(403);
  res.send({ error: "unknown error" });
};

export const userExtractor: RequestHandler = async (req, res, next) => {
  const authorization = req.get("authorization");
  if (!authorization) next(new Error("missingToken"));
  else {
    if (!authorization.toLowerCase().startsWith("bearer "))
      next(new Error("invalidToken"));

    const token = authorization.substring(7);
    const decodedToken = jwt.verify(token, SECRET) as TokenFields;

    if (!decodedToken.id) next(new Error("invalidToken"));

    const user = await redis.get("user:" + decodedToken.id);

    if (!(decodedToken.username === user)) next(new Error("invalidUser"));

    res.locals.id = decodedToken.id;
    res.locals.username = decodedToken.username;
    next();
  }
};
