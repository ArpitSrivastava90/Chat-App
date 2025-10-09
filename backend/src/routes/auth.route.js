import express from "express";
import {
  signup,
  login,
  logout,
  updateProfile,
} from "../controllers/auth.controller.js";
import { Middelware } from "../lib/utlis.js";
import { arcjetProtection } from "../lib/arcjet.middleware.js";
const router = express.Router();

router.use(arcjetProtection);
router.get("/test", arcjetProtection, (req, res) => {
  res.send("Welcome to chatApp servers");
});
router.post("/signup", signup);
router.post("/login", login);
router.post("/logout", logout);
router.put("/update-profile", Middelware, updateProfile);
router.get("/check", Middelware, (req, res) => {
  res.status(200).json(req.user);
});
export default router;
