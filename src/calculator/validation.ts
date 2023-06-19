import { ValidationError } from "express-validator";
import { BadRequestError } from "../errorHandling/httpError";

const { check } = require("express-validator");

/**
 * Function to map the errors from the express-validator to the custom errors
 * @param
 * @returns
 */
export function validate(method: string): any {
  switch (method) {
    case "calculateTextCredibility": {
      return [
        check("text", "text.REQUIRED").exists(),
        check("text", "text.NOT_EMPTY").not().isEmpty(),
        check("text", "text.STRING").isString(),
        check("text", "text.MAX_SIZE_1000").isLength({ max: 1000 }),
        check("weightSpam", "weightSpam.REQUIRED").exists(),
        check("weightSpam", "weightSpam.NUMBER").isFloat(),
        check("weightSpam", "weightSpam.NOT_IN_RANGE").isFloat({
          min: 0,
          max: 100,
        }),
        check("weightBadWords", "weightBadWords.REQUIRED").exists(),
        check("weightBadWords", "weightBadWords.NUMBER").isFloat(),
        check("weightBadWords", "weightBadWords.NOT_IN_RANGE").isFloat({
          min: 0,
          max: 100,
        }),
        check("weightMisspelling", "weightMisspelling.REQUIRED").exists(),
        check("weightMisspelling", "weightMisspelling.NUMBER").isFloat(),
        check("weightMisspelling", "weightMisspelling.NOT_IN_RANGE").isFloat({
          min: 0,
          max: 100,
        }),
        check("weightSemantic", "weightSemantic.REQUIRED").exists(),
        check("weightSemantic", "weightSemantic.NUMBER").isFloat(),
        check("weightSemantic", "weightSemantic.NOT_IN_RANGE").isFloat({
          min: 0,
          max: 100,
        }),
        check(
          "WEIGHT_TEXT_CRED_SUM_NOT_1",
          "customValidation.WEIGHT_TEXT_CRED_NOT_EQUALS_TO_1"
        ).custom(
          (val: string, obj: any) =>
            Math.abs(
              parseFloat(obj.req.query.weightSpam) +
                parseFloat(obj.req.query.weightBadWords) +
                parseFloat(obj.req.query.weightMisspelling) +
                parseFloat(obj.req.query.weightSemantic) -
                1
            ) < Number.EPSILON
        ),
      ];
    }
    case "calculateTweetCredibility": {
      return [
        check("tweetId", "tweetId.REQUIRED").exists(),
        check("weightSpam", "weightSpam.REQUIRED").exists(),
        check("weightSpam", "weightSpam.NUMBER").isFloat(),
        check("weightSpam", "weightSpam.NOT_IN_RANGE").isFloat({
          min: 0,
          max: 100,
        }),
        check("weightBadWords", "weightBadWords.REQUIRED").exists(),
        check("weightBadWords", "weightBadWords.NUMBER").isFloat(),
        check("weightBadWords", "weightBadWords.NOT_IN_RANGE").isFloat({
          min: 0,
          max: 100,
        }),
        check("weightMisspelling", "weightMisspelling.REQUIRED").exists(),
        check("weightMisspelling", "weightMisspelling.NUMBER").isFloat(),
        check("weightMisspelling", "weightMisspelling.NOT_IN_RANGE").isFloat({
          min: 0,
          max: 100,
        }),
        check("weightSemantic", "weightSemantic.REQUIRED").exists(),
        check("weightSemantic", "weightSemantic.NUMBER").isFloat(),
        check("weightSemantic", "weightSemantic.NOT_IN_RANGE").isFloat({
          min: 0,
          max: 100,
        }),
        check("weightText", "weightText.REQUIRED").exists(),
        check("weightText", "weightText.NUMBER").isFloat(),
        check("weightText", "weightText.NOT_IN_RANGE").isFloat({
          min: 0,
          max: 100,
        }),
        check("weightUser", "weightUser.REQUIRED").exists(),
        check("weightUser", "weightUser.NUMBER").isFloat(),
        check("weightUser", "weightUser.NOT_IN_RANGE").isFloat({
          min: 0,
          max: 100,
        }),
        check("weightSocial", "weightSocial.REQUIRED").exists(),
        check("weightSocial", "weightSocial.NUMBER").isFloat(),
        check("weightSocial", "weightSocial.NOT_IN_RANGE").isFloat({
          min: 0,
          max: 100,
        }),
        check("weightTopic", "weightTopic.REQUIRED").exists(),
        check("weightTopic", "weightTopic.NUMBER").isFloat(),
        check("weightTopic", "weightTopic.NOT_IN_RANGE").isFloat({
          min: 0,
          max: 100,
        }),
        check("maxFollowers", "maxFollowers.NUMBER").isInt(),
        check("maxFollowers", "maxFollowers.POSITIVE").isInt({ gt: -1 }),
        check(
          "WEIGHT_TEXT_CRED_SUM_NOT_1",
          "customValidation.WEIGHT_TEXT_CRED_NOT_EQUALS_TO_1"
        ).custom(
          (val: string, obj: any) =>
            Math.abs(
              parseFloat(obj.req.query.weightSpam) +
                parseFloat(obj.req.query.weightBadWords) +
                parseFloat(obj.req.query.weightMisspelling) +
                parseFloat(obj.req.query.weightSemantic) -
                1
            ) < Number.EPSILON
        ),
        check(
          "WEIGHT_TWEET_CRED_SUM_NOT_1",
          "customValidation.WEIGHT_TWEET_CRED_NOT_EQUALS_TO_1"
        ).custom(
          (val: string, obj: any) =>
            Math.abs(
              parseFloat(obj.req.query.weightText) +
                parseFloat(obj.req.query.weightUser) +
                parseFloat(obj.req.query.weightSocial) +
                parseFloat(obj.req.query.weightTopic) -
                1
            ) < Number.EPSILON
        ),
      ];
    }
  }
}

export function errorMapper(errors: ValidationError[]): void {
  const mappedErrors = errors.map((error) => {
    return {
      field: "",
      errorMessage: error.msg,
      userErrorMessage: error.msg,
      validationCode: error.msg,
    };
  });
  throw new BadRequestError(mappedErrors);
}
