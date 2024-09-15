import Repository from "../../../common/Repository";
import UserModel from "../model";
import { IUser } from "../model/schema";

class UserRepository extends Repository<IUser> {
  constructor() {
    super(UserModel);
  }
}

export default UserRepository;
