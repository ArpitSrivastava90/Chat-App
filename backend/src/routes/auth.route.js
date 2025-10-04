import express from "express";
const router = express.Router();

router.get("/", (req, res) => {
  res.send("Welcome to chatApp servers");
});
router.get("/signup", (req, res) => {
  res.send("Signup endpoint");
});
router.get("/login", (req, res) => {
  res.send("login endpoint");
});
router.get("/logout", (req, res) => {
  res.send("logout endpoint");
});

export default router;
