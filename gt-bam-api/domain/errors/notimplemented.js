const BaseError = require("./base");
/**
 * A Not Found Http 404 error.
 */
class NotImplementedError extends BaseError {
  /**
   * @param {String} method
   * @param {String} route
   */
  constructor(method, route) {
    super(`Method '${method} ${route}' not implemented`, 501);
  }
}

module.exports = NotImplementedError;
