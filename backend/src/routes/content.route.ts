import express from 'express';
import { createContent } from '../controllers/content.controller';
import { protectRoute } from '../middleware/auth.middleware';


const router = express.Router();

router.post("/add-content", protectRoute, createContent);


export default router;



