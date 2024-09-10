import { Application } from "express";
import app from "./src/app";

import config from "./config";

const server: Application = app.start();

server.listen(config.serverPort, () => {
  const link = `${config.serverDomain}:${config.serverPort}`;
  console.log(`\x1b[33mServer is running at ${link} \x1b[0m`);
});