import express from "express";
import cors from "cors";

import { errorHandler } from "./utils/middleware";
import indexRouter from "./routes/index";
import loginRouter from "./routes/login";
import gameRouter from "./routes/game";

const app = express();

// middleware
app.use(express.json());
app.use(cors({ origin: "http://localhost:3000" }));

// routes
app.use("/", indexRouter);
app.use("/login", loginRouter);
app.use("/game", gameRouter);

app.use(errorHandler);

export default app;
