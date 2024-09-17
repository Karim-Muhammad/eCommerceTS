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

  mobile: {
    type: String,
    unique: true,
  },
});

export type IUser = IUserType;

export default UserSchema;
