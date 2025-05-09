import express from "express";
import {
  createContent,
  deleteContent,
  getAllContent,
  searchContent,
} from "../controllers/content.controller";
import { protectRoute } from "../middleware/auth.middleware";

const router = express.Router();

router.post("/", protectRoute, createContent);
router.get("/", protectRoute, getAllContent);
router.delete("/:contentId", protectRoute, deleteContent);
router.get("/search", protectRoute, searchContent);

export default router;
