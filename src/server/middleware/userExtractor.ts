import { RequestHandler } from "express";
import jwt from "jsonwebtoken";

import redis from "../services/redis";
import { SECRET } from "../config";
import { UserDetails } from "../utils/types";

const userExtractor: RequestHandler = async (req, res, next) => {
  try {
    const authorization = req.get("authorization");
    if (!authorization || !authorization.toLowerCase().startsWith("bearer "))
      throw new Error("missingToken");

    const token = authorization.substring(7);
    const decodedToken = jwt.verify(token, SECRET) as UserDetails;
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

export default userExtractor;
