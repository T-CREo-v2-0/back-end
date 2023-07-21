import TweetModel from "../models/tweet";

// this returns all tweets from the database with a specified limit
export const getAllTweets = async (limit: number) => {
  const responseTweets = await TweetModel.find({}).limit(limit);
  return responseTweets;
};

// this returns all tweets from the database from a specified user with a specified limit
export const getTweetsByUser = async (id: string, limit: number) => {
  const tweets = await TweetModel.find({ "user.id": id }).limit(limit);
  return tweets;
};

// this returns a tweet from the database with a specified id and its user
export const getTweetByTweetId = async (idStr: string) => {
  try {
    const tweet = await TweetModel.findOne({ id_str: idStr });
    return tweet;
  } catch (error) {
    throw error;
  }
};

// this returns a selected fields by user from the database
export const getSelectedFieldsByUser = async (id: string, limit: number) => {
  const fields = await TweetModel.find(
    { "user.id": id },
    {
      "user.followers_count": 1,
      "user.friends_count": 1,
      "user.listed_count": 1,
      "user.favourites_count": 1,
      "user.statuses_count": 1,
      retweet_count: 1,
      favorite_count: 1,
      text: 1,
      lang: 1
    }
  ).limit(limit);
  return fields;
};

// this returns the id of users in the database
export const getUsersId = async () => {
  const userIds = await TweetModel.distinct("user.id");
  return userIds;
};
