import ErrorAPI from "../../../common/ErrorAPI";
import UserRepository from "../repository";

class UserController {
  private readonly userRepository: UserRepository;
  constructor() {
    this.userRepository = new UserRepository();
  }

  getAllUser() {
    return async (req, res, next) => {
      try {
        const data = this.userRepository.read;
      } catch (error) {
        next(ErrorAPI.badRequest(error.message));
      }
    };
  }
}

export default new UserController();
