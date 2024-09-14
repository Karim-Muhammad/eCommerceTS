import { connect } from "mongoose";
import config from "../config";

async function connectDatabase() {
  connect(config.db_uri)
    .then(() => {
      console.log("Database connected");
    })
    .catch((error) => {
      console.log("Database connection failed", error);
    });
}

export default connectDatabase;
