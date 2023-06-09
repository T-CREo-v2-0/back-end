import "dotenv/config";
import app from "./app";
import config from "./config";
import dbConnect from "./config/mongo";

// Port to listen on
const PORT = config.PORT;

// Start the server
async function main() {
  console.log("Starting server...");

  try {
    dbConnect();
    app.listen(PORT, () => {
      console.log("Server listening at port " + PORT);
    });
  } catch (err) {
    console.log("Error starting server: ", err);
  }
}

main();
