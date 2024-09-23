import { IUserDocument } from "../../features/user/types";
import { ResourceApiController } from "..";

declare global {
  namespace Express {
    interface Request {
      user?: IUserDocument;
    }

    interface Router {
      resource(path: string, controller: ResourceApiController): void;
    }
  }
}
