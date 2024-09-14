import UserRepository from "../repository";

class AuthService {
  private readonly userRepository: UserRepository;

  constructor() {
    this.userRepository = new UserRepository();
  }

  register() {
    return (request) => {
      const { first_name, last_name, email, password } = request.body;
      const data = this.userRepository.create({
        first_name,
        last_name,
        email,
        password,
      });

      return data;
    };
  }
  login() {
    return (request) => {
      const { email, password } = request.body;
      return { email, password };
    };
  }

  logout() {}
  forgotPassword() {}
  resetPassword() {}
  changePassword() {}
  verifyEmail() {}
  updateProfile() {}
  getProfile() {}
  deleteProfile() {}
}

export default AuthService;
