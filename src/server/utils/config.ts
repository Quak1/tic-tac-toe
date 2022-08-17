import "dotenv/config";

export const PORT = process.env.PORT || 3001;
export const REDIS_URL = process.env.REDIS_URL || "";
export const SECRET = process.env.SECRET || "secret";
export const ANON_USER_TIMEOUT = 3600; // time in seconds
