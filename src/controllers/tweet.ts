import { Request, Response } from "express";
import {
  getAllTweets,
  getTweetsByUser,
  getTweetByTweetId,
} from "../services/tweets";
import HttpError, {
  InternalServerError,
  NotFoundError,
} from "../errorHandling/httpError";

// this returns all tweets from the database with a specified limit
export const getTweets = async (req: Request, res: Response) => {
  try {
    const limit = req.body.limit || 10;
    const responseTweets = await getAllTweets(limit);
    res.json(responseTweets);
  } catch (error) {
    if (error instanceof HttpError) {
      res.status(error.status).send(error);
    } else {
      res.status(500).send(new InternalServerError());
    }
  }
};

// this returns all tweets from the database from a specified user with a specified limit
export const getTweetsUser = async (req: Request, res: Response) => {
  try {
    const id: string = req.params.id;
    const limit = req.body.limit || 10;
    const tweets = await getTweetsByUser(id, limit);
    return res.json(tweets);
  } catch (error) {
    if (error instanceof HttpError) {
      res.status(error.status).send(error);
    } else {
      res.status(500).send(new InternalServerError());
    }
  }
};

// this returns a tweet from the database with a specified id and its user
export const getByTweetId = async (req: Request, res: Response) => {
  try {
    const tweetId: string = req.params.id;
    const tweet = await getTweetByTweetId(tweetId);
    if (tweet) {
      return res.json(tweet);
    } else {
      return res.status(404).send(new NotFoundError());
    }
  } catch (error) {
    if (error instanceof HttpError) {
      res.status(error.status).send(error);
    } else {
      res.status(500).send(new InternalServerError());
    }
  }
};
