import "dotenv/config";
import app from "./app";
import config from "./config";
import dbConnect from "./db/config/mongo";

import { calculateTopicCredibility } from "./calculator/topic-credibility";

import { getTweetByTweetId } from "./db/services/tweets";

// import { getDistance } from "./calculator/topic-credibility";

// Port to listen on
const PORT = config.PORT;

// Start the server
async function main() {
  console.log("Starting server...");

  try {
    await dbConnect();
    const tweet = await getTweetByTweetId("1651454488429879296");
    console.log(tweet);
    app.listen(PORT, () => {

      console.log("Server listening at port " + PORT);

    });


  } catch (err) {
    console.log("Error starting server: ", err);
  }

  // Test getDistance function
  const text =
    "Black teenage boys are not men. They are children. Stop referring to a 17 year old as a man. #ferguson";
  const distance = await calculateTopicCredibility(text, 0.25);
  console.log("Distance: ", distance);

  // Test getTweetByTweetId function
  const tweetId = "1651454488429879296";
  const tweet = await getTweetByTweetId(tweetId);
  console.log(tweet);
}

main();
