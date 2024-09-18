import { Request, RequestHandler, Response, NextFunction } from "express";

import ErrorAPI from "../../../common/ErrorAPI";
import AuthServices from "../service/jwt.services";
import UserRepository from "../../user/repository";

class GuardMiddlewares {
  /**
   * @description Guard middleware - to be used in routes that should be guarded
   * @returns
   */
  guard(): RequestHandler {
    return async (req: Request, res: Response, next: NextFunction) => {
      const authorization = req.headers.authorization;

      // 1. Check if `headers` has Authorization field
      if (!authorization || !authorization.startsWith("Bearer"))
        return next(ErrorAPI.unauthorized("Please login first!"));

      // 2. Verify the incoming token
      const token = authorization.split(" ")[1];
      if (!token)
        return next(
          ErrorAPI.unauthorized("un-authenticated user - there is no token!")
        );

      let payload;
      try {
        payload = AuthServices.verify(token);
      } catch (error) {
        return next(error);
      }

      // 3. Check if this token belong to some user
      const user = await new UserRepository().readOne({ _id: payload.id });

      if (!user)
        return next(
          ErrorAPI.unauthorized("This token no longer belong to you.")
        );

      // 4. Check if PasswordChangedAt updated than `iat` of token
      console.log(user.passwordChangedAt / 1000, payload.iat);
      if (!user.isTokenUpToDate(payload.iat)) {
        return next(
          ErrorAPI.unauthorized(
            "Please refresh the token, then do your action again."
          )
        );
      }

      req.user = user;

      next();
    };
  }

  /**
   * @description Reverse the guard middleware - to be used in routes that should not be guarded
   * @returns
   */
  reverseGuard() {
    return (req: Request, res: Response, next: NextFunction) => {
      if (req.headers.authorization)
        throw ErrorAPI.unauthorized("You are already logged in.");

      next();
    };
  }
}

export default new GuardMiddlewares();
