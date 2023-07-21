import { getSelectedFieldsByUser, getUsersId } from "../src/db/services/tweets";
import { predictUser } from "../src/calculator/bot-credibility";

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

// predict if is a bot using selected fields by user
export const predictBotByUser = async (id: string, limit: number) => {
  const fields = await getSelectedFieldsByUser(id, limit);
  const predictions = fields.map((field) => {
    const user: PredictUser = {
      user_follows: field.user.followers_count,
      user_status: field.user.statuses_count,
      user_favorite: field.user.favourites_count,
      user_listed: field.user.listed_count,
      user_friends: field.user.friends_count,
      tweet_retweet: field.retweet_count,
      tweet_favorite: field.favorite_count,
      tweet_text: field.text,
      tweet_lang: field.lang,
    };
    return predictUser(user);
  });
  return Promise.all(predictions);
};

// Call predictBotByUser for each user
export async function predictBotByUsers(
  userIds: string[],
  limit: number
): Promise<void> {
  for (const userId of userIds) {
    const predictions = await predictBotByUser(userId, limit);
    console.log(`Predictions for user ${userId}:`, predictions);
  }
}

// this get users id and call predictBotByUsers
export async function predictBots(limit: number): Promise<void> {
  const userIds = await getUsersId();
  await predictBotByUsers(userIds, limit);
}

export async function printUserIds(): Promise<void> {
  const userIds = await getUsersId();
  console.log(userIds);
}
