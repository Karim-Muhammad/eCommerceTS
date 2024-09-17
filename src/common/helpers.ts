import { Response } from "express";
import path from "path";
import config from "../../config";

export const serveStaticFiles = (folder): string =>
  path.join(`${config.root}/static/${folder}`);

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
