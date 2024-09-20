import { Request, Response } from "express";
import ErrorAPI from "../../../common/ErrorAPI";
import { apiResponse } from "../../../common/helpers";
import UserRepository from "../../user/repository";
import JwtServices from "./../service/jwt.services";
import config from "../../../../config";
import { REFRESH_TOKEN } from "../../../common/constants";

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
      next(ErrorAPI.internal(error.message));
    }
  };

  login = async (req: Request, res: Response, next) => {
    try {
      const { email, password } = req.body;

      const user = await this.userRepository.readOne({ email });

      // we can separate this logic to middleware
      if (!JwtServices.isExpired(user.refreshToken))
        return next(ErrorAPI.badRequest("Already logged in"));

      if (!user || !(await user.comparePassword(password))) {
        return next(ErrorAPI.unauthorized("Invalid Credentails!"));
      }

      const token = JwtServices.sign({ id: user.id, role: user.role });
      const refreshToken = JwtServices.sign(
        { id: user.id, role: user.role },
        config.refresh_key,
        "3d"
      );

      user.refreshToken = refreshToken;
      await user.save();

      res.cookie(REFRESH_TOKEN.name, refreshToken, REFRESH_TOKEN.options);

      return apiResponse(res, 200, "Login Successfully!", { token });

      /**
       * AccessToken used directly by client users
       * RefreshToken used only when accessToken expired instead of logout and re-login again
       */
    } catch (error) {
      next(ErrorAPI.internal(error.message));
    }
  };

  profile = async (req: Request, res: Response, next) => {
    console.log(req.user);
    try {
      return apiResponse(res, 200, "Profile Data", req.user);
    } catch (error) {
      next(ErrorAPI.internal(error.message));
    }
  };

  refreshToken = async (req: Request, res: Response, next) => {
    try {
      const cookies = req.cookies;
      if (!cookies["refresh_token"])
        return next(
          ErrorAPI.badRequest(
            "There is no Refresh token in cookies (not found)"
          )
        );

      const refreshToken = cookies["refresh_token"];
      const user = await this.userRepository.readOne({ refreshToken });
      if (!user)
        return next(
          ErrorAPI.notFound(
            "Refresh token no longer belong to any user (not found)"
          )
        );

      const decodedToken = JwtServices.verify(refreshToken);
      if (decodedToken.id !== user.id)
        return next(
          ErrorAPI.unauthorized("Unauthorized behaviour! (id not match)")
        );

      const newAccessToken = JwtServices.sign({ id: user.id, role: user.role });

      return apiResponse(res, 200, "New Access Token returned", {
        token: newAccessToken,
      });
    } catch (error) {
      next(ErrorAPI.internal(error.message));
    }
  };

  changePassword = async (req: Request, res: Response, next) => {
    const currentUser = req.user;

    try {
      const user = await new UserRepository()
        .readOne({
          _id: currentUser.id,
        })
        .select("password");

      if (!(await user.comparePassword(req.body["old-password"]))) {
        return next(
          ErrorAPI.badRequest("Old password you have entered is incorrect")
        );
      }

      // 1# first
      user.password = req.body["new-password"];
      await user.save();

      // then, 2# second
      const token = JwtServices.sign({ id: req.user.id, role: req.user.role });

      return apiResponse(res, 200, "You changed the password successfully", {
        token,
      });
    } catch (error) {
      next(ErrorAPI.internal(error.message));
    }
  };

  logout = async (req: Request, res: Response, next) => {
    try {
      const currentUser = req.user;

      const cookies = req.cookies;
      if (!cookies["refresh_token"])
        return next(
          ErrorAPI.badRequest(
            "Refresh tokens is not exist! (you already logged out)"
          )
        );

      const refreshToken = cookies["refresh_token"];

      const user = await this.userRepository.readOne({ _id: currentUser.id });
      if (!user)
        return next(
          ErrorAPI.badRequest("Please Login first again! (user not found)")
        );
      if (user.refreshToken !== refreshToken)
        return next(
          ErrorAPI.unauthorized(
            "Unauthorized Behaviour! (refresh token not match)"
          )
        );

      user.refreshToken = "";
      await user.save();

      res.clearCookie("refresh_token", {
        httpOnly: true,
        secure: true,
      });

      return apiResponse(res, 204, "Logout successfully!");
    } catch (error) {
      next(ErrorAPI.internal(error.message));
    }
  };
}

export default new UserController();
