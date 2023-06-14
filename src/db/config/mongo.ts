import "dotenv/config";
import { connect } from "mongoose";

// function to connect to the database
async function dbConnect(): Promise<void> {
  const DB_URI = (process.env.DB_URI as string) || "";
  connect(DB_URI)
    .then(() => {
      console.log("Connected to the database");
    })
    .catch((err) => {
      console.error("Error connecting to the database", err);
    });
}

export default dbConnect;
