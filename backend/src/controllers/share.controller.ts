import { Request, Response } from "express";
import { shareSchema } from "../lib/types";
import Link from "../models/share.model";
import crypto from "crypto";
import Content from "../models/content.model";

export const shareLink = async (req: Request, res: Response): Promise<void> => {
  const result = shareSchema.safeParse(req.body);
  if (!result.success) {
    res.status(400).json({
      message: "Invalid inputs",
      errors: result.error.errors,
    });
    return;
  }

  const { share } = result.data;

  try {
    if (share) {
      //@ts-ignore
      const userId = req.userId;

      const content = await Content.findOne({ userId });
      if (!content) {
        res.status(200).json({
          message: "User has no content in SecondBrain",
        });
        return;
      }

      const hash = crypto.createHash("sha256").update(userId + Date.now()).digest("hex");

      const linkCreated = await Link.findOneAndUpdate(
        { userId },
        { hash, userId },
        { upsert: true, new: true }
      );

      res.status(200).json({
        message: `Share link enabled for user ${linkCreated.userId}`,
        link: `http://localhost:3000/api/v1/share/${linkCreated.hash}`, // Provide the full link
      });
      return;
    } else {
      //@ts-ignore
      const userId = req.userId;

      await Link.deleteOne({ userId });

      res.status(200).json({
        message: "Share link has been disabled.",
      });
      return;
    }
  } catch (e) {
    console.error("Error in /share:", e);
    res.status(500).json({
      message: "Internal Server Error in /share",
    });
  }
};

export const getLink = async (req: Request, res: Response): Promise<void> => {
  const { shareLink } = req.params;

  try {
    const link = await Link.findOne({ hash: shareLink });

    if (!link) {
      res.status(404).json({
        message: "Link not found",
      });
      return;
    }

    const content = await Content.findOne({ userId: link.userId })
      .populate("userId", "username")
      .populate("tags", "title");

    if (!content) {
      res.status(404).json({
        message: "no content found for this link",
      });
      return;
    }

    res.status(200).json({
      message: "content retrived successfully",
      content,
      link,
    });

  } catch (error) {
    res.status(500).json({
      message: "Internal Server Error",
    });
    return;
  }
}
