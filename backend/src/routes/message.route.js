import express from "express";
const router = express.Router();

router.get("/send", (req, res) => {
  res.send("this is message APi");
});

export default router;
