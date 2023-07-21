import "dotenv/config";
import config from "../src/config"
import axios from 'axios';

import  {getAllTweets}  from "../src/db/services/tweets"

const tweetCredibilityEndpoint = config.URL_ROUTE_CREDIBILITY;
const tweetNumber = config.TWEET_NUMBER;
const TweetCredibilityWeights = {
    weightSpam: 0.44,
    weightBadWords: 0.33,
    weightMisspelling: 0.23,
    weightSemantic: 0.0,
    weightText: 0.25,
    weightUser: 0.25,
    weightSocial: 0.25,
    weightTopic: 0.25,
  }
const  maxFollowers = 2000000;

// Función para obtener la credibilidad de un tweet
export async function obtainCredibilityTweet(tweetId: string): Promise<void> {
  try {
    const url = tweetCredibilityEndpoint
    const response = await axios.get(url, {
        params: {
          tweetId,
          ...TweetCredibilityWeights,
          maxFollowers,
        },
      });
    return response.data;
  } catch (error) {
    console.error(`Error al obtener la credibilidad del tweet ${tweetId}:`, error);
  }
}

// Obtener la credibilidad de 20 tweets
export async function obtainCredibilityTweets(): Promise<void> {
    const tweets =  await getAllTweets(parseInt(tweetNumber));
    for (const tweet of tweets) {
        const credibilidad = await obtainCredibilityTweet(tweet.id_str);
        console.log(`Credibility of tweet ${tweet.id_str}:`, credibilidad);
    };

}
