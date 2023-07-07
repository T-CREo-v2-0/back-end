import {
  BadRequestError,
  UnauthorizedError,
  UnauthenticatedError,
  NotFoundError,
  InternalServerError,
} from "../../src/errorHandling/httpError";

const assert = require("assert");

describe("Error Handler", () => {
  test("Return HTTP error code 400", () => {
    try {
      throw new BadRequestError([
        {
          field: "text",
          errorMessage: "some error",
          userErrorMessage: "some error",
          validationCode: "text.REQUIRED",
        },
      ]);
    } catch (e) {
      if (e instanceof BadRequestError) {
        assert.deepEqual(
          {
            status: e.status,
            title: e.title,
            message: e.message,
            userMessage: e.userMessage,
          },
          {
            status: 400,
            title: "Bad Request",
            message: "A validation failed",
            userMessage: "An error has ocurred",
            errors: [
              {
                field: "text",
                errorMessage: "some error",
                userErrorMessage: "some error",
                validationCode: "text.REQUIRED",
              },
            ],
          }
        );
      }
    }
  });

  test("Return HTTP error code 401", () => {
    try {
      throw new UnauthenticatedError();
    } catch (e) {
      if (e instanceof UnauthenticatedError) {
        assert.deepEqual(
          {
            status: e.status,
            title: e.title,
            message: e.message,
            userMessage: e.userMessage,
          },
          {
            status: 401,
            title: "Unauthenticated",
            message: "Not authenticated",
            userMessage: "Client needs to authenticate",
          }
        );
      }
    }
  });

  test("Return HTTP error code 403", () => {
    try {
      throw new UnauthorizedError();
    } catch (e) {
      if (e instanceof UnauthorizedError) {
        assert.deepEqual(
          {
            status: e.status,
            title: e.title,
            message: e.message,
            userMessage: e.userMessage,
          },
          {
            status: 403,
            title: "Forbidden",
            message: "Cannot Access",
            userMessage: "Client cannot access this resource",
          }
        );
      }
    }
  });

  test("Return HTTP error code 404", () => {
    try {
      throw new NotFoundError();
    } catch (e) {
      if (e instanceof NotFoundError) {
        assert.deepEqual(
          {
            status: e.status,
            title: e.title,
            message: e.message,
            userMessage: e.userMessage,
          },
          {
            status: 404,
            title: "Not found",
            message: "The requested resource was not found",
            userMessage: "Not found",
          }
        );
      }
    }
  });

  test("Return HTTP error code 500", () => {
    try {
      throw new InternalServerError();
    } catch (e) {
      if (e instanceof InternalServerError) {
        assert.deepEqual(
          {
            status: e.status,
            title: e.title,
            message: e.message,
            userMessage: e.userMessage,
          },
          {
            status: 500,
            title: "Internal Server Error",
            message: "An error has ocurred",
            userMessage: "An error has ocurred",
          }
        );
      }
    }
  });
});
