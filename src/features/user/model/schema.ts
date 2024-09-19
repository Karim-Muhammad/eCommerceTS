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

  // emailVerifiedAt: {
  //   type: Date,
  // },

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

  status: {
    type: Boolean,
    default: true,
  },

  wishlist: [
    {
      type: Schema.Types.ObjectId,
      ref: "Product",
    },
  ],

  address: [
    {
      type: Schema.Types.ObjectId,
      ref: "Address",
    },
  ],
});

export type IUser = IUserType;

export default UserSchema;
