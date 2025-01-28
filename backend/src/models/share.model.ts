import mongoose from "mongoose";

interface ILink extends mongoose.Document {
  hash: string;
  userId: mongoose.Schema.Types.ObjectId;
}

const linkSchema = new mongoose.Schema({
  hash: {
    type: String,
    required: true,
    unique: true,
  },
  userId: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: true,
    unique: true,
  },
}, { timestamps: true });


const Link = mongoose.model<ILink>("Link", linkSchema);
export default Link;
