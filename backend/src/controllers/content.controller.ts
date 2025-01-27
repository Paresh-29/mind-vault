import { Request, Response } from "express";
import { contentSchema } from "../lib/types";
import Content from "../models/content.model";
import Tag from "../models/tag.model";


export const createContent = async (req: Request, res: Response): Promise<void> => {
  const result = contentSchema.safeParse(req.body);

  if (!result.success) {
    res.status(400).json({
      message: "Invalid content",
      errors: result.error.errors,
    });
    return;
  }

  const { link, title, type, tags } = result.data;

  try {

    const tagDocuments = await Promise.all(
      tags.map(async (tagTitle: string) => {
        const tag = await Tag.findOneAndUpdate(
          { title: tagTitle },
          { title: tagTitle },
          { upsert: true, new: true }
        );
        return tag._id;
      })
    );


    const newContent = await Content.create({
      link,
      title,
      type,
      tags: tagDocuments,
      // @ts-ignore
      userId: req.userId,
    })

    const populatedContent = await newContent.populate("tags");

    res.status(201).json({
      message: "Content created successfully",
      content: populatedContent,
    })
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "failed to create content",
    });
  }
}

export const getAllContent = async (req: Request, res: Response): Promise<void> => {
  try {
    const contents = await Content.find({
      // @ts-ignore
      userId: req.userId,
    })
      .populate("userId", "username")
      .populate("tags", "title");

    res.status(200).json({
      contents,
    })
  } catch (error) {
    console.log(error)
    res.status(500).json({
      message: "failed to fetch contents",
    })
  }
}

export const deleteContent = async (req: Request, res: Response): Promise<void> => {
  try {
    const { contentId } = req.params;

    if (!contentId) {
      res.status(400).json({
        message: "contentId is required",
      });
      return;
    }

    const content = await Content.findOne({
      _id: contentId,
      // @ts-ignore
      userId: req.userId,
    });

    if (!content) {
      res.status(404).json({
        message: "Content not found",
      });
      return;
    }
    await content.deleteOne();

    res.status(200).json({
      message: "content deleted successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "failed to delete content",
    });
  }
}
