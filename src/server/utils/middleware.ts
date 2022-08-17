import { RequestHandler, ErrorRequestHandler } from "express";
import jwt from "jsonwebtoken";

import redis from "./redis";
import { SECRET } from "./config";
import { TokenFields } from "./types";
import errorMessages from "./errorMessages";

export const errorHandler: ErrorRequestHandler = (error, _req, res, next) => {
  console.log("errorHandler", error);

  let errorName = error.name;
  if (errorName === "Error") errorName = error.message;

  res.status(errorMessages[errorName]?.status || 500);
  res.send(errorMessages[errorName]?.message || "Internal Server Error");
};

export const userExtractor: RequestHandler = async (req, res, next) => {
  try {
    const authorization = req.get("authorization");
    if (!authorization || !authorization.toLowerCase().startsWith("bearer "))
      throw new Error("missingToken");

    const token = authorization.substring(7);
    const decodedToken = jwt.verify(token, SECRET) as TokenFields;
    if (!decodedToken.id) throw new Error("invalidToken");

    const user = await redis.getRefresh("user:" + decodedToken.id);
    if (!(decodedToken.username === user)) throw new Error("invalidUser");

    res.locals.id = decodedToken.id;
    res.locals.username = decodedToken.username;
    next();
  } catch (e) {
    next(e);
  }
};
