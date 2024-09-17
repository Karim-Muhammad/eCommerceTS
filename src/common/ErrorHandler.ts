import { Request, Response, NextFunction } from "express";
import config from "../../config";
import ErrorAPI from "./ErrorAPI";

class ErrorHandler {
  private static environment: string = config.env;

  static handle() {
    return (
      incomingErrors: ErrorAPI,
      request: Request,
      response: Response,
      next: NextFunction // eslint-disable-line
    ) => {
      let errors: Partial<ErrorAPI> = incomingErrors;

      if (this.environment === "development") {
        errors = ErrorHandler.handleDev(incomingErrors);
      }

      if (this.environment === "production") {
        errors = ErrorHandler.handleProd(incomingErrors);
      }

      return response.status(errors.statusCode).json({ errors: errors });
    };
  }

  static handleDev(errors: ErrorAPI): Partial<ErrorAPI> {
    // console.log(errors);

    return {
      message: errors.message,
      pack: errors.pack,
      statusCode: errors.statusCode,
      stack: errors.stack,
    };
  }
  static handleProd(errors: ErrorAPI): Partial<ErrorAPI> {
    return {
      pack: errors.pack,
      statusCode: errors.statusCode,
    };
  }

  static unhandledPromiseRejection() {
    process.on("unhandledRejection", (error: Error) => {
      console.log("Unhandled Promise Rejection: ", error);
      process.exit(1);
    });
  }
  static uncaughtException() {
    process.on("uncaughtException", (error: Error) => {
      console.log("Uncaught Exception: ", error);
      process.exit(1);
    });
  }
}

export default ErrorHandler;
