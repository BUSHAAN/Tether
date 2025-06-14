import express from "express";
import { protectRoute } from "../middleware/auth.middleware.js";
import {
  getUsersforSidebar,
  getMessages,
  sendMessage,
  viewMessages,
} from "../controllers/message.controller.js";

const router = express.Router();

router.get("/get-users", protectRoute, getUsersforSidebar);
router.get("/:id", protectRoute, getMessages);
router.post("/send/:id", protectRoute, sendMessage);
router.post("/view/:id", protectRoute, viewMessages);

export default router;
