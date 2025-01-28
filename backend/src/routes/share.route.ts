import express from "express";
import { protectRoute } from "../middleware/auth.middleware";
import { getLink, shareLink } from "../controllers/share.controller";

const router = express.Router();

router.post("/share", protectRoute, shareLink);
router.get("/:shareLink", getLink);


export default router;
