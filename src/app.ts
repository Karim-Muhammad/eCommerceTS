import express, { Application } from "express";

import dotenv from "dotenv";
dotenv.config();

import config from "../config";
import connectDatabase from "../database";

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
  }
  private setupRoutesMiddlewares() {}

  public start() {
    this.setupDatabase();
    this.setupStandardMiddlewares();
    this.setupRoutesMiddlewares();

    return this.app;
  }
}

export default new App();
