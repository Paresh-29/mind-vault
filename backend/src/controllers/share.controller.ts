import { Request, Response } from "express";
import { shareSchema } from "../lib/types";
import Share from "../models/share.model";
import Content from "../models/content.model";
import crypto from "crypto";

const SHARE_LINK_BASE_URL =
  process.env.SHARE_LINK_BASE_URL || "http://localhost:3000";

export const shareLink = async (
  req: Request & { userId?: string },
  res: Response
): Promise<void> => {
  const result = shareSchema.safeParse(req.body);
  if (!result.success) {
    res.status(400).json({
      message: "Invalid inputs",
      errors: result.error.errors,
    });
    return;
  }

  const { share } = result.data;
  const userId = req.userId;

  try {
    if (share) {
      const contents = await Content.find({ userId });
      if (contents.length === 0) {
        res.status(200).json({
          message: "User has no content in SecondBrain",
        });
        return;
      }

      const hash = crypto
        .createHash("sha256")
        .update(`${userId}${Date.now()}`)
        .digest("hex");
      const linkCreated = await Share.findOneAndUpdate(
        { userId },
        {
          hash,
          userId,
          contentCount: contents.length,
        },
        { upsert: true, new: true }
      );

      res.status(200).json({
        message: `Share link enabled for user ${linkCreated.userId}`,
        link: `${SHARE_LINK_BASE_URL}/api/v1/brain/${linkCreated.hash}`,
        contentCount: contents.length,
      });
    } else {
      await Share.deleteOne({ userId });
      res.status(200).json({
        message: "Share link has been disabled.",
      });
    }
  } catch (error) {
    console.error("Error in /share:", error);
    res.status(500).json({
      message: "Internal Server Error in /share",
    });
  }
};

export const getLink = async (req: Request, res: Response): Promise<void> => {
  const { shareLink } = req.params;
  try {
    const link = await Share.findOne({ hash: shareLink });
    if (!link) {
      res.status(404).json({
        message: "Link not found",
      });
      return;
    }

    const contents = await Content.find({ userId: link.userId })
      .populate("userId", "username")
      .populate("tags", "title");

    if (contents.length === 0) {
      res.status(404).json({
        message: "No content found for this link",
      });
      return;
    }

    res.status(200).json({
      message: "Contents retrieved successfully",
      contents,
      link: {
        hash: link.hash,
        contentCount: link.contentCount,
      },
    });
  } catch (error) {
    console.error("Error retrieving shared link:", error);
    res.status(500).json({
      message: "Internal Server Error",
    });
  }
};
