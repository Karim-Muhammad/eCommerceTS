import { body } from "express-validator";
import Validations from "../../../common/Validations";
import { customMessage } from "../../../common/helpers";
import UserModel from "../../user/model";

class AuthValidations extends Validations {
  constructor() {
    super();
  }

  public register() {
    return [
      body("first_name")
        .isString()
        .withMessage(customMessage("should be string"))
        .bail()
        .isLength({ min: 3, max: 20 })
        .withMessage("should be between 3 to 20 characters"),
      body("last_name")
        .isString()
        .withMessage("should be string")
        .bail()
        .isLength({ min: 3, max: 20 })
        .withMessage("should be between 3 to 20 characters"),
      body("email")
        .isEmail()
        .withMessage("must enter valid email")
        .bail()
        .custom(async (email) => {
          return await this.isEmailTaken(email);
        }),

      body("password")
        .isStrongPassword({ returnScore: true })
        .withMessage(
          "should be strong password(uppercase, lowercase, number, special character)"
        )
        .bail(),
      body("mobile").optional().isMobilePhone("ar-EG"),

      this.validate(),
    ];
  }

  public isEmailTaken(email: string) {
    return UserModel.findByEmail(email).then((document) => {
      console.log(document);
      if (document) throw new Error("This email is invalid");
      return true;
    });
  }
}

export default new AuthValidations();
