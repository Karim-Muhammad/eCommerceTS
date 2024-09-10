import { connectToDatabase, onceConnected } from "@mongez/monpulse";
import config from "../config";

async function connectDatabase() {
  onceConnected(() => {
    console.log("Successfully Connected to Database!");
  });

  connectToDatabase({
    url: config.db_uri,
    database: config.db_name,
  });
}

export default connectDatabase;
