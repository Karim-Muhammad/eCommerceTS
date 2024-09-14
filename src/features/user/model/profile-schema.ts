import { model, Model, Schema } from "mongoose";
import { IUserProfile } from "./types";

type UserProfileModel = Model<IUserProfile>;

export const UserProfileSchema = new Schema<IUserProfile, UserProfileModel>(
  {
    first_name: { type: String, required: true },
    last_name: { type: String, required: true },
    mobile: { type: String, required: true },
    avatar: { type: String, required: false },
  },
  { timestamps: true }
);

const UserProfile = model<IUserProfile>("UserProfile", UserProfileSchema);

export default UserProfile;
