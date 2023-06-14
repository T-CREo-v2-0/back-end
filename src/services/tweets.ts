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
export const getTweetByTweetId = async (idStr:string) => {
  try {
    const hola = "1651454488429879296";
    console.log(hola);
    const tweet = await TweetModel.findOne({ id_str: hola});
    console.log(tweet);
    return tweet;
  } catch (error) {
    throw error;
  }
}
