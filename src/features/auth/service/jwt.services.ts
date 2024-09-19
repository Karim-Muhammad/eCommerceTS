import jwt, { JwtPayload, TokenExpiredError } from "jsonwebtoken";
import config from "../../../../config";
import UserRepository from "../../user/repository";
import ErrorAPI from "../../../common/ErrorAPI";

type Payload =
  | JwtPayload & {
      id: number;
      role: string;
    };

class JWTServices {
  static sign(payload: Payload) {
    return jwt.sign(payload, config.secret_key, {
      expiresIn: "1d",
    });
  }

  static verify(token: string): Payload {
    try {
      const decoded = jwt.verify(token, config.secret_key);
      return decoded as Payload;
    } catch (error) {
      if (error instanceof TokenExpiredError) {
        throw ErrorAPI.unauthorized("Token Expired!");
      }

      throw ErrorAPI.unauthorized("Invalid Token!");
    }
  }

  static user(token: string) {
    const payload = JWTServices.verify(token) as Payload;
    return new UserRepository().readOne({ id: payload.id });
  }
}

export default JWTServices;
