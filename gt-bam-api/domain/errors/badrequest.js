const BaseError = require("./base");
/**
 * A Bad Request Http 400 error.
 */
class BadRequestError extends BaseError {
  /**
   * @param {String} message
   */
  constructor(message) {
    super(message, 400);
  }
}

module.exports = BadRequestError;
