interface errorInfo {
  status: number;
  message: string;
}

const errorMessages: Record<string, errorInfo> = {
  missingToken: {
    status: 401,
    message: "missing token",
  },
  invalidToken: {
    status: 401,
    message: "invalid token",
  },
  invalidUser: {
    status: 401,
    message: "user does not exits",
  },
  JsonWebTokenError: {
    status: 401,
    message: "invalid token",
  },
  invalidPosition: {
    status: 400,
    message: "position must be a number between 0 and 8",
  },
  invalidGameId: {
    status: 404,
    message: "this game doesn't exist",
  },
  playedPosition: {
    status: 400,
    message: "this position has already been played",
  },
  notActivePlayer: {
    status: 400,
    message: "you are not the active player",
  },
  finishedGame: {
    status: 400,
    message: "game is finished",
  },
};

export default errorMessages;
