import { config } from "dotenv";
config();

export default {
  PORT: process.env.PORT,
  TWITTER_CONSUMER_KEY: process.env.TWITTER_CONSUMER_KEY || "",
  TWITTER_CONSUMER_SECRET: process.env.TWITTER_CONSUMER_SECRET || "",
  TWITTER_ACCESS_TOKEN: process.env.TWITTER_ACCESS_TOKEN || "",
  TWITTER_ACCESS_TOKEN_SECRET: process.env.TWITTER_ACCESS_TOKEN_SECRET || "",
  NODE_ENV: process.env.NODE_ENV || "local",
};
