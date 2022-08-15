import express from "express";
const router = express.Router();

router.get("/", (req, res) => {
  console.log("request at", req.originalUrl);
  res.json({ foo: "bar" });
});

export default router;
