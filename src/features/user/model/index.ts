import { model } from "mongoose";
import { IUser, IUserModel } from "../types";
import UserSchema from "./schema";

import "./hooks";
import "./methods";

const UserModel = model<IUser, IUserModel>("User", UserSchema);

export default UserModel;
