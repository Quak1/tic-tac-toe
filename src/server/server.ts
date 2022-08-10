import express from "express";
const app = express();
const port = 3001;

app.get("/", (req, res) => {
  console.log("request at", req.originalUrl);
  res.json({ foo: "bar" });
});

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});
