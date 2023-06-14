import "dotenv/config";
import app from "./app";
import config from "./config";
import dbConnect from "./db/config/mongo";

// import { getDistance } from "./calculator/topic-credibility";

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

  // // Test getDistance function
  // const text = "Black teenage boys are not men. They are children. Stop referring to a 17 year old as a man. #ferguson";
  // const distance = await getDistance(text);
  // console.log("Distance: ", distance);
}

main();
