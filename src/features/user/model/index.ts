import { model } from "mongoose";
import UserSchema from "./schema";
import IUser from "./type";

import "./hooks";
import "./methods";

const UserModel = model<IUser>("User", UserSchema);

export default UserModel;
