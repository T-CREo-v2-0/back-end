import express from "express";
import { validationResult } from "express-validator";

import { validate, errorMapper } from "./validation";
import { Text } from "./models";
import { calculateTextCredibility } from "./text-credibility";
import { calculateTweetCredibility } from "./service";
import { asyncWrap } from "../utils";

const calculatorRoutes = express.Router();

/**
 * Route to calculate the credibility of a plain text
 * @route GET /calculate/plain-text
 */
calculatorRoutes.get(
  "/plain-text",
  validate("calculateTextCredibility"),
  asyncWrap(async function (req, res) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      errorMapper(errors.array());
    }
    res.json(
      await calculateTextCredibility(
        {
          text: req.query.text,
          lang: req.query.lang,
        } as Text,
        {
          weightBadWords:
            req.query.weightBadWords != null ? +req.query.weightBadWords : 0.33,
          weightMisspelling:
            req.query.weightMisspelling != null
              ? +req.query.weightMisspelling
              : 0.23,
          weightSpam:
            req.query.weightSpam != null ? +req.query.weightSpam : 0.44,
          weightSemantic:
            req.query.weightSemantic != null ? +req.query.weightSemantic : 0.0,
        } as any
      )
    );
  })
);

/**
 * Route to calculate the credibility of a tweet
 * @route GET /calculator/tweet
 */
calculatorRoutes.get(
  "/tweet",
  validate("calculateTweetCredibility"),
  asyncWrap(async function (req, res) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      errorMapper(errors.array());
    }
    res.json(
      await calculateTweetCredibility(
        req.query.tweetId as string,
        {
          weightBadWords:
            req.query.weightBadWords != null ? +req.query.weightBadWords : 0.33,
          weightMisspelling:
            req.query.weightMisspelling != null
              ? +req.query.weightMisspelling
              : 0.23,
          weightSpam:
            req.query.weightSpam != null ? +req.query.weightSpam : 0.44,
          weightSemantic:
            req.query.weightSemantic != null ? +req.query.weightSemantic : 0.0,
          weightSocial:
            req.query.weightSocial != null ? +req.query.weightSocial : 0.25,
          weightText:
            req.query.weightText != null ? +req.query.weightText : 0.25,
          weightUser:
            req.query.weightUser != null ? +req.query.weightUser : 0.25,
          weightTopic:
            req.query.weightTopic != null ? +req.query.weightTopic : 0.25,
        } as any,
        req.query.maxFollowers != null ? +req.query.maxFollowers : 2000000
      )
    );
  })
);

export default calculatorRoutes;
