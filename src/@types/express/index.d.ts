import { IUserDocument } from "../../features/user/types";
import { ResourceApiController } from "..";
import { ICartDocument } from "../../features/carts/types";

declare global {
  namespace Express {
    interface Request {
      user?: IUserDocument;
      cart?: ICartDocument;
    }

    interface Router {
      resource(path: string, controller: ResourceApiController): void;
    }
  }
}
