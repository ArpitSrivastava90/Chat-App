import express from "express";
import {
  getAllContacts,
  getChatPatners,
  getMessageByUserId,
  sendMessage,
} from "../controllers/send.controllers.js";
import { Middelware } from "../lib/utlis.js";
import { arcjetProtection } from "../lib/arcjet.middleware.js";
const router = express.Router();


router.use(arcjetProtection, Middelware);

router.get("/contacts", getAllContacts);
router.get("/chats", getChatPatners);
router.get("/:id", getMessageByUserId);
router.post("/send/:id", sendMessage);

export default router;
