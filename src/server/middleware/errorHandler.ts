import { ErrorRequestHandler } from "express";

import errorMessages from "./errorMessages";

const errorHandler: ErrorRequestHandler = (error, _req, res, next) => {
  console.log("errorHandler", error);

  let errorName = error.name;
  if (errorName === "Error") errorName = error.message;

  res.status(errorMessages[errorName]?.status || 500);
  res.send(errorMessages[errorName]?.message || "Internal Server Error");
};

export default errorHandler;
