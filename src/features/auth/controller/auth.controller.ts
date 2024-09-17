import { Request, Response } from "express";
import ErrorAPI from "../../../common/ErrorAPI";
import UserRepository from "../../user/repository";
import { apiResponse } from "../../../common/helpers";

class UserController {
  private readonly userRepository: UserRepository;
  constructor() {
    this.userRepository = new UserRepository();
  }

  register = async (req: Request, res: Response, next) => {
    try {
      await this.userRepository.create(req.body);

      return apiResponse(res, 201, "User Created Successfully!");
    } catch (error) {
      next(ErrorAPI.badRequest(error.message));
    }
  };

  login = async (req: Request, res: Response, next) => {
    try {
      const { email, password } = req.body;
      const user = await this.userRepository.readOne({ email });
      if (!user || !(await user.comparePassword(password))) {
        throw Error("Invalid Credentails!");
      }

      return res.status(200).json({
        data: {
          message: "Login Successfully!",
        },
      });
    } catch (error) {
      next(ErrorAPI.badRequest(error.message));
    }
  };

  profile = async (req: Request, res: Response, next) => {
    try {
      // const profileData = await this.userRepository.readOne()
    } catch (error) {
      next(ErrorAPI.badRequest(error.message));
    }
  };

  logout = async () => {};
}

export default new UserController();
