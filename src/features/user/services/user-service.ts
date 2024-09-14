import UserRepository from "../repository";

class UserServices {
  private readonly userRepository: UserRepository;

  constructor() {
    this.userRepository = new UserRepository();
  }
}

export default UserServices;
