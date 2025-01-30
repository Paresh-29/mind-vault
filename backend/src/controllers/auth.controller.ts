import { Request, Response } from 'express';
import { authSchema } from '../lib/types';
import User from '../models/user.model';
import bcrypt from 'bcrypt';
import jwt from "jsonwebtoken";

export const signup = async (req: Request, res: Response): Promise<void> => {
  const result = authSchema.safeParse(req.body);

  if (!result.success) {
    res.status(411).json({
      message: 'Errors in input',
      errors: result.error.errors,
    });
    return;
  }

  const { username, password } = result.data;

  try {
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      res.status(403).json({
        message: 'Username already exists',
      });
      return;
    }

    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const newUser = new User({
      username,
      password: hashedPassword,
    });

    await newUser.save();

    res.status(200).json({
      message: 'User created successfully',
      user: { username },
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error: 'Internal server error',
    });
  }
};


export const login = async (req: Request, res: Response): Promise<Response> => {
  const result = authSchema.safeParse(req.body);

  if (!result.success) {
    return res.status(400).json({
      message: "Invalid credentials",
      errors: result.error.errors,
    });
  }

  const { username, password } = result.data as { username: string; password: string };

  try {
    const user = await User.findOne({ username });

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({
        message: "Invalid credentials",
      });
    }

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET || "default_secret");

    return res.status(200).json({
      message: "User logged in successfully",
      token,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Internal server error",
    });
  }
};


export const checkAuth = async (req: Request, res: Response): Promise<void> => {
  // @ts-ignore
  const user = await User.findById(req.userId).select("-password");
  res.json(user);
}
