import express from "express";

const app = express();

app.get("/", (req, res) => {
  console.log("request at", req.originalUrl);
  res.json({ foo: "bar" });
});

export default app;
