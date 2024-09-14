import UserServices from "../services/user-service";

class UserController extends UserServices {
  constructor() {
    super();
  }
}

export default new UserController();
