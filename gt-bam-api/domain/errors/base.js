/**
 * A generic Http 500 error class.
 */
class BaseError extends Error {
  /**
   * @param {String} message
   * @param {Number} status
   */
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
  }
  /**
   * @return {Number}
   */
  getStatusCode() {
    return this.statusCode;
  }
}

module.exports = BaseError;
