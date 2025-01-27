import { Request, Response } from 'express';
import { authSchema } from '../lib/types';
import User from '../models/user.model';
import bcrypt from 'bcrypt';

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
