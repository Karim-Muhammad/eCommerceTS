import { IUserDocument } from "../../features/user/types";

declare global {
  namespace Express {
    interface Request {
      user?: IUserDocument;
    }
  }
}
