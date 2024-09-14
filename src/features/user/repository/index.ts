import { Document, Types } from "mongoose";
import Repository from "../../../common/Repository";
import UserAccount, { UserAccountModel } from "../model/auth-schema";

class UserRepository extends Repository<UserAccountModel> {
  constructor() {
    super(UserAccount);
  }
  create(
    data: UserAccountModel
  ): Promise<
    Document<unknown, {}, UserAccountModel> &
      UserAccountModel & { _id: Types.ObjectId }
  > {
    return this.Model.create(data);
  }
}

export default UserRepository;
