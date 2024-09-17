export type ErrorType = {
  message: string;
  field?: string;
  errors?: ErrorType[];
};

class ErrorAPI extends Error {
  pack: ErrorType = { message: "" };
  statusCode: number;
  stack?: string;

  public constructor(
    message: string,
    statusCode: number,
    errors?: ErrorType[]
  ) {
    super(message);

    this.pack.message = message;
    this.pack.errors = errors;

    this.statusCode = statusCode;
    Error.captureStackTrace(this, this.constructor);
  }

  static notFound(message: string) {
    return new ErrorAPI(message, 404);
  }

  static badRequest(message: string, errors?: ErrorType[]) {
    return new ErrorAPI(message, 400, errors);
  }

  static unauthorized(message: string) {
    return new ErrorAPI(message, 401);
  }

  static internal(message: string, errors?: ErrorType[]) {
    return new ErrorAPI(message, 500, errors);
  }

  static isInstance(error): error is ErrorAPI {
    return error instanceof ErrorAPI;
  }
}

export default ErrorAPI;
