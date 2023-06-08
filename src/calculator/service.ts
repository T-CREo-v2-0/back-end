import {
  Credibility,
  TweetCredibilityWeights,
  TwitterUser,
  Tweet,
} from "./models";
import { calculateTextCredibility, spellCheckers } from "./text-credibility";
import { calculateSocialCredibility } from "./social-credibility";
import { calculateUserCredibility } from "./user-credibility";

// ------------- USER CREDIBILITY -------------
/**
 * Create a TwitterUser from a Twitter API response
 * @param response The Twitter API response
 * @returns A promise of a TwitterUser
 */
function responseToTwitterUser(response: any): TwitterUser {
  return {
    verified: response.verified,
    yearJoined: response.created_at.split(" ").pop(),
    followersCount: response.followers_count,
    friendsCount: response.friends_count,
  };
}

/**
 * Gets user info:
 * @param userId The id of the user
 * @returns The user info
 */
async function getUserInfo(userId: string): Promise<TwitterUser> {
  // TO-DO: Buscar en la BD o API el user
  console.log("TO-DO: Buscar en la BD el user", userId);
  return {
    verified: true,
    yearJoined: 2010,
    followersCount: 100,
    friendsCount: 100,
  };
}

/**
 * Returns the credibility of a user, based on the calculated credibility of the user
 * @param userID The id of the user
 * @returns The credibility of the user
 */
async function twitterUserCredibility(userId: string) {
  return getUserInfo(userId).then((response) => {
    return {
      credibility: calculateUserCredibility(response),
    };
  });
}

/**
 * Returns the social credibility of a user, based on the calculated
 * social credibility of the user
 * @param userID The id of the user
 * @param maxFollowers The maximum number of followers
 * @returns The social credibility of the user
 */
async function socialCredibility(userID: string, maxFollowers: number) {
  const response: TwitterUser = await getUserInfo(userID);
  return {
    credibility: calculateSocialCredibility(response, maxFollowers),
  };
}

// ------------- TWEET CREDIBILITY -------------
/**
 * Create a Tweet from a Twitter API response
 * @param response The Twitter API response
 * @returns A promise of a Tweet
 */
function responseToTweet(response: any): Tweet {
  return {
    text: {
      text: response.full_text,
      lang: Object.keys(spellCheckers).includes(response.lang)
        ? response.lang
        : "en",
    },
    user: responseToTwitterUser(response.user),
  };
}

/**
 * Gets tweet info:
 * @param tweetId The id of the tweet
 * @returns The tweet info
 */
async function getTweetInfo(tweetId: string): Promise<Tweet> {
  // TO-DO: Buscar en la BD o API el tweet
  console.log("TO-DO: Buscar en la BD el tweet", tweetId);
  return responseToTweet({
    full_text: "This is a tweet",
    lang: "en",
    user: {
      verified: true,
      created_at: "Mon Nov 29 21:18:15 +0000 2010",
      followers_count: 100,
      friends_count: 100,
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
    const tweet: Tweet = await getTweetInfo(tweetId);
    const user: TwitterUser = tweet.user;

    const userCredibility: number =
      calculateUserCredibility(user) * params.weightUser;
    const textCredibility: number =
      calculateTextCredibility(tweet.text, params).credibility *
      params.weightText;
    const socialCredibility: number =
      calculateSocialCredibility(user, maxFollowers) * params.weightSocial;
    return {
      credibility: userCredibility + textCredibility + socialCredibility,
    };
  } catch (e) {
    console.log(e);
    throw e;
  }
}

export { twitterUserCredibility, socialCredibility, calculateTweetCredibility };
