import { IUserDocument } from "../../src/features/user/types";

declare global {
  namespace Express {
    interface Request {
      user?: IUserDocument;
    }
  }
}
