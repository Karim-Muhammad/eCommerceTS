import { v2 } from "cloudinary";

import { NextFunction, Request, RequestHandler, Response } from "express";
import path from "path";
import config from "../../config";
import ErrorAPI from "./ErrorAPI";

export const serveStaticFiles = (folder): string =>
  path.join(`${config.root}/static/${folder}`);

export const catchAsync = (
  fn: (req: Request, res: Response, next: NextFunction) => Promise<unknown>
): RequestHandler => {
  return (req, res, next) => {
    fn(req, res, next).catch((error) => next(ErrorAPI.internal(error.message)));
  };
};

export const apiResponse = (
  res: Response,
  status: number,
  message: string,
  data = null
) => {
  return res.status(status).json({
    message,
    data,
  });
};

export const apiErrorResponse = (
  res: Response,
  status: number,
  message: string,
  error = null
) => {
  return res.status(status).json({
    message,
    error,
  });
};

export const customMessage =
  (message: string) =>
  (value: string, { path }: { path: string }) => {
    return message.replace("{VALUE}", value).replace("{PATH}", path);
  };

export const uploadIntoCloudinary = (() => {
  v2.config(config.cloudinary);
  return async (file: Express.Multer.File) => {
    v2.uploader.upload(file.path, (error, result) => {
      if (error) throw ErrorAPI.internal(error.message);
      return result;
    });
  };
})();
