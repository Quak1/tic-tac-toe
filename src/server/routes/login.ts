import express from "express";
const router = express.Router();

router.post("/", (req, res) => {
  const { username } = req.body;

  if (!username) return res.sendStatus(401);

  res.send(username);
});

export default router;
