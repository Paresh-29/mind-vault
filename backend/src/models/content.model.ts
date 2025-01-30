import mongoose, { model, Types } from "mongoose";

interface IContent extends mongoose.Document {
  link: string;
  type: string;
  title: string;
  tags: Types.ObjectId[];
  userId: Types.ObjectId;
}

export const contentTypes = ['image', 'video', 'article', 'audio', 'youtube', 'twitter'] as const;

const contentSchema = new mongoose.Schema({
  link: {
    type: String,
    required: true,
    trim: true,
  },
  type: {
    type: String,
    enum: contentTypes,
    required: true,
  },
  title: {
    type: String,
    required: true,
    trim: true,
  },
  tags: [{
    type: Types.ObjectId,
    ref: 'Tag'
  }],
  userId: {
    type: Types.ObjectId,
    ref: 'User',
    required: true,
  },
}, { timestamps: true });

const Content = model<IContent>("Content", contentSchema);
export default Content;
