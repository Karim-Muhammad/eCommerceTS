import { model } from "mongoose";
import UserSchema, { IUser } from "./schema";

import "./hooks";
import "./methods";

const UserModel = model<IUser>("User", UserSchema);

export default UserModel;
