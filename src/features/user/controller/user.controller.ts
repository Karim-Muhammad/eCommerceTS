import ErrorAPI from "../../../common/ErrorAPI";
import AuthService from "../services/auth-service";
import UserServices from "../services/user-service";

class UserController {
  private readonly authService: AuthService;
  private readonly userService: UserServices;
  constructor() {
    this.authService = new AuthService();
    this.userService = new UserServices();
  }

  register() {
    return async (request, response, next) => {
      try {
        const user = await this.authService.register()(request);
        response.status(201).json(user);
      } catch (error) {
        next(ErrorAPI.badRequest(error.message));
      }
    };
  }
}

export default new UserController();
