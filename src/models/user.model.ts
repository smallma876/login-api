import mongoose, { Schema, Document } from "mongoose";

export interface User {
  username: string;
  email: string;
  hashed_password: string;
  full_name: string;
  profile_image_url: string;
}

type IUser = User & Document;

const userSchema: Schema = new Schema({
  username: { type: String, required: true },
  email: { type: String, required: true },
  hashed_password: { type: String, required: true },
  full_name: String,
  profile_image_url: String,
});

const UserModel = mongoose.model<IUser>("User", userSchema);

export default UserModel;
