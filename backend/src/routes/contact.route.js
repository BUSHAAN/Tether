import express from "express";
import { protectRoute } from "../middleware/auth.middleware.js";
import { searchUsers, addContact } from "../controllers/contact.controller.js";

const router = express.Router();

router.get("/search", protectRoute, searchUsers);
router.post("/", protectRoute, addContact);

export default router;
