import { Tweet } from './models'
import { predictUser } from './bot-credibility';

/**
 * Returns verified weight
 * @param isUserVerified Whether the user is verified
 * @returns The verified weight
 */
function getVerifWeight(isUserVerified: boolean): number {
  return isUserVerified ? 50 : 0;
}

/**
 * Returns account creation weight
 * @param yearJoined The year the account was created
 * @returns The account creation weight
 */
function getCreationWeight(yearJoined: number): number {
  const currentYear = new Date().getFullYear();
  const twitterCreationYear = 2006;
  const maxAccountAge = currentYear - twitterCreationYear;
  const accountAge = currentYear - yearJoined;
  return 50 * (accountAge / maxAccountAge);
}

/**
 * Calculates the credibility of a user, based on the verification 
 * and account creation year
 * @param user The user to check
 * @returns The credibility of the user
 */
async function calculateUserCredibility(tweet: Tweet): Promise<number> {
  const score = getVerifWeight(tweet.user.verified) + getCreationWeight(tweet.user.yearJoined);
  const data = {
    user_follows: tweet.user.followersCount,
    user_status: tweet.user.statusesCount,
    user_favorite: tweet.user.favoritesCount,
    user_listed: tweet.user.listedCount,
    user_friends: tweet.user.friendsCount,
    tweet_retweet: tweet.retweetCount,
    tweet_favorite: tweet.favoriteCount,
    tweet_text: tweet.text.text,
    tweet_lang: tweet.text.lang,
  };
  
  try {
    const prediction = await predictUser(data);

    // If human, return score
    if (prediction == 0) return score;

    // If bot, reduce score
    if (score > 50) {
      return score * 0.85;
    } else if (score > 35) {
      return score * 0.75;
    } else {
      return score * 0;
    }
  } catch (error) {
    console.log(error);
    return score;
  }
}

export { calculateUserCredibility };