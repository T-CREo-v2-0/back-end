import { Router } from "express";
import { getTweets, getTweetsUser, getByTweetId } from "../controllers/tweet";

export const router = Router();

/**
 * http://localhost:3000/tweet/
 */
router.get("/", getTweets);

/**
 * http://localhost:3000/tweet/#IDUSER
 */
router.get("/:id", getTweetsUser);

/**
 * http://localhost:3000/tweet/#IDTWEET
 */
router.get("/tweet/:id", getByTweetId);
