import express from "express";
import {
  signup,
  login,
  logout,
  updateProfile,
} from "../controllers/auth.controller.js";
import { Middelware } from "../lib/utlis.js";
const router = express.Router();

router.get("/", (req, res) => {
  res.send("Welcome to chatApp servers");
});
router.post("/signup", signup);
router.post("/login", login);
router.post("/logout", logout);
router.put("/update-profile", Middelware, updateProfile);

export default router;
