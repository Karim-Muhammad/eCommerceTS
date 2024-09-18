import { Request, Response } from "express";
import ErrorAPI from "../../../common/ErrorAPI";
import { apiResponse } from "../../../common/helpers";
import UserRepository from "../../user/repository";
import JwtServices from "./../service/jwt.services";

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

      const token = JwtServices.sign({ id: user.id });

      return res.status(200).json({
        data: {
          message: "Login Successfully!",
          token,
        },
      });
    } catch (error) {
      next(ErrorAPI.badRequest(error.message));
    }
  };

  profile = async (req: Request, res: Response, next) => {
    console.log(req.user);

    try {
      // const profileData = await this.userRepository.readOne()
      return apiResponse(res, 200, "Profile Data", req.user);
    } catch (error) {
      next(ErrorAPI.badRequest(error.message));
    }
  };

  changePassword = async (req: Request, res: Response, next) => {
    try {
      const user = await new UserRepository()
        .readOne({
          _id: req.user.id,
        })
        .select("password");

      if (!(await user.comparePassword(req.body["old-password"]))) {
        throw ErrorAPI.badRequest("Old password you have entered is incorrect");
      }

      // 1# first
      user.password = req.body["new-password"];
      await user.save();

      // then, 2# second
      const token = JwtServices.sign({ id: req.user.id });

      return apiResponse(res, 200, "You changed the password successfully", {
        token,
      });
    } catch (error) {
      return next(ErrorAPI.badRequest(error.message));
    }
  };

  logout = async () => {};
}

export default new UserController();
