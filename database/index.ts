// i want to export function in ./connection here
import connectDatabase from "./connection";
export default async function setupDatabase() {
  connectDatabase();
}
