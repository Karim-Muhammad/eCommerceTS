class ErrorAPI extends Error {
  message: string;
  statusCode: number;
  stack?: string;

  public constructor(message: string, statusCode: number) {
    super(message);
    this.statusCode = statusCode;
    Error.captureStackTrace(this, this.constructor);
  }

  static notFound(message: string) {
    return new ErrorAPI(message, 404);
  }

  static badRequest(message: string) {
    return new ErrorAPI(message, 400);
  }

  static unauthorized(message: string) {
    return new ErrorAPI(message, 401);
  }

  static internal(message: string) {
    return new ErrorAPI(message, 500);
  }
}

export default ErrorAPI;
