import express from 'express';
import { createContent, deleteContent, getAllContent } from '../controllers/content.controller';
import { protectRoute } from '../middleware/auth.middleware';


const router = express.Router();

router.post("/add-content", protectRoute, createContent);
router.get("/get-content", protectRoute, getAllContent);
router.delete("/delete-content/:contentId", protectRoute, deleteContent);

export default router;



