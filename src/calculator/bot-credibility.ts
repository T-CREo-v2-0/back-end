const path = require("path");

interface PredictUser {
  user_follows: number;
  user_status: number;
  user_favorite: number;
  user_listed: number;
  user_friends: number;
  tweet_retweet: number;
  tweet_favorite: number;
  tweet_text: string;
  tweet_lang: string;
}

/**
 * Predict if a user is a bot or not
 * @param user User to predict
 * @returns A number with the prediction: humar (0) or bot (1)
 */
async function predictUser(user: PredictUser): Promise<number> {
  return new Promise((resolve, reject) => {
    const spawn = require("child_process");
    const scriptPath = path.join(
      __dirname,
      "botModule",
      "predictUser",
      "bot_detection_module.py"
    );

    // Full path go back 2 folders to get to root folder
    const fullPath = path.join(__dirname, "..", "..");
    const envPath = path.join(fullPath, "venv/bin/python");

    const process = spawn.spawnSync(
      envPath,
      [
        scriptPath,
        user.user_follows,
        user.user_status,
        user.user_favorite,
        user.user_listed,
        user.user_friends,
        user.tweet_retweet,
        user.tweet_favorite,
        user.tweet_text,
        user.tweet_lang,
      ],
      {
        encoding: "utf8",
        stdio: "pipe",
        silent: true,
      }
    );

    if (process.error) {
      reject(process.error.toNumber());
    }
    resolve(process.stdout);
  });
}

/**
 * Calculate the semantic score of a tweet
 * @param tweet_text Text of the tweet
 * @param tweet_lang Language of the tweet
 * @returns A number with the semantic score
 * @throws An error if the script fails
 */
function semanticScore(
  tweet_text: String,
  tweet_lang: String
): Promise<number> {
  return new Promise((resolve, reject) => {
    const spawn = require("child_process");
    const scriptPath = path.join(
      __dirname,
      "botModule",
      "semantic",
      "semantic_analysis.py"
    );

    // Full path go back 2 folders to get to root folder
    const fullPath = path.join(__dirname, "..", "..");
    const envPath = path.join(fullPath, "venv/bin/python");

    const process = spawn.spawnSync(
      envPath,
      [scriptPath, tweet_text, tweet_lang],
      {
        encoding: "utf8",
        stdio: "pipe",
        silent: true,
      }
    );

    if (process.error) {
      reject(process.error.toNumber());
    }
    resolve(process.stdout);
  });
}
//////////////////////////////////////////////////////////////////////////////

export { semanticScore, predictUser };
