import express from "express";
const router = express.Router();

router.get("/", (_req, res) => {
  res.json({ foo: "bar" });
});

export default router;
