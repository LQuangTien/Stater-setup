import * as mongoose from "mongoose";
import { User } from "./auth.interface";

const userSchema = new mongoose.Schema({
  username: String,
  password: String
});

const userModel = mongoose.model<User & mongoose.Document>(
  "User",
  userSchema,
  "users"
);

export default userModel;
