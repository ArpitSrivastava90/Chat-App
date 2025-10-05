import express from "express";
import { signup, login, logout } from "../controllers/auth.controller.js";
const router = express.Router();

router.get("/", (req, res) => {
  res.send("Welcome to chatApp servers");
});
router.post("/signup", signup);
router.post("/login", login);
router.get("/logout", logout);

export default router;
