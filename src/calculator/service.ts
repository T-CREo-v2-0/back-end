/**
 * Twitter Credibility Calculator
 */

import {
  Credibility,
  TweetCredibilityWeights,
  TwitterUser,
  Tweet,
} from "./models";
import { calculateTextCredibility, spellCheckers } from "./text-credibility";
import { calculateSocialCredibility } from "./social-credibility";
import { calculateUserCredibility } from "./user-credibility";
import { calculateTopicCredibility } from "./topic-credibility";
import { getTweetByTweetId } from "../db/services/tweets";

/**
 * Create a TwitterUser from a Twitter API response
 * @param response The Twitter API response
 * @returns A promise of a TwitterUser
 */
function responseToTwitterUser(response: any): TwitterUser {
  return {
    verified: response.verified,
    yearJoined: response.created_at?.split(" ").pop(),
    followersCount: response.followers_count,
    friendsCount: response.friends_count,
    statusesCount: response.statuses_count,
    favoritesCount: response.favourites_count,
    listedCount: response.listed_count,
  };
}

/**
 * Create a Tweet from a Twitter API response
 * @param response The Twitter API response
 * @returns A promise of a Tweet
 */
function responseToTweet(response: any): Tweet {
  return {
    text: {
      text: response.full_text || "",
      lang: Object.keys(spellCheckers).includes(response.lang)
        ? response.lang
        : "en",
    },
    user: responseToTwitterUser(response.user),
    retweetCount: response.retweet_count,
    favoriteCount: response.favorite_count,
  };
}

/**
 * Gets tweet info:
 * @param tweetId The id of the tweet
 * @returns The tweet info
 */
async function getTweetInfo(tweetId: string): Promise<Tweet> {
  // Buscar en la BD o API el tweet
  const tweet = await getTweetByTweetId(tweetId);
  return responseToTweet({
    full_text: tweet?.text,
    lang: tweet?.lang,
    user: {
      verified: tweet?.user.verified,
      created_at: tweet?.user.created_at,
      followers_count: tweet?.user.followers_count,
      friends_count: tweet?.user.friends_count,
      statuses_count: tweet?.user.statuses_count,
      favorites_count: tweet?.user.favourites_count,
      listed_count: tweet?.user.listed_count,
    },
  });
}

/**
 * Returns the credibility of a tweet, based on the credibility of the user,
 * the text and the social credibility
 * @param tweetId The id of the tweet
 * @param params The weights of each criteria
 * @param maxFollowers The maximum number of followers
 * @returns The credibility of the tweet
 */
async function calculateTweetCredibility(
  tweetId: string,
  params: TweetCredibilityWeights,
  maxFollowers: number
): Promise<Credibility> {
  try {
    console.log("Calculating credibility of tweet", tweetId);
    const start = performance.now();
    const tweet: Tweet = await getTweetInfo(tweetId);
    const user: TwitterUser = tweet.user;

    const userCredibility: number =
      (await calculateUserCredibility(tweet)) * params.weightUser;

    const textCredibility: number = (
      await calculateTextCredibility(tweet.text, params)
    ).credibility;
    params.weightText;

    const socialCredibility: number =
      calculateSocialCredibility(user, maxFollowers) * params.weightSocial;
      
    const topicCredibility: number =
      (await calculateTopicCredibility(tweet.text.text)) * params.weightTopic;

    const result =
      userCredibility + textCredibility + socialCredibility + topicCredibility;
    const end = performance.now();

    console.log(
      JSON.stringify({
        time: end - start,
        metric: "TWEET_CREDIBILITY",
      })
    );

    return {
      credibility: result,
    };
  } catch (e) {
    console.log(e);
    throw e;
  }
}

export { calculateTweetCredibility };
