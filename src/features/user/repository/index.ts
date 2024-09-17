import Repository from "../../../common/Repository";
import UserModel from "../model";
import { IUserDocument } from "../types";

class UserRepository extends Repository<IUserDocument> {
  constructor() {
    super(UserModel);
  }
}

export default UserRepository;
