import redis, { redisSub } from "./redis";

export const subscribeToChannel = (channel: string) => {
  redisSub.subscribe(channel, (err, count) => {
    if (err) {
      console.error("Failed to subscribe: %s", err.message);
    } else {
      console.log(
        `Subscribed successfully! This client is currently subscribed to ${count} channels.`
      );
    }
  });
};

type ListenerFunction = (channel: string, message: string) => void;

interface MessageListener {
  message: string;
  _listener: ListenerFunction;
}

const waitForMessage = (key: string) => {
  return new Promise<MessageListener>((resolve) => {
    const _listener = (channel: string, message: string) => {
      if (key === channel) {
        resolve({ message, _listener });
        redisSub.unsubscribe(channel);
      }
    };
    redisSub.on("message", _listener);
  });
};

const removeListener = (_listener: ListenerFunction) => {
  redisSub.removeListener("message", _listener);
};

export const getMessage = async <T = string>(key: string) => {
  subscribeToChannel(key);
  const res = await waitForMessage(key);
  removeListener(res._listener);

  const parsed: T = JSON.parse(res.message);
  return parsed;
};

export const publishMessage = async (
  channel: string,
  data: Record<string, unknown>
) => {
  return await redis.publish(channel, JSON.stringify(data));
};
