import express from "express";

import indexRouter from "./routes/index";
import loginRouter from "./routes/login";

const app = express();

// middleware
app.use(express.json());

// routes
app.use("/index", indexRouter);
app.use("/login", loginRouter);

export default app;
