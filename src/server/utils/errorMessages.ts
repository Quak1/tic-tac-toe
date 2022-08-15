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
};

export default errorMessages;
