import { FieldValidationError, validationResult } from "express-validator";
import ErrorAPI, { ErrorType } from "./ErrorAPI";

class Validations {
  protected throwMethod: (message: string, errors?: ErrorType[]) => ErrorAPI =
    ErrorAPI.badRequest;

  protected validate() {
    return (req, res, next) => {
      const _errors = validationResult(req);

      if (!_errors.isEmpty()) {
        const errors = _errors.array().map((error: FieldValidationError) => ({
          // field: error.type,
          message: error.msg,
          field: error.path,
        }));

        console.log(errors);
        return next(this.throwMethod("Validation Error", errors));
      }

      next();
    };
  }
}

export default Validations;
