import express from "express";
import { validationResult } from "express-validator";

import { validate, errorMapper } from "./validation";
import { Text } from "./models";
import { calculateTextCredibility } from "./text-credibility";
// import {
//     twitterUserCredibility,
//     socialCredibility,
//     calculateTweetCredibility,
//   } from "./service";

const calculatorRoutes = express.Router();

/**
 * Route to calculate the credibility of a plain text
 * @route GET /calculate/plain-text
 */
calculatorRoutes.get(
  "/plain-text",
  validate("calculateTextCredibility"),
  function (req, res) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      errorMapper(errors.array());
    }
    res.json(
      calculateTextCredibility(
        {
          text: req.query.text,
          lang: req.query.lang,
        } as Text,
        {
          weightBadWords:
            req.query.weightBadWords != null ? +req.query.weightBadWords : 0,
          weightMisspelling:
            req.query.weightMisspelling != null
              ? +req.query.weightMisspelling
              : 0,
          weightSpam: req.query.weightSpam != null ? +req.query.weightSpam : 0,
        } as any
      )
    );
  }
);

export default calculatorRoutes;
