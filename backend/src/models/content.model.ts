import mongoose, { model, Types } from "mongoose";


export const contentTypes = ['image', 'video', 'article', 'audio'] as const;

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
  userId: [{
    type: Types.ObjectId,
    ref: 'User'
  }],
}, { timestamps: true });

const Content = model("Content", contentSchema);
export default Content;
