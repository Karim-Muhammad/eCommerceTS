const root = process.cwd();

export default {
  env: process.env.NODE_ENV,

  serverDomain: process.env.SERVER_DOMAIN,
  serverPort: process.env.SERVER_PORT,
  root: root,
  static: "./static/public",

  db_uri: process.env.DB_ATLAS_URI,
  db_name: process.env.DB_NAME,
};
