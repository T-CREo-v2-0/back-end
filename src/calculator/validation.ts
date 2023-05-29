import { ValidationError } from 'express-validator'
import { BadRequestError } from '../errorHandling/httpError'

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
        check(
          "WEIGHT_TEXT_CRED_SUM_NOT_1",
          "customValidation.WEIGHT_TEXT_CRED_NOT_EQUALS_TO_1"
        ).custom(
          (val: string, obj: any) =>
            Math.abs(
              parseFloat(obj.req.query.weightSpam) +
                parseFloat(obj.req.query.weightBadWords) +
                parseFloat(obj.req.query.weightMisspelling) -
                1
            ) < Number.EPSILON
        ),
      ];
    }
  }
}

export function errorMapper(errors: ValidationError[]) : void {
    const mappedErrors = errors.map((error) => {
      return {
        'field': '',
        'errorMessage': error.msg,
        'userErrorMessage': error.msg,
        'validationCode': error.msg
      }
    })
    throw new BadRequestError(mappedErrors)
  }