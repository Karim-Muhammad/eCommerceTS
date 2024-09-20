import { body } from "express-validator";
import AuthValidations from "../../auth/validation";

class UserValidations extends AuthValidations {
  constructor() {
    super();
  }

  /**
   * @description Validate the data for creating a new user
   */
  createUser = () => [...this.register(), body("role").optional()];

  public static getInstance() {
    return new UserValidations();
  }
}

export default UserValidations;
