import { Request, Response, NextFunction } from "express";
import config from "../../config";

interface DevelopmentError {
  message: string;
  statusCode: number;
  stack: string;
}

interface ProductionError {
  message: string;
  statusCode: number;
}

class ErrorHandler {
  private static environment: string = config.env;

  static handle() {
    return (
      errors: DevelopmentError,
      request: Request,
      response: Response,
      next: NextFunction // eslint-disable-line
    ) => {
      if (this.environment === "development") {
        errors = ErrorHandler.handleDev(errors);
      }

      if (this.environment === "production") {
        errors = ErrorHandler.handleProd(errors) as DevelopmentError;
      }

      return response.status(errors.statusCode).json({ errors: errors });
    };
  }

  static handleDev(errors: DevelopmentError): DevelopmentError {
    return {
      message: errors.message,
      statusCode: errors.statusCode,
      stack: errors.stack,
    };
  }
  static handleProd(errors: DevelopmentError): ProductionError {
    return {
      message: errors.message,
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
