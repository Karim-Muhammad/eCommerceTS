import { RequestHandler } from "express";

export type ResourceApiController = {
  all?: RequestHandler;
  create: RequestHandler;
  read: RequestHandler;

  singleResource?: RequestHandler;
  readOne: RequestHandler;
  update: RequestHandler;
  delete: RequestHandler;
};
