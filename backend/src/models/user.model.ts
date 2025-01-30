import mongoose, { model } from "mongoose";

interface IUser extends mongoose.Document {
  username: string;
  password: string;
}

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },

  password: {
    type: String,
    required: true,
  },
});


const User = model<IUser>("User", userSchema);
export default User;
