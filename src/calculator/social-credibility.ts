import { TwitterUser } from "./models";

/**
 * Returns the impact of the number of followers on the credibility
 * @param userFollowers The number of followers of the user
 * @param maxFollowers The maximum number of followers
 * @returns The impact of the number of followers on the credibility
 */
function followersImpact(userFollowers: number, maxFollowers: number): number {
  return maxFollowers === 0 ? 0 : (userFollowers / maxFollowers) * 50;
}

/**
 * Returns the proportion of followers and following on the credibility
 * @param userFollowers The number of followers of the user
 * @param userFollowing The number of following of the user
 * @returns The proportion of followers and following on the credibility
 */
function ffProportion(userFollowers: number, userFollowing: number): number {
  return userFollowing === 0
    ? 0
    : (userFollowers / (userFollowers + userFollowing)) * 50;
}

/**
 * Calculates the social credibility of a user, based on the number of followers
 * @param user The user to check
 * @param maxFollowers The maximum number of followers
 * @returns The social credibility of the user
 */
function calculateSocialCredibility(
  user: TwitterUser,
  maxFollowers: number
): number {
  const followersImpactCalc = followersImpact(
    user.followersCount,
    maxFollowers
  );
  const ffProportionCalc = ffProportion(user.followersCount, user.friendsCount);
  return Math.min(100, followersImpactCalc + ffProportionCalc);
}

export { calculateSocialCredibility };