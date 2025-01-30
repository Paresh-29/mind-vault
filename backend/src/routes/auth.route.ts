import express from "express";
import { checkAuth, login, signup } from "../controllers/auth.controller";
import { protectRoute } from "../middleware/auth.middleware";

const router = express.Router();

router.post("/signup", signup);

router.post("/signin", async (req, res) => {
  try {
    await login(req, res);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

router.get("/me", protectRoute, checkAuth);

export default router;
