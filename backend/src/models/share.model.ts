import mongoose from "mongoose";

interface ILink extends mongoose.Document {
    hash: string;
    userId: mongoose.Schema.Types.ObjectId;
    contentCount?: number;
}

const linkSchema = new mongoose.Schema({
    hash: {
        type: String,
        required: true,
        unique: true,
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
        unique: true,
    },
    contentCount: {
        type: Number,
        default: 0
    }
}, { timestamps: true });

const Link = mongoose.model<ILink>("Link", linkSchema);
export default Link;
