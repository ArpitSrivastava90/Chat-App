import express from "express";
import {
  getAllContacts,
  getMessageByUserId,
} from "../controllers/send.controllers.js";
import { Middelware } from "../lib/utlis.js";
const router = express.Router();

router.get("/contacts", Middelware, getAllContacts);
// router.get("/chats", getChatPatners);
router.get("/:id", Middelware, getMessageByUserId);

// router.("/send/:id", Middelware, sendMessage);

export default router;
