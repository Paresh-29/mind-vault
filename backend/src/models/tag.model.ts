import mongoose, { model } from "mongoose";

interface ITag extends mongoose.Document {
  title: string;
}

export const tagSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  }
});

const Tag = model<ITag>("Tag", tagSchema);
export default Tag;
