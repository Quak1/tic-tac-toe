import express from "express";

import { errorHandler } from "./utils/middleware";
import indexRouter from "./routes/index";
import loginRouter from "./routes/login";

const app = express();

// middleware
app.use(express.json());

// routes
app.use("/index", indexRouter);
app.use("/login", loginRouter);

app.use(errorHandler);

export default app;
