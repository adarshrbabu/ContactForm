const { constants } = require("../constants");

const errorHandler = (err, req, res, next) => {
  const statusCode = err.statusCode || 500;

  switch (statusCode) {
    case constants.VALIDATION_ERROR:
      res.status(statusCode).json({
        title: "Validation Failed",
        message: err.message,
        stackTrace:
          process.env.NODE_ENV === "development" ? err.stack : undefined,
      });
      break;

    case constants.NOT_FOUND:
      res.status(statusCode).json({
        title: "Page Not Found",
        message: err.message,
        stackTrace:
          process.env.NODE_ENV === "development" ? err.stack : undefined,
      });
      break;

    case constants.UNAUTHORIZED:
      res.status(statusCode).json({
        title: "Unauthorized",
        message: err.message,
        stackTrace:
          process.env.NODE_ENV === "development" ? err.stack : undefined,
      });
      break;

    case constants.INTERNAL_SERVER_ERROR:
      res.status(statusCode).json({
        title: "Internal Server Error",
        message: err.message,
        stackTrace:
          process.env.NODE_ENV === "development" ? err.stack : undefined,
      });
      break;

    case constants.FORBIDDEN:
      res.status(statusCode).json({
        title: "Forbidden Error",
        message: err.message,
        stackTrace:
          process.env.NODE_ENV === "development" ? err.stack : undefined,
      });
      break;

    default:
      res.status(500).json({
        title: "Unknown Error",
        message: "An unexpected error occurred",
        stackTrace:
          process.env.NODE_ENV === "development" ? err.stack : undefined,
      });
      break;
  }
};

module.exports = errorHandler;
