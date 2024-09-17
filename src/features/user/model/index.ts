import { model } from "mongoose";
import UserSchema from "./schema";
import { IUser, IUserModel } from "../types";

import "./hooks";
import "./methods";

const UserModel = model<IUser, IUserModel>("User", UserSchema);

export default UserModel;
