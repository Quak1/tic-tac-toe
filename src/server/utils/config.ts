import "dotenv/config";

export const PORT = process.env.PORT || 3001;
export const REDIS_URL = process.env.REDISCLOUD_URL || "";
export const SECRET = process.env.SECRET || "secret";
export const ANON_USER_TTL = process.env.ANON_USER_TTL || 3600; // time in seconds
export const GAME_TTL = process.env.GAME_TTL || 3600;
