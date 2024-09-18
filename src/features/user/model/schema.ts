import { Schema } from "mongoose";
import { IUserMethods, IUserModel, IUser as IUserType } from "../types";

const UserSchema = new Schema<IUserType, IUserModel, IUserMethods>({
  first_name: {
    type: String,
    required: true,
  },

  last_name: {
    type: String,
    required: true,
  },

  email: {
    type: String,
    required: true,
    unique: true,
  },

  password: {
    type: String,
    required: true,
  },

  passwordChangedAt: {
    type: Number,
    required: true,
    default: Date.now(),
  },

  mobile: {
    type: String,
    unique: true,
  },

  role: {
    type: String,
    default: "user",
  },
});

export type IUser = IUserType;

export default UserSchema;
