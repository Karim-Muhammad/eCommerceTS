import path from "path";
import config from "../../config";

export const serveStaticFiles = (folder): string =>
  path.join(`${config.root}/static/${folder}`);
