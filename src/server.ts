import "dotenv/config";
import app from "./app";
import config from "./config";
import dbConnect from "./db/config/mongo";

import { calculateTopicCredibility } from "./calculator/topic-credibility";
import { predictUser, semanticScore } from "./calculator/bot-credibility";

import { obtainCredibilityTweets } from "../tests/tweets_credibility";

import { predictBotByUser, predictBots, predictBotByUsers } from "../tests/bot_credibility";

// Port to listen on
const PORT = config.PORT;

// Start the server
async function main() {
  const start = new Date().getTime();

  console.log("Starting server...");

  try {
    await dbConnect();
    app.listen(PORT, () => {
      console.log("Server listening at port " + PORT);
    });
  } catch (err) {
    console.log("Error starting server: ", err);
  }
  // Credibility of n tweets test/tweets_credibility.ts
  await obtainCredibilityTweets();

  // Testing bot credibility test/bot_credibility.ts
  const predictions = await predictBotByUser("7996082", 1);
  console.log("Predicciones de un usuario:", predictions);

  const predictions2 = await predictBots(10);
  console.log("Predicciones de todos los usuarios:", predictions2);

  const usersIds = ["7996082", "14436030"];
  const predictions3 = await predictBotByUsers(usersIds, 1);
  console.log("Predicciones de dos usuarios:", predictions3);

  // Test getDistance function
  const text =
    "Black teenage boys are not men. They are children. Stop referring to a 17 year old as a man. #ferguson";
  const distance = (await calculateTopicCredibility(text)) * 0.25;
  console.log("Distance: ", distance);

  // Test bot prediction
  const user = {
    user_follows: 100,
    user_status: 100,
    user_favorite: 100,
    user_listed: 100,
    user_friends: 100,
    tweet_retweet: 100,
    tweet_favorite: 100,
    tweet_text: "I love this tweet",
    tweet_lang: "en",
  };
  const prediction = await predictUser(user);
  console.log("Prediction Bot (1) Human (0): ", prediction);

  // Test semantic score
  const score = await semanticScore(text, "en");
  console.log("Semantic score: ", score);

  const elapsed = new Date().getTime() - start;
  console.log("Tiempo total de ejecución: " + elapsed + "ms");
}

main();
