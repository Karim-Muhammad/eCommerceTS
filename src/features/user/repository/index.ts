import Repository from "../../../common/Repository";
import UserModel from "../model";
import IUser from "../model/type";

class UserRepository extends Repository<IUser> {
  constructor() {
    super(UserModel);
  }

  create(data: IUser): Promise<IUser> {
    return super.create(data);
  }
}

export default UserRepository;
