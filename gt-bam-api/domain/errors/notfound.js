const BaseError = require("./base");
/**
 * A Not Found Http 404 error.
 */
class NotFoundError extends BaseError {
  /**
   * @param {String} message
   */
  constructor(message) {
    super(`${message} was not found`, 404);
  }
}

module.exports = NotFoundError;
