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

/**
 * @returns Promise<[secure_url, url, ...]> as Result of Upload Stream
 */
export const uploadIntoCloudinary = (() => {
  v2.config(config.cloudinary);
  return async (file: Express.Multer.File) => {
    // console.log("Cloudinary File", file);
    // console.log("File Path", file.path);

    // ``, ${Storage.destination}/${file.filename}
    return new Promise((resolve, reject) => {
      v2.uploader
        .upload_stream(
          { folder: "digitic-blog-images", public_id: file.filename },
          (error, result) => {
            if (error) {
              return reject(ErrorAPI.internal(error.message));
            }

            console.log("Result", [result.secure_url, result.url]);

            return resolve(result);
          }
        )
        .end(file.buffer);
    });
  };
})(); // IIFE
