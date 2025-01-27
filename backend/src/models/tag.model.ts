import mongoose, { model } from "mongoose";


export const tagSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  }
});

const Tag = model("Tag", tagSchema);
export default Tag;
