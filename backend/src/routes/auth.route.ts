import express from "express";
import { login, signup } from "../controllers/auth.controller";

const router = express.Router();

router.post("/signup", signup);

router.post("/login", async (req, res) => {
  try {
    await login(req, res);
  } catch (error) {
    console.log(error); // Log the error for debugging
    res.status(500).json({ message: "Internal server error" });
  }
});

export default router;
