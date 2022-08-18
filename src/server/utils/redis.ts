import Redis, { Result, Callback } from "ioredis";

import { REDIS_URL, ANON_USER_TTL } from "./config";

// TODO handle connection error
const redis = new Redis(REDIS_URL);

// custon command - refresh TTL every time you get a key
redis.defineCommand("getRefresh", {
  numberOfKeys: 1,
  lua: `
  local key = KEYS[1]
  local val = redis.call("get", key)
  if (val) then
    redis.call("expire", key, ${ANON_USER_TTL})
  end
  return val
  `,
});

// add declaration for TS
declare module "ioredis" {
  interface RedisCommander<Context> {
    getRefresh(
      key: string,
      callback?: Callback<string>
    ): Result<string, Context>;
  }
}

export const redisSub = new Redis(REDIS_URL);

export default redis;
