const { httpError } = require("../../domain/httpresponse");
/**
 * @param {Object} options
 */
const ErrorHandler = (options) => {
  return async (ctx, next) => {
    try {
      await next();
    } catch (error) {
      httpError(ctx, error);
    }
  };
};

module.exports = ErrorHandler;
