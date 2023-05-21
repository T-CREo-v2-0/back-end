import { TwitterUser } from './models'

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
function calculateUserCredibility(user: TwitterUser): number {
  return getVerifWeight(user.verified) + getCreationWeight(user.yearJoined);
}

export { calculateUserCredibility };