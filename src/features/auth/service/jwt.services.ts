import jwt, { JwtPayload, TokenExpiredError } from "jsonwebtoken";
import config from "../../../../config";
import UserRepository from "../../user/repository";
import ErrorAPI from "../../../common/ErrorAPI";

export type Payload =
  | JwtPayload & {
      id: number;
      role: string;
    };

class JWTServices {
  static sign(
    payload: Payload,
    secret: string = config.secret_key,
    expiresIn = "1h"
  ) {
    return jwt.sign(payload, secret, {
      expiresIn,
    });
  }

  static verify(token: string, secret: string = config.secret_key): Payload {
    try {
      const decoded = jwt.verify(token, secret);
      return decoded as Payload;
    } catch (error) {
      if (error instanceof TokenExpiredError) {
        throw ErrorAPI.unauthorized("Token Expired!");
      }

      throw ErrorAPI.unauthorized("Invalid Token!");
    }
  }

  static isExpired(token: string) {
    try {
      JWTServices.verify(token);
      return false;
    } catch (error) {
      if (error instanceof TokenExpiredError) {
        return true;
      }

      // throw ErrorAPI.unauthorized("Invalid Token!");
      return true;

      // which is better when token is invalid? throw an error, or just return when needed for this function?
    }
  }

  static user(token: string) {
    const payload = JWTServices.verify(token) as Payload;
    return new UserRepository().readOne({ id: payload.id });
  }
}

export default JWTServices;
