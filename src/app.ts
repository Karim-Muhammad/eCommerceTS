import express, { Application } from "express";
import cookiesParser from "cookie-parser";
import morgran from "morgan";

import dotenv from "dotenv";
dotenv.config();

import config from "../config";
import connectDatabase from "../database";

// Features
import apps from "./features";

class App {
  private app: Application;

  constructor() {
    this.app = express();
  }

  private setupDatabase() {
    connectDatabase();
  }
  private setupStandardMiddlewares() {
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use("/static", express.static(`${config.static}`));
    this.app.use(cookiesParser());
    this.app.use(morgran("dev"));
  }
  private setupRoutesMiddlewares() {
    this.app.use("/", apps);
  }

  public start() {
    this.setupDatabase();
    this.setupStandardMiddlewares();
    this.setupRoutesMiddlewares();

    return this.app;
  }
}

export default new App();
