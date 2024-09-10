import dbConfig from "@mongez/config";
// i want to export function in ./connection here
import connectDatabase from "./connection";
export default async function setupDatabase() {
  connectDatabase();

  dbConfig.set({
    app: {
      timezone: "Africa/Cairo",
    },
  });
}
