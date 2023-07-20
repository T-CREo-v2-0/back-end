import request from "supertest";
import app from "../../src/app";

describe("Input Validation", () => {
  describe("/GET /calculate/plain-text", () => {
    function testPlainTextCredibility(expectedReturn: any, params: any) {
      return request(app)
        .get("/calculate/plain-text")
        .query(params)
        .expect(expectedReturn);
    }

    it("text.REQUIRED", () => {
      return testPlainTextCredibility(
        {
          status: 400,
          title: "Bad Request",
          message: "A validation failed",
          userMessage: "An error has ocurred",
          errors: [
            {
              field: "",
              errorMessage: "text.REQUIRED",
              userErrorMessage: "text.REQUIRED",
              validationCode: "text.REQUIRED",
            },
            {
              field: "",
              errorMessage: "text.NOT_EMPTY",
              userErrorMessage: "text.NOT_EMPTY",
              validationCode: "text.NOT_EMPTY",
            },
            {
              field: "",
              errorMessage: "text.STRING",
              userErrorMessage: "text.STRING",
              validationCode: "text.STRING",
            },
          ],
        },
        {
          weightSpam: 1,
          weightBadWords: 0,
          weightMisspelling: 0,
          weightSemantic: 0,
        }
      );
    }, 10000);

    it("text.NOT_EMPTY", () => {
      return testPlainTextCredibility(
        {
          status: 400,
          title: "Bad Request",
          message: "A validation failed",
          userMessage: "An error has ocurred",
          errors: [
            {
              field: "",
              errorMessage: "text.NOT_EMPTY",
              userErrorMessage: "text.NOT_EMPTY",
              validationCode: "text.NOT_EMPTY",
            },
          ],
        },
        {
          text: "",
          weightSpam: 1,
          weightBadWords: 0,
          weightMisspelling: 0,
          weightSemantic: 0,
        }
      );
    });

    it("weightSpam.REQUIRED", () => {
      return testPlainTextCredibility(
        {
          status: 400,
          title: "Bad Request",
          message: "A validation failed",
          userMessage: "An error has ocurred",
          errors: [
            {
              field: "",
              errorMessage: "weightSpam.REQUIRED",
              userErrorMessage: "weightSpam.REQUIRED",
              validationCode: "weightSpam.REQUIRED",
            },
            {
              field: "",
              errorMessage: "weightSpam.NUMBER",
              userErrorMessage: "weightSpam.NUMBER",
              validationCode: "weightSpam.NUMBER",
            },
            {
              field: "",
              errorMessage: "weightSpam.NOT_IN_RANGE",
              userErrorMessage: "weightSpam.NOT_IN_RANGE",
              validationCode: "weightSpam.NOT_IN_RANGE",
            },
            {
              field: "",
              errorMessage: "customValidation.WEIGHT_TEXT_CRED_NOT_EQUALS_TO_1",
              userErrorMessage:
                "customValidation.WEIGHT_TEXT_CRED_NOT_EQUALS_TO_1",
              validationCode:
                "customValidation.WEIGHT_TEXT_CRED_NOT_EQUALS_TO_1",
            },
          ],
        },
        {
          text: "test",
          weightBadWords: 0,
          weightMisspelling: 0,
          weightSemantic: 0,
        }
      );
    });

    it("weightSpam.NUMBER", () => {
      return testPlainTextCredibility(
        {
          status: 400,
          title: "Bad Request",
          message: "A validation failed",
          userMessage: "An error has ocurred",
          errors: [
            {
              field: "",
              errorMessage: "weightSpam.NUMBER",
              userErrorMessage: "weightSpam.NUMBER",
              validationCode: "weightSpam.NUMBER",
            },
            {
              field: "",
              errorMessage: "weightSpam.NOT_IN_RANGE",
              userErrorMessage: "weightSpam.NOT_IN_RANGE",
              validationCode: "weightSpam.NOT_IN_RANGE",
            },
            {
              field: "",
              errorMessage: "customValidation.WEIGHT_TEXT_CRED_NOT_EQUALS_TO_1",
              userErrorMessage:
                "customValidation.WEIGHT_TEXT_CRED_NOT_EQUALS_TO_1",
              validationCode:
                "customValidation.WEIGHT_TEXT_CRED_NOT_EQUALS_TO_1",
            },
          ],
        },
        {
          text: "test",
          weightSpam: "test",
          weightBadWords: 0,
          weightMisspelling: 0,
          weightSemantic: 0,
        }
      );
    });

    it("weightSpam.NOT_IN_RANGE", () => {
      return testPlainTextCredibility(
        {
          status: 400,
          title: "Bad Request",
          message: "A validation failed",
          userMessage: "An error has ocurred",
          errors: [
            {
              field: "",
              errorMessage: "weightSpam.NOT_IN_RANGE",
              userErrorMessage: "weightSpam.NOT_IN_RANGE",
              validationCode: "weightSpam.NOT_IN_RANGE",
            },
            {
              field: "",
              errorMessage: "customValidation.WEIGHT_TEXT_CRED_NOT_EQUALS_TO_1",
              userErrorMessage:
                "customValidation.WEIGHT_TEXT_CRED_NOT_EQUALS_TO_1",
              validationCode:
                "customValidation.WEIGHT_TEXT_CRED_NOT_EQUALS_TO_1",
            },
          ],
        },
        {
          text: "test",
          weightSpam: 101,
          weightBadWords: 0,
          weightMisspelling: 0,
          weightSemantic: 0,
        }
      );
    });

    it("weightBadWords.REQUIRED", () => {
      return testPlainTextCredibility(
        {
          status: 400,
          title: "Bad Request",
          message: "A validation failed",
          userMessage: "An error has ocurred",
          errors: [
            {
              field: "",
              errorMessage: "weightBadWords.REQUIRED",
              userErrorMessage: "weightBadWords.REQUIRED",
              validationCode: "weightBadWords.REQUIRED",
            },
            {
              field: "",
              errorMessage: "weightBadWords.NUMBER",
              userErrorMessage: "weightBadWords.NUMBER",
              validationCode: "weightBadWords.NUMBER",
            },
            {
              field: "",
              errorMessage: "weightBadWords.NOT_IN_RANGE",
              userErrorMessage: "weightBadWords.NOT_IN_RANGE",
              validationCode: "weightBadWords.NOT_IN_RANGE",
            },
            {
              field: "",
              errorMessage: "customValidation.WEIGHT_TEXT_CRED_NOT_EQUALS_TO_1",
              userErrorMessage:
                "customValidation.WEIGHT_TEXT_CRED_NOT_EQUALS_TO_1",
              validationCode:
                "customValidation.WEIGHT_TEXT_CRED_NOT_EQUALS_TO_1",
            },
          ],
        },
        { text: "test", weightSpam: 0, weightMisspelling: 0, weightSemantic: 0 }
      );
    });

    it("weightBadWords.NUMBER", () => {
      return testPlainTextCredibility(
        {
          status: 400,
          title: "Bad Request",
          message: "A validation failed",
          userMessage: "An error has ocurred",
          errors: [
            {
              field: "",
              errorMessage: "weightBadWords.NUMBER",
              userErrorMessage: "weightBadWords.NUMBER",
              validationCode: "weightBadWords.NUMBER",
            },
            {
              field: "",
              errorMessage: "weightBadWords.NOT_IN_RANGE",
              userErrorMessage: "weightBadWords.NOT_IN_RANGE",
              validationCode: "weightBadWords.NOT_IN_RANGE",
            },
            {
              field: "",
              errorMessage: "customValidation.WEIGHT_TEXT_CRED_NOT_EQUALS_TO_1",
              userErrorMessage:
                "customValidation.WEIGHT_TEXT_CRED_NOT_EQUALS_TO_1",
              validationCode:
                "customValidation.WEIGHT_TEXT_CRED_NOT_EQUALS_TO_1",
            },
          ],
        },
        {
          text: "test",
          weightSpam: 0,
          weightBadWords: "test",
          weightMisspelling: 0,
          weightSemantic: 0,
        }
      );
    });

    it("weightBadWords.NOT_IN_RANGE", () => {
      return testPlainTextCredibility(
        {
          status: 400,
          title: "Bad Request",
          message: "A validation failed",
          userMessage: "An error has ocurred",
          errors: [
            {
              field: "",
              errorMessage: "weightBadWords.NOT_IN_RANGE",
              userErrorMessage: "weightBadWords.NOT_IN_RANGE",
              validationCode: "weightBadWords.NOT_IN_RANGE",
            },
            {
              field: "",
              errorMessage: "customValidation.WEIGHT_TEXT_CRED_NOT_EQUALS_TO_1",
              userErrorMessage:
                "customValidation.WEIGHT_TEXT_CRED_NOT_EQUALS_TO_1",
              validationCode:
                "customValidation.WEIGHT_TEXT_CRED_NOT_EQUALS_TO_1",
            },
          ],
        },
        {
          text: "test",
          weightSpam: 0,
          weightBadWords: -1,
          weightMisspelling: 0,
          weightSemantic: 0,
        }
      );
    });

    it("weightMisspelling.REQUIRED", () => {
      return testPlainTextCredibility(
        {
          status: 400,
          title: "Bad Request",
          message: "A validation failed",
          userMessage: "An error has ocurred",
          errors: [
            {
              field: "",
              errorMessage: "weightMisspelling.REQUIRED",
              userErrorMessage: "weightMisspelling.REQUIRED",
              validationCode: "weightMisspelling.REQUIRED",
            },
            {
              field: "",
              errorMessage: "weightMisspelling.NUMBER",
              userErrorMessage: "weightMisspelling.NUMBER",
              validationCode: "weightMisspelling.NUMBER",
            },
            {
              field: "",
              errorMessage: "weightMisspelling.NOT_IN_RANGE",
              userErrorMessage: "weightMisspelling.NOT_IN_RANGE",
              validationCode: "weightMisspelling.NOT_IN_RANGE",
            },
            {
              field: "",
              errorMessage: "customValidation.WEIGHT_TEXT_CRED_NOT_EQUALS_TO_1",
              userErrorMessage:
                "customValidation.WEIGHT_TEXT_CRED_NOT_EQUALS_TO_1",
              validationCode:
                "customValidation.WEIGHT_TEXT_CRED_NOT_EQUALS_TO_1",
            },
          ],
        },
        { text: "test", weightSpam: 0, weightBadWords: 0, weightSemantic: 0 }
      );
    }, 1000);

    it("weightMisspelling.NUMBER", () => {
      return testPlainTextCredibility(
        {
          status: 400,
          title: "Bad Request",
          message: "A validation failed",
          userMessage: "An error has ocurred",
          errors: [
            {
              field: "",
              errorMessage: "weightMisspelling.NUMBER",
              userErrorMessage: "weightMisspelling.NUMBER",
              validationCode: "weightMisspelling.NUMBER",
            },
            {
              field: "",
              errorMessage: "weightMisspelling.NOT_IN_RANGE",
              userErrorMessage: "weightMisspelling.NOT_IN_RANGE",
              validationCode: "weightMisspelling.NOT_IN_RANGE",
            },
            {
              field: "",
              errorMessage: "customValidation.WEIGHT_TEXT_CRED_NOT_EQUALS_TO_1",
              userErrorMessage:
                "customValidation.WEIGHT_TEXT_CRED_NOT_EQUALS_TO_1",
              validationCode:
                "customValidation.WEIGHT_TEXT_CRED_NOT_EQUALS_TO_1",
            },
          ],
        },
        {
          text: "test",
          weightSpam: 0,
          weightBadWords: 3.3,
          weightMisspelling: "test",
          weightSemantic: 0,
        }
      );
    });

    it("weightMisspelling.NOT_IN_RANGE", () => {
      return testPlainTextCredibility(
        {
          status: 400,
          title: "Bad Request",
          message: "A validation failed",
          userMessage: "An error has ocurred",
          errors: [
            {
              field: "",
              errorMessage: "weightMisspelling.NOT_IN_RANGE",
              userErrorMessage: "weightMisspelling.NOT_IN_RANGE",
              validationCode: "weightMisspelling.NOT_IN_RANGE",
            },
            {
              field: "",
              errorMessage: "customValidation.WEIGHT_TEXT_CRED_NOT_EQUALS_TO_1",
              userErrorMessage:
                "customValidation.WEIGHT_TEXT_CRED_NOT_EQUALS_TO_1",
              validationCode:
                "customValidation.WEIGHT_TEXT_CRED_NOT_EQUALS_TO_1",
            },
          ],
        },
        {
          text: "test",
          weightSpam: 0,
          weightBadWords: 1,
          weightMisspelling: -10,
          weightSemantic: 0,
        }
      );
    });

    it("customValidation.WEIGHT_TEXT_CRED_SUM_NOT_1", () => {
      return testPlainTextCredibility(
        {
          status: 400,
          title: "Bad Request",
          message: "A validation failed",
          userMessage: "An error has ocurred",
          errors: [
            {
              field: "",
              errorMessage: "customValidation.WEIGHT_TEXT_CRED_NOT_EQUALS_TO_1",
              userErrorMessage:
                "customValidation.WEIGHT_TEXT_CRED_NOT_EQUALS_TO_1",
              validationCode:
                "customValidation.WEIGHT_TEXT_CRED_NOT_EQUALS_TO_1",
            },
          ],
        },
        {
          text: "test",
          weightSpam: 0,
          weightBadWords: 0.4,
          weightMisspelling: 0.4,
          weightSemantic: 0,
        }
      );
    });
  });

  describe("/GET /calculate/tweet", () => {
    function testTweetRoute(expectedReturn: any, params: any) {
      return request(app)
        .get("/calculate/tweet")
        .query(params)
        .expect(expectedReturn);
    }

    it("should return an error if tweetId is not provided", () => {
      return testTweetRoute(
        {
          status: 500,
          title: "Internal Server Error",
          message: "An error has ocurred",
          userMessage: "An error has ocurred",
        },
        {
          tweetId: "",
          maxFollowers: 2000,
          weightSpam: 0,
          weightBadWords: 1,
          weightMisspelling: 0,
          weightSemantic: 0,
          weightText: 0,
          weightUser: 0.5,
          weightSocial: 0.5,
          weightTopic: 0,
        }
      );
    }, 100000);

    it("weightBadWords.NOT_IN_RANGE", () => {
      return testTweetRoute(
        {
          status: 400,
          title: "Bad Request",
          message: "A validation failed",
          userMessage: "An error has ocurred",
          errors: [
            {
              field: "",
              errorMessage: "weightBadWords.NOT_IN_RANGE",
              userErrorMessage: "weightBadWords.NOT_IN_RANGE",
              validationCode: "weightBadWords.NOT_IN_RANGE",
            },
            {
              field: "",
              errorMessage: "customValidation.WEIGHT_TEXT_CRED_NOT_EQUALS_TO_1",
              userErrorMessage:
                "customValidation.WEIGHT_TEXT_CRED_NOT_EQUALS_TO_1",
              validationCode:
                "customValidation.WEIGHT_TEXT_CRED_NOT_EQUALS_TO_1",
            },
          ],
        },
        {
          tweetId: 1651454488429879300,
          maxFollowers: 2000,
          weightSpam: 0,
          weightBadWords: -1,
          weightMisspelling: 0,
          weightSemantic: 0,
          weightText: 0,
          weightUser: 0.5,
          weightSocial: 0.5,
          weightTopic: 0,
        }
      );
    }, 100000);

    it("weightMisspelling.NOT_IN_RANGE", () => {
      return testTweetRoute(
        {
          status: 400,
          title: "Bad Request",
          message: "A validation failed",
          userMessage: "An error has ocurred",
          errors: [
            {
              field: "",
              errorMessage: "weightMisspelling.NOT_IN_RANGE",
              userErrorMessage: "weightMisspelling.NOT_IN_RANGE",
              validationCode: "weightMisspelling.NOT_IN_RANGE",
            },
            {
              field: "",
              errorMessage: "customValidation.WEIGHT_TEXT_CRED_NOT_EQUALS_TO_1",
              userErrorMessage:
                "customValidation.WEIGHT_TEXT_CRED_NOT_EQUALS_TO_1",
              validationCode:
                "customValidation.WEIGHT_TEXT_CRED_NOT_EQUALS_TO_1",
            },
          ],
        },
        {
          tweetId: 1651454488429879300,
          maxFollowers: 2000,
          weightSpam: 0,
          weightBadWords: 1,
          weightMisspelling: 1000,
          weightSemantic: 0,
          weightText: 0.2,
          weightUser: 0.3,
          weightSocial: 0.5,
          weightTopic: 0,
        }
      );
    });

    it("weightSpam.NOT_IN_RANGE", () => {
      return testTweetRoute(
        {
          status: 400,
          title: "Bad Request",
          message: "A validation failed",
          userMessage: "An error has ocurred",
          errors: [
            {
              field: "",
              errorMessage: "weightSpam.NOT_IN_RANGE",
              userErrorMessage: "weightSpam.NOT_IN_RANGE",
              validationCode: "weightSpam.NOT_IN_RANGE",
            },
            {
              field: "",
              errorMessage: "customValidation.WEIGHT_TEXT_CRED_NOT_EQUALS_TO_1",
              userErrorMessage:
                "customValidation.WEIGHT_TEXT_CRED_NOT_EQUALS_TO_1",
              validationCode:
                "customValidation.WEIGHT_TEXT_CRED_NOT_EQUALS_TO_1",
            },
          ],
        },
        {
          tweetId: 1651454488429879300,
          maxFollowers: 2000,
          weightSpam: -10,
          weightBadWords: 1,
          weightMisspelling: 0,
          weightSemantic: 0,
          weightText: 0.9,
          weightUser: 0.1,
          weightSocial: 0,
          weightTopic: 0,
        }
      );
    });

    it("weightSemantic.NOT_IN_RANGE", () => {
      return testTweetRoute(
        {
          status: 400,
          title: "Bad Request",
          message: "A validation failed",
          userMessage: "An error has ocurred",
          errors: [
            {
              field: "",
              errorMessage: "weightSemantic.NOT_IN_RANGE",
              userErrorMessage: "weightSemantic.NOT_IN_RANGE",
              validationCode: "weightSemantic.NOT_IN_RANGE",
            },
            {
              field: "",
              errorMessage: "customValidation.WEIGHT_TEXT_CRED_NOT_EQUALS_TO_1",
              userErrorMessage:
                "customValidation.WEIGHT_TEXT_CRED_NOT_EQUALS_TO_1",
              validationCode:
                "customValidation.WEIGHT_TEXT_CRED_NOT_EQUALS_TO_1",
            },
          ],
        },
        {
          tweetId: 1651454488429879300,
          maxFollowers: 2000,
          weightSpam: 0,
          weightBadWords: 1,
          weightMisspelling: 0,
          weightSemantic: 1000,
          weightText: 0.9,
          weightUser: 0.1,
          weightSocial: 0,
          weightTopic: 0,
        }
      );
    });

    it("maxFollowers.POSITIVE", () => {
      return testTweetRoute(
        {
          status: 400,
          title: "Bad Request",
          message: "A validation failed",
          userMessage: "An error has ocurred",
          errors: [
            {
              field: "",
              errorMessage: "maxFollowers.POSITIVE",
              userErrorMessage: "maxFollowers.POSITIVE",
              validationCode: "maxFollowers.POSITIVE",
            },
          ],
        },
        {
          tweetId: 1651454488429879300,
          maxFollowers: -1,
          weightSpam: 0,
          weightBadWords: 1,
          weightMisspelling: 0,
          weightSemantic: 0,
          weightText: 0,
          weightUser: 1,
          weightSocial: 0,
          weightTopic: 0,
        }
      );
    });

    it("weightUser.NOT_IN_RANGE", () => {
      return testTweetRoute(
        {
          status: 400,
          title: "Bad Request",
          message: "A validation failed",
          userMessage: "An error has ocurred",
          errors: [
            {
              field: "",
              errorMessage: "weightUser.NOT_IN_RANGE",
              userErrorMessage: "weightUser.NOT_IN_RANGE",
              validationCode: "weightUser.NOT_IN_RANGE",
            },
            {
              field: "",
              errorMessage:
                "customValidation.WEIGHT_TWEET_CRED_NOT_EQUALS_TO_1",
              userErrorMessage:
                "customValidation.WEIGHT_TWEET_CRED_NOT_EQUALS_TO_1",
              validationCode:
                "customValidation.WEIGHT_TWEET_CRED_NOT_EQUALS_TO_1",
            },
          ],
        },
        {
          tweetId: 1651454488429879300,
          maxFollowers: 2000,
          weightSpam: 0,
          weightBadWords: 1,
          weightMisspelling: 0,
          weightSemantic: 0,
          weightText: 0,
          weightUser: -10,
          weightSocial: 0,
          weightTopic: 0,
        }
      );
    });

    it("weightTopic.NOT_IN_RANGE", () => {
      return testTweetRoute(
        {
          status: 400,
          title: "Bad Request",
          message: "A validation failed",
          userMessage: "An error has ocurred",
          errors: [
            {
              field: "",
              errorMessage: "weightTopic.NOT_IN_RANGE",
              userErrorMessage: "weightTopic.NOT_IN_RANGE",
              validationCode: "weightTopic.NOT_IN_RANGE",
            },
            {
              field: "",
              errorMessage:
                "customValidation.WEIGHT_TWEET_CRED_NOT_EQUALS_TO_1",
              userErrorMessage:
                "customValidation.WEIGHT_TWEET_CRED_NOT_EQUALS_TO_1",
              validationCode:
                "customValidation.WEIGHT_TWEET_CRED_NOT_EQUALS_TO_1",
            },
          ],
        },
        {
          tweetId: 1651454488429879300,
          maxFollowers: 2000,
          weightSpam: 0,
          weightBadWords: 1,
          weightMisspelling: 0,
          weightSemantic: 0,
          weightText: 0,
          weightUser: 0,
          weightSocial: 0,
          weightTopic: 2000,
        }
      );
    });

    it("customValidation.WEIGHT_TEXT_CRED_NOT_EQUALS_TO_1", () => {
      return testTweetRoute(
        {
          status: 400,
          title: "Bad Request",
          message: "A validation failed",
          userMessage: "An error has ocurred",
          errors: [
            {
              field: "",
              errorMessage: "customValidation.WEIGHT_TEXT_CRED_NOT_EQUALS_TO_1",
              userErrorMessage:
                "customValidation.WEIGHT_TEXT_CRED_NOT_EQUALS_TO_1",
              validationCode:
                "customValidation.WEIGHT_TEXT_CRED_NOT_EQUALS_TO_1",
            },
          ],
        },
        {
          tweetId: 1651454488429879300,
          maxFollowers: 2000,
          weightSpam: 0.3,
          weightBadWords: 0.3,
          weightMisspelling: 0.3,
          weightSemantic: 0,
          weightText: 0,
          weightUser: 1,
          weightSocial: 0,
          weightTopic: 0,
        }
      );
    });

    it("customValidation.WEIGHT_TWEET_CRED_SUM_NOT_1", () => {
      return testTweetRoute(
        {
          status: 400,
          title: "Bad Request",
          message: "A validation failed",
          userMessage: "An error has ocurred",
          errors: [
            {
              field: "",
              errorMessage:
                "customValidation.WEIGHT_TWEET_CRED_NOT_EQUALS_TO_1",
              userErrorMessage:
                "customValidation.WEIGHT_TWEET_CRED_NOT_EQUALS_TO_1",
              validationCode:
                "customValidation.WEIGHT_TWEET_CRED_NOT_EQUALS_TO_1",
            },
          ],
        },
        {
          tweetId: 1651454488429879300,
          maxFollowers: 2000,
          weightSpam: 0.3,
          weightBadWords: 0.3,
          weightMisspelling: 0.4,
          weightSemantic: 0,
          weightText: 1,
          weightUser: 1,
          weightSocial: 0,
          weightTopic: 0,
        }
      );
    });
  });
});
